/* ===========================================
   ADMIN DASHBOARD
   Admin panel with sidebar and stats
   =========================================== */

import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import {
    LayoutDashboard, Package, ShoppingCart, Users,
    Settings, Image, FileText, TrendingUp, TrendingDown,
    Plus, DollarSign, Eye, ShoppingBag, Menu
} from 'lucide-react';
import { useTranslation } from '../../contexts';
import styles from './AdminDashboard.module.css';

// Navigation items
const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', labelPl: 'Panel', path: '/admin' },
    { icon: Package, label: 'Products', labelPl: 'Produkty', path: '/admin/products' },
    { icon: ShoppingCart, label: 'Orders', labelPl: 'Zamówienia', path: '/admin/orders' },
    { icon: Users, label: 'Customers', labelPl: 'Klienci', path: '/admin/customers' },
    { icon: Image, label: 'Collections', labelPl: 'Kolekcje', path: '/admin/collections' },
    { icon: FileText, label: 'Blog Posts', labelPl: 'Artykuły', path: '/admin/blog' },
    { divider: true },
    { icon: Settings, label: 'Settings', labelPl: 'Ustawienia', path: '/admin/settings' },
];

// Mock stats data
const stats = [
    {
        label: 'Total Revenue',
        labelPl: 'Przychód',
        value: '24,580 zł',
        change: '+12.5%',
        positive: true,
        icon: DollarSign,
        colorClass: 'gold'
    },
    {
        label: 'Orders',
        labelPl: 'Zamówienia',
        value: '156',
        change: '+8.2%',
        positive: true,
        icon: ShoppingBag,
        colorClass: 'purple'
    },
    {
        label: 'Visitors',
        labelPl: 'Odwiedzający',
        value: '2,847',
        change: '-3.1%',
        positive: false,
        icon: Eye,
        colorClass: 'blue'
    },
    {
        label: 'Customers',
        labelPl: 'Klienci',
        value: '892',
        change: '+15.3%',
        positive: true,
        icon: Users,
        colorClass: 'green'
    },
];

// Mock recent orders
const recentOrders = [
    { id: 'ORD-2024-156', customer: 'Anna Kowalska', email: 'anna@example.com', total: '459 zł', status: 'completed', date: '2024-02-12' },
    { id: 'ORD-2024-155', customer: 'Jan Nowak', email: 'jan@example.com', total: '299 zł', status: 'pending', date: '2024-02-11' },
    { id: 'ORD-2024-154', customer: 'Maria Wiśniewska', email: 'maria@example.com', total: '189 zł', status: 'completed', date: '2024-02-10' },
    { id: 'ORD-2024-153', customer: 'Piotr Dąbrowski', email: 'piotr@example.com', total: '529 zł', status: 'pending', date: '2024-02-10' },
    { id: 'ORD-2024-152', customer: 'Ewa Lewandowska', email: 'ewa@example.com', total: '89 zł', status: 'cancelled', date: '2024-02-09' },
];

// Mock activity
const recentActivity = [
    { type: 'order', message: 'New order received from', highlight: 'Anna Kowalska', time: '5 minutes ago', timePl: '5 minut temu' },
    { type: 'product', message: 'Product updated:', highlight: 'Celestial Silk Dress', time: '1 hour ago', timePl: '1 godz. temu' },
    { type: 'customer', message: 'New customer registered:', highlight: 'Jan Nowak', time: '2 hours ago', timePl: '2 godz. temu' },
    { type: 'order', message: 'Order shipped to', highlight: 'Maria Wiśniewska', time: '3 hours ago', timePl: '3 godz. temu' },
];

