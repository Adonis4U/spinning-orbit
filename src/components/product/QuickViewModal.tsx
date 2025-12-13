/* ===========================================
   QUICK VIEW MODAL COMPONENT
   Product preview modal with gallery and actions
   =========================================== */

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Heart, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { useCartStore, useWishlistStore, useIsInWishlist } from '../../stores';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { ZodiacIcon } from '../common';
import styles from './QuickViewModal.module.css';

interface QuickViewModalProps {
    isOpen: boolean;
    onClose: () => void;
    product: {
        id: string;
        name: string;
        namePl?: string;
        price: number;
        originalPrice?: number;
        currency?: 'PLN' | 'EUR';
        images?: string[];
        category?: string;
        categoryPl?: string;
        description?: string;
        descriptionPl?: string;
        venusSign?: string;
        isNew?: boolean;
        isSale?: boolean;
        rating?: number;
        reviewCount?: number;
        sizes?: string[];
    } | null;
}

const AVAILABLE_SIZES = ['XS', 'S', 'M', 'L', 'XL'];

export default function QuickViewModal({ isOpen, onClose, product }: QuickViewModalProps) {
    const { language } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);

    // Store hooks
    const addToCart = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isWishlisted = useIsInWishlist(product?.id || '');

    // Reset state when modal opens with new product
    useEffect(() => {
        if (isOpen) {
            setCurrentImageIndex(0);
            setSelectedSize(null);
        }
    }, [isOpen, product?.id]);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleKeyDown);
            document.body.style.overflow = 'hidden';
        }

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
            document.body.style.overflow = '';
        };
    }, [isOpen, onClose]);

    if (!product) return null;

    const displayName = language === 'pl' && product.namePl ? product.namePl : product.name;
    const displayCategory = language === 'pl' && product.categoryPl ? product.categoryPl : product.category;
    const displayDescription = language === 'pl' && product.descriptionPl ? product.descriptionPl : product.description;
    const currency = product.currency || 'PLN';
    const currencySymbol = currency === 'PLN' ? 'zł' : '€';
    const discount = product.originalPrice ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

    const images = product.images && product.images.length > 0
        ? product.images
        : ['https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop'];

    const currentImage = images[currentImageIndex] || images[0];

    const zodiacData = product.venusSign
        ? ZODIAC_SIGNS[product.venusSign.toLowerCase() as keyof typeof ZODIAC_SIGNS]
        : null;

    const sizes = product.sizes || AVAILABLE_SIZES;

    const handleAddToCart = () => {
        addToCart({
            id: product.id,
            name: product.name,
            namePl: product.namePl || product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: images[0],
            venusSign: product.venusSign,
            size: selectedSize || undefined,
        });
        onClose();
    };

    const handleWishlist = () => {
        toggleWishlist({
            id: product.id,
            name: product.name,
            namePl: product.namePl || product.name,
            price: product.price,
            originalPrice: product.originalPrice,
            image: images[0],
            category: product.category || '',
            categoryPl: product.categoryPl || '',
            venusSign: product.venusSign,
        });
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className={styles.overlay}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleOverlayClick}
                >
                    <motion.div
                        className={styles.modal}
                        initial={{ opacity: 0, scale: 0.95, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 20 }}
                        transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                    >
                        {/* Close Button */}
                        <button
                            className={styles.closeButton}
                            onClick={onClose}
                            aria-label="Close modal"
                        >
                            <X size={18} />
                        </button>

                        {/* Image Section */}
                        <div className={styles.imageSection}>
                            <motion.img
                                key={currentImageIndex}
                                src={currentImage}
                                alt={displayName}
                                className={styles.mainImage}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.3 }}
                            />

                            {/* Badges */}
                            <div className={styles.badges}>
                                {product.isNew && (
                                    <span className={`${styles.badge} ${styles.badgeNew}`}>
                                        {language === 'en' ? 'New' : 'Nowość'}
                                    </span>
                                )}
                                {product.isSale && discount > 0 && (
                                    <span className={`${styles.badge} ${styles.badgeSale}`}>
                                        -{discount}%
                                    </span>
                                )}
                                {zodiacData && (
                                    <span className={`${styles.badge} ${styles.badgeSign}`}>
                                        <ZodiacIcon sign={product.venusSign} size={12} />
                                        {language === 'en' ? zodiacData.name_en : zodiacData.name_pl}
                                    </span>
                                )}
                            </div>

                            {/* Thumbnails */}
                            {images.length > 1 && (
                                <div className={styles.thumbnails}>
                                    {images.slice(0, 4).map((img, i) => (
                                        <button
                                            key={i}
                                            className={`${styles.thumbnail} ${i === currentImageIndex ? styles.active : ''}`}
                                            onClick={() => setCurrentImageIndex(i)}
                                        >
                                            <img src={img} alt={`${displayName} ${i + 1}`} />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Content Section */}
                        <div className={styles.content}>
                            {displayCategory && (
                                <span className={styles.category}>{displayCategory}</span>
                            )}

                            <h2 className={styles.name}>{displayName}</h2>

                            {/* Price */}
                            <div className={styles.priceRow}>
                                <span className={`${styles.price} ${product.originalPrice ? styles.sale : ''}`}>
                                    {(product.price ?? 0).toFixed(0)} {currencySymbol}
                                </span>
                                {product.originalPrice && (
                                    <span className={styles.originalPrice}>
                                        {(product.originalPrice ?? 0).toFixed(0)} {currencySymbol}
                                    </span>
                                )}
                            </div>

                            {/* Rating */}
                            {product.rating && (
                                <div className={styles.rating}>
                                    <Star size={14} fill="currentColor" />
                                    <span>{(product.rating ?? 0).toFixed(1)}</span>
                                    {product.reviewCount && (
                                        <span className={styles.reviewCount}>
                                            ({product.reviewCount} {language === 'en' ? 'reviews' : 'recenzji'})
                                        </span>
                                    )}
                                </div>
                            )}

                            {/* Venus Sign */}
                            {zodiacData && (
                                <div className={styles.venusSign}>
                                    <Sparkles size={16} className={styles.venusIcon} />
                                    <span className={styles.venusText}>
                                        <span className={styles.venusLabel}>
                                            {language === 'en' ? 'Perfect for Venus in ' : 'Idealne dla Wenus w '}
                                        </span>
                                        <span className={styles.venusName}>
                                            {language === 'en' ? zodiacData.name_en : zodiacData.name_pl}
                                        </span>
                                    </span>
                                </div>
                            )}

                            {/* Description */}
                            {displayDescription && (
                                <p className={styles.description}>{displayDescription}</p>
                            )}

                            {/* Size Selector */}
                            <div className={styles.sizeSection}>
                                <span className={styles.sizeLabel}>
                                    {language === 'en' ? 'Select Size' : 'Wybierz Rozmiar'}
                                </span>
                                <div className={styles.sizes}>
                                    {sizes.map((size) => (
                                        <button
                                            key={size}
                                            className={`${styles.sizeButton} ${selectedSize === size ? styles.selected : ''}`}
                                            onClick={() => setSelectedSize(size)}
                                        >
                                            {size}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className={styles.actions}>
                                <motion.button
                                    className={styles.addToCart}
                                    onClick={handleAddToCart}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <ShoppingBag size={18} />
                                    {language === 'en' ? 'Add to Bag' : 'Dodaj do koszyka'}
                                </motion.button>

                                <motion.button
                                    className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
                                    onClick={handleWishlist}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                                >
                                    <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                                </motion.button>
                            </div>

                            {/* View Full Details */}
                            <Link
                                to={`/product/${product.id}`}
                                className={styles.viewDetails}
                                onClick={onClose}
                            >
                                {language === 'en' ? 'View Full Details' : 'Zobacz Pełne Szczegóły'}
                                <ArrowRight size={14} />
                            </Link>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
