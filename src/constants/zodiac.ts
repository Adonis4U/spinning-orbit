/* ===========================================
   HOUSE OF VENUS - ZODIAC CONSTANTS
   Data and configurations for all 12 zodiac signs
   =========================================== */

import type { VenusSign, ZodiacSignInfo, Mood } from '../types/domain';

// ===========================================
// ZODIAC SIGNS DATA
// ===========================================

export const ZODIAC_SIGNS: Record<VenusSign, ZodiacSignInfo> = {
    aries: {
        id: 'aries',
        name_en: 'Aries',
        name_pl: 'Baran',
        symbol: '♈',
        element: 'fire',
        mood_phrase_en: 'Bold, fierce, and unapologetically confident',
        mood_phrase_pl: 'Odważny, dynamiczny i pewny siebie',
        style_tags: ['bold', 'dramatic', 'edgy'],
        color_primary: 'hsl(0, 80%, 55%)',
        color_secondary: 'hsl(20, 90%, 50%)',
        date_range: 'Mar 21 – Apr 19',
    },
    taurus: {
        id: 'taurus',
        name_en: 'Taurus',
        name_pl: 'Byk',
        symbol: '♉',
        element: 'earth',
        mood_phrase_en: 'Luxurious, sensual, and timeless elegance',
        mood_phrase_pl: 'Luksusowy, zmysłowy i ponadczasowa elegancja',
        style_tags: ['luxurious', 'classic', 'romantic'],
        color_primary: 'hsl(140, 45%, 40%)',
        color_secondary: 'hsl(100, 40%, 45%)',
        date_range: 'Apr 20 – May 20',
    },
    gemini: {
        id: 'gemini',
        name_en: 'Gemini',
        name_pl: 'Bliźnięta',
        symbol: '♊',
        element: 'air',
        mood_phrase_en: 'Playful, versatile, and intellectually chic',
        mood_phrase_pl: 'Zabawny, wszechstronny i intelektualnie szykowny',
        style_tags: ['playful', 'bold', 'minimalist'],
        color_primary: 'hsl(50, 90%, 55%)',
        color_secondary: 'hsl(40, 95%, 60%)',
        date_range: 'May 21 – Jun 20',
    },
    cancer: {
        id: 'cancer',
        name_en: 'Cancer',
        name_pl: 'Rak',
        symbol: '♋',
        element: 'water',
        mood_phrase_en: 'Romantic, nurturing, and softly feminine',
        mood_phrase_pl: 'Romantyczny, opiekuńczy i delikatnie kobiecy',
        style_tags: ['romantic', 'ethereal', 'classic'],
        color_primary: 'hsl(210, 20%, 70%)',
        color_secondary: 'hsl(190, 25%, 75%)',
        date_range: 'Jun 21 – Jul 22',
    },
    leo: {
        id: 'leo',
        name_en: 'Leo',
        name_pl: 'Lew',
        symbol: '♌',
        element: 'fire',
        mood_phrase_en: 'Dramatic, glamorous, and royally confident',
        mood_phrase_pl: 'Dramatyczny, glamour i królewsko pewny siebie',
        style_tags: ['dramatic', 'luxurious', 'bold'],
        color_primary: 'hsl(40, 95%, 50%)',
        color_secondary: 'hsl(25, 100%, 55%)',
        date_range: 'Jul 23 – Aug 22',
    },
    virgo: {
        id: 'virgo',
        name_en: 'Virgo',
        name_pl: 'Panna',
        symbol: '♍',
        element: 'earth',
        mood_phrase_en: 'Refined, minimal, and effortlessly elegant',
        mood_phrase_pl: 'Wyrafinowany, minimalistyczny i bez wysiłku elegancki',
        style_tags: ['minimalist', 'classic', 'luxurious'],
        color_primary: 'hsl(45, 30%, 75%)',
        color_secondary: 'hsl(60, 25%, 80%)',
        date_range: 'Aug 23 – Sep 22',
    },
    libra: {
        id: 'libra',
        name_en: 'Libra',
        name_pl: 'Waga',
        symbol: '♎',
        element: 'air',
        mood_phrase_en: 'Harmonious, charming, and beautifully balanced',
        mood_phrase_pl: 'Harmonijny, czarujący i pięknie zbalansowany',
        style_tags: ['romantic', 'classic', 'luxurious'],
        color_primary: 'hsl(330, 60%, 70%)',
        color_secondary: 'hsl(350, 55%, 75%)',
        date_range: 'Sep 23 – Oct 22',
    },
    scorpio: {
        id: 'scorpio',
        name_en: 'Scorpio',
        name_pl: 'Skorpion',
        symbol: '♏',
        element: 'water',
        mood_phrase_en: 'Mysterious, sensual, and intensely magnetic',
        mood_phrase_pl: 'Tajemniczy, zmysłowy i intensywnie magnetyczny',
        style_tags: ['edgy', 'dramatic', 'bold'],
        color_primary: 'hsl(340, 70%, 35%)',
        color_secondary: 'hsl(320, 60%, 40%)',
        date_range: 'Oct 23 – Nov 21',
    },
    sagittarius: {
        id: 'sagittarius',
        name_en: 'Sagittarius',
        name_pl: 'Strzelec',
        symbol: '♐',
        element: 'fire',
        mood_phrase_en: 'Adventurous, free-spirited, and boldly eclectic',
        mood_phrase_pl: 'Żądny przygód, wolny duch i odważnie eklektyczny',
        style_tags: ['bohemian', 'bold', 'playful'],
        color_primary: 'hsl(280, 60%, 50%)',
        color_secondary: 'hsl(260, 55%, 55%)',
        date_range: 'Nov 22 – Dec 21',
    },
    capricorn: {
        id: 'capricorn',
        name_en: 'Capricorn',
        name_pl: 'Koziorożec',
        symbol: '♑',
        element: 'earth',
        mood_phrase_en: 'Powerful, structured, and timelessly sophisticated',
        mood_phrase_pl: 'Potężny, uporządkowany i ponadczasowo wyrafinowany',
        style_tags: ['classic', 'minimalist', 'luxurious'],
        color_primary: 'hsl(30, 20%, 30%)',
        color_secondary: 'hsl(20, 25%, 35%)',
        date_range: 'Dec 22 – Jan 19',
    },
    aquarius: {
        id: 'aquarius',
        name_en: 'Aquarius',
        name_pl: 'Wodnik',
        symbol: '♒',
        element: 'air',
        mood_phrase_en: 'Innovative, unique, and futuristically cool',
        mood_phrase_pl: 'Innowacyjny, wyjątkowy i futurystycznie fajny',
        style_tags: ['edgy', 'bold', 'minimalist'],
        color_primary: 'hsl(200, 85%, 50%)',
        color_secondary: 'hsl(180, 80%, 45%)',
        date_range: 'Jan 20 – Feb 18',
    },
    pisces: {
        id: 'pisces',
        name_en: 'Pisces',
        name_pl: 'Ryby',
        symbol: '♓',
        element: 'water',
        mood_phrase_en: 'Dreamy, ethereal, and romantically artistic',
        mood_phrase_pl: 'Marzycielski, eteryczny i romantycznie artystyczny',
        style_tags: ['ethereal', 'romantic', 'bohemian'],
        color_primary: 'hsl(170, 60%, 45%)',
        color_secondary: 'hsl(190, 55%, 50%)',
        date_range: 'Feb 19 – Mar 20',
    },
};

