/* ===========================================
   PRODUCT CARD COMPONENT
   Reusable product card with hover effects
   =========================================== */

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, ShoppingBag, Eye, Star } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { ZodiacIcon } from '../common';
import { useCartStore, useWishlistStore, useIsInWishlist } from '../../stores';
import styles from './ProductCard.module.css';

export interface ProductCardProps {
    id: string;
    name: string;
    namePl?: string;
    price: number;
    originalPrice?: number;
    currency?: 'PLN' | 'EUR';
    images?: string[];
    category?: string;
    venusSign?: string;
    isNew?: boolean;
    isSale?: boolean;
    rating?: number;
    reviewCount?: number;
}

export default function ProductCard({
    id,
    name,
    namePl,
    price,
    originalPrice,
    currency = 'PLN',
    images = [],
    category,
    venusSign,
    isNew,
    isSale,
    rating,
    reviewCount,
}: ProductCardProps) {
    const { language } = useTranslation();
    const [isHovered, setIsHovered] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    // Store hooks
    const addToCart = useCartStore((state) => state.addItem);
    const toggleWishlist = useWishlistStore((state) => state.toggleItem);
    const isWishlisted = useIsInWishlist(id);

    const displayName = language === 'pl' && namePl ? namePl : name;
    const currencySymbol = currency === 'PLN' ? 'zł' : '€';
    const discount = originalPrice ? Math.round((1 - price / originalPrice) * 100) : 0;

    // Safe image access - always provide a fallback
    const safeImages = images && images.length > 0 ? images : [];
    const currentImage = safeImages[currentImageIndex] || 'https://images.unsplash.com/photo-1558171813-4c088753af8f?w=600&h=800&fit=crop';
    const hasMultipleImages = safeImages.length > 1;

    // Get zodiac symbol for Venus sign badge
    const zodiacData = venusSign ? ZODIAC_SIGNS[venusSign.toLowerCase() as keyof typeof ZODIAC_SIGNS] : null;

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        toggleWishlist({
            id,
            name,
            namePl: namePl || name,
            price,
            originalPrice,
            image: safeImages[0] || currentImage,
            category: category || '',
            categoryPl: category || '',
            venusSign,
        });
    };

    const handleQuickView = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        console.log('Quick view:', id);
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        addToCart({
            id,
            name,
            namePl: namePl || name,
            price,
            originalPrice,
            image: safeImages[0] || currentImage,
            venusSign,
        });
    };

    return (
        <motion.article
            className={styles.card}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => {
                setIsHovered(false);
                setCurrentImageIndex(0);
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
        >
            <Link to={`/product/${id}`} className={styles.link}>
                {/* Image Container */}
                <div className={styles.imageContainer}>
                    {/* Main Image */}
                    <img
                        src={currentImage}
                        alt={displayName}
                        className={styles.image}
                        loading="lazy"
                    />

                    {/* Second Image on Hover */}
                    {hasMultipleImages && isHovered && (
                        <motion.img
                            src={safeImages[1]}
                            alt={`${displayName} - alternate view`}
                            className={styles.imageHover}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.3 }}
                        />
                    )}

                    {/* Badges */}
                    <div className={styles.badges}>
                        {isNew && (
                            <span className={styles.badgeNew}>
                                {language === 'en' ? 'New' : 'Nowość'}
                            </span>
                        )}
                        {isSale && discount > 0 && (
                            <span className={styles.badgeSale}>
                                -{discount}%
                            </span>
                        )}
                        {zodiacData && (
                            <span className={styles.badgeSign}>
                                <ZodiacIcon sign={venusSign} size={12} className={styles.badgeSignSymbol} />
                                {language === 'en' ? zodiacData.name_en : zodiacData.name_pl}
                            </span>
                        )}
                    </div>

                    {/* Wishlist Button */}
                    <motion.button
                        className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
                        onClick={handleWishlist}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
                    >
                        <Heart size={18} fill={isWishlisted ? 'currentColor' : 'none'} />
                    </motion.button>

                    {/* Quick Actions */}
                    <motion.div
                        className={styles.quickActions}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 10 }}
                        transition={{ duration: 0.2 }}
                    >
                        <button className={styles.quickActionPrimary} onClick={handleAddToCart}>
                            <ShoppingBag size={16} />
                            <span>{language === 'en' ? 'Add to Bag' : 'Dodaj'}</span>
                        </button>
                        <button className={styles.quickActionSecondary} onClick={handleQuickView}>
                            <Eye size={16} />
                        </button>
                    </motion.div>

                    {/* Image Dots (for multiple images) */}
                    {hasMultipleImages && (
                        <div className={styles.imageDots}>
                            {safeImages.slice(0, 4).map((_, i) => (
                                <button
                                    key={i}
                                    className={`${styles.imageDot} ${i === currentImageIndex ? styles.active : ''}`}
                                    onMouseEnter={() => setCurrentImageIndex(i)}
                                    aria-label={`View image ${i + 1}`}
                                />
                            ))}
                        </div>
                    )}
                </div>

                {/* Content */}
                <div className={styles.content}>
                    {category && (
                        <span className={styles.category}>{category}</span>
                    )}

                    <h3 className={styles.name}>{displayName}</h3>

                    {rating && (
                        <div className={styles.rating}>
                            <Star size={12} fill="currentColor" />
                            <span>{rating.toFixed(1)}</span>
                            {reviewCount && <span className={styles.reviewCount}>({reviewCount})</span>}
                        </div>
                    )}

                    <div className={styles.priceContainer}>
                        <span className={`${styles.price} ${originalPrice ? styles.salePrice : ''}`}>
                            {price.toFixed(0)} {currencySymbol}
                        </span>
                        {originalPrice && (
                            <span className={styles.originalPrice}>
                                {originalPrice.toFixed(0)} {currencySymbol}
                            </span>
                        )}
                    </div>
                </div>
            </Link>
        </motion.article>
    );
}
