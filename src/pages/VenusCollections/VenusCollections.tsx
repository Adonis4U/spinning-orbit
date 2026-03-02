/* ===========================================
   VENUS SIGN COLLECTIONS — MAIN PAGE
   Cosmic grid of 12 zodiac Venus sign collections
   =========================================== */

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowRight, Sparkles, ShoppingBag } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ORDER, ELEMENTS } from '../../constants/zodiac';
import { supabase } from '../../integrations/supabase/client';
import Starfield from '../../components/common/Starfield';
import type { VenusSign } from '../../types/domain';
import styles from './VenusCollections.module.css';

// Background gradients for each sign card
const SIGN_GRADIENTS: Record<VenusSign, string> = {
    aries: 'linear-gradient(135deg, hsl(0, 75%, 35%), hsl(25, 90%, 45%))',
    taurus: 'linear-gradient(135deg, hsl(140, 40%, 30%), hsl(90, 35%, 40%))',
    gemini: 'linear-gradient(135deg, hsl(45, 80%, 40%), hsl(50, 90%, 50%))',
    cancer: 'linear-gradient(135deg, hsl(210, 50%, 35%), hsl(190, 55%, 45%))',
    leo: 'linear-gradient(135deg, hsl(35, 90%, 45%), hsl(45, 95%, 55%))',
    virgo: 'linear-gradient(135deg, hsl(40, 25%, 35%), hsl(60, 20%, 50%))',
    libra: 'linear-gradient(135deg, hsl(320, 50%, 40%), hsl(340, 60%, 55%))',
    scorpio: 'linear-gradient(135deg, hsl(280, 55%, 25%), hsl(320, 60%, 35%))',
    sagittarius: 'linear-gradient(135deg, hsl(270, 55%, 40%), hsl(300, 50%, 50%))',
    capricorn: 'linear-gradient(135deg, hsl(220, 30%, 25%), hsl(240, 35%, 35%))',
    aquarius: 'linear-gradient(135deg, hsl(190, 65%, 35%), hsl(210, 70%, 50%))',
    pisces: 'linear-gradient(135deg, hsl(250, 55%, 40%), hsl(280, 50%, 55%))',
};

// Element labels
const ELEMENT_LABELS = {
    all: { en: 'All Signs', pl: 'Wszystkie' },
    fire: { en: '🔥 Fire', pl: '🔥 Ogień' },
    earth: { en: '🌿 Earth', pl: '🌿 Ziemia' },
    air: { en: '💨 Air', pl: '💨 Powietrze' },
    water: { en: '💧 Water', pl: '💧 Woda' },
};

type ElementFilter = 'all' | 'fire' | 'earth' | 'air' | 'water';

