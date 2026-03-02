/* ===========================================
   ADMIN ORDERS MANAGER
   Order listing with real data from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    ShoppingCart
} from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useTranslation } from '../../contexts';
import styles from './AdminComponents.module.css';
import pmStyles from './ProductsManager.module.css';

interface Order {
    id: string;
    order_number: string;
    status: string;
    total_pln: number;
    subtotal_pln: number;
    shipping_cost_pln: number;
    shipping_address: Record<string, string> | null;
    created_at: string;
}

export default function OrdersManager() {
    const { language } = useTranslation();
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [filterStatus, setFilterStatus] = useState('');

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('orders')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setOrders(data || []);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredOrders = orders.filter(o => !filterStatus || o.status === filterStatus);


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

    // Order stats
    const statusCounts = {
        all: orders.length,
        pending: orders.filter(o => o.status === 'pending').length,
        processing: orders.filter(o => o.status === 'processing').length,
        shipped: orders.filter(o => o.status === 'shipped').length,
        completed: orders.filter(o => o.status === 'completed').length,
    };

    return (
        <div>
            {/* Page Header */}
            <motion.div
                className={styles.pageHeader}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div>
                    <h1 className={styles.pageTitle}>
                        {language === 'en' ? 'Orders' : 'Zamówienia'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {language === 'en'
                            ? `${orders.length} total orders`
                            : `${orders.length} zamówień łącznie`
                        }
                    </p>
                </div>
            </motion.div>

            {/* Status Filter Tabs */}
            <motion.div
                className={pmStyles.filtersBar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className={pmStyles.filterGroup} style={{ gap: '0.35rem' }}>
                    {[
                        { key: '', label: language === 'en' ? 'All' : 'Wszystkie', count: statusCounts.all },
                        { key: 'pending', label: language === 'en' ? 'Pending' : 'Oczekujące', count: statusCounts.pending },
                        { key: 'completed', label: language === 'en' ? 'Completed' : 'Zrealizowane', count: statusCounts.completed },
                    ].map(tab => (
                        <button
                            key={tab.key}
                            className={filterStatus === tab.key ? styles.btnPrimary : styles.btnSecondary}
                            onClick={() => setFilterStatus(tab.key)}
                            style={{ fontSize: '0.78rem', padding: '0.4rem 0.75rem' }}
                        >
                            {tab.label} ({tab.count})
                        </button>
                    ))}
                </div>
            </motion.div>

            {/* Orders Table */}
            <motion.div
                className={styles.sectionCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                {loading ? (
                    <div className={styles.emptyState}>
                        <p>{language === 'en' ? 'Loading orders...' : 'Ładowanie zamówień...'}</p>
                    </div>
                ) : filteredOrders.length > 0 ? (
                    <div className={styles.table}>
                        <div className={`${styles.tableRow} ${styles.tableHeader}`}>
                            <span>{language === 'en' ? 'Order' : 'Zamówienie'}</span>
                            <span>{language === 'en' ? 'Customer' : 'Klient'}</span>
                            <span>{language === 'en' ? 'Date' : 'Data'}</span>
                            <span>{language === 'en' ? 'Total' : 'Suma'}</span>
                            <span>Status</span>
                        </div>
                        {filteredOrders.map(order => (
                            <div key={order.id} className={styles.tableRow}>
                                <span style={{ color: 'var(--admin-text)', fontWeight: 550 }}>
                                    {order.order_number || `#${order.id.slice(0, 8)}`}
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
                        <p>
                            {language === 'en'
                                ? 'When customers place orders, they will appear here.'
                                : 'Gdy klienci złożą zamówienia, pojawią się tutaj.'
                            }
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
