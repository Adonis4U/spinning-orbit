import { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Menu,
    X,
    ShoppingBag,
    User,
    Search,
    Sparkles,
    LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../../contexts';
import styles from './Header.module.css';

// Navigation links configuration - simplified to match reference
const NAV_LINKS = [
    { path: '/shop', label_en: 'Shop', label_pl: 'Sklep' },
    { path: '/venus-calculator', label_en: 'Horoscope', label_pl: 'Horoskop' },
    { path: '/about', label_en: 'About', label_pl: 'O nas' },
    { path: '/blog', label_en: 'Journal', label_pl: 'Dziennik' },
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
    theme: _theme,
    onThemeChange: _onThemeChange,
    cartItemsCount = 0,
}: HeaderProps) {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const { isAdmin, isAuthenticated } = useAuth();

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

                {/* Header Actions - Right side */}
                <div className={styles.headerActions}>
                    {/* Desktop Search Bar */}
                    <div className={styles.searchBar}>
                        <Search size={18} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder="Search"
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Mobile Search Button */}
                    <button className={styles.mobileSearchButton} aria-label="Search">
                        <Search size={20} />
                    </button>


                    {/* Account - redirects to login if not authenticated */}
                    <Link
                        to={isAuthenticated ? "/account" : "/account/login"}
                        className={styles.iconButton}
                        aria-label="Account"
                    >
                        <User />
                    </Link>

                    {/* Admin Dashboard - only for authenticated admins */}
                    {isAuthenticated && isAdmin && (
                        <Link
                            to="/admin"
                            className={styles.iconButton}
                            aria-label="Admin Dashboard"
                            style={{ color: 'var(--color-gold)' }}
                        >
                            <LayoutDashboard />
                        </Link>
                    )}

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
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
