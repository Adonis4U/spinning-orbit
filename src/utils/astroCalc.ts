/* ===========================================
   ASTRO CALC - Accurate Astronomical Calculations
   Venus Sign & Ascendant Calculator
   =========================================== */

import type { VenusSign } from '../types/domain';

// @ts-expect-error - ephemeris package doesn't have TypeScript types
import ephemeris from 'ephemeris';

/**
 * Zodiac signs in order (0-11) mapped from ecliptic longitude
 * Each sign spans 30 degrees
 */
const ZODIAC_ORDER: VenusSign[] = [
    'aries',      // 0-30°
    'taurus',     // 30-60°
    'gemini',     // 60-90°
    'cancer',     // 90-120°
    'leo',        // 120-150°
    'virgo',      // 150-180°
    'libra',      // 180-210°
    'scorpio',    // 210-240°
    'sagittarius', // 240-270°
    'capricorn',  // 270-300°
    'aquarius',   // 300-330°
    'pisces',     // 330-360°
];

/**
 * Convert ecliptic longitude (0-360°) to zodiac sign
 */
export function longitudeToZodiacSign(longitude: number): VenusSign {
    // Normalize longitude to 0-360 range
    const normalizedLon = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLon / 30);
    return ZODIAC_ORDER[signIndex];
}

/**
 * Get the degree within the zodiac sign (0-30)
 */
export function getDegreeInSign(longitude: number): number {
    const normalizedLon = ((longitude % 360) + 360) % 360;
    return normalizedLon % 30;
}

/**
 * Calculate Venus Sign using Moshier's Ephemeris
 * @param birthDate - Date of birth
 * @param birthTime - Time of birth in "HH:MM" format
 * @returns The Venus sign
 */
export function calculateVenusSign(birthDate: Date, birthTime?: string): VenusSign {
    try {
        // Parse birth time or default to noon
        let hours = 12;
        let minutes = 0;

        if (birthTime) {
            const [h, m] = birthTime.split(':').map(Number);
            hours = h || 12;
            minutes = m || 0;
        }

        // Create a date with the exact time
        const date = new Date(birthDate);
        date.setHours(hours, minutes, 0, 0);

        // Get planetary positions from ephemeris
        // ephemeris.getAllPlanets expects: date, longitude, latitude, height
        const result = ephemeris.getAllPlanets(date, 0, 0, 0);

        // Venus position is in result.observed.venus
        const venusData = result?.observed?.venus;

        if (venusData && typeof venusData.apparentLongitudeDd === 'number') {
            return longitudeToZodiacSign(venusData.apparentLongitudeDd);
        }

        // Fallback to ecliptic longitude if apparentLongitudeDd is not available
        if (venusData && typeof venusData.eclipticLongitude === 'number') {
            return longitudeToZodiacSign(venusData.eclipticLongitude);
        }

        // If ephemeris fails, use fallback calculation
        console.warn('Ephemeris Venus calculation failed, using fallback');
        return calculateVenusSignFallback(birthDate);

    } catch (error) {
        console.error('Error calculating Venus sign:', error);
        return calculateVenusSignFallback(birthDate);
    }
}

/**
 * Fallback Venus sign calculation using simplified approach
 * (Used if ephemeris library fails)
 */
function calculateVenusSignFallback(birthDate: Date): VenusSign {
    // Venus orbital period: ~224.7 days
    // Average movement: ~1.6° per day

    // Reference point: Venus was at ~32° (Taurus) on Jan 1, 2000
    const referenceDate = new Date(2000, 0, 1);
    const referenceLongitude = 32; // Venus position on Jan 1, 2000

    const daysDiff = Math.floor((birthDate.getTime() - referenceDate.getTime()) / (1000 * 60 * 60 * 24));

    // Venus average daily motion: 360° / 224.7 days ≈ 1.6° per day
    const venusMotion = 1.6;

    // Calculate approximate longitude
    let longitude = referenceLongitude + (daysDiff * venusMotion);
    longitude = ((longitude % 360) + 360) % 360;

    return longitudeToZodiacSign(longitude);
}

/**
 * Convert Julian Day to Greenwich Sidereal Time (in degrees)
 */
function julianDayToGST(jd: number): number {
    // Julian centuries from J2000.0
    const T = (jd - 2451545.0) / 36525;

    // Mean sidereal time at Greenwich (in degrees)
    // IAU 1982 model
    let gst = 280.46061837
        + 360.98564736629 * (jd - 2451545.0)
        + 0.000387933 * T * T
        - T * T * T / 38710000;

    // Normalize to 0-360
    return ((gst % 360) + 360) % 360;
}

/**
 * Convert Date to Julian Day Number
 * This version handles UTC time properly
 */
function dateToJulianDay(year: number, month: number, day: number, hour: number, minute: number): number {
    // Adjust for January and February (they are counted as months 13 and 14 of the previous year)
    let y = year;
    let m = month;

    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    // Calculate Julian Day Number
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);

    // Day fraction from hours and minutes
    const dayFraction = (hour + minute / 60) / 24;

    const jd = Math.floor(365.25 * (y + 4716))
        + Math.floor(30.6001 * (m + 1))
        + day + dayFraction + B - 1524.5;

    return jd;
}

