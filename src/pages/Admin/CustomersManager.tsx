/* ===========================================
   ADMIN CUSTOMERS MANAGER
   Customer listing with real data
   =========================================== */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users } from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useTranslation } from '../../contexts';
import styles from './AdminComponents.module.css';

interface Customer {
    id: string;
    user_id: string;
    first_name: string | null;
    last_name: string | null;
    venus_sign: string | null;
    sun_sign: string | null;
    date_of_birth: string | null;
    preferred_language: string | null;
    created_at: string;
}

export default function CustomersManager() {
    const { language } = useTranslation();
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCustomers();
    }, []);

    const fetchCustomers = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('user_profiles')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setCustomers(data || []);
        } catch (error) {
            console.error('Error fetching customers:', error);
        } finally {
            setLoading(false);
        }
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
                        {language === 'en' ? 'Customers' : 'Klienci'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {language === 'en'
                            ? `${customers.length} registered customers`
                            : `${customers.length} zarejestrowanych klientów`
                        }
                    </p>
                </div>
            </motion.div>

            {/* Customers */}
            <motion.div
                className={styles.sectionCard}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                {loading ? (
                    <div className={styles.emptyState}>
                        <p>{language === 'en' ? 'Loading...' : 'Ładowanie...'}</p>
                    </div>
                ) : customers.length > 0 ? (
                    <div className={styles.activityList}>
                        {customers.map(customer => (
                            <div key={customer.id} className={styles.activityItem}>
                                <div className={`${styles.activityDot} ${styles.customer}`} />
                                <div className={styles.activityContent}>
                                    <p>
                                        <strong>
                                            {customer.first_name || customer.last_name
                                                ? `${customer.first_name || ''} ${customer.last_name || ''}`.trim()
                                                : (language === 'en' ? 'Anonymous User' : 'Użytkownik anonimowy')
                                            }
                                        </strong>
                                        {customer.venus_sign && (
                                            <span style={{ marginLeft: 8, color: 'var(--admin-accent)', fontSize: '0.75rem' }}>
                                                ♀ {customer.venus_sign}
                                            </span>
                                        )}
                                    </p>
                                    <time>
                                        {language === 'en' ? 'Joined' : 'Dołączył(a)'}: {new Date(customer.created_at).toLocaleDateString()}
                                        {customer.preferred_language && ` • ${customer.preferred_language.toUpperCase()}`}
                                    </time>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className={styles.emptyState}>
                        <div className={styles.emptyIcon}>
                            <Users size={22} />
                        </div>
                        <h3>{language === 'en' ? 'No customers yet' : 'Brak klientów'}</h3>
                        <p>
                            {language === 'en'
                                ? 'When users register, they will appear here.'
                                : 'Gdy użytkownicy się zarejestrują, pojawią się tutaj.'
                            }
                        </p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
