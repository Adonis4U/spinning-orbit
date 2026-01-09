/* ===========================================
   HEADER COMPONENT - Choicy Style Redesign
   Modern navigation with animated hamburger,
   dropdown menus, centered logo, and sidebar
   =========================================== */

import { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import logoDark from '../../assets/logo-dark.png';
import logoLight from '../../assets/logo-light.png';
import {
    ShoppingBag,
    User,
    Sun,
    Moon,
    LayoutDashboard,
    Settings,
    Package,
    Store,
    LogOut,
    ChevronRight,
    Heart,
    Sparkles,
    BookOpen,
    Camera,
    Home,
    Search,
} from 'lucide-react';
import { useAuth } from '../../contexts';
import styles from './Header.module.css';

// Navigation configuration with dropdown support
interface NavItem {
    path: string;
    label_en: string;
    label_pl: string;
    icon?: React.ComponentType<{ size?: number }>;
    dropdown?: {
        path: string;
        label_en: string;
        label_pl: string;
        icon?: React.ComponentType<{ size?: number }>;
    }[];
}

const NAV_LINKS: NavItem[] = [
    {
        path: '/',
        label_en: 'Home',
        label_pl: 'Strona główna',
        icon: Home,
    },
    {
        path: '/venus-calculator',
        label_en: 'Find my Venus',
        label_pl: 'Znajdź moją Wenus',
        icon: Sparkles,
    },
    {
        path: '/collections',
        label_en: 'Collections',
        label_pl: 'Kolekcje',
        icon: Heart,
        dropdown: [
            { path: '/collections', label_en: 'All Collections', label_pl: 'Wszystkie Kolekcje' },
            { path: '/shop', label_en: 'Shop All', label_pl: 'Cały Sklep' },
        ]
    },
    {
        path: '/lookbook',
        label_en: 'LookBook',
        label_pl: 'LookBook',
        icon: Camera,
    },
    {
        path: '/blog',
        label_en: 'Journal',
        label_pl: 'Dziennik',
        icon: BookOpen,
    },
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
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
    const location = useLocation();
    const { isAdmin, isAuthenticated, signOut } = useAuth();
    const userMenuRef = useRef<HTMLDivElement>(null);
    const dropdownTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

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

    // Close sidebar and dropdowns on route change
    useEffect(() => {
        setIsSidebarOpen(false);
        setIsUserMenuOpen(false);
        setActiveDropdown(null);
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

    // Prevent body scroll when sidebar is open
    useEffect(() => {
        if (isSidebarOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isSidebarOpen]);

    const getNavLabel = (item: { label_en: string; label_pl: string }) => {
        return language === 'en' ? item.label_en : item.label_pl;
    };

    const handleThemeToggle = () => {
        const newTheme = effectiveTheme === 'dark' ? 'light' : 'dark';
        onThemeChange(newTheme);
    };

    const handleLogout = async () => {
        await signOut();
        setIsUserMenuOpen(false);
        setIsSidebarOpen(false);
    };

    const handleDropdownEnter = (path: string) => {
        if (dropdownTimeoutRef.current) {
            clearTimeout(dropdownTimeoutRef.current);
        }
        setActiveDropdown(path);
    };

    const handleDropdownLeave = () => {
        dropdownTimeoutRef.current = setTimeout(() => {
            setActiveDropdown(null);
        }, 150);
    };

    return (
        <header className={`${styles.header} ${isScrolled ? styles.headerScrolled : ''}`}>
            <div className={styles.headerContainer}>
                {/* LEFT SECTION: Hamburger + Desktop Nav */}
                <div className={styles.headerLeft}>
                    {/* Animated Hamburger Button */}
                    <button
                        className={`${styles.hamburgerButton} ${isSidebarOpen ? styles.hamburgerActive : ''}`}
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}
                        aria-expanded={isSidebarOpen}
                    >
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                        <span className={styles.hamburgerLine}></span>
                    </button>

                    {/* Desktop Navigation with Dropdowns */}
                    <nav className={styles.desktopNav}>
                        {NAV_LINKS.map((link) => (
                            <div
                                key={link.path}
                                className={styles.navItemWrapper}
                                onMouseEnter={() => link.dropdown && handleDropdownEnter(link.path)}
                                onMouseLeave={handleDropdownLeave}
                            >
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `${styles.navLink} ${isActive ? styles.navLinkActive : ''} ${link.dropdown ? styles.navLinkWithDropdown : ''}`
                                    }
                                >
                                    {getNavLabel(link)}
                                    {link.dropdown && (
                                        <span className={`${styles.dropdownIndicator} ${activeDropdown === link.path ? styles.dropdownIndicatorActive : ''}`}>
                                            <ChevronRight size={12} />
                                        </span>
                                    )}
                                </NavLink>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {link.dropdown && activeDropdown === link.path && (
                                        <motion.div
                                            className={styles.dropdownMenu}
                                            initial={{ opacity: 0, y: 8, scale: 0.96 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 8, scale: 0.96 }}
                                            transition={{ duration: 0.15, ease: 'easeOut' }}
                                        >
                                            {link.dropdown.map((item) => (
                                                <Link
                                                    key={item.path}
                                                    to={item.path}
                                                    className={styles.dropdownItem}
                                                >
                                                    {getNavLabel(item)}
                                                </Link>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </nav>
                </div>

                {/* CENTER SECTION: Logo */}
                <Link to="/" className={styles.logoCenter}>
                    <img
                        src={effectiveTheme === 'dark' ? logoDark : logoLight}
                        alt="House of Venus"
                        className={styles.logoImage}
                    />
                </Link>

                {/* RIGHT SECTION: Actions + Search/Cart Combo */}
                <div className={styles.headerRight}>
                    {/* Icon Actions - Left of Search/Cart */}
                    <div className={styles.iconActions}>
                        {/* Theme Toggle */}
                        <button
                            className={styles.iconButton}
                            onClick={handleThemeToggle}
                            aria-label={effectiveTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <motion.div
                                key={effectiveTheme}
                                initial={{ rotate: -30, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {effectiveTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
                            </motion.div>
                        </button>

                        {/* Language Toggle */}
                        <button
                            className={styles.langToggle}
                            onClick={() => onLanguageChange(language === 'en' ? 'pl' : 'en')}
                            aria-label="Switch language"
                        >
                            <span className={styles.langText}>{language === 'en' ? 'PL' : 'EN'}</span>
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
                    </div>

                    {/* Search + Cart Combo Bar (Choicy Style) - Desktop Only */}
                    <div className={styles.searchCartCombo}>
                        <div className={styles.searchInput}>
                            <Search size={18} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder={language === 'en' ? 'Search' : 'Szukaj'}
                                className={styles.searchField}
                            />
                        </div>
                        <div className={styles.comboDivider} />
                        <Link to="/cart" className={styles.comboCartButton} aria-label="Shopping cart">
                            <ShoppingBag size={18} />
                            {cartItemsCount > 0 && (
                                <motion.span
                                    className={styles.comboCartBadge}
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                                >
                                    {cartItemsCount}
                                </motion.span>
                            )}
                        </Link>
                    </div>

                    {/* Mobile Cart Button (shown when search combo is hidden) */}
                    <Link to="/cart" className={styles.mobileCartButton} aria-label="Shopping cart">
                        <ShoppingBag size={20} />
                        {cartItemsCount > 0 && (
                            <motion.span
                                className={styles.cartBadge}
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', stiffness: 500, damping: 25 }}
                            >
                                {cartItemsCount}
                            </motion.span>
                        )}
                    </Link>
                </div>
            </div>

            {/* SIDEBAR PANEL - Desktop & Mobile */}
            <AnimatePresence>
                {isSidebarOpen && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            className={styles.sidebarOverlay}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsSidebarOpen(false)}
                        />

                        {/* Sidebar Panel */}
                        <motion.nav
                            className={styles.sidebar}
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 280 }}
                        >
                            <div className={styles.sidebarHeader}>
                                <Link to="/" className={styles.sidebarLogo} onClick={() => setIsSidebarOpen(false)}>
                                    <img
                                        src={effectiveTheme === 'dark' ? logoDark : logoLight}
                                        alt="House of Venus"
                                        className={styles.sidebarLogoImage}
                                    />
                                </Link>
                                <button
                                    className={styles.sidebarClose}
                                    onClick={() => setIsSidebarOpen(false)}
                                    aria-label="Close menu"
                                >
                                    <span className={styles.closeIcon}></span>
                                </button>
                            </div>

                            <div className={styles.sidebarContent}>
                                {/* Navigation Links */}
                                <div className={styles.sidebarNav}>
                                    {NAV_LINKS.map((link, index) => (
                                        <motion.div
                                            key={link.path}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05 + 0.1 }}
                                        >
                                            <NavLink
                                                to={link.path}
                                                className={({ isActive }) =>
                                                    `${styles.sidebarLink} ${isActive ? styles.sidebarLinkActive : ''}`
                                                }
                                                onClick={() => setIsSidebarOpen(false)}
                                            >
                                                {link.icon && <link.icon size={20} />}
                                                <span>{getNavLabel(link)}</span>
                                            </NavLink>

                                            {/* Dropdown items in sidebar */}
                                            {link.dropdown && (
                                                <div className={styles.sidebarSubNav}>
                                                    {link.dropdown.map((subItem) => (
                                                        <NavLink
                                                            key={subItem.path}
                                                            to={subItem.path}
                                                            className={styles.sidebarSubLink}
                                                            onClick={() => setIsSidebarOpen(false)}
                                                        >
                                                            {getNavLabel(subItem)}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            )}
                                        </motion.div>
                                    ))}
                                </div>

                                <div className={styles.sidebarDivider} />

                                {/* User Links */}
                                <div className={styles.sidebarUserSection}>
                                    {isAuthenticated ? (
                                        <>
                                            {USER_MENU_ITEMS.map((item) => (
                                                <NavLink
                                                    key={item.path}
                                                    to={item.path}
                                                    className={styles.sidebarLink}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                >
                                                    <item.icon size={20} />
                                                    <span>{language === 'en' ? item.label_en : item.label_pl}</span>
                                                </NavLink>
                                            ))}
                                            {isAdmin && (
                                                <NavLink
                                                    to="/admin"
                                                    className={`${styles.sidebarLink} ${styles.sidebarLinkAdmin}`}
                                                    onClick={() => setIsSidebarOpen(false)}
                                                >
                                                    <LayoutDashboard size={20} />
                                                    <span>Admin Dashboard</span>
                                                </NavLink>
                                            )}
                                            <button
                                                className={styles.sidebarLogout}
                                                onClick={handleLogout}
                                            >
                                                <LogOut size={20} />
                                                <span>{language === 'en' ? 'Logout' : 'Wyloguj'}</span>
                                            </button>
                                        </>
                                    ) : (
                                        <NavLink
                                            to="/account/login"
                                            className={styles.sidebarLink}
                                            onClick={() => setIsSidebarOpen(false)}
                                        >
                                            <User size={20} />
                                            <span>{language === 'en' ? 'Login' : 'Zaloguj się'}</span>
                                        </NavLink>
                                    )}
                                </div>
                            </div>

                            {/* Sidebar Footer */}
                            <div className={styles.sidebarFooter}>
                                <button
                                    className={styles.sidebarActionBtn}
                                    onClick={handleThemeToggle}
                                    aria-label="Toggle theme"
                                >
                                    {effectiveTheme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
                                    <span>{effectiveTheme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
                                </button>

                                <button
                                    className={styles.sidebarActionBtn}
                                    onClick={() => onLanguageChange(language === 'en' ? 'pl' : 'en')}
                                >
                                    <span className={styles.langFlag}>{language === 'en' ? '🇵🇱' : '🇬🇧'}</span>
                                    <span>{language === 'en' ? 'Polski' : 'English'}</span>
                                </button>
                            </div>
                        </motion.nav>
                    </>
                )}
            </AnimatePresence>
        </header>
    );
}
