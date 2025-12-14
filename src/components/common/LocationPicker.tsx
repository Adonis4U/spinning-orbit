/* ===========================================
   LOCATION PICKER COMPONENT
   Country dropdown + City autocomplete for birth location
   =========================================== */

import { useState, useEffect, useRef, useCallback } from 'react';
import { Globe, MapPin, ChevronDown, X, Loader2, Search } from 'lucide-react';
import { debounce } from '../../utils/debounce';
import styles from './LocationPicker.module.css';

// Common countries with their codes (sorted by typical usage)
const COUNTRIES = [
    { code: 'PL', name_en: 'Poland', name_pl: 'Polska' },
    { code: 'US', name_en: 'United States', name_pl: 'Stany Zjednoczone' },
    { code: 'GB', name_en: 'United Kingdom', name_pl: 'Wielka Brytania' },
    { code: 'DE', name_en: 'Germany', name_pl: 'Niemcy' },
    { code: 'FR', name_en: 'France', name_pl: 'Francja' },
    { code: 'IT', name_en: 'Italy', name_pl: 'Włochy' },
    { code: 'ES', name_en: 'Spain', name_pl: 'Hiszpania' },
    { code: 'NL', name_en: 'Netherlands', name_pl: 'Holandia' },
    { code: 'BE', name_en: 'Belgium', name_pl: 'Belgia' },
    { code: 'AT', name_en: 'Austria', name_pl: 'Austria' },
    { code: 'CH', name_en: 'Switzerland', name_pl: 'Szwajcaria' },
    { code: 'CZ', name_en: 'Czech Republic', name_pl: 'Czechy' },
    { code: 'SK', name_en: 'Slovakia', name_pl: 'Słowacja' },
    { code: 'UA', name_en: 'Ukraine', name_pl: 'Ukraina' },
    { code: 'SE', name_en: 'Sweden', name_pl: 'Szwecja' },
    { code: 'NO', name_en: 'Norway', name_pl: 'Norwegia' },
    { code: 'DK', name_en: 'Denmark', name_pl: 'Dania' },
    { code: 'FI', name_en: 'Finland', name_pl: 'Finlandia' },
    { code: 'PT', name_en: 'Portugal', name_pl: 'Portugalia' },
    { code: 'IE', name_en: 'Ireland', name_pl: 'Irlandia' },
    { code: 'GR', name_en: 'Greece', name_pl: 'Grecja' },
    { code: 'RO', name_en: 'Romania', name_pl: 'Rumunia' },
    { code: 'HU', name_en: 'Hungary', name_pl: 'Węgry' },
    { code: 'BG', name_en: 'Bulgaria', name_pl: 'Bułgaria' },
    { code: 'HR', name_en: 'Croatia', name_pl: 'Chorwacja' },
    { code: 'RS', name_en: 'Serbia', name_pl: 'Serbia' },
    { code: 'LT', name_en: 'Lithuania', name_pl: 'Litwa' },
    { code: 'LV', name_en: 'Latvia', name_pl: 'Łotwa' },
    { code: 'EE', name_en: 'Estonia', name_pl: 'Estonia' },
    { code: 'SI', name_en: 'Slovenia', name_pl: 'Słowenia' },
    { code: 'RU', name_en: 'Russia', name_pl: 'Rosja' },
    { code: 'CA', name_en: 'Canada', name_pl: 'Kanada' },
    { code: 'AU', name_en: 'Australia', name_pl: 'Australia' },
    { code: 'BR', name_en: 'Brazil', name_pl: 'Brazylia' },
    { code: 'MX', name_en: 'Mexico', name_pl: 'Meksyk' },
    { code: 'AR', name_en: 'Argentina', name_pl: 'Argentyna' },
    { code: 'JP', name_en: 'Japan', name_pl: 'Japonia' },
    { code: 'CN', name_en: 'China', name_pl: 'Chiny' },
    { code: 'IN', name_en: 'India', name_pl: 'Indie' },
    { code: 'KR', name_en: 'South Korea', name_pl: 'Korea Południowa' },
    { code: 'TR', name_en: 'Turkey', name_pl: 'Turcja' },
    { code: 'ZA', name_en: 'South Africa', name_pl: 'Republika Południowej Afryki' },
    { code: 'EG', name_en: 'Egypt', name_pl: 'Egipt' },
    { code: 'IL', name_en: 'Israel', name_pl: 'Izrael' },
    { code: 'AE', name_en: 'United Arab Emirates', name_pl: 'Zjednoczone Emiraty Arabskie' },
    { code: 'NZ', name_en: 'New Zealand', name_pl: 'Nowa Zelandia' },
    { code: 'SG', name_en: 'Singapore', name_pl: 'Singapur' },
    { code: 'TH', name_en: 'Thailand', name_pl: 'Tajlandia' },
    { code: 'VN', name_en: 'Vietnam', name_pl: 'Wietnam' },
    { code: 'PH', name_en: 'Philippines', name_pl: 'Filipiny' },
    { code: 'ID', name_en: 'Indonesia', name_pl: 'Indonezja' },
    { code: 'MY', name_en: 'Malaysia', name_pl: 'Malezja' },
    { code: 'CL', name_en: 'Chile', name_pl: 'Chile' },
    { code: 'CO', name_en: 'Colombia', name_pl: 'Kolumbia' },
    { code: 'PE', name_en: 'Peru', name_pl: 'Peru' },
];

