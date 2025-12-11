/* ===========================================
   VENUS MATH - Venus Sign Calculator Logic
   Based on astronomical data with style keywords
   =========================================== */

import type { VenusSign } from '../types/domain';

/**
 * Venus sign periods (simplified, based on average Venus positions)
 */
const VENUS_PERIODS: { start: [number, number]; end: [number, number]; sign: VenusSign }[] = [
    { start: [1, 1], end: [1, 22], sign: 'sagittarius' },
    { start: [1, 23], end: [2, 16], sign: 'capricorn' },
    { start: [2, 17], end: [3, 11], sign: 'aquarius' },
    { start: [3, 12], end: [4, 5], sign: 'pisces' },
    { start: [4, 6], end: [4, 29], sign: 'aries' },
    { start: [4, 30], end: [5, 23], sign: 'taurus' },
    { start: [5, 24], end: [6, 17], sign: 'gemini' },
    { start: [6, 18], end: [7, 11], sign: 'cancer' },
    { start: [7, 12], end: [8, 4], sign: 'leo' },
    { start: [8, 5], end: [8, 29], sign: 'virgo' },
    { start: [8, 30], end: [9, 22], sign: 'libra' },
    { start: [9, 23], end: [10, 17], sign: 'scorpio' },
    { start: [10, 18], end: [11, 11], sign: 'sagittarius' },
    { start: [11, 12], end: [12, 6], sign: 'capricorn' },
    { start: [12, 7], end: [12, 31], sign: 'aquarius' },
];

/**
 * Style keywords for each Venus sign in EN and PL
 */
const STYLE_KEYWORDS: Record<VenusSign, { en: string[]; pl: string[] }> = {
    aries: {
        en: ['Bold', 'Edgy', 'Statement Pieces'],
        pl: ['Odważny', 'Awangardowy', 'Wyraziste Elementy'],
    },
    taurus: {
        en: ['Luxurious', 'Sensual', 'Quality Fabrics'],
        pl: ['Luksusowy', 'Zmysłowy', 'Jakościowe Tkaniny'],
    },
    gemini: {
        en: ['Versatile', 'Playful', 'Mix & Match'],
        pl: ['Wszechstronny', 'Zabawny', 'Mix & Match'],
    },
    cancer: {
        en: ['Romantic', 'Soft', 'Pearl Details'],
        pl: ['Romantyczny', 'Delikatny', 'Perłowe Detale'],
    },
    leo: {
        en: ['Dramatic', 'Glamorous', 'Gold Details'],
        pl: ['Dramatyczny', 'Glamour', 'Złote Detale'],
    },
    virgo: {
        en: ['Minimalist', 'Refined', 'Clean Lines'],
        pl: ['Minimalistyczny', 'Wyrafinowany', 'Czyste Linie'],
    },
    libra: {
        en: ['Elegant', 'Harmonious', 'Pastel Shades'],
        pl: ['Elegancki', 'Harmonijny', 'Pastelowe Odcienie'],
    },
    scorpio: {
        en: ['Mysterious', 'Intense', 'Dark Palette'],
        pl: ['Tajemniczy', 'Intensywny', 'Ciemna Paleta'],
    },
    sagittarius: {
        en: ['Bohemian', 'Ethnic Patterns', 'Natural Materials'],
        pl: ['Bohemijski', 'Etniczne Wzory', 'Naturalne Materiały'],
    },
    capricorn: {
        en: ['Classic', 'Structured', 'Timeless'],
        pl: ['Klasyczny', 'Strukturalny', 'Ponadczasowy'],
    },
    aquarius: {
        en: ['Innovative', 'Unique', 'Futuristic'],
        pl: ['Innowacyjny', 'Unikalny', 'Futurystyczny'],
    },
    pisces: {
        en: ['Dreamy', 'Ethereal', 'Flowing Fabrics'],
        pl: ['Marzycielski', 'Eteryczny', 'Zwiewne Tkaniny'],
    },
};

/**
 * Best compatible Venus signs for each sign
 */
const VENUS_MATCHES: Record<VenusSign, VenusSign[]> = {
    aries: ['leo', 'sagittarius', 'aquarius'],
    taurus: ['virgo', 'capricorn', 'cancer'],
    gemini: ['libra', 'aquarius', 'aries'],
    cancer: ['scorpio', 'pisces', 'taurus'],
    leo: ['aries', 'sagittarius', 'libra'],
    virgo: ['taurus', 'capricorn', 'cancer'],
    libra: ['gemini', 'aquarius', 'leo'],
    scorpio: ['cancer', 'pisces', 'virgo'],
    sagittarius: ['aries', 'leo', 'aquarius'],
    capricorn: ['taurus', 'virgo', 'pisces'],
    aquarius: ['gemini', 'libra', 'sagittarius'],
    pisces: ['cancer', 'scorpio', 'capricorn'],
};

