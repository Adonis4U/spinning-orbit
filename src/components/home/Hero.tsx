/* ===========================================
   HERO SECTION COMPONENT - MATCHING REFERENCE
   Full-width cosmic background with centered calculator
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import Starfield from '../common/Starfield';
import MiniVenusCalculator from './MiniVenusCalculator';
import styles from './Hero.module.css';

export default function Hero() {
    const { language } = useTranslation();

    // Staggered animation for hero elements
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const },
        },
    };

    return (
        <section className={styles.hero}>
            {/* Background image overlay */}
            <div className={styles.backgroundImage} />

            {/* Gradient overlay */}
            <div className={styles.gradientOverlay} />

            {/* Animated starfield (subtle) */}
            <Starfield starCount={80} className={styles.starfield} />

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
