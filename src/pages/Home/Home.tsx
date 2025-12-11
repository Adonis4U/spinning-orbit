/* ===========================================
   HOME PAGE
   Main landing page with all sections
   =========================================== */

import { Helmet } from 'react-helmet-async';
import { useTranslation } from '../../contexts';
import {
    Hero,
    ZodiacSlider,
    LookbookSlider,
    FeaturedProducts,
    VenusTeaser,
    DailyHoroscope,
    SocialStrip,
} from '../../components/home';

export default function Home() {
    const { language } = useTranslation();

    return (
        <>
            <Helmet>
                <title>House of Venus | Astrological Fashion</title>
                <meta
                    name="description"
                    content={
                        language === 'en'
                            ? 'Discover your cosmic style with House of Venus. Fashion inspired by Venus signs and zodiac collections.'
                            : 'Odkryj swój kosmiczny styl z House of Venus. Moda inspirowana znakami Wenus i kolekcjami zodiakalnymi.'
                    }
                />
            </Helmet>

            <main>
                {/* Hero Section with starfield */}
                <Hero />

                {/* Zodiac Slider - 12 signs */}
                <ZodiacSlider />

                {/* Featured Products */}
                <FeaturedProducts />

                {/* Venus Calculator Teaser */}
                <VenusTeaser />

                {/* Lookbook Slider */}
                <LookbookSlider />

                {/* Daily Venus Horoscope */}
                <DailyHoroscope />

                {/* Social/Instagram Strip */}
                <SocialStrip />
            </main>
        </>
    );
}
