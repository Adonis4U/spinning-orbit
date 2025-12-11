/* ===========================================
   VENUS DATA - Complete sign descriptions
   Detailed style guides for each Venus sign
   =========================================== */

import type { VenusSign } from '../types/domain';

export interface VenusSignData {
    id: VenusSign;
    symbol: string;
    element: 'fire' | 'earth' | 'air' | 'water';
    ruler: string;
    name: { en: string; pl: string };
    title: { en: string; pl: string };
    description: { en: string; pl: string };
    styleEssence: { en: string; pl: string };
    keyTraits: { en: string[]; pl: string[] };
    styleKeywords: { en: string[]; pl: string[] };
    colors: string[];
    colorNames: { en: string[]; pl: string[] };
    fabrics: { en: string[]; pl: string[] };
    avoidFabrics: { en: string[]; pl: string[] };
    accessories: { en: string[]; pl: string[] };
    signatures: { en: string[]; pl: string[] };
    perfectFor: { en: string[]; pl: string[] };
    bestMatches: VenusSign[];
    celebrities: string[];
}

export const VENUS_SIGN_DATA: Record<VenusSign, VenusSignData> = {
    aries: {
        id: 'aries',
        symbol: '♈',
        element: 'fire',
        ruler: 'Mars',
        name: { en: 'Aries', pl: 'Baran' },
        title: { en: 'The Bold Pioneer', pl: 'Odważny Pionier' },
        description: {
            en: 'Venus in Aries gives you a passionate, direct approach to style. You love making bold statements and being first to embrace new trends. Your fashion sense is fearless, energetic, and unapologetically confident.',
            pl: 'Wenus w Baranie daje Ci pasjonalne, bezpośrednie podejście do stylu. Uwielbiasz robić odważne oświadczenia i być pierwszym, który przyjmuje nowe trendy. Twój zmysł mody jest nieustraszony, energiczny i bezkompromisowo pewny siebie.',
        },
        styleEssence: {
            en: 'Bold, athletic, statement-making',
            pl: 'Odważny, atletyczny, przyciągający uwagę',
        },
        keyTraits: {
            en: ['Confident', 'Energetic', 'Trend-setter', 'Athletic'],
            pl: ['Pewny siebie', 'Energiczny', 'Trendsetter', 'Atletyczny'],
        },
        styleKeywords: {
            en: ['Bold', 'Edgy', 'Statement Pieces', 'Power Dressing'],
            pl: ['Odważny', 'Awangardowy', 'Wyraziste Elementy', 'Power Dressing'],
        },
        colors: ['#E53935', '#FF5722', '#D32F2F', '#FF8A65'],
        colorNames: {
            en: ['Fiery Red', 'Burnt Orange', 'Crimson', 'Coral'],
            pl: ['Ognista Czerwień', 'Spalone Pomarańcze', 'Karmazyn', 'Koral'],
        },
        fabrics: {
            en: ['Leather', 'Denim', 'Athletic materials', 'Structured cotton'],
            pl: ['Skóra', 'Dżins', 'Materiały sportowe', 'Strukturalna bawełna'],
        },
        avoidFabrics: {
            en: ['Overly delicate fabrics', 'Fussy details'],
            pl: ['Zbyt delikatne tkaniny', 'Przesadne detale'],
        },
        accessories: {
            en: ['Bold watches', 'Statement earrings', 'Combat boots', 'Structured bags'],
            pl: ['Wyraziste zegarki', 'Duże kolczyki', 'Buty wojskowe', 'Strukturalne torebki'],
        },
        signatures: {
            en: ['Power shoulders', 'Red lip', 'Athletic-luxe', 'Bold prints'],
            pl: ['Mocne ramiona', 'Czerwone usta', 'Sportowa elegancja', 'Odważne wzory'],
        },
        perfectFor: {
            en: ['Power meetings', 'First dates', 'Active lifestyle', 'Making entrances'],
            pl: ['Ważne spotkania', 'Pierwsze randki', 'Aktywny styl życia', 'Wielkie wejścia'],
        },
        bestMatches: ['leo', 'sagittarius', 'aquarius'],
        celebrities: ['Lady Gaga', 'Rihanna', 'Victoria Beckham'],
    },

    taurus: {
        id: 'taurus',
        symbol: '♉',
        element: 'earth',
        ruler: 'Venus',
        name: { en: 'Taurus', pl: 'Byk' },
        title: { en: 'The Sensual Curator', pl: 'Zmysłowy Kurator' },
        description: {
            en: 'Venus rules Taurus, making you a natural connoisseur of beauty and luxury. You invest in quality pieces that stand the test of time. Your style is sensual, tactile, and effortlessly elegant.',
            pl: 'Wenus rządzi Bykiem, czyniąc Cię naturalnym koneserem piękna i luksusu. Inwestujesz w jakościowe elementy, które przetrwają próbę czasu. Twój styl jest zmysłowy, dotykowy i bezproblemowo elegancki.',
        },
        styleEssence: {
            en: 'Luxurious, sensual, timeless quality',
            pl: 'Luksusowy, zmysłowy, ponadczasowa jakość',
        },
        keyTraits: {
            en: ['Refined', 'Sensual', 'Patient', 'Quality-focused'],
            pl: ['Wyrafinowany', 'Zmysłowy', 'Cierpliwy', 'Zorientowany na jakość'],
        },
        styleKeywords: {
            en: ['Luxurious', 'Sensual', 'Quality', 'Earth Tones'],
            pl: ['Luksusowy', 'Zmysłowy', 'Jakość', 'Tonacje Ziemiste'],
        },
        colors: ['#8D6E63', '#4E342E', '#81C784', '#FFE082'],
        colorNames: {
            en: ['Warm Brown', 'Rich Chocolate', 'Sage Green', 'Soft Gold'],
            pl: ['Ciepły Brąz', 'Intensywna Czekolada', 'Szałwiowa Zieleń', 'Miękkie Złoto'],
        },
        fabrics: {
            en: ['Cashmere', 'Silk', 'Velvet', 'Fine leather'],
            pl: ['Kaszmir', 'Jedwab', 'Aksamit', 'Delikatna skóra'],
        },
        avoidFabrics: {
            en: ['Cheap synthetics', 'Scratchy materials'],
            pl: ['Tanie syntetyki', 'Drapające materiały'],
        },
        accessories: {
            en: ['Fine jewelry', 'Leather goods', 'Silk scarves', 'Classic watches'],
            pl: ['Dobra biżuteria', 'Wyroby skórzane', 'Jedwabne szale', 'Klasyczne zegarki'],
        },
        signatures: {
            en: ['Capsule wardrobe', 'Investment pieces', 'Neutral palette', 'Touchable textures'],
            pl: ['Garderoba kapsułowa', 'Inwestycyjne elementy', 'Neutralna paleta', 'Dotykalne tekstury'],
        },
        perfectFor: {
            en: ['Elegant dinners', 'Art galleries', 'Romantic evenings', 'Wine tasting'],
            pl: ['Eleganckie kolacje', 'Galerie sztuki', 'Romantyczne wieczory', 'Degustacja win'],
        },
        bestMatches: ['virgo', 'capricorn', 'cancer'],
        celebrities: ['Adele', 'George Clooney', 'Penélope Cruz'],
    },

    gemini: {
        id: 'gemini',
        symbol: '♊',
        element: 'air',
        ruler: 'Mercury',
        name: { en: 'Gemini', pl: 'Bliźnięta' },
        title: { en: 'The Style Chameleon', pl: 'Kameleon Stylu' },
        description: {
            en: 'Venus in Gemini gives you an ever-evolving, curious approach to fashion. You love variety, mixing patterns, and having different looks for different moods. Your style is playful, witty, and endlessly creative.',
            pl: 'Wenus w Bliźniętach daje Ci ciągle ewoluujące, ciekawe podejście do mody. Kochasz różnorodność, mieszanie wzorów i różne stylizacje na różne nastroje. Twój styl jest zabawny, dowcipny i nieskończenie kreatywny.',
        },
        styleEssence: {
            en: 'Versatile, playful, trend-aware',
            pl: 'Wszechstronny, zabawny, świadomy trendów',
        },
        keyTraits: {
            en: ['Curious', 'Adaptable', 'Witty', 'Expressive'],
            pl: ['Ciekawski', 'Elastyczny', 'Dowcipny', 'Ekspresyjny'],
        },
        styleKeywords: {
            en: ['Versatile', 'Playful', 'Mix & Match', 'Bright'],
            pl: ['Wszechstronny', 'Zabawny', 'Mix & Match', 'Jasny'],
        },
        colors: ['#FFEB3B', '#FF9800', '#4FC3F7', '#BA68C8'],
        colorNames: {
            en: ['Sunshine Yellow', 'Vibrant Orange', 'Sky Blue', 'Lavender'],
            pl: ['Słoneczny Żółty', 'Wibrujący Pomarańcz', 'Błękit Nieba', 'Lawenda'],
        },
        fabrics: {
            en: ['Light cotton', 'Linen', 'Jersey', 'Printed fabrics'],
            pl: ['Lekka bawełna', 'Len', 'Dzianina', 'Drukowane tkaniny'],
        },
        avoidFabrics: {
            en: ['Heavy, restricting fabrics', 'Boring solids'],
            pl: ['Ciężkie, krępujące tkaniny', 'Nudne jednolite kolory'],
        },
        accessories: {
            en: ['Layered jewelry', 'Quirky bags', 'Colorful scarves', 'Statement glasses'],
            pl: ['Warstwowa biżuteria', 'Oryginalne torebki', 'Kolorowe szale', 'Wyraziste okulary'],
        },
        signatures: {
            en: ['Pattern mixing', 'Color blocking', 'Unexpected combos', 'Trendy pieces'],
            pl: ['Mieszanie wzorów', 'Color blocking', 'Niespodziewane kombinacje', 'Modne elementy'],
        },
        perfectFor: {
            en: ['Social events', 'Creative meetings', 'City exploring', 'Brunch dates'],
            pl: ['Spotkania towarzyskie', 'Kreatywne spotkania', 'Odkrywanie miasta', 'Brunche'],
        },
        bestMatches: ['libra', 'aquarius', 'aries'],
        celebrities: ['Marilyn Monroe', 'Kylie Minogue', 'Sandra Bullock'],
    },

    cancer: {
        id: 'cancer',
        symbol: '♋',
        element: 'water',
        ruler: 'Moon',
        name: { en: 'Cancer', pl: 'Rak' },
        title: { en: 'The Romantic Dreamer', pl: 'Romantyczny Marzyciel' },
        description: {
            en: 'Venus in Cancer expresses love through nurturing, sentimental style choices. You are drawn to vintage pieces with history, soft fabrics that feel like a hug, and heirloom jewelry that tells a story.',
            pl: 'Wenus w Raku wyraża miłość poprzez opiekuńcze, sentymentalne wybory stylu. Przyciągają Cię vintage elementy z historią, miękkie tkaniny, które przytulają jak uścisk, i rodowa biżuteria opowiadająca historie.',
        },
        styleEssence: {
            en: 'Romantic, nostalgic, comfort-focused',
            pl: 'Romantyczny, nostalgiczny, zorientowany na komfort',
        },
        keyTraits: {
            en: ['Nurturing', 'Sentimental', 'Intuitive', 'Protective'],
            pl: ['Opiekuńczy', 'Sentymentalny', 'Intuicyjny', 'Ochronny'],
        },
        styleKeywords: {
            en: ['Romantic', 'Soft', 'Pearl Details', 'Silver'],
            pl: ['Romantyczny', 'Delikatny', 'Perłowe Detale', 'Srebro'],
        },
        colors: ['#E1BEE7', '#B0BEC5', '#F8BBD9', '#FFFDE7'],
        colorNames: {
            en: ['Soft Lavender', 'Moonlit Silver', 'Blush Pink', 'Creamy White'],
            pl: ['Miękka Lawenda', 'Księżycowe Srebro', 'Różowy Blush', 'Kremowa Biel'],
        },
        fabrics: {
            en: ['Soft knits', 'Cotton', 'Silk blends', 'Lace'],
            pl: ['Miękkie dzianiny', 'Bawełna', 'Mieszanki jedwabne', 'Koronka'],
        },
        avoidFabrics: {
            en: ['Stiff, uncomfortable fabrics', 'Cold, harsh textures'],
            pl: ['Sztywne, niewygodne tkaniny', 'Zimne, surowe tekstury'],
        },
        accessories: {
            en: ['Pearl jewelry', 'Vintage lockets', 'Heirloom pieces', 'Cozy cardigans'],
            pl: ['Perłowa biżuteria', 'Vintage medaliony', 'Rodowe elementy', 'Przytulne kardigany'],
        },
        signatures: {
            en: ['Vintage touches', 'Family heirlooms', 'Soft layers', 'Feminine details'],
            pl: ['Vintage akcenty', 'Rodzinne pamiątki', 'Miękkie warstwy', 'Kobiece detale'],
        },
        perfectFor: {
            en: ['Family gatherings', 'Cozy dates', 'Home entertaining', 'Anniversaries'],
            pl: ['Spotkania rodzinne', 'Przytulne randki', 'Przyjęcia domowe', 'Rocznice'],
        },
        bestMatches: ['scorpio', 'pisces', 'taurus'],
        celebrities: ['Meryl Streep', 'Anne Hathaway', 'Sofia Vergara'],
    },

    leo: {
        id: 'leo',
        symbol: '♌',
        element: 'fire',
        ruler: 'Sun',
        name: { en: 'Leo', pl: 'Lew' },
        title: { en: 'The Glamorous Star', pl: 'Glamour Gwiazda' },
        description: {
            en: 'Venus in Leo demands attention and adoration. You are drawn to luxurious, dramatic pieces that make you feel like royalty. Your style is theatrical, generous, and unapologetically glamorous.',
            pl: 'Wenus we Lwie wymaga uwagi i adoracji. Przyciągają Cię luksusowe, dramatyczne elementy, które sprawiają, że czujesz się jak królewska osoba. Twój styl jest teatralny, hojny i bezwstydnie glamour.',
        },
        styleEssence: {
            en: 'Dramatic, glamorous, royally confident',
            pl: 'Dramatyczny, glamour, królewsko pewny siebie',
        },
        keyTraits: {
            en: ['Confident', 'Generous', 'Creative', 'Loyal'],
            pl: ['Pewny siebie', 'Hojny', 'Kreatywny', 'Lojalny'],
        },
        styleKeywords: {
            en: ['Dramatic', 'Glamorous', 'Gold Details', 'Statement'],
            pl: ['Dramatyczny', 'Glamour', 'Złote Detale', 'Wyrazisty'],
        },
        colors: ['#FFB300', '#FF6F00', '#D4AF37', '#FFA000'],
        colorNames: {
            en: ['Regal Gold', 'Sunset Orange', 'Champagne Gold', 'Amber'],
            pl: ['Królewskie Złoto', 'Pomarańcz Zachodu', 'Szampańskie Złoto', 'Bursztyn'],
        },
        fabrics: {
            en: ['Silk', 'Satin', 'Brocade', 'Velvet'],
            pl: ['Jedwab', 'Satyna', 'Brokat', 'Aksamit'],
        },
        avoidFabrics: {
            en: ['Plain, boring fabrics', 'Anything that blends in'],
            pl: ['Zwykłe, nudne tkaniny', 'Wszystko, co się wtapia'],
        },
        accessories: {
            en: ['Statement jewelry', 'Gold pieces', 'Designer items', 'Dramatic sunglasses'],
            pl: ['Wyrazista biżuteria', 'Złote elementy', 'Designerskie rzeczy', 'Dramatyczne okulary'],
        },
        signatures: {
            en: ['Bold gold', 'Red carpet worthy', 'Head-turning pieces', 'Luxe fabrics'],
            pl: ['Odważne złoto', 'Godne czerwonego dywanu', 'Przyciągające wzrok', 'Luksusowe tkaniny'],
        },
        perfectFor: {
            en: ['Galas and events', 'Grand entrances', 'Celebrations', 'Being photographed'],
            pl: ['Gale i wydarzenia', 'Wielkie wejścia', 'Uroczystości', 'Sesje zdjęciowe'],
        },
        bestMatches: ['aries', 'sagittarius', 'libra'],
        celebrities: ['Jennifer Lopez', 'Beyoncé', 'Madonna'],
    },

    virgo: {
        id: 'virgo',
        symbol: '♍',
        element: 'earth',
        ruler: 'Mercury',
        name: { en: 'Virgo', pl: 'Panna' },
        title: { en: 'The Refined Minimalist', pl: 'Wyrafinowany Minimalista' },
        description: {
            en: 'Venus in Virgo appreciates clean lines, quality craftsmanship, and subtle elegance. You notice the details others miss – the stitching, the drape, the fit. Your style is polished, practical, and perfectly put-together.',
            pl: 'Wenus w Pannie docenia czyste linie, jakościowe rzemiosło i subtelną elegancję. Zauważasz detale, które inni pomijają – szwy, układ, dopasowanie. Twój styl jest dopracowany, praktyczny i perfekcyjnie skomponowany.',
        },
        styleEssence: {
            en: 'Minimalist, refined, detail-oriented',
            pl: 'Minimalistyczny, wyrafinowany, zorientowany na detale',
        },
        keyTraits: {
            en: ['Analytical', 'Refined', 'Practical', 'Detail-oriented'],
            pl: ['Analityczny', 'Wyrafinowany', 'Praktyczny', 'Zorientowany na detale'],
        },
        styleKeywords: {
            en: ['Minimalist', 'Refined', 'Clean Lines', 'Neutral'],
            pl: ['Minimalistyczny', 'Wyrafinowany', 'Czyste Linie', 'Neutralny'],
        },
        colors: ['#8D6E63', '#BCAAA4', '#D7CCC8', '#EFEBE9'],
        colorNames: {
            en: ['Taupe', 'Warm Grey', 'Soft Beige', 'Pure Cream'],
            pl: ['Taupe', 'Ciepły Szary', 'Miękki Beż', 'Czysta Śmietanka'],
        },
        fabrics: {
            en: ['Fine cotton', 'Wool blends', 'Quality knits', 'Organic fabrics'],
            pl: ['Delikatna bawełna', 'Mieszanki wełniane', 'Jakościowe dzianiny', 'Organiczne tkaniny'],
        },
        avoidFabrics: {
            en: ['Cheap, poorly made items', 'Loud prints'],
            pl: ['Tanie, źle wykonane rzeczy', 'Krzykliwe wzory'],
        },
        accessories: {
            en: ['Minimal jewelry', 'Quality leather goods', 'Classic watches', 'Structured bags'],
            pl: ['Minimalistyczna biżuteria', 'Jakościowe skórzane akcesoria', 'Klasyczne zegarki', 'Strukturalne torebki'],
        },
        signatures: {
            en: ['Perfect tailoring', 'Capsule wardrobe', 'Subtle details', 'Timeless basics'],
            pl: ['Perfekcyjne szycie', 'Garderoba kapsułowa', 'Subtelne detale', 'Ponadczasowe podstawy'],
        },
        perfectFor: {
            en: ['Business meetings', 'Art openings', 'Sophisticated dining', 'Everyday elegance'],
            pl: ['Spotkania biznesowe', 'Wernisaże', 'Wykwintne kolacje', 'Codzienna elegancja'],
        },
        bestMatches: ['taurus', 'capricorn', 'cancer'],
        celebrities: ['Blake Lively', 'Kate Middleton', 'Julia Roberts'],
    },

    libra: {
        id: 'libra',
        symbol: '♎',
        element: 'air',
        ruler: 'Venus',
        name: { en: 'Libra', pl: 'Waga' },
        title: { en: 'The Elegant Harmonist', pl: 'Elegancki Harmonista' },
        description: {
            en: 'Venus is at home in Libra, giving you an innate sense of beauty, balance, and elegance. You are naturally drawn to harmonious color palettes, beautiful proportions, and classic pieces with a romantic twist.',
            pl: 'Wenus jest u siebie w Wadze, dając Ci wrodzone poczucie piękna, równowagi i elegancji. Naturalnie przyciągają Cię harmonijne palety kolorów, piękne proporcje i klasyczne elementy z romantycznym akcentem.',
        },
        styleEssence: {
            en: 'Elegant, harmonious, romantically classic',
            pl: 'Elegancki, harmonijny, romantycznie klasyczny',
        },
        keyTraits: {
            en: ['Harmonious', 'Diplomatic', 'Aesthetic', 'Romantic'],
            pl: ['Harmonijny', 'Dyplomatyczny', 'Estetyczny', 'Romantyczny'],
        },
        styleKeywords: {
            en: ['Elegant', 'Harmonious', 'Balanced', 'Pastel'],
            pl: ['Elegancki', 'Harmonijny', 'Zbalansowany', 'Pastelowy'],
        },
        colors: ['#F8BBD9', '#CE93D8', '#B39DDB', '#FFAB91'],
        colorNames: {
            en: ['Rose Pink', 'Soft Lilac', 'Lavender Blue', 'Peach'],
            pl: ['Różowy Rose', 'Miękki Liliowy', 'Lawendowy Błękit', 'Brzoskwinia'],
        },
        fabrics: {
            en: ['Silk', 'Chiffon', 'Fine cotton', 'Soft wool'],
            pl: ['Jedwab', 'Szyfon', 'Delikatna bawełna', 'Miękka wełna'],
        },
        avoidFabrics: {
            en: ['Harsh, aggressive textures', 'Clashing combinations'],
            pl: ['Surowe, agresywne tekstury', 'Kłócące się kombinacje'],
        },
        accessories: {
            en: ['Delicate jewelry', 'Beautiful bags', 'Elegant scarves', 'Art pieces'],
            pl: ['Delikatna biżuteria', 'Piękne torebki', 'Eleganckie szale', 'Artystyczne elementy'],
        },
        signatures: {
            en: ['Perfect balance', 'Romantic florals', 'Pretty details', 'Polished looks'],
            pl: ['Idealna równowaga', 'Romantyczne kwiaty', 'Ładne detale', 'Dopracowane stylizacje'],
        },
        perfectFor: {
            en: ['Romantic dinners', 'Weddings', 'Art events', 'Afternoon tea'],
            pl: ['Romantyczne kolacje', 'Wesela', 'Wydarzia artystyczne', 'Popołudniowa herbata'],
        },
        bestMatches: ['gemini', 'aquarius', 'leo'],
        celebrities: ['Grace Kelly', 'Brigitte Bardot', 'Kate Winslet'],
    },

    scorpio: {
        id: 'scorpio',
        symbol: '♏',
        element: 'water',
        ruler: 'Pluto',
        name: { en: 'Scorpio', pl: 'Skorpion' },
        title: { en: 'The Mysterious Intensity', pl: 'Tajemnicza Intensywność' },
        description: {
            en: 'Venus in Scorpio brings depth, mystery, and magnetic allure to your style. You are drawn to dark, sophisticated pieces that reveal just enough while keeping secrets. Your fashion sense is powerful, transformative, and incredibly seductive.',
            pl: 'Wenus w Skorpionie wnosi głębię, tajemniczość i magnetyczny urok do Twojego stylu. Przyciągają Cię ciemne, wyrafinowane elementy, które odsłaniają tylko tyle, ile trzeba, zachowując tajemnice. Twój zmysł mody jest potężny, transformacyjny i niesamowicie uwodzicielski.',
        },
        styleEssence: {
            en: 'Mysterious, intense, magnetically alluring',
            pl: 'Tajemniczy, intensywny, magnetycznie urzekający',
        },
        keyTraits: {
            en: ['Intense', 'Passionate', 'Mysterious', 'Powerful'],
            pl: ['Intensywny', 'Pasjonujący', 'Tajemniczy', 'Potężny'],
        },
        styleKeywords: {
            en: ['Mysterious', 'Intense', 'Dark Palette', 'Sensual'],
            pl: ['Tajemniczy', 'Intensywny', 'Ciemna Paleta', 'Zmysłowy'],
        },
        colors: ['#4A148C', '#1A237E', '#880E4F', '#212121'],
        colorNames: {
            en: ['Deep Purple', 'Midnight Blue', 'Burgundy Wine', 'Black'],
            pl: ['Głęboki Fiolet', 'Północny Błękit', 'Burgundowe Wino', 'Czerń'],
        },
        fabrics: {
            en: ['Leather', 'Velvet', 'Lace', 'Silk'],
            pl: ['Skóra', 'Aksamit', 'Koronka', 'Jedwab'],
        },
        avoidFabrics: {
            en: ['Light, airy pastels', 'Anything overly sweet'],
            pl: ['Lekkie, przewiewne pastele', 'Cokolwiek zbyt słodkiego'],
        },
        accessories: {
            en: ['Dark gemstones', 'Statement rings', 'Leather pieces', 'Gothic touches'],
            pl: ['Ciemne kamienie szlachetne', 'Wyraziste pierścienie', 'Skórzane elementy', 'Gotyckie akcenty'],
        },
        signatures: {
            en: ['All black', 'Dark romance', 'Power pieces', 'Subtle seduction'],
            pl: ['Cała czerń', 'Ciemny romans', 'Elementy mocy', 'Subtelne uwodzenie'],
        },
        perfectFor: {
            en: ['Evening events', 'Date nights', 'Power moves', 'Making impressions'],
            pl: ['Wieczorne wydarzenia', 'Randkowe wieczory', 'Ruchy mocy', 'Robienie wrażenia'],
        },
        bestMatches: ['cancer', 'pisces', 'virgo'],
        celebrities: ['Dita Von Teese', 'Scarlett Johansson', 'Leonardo DiCaprio'],
    },

    sagittarius: {
        id: 'sagittarius',
        symbol: '♐',
        element: 'fire',
        ruler: 'Jupiter',
        name: { en: 'Sagittarius', pl: 'Strzelec' },
        title: { en: 'The Bohemian Explorer', pl: 'Bohemijski Odkrywca' },
        description: {
            en: 'Venus in Sagittarius loves freedom, adventure, and global influences. You collect pieces from your travels and mix cultural elements with an effortless, bohemian flair. Your style is optimistic, adventurous, and refreshingly authentic.',
            pl: 'Wenus w Strzelcu kocha wolność, przygodę i globalne wpływy. Zbierasz elementy ze swoich podróży i mieszasz elementy kulturowe z bezpretensjonalnym, bohemijskim zacięciem. Twój styl jest optymistyczny, awanturniczy i odświeżająco autentyczny.',
        },
        styleEssence: {
            en: 'Bohemian, adventurous, globally inspired',
            pl: 'Bohemijski, awanturniczy, globalnie inspirowany',
        },
        keyTraits: {
            en: ['Adventurous', 'Optimistic', 'Free-spirited', 'Philosophical'],
            pl: ['Awanturniczy', 'Optymistyczny', 'Wolny duch', 'Filozoficzny'],
        },
        styleKeywords: {
            en: ['Bohemian', 'Ethnic Patterns', 'Natural Materials', 'Adventurous'],
            pl: ['Bohemijski', 'Etniczne Wzory', 'Naturalne Materiały', 'Awanturniczy'],
        },
        colors: ['#FF7043', '#BF360C', '#8D6E63', '#FFB74D'],
        colorNames: {
            en: ['Terracotta', 'Rust', 'Earth Brown', 'Amber Gold'],
            pl: ['Terakota', 'Rdza', 'Brąz Ziemi', 'Bursztynowe Złoto'],
        },
        fabrics: {
            en: ['Linen', 'Cotton', 'Suede', 'Natural fibers'],
            pl: ['Len', 'Bawełna', 'Zamsz', 'Naturalne włókna'],
        },
        avoidFabrics: {
            en: ['Restrictive formal wear', 'Stiff, uncomfortable pieces'],
            pl: ['Restrykcyjna odzież formalna', 'Sztywne, niewygodne elementy'],
        },
        accessories: {
            en: ['Travel jewelry', 'Woven bags', 'Ethnic pieces', 'Comfortable boots'],
            pl: ['Podróżnicza biżuteria', 'Plecione torebki', 'Etniczne elementy', 'Wygodne buty'],
        },
        signatures: {
            en: ['Layered looks', 'Global prints', 'Easy elegance', 'Collected treasures'],
            pl: ['Warstwowe stylizacje', 'Globalne wzory', 'Łatwa elegancja', 'Zbierane skarby'],
        },
        perfectFor: {
            en: ['Travel', 'Outdoor events', 'Festivals', 'Casual adventures'],
            pl: ['Podróże', 'Wydarzenia plenerowe', 'Festiwale', 'Zwykłe przygody'],
        },
        bestMatches: ['aries', 'leo', 'aquarius'],
        celebrities: ['Taylor Swift', 'Miley Cyrus', 'Brad Pitt'],
    },

    capricorn: {
        id: 'capricorn',
        symbol: '♑',
        element: 'earth',
        ruler: 'Saturn',
        name: { en: 'Capricorn', pl: 'Koziorożec' },
        title: { en: 'The Timeless Authority', pl: 'Ponadczasowy Autorytet' },
        description: {
            en: 'Venus in Capricorn values tradition, quality, and lasting style. You invest in classic pieces that convey success and sophistication. Your wardrobe is built on timeless foundations that project authority and accomplishment.',
            pl: 'Wenus w Koziorożcu ceni tradycję, jakość i trwały styl. Inwestujesz w klasyczne elementy, które przekazują sukces i wyrafinowanie. Twoja garderoba jest zbudowana na ponadczasowych fundamentach, które projektują autorytet i osiągnięcia.',
        },
        styleEssence: {
            en: 'Classic, structured, timelessly powerful',
            pl: 'Klasyczny, strukturalny, ponadczasowo potężny',
        },
        keyTraits: {
            en: ['Ambitious', 'Disciplined', 'Traditional', 'Sophisticated'],
            pl: ['Ambitny', 'Zdyscyplinowany', 'Tradycyjny', 'Wyrafinowany'],
        },
        styleKeywords: {
            en: ['Classic', 'Structured', 'Timeless', 'Power Dressing'],
            pl: ['Klasyczny', 'Strukturalny', 'Ponadczasowy', 'Power Dressing'],
        },
        colors: ['#37474F', '#263238', '#5D4037', '#1B5E20'],
        colorNames: {
            en: ['Charcoal', 'Navy Black', 'Dark Brown', 'Forest Green'],
            pl: ['Węgiel', 'Granatowa Czerń', 'Ciemny Brąz', 'Leśna Zieleń'],
        },
        fabrics: {
            en: ['Fine wool', 'Cashmere', 'Quality leather', 'Tailored fabrics'],
            pl: ['Delikatna wełna', 'Kaszmir', 'Jakościowa skóra', 'Tkaniny krawieckie'],
        },
        avoidFabrics: {
            en: ['Cheap, trendy items', 'Overly casual pieces'],
            pl: ['Tanie, modne rzeczy', 'Zbyt casualowe elementy'],
        },
        accessories: {
            en: ['Fine watches', 'Quality leather goods', 'Pearl jewelry', 'Investment pieces'],
            pl: ['Dobre zegarki', 'Jakościowe skórzane akcesoria', 'Perłowa biżuteria', 'Inwestycyjne elementy'],
        },
        signatures: {
            en: ['Power suits', 'Classic trench', 'Quality basics', 'Understated luxury'],
            pl: ['Garnitury mocy', 'Klasyczny trencz', 'Jakościowe podstawy', 'Stonowany luksus'],
        },
        perfectFor: {
            en: ['Board meetings', 'Networking events', 'Business dinners', 'Presentations'],
            pl: ['Spotkania zarządu', 'Networking', 'Biznesowe kolacje', 'Prezentacje'],
        },
        bestMatches: ['taurus', 'virgo', 'pisces'],
        celebrities: ['Michelle Obama', 'Elvis Presley', 'Zooey Deschanel'],
    },

    aquarius: {
        id: 'aquarius',
        symbol: '♒',
        element: 'air',
        ruler: 'Uranus',
        name: { en: 'Aquarius', pl: 'Wodnik' },
        title: { en: 'The Futuristic Rebel', pl: 'Futurystyczny Buntownik' },
        description: {
            en: 'Venus in Aquarius breaks all the rules with innovative, unique style choices. You are drawn to avant-garde designs, sustainable fashion, and pieces that express your individuality. Your style is progressive, humanitarian, and unapologetically different.',
            pl: 'Wenus w Wodniku łamie wszystkie zasady innowacyjnymi, unikalnymi wyborami stylu. Przyciągają Cię awangardowe projekty, zrównoważona moda i elementy wyrażające Twoją indywidualność. Twój styl jest postępowy, humanitarny i bezwstydnie odmienny.',
        },
        styleEssence: {
            en: 'Innovative, unique, progressively rebellious',
            pl: 'Innowacyjny, unikalny, postępowo buntowniczy',
        },
        keyTraits: {
            en: ['Original', 'Progressive', 'Humanitarian', 'Independent'],
            pl: ['Oryginalny', 'Postępowy', 'Humanitarny', 'Niezależny'],
        },
        styleKeywords: {
            en: ['Innovative', 'Unique', 'Futuristic', 'Electric'],
            pl: ['Innowacyjny', 'Unikalny', 'Futurystyczny', 'Elektryczny'],
        },
        colors: ['#00BCD4', '#0097A7', '#7E57C2', '#E040FB'],
        colorNames: {
            en: ['Electric Cyan', 'Deep Teal', 'Violet', 'Neon Magenta'],
            pl: ['Elektryczny Cyjan', 'Głęboki Morski', 'Fiolet', 'Neonowa Magenta'],
        },
        fabrics: {
            en: ['Sustainable materials', 'Tech fabrics', 'Recycled textiles', 'Innovative blends'],
            pl: ['Zrównoważone materiały', 'Tkaniny techniczne', 'Tekstylia z recyklingu', 'Innowacyjne mieszanki'],
        },
        avoidFabrics: {
            en: ['Boring, conventional pieces', 'Follow-the-crowd fashion'],
            pl: ['Nudne, konwencjonalne elementy', 'Moda podążająca za tłumem'],
        },
        accessories: {
            en: ['Unique finds', 'Statement tech', 'Sustainable pieces', 'Avant-garde items'],
            pl: ['Unikalne znaleziska', 'Techno oświadczenia', 'Zrównoważone elementy', 'Awangardowe rzeczy'],
        },
        signatures: {
            en: ['Unexpected combos', 'Vintage tech', 'Statement pieces', 'Sustainable choices'],
            pl: ['Niespodziewane kombinacje', 'Vintage tech', 'Wyraziste elementy', 'Zrównoważony wybór'],
        },
        perfectFor: {
            en: ['Art openings', 'Protest marches', 'Creative work', 'Breaking boundaries'],
            pl: ['Wernisaże', 'Marsze protestacyjne', 'Prace kreatywne', 'Łamanie barier'],
        },
        bestMatches: ['gemini', 'libra', 'sagittarius'],
        celebrities: ['Oprah Winfrey', 'Harry Styles', 'Shakira'],
    },

    pisces: {
        id: 'pisces',
        symbol: '♓',
        element: 'water',
        ruler: 'Neptune',
        name: { en: 'Pisces', pl: 'Ryby' },
        title: { en: 'The Ethereal Dreamer', pl: 'Eteryczny Marzyciel' },
        description: {
            en: 'Venus in Pisces expresses boundless creativity and dreamy romanticism through fashion. You are drawn to flowing fabrics, ocean-inspired hues, and pieces with a mystical, otherworldly quality. Your style is poetic, intuitive, and endlessly imaginative.',
            pl: 'Wenus w Rybach wyraża nieograniczoną kreatywność i marzycielski romantyzm poprzez modę. Przyciągają Cię zwiewne tkaniny, oceaniczne odcienie i elementy o mistycznej, pozaziemskiej jakości. Twój styl jest poetycki, intuicyjny i nieskończenie kreatywny.',
        },
        styleEssence: {
            en: 'Dreamy, ethereal, mystically romantic',
            pl: 'Marzycielski, eteryczny, mistycznie romantyczny',
        },
        keyTraits: {
            en: ['Intuitive', 'Creative', 'Compassionate', 'Dreamy'],
            pl: ['Intuicyjny', 'Kreatywny', 'Współczujący', 'Marzycielski'],
        },
        styleKeywords: {
            en: ['Dreamy', 'Ethereal', 'Flowing', 'Ocean Hues'],
            pl: ['Marzycielski', 'Eteryczny', 'Zwiewny', 'Oceaniczne Odcienie'],
        },
        colors: ['#B39DDB', '#7E57C2', '#80DEEA', '#4DB6AC'],
        colorNames: {
            en: ['Lavender Mist', 'Deep Violet', 'Ocean Blue', 'Sea Green'],
            pl: ['Lawendowa Mgła', 'Głęboki Fiolet', 'Błękit Oceanu', 'Morska Zieleń'],
        },
        fabrics: {
            en: ['Chiffon', 'Silk', 'Tulle', 'Flowing fabrics'],
            pl: ['Szyfon', 'Jedwab', 'Tiul', 'Zwiewne tkaniny'],
        },
        avoidFabrics: {
            en: ['Stiff, structured pieces', 'Harsh, rigid textures'],
            pl: ['Sztywne, strukturalne elementy', 'Surowe, sztywne tekstury'],
        },
        accessories: {
            en: ['Seashell jewelry', 'Crystals', 'Iridescent pieces', 'Dreamy scarves'],
            pl: ['Biżuteria z muszli', 'Kryształy', 'Opalizujące elementy', 'Marzycielskie szale'],
        },
        signatures: {
            en: ['Flowy silhouettes', 'Water colors', 'Mystical details', 'Romantic layers'],
            pl: ['Zwiewne sylwetki', 'Akwarelowe kolory', 'Mistyczne detale', 'Romantyczne warstwy'],
        },
        perfectFor: {
            en: ['Beach weddings', 'Art events', 'Romantic getaways', 'Creative retreats'],
            pl: ['Śluby na plaży', 'Wydarzenia artystyczne', 'Romantyczne wyjazdy', 'Kreatywne rekolekcje'],
        },
        bestMatches: ['cancer', 'scorpio', 'capricorn'],
        celebrities: ['Rihanna', 'Drew Barrymore', 'Justin Bieber'],
    },
};

/**
 * Get Venus sign data by sign ID
 */
export function getVenusSignData(sign: VenusSign): VenusSignData {
    return VENUS_SIGN_DATA[sign];
}

/**
 * Get all Venus signs
 */
export function getAllVenusSigns(): VenusSignData[] {
    return Object.values(VENUS_SIGN_DATA);
}
