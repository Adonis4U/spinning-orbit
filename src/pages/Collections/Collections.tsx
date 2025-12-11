/* ===========================================
   COLLECTIONS PAGE
   Venus-inspired collection grid with premium design
   =========================================== */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useCollections } from '../../hooks';
import { ZodiacIcon } from '../../components/common';
import styles from './Collections.module.css';

const SEASONS: Record<string, { en: string; pl: string }> = {
    spring: { en: 'Spring', pl: 'Wiosna' },
    summer: { en: 'Summer', pl: 'Lato' },
    autumn: { en: 'Autumn', pl: 'Jesień' },
    winter: { en: 'Winter', pl: 'Zima' }
};

export default function Collections() {
    const { language } = useTranslation();
    const { collections, loading, error } = useCollections();

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Collections' : 'Kolekcje'} | House of Venus</title>
                <meta
                    name="description"
                    content={language === 'en'
                        ? 'Explore our zodiac-inspired fashion collections curated for each Venus sign'
                        : 'Odkryj nasze kolekcje modowe inspirowane zodiakiem, stworzone dla każdego znaku Wenus'
                    }
                />
            </Helmet>

            <main className={styles.page}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <div className={styles.heroBackground}>
                        <div className={styles.floatingOrb} />
                        <div className={styles.floatingOrb2} />
                    </div>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.badge}>
                            <Sparkles size={14} />
                            {language === 'en' ? 'Venus Collections' : 'Kolekcje Wenus'}
                        </div>
                        <h1 className={styles.title}>
                            {language === 'en' ? 'Curated Collections' : 'Wyselekcjonowane Kolekcje'}
                        </h1>
                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? 'Fashion aligned with the stars, designed for every Venus sign'
                                : 'Moda zgodna z gwiazdami, zaprojektowana dla każdego znaku Wenus'
                            }
                        </p>
                    </motion.div>
                </section>

                {/* Loading State */}
                {loading && (
                    <div className={styles.loadingState}>
                        <Loader2 size={32} className={styles.spinner} />
                        <p>{language === 'en' ? 'Loading collections...' : 'Ładowanie kolekcji...'}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.errorState}>
                        <p>{language === 'en' ? 'Failed to load collections' : 'Nie udało się załadować kolekcji'}</p>
                    </div>
                )}

                {/* Collections Grid */}
                {!loading && !error && (
                    <section className={styles.collectionsSection}>
                        <div className={styles.collectionsGrid}>
                            {collections.map((collection, index) => (
                                <motion.div
                                    key={collection.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: index * 0.1 }}
                                    className={index === 0 ? styles.featuredCollection : ''}
                                >
                                    <Link
                                        to={`/collections/${collection.slug}`}
                                        className={styles.collectionCard}
                                    >
                                        <img
                                            src={collection.hero_image || 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&h=800&fit=crop'}
                                            alt={language === 'en' ? collection.name_en : collection.name_pl}
                                            className={styles.cardImage}
                                        />
                                        <div
                                            className={styles.cardGradient}
                                            style={{
                                                background: `linear-gradient(135deg, ${collection.gradient_from || '#333'}dd 0%, ${collection.gradient_to || '#666'}dd 100%)`
                                            }}
                                        />
                                        <div className={styles.cardContent}>
                                            <div className={styles.signBadges}>
                                                {(collection.featured_signs || []).slice(0, 3).map(sign => (
                                                    <div key={sign} className={styles.signBadge}>
                                                        <ZodiacIcon sign={sign} size={16} />
                                                    </div>
                                                ))}
                                            </div>
                                            <h2 className={styles.collectionName}>
                                                {language === 'en' ? collection.name_en : collection.name_pl}
                                            </h2>
                                            <p className={styles.collectionDesc}>
                                                {language === 'en'
                                                    ? collection.short_description_en
                                                    : collection.short_description_pl
                                                }
                                            </p>
                                            <span className={styles.exploreLink}>
                                                {language === 'en' ? 'Explore Collection' : 'Odkryj Kolekcję'}
                                                <ArrowRight size={16} />
                                            </span>
                                        </div>
                                        {collection.season && (
                                            <span className={styles.seasonTag}>
                                                {SEASONS[collection.season]?.[language] || collection.season}
                                            </span>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </section>
                )}

                {/* CTA Section */}
                <section className={styles.ctaSection}>
                    <motion.div
                        className={styles.ctaContent}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={styles.ctaTitle}>
                            {language === 'en'
                                ? "Find Your Venus Collection"
                                : "Znajdź Swoją Kolekcję Wenus"
                            }
                        </h2>
                        <p className={styles.ctaText}>
                            {language === 'en'
                                ? "Discover which collection aligns with your Venus sign. Take our Venus Calculator to unlock personalized recommendations."
                                : "Odkryj, która kolekcja pasuje do Twojego znaku Wenus. Skorzystaj z naszego Kalkulatora Wenus, aby odblokować spersonalizowane rekomendacje."
                            }
                        </p>
                        <Link to="/venus-calculator" className={styles.ctaButton}>
                            <Sparkles size={18} />
                            {language === 'en' ? 'Calculate Your Venus' : 'Oblicz Swoją Wenus'}
                        </Link>
                    </motion.div>
                </section>
            </main>
        </>
    );
}
