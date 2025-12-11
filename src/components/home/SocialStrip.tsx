/* ===========================================
   SOCIAL STRIP COMPONENT
   Instagram/Social media gallery for home page
   =========================================== */

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

    return (
        <section className={styles.section}>
            {/* Header */}
            <motion.div
                className={styles.header}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <Instagram className={styles.icon} size={24} />
                <a
                    href="https://instagram.com/houseofvenus"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.handle}
                >
                    @houseofvenus
                </a>
                <p className={styles.tagline}>
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
        </section>
    );
}
