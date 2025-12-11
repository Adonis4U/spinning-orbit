/* ===========================================
   DAILY HOROSCOPE SECTION
   Fashion horoscope teaser for home page
   =========================================== */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Star, RefreshCw } from 'lucide-react';
import { useTranslation, useVenusProfile } from '../../contexts';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ORDER } from '../../constants/zodiac';
import styles from './DailyHoroscope.module.css';

// Mock horoscope data - would come from API
const MOCK_HOROSCOPES = {
    aries: { tip: 'Bold reds and striking silhouettes amplify your fiery energy today.', color: 'Crimson Red' },
    taurus: { tip: 'Soft textures and earthy tones ground your natural elegance.', color: 'Forest Green' },
    gemini: { tip: 'Playful patterns and versatile pieces match your dual nature.', color: 'Sunny Yellow' },
    cancer: { tip: 'Flowy fabrics and soft pastels nurture your sensitive soul.', color: 'Silver Moon' },
    leo: { tip: 'Glamorous gold accents and statement pieces let you shine.', color: 'Royal Gold' },
    virgo: { tip: 'Clean lines and refined details speak to your perfectionism.', color: 'Sage Green' },
    libra: { tip: 'Harmonious palettes and balanced proportions bring inner peace.', color: 'Blush Pink' },
    scorpio: { tip: 'Deep jewel tones and mysterious layers suit your intensity.', color: 'Deep Burgundy' },
    sagittarius: { tip: 'Bold prints and adventurous cuts fuel your wanderlust.', color: 'Electric Purple' },
    capricorn: { tip: 'Structured silhouettes and timeless classics command respect.', color: 'Charcoal Grey' },
    aquarius: { tip: 'Avant-garde designs and electric blues showcase your originality.', color: 'Cosmic Blue' },
    pisces: { tip: 'Ethereal fabrics and dreamy hues channel your artistic spirit.', color: 'Seafoam' },
};

export default function DailyHoroscope() {
    const { t, language } = useTranslation();
    const { profile, hasProfile } = useVenusProfile();
    const [selectedSign, setSelectedSign] = useState<string>(
        hasProfile && profile.venusSign ? profile.venusSign : 'libra'
    );

    // Get array of signs for rendering
    const signsArray = ZODIAC_SIGNS_ORDER.map(signId => ZODIAC_SIGNS[signId]);

    // Update selected sign when profile changes
    useEffect(() => {
        if (hasProfile && profile.venusSign) {
            setSelectedSign(profile.venusSign);
        }
    }, [hasProfile, profile.venusSign]);

    const signData = ZODIAC_SIGNS[selectedSign as keyof typeof ZODIAC_SIGNS];
    const horoscope = MOCK_HOROSCOPES[selectedSign as keyof typeof MOCK_HOROSCOPES];

    return (
        <section className={styles.section}>
            <div className="container">
                <div className={styles.card}>
                    {/* Decorative elements */}
                    <div className={styles.decorStar1}><Star size={16} /></div>
                    <div className={styles.decorStar2}><Sparkles size={14} /></div>
                    <div className={styles.decorStar3}><Star size={12} /></div>

                    <div className={styles.content}>
                        {/* Header */}
                        <motion.div
                            className={styles.header}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <Sparkles className={styles.icon} size={24} />
                            <h2 className={styles.title}>{t('dailyHoroscope.title')}</h2>
                        </motion.div>

                        {/* Sign selector */}
                        <div className={styles.signSelector}>
                            <div className={styles.selectedSign}>
                                <span
                                    className={styles.signSymbol}
                                    style={{ background: signData?.color_primary }}
                                >
                                    {signData?.symbol}
                                </span>
                                <span className={styles.signName}>
                                    {language === 'en' ? signData?.name_en : signData?.name_pl}
                                </span>
                            </div>

                            <div className={styles.signPills}>
                                {signsArray.map(sign => (
                                    <button
                                        key={sign.id}
                                        className={`${styles.signPill} ${selectedSign === sign.id ? styles.active : ''}`}
                                        onClick={() => setSelectedSign(sign.id)}
                                        style={{
                                            '--sign-color': sign.color_primary
                                        } as React.CSSProperties}
                                        aria-label={sign.name_en}
                                    >
                                        {sign.symbol}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Horoscope content */}
                        <motion.div
                            key={selectedSign}
                            className={styles.horoscope}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.tipSection}>
                                <h3 className={styles.tipLabel}>{t('dailyHoroscope.styleTip')}</h3>
                                <p className={styles.tipText}>{horoscope.tip}</p>
                            </div>

                            <div className={styles.colorSection}>
                                <h3 className={styles.colorLabel}>{t('dailyHoroscope.luckyColor')}</h3>
                                <div className={styles.colorChip}>
                                    <span
                                        className={styles.colorSwatch}
                                        style={{ background: signData?.color_primary }}
                                    />
                                    <span className={styles.colorName}>{horoscope.color}</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Refresh hint */}
                        <div className={styles.refresh}>
                            <RefreshCw size={14} />
                            <span>Updates daily at midnight</span>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
