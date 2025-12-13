/* ===========================================
   LOOKBOOK DETAIL PAGE
   Single lookbook gallery view from Supabase
   =========================================== */

import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Camera, MapPin, User, ShoppingBag, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useLookbooks, useProducts } from '../../hooks';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { ZodiacIcon } from '../../components/common';
import ProductCard from '../../components/product/ProductCard';
import styles from './LookbookDetail.module.css';

export default function LookbookDetail() {
    const { slug } = useParams<{ slug: string }>();
    const { language } = useTranslation();

    const { lookbooks, loading: loadingLookbook } = useLookbooks({ slug });
    const lookbook = lookbooks[0];

    // Get products by Venus sign from this lookbook
    const venusSign = lookbook?.venus_sign || '';
    const { products, loading: loadingProducts } = useProducts({
        venusSign: venusSign,
        limit: 4
    });

    const loading = loadingLookbook || loadingProducts;

    if (!loading && !lookbook && slug) {
        return <Navigate to="/lookbook" replace />;
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

    if (!lookbook) return null;

    const signInfo = lookbook.venus_sign
        ? ZODIAC_SIGNS[lookbook.venus_sign.toLowerCase() as keyof typeof ZODIAC_SIGNS]
        : null;

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? lookbook.title_en : lookbook.title_pl} | House of Venus</title>
                <meta
                    name="description"
                    content={(language === 'en' ? lookbook.description_en : lookbook.description_pl) || undefined}
                />
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <img
                        src={lookbook.hero_image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop'}
                        alt={lookbook.title_en}
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <Link to="/lookbook" className={styles.backLink}>
                            <ArrowLeft size={18} />
                            {language === 'en' ? 'All Lookbooks' : 'Wszystkie Lookbooki'}
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            {signInfo && (
                                <div className={styles.signBadge}>
                                    <ZodiacIcon sign={lookbook.venus_sign} size={18} />
                                    <span>Venus in {language === 'en' ? signInfo.name_en : signInfo.name_pl}</span>
                                </div>
                            )}
                            <h1 className={styles.title}>
                                {language === 'en' ? lookbook.title_en : lookbook.title_pl}
                            </h1>
                            <p className={styles.description}>
                                {language === 'en' ? lookbook.description_en : lookbook.description_pl}
                            </p>
                            <div className={styles.metaInfo}>
                                {lookbook.photographer && (
                                    <div className={styles.metaItem}>
                                        <Camera size={14} />
                                        {lookbook.photographer}
                                    </div>
                                )}
                                {lookbook.model && (
                                    <div className={styles.metaItem}>
                                        <User size={14} />
                                        {lookbook.model}
                                    </div>
                                )}
                                {lookbook.location && (
                                    <div className={styles.metaItem}>
                                        <MapPin size={14} />
                                        {lookbook.location}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Gallery */}
                {lookbook.gallery_images && lookbook.gallery_images.length > 0 && (
                    <section className={styles.gallerySection}>
                        <div className={styles.gallery}>
                            {lookbook.gallery_images.map((img, index) => (
                                <motion.div
                                    key={index}
                                    className={styles.galleryItem}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: '-50px' }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                >
                                    <img src={img} alt={`Look ${index + 1}`} loading="lazy" />
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* Shop the Look */}
                {products.length > 0 && (
                    <section className={styles.shopSection}>
                        <div className={styles.sectionHeader}>
                            <ShoppingBag size={18} className={styles.sectionIcon} />
                            <h2 className={styles.sectionTitle}>
                                {language === 'en' ? 'Shop the Look' : 'Kup Ten Look'}
                            </h2>
                        </div>
                        <div className={styles.productsGrid}>
                            {products.map((product, index) => (
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
                    </section>
                )}
            </main>
        </>
    );
}
