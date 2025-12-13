/* ===========================================
   LOGIN PAGE
   User authentication with Supabase
   =========================================== */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Sparkles, LogIn, AlertCircle } from 'lucide-react';
import { useTranslation, useAuth } from '../../contexts';
import Starfield from '../../components/common/Starfield';
import styles from './Account.module.css';

export default function Login() {
    const { language } = useTranslation();
    const navigate = useNavigate();
    const { signInWithEmail } = useAuth();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setIsLoading(true);

        try {
            const { error } = await signInWithEmail(email, password);
            if (error) throw error;
            navigate('/account');
        } catch (err: unknown) {
            const errorMessage = err instanceof Error ? err.message : 'An error occurred';
            setError(language === 'en'
                ? errorMessage
                : 'Nieprawidłowy email lub hasło'
            );
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Login' : 'Logowanie'} | House of Venus</title>
                <meta name="description" content={language === 'en'
                    ? 'Sign in to your House of Venus account'
                    : 'Zaloguj się do swojego konta House of Venus'
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
                                {language === 'en' ? 'Welcome Back' : 'Witaj Ponownie'}
                            </h1>
                            <p className={styles.authSubtitle}>
                                {language === 'en'
                                    ? 'Sign in to access your cosmic style profile'
                                    : 'Zaloguj się, aby uzyskać dostęp do swojego kosmicznego profilu stylu'
                                }
                            </p>
                        </div>

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

                        {/* Login Form */}
                        <form onSubmit={handleSubmit} className={styles.form}>
                            <div className={styles.inputGroup}>
                                <label className={styles.label}>
                                    <Mail size={16} />
                                    {language === 'en' ? 'Email Address' : 'Adres Email'}
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
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
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="••••••••"
                                    className={styles.input}
                                    required
                                />
                            </div>

                            <div className={styles.checkboxGroup}>
                                <input
                                    type="checkbox"
                                    id="rememberMe"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className={styles.checkbox}
                                />
                                <label htmlFor="rememberMe" className={styles.checkboxLabel}>
                                    {language === 'en' ? 'Remember me' : 'Zapamiętaj mnie'}
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
                                        <LogIn size={18} />
                                        {language === 'en' ? 'Sign In' : 'Zaloguj się'}
                                    </>
                                )}
                            </motion.button>
                        </form>

                        {/* Divider */}
                        <div className={styles.divider}>
                            <span>{language === 'en' ? 'or continue with' : 'lub kontynuuj przez'}</span>
                        </div>

                        {/* Social Login */}
                        <div className={styles.socialButtons}>
                            <button type="button" className={styles.socialButton}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Google
                            </button>
                            <button type="button" className={styles.socialButton}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.342-3.369-1.342-.454-1.155-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.161 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                                </svg>
                                GitHub
                            </button>
                        </div>

                        {/* Footer */}
                        <div className={styles.authFooter}>
                            <p>
                                {language === 'en' ? "Don't have an account? " : 'Nie masz konta? '}
                                <Link to="/account/register">
                                    {language === 'en' ? 'Create one' : 'Utwórz je'}
                                </Link>
                            </p>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
