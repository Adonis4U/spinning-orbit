// Geocode Place
// Supabase Edge Function for secure geocoding without exposing API keys
//
// Environment Variables Required:
// - GOOGLE_GEO_API_KEY: Google Geocoding API key

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GOOGLE_API_KEY = Deno.env.get('GOOGLE_GEO_API_KEY');

interface GeocodingResult {
    lat: number;
    lon: number;
    display_name: string;
    country: string;
    country_code: string;
}

Deno.serve(async (req: Request) => {
    const corsHeaders = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
    };

    if (req.method === 'OPTIONS') {
        return new Response(null, { headers: corsHeaders });
    }

    try {
        const { place, countryCode } = await req.json();

        if (!place) {
            return new Response(
                JSON.stringify({ error: 'Missing required parameter: place' }),
                { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Try Nominatim first (free, no API key needed)
        const nominatimResult = await tryNominatim(place, countryCode);

        if (nominatimResult) {
            return new Response(
                JSON.stringify({ success: true, results: nominatimResult, source: 'nominatim' }),
                { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
            );
        }

        // Fallback to Google Geocoding
        if (GOOGLE_API_KEY) {
            const googleResult = await tryGoogle(place, countryCode);

            if (googleResult) {
                return new Response(
                    JSON.stringify({ success: true, results: googleResult, source: 'google' }),
                    { status: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
                );
            }
        }

        // No results found
        return new Response(
            JSON.stringify({ success: false, error: 'No results found for the given place' }),
            { status: 404, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );

    } catch (error) {
        console.error('Geocoding error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
    }
});

async function tryNominatim(place: string, countryCode?: string): Promise<GeocodingResult[] | null> {
    try {
        const query = countryCode ? `${place}, ${countryCode}` : place;
        const encodedQuery = encodeURIComponent(query);

        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodedQuery}&limit=5&addressdetails=1`,
            {
                headers: {
                    'User-Agent': 'HouseOfVenus/1.0 (venus-calculator)',
                },
            }
        );

        if (!response.ok) {
            console.error('Nominatim error:', response.status);
            return null;
        }

        const data = await response.json();

        if (!data || data.length === 0) {
            return null;
        }

        return data.map((item: any) => ({
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon),
            display_name: item.display_name,
            country: item.address?.country || '',
            country_code: item.address?.country_code?.toUpperCase() || '',
        }));

    } catch (error) {
        console.error('Nominatim fetch error:', error);
        return null;
    }
}

async function tryGoogle(place: string, countryCode?: string): Promise<GeocodingResult[] | null> {
    try {
        const query = countryCode ? `${place}, ${countryCode}` : place;
        const encodedQuery = encodeURIComponent(query);

        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedQuery}&key=${GOOGLE_API_KEY}`;

        const response = await fetch(url);

        if (!response.ok) {
            console.error('Google Geocoding error:', response.status);
            return null;
        }

        const data = await response.json();

        if (data.status !== 'OK' || !data.results || data.results.length === 0) {
            return null;
        }

        return data.results.slice(0, 5).map((item: any) => {
            const countryComponent = item.address_components?.find(
                (c: any) => c.types.includes('country')
            );

            return {
                lat: item.geometry.location.lat,
                lon: item.geometry.location.lng,
                display_name: item.formatted_address,
                country: countryComponent?.long_name || '',
                country_code: countryComponent?.short_name || '',
            };
        });

    } catch (error) {
        console.error('Google Geocoding fetch error:', error);
        return null;
    }
}
