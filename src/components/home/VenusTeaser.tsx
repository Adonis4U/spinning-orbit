/* ===========================================
   VENUS TEASER COMPONENT - REDESIGNED
   "More Than Just a Horoscope" split layout
   Left: Image, Right: Content
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts';
import styles from './VenusTeaser.module.css';

export default function VenusTeaser() {
    const { language } = useTranslation();

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                {/* LEFT: Image */}
                <motion.div
                    className={styles.imageWrapper}
                    initial={{ opacity: 0, x: -40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className={styles.imagePlaceholder}>
                        {/* Crystal ball / mystical image */}
                        <div className={styles.crystalBall}>
                            <span className={styles.venusSymbol}>♀</span>
                        </div>
                    </div>
                </motion.div>

                {/* RIGHT: Content */}
                <motion.div
                    className={styles.content}
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.1 }}
                >
                    <span className={styles.label}>
                        {language === 'en' ? 'OUR METHODOLOGY' : 'NASZA METODOLOGIA'}
                    </span>

                    <h2 className={styles.title}>
                        {language === 'en'
                            ? 'More Than Just a Horoscope'
                            : 'Więcej niż Horoskop'
                        }
                    </h2>

                    <p className={styles.description}>
                        {language === 'en'
                            ? 'Your Venus sign dictates what catches your eye, how you express yourself and your personal aesthetic. House of Venus combines astrology with contemporary high fashion to curate a look that resonates with your soul\'s style.'
                            : 'Twój znak Wenus określa, co przyciąga Twój wzrok, jak się wyrażasz i Twoją osobistą estetykę. House of Venus łączy astrologię ze współczesną modą, aby stworzyć look, który rezonuje ze stylem Twojej duszy.'
                        }
                    </p>

                    <Link to="/about" className={styles.link}>
                        {language === 'en' ? 'Read the Journal' : 'Czytaj więcej'}
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