export default function AdminDashboard() {
    const { language } = useTranslation();
    const location = useLocation();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <>
            <Helmet>
                <title>Admin Dashboard | House of Venus</title>
            </Helmet>

            <div className={styles.adminLayout}>
                {/* Sidebar */}
                <aside className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h2>
                            <LayoutDashboard size={20} />
                            Admin Panel
                        </h2>
                    </div>

                    <nav className={styles.nav}>
                        {navItems.map((item, index) =>
                            item.divider ? (
                                <div key={index} className={styles.navDivider} />
                            ) : (
                                <Link
                                    key={item.path}
                                    to={item.path!}
                                    className={`${styles.navItem} ${location.pathname === item.path ? styles.active : ''}`}
                                >
                                    {item.icon && <item.icon size={18} />}
                                    {language === 'en' ? item.label : item.labelPl}
                                </Link>
                            )
                        )}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className={styles.mainContent}>
                    {/* Page Header */}
                    <motion.div
                        className={styles.pageHeader}
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1>{language === 'en' ? 'Dashboard' : 'Panel Główny'}</h1>
                        <div className={styles.headerActions}>
                            <button className={styles.primaryButton}>
                                <Plus size={16} />
                                {language === 'en' ? 'Add Product' : 'Dodaj Produkt'}
                            </button>
                        </div>
                    </motion.div>

                    {/* Stats Grid */}
                    <motion.div
                        className={styles.statsGrid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        {stats.map((stat, index) => (
                            <div key={index} className={styles.statCard}>
                                <div className={styles.statInfo}>
                                    <h3>{language === 'en' ? stat.label : stat.labelPl}</h3>
                                    <div className={styles.statValue}>{stat.value}</div>
                                    <div className={`${styles.statChange} ${stat.positive ? styles.positive : styles.negative}`}>
                                        {stat.positive ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                                        {stat.change}
                                    </div>
                                </div>
                                <div className={`${styles.statIcon} ${styles[stat.colorClass]}`}>
                                    <stat.icon size={24} />
                                </div>
                            </div>
                        ))}
                    </motion.div>

                    {/* Content Grid */}
                    <motion.div
                        className={styles.contentGrid}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {/* Recent Orders */}
                        <div className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h2>{language === 'en' ? 'Recent Orders' : 'Ostatnie Zamówienia'}</h2>
                                <Link to="/admin/orders">
                                    {language === 'en' ? 'View All' : 'Zobacz Wszystkie'}
                                </Link>
                            </div>
                            <div className={styles.ordersTable}>
                                <div className={`${styles.tableRow} ${styles.tableHeader}`}>
                                    <span>{language === 'en' ? 'Order ID' : 'Nr Zamówienia'}</span>
                                    <span>{language === 'en' ? 'Customer' : 'Klient'}</span>
                                    <span>{language === 'en' ? 'Date' : 'Data'}</span>
                                    <span>{language === 'en' ? 'Total' : 'Suma'}</span>
                                    <span>{language === 'en' ? 'Status' : 'Status'}</span>
                                </div>
                                {recentOrders.map((order) => (
                                    <div key={order.id} className={styles.tableRow}>
                                        <span>{order.id}</span>
                                        <span className={styles.customer}>
                                            <strong>{order.customer}</strong>
                                            <small>{order.email}</small>
                                        </span>
                                        <span>{order.date}</span>
                                        <span>{order.total}</span>
                                        <span className={`${styles.status} ${styles[order.status]}`}>
                                            {language === 'en'
                                                ? order.status
                                                : order.status === 'completed' ? 'Zrealizowane'
                                                    : order.status === 'pending' ? 'Oczekujące'
                                                        : 'Anulowane'
                                            }
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Recent Activity */}
                        <div className={styles.sectionCard}>
                            <div className={styles.sectionHeader}>
                                <h2>{language === 'en' ? 'Recent Activity' : 'Ostatnia Aktywność'}</h2>
                            </div>
                            <div className={styles.activityList}>
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className={styles.activityItem}>
                                        <div className={styles.activityIcon}>
                                            {activity.type === 'order' && <ShoppingCart size={14} />}
                                            {activity.type === 'product' && <Package size={14} />}
                                            {activity.type === 'customer' && <Users size={14} />}
                                        </div>
                                        <div className={styles.activityContent}>
                                            <p>
                                                {activity.message} <strong>{activity.highlight}</strong>
                                            </p>
                                            <time>{language === 'en' ? activity.time : activity.timePl}</time>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </main>

                {/* Mobile Menu Toggle */}
                <button
                    className={styles.mobileMenuToggle}
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <Menu size={24} />
                </button>
            </div>
        </>
    );
}
