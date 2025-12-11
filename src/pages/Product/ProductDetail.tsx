/* ===========================================
   PRODUCT DETAIL PAGE
   Full product page with gallery and details
   =========================================== */

import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Heart, ShoppingBag, Share2, Ruler, ChevronLeft, ChevronRight,
    Star, Truck, Shield, RotateCcw, Plus, Minus, Check, Loader2
} from 'lucide-react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from '../../contexts';
import { ZODIAC_SIGNS } from '../../constants/zodiac';
import { useProducts } from '../../hooks';
import { useCartStore } from '../../stores/cartStore';
import { useWishlistStore } from '../../stores/wishlistStore';
import ProductCard from '../../components/product/ProductCard';
import styles from './ProductDetail.module.css';

export default function ProductDetail() {
    const { id } = useParams();
    const { t, language } = useTranslation();
    const { products, loading, error } = useProducts();
    const addToCart = useCartStore(state => state.addItem);
    const { items: wishlistItems, addItem: addToWishlist, removeItem: removeFromWishlist } = useWishlistStore();

    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedSize, setSelectedSize] = useState<string | null>(null);
    const [selectedColor, setSelectedColor] = useState<{ name: string; namePl: string; hex: string } | null>(null);
    const [quantity, setQuantity] = useState(1);
    const [activeTab, setActiveTab] = useState<'description' | 'materials' | 'care'>('description');

    // Find the product by slug or id
    const product = products.find(p => p.slug === id || p.id === id);
    const isWishlisted = product ? wishlistItems.some(item => item.id === product.id) : false;

    // Set default color when product loads
    useEffect(() => {
        if (product?.colors && product.colors.length > 0 && !selectedColor) {
            setSelectedColor(product.colors[0]);
        }
    }, [product, selectedColor]);

    // Get related products (same venus sign or category)
    const relatedProducts = products
        .filter(p => p.id !== product?.id && (p.venus_sign === product?.venus_sign || p.category === product?.category))
        .slice(0, 3);

    if (loading) {
        return (
            <main className={styles.page}>
                <div className={styles.loadingState}>
                    <Loader2 size={32} className={styles.spinner} />
                    <p>{language === 'en' ? 'Loading product...' : 'Ładowanie produktu...'}</p>
                </div>
            </main>
        );
    }

    if (error || !product) {
        return (
            <main className={styles.page}>
                <div className={styles.errorState}>
                    <h2>{language === 'en' ? 'Product not found' : 'Produkt nie znaleziony'}</h2>
                    <Link to="/shop" className={styles.backButton}>
                        {language === 'en' ? 'Back to Shop' : 'Wróć do Sklepu'}
                    </Link>
                </div>
            </main>
        );
    }

    const displayName = language === 'pl' ? product.name_pl : product.name_en;
    const zodiacData = ZODIAC_SIGNS[product.venus_sign as keyof typeof ZODIAC_SIGNS];
    const discount = product.original_price_pln
        ? Math.round((1 - product.price_pln / product.original_price_pln) * 100)
        : 0;

    const images = product.images?.length > 0
        ? product.images
        : ['https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop'];

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? images.length - 1 : prev - 1
        );
    };

    const handleAddToBag = () => {
        if (!selectedSize) {
            alert(language === 'en' ? 'Please select a size' : 'Proszę wybrać rozmiar');
            return;
        }
        addToCart({
            id: product.id,
            name: displayName,
            namePl: product.name_pl,
            price: product.price_pln,
            image: images[0],
            size: selectedSize,
            color: selectedColor?.name || '',
        }, quantity);
    };

    const handleWishlistToggle = () => {
        if (isWishlisted) {
            removeFromWishlist(product.id);
        } else {
            addToWishlist({
                id: product.id,
                name: displayName,
                namePl: product.name_pl,
                price: product.price_pln,
                image: images[0],
                category: product.category,
                categoryPl: product.category_pl || product.category,
                venusSign: product.venus_sign
            });
        }
    };

    const materials = product.materials_en ? (language === 'pl' ? product.materials_pl : product.materials_en) || [] : [];
    const colors = product.colors || [];
    const sizes = product.sizes || ['XS', 'S', 'M', 'L', 'XL'];

    return (
        <>
            <Helmet>
                <title>{displayName} | House of Venus</title>
                <meta name="description" content={language === 'pl' ? product.description_pl || '' : product.description_en || ''} />
            </Helmet>

            <main className={styles.page}>
                {/* Breadcrumb */}
                <nav className={styles.breadcrumb}>
                    <Link to="/">{language === 'en' ? 'Home' : 'Start'}</Link>
                    <span>/</span>
                    <Link to="/shop">{t('shop.title')}</Link>
                    <span>/</span>
                    <span>{displayName}</span>
                </nav>

                {/* Product Section */}
                <section className={styles.productSection}>
                    {/* Gallery */}
                    <div className={styles.gallery}>
                        <div className={styles.mainImage}>
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={currentImageIndex}
                                    src={images[currentImageIndex]}
                                    alt={displayName}
                                    className={styles.image}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                />
                            </AnimatePresence>

                            {/* Navigation */}
                            {images.length > 1 && (
                                <>
                                    <button className={styles.navButton} onClick={prevImage} aria-label="Previous image">
                                        <ChevronLeft size={24} />
                                    </button>
                                    <button className={`${styles.navButton} ${styles.navRight}`} onClick={nextImage} aria-label="Next image">
                                        <ChevronRight size={24} />
                                    </button>
                                </>
                            )}

                            {/* Badges */}
                            <div className={styles.badges}>
                                {discount > 0 && <span className={styles.badgeSale}>-{discount}%</span>}
                                {zodiacData && (
                                    <span className={styles.badgeSign}>
                                        {zodiacData.symbol} {language === 'en'
                                            ? `Venus in ${zodiacData.name_en}`
                                            : `Wenus w ${zodiacData.name_pl}`
                                        }
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* Thumbnails */}
                        {images.length > 1 && (
                            <div className={styles.thumbnails}>
                                {images.map((img, i) => (
                                    <button
                                        key={i}
                                        className={`${styles.thumbnail} ${i === currentImageIndex ? styles.active : ''}`}
                                        onClick={() => setCurrentImageIndex(i)}
                                    >
                                        <img src={img} alt={`${displayName} view ${i + 1}`} />
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Details */}
                    <div className={styles.details}>
                        <span className={styles.category}>{product.category}</span>
                        <h1 className={styles.productName}>{displayName}</h1>

                        {/* Rating */}
                        <div className={styles.rating}>
                            <Star size={16} fill="currentColor" />
                            <span>{product.rating}</span>
                            <span className={styles.reviewCount}>({product.review_count} {language === 'en' ? 'reviews' : 'opinii'})</span>
                        </div>

                        {/* Price */}
                        <div className={styles.priceBlock}>
                            <span className={styles.price}>{product.price_pln} zł</span>
                            {product.original_price_pln && (
                                <span className={styles.originalPrice}>{product.original_price_pln} zł</span>
                            )}
                        </div>

                        {/* Description Tabs */}
                        <div className={styles.tabs}>
                            <button
                                className={`${styles.tab} ${activeTab === 'description' ? styles.active : ''}`}
                                onClick={() => setActiveTab('description')}
                            >
                                {language === 'en' ? 'Description' : 'Opis'}
                            </button>
                            {materials.length > 0 && (
                                <button
                                    className={`${styles.tab} ${activeTab === 'materials' ? styles.active : ''}`}
                                    onClick={() => setActiveTab('materials')}
                                >
                                    {language === 'en' ? 'Materials' : 'Materiały'}
                                </button>
                            )}
                        </div>

                        <div className={styles.tabContent}>
                            {activeTab === 'description' && (
                                <p>{language === 'pl' ? product.description_pl : product.description_en}</p>
                            )}
                            {activeTab === 'materials' && materials.length > 0 && (
                                <ul>
                                    {materials.map((m, i) => (
                                        <li key={i}>{m}</li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        {/* Color Selection */}
                        {colors.length > 0 && (
                            <div className={styles.optionGroup}>
                                <div className={styles.optionHeader}>
                                    <span className={styles.optionLabel}>{language === 'en' ? 'Color' : 'Kolor'}</span>
                                    <span className={styles.optionValue}>
                                        {selectedColor && (language === 'en' ? selectedColor.name : selectedColor.namePl)}
                                    </span>
                                </div>
                                <div className={styles.colorOptions}>
                                    {colors.map((color) => (
                                        <button
                                            key={color.hex}
                                            className={`${styles.colorOption} ${selectedColor?.hex === color.hex ? styles.active : ''}`}
                                            onClick={() => setSelectedColor(color)}
                                            style={{ backgroundColor: color.hex }}
                                            aria-label={color.name}
                                        >
                                            {selectedColor?.hex === color.hex && <Check size={14} />}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Size Selection */}
                        <div className={styles.optionGroup}>
                            <div className={styles.optionHeader}>
                                <span className={styles.optionLabel}>{language === 'en' ? 'Size' : 'Rozmiar'}</span>
                                <button className={styles.sizeGuideButton}>
                                    <Ruler size={14} />
                                    {language === 'en' ? 'Size Guide' : 'Tabela Rozmiarów'}
                                </button>
                            </div>
                            <div className={styles.sizeOptions}>
                                {sizes.map((size) => (
                                    <button
                                        key={size}
                                        className={`${styles.sizeOption} ${selectedSize === size ? styles.active : ''}`}
                                        onClick={() => setSelectedSize(size)}
                                    >
                                        {size}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Quantity */}
                        <div className={styles.optionGroup}>
                            <span className={styles.optionLabel}>{language === 'en' ? 'Quantity' : 'Ilość'}</span>
                            <div className={styles.quantitySelector}>
                                <button onClick={() => setQuantity(Math.max(1, quantity - 1))}>
                                    <Minus size={16} />
                                </button>
                                <span>{quantity}</span>
                                <button onClick={() => setQuantity(quantity + 1)}>
                                    <Plus size={16} />
                                </button>
                            </div>
                        </div>

                        {/* Actions */}
                        <div className={styles.actions}>
                            <motion.button
                                className={styles.addToBag}
                                onClick={handleAddToBag}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingBag size={18} />
                                {language === 'en' ? 'Add to Bag' : 'Dodaj do Koszyka'}
                            </motion.button>
                            <button
                                className={`${styles.wishlistButton} ${isWishlisted ? styles.wishlisted : ''}`}
                                onClick={handleWishlistToggle}
                            >
                                <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
                            </button>
                            <button className={styles.shareButton}>
                                <Share2 size={20} />
                            </button>
                        </div>

                        {/* Benefits */}
                        <div className={styles.benefits}>
                            <div className={styles.benefit}>
                                <Truck size={18} />
                                <span>{language === 'en' ? 'Free shipping over 300 zł' : 'Darmowa dostawa od 300 zł'}</span>
                            </div>
                            <div className={styles.benefit}>
                                <RotateCcw size={18} />
                                <span>{language === 'en' ? '14 days return' : '14 dni na zwrot'}</span>
                            </div>
                            <div className={styles.benefit}>
                                <Shield size={18} />
                                <span>{language === 'en' ? 'Secure payment' : 'Bezpieczna płatność'}</span>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Complete the Look */}
                {relatedProducts.length > 0 && (
                    <section className={styles.relatedSection}>
                        <h2 className={styles.sectionTitle}>
                            {language === 'en' ? 'Complete the Look' : 'Dopełnij Stylizację'}
                        </h2>
                        <div className={styles.relatedGrid}>
                            {relatedProducts.map((p) => (
                                <ProductCard
                                    key={p.id}
                                    id={p.id}
                                    name={language === 'pl' ? p.name_pl : p.name_en}
                                    namePl={p.name_pl}
                                    price={p.price_pln}
                                    originalPrice={p.original_price_pln || undefined}
                                    images={p.images || []}
                                    category={p.category}
                                    venusSign={p.venus_sign}
                                    isNew={p.is_new}
                                    isSale={p.is_sale}
                                />
                            ))}
                        </div>
                    </section>
                )}
            </main>
        </>
    );
}
