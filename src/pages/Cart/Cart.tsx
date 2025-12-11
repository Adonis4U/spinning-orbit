/* ===========================================
   CART PAGE
   Shopping cart with item management
   =========================================== */

import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Sparkles } from 'lucide-react';
import { useTranslation } from '../../contexts';
import { useCartStore, useCartSubtotal, useCartItemCount } from '../../stores';
import styles from './Cart.module.css';

export default function Cart() {
    const { language } = useTranslation();
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem);
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const clearCart = useCartStore((state) => state.clearCart);
    const subtotal = useCartSubtotal();
    const itemCount = useCartItemCount();

    const formatPrice = (price: number) => `${price.toFixed(0)} zł`;

    const isEmpty = items.length === 0;

    return (
        <>
            <Helmet>
                <title>{language === 'en' ? 'Shopping Cart' : 'Koszyk'} | House of Venus</title>
            </Helmet>

            <main className={styles.page}>
                <div className={styles.container}>
                    {/* Header */}
                    <header className={styles.header}>
                        <h1 className={styles.title}>
                            <ShoppingBag size={28} />
                            {language === 'en' ? 'Shopping Cart' : 'Koszyk'}
                        </h1>
                        {!isEmpty && (
                            <span className={styles.itemCount}>
                                {itemCount} {language === 'en' ? 'items' : 'produktów'}
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
                                <ShoppingBag size={64} strokeWidth={1} />
                            </div>
                            <h2>{language === 'en' ? 'Your cart is empty' : 'Twój koszyk jest pusty'}</h2>
                            <p>
                                {language === 'en'
                                    ? 'Looks like you haven\'t added anything to your cart yet.'
                                    : 'Wygląda na to, że jeszcze nic nie dodałeś do koszyka.'}
                            </p>
                            <Link to="/shop" className={styles.shopButton}>
                                <Sparkles size={18} />
                                {language === 'en' ? 'Explore Collection' : 'Przeglądaj Kolekcję'}
                            </Link>
                        </motion.div>
                    ) : (
                        /* Cart Content */
                        <div className={styles.content}>
                            {/* Cart Items */}
                            <section className={styles.itemsSection}>
                                <AnimatePresence mode="popLayout">
                                    {items.map((item) => (
                                        <motion.article
                                            key={`${item.id}-${item.size}-${item.color}`}
                                            className={styles.cartItem}
                                            layout
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20, height: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            {/* Image */}
                                            <Link to={`/product/${item.id}`} className={styles.itemImage}>
                                                <img src={item.image} alt={language === 'pl' ? item.namePl : item.name} />
                                            </Link>

                                            {/* Details */}
                                            <div className={styles.itemDetails}>
                                                <Link to={`/product/${item.id}`} className={styles.itemName}>
                                                    {language === 'pl' ? item.namePl : item.name}
                                                </Link>

                                                <div className={styles.itemMeta}>
                                                    {item.size && (
                                                        <span>{language === 'en' ? 'Size' : 'Rozmiar'}: {item.size}</span>
                                                    )}
                                                    {item.color && (
                                                        <span>{language === 'en' ? 'Color' : 'Kolor'}: {item.color}</span>
                                                    )}
                                                    {item.venusSign && (
                                                        <span className={styles.venusTag}>♀ {item.venusSign}</span>
                                                    )}
                                                </div>

                                                {/* Price (mobile) */}
                                                <div className={styles.itemPriceMobile}>
                                                    {item.originalPrice && (
                                                        <span className={styles.originalPrice}>
                                                            {formatPrice(item.originalPrice)}
                                                        </span>
                                                    )}
                                                    <span className={styles.price}>{formatPrice(item.price)}</span>
                                                </div>
                                            </div>

                                            {/* Quantity */}
                                            <div className={styles.quantityControl}>
                                                <button
                                                    className={styles.quantityBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1, item.size, item.color)}
                                                    aria-label="Decrease quantity"
                                                >
                                                    <Minus size={14} />
                                                </button>
                                                <span className={styles.quantity}>{item.quantity}</span>
                                                <button
                                                    className={styles.quantityBtn}
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1, item.size, item.color)}
                                                    aria-label="Increase quantity"
                                                >
                                                    <Plus size={14} />
                                                </button>
                                            </div>

                                            {/* Price (desktop) */}
                                            <div className={styles.itemPriceDesktop}>
                                                {item.originalPrice && (
                                                    <span className={styles.originalPrice}>
                                                        {formatPrice(item.originalPrice * item.quantity)}
                                                    </span>
                                                )}
                                                <span className={styles.price}>
                                                    {formatPrice(item.price * item.quantity)}
                                                </span>
                                            </div>

                                            {/* Remove */}
                                            <button
                                                className={styles.removeBtn}
                                                onClick={() => removeItem(item.id, item.size, item.color)}
                                                aria-label="Remove item"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </motion.article>
                                    ))}
                                </AnimatePresence>

                                {/* Clear Cart */}
                                <button className={styles.clearCart} onClick={clearCart}>
                                    <Trash2 size={14} />
                                    {language === 'en' ? 'Clear Cart' : 'Wyczyść Koszyk'}
                                </button>
                            </section>

                            {/* Order Summary */}
                            <aside className={styles.summary}>
                                <div className={styles.summaryCard}>
                                    <h2 className={styles.summaryTitle}>
                                        {language === 'en' ? 'Order Summary' : 'Podsumowanie'}
                                    </h2>

                                    <div className={styles.summaryRows}>
                                        <div className={styles.summaryRow}>
                                            <span>{language === 'en' ? 'Subtotal' : 'Suma częściowa'}</span>
                                            <span>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div className={styles.summaryRow}>
                                            <span>{language === 'en' ? 'Shipping' : 'Wysyłka'}</span>
                                            <span className={styles.shippingNote}>
                                                {language === 'en' ? 'Calculated at checkout' : 'Obliczana przy kasie'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className={styles.summaryTotal}>
                                        <span>{language === 'en' ? 'Total' : 'Razem'}</span>
                                        <span>{formatPrice(subtotal)}</span>
                                    </div>

                                    <Link to="/checkout" className={styles.checkoutBtn}>
                                        {language === 'en' ? 'Proceed to Checkout' : 'Przejdź do Kasy'}
                                        <ArrowRight size={18} />
                                    </Link>

                                    <div className={styles.paymentMethods}>
                                        <span>{language === 'en' ? 'We accept' : 'Akceptujemy'}:</span>
                                        <div className={styles.paymentIcons}>
                                            <span>💳</span>
                                            <span>🍎</span>
                                            <span>🅿️</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Continue Shopping */}
                                <Link to="/shop" className={styles.continueLink}>
                                    {language === 'en' ? '← Continue Shopping' : '← Kontynuuj Zakupy'}
                                </Link>
                            </aside>
                        </div>
                    )}
                </div>
            </main>
        </>
    );
}
