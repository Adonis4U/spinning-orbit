/* ===========================================
   ACCOUNT DASHBOARD
   User profile and account management
   =========================================== */

import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
    Package, Heart, ShoppingBag, Settings, LogOut,
    ArrowRight, Sparkles, User, CreditCard, LayoutDashboard
} from 'lucide-react';
import { useTranslation, useAuth, useVenusProfile } from '../../contexts';
import { useWishlistStore, useCartStore } from '../../stores';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import styles from './Account.module.css';

export default function AccountDashboard() {
    const { language } = useTranslation();
    const navigate = useNavigate();
    const { user, signOut, isAuthenticated, isLoading, isAdmin } = useAuth();
    const { profile } = useVenusProfile();

    // Store data
    const wishlistCount = useWishlistStore((state) => state.items.length);
    const cartCount = useCartStore((state) => state.getItemCount());

    // Redirect to login if not authenticated
    useEffect(() => {
        if (!isLoading && !isAuthenticated) {
            navigate('/account/login');
        }
    }, [isAuthenticated, isLoading, navigate]);

    const handleSignOut = async () => {
        await signOut();
        navigate('/');
    };

    // Show loading while checking auth
    if (isLoading) {
        return (
            <main className={styles.page}>
                <div className={styles.container} style={{ textAlign: 'center', padding: '100px 20px' }}>
                    <span className={styles.spinner} />
                </div>
            </main>
        );
    }

    // Get Venus sign data
    const zodiacData = profile.venusSign
        ? ZODIAC_SIGNS[profile.venusSign.toLowerCase() as keyof typeof ZODIAC_SIGNS]
        : null;

    // Mock orders for demo
    const recentOrders = [
        { id: 'ORD-2024-001', date: '2024-01-15', total: '459 zł', status: 'delivered' },
        { id: 'ORD-2024-002', date: '2024-01-28', total: '299 zł', status: 'shipped' },
        { id: 'ORD-2024-003', date: '2024-02-05', total: '189 zł', status: 'processing' },
    ];

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'My Account' : 'Moje Konto'} | House of Venus</title>
            </Helmet>

            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Header */}
                    <motion.div
                        className={styles.dashboardHeader}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <div className={styles.welcomeSection}>
                            <h1>
                                {language === 'en' ? 'Welcome back, ' : 'Witaj ponownie, '}
                                {user?.email?.split('@')[0] || 'Star'}!
                            </h1>
                            <p>
                                {language === 'en'
                                    ? 'Manage your cosmic profile and orders'
                                    : 'Zarządzaj swoim kosmicznym profilem i zamówieniami'
                                }
                            </p>
                        </div>

                        {zodiacData && (
                            <div className={styles.venusProfile}>
                                <span className={styles.venusSymbol}>{zodiacData.symbol}</span>
                                <div className={styles.venusInfo}>
                                    <span className={styles.venusLabel}>
                                        {language === 'en' ? 'Your Venus Sign' : 'Twój Znak Wenus'}
                                    </span>
                                    <span className={styles.venusValue}>
                                        {language === 'en' ? zodiacData.name_en : zodiacData.name_pl}
                                    </span>
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        className={styles.statsGrid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Package size={24} />
                            </div>
                            <div className={styles.statContent}>
                                <h3>{recentOrders.length}</h3>
                                <p>{language === 'en' ? 'Total Orders' : 'Zamówień'}</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Heart size={24} />
                            </div>
                            <div className={styles.statContent}>
                                <h3>{wishlistCount}</h3>
                                <p>{language === 'en' ? 'Wishlist Items' : 'Na liście życzeń'}</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <ShoppingBag size={24} />
                            </div>
                            <div className={styles.statContent}>
                                <h3>{cartCount}</h3>
                                <p>{language === 'en' ? 'Items in Cart' : 'W koszyku'}</p>
                            </div>
                        </div>

                        <div className={styles.statCard}>
                            <div className={styles.statIcon}>
                                <Sparkles size={24} />
                            </div>
                            <div className={styles.statContent}>
                                <h3>{zodiacData?.symbol || '?'}</h3>
                                <p>{language === 'en' ? 'Venus Sign' : 'Znak Wenus'}</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Dashboard Grid */}
                    <motion.div
                        className={styles.dashboardGrid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Recent Orders */}
                        <div className={styles.dashboardSection}>
                            <div className={styles.sectionHeader}>
                                <h2>
                                    <Package size={18} />
                                    {language === 'en' ? 'Recent Orders' : 'Ostatnie Zamówienia'}
                                </h2>
                                <Link to="/account/orders">
                                    {language === 'en' ? 'View All' : 'Zobacz Wszystkie'}
                                    <ArrowRight size={14} />
                                </Link>
                            </div>

                            {recentOrders.length > 0 ? (
                                <div className={styles.orderList}>
                                    {recentOrders.map((order) => (
                                        <div key={order.id} className={styles.orderItem}>
                                            <div className={styles.orderInfo}>
                                                <h4>{order.id}</h4>
                                                <p>{order.date} • {order.total}</p>
                                            </div>
                                            <span className={`${styles.orderStatus} ${styles[`status${order.status.charAt(0).toUpperCase() + order.status.slice(1)}`]}`}>
                                                {language === 'en'
                                                    ? order.status
                                                    : order.status === 'delivered' ? 'Dostarczono'
                                                        : order.status === 'shipped' ? 'Wysłano'
                                                            : 'W realizacji'
                                                }
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className={styles.emptyState}>
                                    <Package size={32} />
                                    <p>{language === 'en' ? 'No orders yet' : 'Brak zamówień'}</p>
                                </div>
                            )}
                        </div>

                        {/* Quick Actions */}
                        <div className={styles.dashboardSection}>
                            <div className={styles.sectionHeader}>
                                <h2>
                                    <Settings size={18} />
                                    {language === 'en' ? 'Quick Actions' : 'Szybkie Akcje'}
                                </h2>
                            </div>

                            <div className={styles.quickActions}>
                                <Link to="/wishlist" className={styles.quickAction}>
                                    <Heart size={24} />
                                    <span>{language === 'en' ? 'Wishlist' : 'Lista życzeń'}</span>
                                </Link>

                                <Link to="/venus-calculator" className={styles.quickAction}>
                                    <Sparkles size={24} />
                                    <span>{language === 'en' ? 'Venus Calculator' : 'Kalkulator Wenus'}</span>
                                </Link>

                                <Link to="/account/settings" className={styles.quickAction}>
                                    <User size={24} />
                                    <span>{language === 'en' ? 'Profile Settings' : 'Ustawienia Profilu'}</span>
                                </Link>

                                <Link to="/account/payment" className={styles.quickAction}>
                                    <CreditCard size={24} />
                                    <span>{language === 'en' ? 'Payment Methods' : 'Metody Płatności'}</span>
                                </Link>

                                {isAdmin && (
                                    <Link to="/admin" className={styles.quickAction} style={{ color: 'var(--color-gold)' }}>
                                        <LayoutDashboard size={24} />
                                        <span>{language === 'en' ? 'Admin Dashboard' : 'Panel Admina'}</span>
                                    </Link>
                                )}
                            </div>

                            <button
                                className={styles.signOutButton}
                                onClick={handleSignOut}
                            >
                                <LogOut size={16} />
                                {language === 'en' ? 'Sign Out' : 'Wyloguj się'}
                            </button>
                        </div>
                    </motion.div>
                </div>
            </main>
        </>
    );
}
