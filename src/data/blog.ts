/* ===========================================
   BLOG DATA
   Astrology and fashion articles
   =========================================== */

export interface BlogPostData {
    id: string;
    slug: string;
    title: { en: string; pl: string };
    excerpt: { en: string; pl: string };
    content: { en: string; pl: string };
    coverImage: string;
    tags: string[];
    venusSign?: string;
    author: string;
    authorImage?: string;
    readingTimeMinutes: number;
    isFeatured: boolean;
    publishedAt: string;
}

export const BLOG_POSTS: BlogPostData[] = [
    {
        id: '1',
        slug: 'understanding-your-venus-sign',
        title: {
            en: 'Understanding Your Venus Sign: The Key to Your Personal Style',
            pl: 'Zrozumienie Twojego Znaku Wenus: Klucz do Twojego Stylu'
        },
        excerpt: {
            en: 'Discover how your Venus placement in your birth chart influences your fashion choices, relationships, and aesthetic preferences.',
            pl: 'Odkryj, jak pozycja Wenus w Twoim horoskopie wpływa na Twoje wybory modowe, relacje i preferencje estetyczne.'
        },
        content: {
            en: `Venus, the planet of love, beauty, and pleasure, holds the key to understanding your unique aesthetic sensibilities. In astrology, your Venus sign reveals not just who and how you love, but also what you find beautiful and attractive.

## What Does Venus Represent?

Venus governs our sense of beauty, art, and harmony. It tells us what we value, how we express affection, and what brings us pleasure. When it comes to fashion, your Venus sign is the ultimate style guide.

## Finding Your Venus Sign

Unlike your Sun sign, which changes every month, Venus moves through each zodiac sign in about 4-5 weeks. To find your Venus sign, you'll need your birth date, time, and location.

## Venus Signs and Fashion

Each Venus sign has distinct style preferences:

- **Venus in Aries**: Bold, statement pieces that command attention
- **Venus in Taurus**: Luxurious, tactile fabrics and timeless pieces
- **Venus in Gemini**: Eclectic, trendy looks that change with mood
- **Venus in Cancer**: Soft, comfortable pieces with sentimental value
- **Venus in Leo**: Glamorous, attention-grabbing fashion
- **Venus in Virgo**: Clean, classic, well-tailored looks
- **Venus in Libra**: Harmonious, balanced, romantic aesthetics
- **Venus in Scorpio**: Mysterious, magnetic, and transformative style
- **Venus in Sagittarius**: Bohemian, adventurous, global-inspired fashion
- **Venus in Capricorn**: Sophisticated, structured, power dressing
- **Venus in Aquarius**: Unique, avant-garde, unconventional style
- **Venus in Pisces**: Dreamy, ethereal, artistic fashion

Understanding your Venus sign is the first step to curating a wardrobe that truly reflects your soul.`,
            pl: `Wenus, planeta miłości, piękna i przyjemności, jest kluczem do zrozumienia Twojej unikalnej wrażliwości estetycznej. W astrologii Twój znak Wenus ujawnia nie tylko kogo i jak kochasz, ale także co uważasz za piękne i atrakcyjne.

## Co Reprezentuje Wenus?

Wenus rządzi naszym poczuciem piękna, sztuki i harmonii. Mówi nam, co cenimy, jak wyrażamy uczucie i co sprawia nam przyjemność. Jeśli chodzi o modę, Twój znak Wenus jest najlepszym przewodnikiem stylu.

## Znalezienie Twojego Znaku Wenus

W przeciwieństwie do znaku Słońca, który zmienia się co miesiąc, Wenus przechodzi przez każdy znak zodiaku w około 4-5 tygodni. Aby znaleźć swój znak Wenus, potrzebujesz daty, godziny i miejsca urodzenia.

## Znaki Wenus i Moda

Każdy znak Wenus ma odrębne preferencje stylowe:

- **Wenus w Baranie**: Odważne, wyraziste elementy, które przyciągają uwagę
- **Wenus w Byku**: Luksusowe, dotykowe tkaniny i ponadczasowe kreacje
- **Wenus w Bliźniętach**: Eklektyczne, modne stylizacje zmieniające się z nastrojem
- **Wenus w Raku**: Miękkie, wygodne elementy o wartości sentymentalnej
- **Wenus we Lwie**: Glamour, moda przyciągająca uwagę
- **Wenus w Pannie**: Czyste, klasyczne, dobrze skrojone stylizacje
- **Wenus w Wadze**: Harmonijna, zrównoważona, romantyczna estetyka
- **Wenus w Skorpionie**: Tajemniczy, magnetyczny i transformacyjny styl
- **Wenus w Strzelcu**: Bohemijska, pełna przygód moda inspirowana światem
- **Wenus w Koziorożcu**: Wyrafinowane, strukturalne power dressing
- **Wenus w Wodniku**: Unikalny, awangardowy, niekonwencjonalny styl
- **Wenus w Rybach**: Marzycielska, eteryczna, artystyczna moda

Zrozumienie swojego znaku Wenus to pierwszy krok do stworzenia garderoby, która naprawdę odzwierciedla Twoją duszę.`
        },
        coverImage: 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=800&fit=crop',
        tags: ['Venus Sign', 'Astrology', 'Fashion Guide', 'Style Tips'],
        author: 'Celestia Moon',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        readingTimeMinutes: 8,
        isFeatured: true,
        publishedAt: '2024-03-20'
    },
    {
        id: '2',
        slug: 'venus-retrograde-wardrobe',
        title: {
            en: 'Venus Retrograde: Time to Reinvent Your Wardrobe',
            pl: 'Wenus Retrograde: Czas na Odnowienie Garderoby'
        },
        excerpt: {
            en: 'Venus retrograde is the perfect time to reassess your style, declutter your closet, and reconnect with forgotten favorites.',
            pl: 'Wenus retrograde to idealny czas, aby ponownie ocenić swój styl, uporządkować szafę i odkryć zapomniane ulubione rzeczy.'
        },
        content: {
            en: `When Venus goes retrograde, it's not just about relationship reviews—it's also the perfect time for a style reset.

## What is Venus Retrograde?

Approximately every 18 months, Venus appears to move backward in the sky for about 40 days. This period asks us to revisit and reassess matters related to love, beauty, and values.

## The Fashion Opportunity

Instead of shopping for new pieces, Venus retrograde invites us to:

1. **Rediscover hidden gems** in your existing wardrobe
2. **Assess what truly brings you joy** when you wear it
3. **Donate or sell** items that no longer align with your evolving style
4. **Mend and care for** pieces you've neglected
5. **Plan future purchases** thoughtfully instead of impulsively`,
            pl: `Kiedy Wenus wchodzi w ruch wsteczny, nie chodzi tylko o przegląd relacji—to także idealny czas na resetowanie stylu.

## Czym jest Wenus Retrograde?

Co około 18 miesięcy Wenus wydaje się poruszać wstecz na niebie przez około 40 dni. Ten okres zachęca nas do ponownego przemyślenia spraw związanych z miłością, pięknem i wartościami.

## Możliwość Modowa

Zamiast kupować nowe rzeczy, Wenus retrograde zaprasza nas do:

1. **Ponowne odkrycie ukrytych skarbów** w istniejącej szafie
2. **Ocena, co naprawdę sprawia radość** gdy to nosisz
3. **Oddanie lub sprzedaż** rzeczy, które już nie pasują do rozwijającego się stylu
4. **Naprawa i dbanie** o zaniedbane elementy
5. **Planowanie przyszłych zakupów** przemyślane zamiast impulsywne`
        },
        coverImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=800&fit=crop',
        tags: ['Venus Retrograde', 'Wardrobe', 'Sustainable Fashion', 'Style Tips'],
        author: 'Luna Star',
        authorImage: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop',
        readingTimeMinutes: 5,
        isFeatured: true,
        publishedAt: '2024-02-14'
    },
    {
        id: '3',
        slug: 'color-magic-zodiac',
        title: {
            en: 'Color Magic: The Best Colors for Each Venus Sign',
            pl: 'Magia Kolorów: Najlepsze Kolory dla Każdego Znaku Wenus'
        },
        excerpt: {
            en: 'Learn which colors harmonize with your Venus sign energy and how to incorporate them into your wardrobe.',
            pl: 'Dowiedz się, które kolory harmonizują z energią Twojego znaku Wenus i jak włączyć je do swojej garderoby.'
        },
        content: {
            en: `Colors carry energy and vibration. When you wear colors that align with your Venus sign, you amplify your natural magnetism and beauty.

## Fire Venus Signs (Aries, Leo, Sagittarius)

**Best colors**: Red, orange, gold, bright yellow
These vibrant shades match the passionate, bold energy of fire Venus signs.

## Earth Venus Signs (Taurus, Virgo, Capricorn)

**Best colors**: Forest green, brown, cream, navy
Grounding, sophisticated colors that reflect their practical elegance.

## Air Venus Signs (Gemini, Libra, Aquarius)

**Best colors**: Light blue, lavender, soft pink, silver
Airy, harmonious shades that speak to their intellectual beauty.

## Water Venus Signs (Cancer, Scorpio, Pisces)

**Best colors**: Deep blue, purple, sea green, pearl white
Mysterious, emotional colors that mirror their depth of feeling.`,
            pl: `Kolory niosą ze sobą energię i wibracje. Kiedy nosisz kolory zgodne z Twoim znakiem Wenus, wzmacniasz swój naturalny magnetyzm i piękno.

## Ogniste Znaki Wenus (Baran, Lew, Strzelec)

**Najlepsze kolory**: Czerwony, pomarańczowy, złoty, jaskrawy żółty
Te żywe odcienie pasują do namiętnej, odważnej energii ognistych znaków Wenus.

## Ziemskie Znaki Wenus (Byk, Panna, Koziorożec)

**Najlepsze kolory**: Leśna zieleń, brąz, kremowy, granat
Przyziemne, wyrafinowane kolory odzwierciedlające ich praktyczną elegancję.

## Powietrzne Znaki Wenus (Bliźnięta, Waga, Wodnik)

**Najlepsze kolory**: Jasny błękit, lawenda, miękki róż, srebro
Lekkie, harmonijne odcienie przemawiające do ich intelektualnego piękna.

## Wodne Znaki Wenus (Rak, Skorpion, Ryby)

**Najlepsze kolory**: Głęboki błękit, fiolet, morska zieleń, perłowa biel
Tajemnicze, emocjonalne kolory odzwierciedlające głębię ich uczuć.`
        },
        coverImage: 'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?w=1200&h=800&fit=crop',
        tags: ['Color Theory', 'Venus Sign', 'Style Tips', 'Astrology'],
        venusSign: 'all',
        author: 'Celestia Moon',
        authorImage: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop',
        readingTimeMinutes: 6,
        isFeatured: false,
        publishedAt: '2024-01-28'
    },
    {
        id: '4',
        slug: 'scorpio-venus-style-guide',
        title: {
            en: 'The Ultimate Scorpio Venus Style Guide',
            pl: 'Kompletny Przewodnik Stylu Wenus w Skorpionie'
        },
        excerpt: {
            en: 'Magnetic, mysterious, and transformative—unlock the style secrets of Scorpio Venus placement.',
            pl: 'Magnetyczny, tajemniczy i transformacyjny—odkryj sekrety stylu pozycji Wenus w Skorpionie.'
        },
        content: {
            en: `If you have Venus in Scorpio, you possess one of the most magnetic placements in the zodiac. Your approach to style is intense, purposeful, and deeply personal.

## Key Style Traits

- **All or nothing**: You commit fully to a look
- **Quality over quantity**: Investment pieces over fast fashion
- **Mystery and allure**: Understated sensuality
- **Transformative**: Your style evolves as you do

## Your Power Colors

Deep plum, black, burgundy, dark emerald, and jewel tones that hint at hidden depths.

## Signature Pieces

- Perfectly fitted black items
- Statement jewelry with meaning
- Luxurious textures (velvet, leather, silk)
- Pieces with interesting closures or details`,
            pl: `Jeśli masz Wenus w Skorpionie, posiadasz jedną z najbardziej magnetycznych pozycji w zodiaku. Twoje podejście do stylu jest intensywne, celowe i głęboko osobiste.

## Główne Cechy Stylu

- **Wszystko albo nic**: W pełni angażujesz się w stylizację
- **Jakość ponad ilość**: Inwestycyjne elementy zamiast szybkiej mody
- **Tajemniczość i urok**: Stonowana zmysłowość
- **Transformacyjność**: Twój styl ewoluuje wraz z Tobą

## Twoje Kolory Mocy

Głęboka śliwka, czerń, burgund, ciemny szmaragd i odcienie kamieni szlachetnych sugerujące ukryte głębie.

## Kluczowe Elementy

- Perfekcyjnie dopasowane czarne elementy
- Wyrazista biżuteria z przesłaniem
- Luksusowe tekstury (aksamit, skóra, jedwab)
- Kreacje z interesującymi zamknięciami lub detalami`
        },
        coverImage: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=1200&h=800&fit=crop',
        tags: ['Scorpio Venus', 'Style Guide', 'Deep Dive', 'Astrology'],
        venusSign: 'scorpio',
        author: 'Stella Noir',
        authorImage: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop',
        readingTimeMinutes: 7,
        isFeatured: true,
        publishedAt: '2024-03-05'
    }
];

export const getBlogPostBySlug = (slug: string): BlogPostData | undefined => {
    return BLOG_POSTS.find(p => p.slug === slug);
};

export const getFeaturedBlogPosts = (): BlogPostData[] => {
    return BLOG_POSTS.filter(p => p.isFeatured);
};

export const getBlogPostsByTag = (tag: string): BlogPostData[] => {
    return BLOG_POSTS.filter(p => p.tags.some(t => t.toLowerCase() === tag.toLowerCase()));
};