// ===========================================
// ORDERED ZODIAC SIGNS ARRAY
// ===========================================

export const ZODIAC_SIGNS_ORDER: VenusSign[] = [
    'aries',
    'taurus',
    'gemini',
    'cancer',
    'leo',
    'virgo',
    'libra',
    'scorpio',
    'sagittarius',
    'capricorn',
    'aquarius',
    'pisces',
];

// ===========================================
// MOODS DATA
// ===========================================

export const MOODS: Record<Mood, { name_en: string; name_pl: string; description_en: string; description_pl: string }> = {
    romantic: {
        name_en: 'Romantic',
        name_pl: 'Romantyczny',
        description_en: 'Soft, dreamy pieces with delicate details',
        description_pl: 'Miękkie, marzycielskie elementy z delikatnymi detalami',
    },
    bold: {
        name_en: 'Bold',
        name_pl: 'Odważny',
        description_en: 'Statement pieces that demand attention',
        description_pl: 'Wyraziste elementy, które przyciągają uwagę',
    },
    ethereal: {
        name_en: 'Ethereal',
        name_pl: 'Eteryczny',
        description_en: 'Light, flowing, otherworldly beauty',
        description_pl: 'Lekkie, płynące, nieziemskie piękno',
    },
    dramatic: {
        name_en: 'Dramatic',
        name_pl: 'Dramatyczny',
        description_en: 'Theatrical, impactful, show-stopping',
        description_pl: 'Teatralny, mocny, robiący wrażenie',
    },
    minimalist: {
        name_en: 'Minimalist',
        name_pl: 'Minimalistyczny',
        description_en: 'Clean lines, understated elegance',
        description_pl: 'Czyste linie, stonowana elegancja',
    },
    luxurious: {
        name_en: 'Luxurious',
        name_pl: 'Luksusowy',
        description_en: 'Premium quality, rich textures',
        description_pl: 'Najwyższa jakość, bogate tekstury',
    },
    bohemian: {
        name_en: 'Bohemian',
        name_pl: 'Bohema',
        description_en: 'Free-spirited, artistic, eclectic',
        description_pl: 'Wolny duch, artystyczny, eklektyczny',
    },
    edgy: {
        name_en: 'Edgy',
        name_pl: 'Awangardowy',
        description_en: 'Dark, unconventional, avant-garde',
        description_pl: 'Ciemny, niekonwencjonalny, awangardowy',
    },
    classic: {
        name_en: 'Classic',
        name_pl: 'Klasyczny',
        description_en: 'Timeless, refined, always in style',
        description_pl: 'Ponadczasowy, wyrafinowany, zawsze modny',
    },
    playful: {
        name_en: 'Playful',
        name_pl: 'Zabawny',
        description_en: 'Fun, youthful, joyful expression',
        description_pl: 'Zabawny, młodzieńczy, radosny wyraz',
    },
};

