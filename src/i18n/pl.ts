/* ===========================================
   POLISH TRANSLATIONS
   =========================================== */

import type { en } from './en';

// Polish translations - must match the structure of English
export const pl: typeof en = {
    // Header & Navigation
    header: {
        nav: {
            shop: 'Sklep',
            collections: 'Kolekcje',
            venusCalculator: 'Kalkulator Venus',
            lookbook: 'Lookbook',
            blog: 'Blog',
            about: 'O nas',
            contact: 'Kontakt',
        },
        search: 'Szukaj',
        cart: 'Koszyk',
        wishlist: 'Lista życzeń',
        account: 'Konto',
    },

    // Hero Section
    hero: {
        title: 'Moda Zapisana w Gwiazdach',
        subtitle: 'Odkryj swój znak Wenus i odblokuj swoje kosmiczne przeznaczenie stylu z House of Venus.',
        ctaPrimary: 'Odkryj Swój Znak Wenus',
        ctaSecondary: 'Przeglądaj Kolekcje',
    },

    // Shop Page
    shop: {
        title: 'Kolekcja',
        subtitle: 'Wyselekcjonowane elementy dla każdego znaku Wenus',
        searchPlaceholder: 'Szukaj produktów...',
        filters: 'Filtry',
        results: 'produktów',
        noResults: 'Nie znaleziono produktów pasujących do kryteriów.',
        clearFilters: 'Wyczyść filtry',
    },

    // Zodiac Section
    zodiac: {
        title: 'Poznaj Swój Zodiak',
        subtitle: 'Każdy znak ma swoją wyjątkową esencję stylu. Znajdź swoją.',
        signs: {
            aries: 'Baran',
            taurus: 'Byk',
            gemini: 'Bliźnięta',
            cancer: 'Rak',
            leo: 'Lew',
            virgo: 'Panna',
            libra: 'Waga',
            scorpio: 'Skorpion',
            sagittarius: 'Strzelec',
            capricorn: 'Koziorożec',
            aquarius: 'Wodnik',
            pisces: 'Ryby',
        },
    },

    // Products
    products: {
        featured: 'Wyróżnione Produkty',
        newArrivals: 'Nowości',
        bestSellers: 'Bestsellery',
        sale: 'Wyprzedaż',
        addToCart: 'Dodaj do Koszyka',
        addToWishlist: 'Dodaj do Listy Życzeń',
        viewDetails: 'Zobacz Szczegóły',
        quickView: 'Szybki Podgląd',
        outOfStock: 'Brak w Magazynie',
        size: 'Rozmiar',
        color: 'Kolor',
        quantity: 'Ilość',
        price: 'Cena',
        venusMatch: 'Dopasowanie Wenus',
        completeTheLook: 'Uzupełnij Stylizację',
        relatedProducts: 'Powiązane Produkty',
        sizeGuide: 'Tabela Rozmiarów',
    },

    // Filters
    filters: {
        title: 'Filtry',
        venusSign: 'Znak Wenus',
        category: 'Kategoria',
        mood: 'Nastrój',
        priceRange: 'Przedział Cenowy',
        size: 'Rozmiar',
        sortBy: 'Sortuj Według',
        bestMatch: 'Najlepsze Dopasowanie',
        newest: 'Najnowsze',
        priceAsc: 'Cena: Od Najniższej',
        priceDesc: 'Cena: Od Najwyższej',
        clearAll: 'Wyczyść Wszystko',
        apply: 'Zastosuj Filtry',
    },

    // Venus Calculator
    venusCalculator: {
        title: 'Kalkulator Znaku Wenus',
        subtitle: 'Oblicz swój znak Wenus i odkryj spersonalizowane rekomendacje stylu.',
        dateOfBirth: 'Data Urodzenia',
        timeOfBirth: 'Godzina Urodzenia (opcjonalnie)',
        placeOfBirth: 'Miejsce Urodzenia (opcjonalnie)',
        calculate: 'Oblicz Swój Znak Wenus',
        yourVenusSign: 'Twój Znak Wenus to',
        recommendedCollections: 'Rekomendowane Kolekcje dla Ciebie',
        shopTheVibe: 'Zakupy w Twoim Stylu',
        recalculate: 'Oblicz Ponownie',
    },

    // Cart
    cart: {
        title: 'Koszyk',
        empty: 'Twój koszyk jest pusty',
        emptyMessage: 'Wygląda na to, że jeszcze nic nie dodałeś do koszyka.',
        continueShopping: 'Kontynuuj Zakupy',
        subtotal: 'Suma Częściowa',
        shipping: 'Wysyłka',
        shippingCalculated: 'Obliczana przy kasie',
        total: 'Suma',
        checkout: 'Przejdź do Kasy',
        remove: 'Usuń',
        update: 'Aktualizuj',
    },

    // Checkout
    checkout: {
        title: 'Kasa',
        contactInfo: 'Dane Kontaktowe',
        shippingAddress: 'Adres Wysyłki',
        paymentMethod: 'Metoda Płatności',
        orderSummary: 'Podsumowanie Zamówienia',
        placeOrder: 'Złóż Zamówienie',
        processing: 'Przetwarzanie...',
        success: 'Zamówienie Złożone Pomyślnie!',
        successMessage: 'Dziękujemy za zamówienie. Wkrótce wyślemy e-mail z potwierdzeniem.',
        firstName: 'Imię',
        lastName: 'Nazwisko',
        email: 'E-mail',
        phone: 'Telefon',
        address: 'Adres',
        city: 'Miasto',
        postalCode: 'Kod Pocztowy',
        country: 'Kraj',
    },

    // Account
    account: {
        login: 'Zaloguj się',
        register: 'Utwórz Konto',
        logout: 'Wyloguj się',
        myAccount: 'Moje Konto',
        myOrders: 'Moje Zamówienia',
        myWishlist: 'Moja Lista Życzeń',
        myVenusProfile: 'Mój Profil Venus',
        accountSettings: 'Ustawienia Konta',
        noOrders: 'Nie złożyłeś jeszcze żadnych zamówień.',
        viewOrder: 'Zobacz Zamówienie',
        orderStatus: 'Status Zamówienia',
    },

    // Wishlist
    wishlist: {
        title: 'Lista Życzeń',
        empty: 'Twoja lista życzeń jest pusta',
        emptyMessage: 'Zapisz ulubione produkty, aby kupić je później.',
        moveToCart: 'Przenieś do Koszyka',
    },

    // Footer
    footer: {
        newsletter: {
            title: 'Dołącz do Kosmicznego Kręgu',
            subtitle: 'Zapisz się, aby otrzymywać ekskluzywne horoskopy stylowe, nowości i inspirowane Wenus stylizacje',
            placeholder: 'Wpisz swój email',
            button: 'Zapisz się',
            success: 'Dziękujemy za zapis!',
        },
        columns: {
            shop: 'Sklep',
            about: 'O nas',
            help: 'Pomoc',
        },
        links: {
            newArrivals: 'Nowości',
            collections: 'Kolekcje',
            bestsellers: 'Bestsellery',
            sale: 'Wyprzedaż',
            ourStory: 'Nasza Historia',
            venusPhilosophy: 'Filozofia Venus',
            sustainability: 'Zrównoważony Rozwój',
            careers: 'Kariera',
            contact: 'Kontakt',
            faq: 'FAQ',
            shipping: 'Wysyłka i Zwroty',
            sizeGuide: 'Tabela Rozmiarów',
        },
        tagline: 'Moda zapisana w gwiazdach. Odkryj swój kosmiczny styl z House of Venus.',
        copyright: '© 2025 House of Venus. Wszelkie prawa zastrzeżone.',
        legal: {
            privacy: 'Polityka Prywatności',
            terms: 'Regulamin',
            cookies: 'Polityka Cookies',
        },
    },

    // Common
    common: {
        loading: 'Ładowanie...',
        error: 'Coś poszło nie tak',
        tryAgain: 'Spróbuj Ponownie',
        back: 'Wstecz',
        next: 'Dalej',
        previous: 'Poprzedni',
        save: 'Zapisz',
        cancel: 'Anuluj',
        close: 'Zamknij',
        search: 'Szukaj',
        seeAll: 'Zobacz Wszystko',
        learnMore: 'Dowiedz się Więcej',
        viewAll: 'Zobacz Wszystko',
        required: 'Wymagane',
        optional: 'Opcjonalnie',
    },

    // 404
    notFound: {
        title: '404',
        message: 'Gwiazdy nie mogły znaleźć tej strony. Mogła zadryfować do innego kosmicznego wymiaru.',
        goHome: 'Strona Główna',
        goBack: 'Wróć',
    },

    // Daily Horoscope
    dailyHoroscope: {
        title: 'Dzienny Horoskop Venus',
        styleTip: 'Stylowa Wskazówka Dnia',
        luckyColor: 'Szczęśliwy Kolor',
    },

    // Venus Compatibility
    venusCompatibility: {
        title: 'Zgodność Znaków Wenus',
        subtitle: 'Odkryj swoją kosmiczną zgodność do dawania prezentów i stylizacji.',
        selectSign: 'Wybierz Znak Wenus',
        highCompatibility: 'Wysoka Zgodność',
        mediumCompatibility: 'Średnia Zgodność',
        lowCompatibility: 'Niska Zgodność',
        giftSuggestions: 'Propozycje Prezentów',
    },

    // Moods
    moods: {
        romantic: 'Romantyczny',
        bold: 'Odważny',
        ethereal: 'Eteryczny',
        dramatic: 'Dramatyczny',
        minimalist: 'Minimalistyczny',
        luxurious: 'Luksusowy',
        bohemian: 'Bohema',
        edgy: 'Awangardowy',
        classic: 'Klasyczny',
        playful: 'Zabawny',
    },

    // Categories
    categories: {
        dress: 'Sukienki',
        top: 'Bluzki',
        bottom: 'Spodnie',
        skirt: 'Spódnice',
        jacket: 'Żakiety',
        coat: 'Płaszcze',
        knitwear: 'Dzianiny',
        accessory: 'Akcesoria',
        jewelry: 'Biżuteria',
        bag: 'Torebki',
        shoes: 'Buty',
        scarf: 'Szaliki',
        hat: 'Kapelusze',
    },
};
