/* ===========================================
   LOOKBOOK PAGE
   Editorial fashion gallery
   =========================================== */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Camera, ArrowRight, MapPin, User, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useLookbooks } from '../../hooks';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { ZodiacIcon } from '../../components/common';
import styles from './Lookbook.module.css';

export default function Lookbook() {
    const { language } = useTranslation();
    const { lookbooks, loading, error } = useLookbooks();

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Lookbook' : 'Lookbook'} | House of Venus</title>
                <meta
                    name="description"
                    content={language === 'en'
                        ? 'Explore our editorial lookbooks featuring Venus-inspired fashion photography'
                        : 'Odkryj nasze edytorialne lookbooki z fotografią mody inspirowaną Wenus'
                    }
                />
            </Helmet>

            <main className={styles.page}>
                {/* Hero Section */}
                <section className={styles.hero}>
                    <motion.div
                        className={styles.heroContent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.badge}>
                            <Camera size={14} />
                            {language === 'en' ? 'Editorial' : 'Edytorial'}
                        </div>
                        <h1 className={styles.title}>
                            {language === 'en' ? 'The Lookbook' : 'Lookbook'}
                        </h1>
                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? 'Editorial collections capturing the essence of each Venus sign'
                                : 'Edytorialne kolekcje uchwycające esencję każdego znaku Wenus'
                            }
                        </p>
                    </motion.div>
                </section>

                {/* Loading State */}
                {loading && (
                    <div className={styles.loadingState}>
                        <Loader2 size={32} className={styles.spinner} />
                        <p>{language === 'en' ? 'Loading lookbooks...' : 'Ładowanie lookbooków...'}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.errorState}>
                        <p>{language === 'en' ? 'Failed to load lookbooks' : 'Nie udało się załadować lookbooków'}</p>
                    </div>
                )}

                {/* Lookbooks Grid */}
                {!loading && !error && (
                    <section className={styles.lookbooksSection}>
                        <div className={styles.lookbooksGrid}>
                            {lookbooks.map((lookbook, index) => {
                                const signInfo = lookbook.venus_sign ? ZODIAC_SIGNS[lookbook.venus_sign as keyof typeof ZODIAC_SIGNS] : null;

                                return (
                                    <motion.article
                                        key={lookbook.id}
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={`/lookbook/${lookbook.slug}`}
                                            className={styles.lookbookCard}
                                        >
                                            {/* Image Section */}
                                            <div className={styles.imageSection}>
                                                <img
                                                    src={lookbook.hero_image || 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1200&h=800&fit=crop'}
                                                    alt={language === 'en' ? lookbook.title_en : lookbook.title_pl}
                                                    className={styles.heroImage}
                                                />
                                                {lookbook.venus_sign && signInfo && (
                                                    <div className={styles.signBadge}>
                                                        <ZodiacIcon sign={lookbook.venus_sign} size={14} />
                                                        <span>{language === 'en' ? signInfo.name_en : signInfo.name_pl}</span>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Content Section */}
                                            <div className={styles.contentSection}>
                                                <h2 className={styles.lookbookTitle}>
                                                    {language === 'en' ? lookbook.title_en : lookbook.title_pl}
                                                </h2>
                                                <p className={styles.lookbookDesc}>
                                                    {language === 'en' ? lookbook.description_en : lookbook.description_pl}
                                                </p>

                                                {/* Meta Info */}
                                                <div className={styles.metaInfo}>
                                                    {lookbook.photographer && (
                                                        <div className={styles.metaItem}>
                                                            <span className={styles.metaLabel}>
                                                                <Camera size={12} /> {language === 'en' ? 'Photo' : 'Foto'}
                                                            </span>
                                                            <span className={styles.metaValue}>{lookbook.photographer}</span>
                                                        </div>
                                                    )}
                                                    {lookbook.model && (
                                                        <div className={styles.metaItem}>
                                                            <span className={styles.metaLabel}>
                                                                <User size={12} /> {language === 'en' ? 'Model' : 'Model'}
                                                            </span>
                                                            <span className={styles.metaValue}>{lookbook.model}</span>
                                                        </div>
                                                    )}
                                                    {lookbook.location && (
                                                        <div className={styles.metaItem}>
                                                            <span className={styles.metaLabel}>
                                                                <MapPin size={12} /> {language === 'en' ? 'Location' : 'Miejsce'}
                                                            </span>
                                                            <span className={styles.metaValue}>{lookbook.location}</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <button className={styles.viewButton}>
                                                    {language === 'en' ? 'View Lookbook' : 'Zobacz Lookbook'}
                                                    <ArrowRight size={16} />
                                                </button>

                                                {/* Gallery Preview */}
                                                {lookbook.gallery_images && lookbook.gallery_images.length > 0 && (
                                                    <div className={styles.galleryPreview}>
                                                        {lookbook.gallery_images.slice(0, 3).map((img, i) => (
                                                            <div key={i} className={styles.previewImage}>
                                                                <img src={img} alt="" />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </Link>
                                    </motion.article>
                                );
                            })}
                        </div>

                        {lookbooks.length === 0 && !loading && (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>📸</div>
                                <p>{language === 'en' ? 'Coming soon...' : 'Wkrótce...'}</p>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}
