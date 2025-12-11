/* ===========================================
   COLLECTIONS DATA
   Venus-inspired fashion collections
   =========================================== */

export interface CollectionData {
    id: string;
    slug: string;
    name: { en: string; pl: string };
    description: { en: string; pl: string };
    shortDescription: { en: string; pl: string };
    featuredSigns: string[];
    heroImage: string;
    gradientFrom: string;
    gradientTo: string;
    isFeatured: boolean;
    season?: 'spring' | 'summer' | 'autumn' | 'winter';
    productIds: string[];
}

export const COLLECTIONS: CollectionData[] = [
    {
        id: '1',
        slug: 'celestial-romance',
        name: { en: 'Celestial Romance', pl: 'Niebiański Romans' },
        description: {
            en: 'A dreamy collection inspired by Venus in Libra and Pisces. Soft silhouettes, flowing fabrics, and romantic details for those who love with all their heart.',
            pl: 'Marzycielska kolekcja inspirowana Wenus w Wadze i Rybach. Miękkie sylwetki, zwiewne tkaniny i romantyczne detale dla tych, którzy kochają całym sercem.'
        },
        shortDescription: {
            en: 'Dreamy pieces for romantic souls',
            pl: 'Marzycielskie kreacje dla romantycznych dusz'
        },
        featuredSigns: ['libra', 'pisces', 'taurus'],
        heroImage: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop',
        gradientFrom: '#F8BBD9',
        gradientTo: '#E6E6FA',
        isFeatured: true,
        season: 'spring',
        productIds: ['1', '5', '7']
    },
    {
        id: '2',
        slug: 'power-luxe',
        name: { en: 'Power Luxe', pl: 'Luksus Mocy' },
        description: {
            en: 'Command attention with our Power Luxe collection. Structured blazers, sharp tailoring, and bold accessories for Venus in Capricorn and Leo.',
            pl: 'Przyciągaj uwagę naszą kolekcją Luksus Mocy. Strukturalne żakiety, ostre kroje i odważne dodatki dla Wenus w Koziorożcu i Lwie.'
        },
        shortDescription: {
            en: 'Bold pieces for ambitious Venus signs',
            pl: 'Odważne kreacje dla ambitnych znaków Wenus'
        },
        featuredSigns: ['capricorn', 'leo', 'aries'],
        heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop',
        gradientFrom: '#1A1A2E',
        gradientTo: '#D4AF37',
        isFeatured: true,
        season: 'autumn',
        productIds: ['2', '6', '8']
    },
    {
        id: '3',
        slug: 'mystic-depths',
        name: { en: 'Mystic Depths', pl: 'Mistyczne Głębiny' },
        description: {
            en: 'Dive into the mysterious allure of Scorpio and Cancer Venus. Rich velvets, deep jewel tones, and enigmatic silhouettes.',
            pl: 'Zanurz się w tajemniczym uroku Wenus Skorpiona i Raka. Bogate aksaumity, głębokie kolory kamieni szlachetnych i enigmatyczne sylwetki.'
        },
        shortDescription: {
            en: 'Mysterious elegance for water signs',
            pl: 'Tajemnicza elegancja dla znaków wody'
        },
        featuredSigns: ['scorpio', 'cancer', 'pisces'],
        heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=800&fit=crop',
        gradientFrom: '#4A0A3D',
        gradientTo: '#667eea',
        isFeatured: true,
        season: 'winter',
        productIds: ['3', '11']
    },
    {
        id: '4',
        slug: 'bohemian-spirit',
        name: { en: 'Bohemian Spirit', pl: 'Bohemijski Duch' },
        description: {
            en: 'Free-spirited fashion for Venus in Sagittarius, Aquarius, and Gemini. Natural fabrics, eclectic prints, and pieces that move with you.',
            pl: 'Wolnoduchowa moda dla Wenus w Strzelcu, Wodniku i Bliźniętach. Naturalne tkaniny, eklektyczne wzory i kreacje, które poruszają się z Tobą.'
        },
        shortDescription: {
            en: 'Free-spirited style for adventurers',
            pl: 'Wolnoduchowy styl dla poszukiwaczy przygód'
        },
        featuredSigns: ['sagittarius', 'aquarius', 'gemini'],
        heroImage: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&h=800&fit=crop',
        gradientFrom: '#9CAF88',
        gradientTo: '#D4C5B5',
        isFeatured: false,
        season: 'summer',
        productIds: ['4', '10']
    },
    {
        id: '5',
        slug: 'timeless-classics',
        name: { en: 'Timeless Classics', pl: 'Ponadczasowa Klasyka' },
        description: {
            en: 'Refined pieces for Venus in Virgo and Taurus. Impeccable tailoring, quality materials, and designs that never go out of style.',
            pl: 'Wyrafinowane kreacje dla Wenus w Pannie i Byku. Nienaganne kroje, wysokiej jakości materiały i projekty, które nigdy nie wychodzą z mody.'
        },
        shortDescription: {
            en: 'Timeless elegance for earth signs',
            pl: 'Ponadczasowa elegancja dla znaków ziemi'
        },
        featuredSigns: ['virgo', 'taurus', 'capricorn'],
        heroImage: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=1200&h=800&fit=crop',
        gradientFrom: '#C19A6B',
        gradientTo: '#FFFDD0',
        isFeatured: true,
        productIds: ['9', '12']
    }
];

export const getCollectionBySlug = (slug: string): CollectionData | undefined => {
    return COLLECTIONS.find(c => c.slug === slug);
};

export const getFeaturedCollections = (): CollectionData[] => {
    return COLLECTIONS.filter(c => c.isFeatured);
};

export const getCollectionsBySign = (sign: string): CollectionData[] => {
    return COLLECTIONS.filter(c => c.featuredSigns.includes(sign.toLowerCase()));
};
