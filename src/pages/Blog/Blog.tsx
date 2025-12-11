/* ===========================================
   BLOG PAGE
   Modern blog with featured posts
   =========================================== */

import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Clock, Send, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useBlogPosts } from '../../hooks';
import styles from './Blog.module.css';

export default function Blog() {
    const { language } = useTranslation();
    const { posts, loading, error } = useBlogPosts();

    const featuredPosts = posts.filter(p => p.is_featured);
    const mainFeatured = featuredPosts[0];
    const otherPosts = posts.filter(p => p.id !== mainFeatured?.id);

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'en' ? 'en-US' : 'pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Blog' : 'Blog'} | House of Venus</title>
                <meta
                    name="description"
                    content={language === 'en'
                        ? 'Explore astrology, fashion, and cosmic lifestyle articles'
                        : 'Odkryj artykuły o astrologii, modzie i kosmicznym stylu życia'
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
                            <BookOpen size={14} />
                            {language === 'en' ? 'Journal' : 'Dziennik'}
                        </div>
                        <h1 className={styles.title}>
                            {language === 'en' ? 'The Venus Blog' : 'Blog Wenus'}
                        </h1>
                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? 'Astrology, fashion, and cosmic lifestyle insights'
                                : 'Astrologia, moda i inspiracje kosmicznego stylu życia'
                            }
                        </p>
                    </motion.div>
                </section>

                {/* Loading State */}
                {loading && (
                    <div className={styles.loadingState}>
                        <Loader2 size={32} className={styles.spinner} />
                        <p>{language === 'en' ? 'Loading articles...' : 'Ładowanie artykułów...'}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.errorState}>
                        <p>{language === 'en' ? 'Failed to load articles' : 'Nie udało się załadować artykułów'}</p>
                    </div>
                )}

                {/* Featured Post */}
                {!loading && !error && mainFeatured && (
                    <section className={styles.featuredSection}>
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Featured Article' : 'Polecany Artykuł'}
                        </h2>
                        <motion.article
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <Link to={`/blog/${mainFeatured.slug}`} className={styles.featuredPost}>
                                <div className={styles.featuredImage}>
                                    <img
                                        src={mainFeatured.cover_image || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=800&fit=crop'}
                                        alt={language === 'en' ? mainFeatured.title_en : mainFeatured.title_pl}
                                    />
                                </div>
                                <div className={styles.featuredContent}>
                                    <div className={styles.postMeta}>
                                        {mainFeatured.author_image && (
                                            <img
                                                src={mainFeatured.author_image}
                                                alt={mainFeatured.author}
                                                className={styles.authorAvatar}
                                            />
                                        )}
                                        <div className={styles.authorInfo}>
                                            <span className={styles.authorName}>{mainFeatured.author}</span>
                                            <span className={styles.postDate}>{formatDate(mainFeatured.published_at)}</span>
                                        </div>
                                    </div>
                                    <h3 className={styles.featuredTitle}>
                                        {language === 'en' ? mainFeatured.title_en : mainFeatured.title_pl}
                                    </h3>
                                    <p className={styles.featuredExcerpt}>
                                        {language === 'en' ? mainFeatured.excerpt_en : mainFeatured.excerpt_pl}
                                    </p>
                                    <div className={styles.readTime}>
                                        <Clock size={14} />
                                        {mainFeatured.reading_time_minutes} {language === 'en' ? 'min read' : 'min czytania'}
                                    </div>
                                    <span className={styles.readMore}>
                                        {language === 'en' ? 'Read Article' : 'Czytaj Artykuł'}
                                        <ArrowRight size={16} />
                                    </span>
                                </div>
                            </Link>
                        </motion.article>
                    </section>
                )}

                {/* All Posts */}
                {!loading && !error && otherPosts.length > 0 && (
                    <section className={styles.postsSection}>
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Latest Articles' : 'Najnowsze Artykuły'}
                        </h2>
                        <div className={styles.postsGrid}>
                            {otherPosts.map((post, index) => (
                                <motion.article
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.1 + index * 0.1 }}
                                >
                                    <Link to={`/blog/${post.slug}`} className={styles.postCard}>
                                        <div className={styles.postImage}>
                                            <img
                                                src={post.cover_image || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=800&fit=crop'}
                                                alt={language === 'en' ? post.title_en : post.title_pl}
                                            />
                                        </div>
                                        <div className={styles.postContent}>
                                            <div className={styles.postTags}>
                                                {(post.tags || []).slice(0, 2).map(tag => (
                                                    <span key={tag} className={styles.tag}>{tag}</span>
                                                ))}
                                            </div>
                                            <h3 className={styles.postTitle}>
                                                {language === 'en' ? post.title_en : post.title_pl}
                                            </h3>
                                            <p className={styles.postExcerpt}>
                                                {language === 'en' ? post.excerpt_en : post.excerpt_pl}
                                            </p>
                                            <div className={styles.postFooter}>
                                                <div className={styles.postAuthor}>
                                                    {post.author_image && (
                                                        <img src={post.author_image} alt={post.author} />
                                                    )}
                                                    <span>{post.author}</span>
                                                </div>
                                                <span>{post.reading_time_minutes} min</span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.article>
                            ))}
                        </div>
                    </section>
                )}

                {/* Newsletter CTA */}
                <section className={styles.newsletterSection}>
                    <motion.div
                        className={styles.newsletterContent}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className={styles.newsletterTitle}>
                            {language === 'en'
                                ? 'Get Cosmic Updates'
                                : 'Otrzymuj Kosmiczne Aktualizacje'
                            }
                        </h2>
                        <p className={styles.newsletterText}>
                            {language === 'en'
                                ? 'Subscribe to receive style horoscopes, exclusive offers, and Venus-inspired content.'
                                : 'Zapisz się, aby otrzymywać horoskopy modowe, ekskluzywne oferty i treści inspirowane Wenus.'
                            }
                        </p>
                        <form className={styles.newsletterForm} onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder={language === 'en' ? 'Enter your email' : 'Wpisz swój email'}
                                className={styles.newsletterInput}
                            />
                            <button type="submit" className={styles.newsletterButton}>
                                <Send size={16} />
                            </button>
                        </form>
                    </motion.div>
                </section>
            </main>
        </>
    );
}