// ===========================================
// ELEMENTS DATA
// ===========================================

export const ELEMENTS = {
    fire: {
        name_en: 'Fire',
        name_pl: 'Ogień',
        signs: ['aries', 'leo', 'sagittarius'] as VenusSign[],
        traits_en: 'Passionate, dynamic, bold',
        traits_pl: 'Namiętny, dynamiczny, odważny',
        color: 'hsl(15, 90%, 55%)',
    },
    earth: {
        name_en: 'Earth',
        name_pl: 'Ziemia',
        signs: ['taurus', 'virgo', 'capricorn'] as VenusSign[],
        traits_en: 'Grounded, sensual, luxurious',
        traits_pl: 'Przyziemny, zmysłowy, luksusowy',
        color: 'hsl(90, 40%, 40%)',
    },
    air: {
        name_en: 'Air',
        name_pl: 'Powietrze',
        signs: ['gemini', 'libra', 'aquarius'] as VenusSign[],
        traits_en: 'Intellectual, social, innovative',
        traits_pl: 'Intelektualny, towarzyski, innowacyjny',
        color: 'hsl(200, 70%, 60%)',
    },
    water: {
        name_en: 'Water',
        name_pl: 'Woda',
        signs: ['cancer', 'scorpio', 'pisces'] as VenusSign[],
        traits_en: 'Emotional, intuitive, mysterious',
        traits_pl: 'Emocjonalny, intuicyjny, tajemniczy',
        color: 'hsl(210, 60%, 50%)',
    },
};

// ===========================================
// CATEGORY LABELS
// ===========================================

export const PRODUCT_CATEGORIES = {
    dress: { name_en: 'Dresses', name_pl: 'Sukienki' },
    top: { name_en: 'Tops', name_pl: 'Bluzki' },
    bottom: { name_en: 'Bottoms', name_pl: 'Spodnie' },
    skirt: { name_en: 'Skirts', name_pl: 'Spódnice' },
    jacket: { name_en: 'Jackets', name_pl: 'Żakiety' },
    coat: { name_en: 'Coats', name_pl: 'Płaszcze' },
    knitwear: { name_en: 'Knitwear', name_pl: 'Dzianiny' },
    accessory: { name_en: 'Accessories', name_pl: 'Akcesoria' },
    jewelry: { name_en: 'Jewelry', name_pl: 'Biżuteria' },
    bag: { name_en: 'Bags', name_pl: 'Torebki' },
    shoes: { name_en: 'Shoes', name_pl: 'Buty' },
    scarf: { name_en: 'Scarves', name_pl: 'Szaliki' },
    hat: { name_en: 'Hats', name_pl: 'Kapelusze' },
};

// ===========================================
// HELPER FUNCTIONS
// ===========================================

export const getZodiacSign = (sign: VenusSign): ZodiacSignInfo => {
    return ZODIAC_SIGNS[sign];
};

export const getZodiacColor = (sign: VenusSign): string => {
    return ZODIAC_SIGNS[sign].color_primary;
};

export const getZodiacGradient = (sign: VenusSign): string => {
    const info = ZODIAC_SIGNS[sign];
    return `linear-gradient(135deg, ${info.color_primary}, ${info.color_secondary})`;
};

export const getSignsByElement = (element: 'fire' | 'earth' | 'air' | 'water'): VenusSign[] => {
    return ELEMENTS[element].signs;
};
