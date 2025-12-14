/* ===========================================
   FEATURED PRODUCTS SECTION - REDESIGNED
   "The [Season] Season Edit" carousel style
   =========================================== */

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useProducts } from '../../hooks';
import ProductCard from '../product/ProductCard';
import styles from './FeaturedProducts.module.css';

// Get current zodiac season
function getCurrentZodiacSeason(): { sign: string; sign_pl: string } {
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();

    const seasons = [
        { start: [3, 21], end: [4, 19], sign: 'Aries', sign_pl: 'Baran' },
        { start: [4, 20], end: [5, 20], sign: 'Taurus', sign_pl: 'Byk' },
        { start: [5, 21], end: [6, 20], sign: 'Gemini', sign_pl: 'Bliźnięta' },
        { start: [6, 21], end: [7, 22], sign: 'Cancer', sign_pl: 'Rak' },
        { start: [7, 23], end: [8, 22], sign: 'Leo', sign_pl: 'Lew' },
        { start: [8, 23], end: [9, 22], sign: 'Virgo', sign_pl: 'Panna' },
        { start: [9, 23], end: [10, 22], sign: 'Libra', sign_pl: 'Waga' },
        { start: [10, 23], end: [11, 21], sign: 'Scorpio', sign_pl: 'Skorpion' },
        { start: [11, 22], end: [12, 21], sign: 'Sagittarius', sign_pl: 'Strzelec' },
        { start: [12, 22], end: [1, 19], sign: 'Capricorn', sign_pl: 'Koziorożec' },
        { start: [1, 20], end: [2, 18], sign: 'Aquarius', sign_pl: 'Wodnik' },
        { start: [2, 19], end: [3, 20], sign: 'Pisces', sign_pl: 'Ryby' },
    ];

    for (const season of seasons) {
        const [startMonth, startDay] = season.start;
        const [endMonth, endDay] = season.end;

        if (startMonth <= endMonth) {
            if ((month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay) ||
                (month > startMonth && month < endMonth)) {
                return { sign: season.sign, sign_pl: season.sign_pl };
            }
        } else {
            // Handle Capricorn (Dec-Jan wraparound)
            if ((month === startMonth && day >= startDay) ||
                (month === endMonth && day <= endDay) ||
                (month > startMonth || month < endMonth)) {
                return { sign: season.sign, sign_pl: season.sign_pl };
            }
        }
    }

    return { sign: 'Sagittarius', sign_pl: 'Strzelec' }; // Default fallback
}

export default function FeaturedProducts() {
    const { language } = useTranslation();
    const { products, loading, error } = useProducts({ featured: true, limit: 8 });
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const currentSeason = getCurrentZodiacSeason();
    const displayProducts = products.slice(0, 8);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: 'left' | 'right') => {
        if (scrollRef.current) {
            const scrollAmount = 320;
            scrollRef.current.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

    return (
        <section className={styles.section}>
            <div className="container">
                {/* Header with season title */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>
                        {language === 'en'
                            ? `The ${currentSeason.sign} Season Edit`
                            : `Edycja Sezonu ${currentSeason.sign_pl}`
                        }
                    </h2>

                    {/* Carousel navigation */}
                    <div className={styles.navigation}>
                        <button
                            className={`${styles.navButton} ${!canScrollLeft ? styles.navButtonDisabled : ''}`}
                            onClick={() => scroll('left')}
                            disabled={!canScrollLeft}
                            aria-label="Previous products"
                        >
                            <ChevronLeft size={20} />
                        </button>
                        <button
                            className={`${styles.navButton} ${!canScrollRight ? styles.navButtonDisabled : ''}`}
                            onClick={() => scroll('right')}
                            disabled={!canScrollRight}
                            aria-label="Next products"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </motion.div>

                {/* Loading State */}
                {loading && (
                    <div className={styles.loadingState}>
                        <Loader2 size={24} className={styles.spinner} />
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.errorState}>
                        <p>{language === 'en' ? 'Failed to load products' : 'Nie udało się załadować'}</p>
                    </div>
                )}

                {/* Products carousel */}
                {!loading && !error && displayProducts.length > 0 && (
                    <div
                        className={styles.carousel}
                        ref={scrollRef}
                        onScroll={handleScroll}
                    >
                        {displayProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                className={styles.productItem}
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.05 }}
                            >
                                <ProductCard
                                    id={product.id}
                                    name={language === 'pl' ? product.name_pl : product.name_en}
                                    namePl={product.name_pl}
                                    price={product.price_pln}
                                    originalPrice={product.original_price_pln || undefined}
                                    images={product.images || []}
                                    category={language === 'en' ? product.category : product.category_pl || product.category}
                                    venusSign={product.venus_sign}
                                    isNew={product.is_new}
                                    isSale={product.is_sale}
                                    rating={product.rating}
                                    reviewCount={product.review_count}
                                />
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* View all link */}
                {!loading && displayProducts.length > 0 && (
                    <motion.div
                        className={styles.viewAllWrapper}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/shop" className={styles.viewAllLink}>
                            {language === 'en' ? 'View All Products' : 'Zobacz wszystkie produkty'}
                            <ArrowRight size={16} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
