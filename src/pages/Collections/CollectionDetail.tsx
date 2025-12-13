/* ===========================================
   COLLECTION DETAIL PAGE
   Single collection view with products from Supabase
   =========================================== */

import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Sparkles, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useCollections, useProducts } from '../../hooks';
import { ZodiacIcon } from '../../components/common';
import ProductCard from '../../components/product/ProductCard';
import styles from './CollectionDetail.module.css';

export default function CollectionDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { language } = useTranslation();

    const { collections, loading: loadingCollections } = useCollections({ slug });
    const collection = collections[0];

    // Get products for this collection - by featured signs
    const featuredSigns = collection?.featured_signs || [];
    const { products, loading: loadingProducts } = useProducts({
        venusSign: featuredSigns[0] // We'll filter more after
    });

    // Filter products by all featured signs
    const collectionProducts = featuredSigns.length > 0
        ? products.filter(p => featuredSigns.includes(p.venus_sign.toLowerCase()))
        : products.slice(0, 8);

    const loading = loadingCollections || loadingProducts;

    if (!loading && !collection && slug) {
        return <Navigate to="/collections" replace />;
    }

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.loadingState}>
                    <Loader2 size={32} className={styles.spinner} />
                    <p>{language === 'en' ? 'Loading...' : 'Ładowanie...'}</p>
                </div>
            </main>
        );
    }

    if (!collection) return null;

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? collection.name_en : collection.name_pl} | House of Venus</title>
                <meta
                    name="description"
                    content={(language === 'en' ? collection.description_en : collection.description_pl) ?? ''}
                />
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section
                    className={styles.hero}
                    style={{
                        background: `linear-gradient(135deg, ${collection.gradient_from || '#6b21a8'}ee 0%, ${collection.gradient_to || '#9333ea'}ee 100%)`
                    }}
                >
                    <img
                        src={collection.hero_image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop'}
                        alt={collection.name_en}
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <Link to="/collections" className={styles.backLink}>
                            <ArrowLeft size={18} />
                            {language === 'en' ? 'All Collections' : 'Wszystkie Kolekcje'}
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.signBadges}>
                                {(collection.featured_signs || []).map(sign => (
                                    <div key={sign} className={styles.signBadge}>
                                        <ZodiacIcon sign={sign} size={18} />
                                    </div>
                                ))}
                            </div>
                            <h1 className={styles.title}>
                                {language === 'en' ? collection.name_en : collection.name_pl}
                            </h1>
                            <p className={styles.description}>
                                {language === 'en' ? collection.description_en : collection.description_pl}
                            </p>
                        </motion.div>
                    </div>
                </section>

                {/* Products */}
                <section className={styles.productsSection}>
                    <div className={styles.sectionHeader}>
                        <Sparkles size={18} className={styles.sectionIcon} />
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Shop the Collection' : 'Kupuj z Kolekcji'}
                        </h2>
                    </div>
                    <div className={styles.productsGrid}>
                        {collectionProducts.map((product, index) => (
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
                                    originalPrice={product.original_price_pln ?? undefined}
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
                    {collectionProducts.length === 0 && (
                        <p className={styles.emptyMessage}>
                            {language === 'en'
                                ? 'No products found for this collection yet.'
                                : 'Brak produktów dla tej kolekcji.'
                            }
                        </p>
                    )}
                </section>
            </main>
        </>
    );
}
