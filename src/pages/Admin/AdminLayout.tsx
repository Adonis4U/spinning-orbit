/* ===========================================
   ADMIN LAYOUT COMPONENT
   Layout shell with sidebar, topbar, and outlet
   =========================================== */

import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    Settings, FileText, Image, Bell, Search,
    Menu, ChevronRight, ExternalLink,
    Sparkles
} from 'lucide-react';
import { useTranslation } from '../../contexts';
import styles from './AdminLayout.module.css';

// Navigation configuration
const getNavSections = (language: string) => [
    {
        label: language === 'en' ? 'Main' : 'Główne',
        items: [
            { icon: LayoutDashboard, label: language === 'en' ? 'Dashboard' : 'Panel', path: '/admin' },
            { icon: Package, label: language === 'en' ? 'Products' : 'Produkty', path: '/admin/products', badge: '12' },
            { icon: ShoppingCart, label: language === 'en' ? 'Orders' : 'Zamówienia', path: '/admin/orders' },
            { icon: Users, label: language === 'en' ? 'Customers' : 'Klienci', path: '/admin/customers' },
        ]
    },
    {
        label: language === 'en' ? 'Content' : 'Treści',
        items: [
            { icon: Image, label: language === 'en' ? 'Collections' : 'Kolekcje', path: '/admin/collections' },
            { icon: FileText, label: language === 'en' ? 'Blog Posts' : 'Artykuły', path: '/admin/blog' },
        ]
    },
    {
        label: language === 'en' ? 'System' : 'System',
        items: [
            { icon: Settings, label: language === 'en' ? 'Settings' : 'Ustawienia', path: '/admin/settings' },
        ]
    },
];

// Get breadcrumb from path
function getBreadcrumb(pathname: string, language: string): { label: string; path?: string }[] {
    const crumbs: { label: string; path?: string }[] = [
        { label: language === 'en' ? 'Admin' : 'Admin', path: '/admin' }
    ];

    const segments = pathname.replace('/admin', '').split('/').filter(Boolean);
    const labelMap: Record<string, { en: string; pl: string }> = {
        products: { en: 'Products', pl: 'Produkty' },
        orders: { en: 'Orders', pl: 'Zamówienia' },
        customers: { en: 'Customers', pl: 'Klienci' },
        collections: { en: 'Collections', pl: 'Kolekcje' },
        blog: { en: 'Blog Posts', pl: 'Artykuły' },
        settings: { en: 'Settings', pl: 'Ustawienia' },
    };

    segments.forEach(seg => {
        const mapped = labelMap[seg];
        if (mapped) {
            crumbs.push({ label: language === 'en' ? mapped.en : mapped.pl });
        }
    });

    return crumbs;
}

export default function AdminLayout() {
    const { language } = useTranslation();
    const location = useLocation();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const navSections = getNavSections(language);
    const breadcrumbs = getBreadcrumb(location.pathname, language);

    // Close sidebar on route change (mobile)
    useEffect(() => {
        setSidebarOpen(false);
    }, [location.pathname]);

    // Check if nav item is active
    const isActive = (path: string) => {
        if (path === '/admin') return location.pathname === '/admin';
        return location.pathname.startsWith(path);
    };

    return (
        <div className={styles.adminRoot}>
            {/* Mobile overlay */}
            <div
                className={`${styles.sidebarOverlay} ${sidebarOpen ? styles.visible : ''}`}
                onClick={() => setSidebarOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside className={`${styles.sidebar} ${sidebarOpen ? styles.open : ''}`}>
                {/* Brand */}
                <div className={styles.sidebarBrand}>
                    <div className={styles.brandIcon}>
                        <Sparkles size={18} />
                    </div>
                    <div className={styles.brandText}>
                        <h2>House of Venus</h2>
                        <span>Admin Panel</span>
                    </div>
                </div>

                {/* Navigation */}
                <nav className={styles.nav} aria-label="Admin navigation">
                    {navSections.map((section, sIdx) => (
                        <div key={sIdx}>
                            <div className={styles.navSection}>
                                <span className={styles.navSectionLabel}>{section.label}</span>
                            </div>
                            {section.items.map((item) => (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
                                    aria-current={isActive(item.path) ? 'page' : undefined}
                                >
                                    <item.icon size={18} />
                                    {item.label}
                                    {item.badge && (
                                        <span className={styles.navBadge}>{item.badge}</span>
                                    )}
                                </Link>
                            ))}
                            {sIdx < navSections.length - 1 && (
                                <div className={styles.navDivider} />
                            )}
                        </div>
                    ))}
                </nav>

                {/* Footer */}
                <div className={styles.sidebarFooter}>
                    <Link to="/" className={styles.backToSite}>
                        <ExternalLink size={14} />
                        {language === 'en' ? 'Back to Site' : 'Wróć do Strony'}
                    </Link>
                </div>
            </aside>

            {/* Main Content */}
            <div className={styles.mainContent}>
                {/* Top Bar */}
                <header className={styles.topBar}>
                    <div className={styles.topBarLeft}>
                        <button
                            className={styles.mobileMenuBtn}
                            onClick={() => setSidebarOpen(!sidebarOpen)}
                            aria-label={language === 'en' ? 'Toggle menu' : 'Przełącz menu'}
                        >
                            <Menu size={18} />
                        </button>
                        <div className={styles.breadcrumb}>
                            {breadcrumbs.map((crumb, idx) => (
                                <span key={idx}>
                                    {idx > 0 && <ChevronRight size={12} className={styles.breadcrumbSep} />}
                                    {crumb.path && idx < breadcrumbs.length - 1 ? (
                                        <Link to={crumb.path}>{crumb.label}</Link>
                                    ) : (
                                        <span className={styles.breadcrumbCurrent}>{crumb.label}</span>
                                    )}
                                </span>
                            ))}
                        </div>
                    </div>
                    <div className={styles.topBarRight}>
                        <button className={styles.topBarAction} aria-label="Search">
                            <Search size={16} />
                        </button>
                        <button className={styles.topBarAction} aria-label="Notifications">
                            <Bell size={16} />
                            <span className={styles.notificationDot} />
                        </button>
                    </div>
                </header>

                {/* Content Area - renders child routes */}
                <div className={styles.contentArea}>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}