/**
 * Color palettes for each Venus sign
 */
const VENUS_COLORS: Record<VenusSign, string[]> = {
    aries: ['#E57373', '#B71C1C', '#FFD54F', '#FF8A65'],
    taurus: ['#A1887F', '#5D4037', '#AED581', '#FFE082'],
    gemini: ['#FFD54F', '#FFA726', '#81D4FA', '#CE93D8'],
    cancer: ['#B0BEC5', '#78909C', '#E1BEE7', '#F8BBD9'],
    leo: ['#FFB300', '#FF6F00', '#D4AF37', '#FFA726'],
    virgo: ['#A1887F', '#8D6E63', '#BCAAA4', '#D7CCC8'],
    libra: ['#F8BBD9', '#CE93D8', '#B39DDB', '#FFAB91'],
    scorpio: ['#512DA8', '#311B92', '#880E4F', '#1A237E'],
    sagittarius: ['#FF7043', '#BF360C', '#8D6E63', '#FFB74D'],
    capricorn: ['#455A64', '#263238', '#5D4037', '#1B5E20'],
    aquarius: ['#00BCD4', '#0097A7', '#7E57C2', '#E040FB'],
    pisces: ['#B39DDB', '#7E57C2', '#80DEEA', '#4DB6AC'],
};

/**
 * Calculate Venus sign based on birth date
 */
export function calculateVenusSign(birthDate: Date): VenusSign {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    const year = birthDate.getFullYear();

    let venusSign: VenusSign = 'capricorn';

    for (const period of VENUS_PERIODS) {
        const [startMonth, startDay] = period.start;
        const [endMonth, endDay] = period.end;

        const dateNum = month * 100 + day;
        const startNum = startMonth * 100 + startDay;
        const endNum = endMonth * 100 + endDay;

        if (dateNum >= startNum && dateNum <= endNum) {
            venusSign = period.sign;
            break;
        }
    }

    // Add year variation
    const yearOffset = year % 8;
    const signs: VenusSign[] = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];

    const baseIndex = signs.indexOf(venusSign);
    const adjustedIndex = (baseIndex + Math.floor(yearOffset / 2)) % 12;

    return signs[adjustedIndex];
}

/**
 * Get style keywords for a Venus sign
 */
export function getVenusStyleKeywords(sign: VenusSign, language: 'en' | 'pl' = 'en'): string[] {
    return STYLE_KEYWORDS[sign]?.[language] || STYLE_KEYWORDS.libra[language];
}

/**
 * Get compatible Venus signs
 */
export function getVenusMatches(sign: VenusSign): VenusSign[] {
    return VENUS_MATCHES[sign] || ['libra', 'taurus', 'pisces'];
}

/**
 * Get color palette for a Venus sign
 */
export function getVenusColors(sign: VenusSign): string[] {
    return VENUS_COLORS[sign] || VENUS_COLORS.libra;
}

/**
 * Get Venus sign compatibility level
 */
export function getCompatibility(sign1: VenusSign, sign2: VenusSign): 'high' | 'medium' | 'low' {
    const matches = VENUS_MATCHES[sign1];
    if (matches.includes(sign2)) return 'high';

    const elements: Record<VenusSign, 'fire' | 'earth' | 'air' | 'water'> = {
        aries: 'fire', leo: 'fire', sagittarius: 'fire',
        taurus: 'earth', virgo: 'earth', capricorn: 'earth',
        gemini: 'air', libra: 'air', aquarius: 'air',
        cancer: 'water', scorpio: 'water', pisces: 'water',
    };

    if (elements[sign1] === elements[sign2]) return 'medium';
    return 'low';
}

/**
 * Get recommended style moods for a Venus sign
 */
export function getRecommendedMoods(sign: VenusSign): string[] {
    const moodMap: Record<VenusSign, string[]> = {
        aries: ['bold', 'dramatic', 'edgy'],
        taurus: ['luxurious', 'romantic', 'classic'],
        gemini: ['playful', 'versatile', 'bold'],
        cancer: ['romantic', 'ethereal', 'nurturing'],
        leo: ['dramatic', 'glamorous', 'bold'],
        virgo: ['minimalist', 'refined', 'classic'],
        libra: ['romantic', 'elegant', 'harmonious'],
        scorpio: ['mysterious', 'dramatic', 'intense'],
        sagittarius: ['bohemian', 'adventurous', 'bold'],
        capricorn: ['classic', 'structured', 'powerful'],
        aquarius: ['edgy', 'innovative', 'unique'],
        pisces: ['ethereal', 'dreamy', 'romantic'],
    };

    return moodMap[sign] || ['classic'];
}