/**
 * Calculate the Ascendant (Rising Sign)
 * 
 * The Ascendant is the zodiac sign rising on the eastern horizon at the moment of birth.
 * 
 * This implementation uses the standard astronomical formula:
 * 1. Calculate Julian Day from UTC time
 * 2. Calculate Greenwich Sidereal Time (GST)
 * 3. Calculate Local Sidereal Time (LST = GST + longitude)
 * 4. Apply spherical trigonometry to find Ascendant
 * 
 * @param birthDate - Date of birth
 * @param birthTime - Time of birth in "HH:MM" format (LOCAL time at birth location)
 * @param latitude - Geographic latitude in degrees (positive = north)
 * @param longitude - Geographic longitude in degrees (positive = east)
 * @returns The Ascendant sign
 */
export function calculateAscendant(
    birthDate: Date,
    birthTime: string,
    latitude: number,
    longitude: number
): VenusSign {
    try {
        // Parse birth time
        const [hours, minutes] = birthTime.split(':').map(Number);

        // Create a date object with the local time
        const localDate = new Date(birthDate);
        localDate.setHours(hours, minutes, 0, 0);

        // Get UTC components from the local date
        // JavaScript Date automatically handles the timezone conversion
        const utcYear = localDate.getUTCFullYear();
        const utcMonth = localDate.getUTCMonth() + 1;
        const utcDay = localDate.getUTCDate();
        const utcHours = localDate.getUTCHours();
        const utcMinutes = localDate.getUTCMinutes();

        // Calculate Julian Day for UTC time
        const jd = dateToJulianDay(utcYear, utcMonth, utcDay, utcHours, utcMinutes);

        // Calculate Greenwich Mean Sidereal Time (GMST) at this moment
        const T = (jd - 2451545.0) / 36525; // Julian centuries from J2000.0

        // GMST formula (IAU 2006 precession model)
        let gmst = 280.46061837
            + 360.98564736629 * (jd - 2451545.0)
            + 0.000387933 * T * T
            - T * T * T / 38710000;

        // Normalize GMST to 0-360 degrees
        gmst = ((gmst % 360) + 360) % 360;

        // Calculate Local Sidereal Time
        // RAMC (Right Ascension of Medium Coeli) = LST in degrees
        let ramc = gmst + longitude;
        ramc = ((ramc % 360) + 360) % 360;

        // Convert to radians
        const ramcRad = (ramc * Math.PI) / 180;
        const latRad = (latitude * Math.PI) / 180;

        // Obliquity of the ecliptic (mean obliquity for the epoch)
        const obliquityDeg = 23.4392911 - 0.0130042 * T;
        const obliquityRad = (obliquityDeg * Math.PI) / 180;

        // Calculate Ascendant using the formula:
        // tan(Asc) = cos(RAMC) / -(sin(ε) * tan(φ) + cos(ε) * sin(RAMC))
        // where ε = obliquity of ecliptic, φ = latitude, RAMC = local sidereal time

        const sinRAMC = Math.sin(ramcRad);
        const cosRAMC = Math.cos(ramcRad);
        const sinObl = Math.sin(obliquityRad);
        const cosObl = Math.cos(obliquityRad);
        const tanLat = Math.tan(latRad);

        // Calculate ascendant angle
        const y = cosRAMC;
        const x = -(sinObl * tanLat + cosObl * sinRAMC);

        let ascRad = Math.atan2(y, x);
        let ascDeg = (ascRad * 180) / Math.PI;

        // Normalize to 0-360
        ascDeg = ((ascDeg % 360) + 360) % 360;

        // The atan2 formula can give results in wrong quadrant
        // The Ascendant should be roughly opposite to the RAMC (±90°)
        // Correct quadrant: if RAMC is 0-90°, ASC should be around 90-180°
        //                   if RAMC is 90-180°, ASC should be around 180-270°
        //                   if RAMC is 180-270°, ASC should be around 270-360°
        //                   if RAMC is 270-360°, ASC should be around 0-90°

        // Standard correction: add 180° if the sign of denominator is wrong
        if (x > 0) {
            ascDeg += 180;
        }
        if (ascDeg < 0) {
            ascDeg += 360;
        }
        if (ascDeg >= 360) {
            ascDeg -= 360;
        }

        return longitudeToZodiacSign(ascDeg);

    } catch (error) {
        console.error('Error calculating Ascendant:', error);
        return 'aries';
    }
}

/**
 * Geocode a place name to latitude/longitude using Nominatim (OpenStreetMap)
 * Note: This is a free service with usage limits
 */
export async function geocodePlace(placeName: string): Promise<{ lat: number; lon: number } | null> {
    try {
        const encodedPlace = encodeURIComponent(placeName);
        const response = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodedPlace}&limit=1`,
            {
                headers: {
                    'User-Agent': 'HouseOfVenus/1.0 (venus-calculator)',
                },
            }
        );

        if (!response.ok) {
            throw new Error('Geocoding request failed');
        }

        const data = await response.json();

        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
            };
        }

        return null;
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

/**
 * Calculate both Venus Sign and Ascendant
 */
export interface AstroCalculationResult {
    venusSign: VenusSign;
    ascendant: VenusSign | null;
    venusLongitude?: number;
    ascendantLongitude?: number;
}

export async function calculateFullChart(
    birthDate: Date,
    birthTime: string,
    birthPlace?: string
): Promise<AstroCalculationResult> {
    // Calculate Venus Sign (always)
    const venusSign = calculateVenusSign(birthDate, birthTime);

    let ascendant: VenusSign | null = null;

    // Calculate Ascendant if we have a birth place
    if (birthPlace) {
        const coords = await geocodePlace(birthPlace);
        if (coords) {
            ascendant = calculateAscendant(birthDate, birthTime, coords.lat, coords.lon);
        }
    }

    return {
        venusSign,
        ascendant,
    };
}
