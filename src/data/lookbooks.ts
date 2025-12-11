/* ===========================================
   LOOKBOOK DATA
   Editorial fashion lookbooks
   =========================================== */

export interface LookbookData {
    id: string;
    slug: string;
    title: { en: string; pl: string };
    description: { en: string; pl: string };
    venusSign: string;
    heroImage: string;
    galleryImages: string[];
    productIds: string[];
    photographer?: string;
    model?: string;
    location?: string;
    isFeatured: boolean;
    publishedAt: string;
}

export const LOOKBOOKS: LookbookData[] = [
    {
        id: '1',
        slug: 'venus-in-libra-harmony',
        title: { en: 'Venus in Libra: Harmony', pl: 'Wenus w Wadze: Harmonia' },
        description: {
            en: 'A visual journey through balanced elegance. This lookbook captures the quintessential Libra Venus aesthetic—romantic, refined, and effortlessly harmonious.',
            pl: 'Wizualna podróż przez zrównoważoną elegancję. Ten lookbook uchwycił esencję estetyki Wenus w Wadze—romantycznej, wyrafinowanej i bez wysiłku harmonijnej.'
        },
        venusSign: 'libra',
        heroImage: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1495385794356-15371f348c31?w=800&h=1000&fit=crop'
        ],
        productIds: ['1', '7'],
        photographer: 'Studio Venus',
        model: 'Diana Libra',
        location: 'Paris, France',
        isFeatured: true,
        publishedAt: '2024-03-15'
    },
    {
        id: '2',
        slug: 'scorpio-mystery',
        title: { en: 'Scorpio Venus: Mystery', pl: 'Wenus Skorpiona: Tajemnica' },
        description: {
            en: 'Embrace the magnetic allure of Scorpio Venus. Deep colors, rich textures, and an undeniable mystique that commands attention.',
            pl: 'Odkryj magnetyczny urok Wenus Skorpiona. Głębokie kolory, bogate tekstury i niezaprzeczalna tajemniczość, która przyciąga uwagę.'
        },
        venusSign: 'scorpio',
        heroImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=800&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1518622358385-8ea7d0794bf6?w=800&h=1000&fit=crop'
        ],
        productIds: ['3'],
        photographer: 'Dark Moon Studios',
        model: 'Selene Dark',
        location: 'Venice, Italy',
        isFeatured: true,
        publishedAt: '2024-02-20'
    },
    {
        id: '3',
        slug: 'leo-radiance',
        title: { en: 'Leo Venus: Radiance', pl: 'Wenus Lwa: Blask' },
        description: {
            en: 'Shine bright like the sun with Leo Venus. Gold accents, statement pieces, and the confidence to be the center of attention.',
            pl: 'Błyszcz jasno jak słońce z Wenus Lwa. Złote akcenty, wyraziste kreacje i pewność siebie, by być w centrum uwagi.'
        },
        venusSign: 'leo',
        heroImage: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=1200&h=800&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1611652022419-a9419f74343d?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&h=1000&fit=crop'
        ],
        productIds: ['2', '6'],
        photographer: 'Golden Hour Studio',
        model: 'Aurora Leone',
        location: 'Monaco',
        isFeatured: true,
        publishedAt: '2024-01-10'
    },
    {
        id: '4',
        slug: 'pisces-dreams',
        title: { en: 'Pisces Venus: Dreams', pl: 'Wenus Ryb: Marzenia' },
        description: {
            en: 'Float through life with Pisces Venus. Ethereal fabrics, ocean-inspired hues, and dreamy silhouettes that capture the imagination.',
            pl: 'Unoś się przez życie z Wenus Ryb. Eteryczne tkaniny, odcienie inspirowane oceanem i marzycielskie sylwetki, które pobudzają wyobraźnię.'
        },
        venusSign: 'pisces',
        heroImage: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop',
        galleryImages: [
            'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1583496661160-fb5886a0afe0?w=800&h=1000&fit=crop',
            'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&h=1000&fit=crop'
        ],
        productIds: ['5', '7'],
        photographer: 'Ocean Dreams',
        model: 'Marina Pearl',
        location: 'Santorini, Greece',
        isFeatured: false,
        publishedAt: '2024-04-05'
    }
];

export const getLookbookBySlug = (slug: string): LookbookData | undefined => {
    return LOOKBOOKS.find(l => l.slug === slug);
};

export const getFeaturedLookbooks = (): LookbookData[] => {
    return LOOKBOOKS.filter(l => l.isFeatured);
};

export const getLookbooksBySign = (sign: string): LookbookData[] => {
    return LOOKBOOKS.filter(l => l.venusSign === sign.toLowerCase());
};
