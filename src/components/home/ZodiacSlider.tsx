/* ===========================================
   ZODIAC SLIDER COMPONENT
   Interactive 12 zodiac signs carousel
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ORDER } from '../../constants/zodiac';
import styles from './ZodiacSlider.module.css';

export default function ZodiacSlider() {
    const { t, language } = useTranslation();

    // Convert ZODIAC_SIGNS object to array using the order
    const signsArray = ZODIAC_SIGNS_ORDER.map(signId => ZODIAC_SIGNS[signId]);

    return (
        <section className={styles.section}>
            <div className="container">
                {/* Section header */}
                <motion.div
                    className={styles.header}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <h2 className={styles.title}>{t('zodiac.title')}</h2>
                    <p className={styles.subtitle}>{t('zodiac.subtitle')}</p>
                </motion.div>

                {/* Zodiac grid */}
                <div className={styles.grid}>
                    {signsArray.map((sign, index) => (
                        <motion.div
                            key={sign.id}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={`/collections/${sign.id}`}
                                className={styles.card}
                                style={{
                                    '--sign-color': sign.color_primary,
                                    '--sign-gradient': `linear-gradient(135deg, ${sign.color_primary}, ${sign.color_secondary})`,
                                } as React.CSSProperties}
                            >
                                {/* Symbol */}
                                <div className={styles.symbolWrapper}>
                                    <span className={styles.symbol}>{sign.symbol}</span>
                                </div>

                                {/* Info */}
                                <div className={styles.info}>
                                    <h3 className={styles.signName}>
                                        {language === 'en' ? sign.name_en : sign.name_pl}
                                    </h3>
                                    <span className={styles.dates}>{sign.date_range}</span>
                                </div>

                                {/* Hover glow */}
                                <div className={styles.glow} />
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Venus Calculator CTA */}
                <motion.div
                    className={styles.cta}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    <Link to="/venus-calculator" className={styles.ctaButton}>
                        {t('venusCalculator.calculate')}
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
