/* ===========================================
   ZODIAC SLIDER COMPONENT - REDESIGNED
   Shop by Element: 4 cards for Fire, Earth, Air, Water
   Still shows 12 signs underneath in grid
   =========================================== */

import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS, ZODIAC_SIGNS_ORDER } from '../../constants/zodiac';
import styles from './ZodiacSlider.module.css';

// Element definitions with associated signs
const ELEMENTS = [
    {
        id: 'fire',
        name_en: 'Fire',
        name_pl: 'Ogień',
        signs: ['aries', 'leo', 'sagittarius'],
        signs_en: 'Aries, Leo, Sagittarius',
        signs_pl: 'Baran, Lew, Strzelec',
        gradient: 'linear-gradient(135deg, #ff6b35 0%, #f7931a 50%, #c74a05 100%)',
        color: '#ff6b35',
    },
    {
        id: 'earth',
        name_en: 'Earth',
        name_pl: 'Ziemia',
        signs: ['taurus', 'virgo', 'capricorn'],
        signs_en: 'Taurus, Virgo, Capricorn',
        signs_pl: 'Byk, Panna, Koziorożec',
        gradient: 'linear-gradient(135deg, #4a7c59 0%, #8fbc8f 50%, #3d5a4c 100%)',
        color: '#4a7c59',
    },
    {
        id: 'air',
        name_en: 'Air',
        name_pl: 'Powietrze',
        signs: ['gemini', 'libra', 'aquarius'],
        signs_en: 'Gemini, Libra, Aquarius',
        signs_pl: 'Bliźnięta, Waga, Wodnik',
        gradient: 'linear-gradient(135deg, #87ceeb 0%, #b0c4de 50%, #6495ed 100%)',
        color: '#6495ed',
    },
    {
        id: 'water',
        name_en: 'Water',
        name_pl: 'Woda',
        signs: ['cancer', 'scorpio', 'pisces'],
        signs_en: 'Cancer, Scorpio, Pisces',
        signs_pl: 'Rak, Skorpion, Ryby',
        gradient: 'linear-gradient(135deg, #1e3a5f 0%, #3a6ea5 50%, #004c8c 100%)',
        color: '#1e3a5f',
    },
];

export default function ZodiacSlider() {
    const { language } = useTranslation();

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
                    <h2 className={styles.title}>
                        {language === 'en' ? 'Shop by Element' : 'Zakupy według Żywiołu'}
                    </h2>
                    <Link to="/collections" className={styles.seeAll}>
                        {language === 'en' ? 'See all Collections' : 'Zobacz wszystkie kolekcje'}
                        <ArrowRight size={16} />
                    </Link>
                </motion.div>

                {/* Elements grid - 4 large cards */}
                <div className={styles.elementsGrid}>
                    {ELEMENTS.map((element, index) => (
                        <motion.div
                            key={element.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Link
                                to={`/collections?element=${element.id}`}
                                className={styles.elementCard}
                                style={{
                                    '--element-gradient': element.gradient,
                                    '--element-color': element.color,
                                } as React.CSSProperties}
                            >
                                {/* Background overlay with gradient */}
                                <div className={styles.elementBg} />

                                {/* Content */}
                                <div className={styles.elementContent}>
                                    <span className={styles.elementSigns}>
                                        {language === 'en' ? element.signs_en : element.signs_pl}
                                    </span>
                                    <h3 className={styles.elementName}>
                                        {language === 'en' ? element.name_en : element.name_pl}
                                    </h3>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>

                {/* Hidden zodiac grid for SEO - shows on hover or as secondary */}
                <motion.div
                    className={styles.zodiacGrid}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                >
                    {signsArray.map((sign) => (
                        <Link
                            key={sign.id}
                            to={`/collections/${sign.id}`}
                            className={styles.zodiacChip}
                            style={{
                                '--sign-color': sign.color_primary,
                            } as React.CSSProperties}
                        >
                            <span className={styles.zodiacSymbol}>{sign.symbol}</span>
                            <span className={styles.zodiacName}>
                                {language === 'en' ? sign.name_en : sign.name_pl}
                            </span>
                        </Link>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}
