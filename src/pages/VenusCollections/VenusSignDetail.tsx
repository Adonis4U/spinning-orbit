/* ===========================================
   VENUS SIGN DETAIL PAGE
   Individual sign collection with products
   =========================================== */

import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ORDER, ELEMENTS } from '../../constants/zodiac';
import { getVenusSignData, VENUS_SIGN_DATA } from '../../data/venusData';
import { supabase } from '../../integrations/supabase/client';
import ProductCard from '../../components/product/ProductCard';
import type { VenusSign } from '../../types/domain';
import styles from './VenusSignDetail.module.css';

// Same gradients as the main page
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

interface ProductItem {
    id: string;
    name_en: string;
    name_pl: string;
    slug: string;
    price_pln: number;
    original_price_pln: number | null;
    images: string[];
    category: string;
    category_pl: string | null;
    venus_sign: string;
    is_new: boolean;
    is_sale: boolean;
    is_bestseller: boolean;
    rating: number;
    review_count: number;
}

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name';

export default function VenusSignDetail() {
    const { sign } = useParams<{ sign: string }>();
    const { language } = useTranslation();
    const [products, setProducts] = useState<ProductItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState<SortOption>('newest');

    const currentSign = sign as VenusSign;
    const signInfo = ZODIAC_SIGNS[currentSign];
    const signData = currentSign ? getVenusSignData(currentSign as keyof typeof VENUS_SIGN_DATA) : null;

    // Fetch products for this sign
    useEffect(() => {
        if (!currentSign) return;

        const fetchProducts = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .eq('venus_sign', currentSign);

            if (!error && data) {
                setProducts(data as ProductItem[]);
            }
            setLoading(false);
        };
        fetchProducts();
    }, [currentSign]);

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        switch (sortBy) {
            case 'price_asc': return a.price_pln - b.price_pln;
            case 'price_desc': return b.price_pln - a.price_pln;
            case 'name': return a.name_en.localeCompare(b.name_en);
            default: return 0; // newest = DB order
        }
    });

    if (!signInfo) {
        return (
            <div className={styles.emptyState}>
                <p>{language === 'en' ? 'Sign not found' : 'Nie znaleziono znaku'}</p>
            </div>
        );
    }

    const sortLabels: Record<SortOption, { en: string; pl: string }> = {
        newest: { en: 'Newest', pl: 'Najnowsze' },
        price_asc: { en: 'Price: Low → High', pl: 'Cena: rosnąco' },
        price_desc: { en: 'Price: High → Low', pl: 'Cena: malejąco' },
        name: { en: 'Name A–Z', pl: 'Nazwa A–Z' },
    };

    return (
        <>
            <Helmet>
                <title>
                    {language === 'en'
                        ? `Venus in ${signInfo.name_en} Collection | House of Venus`
                        : `Wenus w ${signInfo.name_pl} Kolekcja | House of Venus`
                    }
                </title>
                <meta name="description" content={
                    language === 'en'
                        ? `Explore fashion curated for Venus in ${signInfo.name_en}. ${signInfo.mood_phrase_en}`
                        : `Odkryj modę dla Wenus w ${signInfo.name_pl}. ${signInfo.mood_phrase_pl}`
                } />
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <div
                        className={styles.heroBg}
                        style={{ background: SIGN_GRADIENTS[currentSign] }}
                    />
                    <div className={styles.heroOverlay} />

                    <div className={styles.heroContent}>
                        {/* Breadcrumb */}
                        <motion.nav
                            className={styles.breadcrumb}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            aria-label="Breadcrumb"
                        >
                            <Link to="/venus-collections">
                                {language === 'en' ? 'Venus Collections' : 'Kolekcje Wenus'}
                            </Link>
                            <ChevronRight size={14} />
                            <span>{language === 'en' ? signInfo.name_en : signInfo.name_pl}</span>
                        </motion.nav>

                        <motion.span
                            className={styles.signSymbol}
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ type: 'spring', stiffness: 150 }}
                        >
                            {signInfo.symbol}
                        </motion.span>

                        <motion.h1
                            className={styles.signName}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.15 }}
                        >
                            {language === 'en'
                                ? `Venus in ${signInfo.name_en}`
                                : `Wenus w ${signInfo.name_pl}`
                            }
                        </motion.h1>

                        <motion.p
                            className={styles.signElement}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.25 }}
                        >
                            {language === 'en'
                                ? ELEMENTS[signInfo.element].name_en
                                : ELEMENTS[signInfo.element].name_pl
                            }
                            {' · '}
                            {signInfo.date_range}
                        </motion.p>

                        <motion.p
                            className={styles.signMood}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.35 }}
                        >
                            "{language === 'en' ? signInfo.mood_phrase_en : signInfo.mood_phrase_pl}"
                        </motion.p>

                        {/* Style tags */}
                        {signData && (
                            <motion.div
                                className={styles.styleTags}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.45 }}
                            >
                                {(language === 'en'
                                    ? signData.styleKeywords.en
                                    : signData.styleKeywords.pl
                                ).slice(0, 5).map((kw, i) => (
                                    <span key={i} className={styles.styleTag}>{kw}</span>
                                ))}
                            </motion.div>
                        )}
                    </div>
                </section>

                {/* Products */}
                <section className={styles.productsSection}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.productCount}>
                            {sortedProducts.length}{' '}
                            {language === 'en'
                                ? (sortedProducts.length === 1 ? 'product' : 'products')
                                : (sortedProducts.length === 1 ? 'produkt' : sortedProducts.length < 5 ? 'produkty' : 'produktów')
                            }
                        </h2>

                        <div className={styles.sortBar}>
                            <span className={styles.sortLabel}>
                                {language === 'en' ? 'Sort by:' : 'Sortuj:'}
                            </span>
                            <select
                                className={styles.sortSelect}
                                value={sortBy}
                                onChange={e => setSortBy(e.target.value as SortOption)}
                            >
                                {Object.entries(sortLabels).map(([key, label]) => (
                                    <option key={key} value={key}>
                                        {language === 'en' ? label.en : label.pl}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {loading ? (
                        <div className={styles.loadingGrid}>
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className={styles.skeleton} />
                            ))}
                        </div>
                    ) : sortedProducts.length > 0 ? (
                        <div className={styles.productsGrid}>
                            {sortedProducts.map((product, i) => (
                                <motion.div
                                    key={product.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.05 * i }}
                                >
                                    <ProductCard
                                        id={product.id}
                                        name={product.name_en || product.name_pl || 'Product'}
                                        namePl={product.name_pl ?? undefined}
                                        price={product.price_pln ?? 0}
                                        originalPrice={product.original_price_pln ?? undefined}
                                        images={product.images ?? undefined}
                                        category={language === 'en'
                                            ? (product.category ?? undefined)
                                            : (product.category_pl ?? product.category ?? undefined)
                                        }
                                        venusSign={product.venus_sign ?? undefined}
                                        isNew={product.is_new ?? undefined}
                                        isSale={!!product.original_price_pln}
                                        rating={product.rating ?? undefined}
                                        reviewCount={product.review_count ?? undefined}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>{signInfo.symbol}</div>
                            <h3 className={styles.emptyTitle}>
                                {language === 'en'
                                    ? 'No products yet'
                                    : 'Brak produktów'
                                }
                            </h3>
                            <p className={styles.emptyText}>
                                {language === 'en'
                                    ? `We're curating the perfect pieces for Venus in ${signInfo.name_en}. Check back soon!`
                                    : `Przygotowujemy idealne elementy dla Wenus w ${signInfo.name_pl}. Wróć wkrótce!`
                                }
                            </p>
                            <Link to="/shop" className={styles.emptyLink}>
                                {language === 'en' ? 'Browse All Products' : 'Przeglądaj Wszystkie Produkty'}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    )}
                </section>

                {/* Other Signs */}
                <section className={styles.otherSignsSection}>
                    <h3 className={styles.otherSignsTitle}>
                        {language === 'en' ? 'Explore Other Signs' : 'Odkryj Inne Znaki'}
                    </h3>
                    <div className={styles.otherSignsGrid}>
                        {ZODIAC_SIGNS_ORDER.map(s => {
                            const info = ZODIAC_SIGNS[s];
                            return (
                                <Link
                                    key={s}
                                    to={`/venus-collections/${s}`}
                                    className={`${styles.otherSignCard} ${s === currentSign ? styles.currentSign : ''}`}
                                >
                                    <span className={styles.otherSignSymbol}>{info.symbol}</span>
                                    <span className={styles.otherSignName}>
                                        {language === 'en' ? info.name_en : info.name_pl}
                                    </span>
                                </Link>
                            );
                        })}
                    </div>
                </section>

                {/* CTA */}
                {!loading && sortedProducts.length === 0 && (
                    <section style={{ textAlign: 'center', padding: '0 1.5rem 4rem' }}>
                        <Link
                            to="/venus-calculator"
                            style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                padding: '0.8rem 1.8rem',
                                borderRadius: '100px',
                                background: 'linear-gradient(135deg, hsl(280, 60%, 55%), hsl(320, 70%, 55%))',
                                color: '#fff',
                                fontWeight: 600,
                                fontSize: '0.9rem',
                                textDecoration: 'none',
                            }}
                        >
                            <Sparkles size={16} />
                            {language === 'en'
                                ? 'Find Your Venus Sign'
                                : 'Znajdź Swój Znak Wenus'
                            }
                        </Link>
                    </section>
                )}
            </main>
        </>
    );
}
