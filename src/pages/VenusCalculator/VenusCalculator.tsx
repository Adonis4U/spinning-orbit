/* ===========================================
   VENUS CALCULATOR PAGE
   Full calculator with form, results, and products
   =========================================== */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Calendar, Clock, ArrowRight,
    RotateCcw, Heart, Shirt, Palette, Star, ShoppingBag, Sunrise, AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, useVenusProfile } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { getVenusSignData, VENUS_SIGN_DATA } from '../../data/venusData';
import { getAscendantSignData } from '../../data/ascendantData';
import { useProducts } from '../../hooks';
import { getVenusMatches } from '../../utils/venusMath';
import { calculateVenusSign, calculateAscendant } from '../../utils/astroCalc';
import type { VenusSign } from '../../types/domain';
import Starfield from '../../components/common/Starfield';
import ProductCard from '../../components/product/ProductCard';
import LocationPicker, { type LocationPickerValue } from '../../components/common/LocationPicker';
import styles from './VenusCalculator.module.css';

export default function VenusCalculator() {
    const { t, language } = useTranslation();
    const { profile, setVenusSign, setAscendingSign, updateProfile } = useVenusProfile();
    const savedSign = profile.venusSign;
    const savedAscendant = profile.ascendingSign;

    const [birthDate, setBirthDate] = useState(profile.dateOfBirth || '');
    const [birthTime, setBirthTime] = useState(profile.timeOfBirth || '');

    // Location state using LocationPicker value structure
    const [location, setLocation] = useState<LocationPickerValue>({
        country: '',
        countryCode: '',
        city: profile.placeOfBirth || '',
        lat: profile.latitude ?? null,
        lon: profile.longitude ?? null,
    });

    const [result, setResult] = useState<string | null>(savedSign || null);
    const [ascendantResult, setAscendantResult] = useState<VenusSign | null>(savedAscendant || null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showFullGuide, setShowFullGuide] = useState(!!savedSign);
    const [formError, setFormError] = useState<string | null>(null);

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        // Validation: Date and Time are always required
        if (!birthDate) {
            setFormError(language === 'en' ? 'Please enter your birth date' : 'Proszę podać datę urodzenia');
            return;
        }

        if (!birthTime) {
            setFormError(language === 'en' ? 'Birth time is required for accurate Venus sign calculation' : 'Godzina urodzenia jest wymagana do dokładnego obliczenia znaku Wenus');
            return;
        }

        setIsCalculating(true);

        try {
            // Calculate Venus sign using ephemeris
            const venusSign = calculateVenusSign(new Date(birthDate), birthTime);
            setResult(venusSign);
            setVenusSign(venusSign);

            // Construct place string for profile
            const placeString = location.city && location.country
                ? `${location.city}, ${location.country}`
                : location.city || '';

            // Update profile with birth data
            updateProfile({
                dateOfBirth: birthDate,
                timeOfBirth: birthTime,
                placeOfBirth: placeString || undefined,
            });

            // Calculate Ascendant if we have coordinates
            if (location.lat !== null && location.lon !== null) {
                const ascendant = calculateAscendant(new Date(birthDate), birthTime, location.lat, location.lon);
                setAscendantResult(ascendant);
                setAscendingSign(ascendant);
                updateProfile({
                    latitude: location.lat,
                    longitude: location.lon,
                });
            } else {
                setAscendantResult(null);
            }

            // Show full guide after a brief moment
            setTimeout(() => setShowFullGuide(true), 800);
        } catch (error) {
            console.error('Calculation error:', error);
            setFormError(language === 'en' ? 'An error occurred during calculation' : 'Wystąpił błąd podczas obliczeń');
        } finally {
            setIsCalculating(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setAscendantResult(null);
        setShowFullGuide(false);
        setBirthDate('');
        setBirthTime('');
        setLocation({
            country: '',
            countryCode: '',
            city: '',
            lat: null,
            lon: null,
        });
        setFormError(null);
    };

    const signData = result ? getVenusSignData(result as keyof typeof VENUS_SIGN_DATA) : null;
    const zodiacData = result ? ZODIAC_SIGNS[result as keyof typeof ZODIAC_SIGNS] : null;
    const matches = result ? getVenusMatches(result as keyof typeof VENUS_SIGN_DATA) : [];

    // Ascendant data
    const ascendantSignData = ascendantResult ? getAscendantSignData(ascendantResult) : null;
    const ascendantZodiacData = ascendantResult ? ZODIAC_SIGNS[ascendantResult as keyof typeof ZODIAC_SIGNS] : null;

    // Get products from Supabase filtered by Venus sign
    const { products: allProducts } = useProducts({ venusSign: result || undefined });
    const { products: fallbackProducts } = useProducts({ limit: 4 });

    // Use venus sign products or fallback
    const recommendedProducts = (allProducts.length > 0 ? allProducts : fallbackProducts).slice(0, 4);

    return (
        <>
            <Helmet>
                <title>{t('venusCalculator.title')} | House of Venus</title>
                <meta name="description" content={t('venusCalculator.subtitle')} />
            </Helmet>

            <main className={styles.page}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <Starfield starCount={100} className={styles.starfield} />
                    <div className={styles.heroGradient} />

                    <div className={styles.heroContent}>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            {t('venusCalculator.title')}
                        </motion.h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                        >
                            {t('venusCalculator.subtitle')}
                        </motion.p>
                    </div>
                </section>

                {/* Calculator Section */}
                <section className={styles.calculatorSection}>
                    <div className={styles.container}>
                        <AnimatePresence mode="wait">
                            {!result ? (
                                // Calculator Form
                                <motion.div
                                    key="form"
                                    className={styles.formWrapper}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -20 }}
                                >
                                    <div className={styles.formCard}>
                                        <div className={styles.formHeader}>
                                            <Sparkles className={styles.formIcon} size={24} />
                                            <h2 className={styles.formTitle}>
                                                {language === 'en' ? 'Enter Your Birth Details' : 'Wprowadź Dane Urodzenia'}
                                            </h2>
                                        </div>
                                        <p className={styles.formSubtitle}>
                                            {language === 'en'
                                                ? 'Your Venus sign reveals your unique approach to love, beauty, and personal style'
                                                : 'Twój znak Wenus ujawnia Twoje unikalne podejście do miłości, piękna i osobistego stylu'
                                            }
                                        </p>

                                        {formError && (
                                            <div className={styles.formError}>
                                                <AlertCircle size={16} />
                                                {formError}
                                            </div>
                                        )}

                                        <form onSubmit={handleCalculate} className={styles.form}>
                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>
                                                    <Calendar size={16} />
                                                    {t('venusCalculator.dateOfBirth')}
                                                </label>
                                                <input
                                                    type="date"
                                                    value={birthDate}
                                                    onChange={(e) => setBirthDate(e.target.value)}
                                                    className={styles.input}
                                                    required
                                                />
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>
                                                    <Clock size={16} />
                                                    {language === 'en' ? 'Time of Birth' : 'Godzina Urodzenia'}
                                                    <span className={styles.required}>*</span>
                                                </label>
                                                <input
                                                    type="time"
                                                    value={birthTime}
                                                    onChange={(e) => setBirthTime(e.target.value)}
                                                    className={styles.input}
                                                    required
                                                />
                                                <span className={styles.hint}>
                                                    {language === 'en'
                                                        ? 'Required for accurate Venus sign calculation'
                                                        : 'Wymagane do dokładnego obliczenia znaku Wenus'
                                                    }
                                                </span>
                                            </div>

                                            {/* Location Picker for Country/City */}
                                            <LocationPicker
                                                value={location}
                                                onChange={setLocation}
                                                language={language as 'en' | 'pl'}
                                            />

                                            <motion.button
                                                type="submit"
                                                className={styles.submitButton}
                                                disabled={!birthDate || !birthTime || isCalculating}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                {isCalculating ? (
                                                    <>
                                                        <span className={styles.spinner} />
                                                        {language === 'en' ? 'Consulting the stars...' : 'Konsultuję z gwiazdami...'}
                                                    </>
                                                ) : (
                                                    <>
                                                        <Sparkles size={18} />
                                                        {t('venusCalculator.calculate')}
                                                    </>
                                                )}
                                            </motion.button>
                                        </form>
                                    </div>

                                    {/* Decorative zodiac wheel */}
                                    <div className={styles.zodiacWheel}>
                                        {Object.values(ZODIAC_SIGNS).map((sign, i) => (
                                            <motion.div
                                                key={sign.id}
                                                className={styles.wheelSign}
                                                style={{
                                                    transform: `rotate(${i * 30}deg) translateY(-140px)`,
                                                }}
                                                animate={{
                                                    opacity: [0.3, 0.6, 0.3],
                                                }}
                                                transition={{
                                                    duration: 3,
                                                    delay: i * 0.2,
                                                    repeat: Infinity,
                                                }}
                                            >
                                                <span style={{ transform: `rotate(${-i * 30}deg)` }}>
                                                    {sign.symbol}
                                                </span>
                                            </motion.div>
                                        ))}
                                    </div>
                                </motion.div>
                            ) : (
                                // Result Display
                                <motion.div
                                    key="result"
                                    className={styles.resultWrapper}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                >
                                    {/* Result Header */}
                                    <motion.div
                                        className={styles.resultHeader}
                                        initial={{ scale: 0.9, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{ type: 'spring', stiffness: 200 }}
                                    >
                                        <button className={styles.resetButton} onClick={handleReset}>
                                            <RotateCcw size={16} />
                                            {language === 'en' ? 'Calculate Again' : 'Oblicz Ponownie'}
                                        </button>

                                        <div className={styles.signSymbolLarge}>
                                            {zodiacData?.symbol}
                                        </div>

                                        <h2 className={styles.resultTitle}>
                                            {t('venusCalculator.yourVenusSign')}
                                        </h2>
                                        <h3 className={styles.signName}>
                                            {language === 'en' ? signData?.name.en : signData?.name.pl}
                                        </h3>
                                        <p className={styles.signTitle}>
                                            "{language === 'en' ? signData?.title.en : signData?.title.pl}"
                                        </p>
                                    </motion.div>

                                    {/* Ascendant Result (if calculated) */}
                                    {ascendantResult && ascendantSignData && ascendantZodiacData && (
                                        <motion.div
                                            className={styles.ascendantCard}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3 }}
                                        >
                                            <div className={styles.ascendantHeader}>
                                                <Sunrise size={20} className={styles.ascendantIcon} />
                                                <h3 className={styles.ascendantLabel}>
                                                    {language === 'en' ? 'Your Ascendant' : 'Twój Ascendent'}
                                                </h3>
                                            </div>
                                            <div className={styles.ascendantContent}>
                                                <div className={styles.ascendantSymbol}>
                                                    {ascendantZodiacData.symbol}
                                                </div>
                                                <div className={styles.ascendantInfo}>
                                                    <h4 className={styles.ascendantName}>
                                                        {language === 'en' ? ascendantSignData.name.en : ascendantSignData.name.pl}
                                                    </h4>
                                                    <p className={styles.ascendantTitle}>
                                                        {language === 'en' ? ascendantSignData.title.en : ascendantSignData.title.pl}
                                                    </p>
                                                </div>
                                            </div>
                                            <p className={styles.ascendantDescription}>
                                                {language === 'en' ? ascendantSignData.description.en : ascendantSignData.description.pl}
                                            </p>
                                            <div className={styles.ascendantVibe}>
                                                <span className={styles.vibeLabel}>
                                                    {language === 'en' ? 'Your Style Vibe:' : 'Twój Styl Vibes:'}
                                                </span>
                                                <div className={styles.vibeKeywords}>
                                                    {(language === 'en' ? ascendantSignData.styleVibe.en : ascendantSignData.styleVibe.pl).map((vibe, i) => (
                                                        <span key={i} className={styles.vibeTag}>{vibe}</span>
                                                    ))}
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}

                                    {/* Animated sections */}
                                    <AnimatePresence>
                                        {showFullGuide && (
                                            <>
                                                {/* Description */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.1 }}
                                                >
                                                    <p className={styles.description}>
                                                        {language === 'en' ? signData?.description.en : signData?.description.pl}
                                                    </p>
                                                </motion.section>

                                                {/* Style Keywords */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    <h4 className={styles.sectionTitle}>
                                                        <Shirt size={18} />
                                                        {language === 'en' ? 'Your Style Keywords' : 'Twoje Słowa Klucze Stylu'}
                                                    </h4>
                                                    <div className={styles.keywords}>
                                                        {(language === 'en' ? signData?.styleKeywords.en : signData?.styleKeywords.pl)?.map((keyword, i) => (
                                                            <motion.span
                                                                key={i}
                                                                className={styles.keyword}
                                                                initial={{ opacity: 0, scale: 0.8 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 0.3 + i * 0.1 }}
                                                            >
                                                                {keyword}
                                                            </motion.span>
                                                        ))}
                                                    </div>
                                                </motion.section>

                                                {/* Color Palette */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.3 }}
                                                >
                                                    <h4 className={styles.sectionTitle}>
                                                        <Palette size={18} />
                                                        {language === 'en' ? 'Your Color Palette' : 'Twoja Paleta Kolorów'}
                                                    </h4>
                                                    <div className={styles.colorPalette}>
                                                        {signData?.colors.map((color, i) => (
                                                            <motion.div
                                                                key={i}
                                                                className={styles.colorItem}
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                                                            >
                                                                <span className={styles.colorDot} style={{ backgroundColor: color }} />
                                                                <span className={styles.colorName}>
                                                                    {language === 'en'
                                                                        ? signData?.colorNames.en[i]
                                                                        : signData?.colorNames.pl[i]
                                                                    }
                                                                </span>
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                </motion.section>

                                                {/* Fabrics & Accessories */}
                                                <motion.section
                                                    className={styles.twoColumns}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.4 }}
                                                >
                                                    <div className={styles.column}>
                                                        <h4 className={styles.sectionTitle}>
                                                            {language === 'en' ? 'Best Fabrics' : 'Najlepsze Tkaniny'}
                                                        </h4>
                                                        <ul className={styles.list}>
                                                            {(language === 'en' ? signData?.fabrics.en : signData?.fabrics.pl)?.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                    <div className={styles.column}>
                                                        <h4 className={styles.sectionTitle}>
                                                            {language === 'en' ? 'Key Accessories' : 'Kluczowe Akcesoria'}
                                                        </h4>
                                                        <ul className={styles.list}>
                                                            {(language === 'en' ? signData?.accessories.en : signData?.accessories.pl)?.map((item, i) => (
                                                                <li key={i}>{item}</li>
                                                            ))}
                                                        </ul>
                                                    </div>
                                                </motion.section>

                                                {/* Signature Looks */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.5 }}
                                                >
                                                    <h4 className={styles.sectionTitle}>
                                                        <Star size={18} />
                                                        {language === 'en' ? 'Your Signature Looks' : 'Twoje Stylizacje Sygnaturowe'}
                                                    </h4>
                                                    <div className={styles.signatures}>
                                                        {(language === 'en' ? signData?.signatures.en : signData?.signatures.pl)?.map((item, i) => (
                                                            <span key={i} className={styles.signature}>{item}</span>
                                                        ))}
                                                    </div>
                                                </motion.section>

                                                {/* Best Matches */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.6 }}
                                                >
                                                    <h4 className={styles.sectionTitle}>
                                                        <Heart size={18} />
                                                        {language === 'en' ? 'Best Style Matches' : 'Najlepsze Dopasowania Stylu'}
                                                    </h4>
                                                    <div className={styles.matches}>
                                                        {matches.map((match, i) => {
                                                            const matchData = ZODIAC_SIGNS[match as keyof typeof ZODIAC_SIGNS];
                                                            return (
                                                                <Link
                                                                    key={i}
                                                                    to={`/venus-compatibility?sign=${match}`}
                                                                    className={styles.matchCard}
                                                                >
                                                                    <span className={styles.matchSymbol}>{matchData?.symbol}</span>
                                                                    <span className={styles.matchName}>
                                                                        {language === 'en' ? matchData?.name_en : matchData?.name_pl}
                                                                    </span>
                                                                </Link>
                                                            );
                                                        })}
                                                    </div>
                                                </motion.section>

                                                {/* Shop CTA */}
                                                <motion.section
                                                    className={styles.shopSection}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.7 }}
                                                >
                                                    <h4 className={styles.shopTitle}>
                                                        <ShoppingBag size={20} />
                                                        {language === 'en' ? 'Shop Your Venus Style' : 'Kup Swój Styl Wenus'}
                                                    </h4>
                                                    <p className={styles.shopSubtitle}>
                                                        {language === 'en'
                                                            ? 'Explore our curated collection for your Venus sign'
                                                            : 'Odkryj naszą wyselekcjonowaną kolekcję dla Twojego znaku Wenus'
                                                        }
                                                    </p>
                                                    <div className={styles.shopCtas}>
                                                        <Link to={`/collections/${result}`} className={styles.shopPrimary}>
                                                            {language === 'en' ? 'Shop' : 'Kup'} {language === 'en' ? signData?.name.en : signData?.name.pl} {language === 'en' ? 'Collection' : 'Kolekcję'}
                                                            <ArrowRight size={16} />
                                                        </Link>
                                                        <Link to={`/lookbook/${result}`} className={styles.shopSecondary}>
                                                            {language === 'en' ? 'View Lookbook' : 'Zobacz Lookbook'}
                                                        </Link>
                                                    </div>
                                                </motion.section>

                                                {/* Celebrity Style */}
                                                <motion.section
                                                    className={styles.section}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.8 }}
                                                >
                                                    <h4 className={styles.sectionTitle}>
                                                        {language === 'en' ? 'Celebrity Venus Sisters' : 'Gwiazdy z Tą Samą Wenus'}
                                                    </h4>
                                                    <div className={styles.celebrities}>
                                                        {signData?.celebrities.map((celeb, i) => (
                                                            <span key={i} className={styles.celebrity}>{celeb}</span>
                                                        ))}
                                                    </div>
                                                </motion.section>

                                                {/* Shop the Vibe - Products Section */}
                                                <motion.section
                                                    className={styles.vibeSection}
                                                    initial={{ opacity: 0, y: 30 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ delay: 0.9 }}
                                                >
                                                    <h4 className={styles.vibeSectionTitle}>
                                                        <ShoppingBag size={20} />
                                                        {language === 'en' ? 'Shop the Vibe' : 'Kup ten Styl'}
                                                    </h4>
                                                    <p className={styles.vibeSubtitle}>
                                                        {language === 'en'
                                                            ? `Curated pieces perfect for Venus in ${zodiacData?.name_en}`
                                                            : `Wybrane elementy idealne dla Wenus w ${zodiacData?.name_pl}`
                                                        }
                                                    </p>
                                                    <div className={styles.vibeProducts}>
                                                        {recommendedProducts.map((product, i) => (
                                                            <motion.div
                                                                key={product.id}
                                                                initial={{ opacity: 0, scale: 0.9 }}
                                                                animate={{ opacity: 1, scale: 1 }}
                                                                transition={{ delay: 1 + i * 0.1 }}
                                                            >
                                                                <ProductCard
                                                                    id={product.id}
                                                                    name={product.name_en || product.name_pl || 'Product'}
                                                                    namePl={product.name_pl ?? undefined}
                                                                    price={product.price_pln ?? 0}
                                                                    originalPrice={product.original_price_pln ?? undefined}
                                                                    images={product.images ?? undefined}
                                                                    category={language === 'en' ? (product.category ?? undefined) : (product.category_pl ?? undefined)}
                                                                    venusSign={product.venus_sign ?? undefined}
                                                                    isNew={product.is_new ?? undefined}
                                                                    isSale={!!product.original_price_pln}
                                                                    rating={product.rating ?? undefined}
                                                                    reviewCount={product.review_count ?? undefined}
                                                                />
                                                            </motion.div>
                                                        ))}
                                                    </div>
                                                    <Link to={`/shop?sign=${result}`} className={styles.viewAllButton}>
                                                        {language === 'en' ? 'View All Products' : 'Zobacz Wszystkie Produkty'}
                                                        <ArrowRight size={16} />
                                                    </Link>
                                                </motion.section>
                                            </>
                                        )}
                                    </AnimatePresence>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </>
    );
}
