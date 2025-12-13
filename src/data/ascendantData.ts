/* ===========================================
   ASCENDANT DATA - Rising Sign Descriptions
   Style and personality for each Ascendant
   =========================================== */

import type { VenusSign } from '../types/domain';

export interface AscendantSignData {
    id: VenusSign;
    symbol: string;
    name: { en: string; pl: string };
    title: { en: string; pl: string };
    description: { en: string; pl: string };
    firstImpression: { en: string; pl: string };
    styleVibe: { en: string[]; pl: string[] };
    fashionApproach: { en: string; pl: string };
}

export const ASCENDANT_SIGN_DATA: Record<VenusSign, AscendantSignData> = {
    aries: {
        id: 'aries',
        symbol: '♈',
        name: { en: 'Aries Rising', pl: 'Ascendant w Baranie' },
        title: { en: 'The Bold First Impression', pl: 'Odważne Pierwsze Wrażenie' },
        description: {
            en: 'With Aries Rising, you project confidence, energy, and a go-getter attitude. People see you as a natural leader who isn\'t afraid to take charge.',
            pl: 'Z Ascendentem w Baranie projektujesz pewność siebie, energię i postawę zdobywcy. Ludzie widzą Cię jako naturalnego lidera, który nie boi się przejąć kontroli.',
        },
        firstImpression: {
            en: 'Dynamic, assertive, competitive, athletic, youthful',
            pl: 'Dynamiczny, asertywny, konkurencyjny, atletyczny, młodzieńczy',
        },
        styleVibe: {
            en: ['Athletic-chic', 'Power shoulders', 'Striking colors', 'Bold accessories'],
            pl: ['Atletyczny szyk', 'Mocne ramiona', 'Uderzające kolory', 'Odważne dodatki'],
        },
        fashionApproach: {
            en: 'Your style should reflect your fearless nature. Opt for pieces that make a statement and allow you to move freely.',
            pl: 'Twój styl powinien odzwierciedlać Twoją nieustraszność. Wybieraj elementy, które robią wrażenie i pozwalają swobodnie się poruszać.',
        },
    },
    taurus: {
        id: 'taurus',
        symbol: '♉',
        name: { en: 'Taurus Rising', pl: 'Ascendant w Byku' },
        title: { en: 'The Sensual Presence', pl: 'Zmysłowa Obecność' },
        description: {
            en: 'Taurus Rising gives you a grounded, calm demeanor. You appear reliable, warm, and have an eye for quality and beauty.',
            pl: 'Ascendent w Byku daje Ci uziemione, spokojne usposobienie. Wydajesz się niezawodny, ciepły i masz oko do jakości i piękna.',
        },
        firstImpression: {
            en: 'Calm, reliable, elegant, sensual, approachable',
            pl: 'Spokojny, niezawodny, elegancki, zmysłowy, przystępny',
        },
        styleVibe: {
            en: ['Luxe basics', 'Earth tones', 'Quality fabrics', 'Timeless pieces'],
            pl: ['Luksusowe podstawy', 'Tonacje ziemiste', 'Jakościowe tkaniny', 'Ponadczasowe elementy'],
        },
        fashionApproach: {
            en: 'Invest in quality over quantity. Soft, touchable fabrics and classic silhouettes suit you best.',
            pl: 'Inwestuj w jakość ponad ilość. Miękkie, dotykalne tkaniny i klasyczne sylwetki pasują Ci najlepiej.',
        },
    },
    gemini: {
        id: 'gemini',
        symbol: '♊',
        name: { en: 'Gemini Rising', pl: 'Ascendant w Bliźniętach' },
        title: { en: 'The Witty Charmer', pl: 'Dowcipny Czarodziej' },
        description: {
            en: 'Gemini Rising makes you appear youthful, curious, and endlessly interesting. You come across as versatile and quick-witted.',
            pl: 'Ascendent w Bliźniętach sprawia, że wydajesz się młodzieńczy, ciekawski i nieskończenie interesujący. Sprawiasz wrażenie wszechstronnego i bystrego.',
        },
        firstImpression: {
            en: 'Curious, talkative, youthful, quick, adaptable',
            pl: 'Ciekawski, rozmowny, młodzieńczy, szybki, elastyczny',
        },
        styleVibe: {
            en: ['Playful patterns', 'Mix and match', 'Trendy pieces', 'Statement accessories'],
            pl: ['Zabawne wzory', 'Mix and match', 'Modne elementy', 'Wyraziste dodatki'],
        },
        fashionApproach: {
            en: 'Embrace variety and don\'t be afraid to mix patterns. Your style can change with your mood.',
            pl: 'Przyjmij różnorodność i nie bój się mieszać wzorów. Twój styl może zmieniać się z nastrojem.',
        },
    },
    cancer: {
        id: 'cancer',
        symbol: '♋',
        name: { en: 'Cancer Rising', pl: 'Ascendant w Raku' },
        title: { en: 'The Nurturing Soul', pl: 'Opiekuńcza Dusza' },
        description: {
            en: 'Cancer Rising gives you a soft, approachable appearance. You seem caring, intuitive, and emotionally intelligent.',
            pl: 'Ascendent w Raku daje Ci miękki, przystępny wygląd. Wydajesz się opiekuńczy, intuicyjny i emocjonalnie inteligentny.',
        },
        firstImpression: {
            en: 'Warm, nurturing, approachable, sensitive, protective',
            pl: 'Ciepły, opiekuńczy, przystępny, wrażliwy, ochronny',
        },
        styleVibe: {
            en: ['Soft fabrics', 'Romantic details', 'Vintage touches', 'Comforting colors'],
            pl: ['Miękkie tkaniny', 'Romantyczne detale', 'Vintage akcenty', 'Kojące kolory'],
        },
        fashionApproach: {
            en: 'Choose pieces that feel like a warm hug. Vintage and sentimental items suit your nostalgic nature.',
            pl: 'Wybieraj elementy, które czują się jak ciepły uścisk. Vintage i sentymentalne rzeczy pasują do Twojej nostalgicznej natury.',
        },
    },
    leo: {
        id: 'leo',
        symbol: '♌',
        name: { en: 'Leo Rising', pl: 'Ascendant we Lwie' },
        title: { en: 'The Radiant Star', pl: 'Promienna Gwiazda' },
        description: {
            en: 'Leo Rising gives you a magnetic, regal presence. You naturally draw attention and appear confident and warm-hearted.',
            pl: 'Ascendent we Lwie daje Ci magnetyczną, królewską obecność. Naturalnie przyciągasz uwagę i wydajesz się pewny siebie i ciepłoserdeczny.',
        },
        firstImpression: {
            en: 'Confident, dramatic, warm, generous, attention-grabbing',
            pl: 'Pewny siebie, dramatyczny, ciepły, hojny, przyciągający uwagę',
        },
        styleVibe: {
            en: ['Gold accents', 'Statement pieces', 'Luxurious fabrics', 'Bold colors'],
            pl: ['Złote akcenty', 'Wyraziste elementy', 'Luksusowe tkaniny', 'Odważne kolory'],
        },
        fashionApproach: {
            en: 'Don\'t shy away from glamour. You were born to stand out with dramatic, attention-grabbing pieces.',
            pl: 'Nie strasz się glamour. Urodziłeś się, by wyróżniać się dramatycznymi, przyciągającymi uwagę elementami.',
        },
    },
    virgo: {
        id: 'virgo',
        symbol: '♍',
        name: { en: 'Virgo Rising', pl: 'Ascendant w Pannie' },
        title: { en: 'The Polished Professional', pl: 'Dopracowany Profesjonalista' },
        description: {
            en: 'Virgo Rising makes you appear organized, intelligent, and put-together. You project an air of competence and attention to detail.',
            pl: 'Ascendent w Pannie sprawia, że wydajesz się zorganizowany, inteligentny i dopracowany. Projektujesz aurę kompetencji i dbałości o szczegóły.',
        },
        firstImpression: {
            en: 'Organized, helpful, modest, practical, refined',
            pl: 'Zorganizowany, pomocny, skromny, praktyczny, wyrafinowany',
        },
        styleVibe: {
            en: ['Clean lines', 'Neutral palette', 'Quality basics', 'Perfect fit'],
            pl: ['Czyste linie', 'Neutralna paleta', 'Jakościowe podstawy', 'Idealne dopasowanie'],
        },
        fashionApproach: {
            en: 'Focus on fit and quality. Well-tailored, minimalist pieces in natural colors suit you perfectly.',
            pl: 'Skup się na dopasowaniu i jakości. Dobrze skrojone, minimalistyczne elementy w naturalnych kolorach pasują Ci idealnie.',
        },
    },
    libra: {
        id: 'libra',
        symbol: '♎',
        name: { en: 'Libra Rising', pl: 'Ascendant w Wadze' },
        title: { en: 'The Harmonious Beauty', pl: 'Harmonijna Piękność' },
        description: {
            en: 'Libra Rising gives you a graceful, pleasant appearance. You seem diplomatic, charming, and naturally stylish.',
            pl: 'Ascendent w Wadze daje Ci pełen wdzięku, przyjemny wygląd. Wydajesz się dyplomatyczny, czarujący i naturalnie stylowy.',
        },
        firstImpression: {
            en: 'Charming, diplomatic, elegant, balanced, graceful',
            pl: 'Czarujący, dyplomatyczny, elegancki, zbalansowany, pełen wdzięku',
        },
        styleVibe: {
            en: ['Balanced proportions', 'Romantic florals', 'Pastel shades', 'Elegant accessories'],
            pl: ['Zbalansowane proporcje', 'Romantyczne kwiaty', 'Pastelowe odcienie', 'Eleganckie dodatki'],
        },
        fashionApproach: {
            en: 'Create harmonious, well-coordinated outfits. You have a natural eye for beauty and balance.',
            pl: 'Twórz harmonijne, dobrze skoordynowane stylizacje. Masz naturalne oko do piękna i równowagi.',
        },
    },
    scorpio: {
        id: 'scorpio',
        symbol: '♏',
        name: { en: 'Scorpio Rising', pl: 'Ascendant w Skorpionie' },
        title: { en: 'The Magnetic Mystery', pl: 'Magnetyczna Tajemnica' },
        description: {
            en: 'Scorpio Rising gives you an intense, mysterious presence. You project power, depth, and an undeniable magnetism.',
            pl: 'Ascendent w Skorpionie daje Ci intensywną, tajemniczą obecność. Projektujesz moc, głębię i niezaprzeczalny magnetyzm.',
        },
        firstImpression: {
            en: 'Intense, mysterious, powerful, penetrating, magnetic',
            pl: 'Intensywny, tajemniczy, potężny, przenikliwy, magnetyczny',
        },
        styleVibe: {
            en: ['Dark palette', 'Body-conscious cuts', 'Luxe textures', 'Statement pieces'],
            pl: ['Ciemna paleta', 'Przylegające kroje', 'Luksusowe tekstury', 'Wyraziste elementy'],
        },
        fashionApproach: {
            en: 'Embrace your mystery with dark colors and transformative pieces. Less is more, but make it impactful.',
            pl: 'Przyjmij swoją tajemniczość ciemnymi kolorami i transformacyjnymi elementami. Mniej znaczy więcej, ale niech robi wrażenie.',
        },
    },
    sagittarius: {
        id: 'sagittarius',
        symbol: '♐',
        name: { en: 'Sagittarius Rising', pl: 'Ascendant w Strzelcu' },
        title: { en: 'The Adventurous Spirit', pl: 'Awanturniczy Duch' },
        description: {
            en: 'Sagittarius Rising makes you appear optimistic, adventurous, and philosophical. You project enthusiasm and a love of freedom.',
            pl: 'Ascendent w Strzelcu sprawia, że wydajesz się optymistyczny, awanturniczy i filozoficzny. Projektujesz entuzjazm i miłość do wolności.',
        },
        firstImpression: {
            en: 'Optimistic, adventurous, honest, philosophical, free-spirited',
            pl: 'Optymistyczny, awanturniczy, szczery, filozoficzny, wolny duch',
        },
        styleVibe: {
            en: ['Global prints', 'Natural materials', 'Bohemian touches', 'Easy-wearing pieces'],
            pl: ['Globalne wzory', 'Naturalne materiały', 'Bohemijskie akcenty', 'Wygodne elementy'],
        },
        fashionApproach: {
            en: 'Choose pieces from your travels and mix cultural influences. Comfort and freedom of movement are key.',
            pl: 'Wybieraj elementy ze swoich podróży i mieszaj wpływy kulturowe. Komfort i swoboda ruchu są kluczowe.',
        },
    },
    capricorn: {
        id: 'capricorn',
        symbol: '♑',
        name: { en: 'Capricorn Rising', pl: 'Ascendant w Koziorożcu' },
        title: { en: 'The Authoritative Presence', pl: 'Autorytatywna Obecność' },
        description: {
            en: 'Capricorn Rising gives you a serious, professional demeanor. You appear responsible, ambitious, and wise beyond your years.',
            pl: 'Ascendent w Koziorożcu daje Ci poważne, profesjonalne usposobienie. Wydajesz się odpowiedzialny, ambitny i mądrzejszy niż na swój wiek.',
        },
        firstImpression: {
            en: 'Responsible, ambitious, serious, mature, authoritative',
            pl: 'Odpowiedzialny, ambitny, poważny, dojrzały, autorytatywny',
        },
        styleVibe: {
            en: ['Classic tailoring', 'Dark neutral palette', 'Quality investment pieces', 'Structured silhouettes'],
            pl: ['Klasyczne szycie', 'Ciemna neutralna paleta', 'Jakościowe inwestycyjne elementy', 'Strukturalne sylwetki'],
        },
        fashionApproach: {
            en: 'Invest in timeless, well-made pieces. Your style should convey success and professionalism.',
            pl: 'Inwestuj w ponadczasowe, dobrze wykonane elementy. Twój styl powinien przekazywać sukces i profesjonalizm.',
        },
    },
    aquarius: {
        id: 'aquarius',
        symbol: '♒',
        name: { en: 'Aquarius Rising', pl: 'Ascendant w Wodniku' },
        title: { en: 'The Unique Visionary', pl: 'Unikalny Wizjoner' },
        description: {
            en: 'Aquarius Rising makes you appear unique, progressive, and slightly unconventional. You project open-mindedness and originality.',
            pl: 'Ascendent w Wodniku sprawia, że wydajesz się unikalny, postępowy i lekko niekonwencjonalny. Projektujesz otwartość umysłu i oryginalność.',
        },
        firstImpression: {
            en: 'Unique, progressive, friendly, humanitarian, eccentric',
            pl: 'Unikalny, postępowy, przyjazny, humanitarny, ekscentryczny',
        },
        styleVibe: {
            en: ['Unique finds', 'Futuristic elements', 'Eclectic mixing', 'Sustainable fashion'],
            pl: ['Unikalne znaleziska', 'Futurystyczne elementy', 'Eklektyczne mieszanie', 'Zrównoważona moda'],
        },
        fashionApproach: {
            en: 'Break the rules and embrace your individuality. Sustainable and unique pieces suit your forward-thinking nature.',
            pl: 'Łam zasady i przyjmij swoją indywidualność. Zrównoważone i unikalne elementy pasują do Twojej przyszłościowej natury.',
        },
    },
    pisces: {
        id: 'pisces',
        symbol: '♓',
        name: { en: 'Pisces Rising', pl: 'Ascendant w Rybach' },
        title: { en: 'The Dreamy Mystic', pl: 'Marzycielski Mistyk' },
        description: {
            en: 'Pisces Rising gives you a dreamy, ethereal presence. You appear compassionate, artistic, and slightly otherworldly.',
            pl: 'Ascendent w Rybach daje Ci marzycielską, eteryczną obecność. Wydajesz się współczujący, artystyczny i lekko pozaziemski.',
        },
        firstImpression: {
            en: 'Dreamy, compassionate, artistic, intuitive, spiritual',
            pl: 'Marzycielski, współczujący, artystyczny, intuicyjny, duchowy',
        },
        styleVibe: {
            en: ['Flowing fabrics', 'Ocean colors', 'Mystical details', 'Romantic layers'],
            pl: ['Zwiewne tkaniny', 'Oceaniczne kolory', 'Mistyczne detale', 'Romantyczne warstwy'],
        },
        fashionApproach: {
            en: 'Let your romantic, creative nature guide you. Soft, flowing pieces in water colors suit your ethereal energy.',
            pl: 'Niech Twoja romantyczna, kreatywna natura Cię prowadzi. Miękkie, zwiewne elementy w wodnych kolorach pasują do Twojej eterycznej energii.',
        },
    },
};

/**
 * Get Ascendant sign data by sign ID
 */
export function getAscendantSignData(sign: VenusSign): AscendantSignData {
    return ASCENDANT_SIGN_DATA[sign];
}

/**
 * Get all Ascendant signs
 */
export function getAllAscendantSigns(): AscendantSignData[] {
    return Object.values(ASCENDANT_SIGN_DATA);
}
