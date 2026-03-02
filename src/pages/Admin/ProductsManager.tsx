/* ===========================================
   ADMIN PRODUCTS MANAGER
   Product listing with real data from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
    Package, Search, Plus, Edit3,
    Star, Eye, Filter, ChevronDown
} from 'lucide-react';
import { supabase } from '../../integrations/supabase/client';
import { useTranslation } from '../../contexts';
import styles from './AdminComponents.module.css';
import pmStyles from './ProductsManager.module.css';

interface Product {
    id: string;
    name_en: string;
    name_pl: string;
    slug: string;
    price_pln: number;
    original_price_pln: number | null;
    category: string;
    venus_sign: string;
    is_new: boolean;
    is_sale: boolean;
    is_bestseller: boolean;
    in_stock: boolean;
    images: string[];
    rating: number;
    review_count: number;
    created_at: string;
}

export default function ProductsManager() {
    const { language } = useTranslation();
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterCategory, setFilterCategory] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const { data, error } = await supabase
                .from('products')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filter products
    const filteredProducts = products.filter(p => {
        const name = language === 'en' ? p.name_en : p.name_pl;
        const matchesSearch = !searchQuery || name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = !filterCategory || p.category === filterCategory;
        return matchesSearch && matchesCategory;
    });

    // Get unique categories
    const categories = [...new Set(products.map(p => p.category))];

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
                        {language === 'en' ? 'Products' : 'Produkty'}
                    </h1>
                    <p className={styles.pageSubtitle}>
                        {language === 'en'
                            ? `${products.length} products in catalog`
                            : `${products.length} produktów w katalogu`
                        }
                    </p>
                </div>
                <div className={styles.headerActions}>
                    <button className={styles.btnPrimary}>
                        <Plus size={15} />
                        {language === 'en' ? 'Add Product' : 'Dodaj Produkt'}
                    </button>
                </div>
            </motion.div>

            {/* Filters Bar */}
            <motion.div
                className={pmStyles.filtersBar}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <div className={pmStyles.searchBox}>
                    <Search size={16} />
                    <input
                        type="text"
                        placeholder={language === 'en' ? 'Search products...' : 'Szukaj produktów...'}
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className={pmStyles.filterGroup}>
                    <div className={pmStyles.selectWrapper}>
                        <Filter size={14} />
                        <select
                            value={filterCategory}
                            onChange={e => setFilterCategory(e.target.value)}
                            aria-label={language === 'en' ? 'Filter by category' : 'Filtruj wg kategorii'}
                        >
                            <option value="">{language === 'en' ? 'All Categories' : 'Wszystkie'}</option>
                            {categories.map(cat => (
                                <option key={cat} value={cat}>{cat}</option>
                            ))}
                        </select>
                        <ChevronDown size={12} className={pmStyles.selectArrow} />
                    </div>
                </div>
            </motion.div>

            {/* Products Grid */}
            <motion.div
                className={pmStyles.productsGrid}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                {loading ? (
                    // Loading skeletons
                    Array.from({ length: 6 }).map((_, i) => (
                        <div key={i} className={pmStyles.productCard} style={{ opacity: 0.4 }}>
                            <div className={pmStyles.productImage} style={{ background: 'var(--admin-border)' }} />
                            <div className={pmStyles.productInfo}>
                                <div style={{ width: '70%', height: 14, background: 'var(--admin-border)', borderRadius: 4 }} />
                                <div style={{ width: '40%', height: 12, background: 'var(--admin-border)', borderRadius: 4, marginTop: 8 }} />
                            </div>
                        </div>
                    ))
                ) : filteredProducts.length > 0 ? (
                    filteredProducts.map(product => (
                        <div key={product.id} className={pmStyles.productCard}>
                            {/* Image */}
                            <div className={pmStyles.productImage}>
                                {product.images?.[0] ? (
                                    <img src={product.images[0]} alt={language === 'en' ? product.name_en : product.name_pl} />
                                ) : (
                                    <div className={pmStyles.noImage}>
                                        <Package size={24} />
                                    </div>
                                )}
                                {/* Badges */}
                                <div className={pmStyles.badges}>
                                    {product.is_new && <span className={pmStyles.badgeNew}>NEW</span>}
                                    {product.is_sale && <span className={pmStyles.badgeSale}>SALE</span>}
                                    {product.is_bestseller && <span className={pmStyles.badgeBest}>★</span>}
                                </div>
                                {/* Hover actions */}
                                <div className={pmStyles.hoverActions}>
                                    <button className={pmStyles.actionBtn} aria-label="Edit">
                                        <Edit3 size={14} />
                                    </button>
                                    <button className={pmStyles.actionBtn} aria-label="View">
                                        <Eye size={14} />
                                    </button>
                                </div>
                            </div>

                            {/* Info */}
                            <div className={pmStyles.productInfo}>
                                <h3>{language === 'en' ? product.name_en : product.name_pl}</h3>
                                <div className={pmStyles.productMeta}>
                                    <span className={pmStyles.category}>{product.category}</span>
                                    <span className={pmStyles.venusSign}>♀ {product.venus_sign}</span>
                                </div>
                                <div className={pmStyles.productPrice}>
                                    <span className={pmStyles.price}>{Number(product.price_pln).toFixed(2)} zł</span>
                                    {product.original_price_pln && (
                                        <span className={pmStyles.originalPrice}>
                                            {Number(product.original_price_pln).toFixed(2)} zł
                                        </span>
                                    )}
                                </div>
                                <div className={pmStyles.productFooter}>
                                    {product.rating > 0 && (
                                        <span className={pmStyles.rating}>
                                            <Star size={12} fill="var(--admin-gold)" color="var(--admin-gold)" />
                                            {product.rating}
                                        </span>
                                    )}
                                    <span className={`${pmStyles.stockBadge} ${product.in_stock ? pmStyles.inStock : pmStyles.outOfStock}`}>
                                        {product.in_stock
                                            ? (language === 'en' ? 'In Stock' : 'Dostępny')
                                            : (language === 'en' ? 'Out of Stock' : 'Niedostępny')
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className={styles.emptyState} style={{ gridColumn: '1 / -1' }}>
                        <div className={styles.emptyIcon}>
                            <Package size={22} />
                        </div>
                        <h3>{language === 'en' ? 'No products found' : 'Brak produktów'}</h3>
                        <p>{language === 'en' ? 'Try adjusting your filters or add a new product.' : 'Spróbuj zmienić filtry lub dodaj nowy produkt.'}</p>
                    </div>
                )}
            </motion.div>
        </div>
    );
}
