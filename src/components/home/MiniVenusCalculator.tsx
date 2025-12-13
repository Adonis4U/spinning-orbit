/* ===========================================
   MINI VENUS CALCULATOR COMPONENT
   White card design matching reference project
   =========================================== */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Calendar, Clock, RotateCcw, Sunrise, AlertCircle } from 'lucide-react';
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
        <motion.div
            className={styles.calculator}
            whileHover={{ y: -4 }}
            transition={{ duration: 0.3 }}
        >
            <AnimatePresence mode="wait">
                {!result ? (
                    // Input form
                    <motion.form
                        key="form"
                        className={styles.form}
                        onSubmit={handleCalculate}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        {/* Header */}
                        <div className={styles.formHeader}>
                            <Sparkles size={20} className={styles.formIcon} />
                            <h3 className={styles.formTitle}>
                                {language === 'en' ? 'Find Your Venus Sign' : 'Znajdź Swój Znak Wenus'}
                            </h3>
                        </div>
                        <p className={styles.formSubtitle}>
                            {language === 'en'
                                ? 'Your Venus sign reveals the unique energy of your style'
                                : 'Twój znak Wenus ujawnia unikalną energię Twojego stylu'
                            }
                        </p>

                        {/* Date of Birth */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                <Calendar size={14} />
                                {language === 'en' ? 'Date of Birth' : 'Data Urodzenia'}
                            </label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="date"
                                    value={birthDate}
                                    onChange={(e) => setBirthDate(e.target.value)}
                                    className={styles.input}
                                    required
                                />
                            </div>
                        </div>

                        {/* Time of Birth */}
                        <div className={styles.inputGroup}>
                            <label className={styles.label}>
                                <Clock size={14} />
                                {language === 'en' ? 'Time of Birth' : 'Godzina Urodzenia'}
                                <span className={styles.required}>*</span>
                            </label>
                            <div className={styles.inputWrapper}>
                                <input
                                    type="time"
                                    value={birthTime}
                                    onChange={(e) => setBirthTime(e.target.value)}
                                    className={styles.input}
                                    placeholder="--:--"
                                    required
                                />
                            </div>
                            <span className={styles.inputHint}>
                                {language === 'en'
                                    ? 'Required for accurate Venus sign'
                                    : 'Wymagane do dokładnego znaku Wenus'
                                }
                            </span>
                        </div>

                        {/* Location Picker */}
                        <LocationPicker
                            value={location}
                            onChange={setLocation}
                            language={language as 'en' | 'pl'}
                            compact
                        />

                        {/* Form Error */}
                        {formError && (
                            <div className={styles.formError}>
                                <AlertCircle size={14} />
                                {formError}
                            </div>
                        )}

                        {/* Submit */}
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
                                    {language === 'en' ? 'Discover My Venus Style' : 'Odkryj Mój Styl Wenus'}
                                    <Sparkles size={16} />
                                </>
                            )}
                        </motion.button>
                    </motion.form>
                ) : (
                    // Result display
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
                            <RotateCcw size={16} />
                        </button>

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
                                : `Wenus w znaku ${signData?.name_pl}`
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
                                    {language === 'en' ? 'Rising:' : 'Ascendent:'} {ascendantZodiacData.symbol} {language === 'en' ? ascendantZodiacData.name_en : ascendantZodiacData.name_pl}
                                </span>
                            </motion.div>
                        )}

                        {/* Style Keywords */}
                        <motion.div
                            className={styles.keywords}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            {result.keywords.map((keyword, i) => (
                                <span key={i} className={styles.keywordTag}>
                                    {keyword}
                                </span>
                            ))}
                        </motion.div>

                        {/* Color Palette */}
                        <motion.div
                            className={styles.colorPalette}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.4 }}
                        >
                            {result.colors.map((color, i) => (
                                <motion.span
                                    key={i}
                                    className={styles.colorDot}
                                    style={{ backgroundColor: color }}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.4 + i * 0.1, type: 'spring' }}
                                />
                            ))}
                        </motion.div>

                        {/* Action buttons */}
                        <motion.div
                            className={styles.actions}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/venus-calculator" className={styles.actionPrimary}>
                                {language === 'en' ? 'Full Style Guide' : 'Zobacz pełny przewodnik stylu'}
                            </Link>
                            <Link to={`/collections/${result.sign}`} className={styles.actionSecondary}>
                                {language === 'en' ? 'Shop My Collection' : 'Kup moją kolekcję'}
                            </Link>
                        </motion.div>

                        <Link to={`/lookbook/${result.sign}`} className={styles.lookbookLink}>
                            {language === 'en' ? 'View My Lookbook' : 'Zobacz mój lookbook'}
                        </Link>

                        {/* Best Matches */}
                        <motion.div
                            className={styles.matches}
                            initial={{ y: 10, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.6 }}
                        >
                            <span className={styles.matchesLabel}>
                                {language === 'en' ? 'Best matches:' : 'Najlepsze dopasowania:'}
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
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}
