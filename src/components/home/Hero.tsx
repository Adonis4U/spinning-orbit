/* ===========================================
   HERO SECTION COMPONENT
   Two-column layout: Text left, Calculator right
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, ArrowRight } from 'lucide-react';
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

    const calculatorVariants = {
        hidden: { opacity: 0, x: 60, scale: 0.95 },
        visible: {
            opacity: 1,
            x: 0,
            scale: 1,
            transition: {
                duration: 1,
                ease: [0.22, 1, 0.36, 1] as const,
                delay: 0.4
            },
        },
    };

    return (
        <section className={styles.hero}>
            {/* Animated starfield background */}
            <Starfield starCount={150} className={styles.starfield} />

            {/* Gradient overlays */}
            <div className={styles.gradientOverlay} />
            <div className={styles.gradientBottom} />

            {/* Main content grid */}
            <div className={styles.container}>
                {/* LEFT: Text content */}
                <motion.div
                    className={styles.textContent}
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {/* Badge */}
                    <motion.div className={styles.badge} variants={itemVariants}>
                        <Sparkles size={14} />
                        <span>{language === 'en' ? 'Venus-Inspired Fashion' : 'Moda Inspirowana Wenus'}</span>
                    </motion.div>

                    {/* Main title */}
                    <motion.h1 className={styles.title} variants={itemVariants}>
                        {language === 'en' ? (
                            <>
                                House of Venus<br />
                                <span className={styles.titleSecondary}>
                                    Your Style Begins<br />
                                    with <span className={styles.titleHighlight}>Venus</span>
                                </span>
                            </>
                        ) : (
                            <>
                                House of Venus<br />
                                <span className={styles.titleSecondary}>
                                    Twój Styl Zaczyna<br />
                                    się od <span className={styles.titleHighlight}>Wenus</span>
                                </span>
                            </>
                        )}
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p className={styles.subtitle} variants={itemVariants}>
                        {language === 'en'
                            ? 'Discover your unique fashion energy through astrology. Let Venus guide you to the perfect style and vintage elements aligned with your cosmic essence.'
                            : 'Odkryj swoją unikalną energię modową dzięki astrologii. Pozwól Wenus poprowadzić Cię do idealnego stylu i dobranych vintage\'owych elementów zgodnych z Twoją kosmiczną esencją.'
                        }
                    </motion.p>

                    {/* CTA buttons */}
                    <motion.div className={styles.ctas} variants={itemVariants}>
                        <Link to="/venus-calculator" className={styles.ctaPrimary}>
                            <Sparkles size={16} />
                            {language === 'en' ? 'Discover Your Venus' : 'Odkryj Swoją Wenus'}
                            <ArrowRight size={16} />
                        </Link>
                        <Link to="/collections" className={styles.ctaSecondary}>
                            {language === 'en' ? 'Shop by Sign' : 'Kup według znaku'}
                        </Link>
                    </motion.div>
                </motion.div>

                {/* RIGHT: Calculator card */}
                <motion.div
                    className={styles.calculatorWrapper}
                    variants={calculatorVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <MiniVenusCalculator />
                </motion.div>
            </div>

            {/* Floating zodiac symbols decoration */}
            <div className={styles.floatingSymbols}>
                {['♈', '♉', '♊', '♋', '♌', '♍'].map((symbol, i) => (
                    <motion.span
                        key={i}
                        className={styles.floatingSymbol}
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: [0.1, 0.3, 0.1],
                            y: [0, -15, 0],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Infinity,
                            delay: i * 0.5,
                        }}
                        style={{
                            left: `${8 + i * 15}%`,
                            top: `${15 + (i % 2) * 10}%`,
                        }}
                    >
                        {symbol}
                    </motion.span>
                ))}
            </div>

            {/* Scroll indicator */}
            <motion.div
                className={styles.scrollIndicator}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5 }}
            >
                <motion.div
                    className={styles.scrollDot}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                />
            </motion.div>
        </section>
    );
}
