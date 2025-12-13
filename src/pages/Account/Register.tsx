/* ===========================================
   REGISTER PAGE
   New user registration with Supabase
   =========================================== */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Sparkles, UserPlus, AlertCircle, Check } from 'lucide-react';
import { useTranslation, useAuth } from '../../contexts';
import Starfield from '../../components/common/Starfield';
import styles from './Account.module.css';

export default function Register() {
    const { language } = useTranslation();
    const navigate = useNavigate();
    const { signUpWithEmail } = useAuth();

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        acceptTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [requiresConfirmation, setRequiresConfirmation] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const validateForm = () => {
        if (formData.password.length < 6) {
            setError(language === 'en'
                ? 'Password must be at least 6 characters'
                : 'Hasło musi mieć co najmniej 6 znaków'
            );
            return false;
        }
        if (formData.password !== formData.confirmPassword) {
            setError(language === 'en'
                ? 'Passwords do not match'
                : 'Hasła nie są zgodne'
            );
            return false;
        }
        if (!formData.acceptTerms) {
            setError(language === 'en'
                ? 'Please accept the terms and conditions'
                : 'Proszę zaakceptować regulamin'
            );
            return false;
        }
        return true;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            // Split name into first_name and last_name
            const nameParts = formData.name.trim().split(' ');
            const first_name = nameParts[0] || '';
            const last_name = nameParts.slice(1).join(' ') || '';

            const { data, error } = await signUpWithEmail(formData.email, formData.password, { first_name, last_name });
            if (error) throw error;

            setSuccess(true);

            // Check if session is established (if not, email confirmation is likely required)
            // @ts-ignore - session exists on data if successful
            const session = data?.session;

            if (session) {
                // Redirect to login after 2 seconds
                setTimeout(() => navigate('/account/login'), 2000);
            } else {
                setRequiresConfirmation(true);
            }
            // If no session, we stay on success screen which should probably be updated to say "Check email"
            // But for now, the existing success message says "Account created! Redirecting..." 
            // We should update the success message state to be more dynamic.
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(language === 'en'
                ? errorMessage
                : 'Nie udało się utworzyć konta'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Create Account' : 'Utwórz Konto'} | House of Venus</title>
                <meta name="description" content={language === 'en'
                    ? 'Join House of Venus and discover your cosmic style'
                    : 'Dołącz do House of Venus i odkryj swój kosmiczny styl'
                } />
            </Helmet>

            <main className={styles.page}>
                <Starfield starCount={50} />

                <div className={styles.authContainer}>
                    <motion.div
                        className={styles.authCard}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        {/* Header */}
                        <div className={styles.authHeader}>
                            <div className={styles.authIcon}>
                                <Sparkles size={28} />
                            </div>
                            <h1 className={styles.authTitle}>
                                {language === 'en' ? 'Join the Stars' : 'Dołącz do Gwiazd'}
                            </h1>
                            <p className={styles.authSubtitle}>
                                {language === 'en'
                                    ? 'Create your account and discover your Venus style'
                                    : 'Utwórz konto i odkryj swój styl Wenus'
                                }
                            </p>
                        </div>

                        {/* Success Message */}
                        {success && (
                            <motion.div
                                className={`${styles.message} ${styles.messageSuccess}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <Check size={16} />
                                {requiresConfirmation ? (
                                    language === 'en'
                                        ? 'Account created! Please check your email to confirm.'
                                        : 'Konto utworzone! Sprawdź email aby potwierdzić.'
                                ) : (
                                    language === 'en'
                                        ? 'Account created! Redirecting to login...'
                                        : 'Konto utworzone! Przekierowywanie do logowania...'
                                )}
                            </motion.div>
                        )}

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                className={`${styles.message} ${styles.messageError}`}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <AlertCircle size={16} />
                                {error}
                            </motion.div>
                        )}

                        {/* Register Form */}
                        {!success && (
                            <form onSubmit={handleSubmit} className={styles.form}>
                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        <User size={16} />
                                        {language === 'en' ? 'Full Name' : 'Imię i Nazwisko'}
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder={language === 'en' ? 'Your name' : 'Twoje imię'}
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        <Mail size={16} />
                                        {language === 'en' ? 'Email Address' : 'Adres Email'}
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder={language === 'en' ? 'venus@example.com' : 'wenus@example.com'}
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        <Lock size={16} />
                                        {language === 'en' ? 'Password' : 'Hasło'}
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={styles.input}
                                        required
                                        minLength={6}
                                    />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label className={styles.label}>
                                        <Lock size={16} />
                                        {language === 'en' ? 'Confirm Password' : 'Potwierdź Hasło'}
                                    </label>
                                    <input
                                        type="password"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        placeholder="••••••••"
                                        className={styles.input}
                                        required
                                    />
                                </div>

                                <div className={styles.checkboxGroup}>
                                    <input
                                        type="checkbox"
                                        id="acceptTerms"
                                        name="acceptTerms"
                                        checked={formData.acceptTerms}
                                        onChange={handleChange}
                                        className={styles.checkbox}
                                    />
                                    <label htmlFor="acceptTerms" className={styles.checkboxLabel}>
                                        {language === 'en'
                                            ? 'I agree to the Terms of Service and Privacy Policy'
                                            : 'Akceptuję Regulamin i Politykę Prywatności'
                                        }
                                    </label>
                                </div>

                                <motion.button
                                    type="submit"
                                    className={styles.submitButton}
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    {isLoading ? (
                                        <span className={styles.spinner} />
                                    ) : (
                                        <>
                                            <UserPlus size={18} />
                                            {language === 'en' ? 'Create Account' : 'Utwórz Konto'}
                                        </>
                                    )}
                                </motion.button>
                            </form>
                        )}

                        {/* Footer */}
                        <div className={styles.authFooter}>
                            <p>
                                {language === 'en' ? 'Already have an account? ' : 'Masz już konto? '}
                                <Link to="/account/login">
                                    {language === 'en' ? 'Sign in' : 'Zaloguj się'}
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
