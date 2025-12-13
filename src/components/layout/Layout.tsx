import { Outlet } from 'react-router-dom';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import styles from './Layout.module.css';

interface LayoutProps {
    language: 'en' | 'pl';
    onLanguageChange: (lang: 'en' | 'pl') => void;
    theme: 'light' | 'dark' | 'system';
    onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
    cartItemsCount?: number;
}

// Page transition variants
const pageTransitionVariants: Variants = {
    initial: {
        opacity: 0,
        y: 10,
    },
    animate: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: [0.25, 0.1, 0.25, 1] as any,
        },
    },
    exit: {
        opacity: 0,
        y: -10,
        transition: {
            duration: 0.3,
            ease: [0.25, 0.1, 0.25, 1] as any,
        },
    },
};

export default function Layout({
    language,
    onLanguageChange,
    theme,
    onThemeChange,
    cartItemsCount = 0,
}: LayoutProps) {
    const location = useLocation();

    return (
        <div className={styles.layout}>
            {/* Skip to content link for accessibility */}
            <a href="#main-content" className={styles.skipLink}>
                {language === 'en' ? 'Skip to main content' : 'Przejdź do treści głównej'}
            </a>

            {/* Header */}
            <Header
                language={language}
                onLanguageChange={onLanguageChange}
                theme={theme}
                onThemeChange={onThemeChange}
                cartItemsCount={cartItemsCount}
            />

            {/* Main Content with Page Transitions */}
            <main id="main-content" className={styles.main}>
                <AnimatePresence mode="wait">
                    <motion.div
                        key={location.pathname}
                        className={styles.pageTransition}
                        variants={pageTransitionVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <Outlet />
                    </motion.div>
                </AnimatePresence>
            </main>

            {/* Footer */}
            <Footer language={language} />
        </div>
    );
}
