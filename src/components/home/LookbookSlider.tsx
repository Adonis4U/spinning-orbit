/* ===========================================
   LOOKBOOK SLIDER COMPONENT
   Featured lookbooks carousel for home page
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Camera, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useLookbooks } from '../../hooks';
import styles from './LookbookSlider.module.css';

export default function LookbookSlider() {
    const { t, language } = useTranslation();
    const { lookbooks, loading, error } = useLookbooks({ limit: 3 });

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
                    <div className={styles.headerLeft}>
                        <Camera className={styles.icon} size={24} />
                        <h2 className={styles.title}>{t('header.nav.lookbook')}</h2>
                    </div>
                    <Link to="/lookbook" className={styles.viewAll}>
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
                        <p>{language === 'en' ? 'Failed to load lookbooks' : 'Nie udało się załadować'}</p>
                    </div>
                )}

                {/* Lookbook cards */}
                {!loading && !error && lookbooks.length > 0 && (
                    <div className={styles.grid}>
                        {lookbooks.map((lookbook, index) => (
                            <motion.article
                                key={lookbook.id}
                                className={styles.card}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8 }}
                            >
                                <Link to={`/lookbook/${lookbook.slug}`} className={styles.cardLink}>
                                    {/* Image */}
                                    <div className={styles.imageWrapper}>
                                        <img
                                            src={lookbook.hero_image || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=800&fit=crop'}
                                            alt={language === 'en' ? lookbook.title_en : lookbook.title_pl}
                                            className={styles.image}
                                            loading="lazy"
                                        />
                                        <div className={styles.overlay} />
                                    </div>

                                    {/* Content */}
                                    <div className={styles.content}>
                                        <h3 className={styles.cardTitle}>
                                            {language === 'en' ? lookbook.title_en : lookbook.title_pl}
                                        </h3>
                                        <p className={styles.cardDescription}>
                                            {language === 'en' ? lookbook.description_en : lookbook.description_pl}
                                        </p>
                                        <span className={styles.exploreLink}>
                                            {t('common.learnMore')}
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
}
