import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    ShoppingBag,
    Heart,
    User,
    Search,
    Sun,
    Moon,
    Sparkles,
} from 'lucide-react';
import styles from './Header.module.css';

// Navigation links configuration
const NAV_LINKS = [
    { path: '/shop', label_en: 'Shop', label_pl: 'Sklep' },
    { path: '/collections', label_en: 'Collections', label_pl: 'Kolekcje' },
    { path: '/venus-calculator', label_en: 'Venus Calculator', label_pl: 'Kalkulator Venus' },
    { path: '/lookbook', label_en: 'Lookbook', label_pl: 'Lookbook' },
    { path: '/blog', label_en: 'Blog', label_pl: 'Blog' },
    { path: '/about', label_en: 'About', label_pl: 'O nas' },
];

interface HeaderProps {
    language: 'en' | 'pl';
    onLanguageChange: (lang: 'en' | 'pl') => void;
    theme: 'light' | 'dark' | 'system';
    onThemeChange: (theme: 'light' | 'dark' | 'system') => void;
    cartItemsCount?: number;
}

export default function Header({
    language,
    onLanguageChange,
    theme,
    onThemeChange,
    cartItemsCount = 0,
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    // Handle scroll effect
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [location.pathname]);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMobileMenuOpen]);

    const handleThemeToggle = () => {
        const themes: ('light' | 'dark' | 'system')[] = ['light', 'dark', 'system'];
        const currentIndex = themes.indexOf(theme);
        const nextTheme = themes[(currentIndex + 1) % themes.length];
        onThemeChange(nextTheme);
    };

    const getThemeIcon = () => {
        switch (theme) {
            case 'dark':
                return <Moon size={20} />;
            case 'system':
                return <Sparkles size={20} />;
            default:
                return <Sun size={20} />;
        }
    };

    const getNavLabel = (link: typeof NAV_LINKS[0]) => {
        return language === 'en' ? link.label_en : link.label_pl;
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={styles.headerContainer}>
                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    <Sparkles className={styles.logoIcon} />
                    <span>
                        House of <span className={styles.logoTextVenus}>Venus</span>
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className={styles.desktopNav}>
                    {NAV_LINKS.map((link) => (
                        <NavLink
                            key={link.path}
                            to={link.path}
                            className={({ isActive }) =>
                                `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
                            }
                        >
                            {getNavLabel(link)}
                        </NavLink>
                    ))}
                </nav>

                {/* Header Actions */}
                <div className={styles.headerActions}>
                    {/* Search */}
                    <button className={styles.iconButton} aria-label="Search">
                        <Search />
                    </button>

                    {/* Language Toggle */}
                    <button
                        className={`${styles.toggleButton} ${language === 'pl' ? styles.toggleButtonActive : ''}`}
                        onClick={() => onLanguageChange(language === 'en' ? 'pl' : 'en')}
                        aria-label={`Switch to ${language === 'en' ? 'Polish' : 'English'}`}
                    >
                        {language.toUpperCase()}
                    </button>

                    {/* Theme Toggle */}
                    <button
                        className={styles.iconButton}
                        onClick={handleThemeToggle}
                        aria-label={`Current theme: ${theme}. Click to change.`}
                    >
                        {getThemeIcon()}
                    </button>

                    {/* Wishlist */}
                    <Link to="/wishlist" className={styles.iconButton} aria-label="Wishlist">
                        <Heart />
                    </Link>

                    {/* Account */}
                    <Link to="/account" className={styles.iconButton} aria-label="Account">
                        <User />
                    </Link>

                    {/* Cart */}
                    <Link to="/cart" className={styles.iconButton} aria-label="Shopping cart">
                        <ShoppingBag />
                        {cartItemsCount > 0 && (
                            <span className={styles.cartBadge}>{cartItemsCount}</span>
                        )}
                    </Link>

                    {/* Mobile Menu Button */}
                    <button
                        className={styles.mobileMenuButton}
                        onClick={() => setIsMobileMenuOpen(true)}
                        aria-label="Open menu"
                    >
                        <Menu size={24} />
                    </button>
                </div>
            </div>

            {/* Mobile Navigation */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className={`${styles.mobileNavOverlay} ${styles.mobileNavOverlayOpen}`}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.nav
                            className={`${styles.mobileNav} ${styles.mobileNavOpen}`}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className={styles.mobileNavHeader}>
                                <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                                    <Sparkles className={styles.logoIcon} />
                                    <span>House of <span className={styles.logoTextVenus}>Venus</span></span>
                                </Link>
                                <button
                                    className={styles.mobileNavClose}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <X size={24} />
                                </button>
                            </div>

                            <div className={styles.mobileNavLinks}>
                                {NAV_LINKS.map((link) => (
                                    <NavLink
                                        key={link.path}
                                        to={link.path}
                                        className={({ isActive }) =>
                                            `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                                        }
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        {getNavLabel(link)}
                                    </NavLink>
                                ))}

                                <div className={styles.mobileNavDivider} />

                                <NavLink
                                    to="/contact"
                                    className={({ isActive }) =>
                                        `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                                    }
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {language === 'en' ? 'Contact' : 'Kontakt'}
                                </NavLink>
                            </div>

                            <div className={styles.mobileNavActions}>
                                <button
                                    className={styles.toggleButton}
                                    onClick={() => onLanguageChange(language === 'en' ? 'pl' : 'en')}
                                >
                                    {language === 'en' ? 'PL' : 'EN'}
                                </button>
                                <button className={styles.toggleButton} onClick={handleThemeToggle}>
                                    {getThemeIcon()}
                                </button>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
