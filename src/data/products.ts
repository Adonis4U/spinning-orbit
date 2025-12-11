/* ===========================================
   PRODUCT DATA
   Mock products with real placeholder images
   =========================================== */

export interface Product {
    id: string;
    name: string;
    namePl: string;
    price: number;
    originalPrice?: number;
    currency: 'PLN' | 'EUR';
    description: { en: string; pl: string };
    images: string[];
    category: string;
    categoryPl: string;
    venusSign: string;
    isNew?: boolean;
    isSale?: boolean;
    isBestseller?: boolean;
    rating: number;
    reviewCount: number;
    colors?: { name: string; namePl: string; hex: string }[];
    sizes?: string[];
    materials?: { en: string[]; pl: string[] };
}

// High-quality fashion images from Unsplash
export const PRODUCTS: Product[] = [
    {
        id: '1',
        name: 'Celestial Silk Blouse',
        namePl: 'Niebiańska Bluzka Jedwabna',
        price: 299,
        originalPrice: 399,
        currency: 'PLN',
        description: {
            en: 'An ethereal silk blouse featuring delicate celestial embroidery. This piece embodies the romantic elegance of Venus in Libra.',
            pl: 'Eteryczna bluzka jedwabna z delikatnym niebiańskim haftem. Uosabia romantyczną elegancję Wenus w Wadze.',
        },
        images: [
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=600&h=800&fit=crop',
        ],
        category: 'Tops',
        categoryPl: 'Bluzki',
        venusSign: 'libra',
        isNew: true,
        isSale: true,
        rating: 4.8,
        reviewCount: 24,
        colors: [
            { name: 'Pearl White', namePl: 'Perłowa Biel', hex: '#F5F5F5' },
            { name: 'Blush Pink', namePl: 'Różowy Blush', hex: '#F8BBD9' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        id: '2',
        name: 'Venus Gold Earrings',
        namePl: 'Złote Kolczyki Wenus',
        price: 189,
        currency: 'PLN',
        description: {
            en: 'Stunning gold drop earrings with celestial star motifs. Perfect for the bold and radiant Leo Venus.',
            pl: 'Oszałamiające złote kolczyki z niebiańskim motywem gwiazd. Idealne dla odważnej Wenus w Lwie.',
        },
        images: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=600&h=800&fit=crop',
        ],
        category: 'Jewelry',
        categoryPl: 'Biżuteria',
        venusSign: 'leo',
        isBestseller: true,
        rating: 5.0,
        reviewCount: 42,
        colors: [
            { name: 'Gold', namePl: 'Złoty', hex: '#D4AF37' },
            { name: 'Rose Gold', namePl: 'Różowe Złoto', hex: '#E8C4B8' },
        ],
    },
    {
        id: '3',
        name: 'Mystic Velvet Dress',
        namePl: 'Mistyczna Sukienka Aksamitna',
        price: 459,
        originalPrice: 599,
        currency: 'PLN',
        description: {
            en: 'A luxurious velvet evening dress in deep plum. Channels the mysterious allure of Scorpio Venus.',
            pl: 'Luksusowa aksamitna suknia wieczorowa w kolorze głębokiej śliwki. Uosabia tajemniczy urok Wenus w Skorpionie.',
        },
        images: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600&h=800&fit=crop',
        ],
        category: 'Dresses',
        categoryPl: 'Sukienki',
        venusSign: 'scorpio',
        isSale: true,
        rating: 4.6,
        reviewCount: 18,
        colors: [
            { name: 'Deep Plum', namePl: 'Głęboka Śliwka', hex: '#4A0A3D' },
            { name: 'Midnight Black', namePl: 'Północna Czerń', hex: '#1A1A2E' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
    },
    {
        id: '4',
        name: 'Bohemian Linen Pants',
        namePl: 'Bohemijskie Spodnie Lniane',
        price: 249,
        currency: 'PLN',
        description: {
            en: 'Relaxed wide-leg linen pants for the free-spirited Sagittarius Venus. Perfect for adventures.',
            pl: 'Luźne spodnie lniane z szerokimi nogawkami dla wolnoduchej Wenus w Strzelcu.',
        },
        images: [
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=600&h=800&fit=crop',
        ],
        category: 'Bottoms',
        categoryPl: 'Dół',
        venusSign: 'sagittarius',
        rating: 4.4,
        reviewCount: 15,
        colors: [
            { name: 'Natural Beige', namePl: 'Naturalny Beż', hex: '#D4C5B5' },
            { name: 'Sage Green', namePl: 'Szałwiowa Zieleń', hex: '#9CAF88' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: '5',
        name: 'Ocean Pearl Necklace',
        namePl: 'Naszyjnik z Perłami Oceanu',
        price: 329,
        currency: 'PLN',
        description: {
            en: 'Delicate freshwater pearl necklace evoking the dreamy essence of Pisces Venus.',
            pl: 'Delikatny naszyjnik z pereł słodkowodnych przywołujący marzycielską esencję Wenus w Rybach.',
        },
        images: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=600&h=800&fit=crop',
        ],
        category: 'Jewelry',
        categoryPl: 'Biżuteria',
        venusSign: 'pisces',
        isNew: true,
        isBestseller: true,
        rating: 4.9,
        reviewCount: 31,
    },
    {
        id: '6',
        name: 'Power Blazer',
        namePl: 'Żakiet Mocy',
        price: 549,
        currency: 'PLN',
        description: {
            en: 'A structured power blazer for the ambitious Capricorn Venus. Command any room.',
            pl: 'Strukturalny żakiet mocy dla ambitnej Wenus w Koziorożcu. Rządź w każdym pomieszczeniu.',
        },
        images: [
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=800&fit=crop',
        ],
        category: 'Outerwear',
        categoryPl: 'Okrycia',
        venusSign: 'capricorn',
        rating: 4.7,
        reviewCount: 28,
        colors: [
            { name: 'Classic Black', namePl: 'Klasyczna Czerń', hex: '#1A1A1A' },
            { name: 'Ivory', namePl: 'Kość Słoniowa', hex: '#FFFFF0' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        id: '7',
        name: 'Dreamy Chiffon Skirt',
        namePl: 'Marzycielska Spódnica Szyfonowa',
        price: 199,
        currency: 'PLN',
        description: {
            en: 'A flowing chiffon midi skirt for the romantic Pisces Venus. Pure ethereal beauty.',
            pl: 'Zwiewna szyfonowa spódnica midi dla romantycznej Wenus w Rybach. Czyste eteryczne piękno.',
        },
        images: [
            'https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=600&h=800&fit=crop',
        ],
        category: 'Bottoms',
        categoryPl: 'Dół',
        venusSign: 'pisces',
        rating: 4.5,
        reviewCount: 12,
        colors: [
            { name: 'Soft Lavender', namePl: 'Miękka Lawenda', hex: '#E6E6FA' },
            { name: 'Blush', namePl: 'Róż', hex: '#FFB6C1' },
        ],
        sizes: ['XS', 'S', 'M', 'L'],
    },
    {
        id: '8',
        name: 'Bold Statement Ring',
        namePl: 'Odważny Pierścień Statement',
        price: 159,
        originalPrice: 199,
        currency: 'PLN',
        description: {
            en: 'A striking geometric ring for the fearless Aries Venus. Make a statement.',
            pl: 'Uderzający geometryczny pierścień dla nieustrasznej Wenus w Baranie. Wyraź siebie.',
        },
        images: [
            'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1603561596112-0a132b757442?w=600&h=800&fit=crop',
        ],
        category: 'Jewelry',
        categoryPl: 'Biżuteria',
        venusSign: 'aries',
        isSale: true,
        rating: 4.8,
        reviewCount: 56,
        colors: [
            { name: 'Silver', namePl: 'Srebro', hex: '#C0C0C0' },
            { name: 'Gold', namePl: 'Złoto', hex: '#FFD700' },
        ],
    },
    {
        id: '9',
        name: 'Luxe Cashmere Sweater',
        namePl: 'Luksusowy Sweter Kaszmirowy',
        price: 489,
        currency: 'PLN',
        description: {
            en: 'Ultra-soft cashmere sweater for the comfort-loving Taurus Venus. Pure indulgence.',
            pl: 'Ultra-miękki sweter kaszmirowy dla kochającej komfort Wenus w Byku. Czysta przyjemność.',
        },
        images: [
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
        ],
        category: 'Tops',
        categoryPl: 'Bluzki',
        venusSign: 'taurus',
        isBestseller: true,
        rating: 4.9,
        reviewCount: 67,
        colors: [
            { name: 'Camel', namePl: 'Wielbłądzi', hex: '#C19A6B' },
            { name: 'Cream', namePl: 'Kremowy', hex: '#FFFDD0' },
            { name: 'Dusty Rose', namePl: 'Przybrudzony Róż', hex: '#DCAE96' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
    {
        id: '10',
        name: 'Gemini Duo Bracelet',
        namePl: 'Bransoletka Duo Bliźnięta',
        price: 219,
        currency: 'PLN',
        description: {
            en: 'A playful two-in-one bracelet set for the versatile Gemini Venus. Mix and match.',
            pl: 'Zabawny zestaw dwóch bransolet dla wszechstronnej Wenus w Bliźniętach.',
        },
        images: [
            'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1611085583191-a3b181a88401?w=600&h=800&fit=crop',
        ],
        category: 'Jewelry',
        categoryPl: 'Biżuteria',
        venusSign: 'gemini',
        isNew: true,
        rating: 4.6,
        reviewCount: 23,
    },
    {
        id: '11',
        name: 'Cancer Moon Cardigan',
        namePl: 'Kardigan Księżycowy Rak',
        price: 279,
        currency: 'PLN',
        description: {
            en: 'A cozy wrap cardigan for the nurturing Cancer Venus. Like a warm embrace.',
            pl: 'Przytulny kardigan dla opiekuńczej Wenus w Raku. Jak ciepły uścisk.',
        },
        images: [
            'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1525450824786-227cbef70703?w=600&h=800&fit=crop',
        ],
        category: 'Tops',
        categoryPl: 'Bluzki',
        venusSign: 'cancer',
        rating: 4.7,
        reviewCount: 34,
        colors: [
            { name: 'Soft Grey', namePl: 'Delikatna Szarość', hex: '#D3D3D3' },
            { name: 'Moon White', namePl: 'Biały Księżyc', hex: '#F8F8FF' },
        ],
        sizes: ['S', 'M', 'L', 'XL'],
    },
    {
        id: '12',
        name: 'Virgo Classic Shirt',
        namePl: 'Klasyczna Koszula Panna',
        price: 229,
        currency: 'PLN',
        description: {
            en: 'A perfectly tailored cotton shirt for the detail-oriented Virgo Venus. Timeless elegance.',
            pl: 'Perfekcyjnie skrojona bawełniana koszula dla dbającej o detale Wenus w Pannie.',
        },
        images: [
            'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=600&h=800&fit=crop',
            'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=600&h=800&fit=crop',
        ],
        category: 'Tops',
        categoryPl: 'Bluzki',
        venusSign: 'virgo',
        rating: 4.5,
        reviewCount: 19,
        colors: [
            { name: 'Crisp White', namePl: 'Chrupiąca Biel', hex: '#FFFFFF' },
            { name: 'Light Blue', namePl: 'Jasny Błękit', hex: '#ADD8E6' },
        ],
        sizes: ['XS', 'S', 'M', 'L', 'XL'],
    },
];

export const getProductById = (id: string): Product | undefined => {
    return PRODUCTS.find(p => p.id === id);
};

export const getProductsByVenusSign = (sign: string): Product[] => {
    return PRODUCTS.filter(p => p.venusSign === sign.toLowerCase());
};

export const getProductsByCategory = (category: string): Product[] => {
    return PRODUCTS.filter(p =>
        p.category.toLowerCase() === category.toLowerCase() ||
        p.categoryPl.toLowerCase() === category.toLowerCase()
    );
};

export const getFeaturedProducts = (): Product[] => {
    return PRODUCTS.filter(p => p.isBestseller || p.isNew).slice(0, 4);
};
