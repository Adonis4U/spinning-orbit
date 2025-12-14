/* ===========================================
   SOCIAL STRIP COMPONENT - REDESIGNED
   "Join the Cosmic Circle" newsletter + Instagram gallery
   =========================================== */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Instagram, ExternalLink } from 'lucide-react';
import { useTranslation } from '../../contexts';
import styles from './SocialStrip.module.css';

// Mock Instagram posts
const MOCK_POSTS = [
    {
        id: '1',
        image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=300&h=300&fit=crop',
        link: '#',
    },
    {
        id: '2',
        image: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=300&h=300&fit=crop',
        link: '#',
    },
    {
        id: '3',
        image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=300&h=300&fit=crop',
        link: '#',
    },
    {
        id: '4',
        image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=300&h=300&fit=crop',
        link: '#',
    },
    {
        id: '5',
        image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=300&h=300&fit=crop',
        link: '#',
    },
    {
        id: '6',
        image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=300&h=300&fit=crop',
        link: '#',
    },
];

export default function SocialStrip() {
    const { language } = useTranslation();
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) return;

        setStatus('loading');

        // Simulate API call (replace with actual newsletter signup)
        try {
            await new Promise(resolve => setTimeout(resolve, 1000));
            setStatus('success');
            setEmail('');
        } catch {
            setStatus('error');
        }
    };

    return (
        <section className={styles.section}>
            {/* Newsletter */}
            <div className={styles.newsletterWrapper}>
                <div className={styles.container}>
                    {/* Title */}
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        {language === 'en'
                            ? 'Join the Cosmic Circle'
                            : 'Dołącz do Kosmicznego Kręgu'
                        }
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {language === 'en'
                            ? 'Get weekly horoscopes, exclusive styling tips, and exclusive drops delivered to your inbox.'
                            : 'Otrzymuj cotygodniowe horoskopy, ekskluzywne porady stylizacyjne i premiery prosto na swoją skrzynkę.'
                        }
                    </motion.p>

                    {/* Newsletter form */}
                    <motion.form
                        className={styles.form}
                        onSubmit={handleSubmit}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder={language === 'en' ? 'Enter your email' : 'Wpisz swój email'}
                            className={styles.input}
                            required
                            disabled={status === 'loading' || status === 'success'}
                        />
                        <button
                            type="submit"
                            className={styles.button}
                            disabled={status === 'loading' || status === 'success'}
                        >
                            {status === 'loading'
                                ? '...'
                                : status === 'success'
                                    ? (language === 'en' ? 'Subscribed!' : 'Zapisano!')
                                    : (language === 'en' ? 'Subscribe' : 'Zapisz się')
                            }
                        </button>
                    </motion.form>

                    {/* Success/Error message */}
                    {status === 'success' && (
                        <motion.p
                            className={styles.successMessage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {language === 'en'
                                ? '✨ Welcome to the Cosmic Circle!'
                                : '✨ Witaj w Kosmicznym Kręgu!'
                            }
                        </motion.p>
                    )}

                    {status === 'error' && (
                        <motion.p
                            className={styles.errorMessage}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                        >
                            {language === 'en'
                                ? 'Something went wrong. Please try again.'
                                : 'Coś poszło nie tak. Spróbuj ponownie.'
                            }
                        </motion.p>
                    )}
                </div>
            </div>

            {/* Instagram Gallery */}
            <div className={styles.instagramSection}>
                {/* Header */}
                <motion.div
                    className={styles.instagramHeader}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Instagram className={styles.instagramIcon} size={24} />
                    <a
                        href="https://instagram.com/houseofvenus"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.instagramHandle}
                    >
                        @houseofvenus
                    </a>
                    <p className={styles.instagramTagline}>
                        {language === 'en'
                            ? 'Share your cosmic style'
                            : 'Podziel się swoim kosmicznym stylem'}
                    </p>
                </motion.div>

                {/* Gallery */}
                <div className={styles.gallery}>
                    {MOCK_POSTS.map((post, index) => (
                        <motion.a
                            key={post.id}
                            href={post.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={styles.post}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                            whileHover={{ scale: 1.02 }}
                        >
                            <img
                                src={post.image}
                                alt="Instagram post"
                                className={styles.postImage}
                                loading="lazy"
                            />
                            <div className={styles.postOverlay}>
                                <ExternalLink size={24} />
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
}