export default function VenusCollections() {
    const { language } = useTranslation();
    const [productCounts, setProductCounts] = useState<Record<string, number>>({});
    const [elementFilter, setElementFilter] = useState<ElementFilter>('all');

    // Fetch product counts per Venus sign
    useEffect(() => {
        const fetchCounts = async () => {
            const { data } = await supabase
                .from('products')
                .select('venus_sign');

            if (data) {
                const counts: Record<string, number> = {};
                data.forEach((p: { venus_sign: string }) => {
                    if (p.venus_sign) {
                        counts[p.venus_sign] = (counts[p.venus_sign] || 0) + 1;
                    }
                });
                setProductCounts(counts);
            }
        };
        fetchCounts();
    }, []);

    // Filter signs by element
    const filteredSigns = ZODIAC_SIGNS_ORDER.filter(sign => {
        if (elementFilter === 'all') return true;
        return ZODIAC_SIGNS[sign].element === elementFilter;
    });

    return (
        <>
            <Helmet>
                <title>
                    {language === 'en'
                        ? 'Venus Sign Collections | House of Venus'
                        : 'Kolekcje Znaków Wenus | House of Venus'
                    }
                </title>
                <meta
                    name="description"
                    content={language === 'en'
                        ? 'Discover fashion curated for your Venus sign. Explore 12 zodiac-inspired collections designed to match your cosmic style.'
                        : 'Odkryj modę wyselekcjonowaną dla Twojego znaku Wenus. Poznaj 12 kolekcji inspirowanych zodiakiem, zaprojektowanych pod Twój kosmiczny styl.'
                    }
                />
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <Starfield starCount={80} className={styles.starfield} />
                    <div className={styles.heroGradient} />

                    <div className={styles.heroContent}>
                        <motion.span
                            className={styles.heroSymbol}
                            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                            animate={{ opacity: 1, scale: 1, rotate: 0 }}
                            transition={{ type: 'spring', stiffness: 150, delay: 0.1 }}
                        >
                            ♀
                        </motion.span>
                        <motion.h1
                            className={styles.heroTitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            {language === 'en' ? (
                                <>Venus Sign <span>Collections</span></>
                            ) : (
                                <>Kolekcje Znaków <span>Wenus</span></>
                            )}
                        </motion.h1>
                        <motion.p
                            className={styles.heroSubtitle}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            {language === 'en'
                                ? 'Fashion curated by the stars. Each collection is inspired by the unique aesthetic of your Venus sign — discover pieces that truly resonate with your cosmic identity.'
                                : 'Moda dobrana przez gwiazdy. Każda kolekcja inspirowana jest unikalną estetyką Twojego znaku Wenus — odkryj elementy, które naprawdę rezonują z Twoją kosmiczną tożsamością.'
                            }
                        </motion.p>
                    </div>
                </section>

                {/* Signs Grid */}
                <section className={styles.gridSection}>
                    {/* Element Filter */}
                    <motion.div
                        className={styles.elementFilter}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                    >
                        {(Object.keys(ELEMENT_LABELS) as ElementFilter[]).map(el => (
                            <button
                                key={el}
                                className={`${styles.elementBtn} ${elementFilter === el ? styles.active : ''}`}
                                onClick={() => setElementFilter(el)}
                            >
                                {language === 'en' ? ELEMENT_LABELS[el].en : ELEMENT_LABELS[el].pl}
                            </button>
                        ))}
                    </motion.div>

                    {/* Signs Grid */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={elementFilter}
                            className={styles.signsGrid}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            {filteredSigns.map((sign, i) => {
                                const signInfo = ZODIAC_SIGNS[sign];
                                const count = productCounts[sign] || 0;

                                return (
                                    <motion.div
                                        key={sign}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.05 * i, duration: 0.4 }}
                                    >
                                        <Link
                                            to={`/venus-collections/${sign}`}
                                            className={styles.signCard}
                                            data-element={signInfo.element}
                                        >
                                            <div
                                                className={styles.cardBackground}
                                                style={{ background: SIGN_GRADIENTS[sign] }}
                                            />
                                            <div className={styles.cardOverlay} />

                                            <div className={styles.cardArrow}>
                                                <ArrowRight size={16} />
                                            </div>

                                            <div className={styles.cardContent}>
                                                <span className={styles.cardSymbol}>
                                                    {signInfo.symbol}
                                                </span>
                                                <h3 className={styles.cardName}>
                                                    {language === 'en' ? signInfo.name_en : signInfo.name_pl}
                                                </h3>
                                                <p className={styles.cardElement}>
                                                    {language === 'en'
                                                        ? ELEMENTS[signInfo.element].name_en
                                                        : ELEMENTS[signInfo.element].name_pl
                                                    }
                                                    {' · '}
                                                    {signInfo.date_range}
                                                </p>
                                                <span className={styles.cardProductCount}>
                                                    <ShoppingBag size={12} />
                                                    {count} {language === 'en'
                                                        ? (count === 1 ? 'product' : 'products')
                                                        : (count === 1 ? 'produkt' : count < 5 ? 'produkty' : 'produktów')
                                                    }
                                                </span>
                                            </div>
                                        </Link>
                                    </motion.div>
                                );
                            })}
                        </motion.div>
                    </AnimatePresence>
                </section>

                {/* Bottom CTA */}
                <section className={styles.ctaSection}>
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className={styles.ctaTitle}>
                            {language === 'en'
                                ? "Don't know your Venus sign?"
                                : 'Nie znasz swojego znaku Wenus?'
                            }
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            {language === 'en'
                                ? 'Use our Venus Calculator to discover your cosmic style profile and find the perfect collection for you.'
                                : 'Użyj naszego Kalkulatora Wenus, aby odkryć swój kosmiczny profil stylu i znaleźć idealną kolekcję dla siebie.'
                            }
                        </p>
                        <Link to="/venus-calculator" className={styles.ctaButton}>
                            <Sparkles size={18} />
                            {language === 'en'
                                ? 'Calculate Your Venus Sign'
                                : 'Oblicz Swój Znak Wenus'
                            }
                        </Link>
                    </motion.div>
                </section>
            </main>
        </>
    );
}