interface CitySuggestion {
    display_name: string;
    lat: string;
    lon: string;
    name: string;
}

export interface LocationPickerValue {
    country: string;
    countryCode: string;
    city: string;
    lat: number | null;
    lon: number | null;
}

interface LocationPickerProps {
    value: LocationPickerValue;
    onChange: (value: LocationPickerValue) => void;
    language: 'en' | 'pl';
    compact?: boolean;
}

export default function LocationPicker({ value, onChange, language, compact = false }: LocationPickerProps) {
    // Country dropdown state
    const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
    const [countrySearch, setCountrySearch] = useState('');
    const countryRef = useRef<HTMLDivElement>(null);

    // City autocomplete state
    const [citySuggestions, setCitySuggestions] = useState<CitySuggestion[]>([]);
    const [cityLoading, setCityLoading] = useState(false);
    const [cityDropdownOpen, setCityDropdownOpen] = useState(false);
    const cityRef = useRef<HTMLDivElement>(null);

    // Filter countries based on search
    const filteredCountries = COUNTRIES.filter(c => {
        const name = language === 'en' ? c.name_en : c.name_pl;
        return name.toLowerCase().includes(countrySearch.toLowerCase()) ||
            c.code.toLowerCase().includes(countrySearch.toLowerCase());
    });

    // Debounced city search with Google fallback
    const searchCities = useCallback(
        debounce(async (query: string, countryCode: string) => {
            if (query.length < 2) {
                setCitySuggestions([]);
                return;
            }

            setCityLoading(true);
            try {
                // Try Nominatim first (OpenStreetMap - free)
                const countryParam = countryCode ? `&countrycodes=${countryCode}` : '';
                const nominatimResponse = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}${countryParam}&limit=5&featuretype=city`,
                    {
                        headers: {
                            'User-Agent': 'HouseOfVenus/1.0 (venus-calculator)',
                        },
                    }
                );

                if (nominatimResponse.ok) {
                    const data = await nominatimResponse.json();
                    if (data && data.length > 0) {
                        setCitySuggestions(data);
                        setCityDropdownOpen(true);
                        return;
                    }
                }

                // Fallback to Google Geocoding API if Nominatim fails or returns no results
                // Note: Google API key is stored as GOOGLE_GEO_API_KEY in Supabase secrets
                const googleApiKey = import.meta.env.VITE_GOOGLE_GEO_API_KEY;
                if (googleApiKey) {
                    const countryRestriction = countryCode ? `&components=country:${countryCode}` : '';
                    const googleResponse = await fetch(
                        `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(query)}${countryRestriction}&key=${googleApiKey}`
                    );

                    if (googleResponse.ok) {
                        const googleData = await googleResponse.json();
                        if (googleData.results && googleData.results.length > 0) {
                            // Convert Google format to our format
                            const suggestions = googleData.results.slice(0, 5).map((result: { formatted_address: string; geometry: { location: { lat: number; lng: number } } }) => ({
                                display_name: result.formatted_address,
                                lat: String(result.geometry.location.lat),
                                lon: String(result.geometry.location.lng),
                                name: result.formatted_address.split(',')[0],
                            }));
                            setCitySuggestions(suggestions);
                            setCityDropdownOpen(suggestions.length > 0);
                            return;
                        }
                    }
                }

                // If both fail, clear suggestions
                setCitySuggestions([]);
            } catch (error) {
                console.error('City search error:', error);
            } finally {
                setCityLoading(false);
            }
        }, 300),
        []
    );

    // Handle city input change
    const handleCityChange = (cityValue: string) => {
        onChange({
            ...value,
            city: cityValue,
            lat: null,
            lon: null,
        });

        if (cityValue.length >= 2) {
            searchCities(cityValue, value.countryCode);
        } else {
            setCitySuggestions([]);
            setCityDropdownOpen(false);
        }
    };

    // Handle city selection from suggestions
    const handleCitySelect = (suggestion: CitySuggestion) => {
        // Extract just the city name from display_name
        const cityName = suggestion.name || suggestion.display_name.split(',')[0].trim();

        onChange({
            ...value,
            city: cityName,
            lat: parseFloat(suggestion.lat),
            lon: parseFloat(suggestion.lon),
        });

        setCityDropdownOpen(false);
        setCitySuggestions([]);
    };

    // Handle country selection
    const handleCountrySelect = (countryCode: string, countryName: string) => {
        onChange({
            ...value,
            country: countryName,
            countryCode: countryCode,
            // Reset city when country changes
            city: '',
            lat: null,
            lon: null,
        });

        setCountryDropdownOpen(false);
        setCountrySearch('');
    };

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (countryRef.current && !countryRef.current.contains(event.target as Node)) {
                setCountryDropdownOpen(false);
            }
            if (cityRef.current && !cityRef.current.contains(event.target as Node)) {
                setCityDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const labels = {
        country: language === 'en' ? 'Country' : 'Kraj',
        city: language === 'en' ? 'City' : 'Miasto',
        selectCountry: language === 'en' ? 'Select country' : 'Wybierz kraj',
        searchCountry: language === 'en' ? 'Search country...' : 'Szukaj kraju...',
        enterCity: language === 'en' ? 'Enter city name' : 'Wpisz nazwę miasta',
        forAscendant: language === 'en' ? 'for Ascendant' : 'dla Ascendentu',
        optional: language === 'en' ? '(optional)' : '(opcjonalne)',
    };

    return (
        <div className={`${styles.locationPicker} ${compact ? styles.compact : ''}`}>
            {/* Country Selector */}
            <div className={styles.fieldGroup} ref={countryRef}>
                <label className={styles.label}>
                    <Globe size={compact ? 12 : 14} />
                    {labels.country}
                </label>

                <div className={styles.selectWrapper}>
                    <button
                        type="button"
                        className={styles.select}
                        onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                    >
                        <span className={value.country ? styles.selectedValue : styles.placeholder}>
                            {value.country || labels.selectCountry}
                        </span>
                        <ChevronDown size={16} className={`${styles.chevron} ${countryDropdownOpen ? styles.open : ''}`} />
                    </button>

                    {countryDropdownOpen && (
                        <div className={styles.dropdown}>
                            <div className={styles.searchWrapper}>
                                <Search size={14} className={styles.searchIcon} />
                                <input
                                    type="text"
                                    value={countrySearch}
                                    onChange={(e) => setCountrySearch(e.target.value)}
                                    placeholder={labels.searchCountry}
                                    className={styles.searchInput}
                                    autoFocus
                                />
                            </div>
                            <div className={styles.optionsList}>
                                {filteredCountries.map((country) => (
                                    <button
                                        key={country.code}
                                        type="button"
                                        className={`${styles.option} ${value.countryCode === country.code ? styles.selected : ''}`}
                                        onClick={() => handleCountrySelect(country.code, language === 'en' ? country.name_en : country.name_pl)}
                                    >
                                        {language === 'en' ? country.name_en : country.name_pl}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* City Input with Autocomplete */}
            <div className={styles.fieldGroup} ref={cityRef}>
                <label className={styles.label}>
                    <MapPin size={compact ? 12 : 14} />
                    {labels.city}
                </label>

                <div className={styles.inputWrapper}>
                    <input
                        type="text"
                        value={value.city}
                        onChange={(e) => handleCityChange(e.target.value)}
                        placeholder={labels.enterCity}
                        className={styles.input}
                    />

                    {cityLoading && (
                        <Loader2 size={16} className={styles.loader} />
                    )}

                    {value.city && !cityLoading && (
                        <button
                            type="button"
                            className={styles.clearButton}
                            onClick={() => handleCityChange('')}
                        >
                            <X size={14} />
                        </button>
                    )}

                    {cityDropdownOpen && citySuggestions.length > 0 && (
                        <div className={styles.dropdown}>
                            <div className={styles.optionsList}>
                                {citySuggestions.map((suggestion, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        className={styles.option}
                                        onClick={() => handleCitySelect(suggestion)}
                                    >
                                        {suggestion.display_name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
