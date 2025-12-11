/* ===========================================
   SHOP PAGE - FIXED CSS CLASS NAMES
   Product listing with filters and grid
   =========================================== */

import { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Filter, SlidersHorizontal, Grid, LayoutGrid,
    ChevronDown, X, Search, Sparkles, Loader2
} from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { useProducts } from '../../hooks';
import type { Product } from '../../hooks';
import ProductCard from '../../components/product/ProductCard';
import { ZodiacIcon } from '../../components/common';
import styles from './Shop.module.css';

const CATEGORIES = [
    { id: 'all', en: 'All', pl: 'Wszystkie' },
    { id: 'dresses', en: 'Dresses', pl: 'Sukienki' },
    { id: 'tops', en: 'Tops', pl: 'Bluzki' },
    { id: 'bottoms', en: 'Bottoms', pl: 'Dół' },
    { id: 'outerwear', en: 'Outerwear', pl: 'Okrycia' },
    { id: 'jewelry', en: 'Jewelry', pl: 'Biżuteria' },
];

const SORT_OPTIONS = [
    { id: 'newest', en: 'Newest', pl: 'Najnowsze' },
    { id: 'price-asc', en: 'Price: Low to High', pl: 'Cena: Rosnąco' },
    { id: 'price-desc', en: 'Price: High to Low', pl: 'Cena: Malejąco' },
    { id: 'rating', en: 'Best Rated', pl: 'Najlepiej Oceniane' },
    { id: 'popular', en: 'Most Popular', pl: 'Najpopularniejsze' },
];

// Helper to transform DB product to ProductCard props
const transformProduct = (p: Product, language: string) => ({
    id: p.id,
    name: language === 'pl' ? p.name_pl : p.name_en,
    namePl: p.name_pl,
    price: p.price_pln,
    originalPrice: p.original_price_pln || undefined,
    images: p.images || [],
    category: p.category,
    categoryPl: p.category_pl || p.category,
    venusSign: p.venus_sign,
    isNew: p.is_new,
    isSale: p.is_sale,
    isBestseller: p.is_bestseller,
    rating: p.rating,
    reviewCount: p.review_count,
});

