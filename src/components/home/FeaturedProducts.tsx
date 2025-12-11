/* ===========================================
   FEATURED PRODUCTS SECTION
   Home page featured products grid
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useProducts } from '../../hooks';
import ProductCard from '../product/ProductCard';
import styles from './FeaturedProducts.module.css';

export default function FeaturedProducts() {
    const { t, language } = useTranslation();
    const { products, loading, error } = useProducts({ featured: true, limit: 4 });

    // If we have fewer than 4 featured products, get newest ones
    const displayProducts = products.slice(0, 4);

    return (
        <section className={styles.section}>
            <div className="container">
                {/* Header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>{t('products.featured')}</h2>
                    <Link to="/shop" className={styles.viewAll}>
                        {t('common.viewAll')}
                        <ArrowRight size={16} />
                    </Link>
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

                {/* Products grid */}
                {!loading && !error && displayProducts.length > 0 && (
                    <div className={styles.grid}>
                        {displayProducts.map((product, index) => (
                            <motion.div
                                key={product.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
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

                {/* Shop CTA */}
                {!loading && displayProducts.length > 0 && (
                    <motion.div
                        className={styles.cta}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <Link to="/shop" className={styles.ctaButton}>
                            {t('header.nav.shop')}
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                )}
            </div>
        </section>
    );
}
