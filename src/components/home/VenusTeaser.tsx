/* ===========================================
   VENUS TEASER COMPONENT
   Venus Calculator teaser section for home page
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Sparkles, Star, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts';
import styles from './VenusTeaser.module.css';

export default function VenusTeaser() {
    const { t } = useTranslation();

    return (
        <section className={styles.section}>
            <div className={styles.background}>
                {/* Decorative stars */}
                {[...Array(20)].map((_, i) => (
                    <motion.div
                        key={i}
                        className={styles.star}
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            opacity: [0.2, 0.8, 0.2],
                            scale: [1, 1.2, 1],
                        }}
                        transition={{
                            duration: 2 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                        }}
                    >
                        <Star size={6 + Math.random() * 8} />
                    </motion.div>
                ))}
            </div>

            <div className="container">
                <div className={styles.content}>
                    {/* Icon */}
                    <motion.div
                        className={styles.iconWrapper}
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <Sparkles size={48} className={styles.icon} />
                    </motion.div>

                    {/* Title */}
                    <motion.h2
                        className={styles.title}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        {t('venusCalculator.title')}
                    </motion.h2>

                    {/* Subtitle */}
                    <motion.p
                        className={styles.subtitle}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {t('venusCalculator.subtitle')}
                    </motion.p>

                    {/* Zodiac preview */}
                    <motion.div
                        className={styles.zodiacPreview}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                    >
                        {['♈', '♉', '♊', '♋', '♌', '♍', '♎', '♏', '♐', '♑', '♒', '♓'].map((symbol, i) => (
                            <motion.span
                                key={i}
                                className={styles.zodiacSymbol}
                                whileHover={{ scale: 1.2, rotate: 10 }}
                            >
                                {symbol}
                            </motion.span>
                        ))}
                    </motion.div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                    >
                        <Link to="/venus-calculator" className={styles.cta}>
                            <Sparkles size={18} />
                            {t('venusCalculator.calculate')}
                            <ArrowRight size={18} />
                        </Link>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
