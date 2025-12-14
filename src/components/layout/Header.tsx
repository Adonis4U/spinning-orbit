/* ===========================================
   HEADER COMPONENT
   Main navigation with theme/language switches
   and user dropdown menu
   =========================================== */

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoDark from '../../assets/logo-dark.png';
import logoLight from '../../assets/logo-light.png';
import {
    Menu,
    X,
    ShoppingBag,
    User,
    Search,
    Sun,
    Moon,
    LayoutDashboard,
    Settings,
    Package,
    Store,
    LogOut,
    ChevronDown,
} from 'lucide-react';
import { useAuth } from '../../contexts';
import styles from './Header.module.css';

// Navigation links configuration
const NAV_LINKS = [
    { path: '/venus-calculator', label_en: 'Find my Venus', label_pl: 'Znajdź moją Wenus' },
    { path: '/collections', label_en: 'HOV Collections', label_pl: 'Kolekcje HOV' },
    { path: '/shop', label_en: 'HOV Shop', label_pl: 'Sklep HOV' },
    { path: '/lookbook', label_en: 'LookBook', label_pl: 'LookBook' },
    { path: '/blog', label_en: 'Journal', label_pl: 'Dziennik' },
];

// User dropdown menu items
const USER_MENU_ITEMS = [
    { path: '/account', label_en: 'Dashboard', label_pl: 'Panel', icon: LayoutDashboard },
    { path: '/account/settings', label_en: 'Settings', label_pl: 'Ustawienia', icon: Settings },
    { path: '/account/orders', label_en: 'My Orders', label_pl: 'Moje zamówienia', icon: Package },
    { path: '/shop', label_en: 'Shop', label_pl: 'Sklep', icon: Store },
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
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const location = useLocation();
    const { isAdmin, isAuthenticated, signOut } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);

    // Get current effective theme
    const effectiveTheme = theme === 'system'
        ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
        : theme;

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
        setIsUserMenuOpen(false);
    }, [location.pathname]);

    // Close user menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
                setIsUserMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

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

    const handleThemeToggle = () => {
        const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
        onThemeChange(newTheme);
    };

    const handleLogout = async () => {
        await signOut();
        setIsUserMenuOpen(false);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={styles.headerContainer}>
                {/* Logo */}
                <Link to="/" className={styles.logo}>
                    <img
                        src={effectiveTheme === 'dark' ? logoDark : logoLight}
                        alt="House of Venus"
                        className={styles.logoImage}
                    />
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
                        <Search size={16} className={styles.searchIcon} />
                        <input
                            type="text"
                            placeholder={language === 'en' ? 'Search' : 'Szukaj'}
                            className={styles.searchInput}
                        />
                    </div>

                    {/* Mobile Search Button */}
                    <button className={styles.mobileSearchButton} aria-label="Search">
                        <Search size={18} />
                    </button>

                    {/* Theme Toggle */}
                    <button
                        className={styles.iconButton}
                        onClick={handleThemeToggle}
                        aria-label={effectiveTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        {effectiveTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                    </button>

                    {/* Language Toggle */}
                    <button
                        className={styles.langToggle}
                        onClick={() => onLanguageChange(language === 'en' ? 'pl' : 'en')}
                        aria-label="Switch language"
                    >
                        {language === 'en' ? 'PL' : 'EN'}
                    </button>

                    {/* User Account / Dropdown */}
                    {isAuthenticated ? (
                        <div className={styles.userMenuWrapper} ref={userMenuRef}>
                            <button
                                className={`${styles.iconButton} ${isUserMenuOpen ? styles.iconButtonActive : ''}`}
                                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                                aria-label="User menu"
                                aria-expanded={isUserMenuOpen}
                            >
                                <User size={20} />
                                <ChevronDown size={14} className={styles.userMenuChevron} />
                            </button>

                            <AnimatePresence>
                                {isUserMenuOpen && (
                                    <motion.div
                                        className={styles.userDropdown}
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                                        transition={{ duration: 0.15 }}
                                    >
                                        {USER_MENU_ITEMS.map((item) => (
                                            <Link
                                                key={item.path}
                                                to={item.path}
                                                className={styles.userDropdownItem}
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <item.icon size={16} />
                                                {language === 'en' ? item.label_en : item.label_pl}
                                            </Link>
                                        ))}

                                        {/* Admin Dashboard - only for admins */}
                                        {isAdmin && (
                                            <Link
                                                to="/admin"
                                                className={`${styles.userDropdownItem} ${styles.userDropdownItemAdmin}`}
                                                onClick={() => setIsUserMenuOpen(false)}
                                            >
                                                <LayoutDashboard size={16} />
                                                Admin
                                            </Link>
                                        )}

                                        <div className={styles.userDropdownDivider} />

                                        <button
                                            className={styles.userDropdownLogout}
                                            onClick={handleLogout}
                                        >
                                            <LogOut size={16} />
                                            {language === 'en' ? 'Logout' : 'Wyloguj'}
                                        </button>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <Link
                            to="/account/login"
                            className={styles.iconButton}
                            aria-label="Login"
                        >
                            <User size={20} />
                        </Link>
                    )}

                    {/* Cart */}
                    <Link to="/cart" className={styles.iconButton} aria-label="Shopping cart">
                        <ShoppingBag size={20} />
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
                            className={styles.mobileNavOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.nav
                            className={styles.mobileNav}
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        >
                            <div className={styles.mobileNavHeader}>
                                <Link to="/" className={styles.logo} onClick={() => setIsMobileMenuOpen(false)}>
                                    <img
                                        src={effectiveTheme === 'dark' ? logoDark : logoLight}
                                        alt="House of Venus"
                                        className={styles.logoImageMobile}
                                    />
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

                                {/* User links for mobile */}
                                {isAuthenticated ? (
                                    <>
                                        {USER_MENU_ITEMS.map((item) => (
                                            <NavLink
                                                key={item.path}
                                                to={item.path}
                                                className={({ isActive }) =>
                                                    `${styles.mobileNavLink} ${isActive ? styles.mobileNavLinkActive : ''}`
                                                }
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <item.icon size={18} className={styles.mobileNavLinkIcon} />
                                                {language === 'en' ? item.label_en : item.label_pl}
                                            </NavLink>
                                        ))}
                                        {isAdmin && (
                                            <NavLink
                                                to="/admin"
                                                className={`${styles.mobileNavLink} ${styles.mobileNavLinkAdmin}`}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                <LayoutDashboard size={18} className={styles.mobileNavLinkIcon} />
                                                Admin Dashboard
                                            </NavLink>
                                        )}
                                        <button
                                            className={styles.mobileNavLogout}
                                            onClick={() => {
                                                handleLogout();
                                                setIsMobileMenuOpen(false);
                                            }}
                                        >
                                            <LogOut size={18} className={styles.mobileNavLinkIcon} />
                                            {language === 'en' ? 'Logout' : 'Wyloguj'}
                                        </button>
                                    </>
                                ) : (
                                    <NavLink
                                        to="/account/login"
                                        className={styles.mobileNavLink}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                    >
                                        <User size={18} className={styles.mobileNavLinkIcon} />
                                        {language === 'en' ? 'Login' : 'Zaloguj się'}
                                    </NavLink>
                                )}
                            </div>

                            <div className={styles.mobileNavActions}>
                                {/* Theme Toggle */}
                                <button
                                    className={styles.toggleButton}
                                    onClick={handleThemeToggle}
                                    aria-label="Toggle theme"
                                >
                                    {effectiveTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                </button>

                                {/* Language Toggle */}
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
