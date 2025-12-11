/* ===========================================
   WISHLIST PAGE
   Saved items / favorites
   =========================================== */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Trash2, ShoppingBag, Sparkles, ArrowRight } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useWishlistStore, useCartStore } from '../../stores';
import styles from './Wishlist.module.css';

export default function Wishlist() {
    const { language } = useTranslation();
    const items = useWishlistStore((state) => state.items);
    const removeItem = useWishlistStore((state) => state.removeItem);
    const clearWishlist = useWishlistStore((state) => state.clearWishlist);
    const addToCart = useCartStore((state) => state.addItem);

    const formatPrice = (price: number) => `${price.toFixed(0)} zł`;
    const isEmpty = items.length === 0;

    const handleMoveToCart = (item: typeof items[0]) => {
        addToCart({
            id: item.id,
            name: item.name,
            namePl: item.namePl,
            price: item.price,
            originalPrice: item.originalPrice,
            image: item.image,
            venusSign: item.venusSign,
        });
        removeItem(item.id);
    };

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Wishlist' : 'Lista Życzeń'} | House of Venus</title>
            </Helmet>

            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Header */}
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            <Heart size={28} fill="currentColor" />
                            {language === 'en' ? 'My Wishlist' : 'Moja Lista Życzeń'}
                        </h1>
                        {!isEmpty && (
                            <span className={styles.itemCount}>
                                {items.length} {language === 'en' ? 'saved items' : 'zapisanych'}
                            </span>
                        )}
                    </header>

                    {isEmpty ? (
                        /* Empty State */
                        <motion.div
                            className={styles.emptyState}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                        >
                            <div className={styles.emptyIcon}>
                                <Heart size={64} strokeWidth={1} />
                            </div>
                            <h2>{language === 'en' ? 'Your wishlist is empty' : 'Twoja lista życzeń jest pusta'}</h2>
                            <p>
                                {language === 'en'
                                    ? 'Save your favorite items to buy later.'
                                    : 'Zapisz ulubione produkty, aby kupić je później.'}
                            </p>
                            <Link to="/shop" className={styles.shopButton}>
                                <Sparkles size={18} />
                                {language === 'en' ? 'Discover Collection' : 'Odkryj Kolekcję'}
                            </Link>
                        </motion.div>
                    ) : (
                        <>
                            {/* Wishlist Grid */}
                            <div className={styles.grid}>
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.article
                                            key={item.id}
                                            className={styles.wishlistItem}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Remove Button */}
                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeItem(item.id)}
                                                aria-label="Remove from wishlist"
                                            >
                                                <Trash2 size={16} />
                                            </button>

                                            {/* Image */}
                                            <Link to={`/product/${item.id}`} className={styles.itemImage}>
                                                <img
                                                    src={item.image}
                                                    alt={language === 'pl' ? item.namePl : item.name}
                                                />
                                                {item.venusSign && (
                                                    <span className={styles.venusTag}>♀ {item.venusSign}</span>
                                                )}
                                            </Link>

                                            {/* Content */}
                                            <div className={styles.itemContent}>
                                                <span className={styles.category}>
                                                    {language === 'pl' ? item.categoryPl : item.category}
                                                </span>
                                                <Link to={`/product/${item.id}`} className={styles.itemName}>
                                                    {language === 'pl' ? item.namePl : item.name}
                                                </Link>
                                                <div className={styles.priceRow}>
                                                    {item.originalPrice && (
                                                        <span className={styles.originalPrice}>
                                                            {formatPrice(item.originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className={styles.price}>{formatPrice(item.price)}</span>
                                                </div>

                                                {/* Add to Cart */}
                                                <button
                                                    className={styles.addToCartBtn}
                                                    onClick={() => handleMoveToCart(item)}
                                                >
                                                    <ShoppingBag size={16} />
                                                    {language === 'en' ? 'Move to Cart' : 'Przenieś do Koszyka'}
                                                </button>
                                            </div>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Actions */}
                            <div className={styles.actions}>
                                <button className={styles.clearAll} onClick={clearWishlist}>
                                    <Trash2 size={14} />
                                    {language === 'en' ? 'Clear Wishlist' : 'Wyczyść Listę'}
                                </button>
                                <Link to="/shop" className={styles.continueBtn}>
                                    {language === 'en' ? 'Continue Shopping' : 'Kontynuuj Zakupy'}
                                    <ArrowRight size={16} />
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </main>
        </>
    );
}
