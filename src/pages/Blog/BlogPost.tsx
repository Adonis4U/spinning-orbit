/* ===========================================
   BLOG POST PAGE
   Single article view from Supabase
   =========================================== */

import { useParams, Link, Navigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Calendar, Share2, Twitter, Facebook, Loader2 } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useBlogPosts } from '../../hooks';
import styles from './BlogPost.module.css';

export default function BlogPost() {
    const { slug } = useParams<{ slug: string }>();
    const { language } = useTranslation();

    const { posts, loading } = useBlogPosts({ slug });
    const post = posts[0];

    // Get related posts (same tags)
    const { posts: allPosts } = useBlogPosts({ limit: 10 });
    const relatedPosts = post
        ? allPosts.filter(p =>
            p.id !== post.id &&
            p.tags?.some(t => post.tags?.includes(t))
        ).slice(0, 2)
        : [];

    if (!loading && !post && slug) {
        return <Navigate to="/blog" replace />;
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

    if (!post) return null;

    const formatDate = (dateString: string | null) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString(language === 'en' ? 'en-US' : 'pl-PL', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    // Convert markdown-like content to HTML
    const formatContent = (content: string | null) => {
        if (!content) return null;
        return content
            .split('\n\n')
            .map((paragraph, index) => {
                if (paragraph.startsWith('## ')) {
                    return <h2 key={index} className={styles.contentH2}>{paragraph.replace('## ', '')}</h2>;
                }
                if (paragraph.startsWith('- **')) {
                    const items = paragraph.split('\n').filter(l => l.startsWith('- '));
                    return (
                        <ul key={index} className={styles.contentList}>
                            {items.map((item, i) => {
                                const match = item.match(/- \*\*(.+?)\*\*: (.+)/);
                                if (match) {
                                    return (
                                        <li key={i}>
                                            <strong>{match[1]}</strong>: {match[2]}
                                        </li>
                                    );
                                }
                                return <li key={i}>{item.replace('- ', '')}</li>;
                            })}
                        </ul>
                    );
                }
                if (paragraph.startsWith('1. ')) {
                    const items = paragraph.split('\n').filter(l => /^\d+\./.test(l));
                    return (
                        <ol key={index} className={styles.contentList}>
                            {items.map((item, i) => (
                                <li key={i}>{item.replace(/^\d+\.\s*/, '').replace(/\*\*/g, '')}</li>
                            ))}
                        </ol>
                    );
                }
                return <p key={index} className={styles.contentP}>{paragraph}</p>;
            });
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? post.title_en : post.title_pl} | House of Venus</title>
                <meta
                    name="description"
                    content={(language === 'en' ? post.excerpt_en : post.excerpt_pl) || undefined}
                />
                <meta property="og:title" content={language === 'en' ? post.title_en : post.title_pl} />
                <meta property="og:image" content={post.cover_image ?? undefined} />
            </Helmet>

            <main className={styles.page}>
                {/* Hero */}
                <section className={styles.hero}>
                    <img
                        src={post.cover_image || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=1200&h=800&fit=crop'}
                        alt={post.title_en}
                        className={styles.heroImage}
                    />
                    <div className={styles.heroOverlay} />
                    <div className={styles.heroContent}>
                        <Link to="/blog" className={styles.backLink}>
                            <ArrowLeft size={18} />
                            {language === 'en' ? 'All Articles' : 'Wszystkie Artykuły'}
                        </Link>
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className={styles.tags}>
                                {(post.tags || []).slice(0, 3).map(tag => (
                                    <span key={tag} className={styles.tag}>{tag}</span>
                                ))}
                            </div>
                            <h1 className={styles.title}>
                                {language === 'en' ? post.title_en : post.title_pl}
                            </h1>
                            <div className={styles.metaInfo}>
                                <div className={styles.author}>
                                    {post.author_image && (
                                        <img src={post.author_image} alt={post.author} className={styles.authorImage} />
                                    )}
                                    <span>{post.author}</span>
                                </div>
                                <div className={styles.metaItem}>
                                    <Calendar size={14} />
                                    {formatDate(post.published_at)}
                                </div>
                                <div className={styles.metaItem}>
                                    <Clock size={14} />
                                    {post.reading_time_minutes} {language === 'en' ? 'min read' : 'min'}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Content */}
                <article className={styles.article}>
                    <div className={styles.articleContent}>
                        {formatContent(language === 'en' ? post.content_en : post.content_pl)}
                    </div>

                    {/* Share */}
                    <div className={styles.shareSection}>
                        <span className={styles.shareLabel}>
                            <Share2 size={16} />
                            {language === 'en' ? 'Share this article' : 'Udostępnij artykuł'}
                        </span>
                        <div className={styles.shareButtons}>
                            <button className={styles.shareButton} aria-label="Share on Twitter">
                                <Twitter size={18} />
                            </button>
                            <button className={styles.shareButton} aria-label="Share on Facebook">
                                <Facebook size={18} />
                            </button>
                        </div>
                    </div>
                </article>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.relatedTitle}>
                            {language === 'en' ? 'Related Articles' : 'Powiązane Artykuły'}
                        </h2>
                        <div className={styles.relatedGrid}>
                            {relatedPosts.map(related => (
                                <Link
                                    key={related.id}
                                    to={`/blog/${related.slug}`}
                                    className={styles.relatedCard}
                                >
                                    <div className={styles.relatedImage}>
                                        <img
                                            src={related.cover_image || 'https://images.unsplash.com/photo-1504805572947-34fad45aed93?w=600&h=400&fit=crop'}
                                            alt={related.title_en}
                                        />
                                    </div>
                                    <div className={styles.relatedContent}>
                                        <h3>{language === 'en' ? related.title_en : related.title_pl}</h3>
                                        <span>{related.reading_time_minutes} min</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
