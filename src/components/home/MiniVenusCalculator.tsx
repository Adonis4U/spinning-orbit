/* ===========================================
   MINI VENUS CALCULATOR COMPONENT - REFERENCE STYLE
   Horizontal form layout matching the design reference
   =========================================== */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, MapPin, RotateCcw, Sunrise, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation, useVenusProfile } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { getVenusStyleKeywords, getVenusMatches, getVenusColors } from '../../utils/venusMath';
import { calculateVenusSign, calculateAscendant } from '../../utils/astroCalc';
import type { VenusSign } from '../../types/domain';
import LocationPicker, { type LocationPickerValue } from '../common/LocationPicker';
import styles from './MiniVenusCalculator.module.css';

export default function MiniVenusCalculator() {
    const { language } = useTranslation();
    const { setVenusSign, setAscendingSign } = useVenusProfile();
    const [birthDate, setBirthDate] = useState('');
    const [birthTime, setBirthTime] = useState('');

    // Location state using LocationPicker
    const [location, setLocation] = useState<LocationPickerValue>({
        country: '',
        countryCode: '',
        city: '',
        lat: null,
        lon: null,
    });

    const [result, setResult] = useState<{
        sign: VenusSign;
        ascendant: VenusSign | null;
        keywords: string[];
        matches: string[];
        colors: string[];
    } | null>(null);
    const [isCalculating, setIsCalculating] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleCalculate = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        if (!birthDate) {
            setFormError(language === 'en' ? 'Please enter birth date' : 'Proszę podać datę urodzenia');
            return;
        }

        if (!birthTime) {
            setFormError(language === 'en' ? 'Birth time is required' : 'Godzina urodzenia jest wymagana');
            return;
        }

        setIsCalculating(true);

        try {
            // Calculate Venus sign using ephemeris
            const venusSign = calculateVenusSign(new Date(birthDate), birthTime);
            const keywords = getVenusStyleKeywords(venusSign, language);
            const matches = getVenusMatches(venusSign);
            const colors = getVenusColors(venusSign);

            // Calculate Ascendant if we have coordinates
            let ascendant: VenusSign | null = null;
            if (location.lat !== null && location.lon !== null) {
                ascendant = calculateAscendant(new Date(birthDate), birthTime, location.lat, location.lon);
                setAscendingSign(ascendant);
            }

            setResult({ sign: venusSign, ascendant, keywords, matches, colors });
            setVenusSign(venusSign);
        } catch (error) {
            console.error('Calculation error:', error);
            setFormError(language === 'en' ? 'Calculation error' : 'Błąd obliczenia');
        } finally {
            setIsCalculating(false);
        }
    };

    const handleReset = () => {
        setResult(null);
        setBirthDate('');
        setBirthTime('');
        setLocation({
            country: '',
            countryCode: '',
            city: '',
            lat: null,
            lon: null,
        });
        setFormError(null);
    };

    const signData = result ? ZODIAC_SIGNS[result.sign as keyof typeof ZODIAC_SIGNS] : null;
    const ascendantZodiacData = result?.ascendant ? ZODIAC_SIGNS[result.ascendant as keyof typeof ZODIAC_SIGNS] : null;

    return (
        <div className={styles.calculator}>
            <AnimatePresence mode="wait">
                {!result ? (
                    // Input form - horizontal layout
                    <motion.form
                        key="form"
                        className={styles.form}
                        onSubmit={handleCalculate}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Form fields grid - 2 rows */}
                        <div className={styles.fieldsGrid}>
                            {/* Row 1: Birth Date and Birth Time */}
                            <div className={styles.fieldRow}>
                                {/* Birth Date */}
                                <div className={styles.field}>
                                    <label className={styles.fieldLabel}>
                                        {language === 'en' ? 'BIRTH DATE' : 'DATA URODZENIA'}
                                    </label>
                                    <div className={styles.fieldInput}>
                                        <Calendar size={16} className={styles.fieldIcon} />
                                        <input
                                            type="date"
                                            value={birthDate}
                                            onChange={(e) => setBirthDate(e.target.value)}
                                            className={styles.input}
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Birth Time */}
                                <div className={styles.field}>
                                    <label className={styles.fieldLabel}>
                                        {language === 'en' ? 'BIRTH TIME' : 'GODZINA URODZENIA'}
                                    </label>
                                    <div className={styles.fieldInput}>
                                        <Clock size={16} className={styles.fieldIcon} />
                                        <input
                                            type="time"
                                            value={birthTime}
                                            onChange={(e) => setBirthTime(e.target.value)}
                                            className={styles.input}
                                            placeholder="--:--"
                                            required
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Row 2: Birth Location (full width) */}
                            <div className={styles.fieldFull}>
                                <label className={styles.fieldLabel}>
                                    <MapPin size={14} className={styles.labelIcon} />
                                    {language === 'en' ? 'BIRTH LOCATION' : 'MIEJSCE URODZENIA'}
                                    <span className={styles.labelHint}>
                                        {language === 'en' ? '(for Ascendant)' : '(dla Ascendentu)'}
                                    </span>
                                </label>
                                <div className={styles.locationWrapper}>
                                    <LocationPicker
                                        value={location}
                                        onChange={setLocation}
                                        language={language as 'en' | 'pl'}
                                        compact
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Form Error */}
                        {formError && (
                            <div className={styles.formError}>
                                <AlertCircle size={14} />
                                {formError}
                            </div>
                        )}

                        {/* Submit Button - Primary color matching reference */}
                        <motion.button
                            type="submit"
                            className={styles.submitButton}
                            disabled={!birthDate || !birthTime || isCalculating}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            {isCalculating ? (
                                <span className={styles.loadingText}>
                                    <span className={styles.spinner} />
                                    {language === 'en' ? 'Reading the stars...' : 'Odczytuję gwiazdy...'}
                                </span>
                            ) : (
                                <>
                                    <Sparkles size={18} />
                                    {language === 'en' ? 'Reveal My Style' : 'Odkryj Mój Styl'}
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                ) : (
                    // Result display - TWO COLUMN LAYOUT
                    <motion.div
                        key="result"
                        className={styles.result}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                    >
                        {/* Reset button */}
                        <button
                            className={styles.resetButton}
                            onClick={handleReset}
                            aria-label="Calculate again"
                        >
                            <RotateCcw size={14} />
                        </button>

                        {/* LEFT COLUMN - Venus sign and ascendant */}
                        <div className={styles.resultLeft}>
                            {/* Sign display */}
                            <motion.div
                                className={styles.signHeader}
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                            >
                                <span className={styles.signSymbol}>
                                    {signData?.symbol}
                                </span>
                            </motion.div>

                            <motion.h3
                                className={styles.signTitle}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {language === 'en'
                                    ? `Venus in ${signData?.name_en}`
                                    : `Wenus w ${signData?.name_pl}`
                                }
                            </motion.h3>

                            {/* Ascendant Display */}
                            {result.ascendant && ascendantZodiacData && (
                                <motion.div
                                    className={styles.ascendantMini}
                                    initial={{ y: 10, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <Sunrise size={14} className={styles.ascendantIcon} />
                                    <span className={styles.ascendantText}>
                                        {language === 'en' ? 'Ascendant:' : 'Ascendent:'} {ascendantZodiacData.symbol} {language === 'en' ? ascendantZodiacData.name_en : ascendantZodiacData.name_pl}
                                    </span>
                                </motion.div>
                            )}
                        </div>

                        {/* RIGHT COLUMN - Keywords, colors, actions */}
                        <div className={styles.resultRight}>
                            {/* Style Keywords */}
                            <motion.div
                                className={styles.keywordsSection}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                <span className={styles.sectionLabel}>
                                    {language === 'en' ? 'Your Style Keywords' : 'Twoje Słowa Kluczowe'}
                                </span>
                                <div className={styles.keywords}>
                                    {result.keywords.map((keyword, i) => (
                                        <span key={i} className={styles.keywordTag}>
                                            {keyword}
                                        </span>
                                    ))}
                                </div>
                            </motion.div>

                            {/* Color Palette */}
                            <motion.div
                                className={styles.colorSection}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.4 }}
                            >
                                <span className={styles.sectionLabel}>
                                    {language === 'en' ? 'Your Color Palette' : 'Twoja Paleta Kolorów'}
                                </span>
                                <div className={styles.colorPalette}>
                                    {result.colors.map((color, i) => (
                                        <motion.span
                                            key={i}
                                            className={styles.colorDot}
                                            style={{ backgroundColor: color }}
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ delay: 0.4 + i * 0.05, type: 'spring' }}
                                        />
                                    ))}
                                </div>
                            </motion.div>

                            {/* Action buttons */}
                            <motion.div
                                className={styles.actions}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.5 }}
                            >
                                <Link to="/venus-calculator" className={styles.actionPrimary}>
                                    {language === 'en' ? 'Full Guide' : 'Pełny przewodnik'}
                                </Link>
                                <Link to={`/collections/${result.sign}`} className={styles.actionSecondary}>
                                    {language === 'en' ? 'Shop' : 'Kolekcja'}
                                </Link>
                            </motion.div>

                            {/* Best Matches */}
                            <motion.div
                                className={styles.matches}
                                initial={{ y: 10, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 0.6 }}
                            >
                                <span className={styles.matchesLabel}>
                                    {language === 'en' ? 'Best matches:' : 'Dopasowania:'}
                                </span>
                                <span className={styles.matchesList}>
                                    {result.matches.map((match, i) => {
                                        const matchSign = ZODIAC_SIGNS[match as keyof typeof ZODIAC_SIGNS];
                                        return (
                                            <span key={i}>
                                                {language === 'en' ? matchSign?.name_en : matchSign?.name_pl}
                                                {i < result.matches.length - 1 && ' ✦ '}
                                            </span>
                                        );
                                    })}
                                </span>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
