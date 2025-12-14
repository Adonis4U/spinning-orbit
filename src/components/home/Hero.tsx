/* ===========================================
   HERO SECTION COMPONENT - MATCHING REFERENCE
   Full-width cosmic background with centered calculator
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
// import Starfield from '../common/Starfield'; // Temporarily disabled
import MiniVenusCalculator from './MiniVenusCalculator';
import styles from './Hero.module.css';

export default function Hero() {
    const { language } = useTranslation();

    // Enhanced staggered animation for hero elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: {
            opacity: 0,
            y: 40,
            scale: 0.95,
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.25, 0.46, 0.45, 0.94] as const,
            },
        },
    };

    return (
        <section className={styles.hero}>
            {/* Background Video - Optimized for performance */}
            <div className={styles.backgroundVideo}>
                <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    preload="auto"
                    // poster="https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=1920&q=80" // Disabled to prevent image flash
                    // Performance optimizations
                    disablePictureInPicture
                    controlsList="nodownload nofullscreen noremoteplayback"
                >
                    {/* 
                        IMPORTANT: For best performance, compress your video:
                        - Use H.264 codec
                        - Target bitrate: 2-3 Mbps for 1080p
                        - Resolution: 1920x1080 or lower
                        - Duration: Keep it short (15-30 seconds loop)
                        - Use tools like HandBrake or FFmpeg to compress
                    */}
                    <source src="/videos/hero-background.mp4" type="video/mp4" />
                </video>
            </div>

            {/* Gradient overlay */}
            <div className={styles.gradientOverlay} />

            {/* Animated starfield (subtle) - Temporarily disabled */}
            {/* <Starfield starCount={80} className={styles.starfield} /> */}

            {/* Main content - centered */}
            <div className={styles.container}>
                <motion.div
                    className={styles.content}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Main Title */}
                    <motion.h1 className={styles.title} variants={itemVariants}>
                        {language === 'en' ? (
                            <>
                                Unlock Your <span className={styles.titleGradient}>Cosmic</span>
                                <br />
                                Style Code
                            </>
                        ) : (
                            <>
                                Odkryj Swój <span className={styles.titleGradient}>Kosmiczny</span>
                                <br />
                                Kod Stylu
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p className={styles.subtitle} variants={itemVariants}>
                        {language === 'en'
                            ? 'Enter your birth details to reveal your Venus Sign and discover a wardrobe written in the stars.'
                            : 'Wprowadź dane urodzenia, aby odkryć swój znak Wenus i znaleźć garderobę zapisaną w gwiazdach.'
                        }
                    </motion.p>

                    {/* Calculator Widget */}
                    <motion.div
                        className={styles.calculatorWrapper}
                        variants={itemVariants}
                    >
                        <MiniVenusCalculator />
                    </motion.div>

                    {/* Skip to collection link */}
                    <motion.div className={styles.skipLink} variants={itemVariants}>
                        <span>
                            {language === 'en' ? "Don't know your time?" : "Nie znasz godziny?"}
                        </span>
                        <Link to="/collections">
                            {language === 'en' ? 'Skip to collection' : 'Przejdź do kolekcji'}
                        </Link>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