export default function Shop() {
    const { language } = useTranslation();
    const [searchParams, setSearchParams] = useSearchParams();
    const { products, loading, error } = useProducts();

    const [showFilters, setShowFilters] = useState(false);
    const [gridSize, setGridSize] = useState<'large' | 'small'>('large');
    const [searchQuery, setSearchQuery] = useState('');

    const activeCategory = searchParams.get('category') || 'all';
    const activeSign = searchParams.get('sign') || '';
    const activeSort = searchParams.get('sort') || 'newest';

    const setFilter = (key: string, value: string) => {
        const newParams = new URLSearchParams(searchParams);
        if (value && value !== 'all') {
            newParams.set(key, value);
        } else {
            newParams.delete(key);
        }
        setSearchParams(newParams);
    };

    const clearFilters = () => {
        setSearchParams({});
        setSearchQuery('');
    };

    const filteredProducts = useMemo(() => {
        if (!products) return [];

        let filtered = [...products];

        // Filter by category
        if (activeCategory !== 'all') {
            filtered = filtered.filter(
                p => p.category.toLowerCase() === activeCategory.toLowerCase()
            );
        }

        // Filter by Venus sign
        if (activeSign) {
            filtered = filtered.filter(
                p => p.venus_sign.toLowerCase() === activeSign.toLowerCase()
            );
        }

        // Filter by search
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(
                p => p.name_en.toLowerCase().includes(query) ||
                    p.name_pl.toLowerCase().includes(query) ||
                    p.category.toLowerCase().includes(query)
            );
        }

        // Sort
        switch (activeSort) {
            case 'price-asc':
                filtered.sort((a, b) => a.price_pln - b.price_pln);
                break;
            case 'price-desc':
                filtered.sort((a, b) => b.price_pln - a.price_pln);
                break;
            case 'rating':
                filtered.sort((a, b) => b.rating - a.rating);
                break;
            case 'popular':
                filtered.sort((a, b) => (b.is_bestseller ? 1 : 0) - (a.is_bestseller ? 1 : 0));
                break;
            default:
                filtered.sort((a, b) => (b.is_new ? 1 : 0) - (a.is_new ? 1 : 0));
        }

        return filtered;
    }, [products, activeCategory, activeSign, searchQuery, activeSort]);

    const hasActiveFilters = activeCategory !== 'all' || activeSign || searchQuery;

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Shop' : 'Sklep'} | House of Venus</title>
                <meta
                    name="description"
                    content={language === 'en'
                        ? 'Explore our zodiac-inspired fashion collection'
                        : 'Odkryj naszą kolekcję mody inspirowanej zodiakiem'
                    }
                />
            </Helmet>

            <main className={styles.page}>
                {/* Header Section - using correct CSS class names */}
                <header className={styles.header}>
                    <div className={styles.headerBackground}>
                        <div className={styles.floatingOrb} />
                        <div className={styles.floatingOrb2} />
                    </div>
                    <motion.div
                        className={styles.headerContent}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className={styles.headerBadge}>
                            <Sparkles size={14} />
                            {language === 'en' ? 'Venus Collection' : 'Kolekcja Wenus'}
                        </div>
                        <h1 className={styles.title}>
                            {language === 'en' ? 'Shop' : 'Sklep'}
                        </h1>
                        <p className={styles.subtitle}>
                            {language === 'en'
                                ? 'Fashion aligned with the stars'
                                : 'Moda zgodna z gwiazdami'
                            }
                        </p>
                    </motion.div>
                </header>

                {/* Toolbar */}
                <div className={styles.toolbar}>
                    <div className={styles.toolbarInner}>
                        {/* Search */}
                        <div className={styles.searchWrapper}>
                            <Search size={16} className={styles.searchIcon} />
                            <input
                                type="text"
                                placeholder={language === 'en' ? 'Search...' : 'Szukaj...'}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className={styles.searchInput}
                            />
                        </div>

                        {/* Filter Toggle */}
                        <button
                            className={styles.filterToggle}
                            onClick={() => setShowFilters(!showFilters)}
                        >
                            <Filter size={18} />
                            {language === 'en' ? 'Filters' : 'Filtry'}
                            {hasActiveFilters && <span className={styles.filterBadge} />}
                        </button>

                        {/* Sort */}
                        <div className={styles.sortWrapper}>
                            <SlidersHorizontal size={16} />
                            <select
                                value={activeSort}
                                onChange={(e) => setFilter('sort', e.target.value)}
                                className={styles.sortSelect}
                            >
                                {SORT_OPTIONS.map(opt => (
                                    <option key={opt.id} value={opt.id}>
                                        {language === 'pl' ? opt.pl : opt.en}
                                    </option>
                                ))}
                            </select>
                            <ChevronDown size={14} className={styles.sortChevron} />
                        </div>

                        {/* Grid Toggle */}
                        <div className={styles.gridToggle}>
                            <button
                                className={`${styles.gridButton} ${gridSize === 'large' ? styles.active : ''}`}
                                onClick={() => setGridSize('large')}
                            >
                                <Grid size={18} />
                            </button>
                            <button
                                className={`${styles.gridButton} ${gridSize === 'small' ? styles.active : ''}`}
                                onClick={() => setGridSize('small')}
                            >
                                <LayoutGrid size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filters Panel */}
                <AnimatePresence>
                    {showFilters && (
                        <motion.div
                            className={styles.filtersPanel}
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className={styles.filtersPanelInner}>
                                {/* Category Filter */}
                                <div className={styles.filterGroup}>
                                    <h3 className={styles.filterTitle}>
                                        {language === 'en' ? 'Category' : 'Kategoria'}
                                    </h3>
                                    <div className={styles.filterChips}>
                                        {CATEGORIES.map(cat => (
                                            <button
                                                key={cat.id}
                                                className={`${styles.filterChip} ${activeCategory === cat.id ? styles.active : ''}`}
                                                onClick={() => setFilter('category', cat.id)}
                                            >
                                                {language === 'pl' ? cat.pl : cat.en}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Venus Sign Filter */}
                                <div className={styles.filterGroup}>
                                    <h3 className={styles.filterTitle}>
                                        {language === 'en' ? 'Venus Sign' : 'Znak Wenus'}
                                    </h3>
                                    <div className={styles.filterChips}>
                                        {Object.entries(ZODIAC_SIGNS).map(([key, sign]) => (
                                            <button
                                                key={key}
                                                className={`${styles.filterChip} ${styles.signChip} ${activeSign === key ? styles.active : ''}`}
                                                onClick={() => setFilter('sign', activeSign === key ? '' : key)}
                                            >
                                                <ZodiacIcon sign={key} size={14} className={styles.signSymbol} />
                                                <span>{language === 'en' ? sign.name_en : sign.name_pl}</span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Clear Filters */}
                                {hasActiveFilters && (
                                    <button className={styles.clearFilters} onClick={clearFilters}>
                                        <X size={14} />
                                        {language === 'en' ? 'Clear all filters' : 'Wyczyść filtry'}
                                    </button>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Info */}
                <div className={styles.resultsInfo}>
                    <span className={styles.resultsCount}>
                        {filteredProducts.length} {language === 'en' ? 'items' : 'produktów'}
                    </span>
                    {activeSign && ZODIAC_SIGNS[activeSign as keyof typeof ZODIAC_SIGNS] && (
                        <span className={styles.activeSignBadge}>
                            <ZodiacIcon sign={activeSign} size={12} />
                            {language === 'en'
                                ? ZODIAC_SIGNS[activeSign as keyof typeof ZODIAC_SIGNS].name_en
                                : ZODIAC_SIGNS[activeSign as keyof typeof ZODIAC_SIGNS].name_pl
                            }
                        </span>
                    )}
                </div>

                {/* Loading State */}
                {loading && (
                    <div className={styles.emptyState}>
                        <Loader2 size={32} className={styles.emptyIcon} />
                        <p>{language === 'en' ? 'Loading products...' : 'Ładowanie produktów...'}</p>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className={styles.emptyState}>
                        <p>{language === 'en' ? 'Failed to load products' : 'Nie udało się załadować produktów'}</p>
                    </div>
                )}

                {/* Products Grid */}
                {!loading && !error && (
                    <section className={styles.productsSection}>
                        {filteredProducts.length > 0 ? (
                            <div className={`${styles.productsGrid} ${gridSize === 'small' ? styles.gridSmall : ''}`}>
                                {filteredProducts.map((product, index) => (
                                    <motion.div
                                        key={product.id}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.03 }}
                                    >
                                        <ProductCard {...transformProduct(product, language)} />
                                    </motion.div>
                                ))}
                            </div>
                        ) : (
                            <div className={styles.emptyState}>
                                <div className={styles.emptyIcon}>✨</div>
                                <p>
                                    {language === 'en'
                                        ? 'No products found. Try adjusting your filters.'
                                        : 'Nie znaleziono produktów. Spróbuj zmienić filtry.'
                                    }
                                </p>
                                <button className={styles.clearFiltersButton} onClick={clearFilters}>
                                    {language === 'en' ? 'Clear filters' : 'Wyczyść filtry'}
                                </button>
                            </div>
                        )}
                    </section>
                )}
            </main>
        </>
    );
}
