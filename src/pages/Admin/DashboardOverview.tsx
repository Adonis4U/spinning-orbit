/* ===========================================
   ADMIN DASHBOARD OVERVIEW
   Real-time stats from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    DollarSign, ShoppingBag, Users,
    Package, ShoppingCart, ArrowRight
} from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useTranslation } from '../../contexts';
import styles from './AdminComponents.module.css';

// Types
interface DashboardStats {
    totalProducts: number;
    totalOrders: number;
    totalCustomers: number;
    totalRevenue: number;
}

interface RecentOrder {
    id: string;
    order_number: string;
    status: string;
    total_pln: number;
    created_at: string;
    shipping_address: { first_name?: string; last_name?: string; email?: string } | null;
}

interface RecentProduct {
    id: string;
    name_en: string;
    name_pl: string;
    price_pln: number;
    is_new: boolean;
    created_at: string;
}

export default function DashboardOverview() {
    const { language } = useTranslation();
    const [stats, setStats] = useState<DashboardStats>({
        totalProducts: 0,
        totalOrders: 0,
        totalCustomers: 0,
        totalRevenue: 0,
    });
    const [recentOrders, setRecentOrders] = useState<RecentOrder[]>([]);
    const [recentProducts, setRecentProducts] = useState<RecentProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            setLoading(true);

            // Fetch stats in parallel
            const [productsRes, ordersRes, customersRes, recentOrdersRes, recentProdsRes] = await Promise.all([
                supabase.from('products').select('id', { count: 'exact', head: true }),
                supabase.from('orders').select('id, total_pln'),
                supabase.from('user_profiles').select('id', { count: 'exact', head: true }),
                supabase.from('orders').select('*').order('created_at', { ascending: false }).limit(5),
                supabase.from('products').select('id, name_en, name_pl, price_pln, is_new, created_at').order('created_at', { ascending: false }).limit(5),
            ]);

            // Calculate revenue
            const orderData = ordersRes.data as { id: string; total_pln: number }[] | null;
            const revenue = orderData?.reduce((sum, o) => sum + (Number(o.total_pln) || 0), 0) || 0;

            setStats({
                totalProducts: productsRes.count || 0,
                totalOrders: orderData?.length || 0,
                totalCustomers: customersRes.count || 0,
                totalRevenue: revenue,
            });

            setRecentOrders(recentOrdersRes.data || []);
            setRecentProducts(recentProdsRes.data || []);
        } catch (error) {
            console.error('Dashboard fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const statCards = [
        {
            label: language === 'en' ? 'Total Products' : 'Produkty',
            value: stats.totalProducts.toString(),
            icon: Package,
            colorClass: 'purple',
        },
        {
            label: language === 'en' ? 'Total Orders' : 'Zamówienia',
            value: stats.totalOrders.toString(),
            icon: ShoppingBag,
            colorClass: 'gold',
        },
        {
            label: language === 'en' ? 'Customers' : 'Klienci',
            value: stats.totalCustomers.toString(),
            icon: Users,
            colorClass: 'green',
        },
        {
            label: language === 'en' ? 'Revenue' : 'Przychód',
            value: `${stats.totalRevenue.toFixed(2)} zł`,
            icon: DollarSign,
            colorClass: 'blue',
        },
    ];

    const getStatusLabel = (status: string) => {
        const labels: Record<string, { en: string; pl: string }> = {
            pending: { en: 'Pending', pl: 'Oczekujące' },
            processing: { en: 'Processing', pl: 'Przetwarzane' },
            shipped: { en: 'Shipped', pl: 'Wysłane' },
            completed: { en: 'Completed', pl: 'Zrealizowane' },
            cancelled: { en: 'Cancelled', pl: 'Anulowane' },
        };
        return labels[status]?.[language as 'en' | 'pl'] || status;
    };

    if (loading) {
        return (
            <div>
                <div className={styles.pageHeader}>
                    <div>
                        <h1 className={styles.pageTitle}>Dashboard</h1>
                        <p className={styles.pageSubtitle}>
                            {language === 'en' ? 'Loading...' : 'Ładowanie...'}
                        </p>
                    </div>
                </div>
                <div className={styles.statsGrid}>
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className={styles.statCard} style={{ opacity: 0.5, minHeight: 100 }}>
                            <div className={styles.statInfo}>
                                <h3 style={{ width: 80, height: 12, background: 'var(--admin-border)', borderRadius: 4 }}>&nbsp;</h3>
                                <div className={styles.statValue} style={{ width: 60, height: 28, background: 'var(--admin-border)', borderRadius: 4, marginTop: 8 }}>&nbsp;</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <motion.div
                className={styles.pageHeader}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <div>
                    <h1 className={styles.pageTitle}>
                        {language === 'en' ? 'Dashboard' : 'Panel Główny'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {language === 'en'
                            ? 'Welcome back! Here\'s what\'s happening.'
                            : 'Witaj ponownie! Oto co się dzieje.'
                        }
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <Link to="/admin/products" className={styles.btnPrimary}>
                        <Package size={15} />
                        {language === 'en' ? 'View Products' : 'Produkty'}
                    </Link>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                className={styles.statsGrid}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1, duration: 0.3 }}
            >
                {statCards.map((stat, index) => (
                    <div key={index} className={styles.statCard}>
                        <div className={styles.statInfo}>
                            <h3>{stat.label}</h3>
                            <div className={styles.statValue}>{stat.value}</div>
                        </div>
                        <div className={`${styles.statIcon} ${styles[stat.colorClass]}`}>
                            <stat.icon size={22} />
                        </div>
                    </div>
                ))}
            </motion.div>

            {/* Content Grid */}
            <motion.div
                className={styles.contentGrid}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.3 }}
            >
                {/* Recent Orders */}
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Recent Orders' : 'Ostatnie Zamówienia'}
                        </h2>
                        <Link to="/admin/orders" className={styles.sectionLink}>
                            {language === 'en' ? 'View All' : 'Wszystkie'}
                            <ArrowRight size={12} style={{ marginLeft: 4, display: 'inline' }} />
                        </Link>
                    </div>

                    {recentOrders.length > 0 ? (
                        <div className={styles.table}>
                            <div className={`${styles.tableRow} ${styles.tableHeader}`}>
                                <span>{language === 'en' ? 'Order' : 'Zamówienie'}</span>
                                <span>{language === 'en' ? 'Customer' : 'Klient'}</span>
                                <span>{language === 'en' ? 'Date' : 'Data'}</span>
                                <span>{language === 'en' ? 'Total' : 'Suma'}</span>
                                <span>Status</span>
                            </div>
                            {recentOrders.map(order => (
                                <div key={order.id} className={styles.tableRow}>
                                    <span style={{ color: 'var(--admin-text)', fontWeight: 550 }}>
                                        {order.order_number || order.id.slice(0, 8)}
                                    </span>
                                    <span className={styles.customer}>
                                        <strong>
                                            {order.shipping_address
                                                ? `${order.shipping_address.first_name || ''} ${order.shipping_address.last_name || ''}`.trim() || '—'
                                                : '—'
                                            }
                                        </strong>
                                        <small>{order.shipping_address?.email || ''}</small>
                                    </span>
                                    <span>{new Date(order.created_at).toLocaleDateString()}</span>
                                    <span style={{ fontWeight: 550, color: 'var(--admin-text)' }}>
                                        {Number(order.total_pln).toFixed(2)} zł
                                    </span>
                                    <span className={`${styles.badge} ${styles[order.status] || ''}`}>
                                        {getStatusLabel(order.status)}
                                    </span>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <ShoppingCart size={22} />
                            </div>
                            <h3>{language === 'en' ? 'No orders yet' : 'Brak zamówień'}</h3>
                            <p>{language === 'en' ? 'Orders will appear here once customers start purchasing.' : 'Zamówienia pojawią się tutaj, gdy klienci zaczną kupować.'}</p>
                        </div>
                    )}
                </div>

                {/* Recent Products */}
                <div className={styles.sectionCard}>
                    <div className={styles.sectionHeader}>
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Recent Products' : 'Ostatnie Produkty'}
                        </h2>
                        <Link to="/admin/products" className={styles.sectionLink}>
                            {language === 'en' ? 'View All' : 'Wszystkie'}
                        </Link>
                    </div>

                    {recentProducts.length > 0 ? (
                        <div className={styles.activityList}>
                            {recentProducts.map(product => (
                                <div key={product.id} className={styles.activityItem}>
                                    <div className={`${styles.activityDot} ${product.is_new ? styles.product : styles.order}`} />
                                    <div className={styles.activityContent}>
                                        <p>
                                            <strong>{language === 'en' ? product.name_en : product.name_pl}</strong>
                                        </p>
                                        <time>
                                            {Number(product.price_pln).toFixed(2)} zł
                                            {product.is_new && ` • ${language === 'en' ? 'New' : 'Nowy'}`}
                                        </time>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className={styles.emptyState}>
                            <div className={styles.emptyIcon}>
                                <Package size={22} />
                            </div>
                            <h3>{language === 'en' ? 'No products' : 'Brak produktów'}</h3>
                            <p>{language === 'en' ? 'Add your first product to get started.' : 'Dodaj pierwszy produkt, aby zacząć.'}</p>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
}
