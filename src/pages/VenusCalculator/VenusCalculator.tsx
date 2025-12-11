/* ===========================================
   VENUS CALCULATOR PAGE
   Full calculator with form, results, and products
   =========================================== */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Sparkles, Calendar, Clock, MapPin, ArrowRight,
    RotateCcw, Heart, Shirt, Palette, Star, ShoppingBag
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, useVenusProfile } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { getVenusSignData, VENUS_SIGN_DATA } from '../../data/venusData';
import { getProductsByVenusSign, PRODUCTS } from '../../data/products';
import { calculateVenusSign, getVenusMatches } from '../../utils/venusMath';
import Starfield from '../../components/common/Starfield';
import ProductCard from '../../components/product/ProductCard';
import styles from './VenusCalculator.module.css';

export default function VenusCalculator() {
    const { t, language } = useTranslation();
    const { venusSign: savedSign, setVenusSign } = useVenusProfile();
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');
    const [birthPlace, setBirthPlace] = useState('');
    const [result, setResult] = useState<string | null>(savedSign || null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [showFullGuide, setShowFullGuide] = useState(!!savedSign);

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!birthDate) return;

        setIsCalculating(true);

        // Simulate calculation for dramatic effect
        await new Promise(resolve => setTimeout(resolve, 1500));

        const venusSign = calculateVenusSign(new Date(birthDate));
        setResult(venusSign);
        setVenusSign(venusSign);
        setIsCalculating(false);

        // Show full guide after a brief moment
        setTimeout(() => setShowFullGuide(true), 800);
    };

    const handleReset = () => {
        setResult(null);
        setShowFullGuide(false);
        setBirthDate('');
        setBirthTime('');
        setBirthPlace('');
    };

    const signData = result ? getVenusSignData(result as keyof typeof VENUS_SIGN_DATA) : null;
    const zodiacData = result ? ZODIAC_SIGNS[result as keyof typeof ZODIAC_SIGNS] : null;
    const matches = result ? getVenusMatches(result as keyof typeof VENUS_SIGN_DATA) : [];

    // Get products for this Venus sign, fallback to random products if none match
    const signProducts = result
        ? getProductsByVenusSign(result)
        : [];
    const recommendedProducts = signProducts.length > 0
        ? signProducts.slice(0, 4)
        : PRODUCTS.slice(0, 4);

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
                                                    <span className={styles.optional}>({language === 'en' ? 'optional' : 'opcjonalne'})</span>
                                                </label>
                                                <input
                                                    type="time"
                                                    value={birthTime}
                                                    onChange={(e) => setBirthTime(e.target.value)}
                                                    className={styles.input}
                                                />
                                                <span className={styles.hint}>
                                                    {language === 'en'
                                                        ? "Don't know your time? We'll still give you accurate results"
                                                        : 'Nie znasz godziny? Nadal damy Ci dokładne wyniki'
                                                    }
                                                </span>
                                            </div>

                                            <div className={styles.inputGroup}>
                                                <label className={styles.label}>
                                                    <MapPin size={16} />
                                                    {language === 'en' ? 'Place of Birth' : 'Miejsce Urodzenia'}
                                                    <span className={styles.optional}>({language === 'en' ? 'optional' : 'opcjonalne'})</span>
                                                </label>
                                                <input
                                                    type="text"
                                                    value={birthPlace}
                                                    onChange={(e) => setBirthPlace(e.target.value)}
                                                    placeholder={language === 'en' ? 'City, Country' : 'Miasto, Kraj'}
                                                    className={styles.input}
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className={styles.submitButton}
                                                disabled={!birthDate || isCalculating}
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
                                                                    name={product.name}
                                                                    namePl={product.namePl}
                                                                    price={product.price}
                                                                    originalPrice={product.originalPrice}
                                                                    images={product.images}
                                                                    category={language === 'en' ? product.category : product.categoryPl}
                                                                    venusSign={product.venusSign}
                                                                    isNew={product.isNew}
                                                                    isSale={!!product.originalPrice}
                                                                    rating={product.rating}
                                                                    reviewCount={product.reviewCount}
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
