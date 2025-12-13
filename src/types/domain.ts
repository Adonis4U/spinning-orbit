/* ===========================================
   HOUSE OF VENUS - DOMAIN TYPES
   Core TypeScript types for the application
   =========================================== */

// ===========================================
// ZODIAC & ASTROLOGY TYPES
// ===========================================

export type VenusSign =
    | 'aries'
    | 'taurus'
    | 'gemini'
    | 'cancer'
    | 'leo'
    | 'virgo'
    | 'libra'
    | 'scorpio'
    | 'sagittarius'
    | 'capricorn'
    | 'aquarius'
    | 'pisces';

export type Mood =
    | 'romantic'
    | 'bold'
    | 'ethereal'
    | 'dramatic'
    | 'minimalist'
    | 'luxurious'
    | 'bohemian'
    | 'edgy'
    | 'classic'
    | 'playful';

export interface ZodiacSignInfo {
    id: VenusSign;
    name_en: string;
    name_pl: string;
    symbol: string;
    element: 'fire' | 'earth' | 'air' | 'water';
    mood_phrase_en: string;
    mood_phrase_pl: string;
    style_tags: Mood[];
    color_primary: string;
    color_secondary: string;
    date_range: string;
}

export interface VenusProfile {
    venusSign: VenusSign | null;
    ascendingSign?: VenusSign | null;  // Ascendant/Rising sign
    sunSign?: VenusSign | null;
    risingSign?: VenusSign | null;
    dateOfBirth?: string;
    timeOfBirth?: string;
    placeOfBirth?: string;
    latitude?: number;
    longitude?: number;
    lastCalculatedAt?: string;
}

// ===========================================
// PRODUCT TYPES
// ===========================================

export type ProductCategory =
    | 'dress'
    | 'top'
    | 'bottom'
    | 'skirt'
    | 'jacket'
    | 'coat'
    | 'knitwear'
    | 'accessory'
    | 'jewelry'
    | 'bag'
    | 'shoes'
    | 'scarf'
    | 'hat';

export type ProductSize = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'ONE SIZE';

export interface Product {
    id: string;
    name_en: string;
    name_pl: string;
    slug: string;
    description_en: string;
    description_pl: string;
    price_pln: number;
    price_eur: number;
    images: string[];
    category: ProductCategory;
    venus_signs: VenusSign[];
    sun_signs?: VenusSign[];
    rising_signs?: VenusSign[];
    moods: Mood[];
    sizes: ProductSize[];
    colors?: string[];
    fabric?: string;
    care_instructions_en?: string;
    care_instructions_pl?: string;
    in_stock: boolean;
    stock_quantity?: number;
    is_featured: boolean;
    is_new?: boolean;
    is_sale?: boolean;
    sale_price_pln?: number;
    sale_price_eur?: number;
    collection_ids?: string[];
    related_product_ids?: string[];
    complete_the_look_ids?: string[];
    created_at: string;
    updated_at: string;
}

export interface ProductSizeInfo {
    size: string;
    in_stock: boolean;
    quantity?: number;
}

// ===========================================
// COLLECTION TYPES
// ===========================================

export interface Collection {
    id: string;
    slug: string;
    name_en: string;
    name_pl: string;
    description_en: string;
    description_pl: string;
    short_description_en: string;
    short_description_pl: string;
    featured_signs: VenusSign[];
    moods: Mood[];
    hero_image: string;
    gallery_images?: string[];
    gradient_from: string;
    gradient_to: string;
    is_featured: boolean;
    is_seasonal?: boolean;
    season?: 'spring' | 'summer' | 'autumn' | 'winter';
    order_index: number;
    created_at: string;
    updated_at: string;
}

// ===========================================
// LOOKBOOK TYPES
// ===========================================

export interface Lookbook {
    id: string;
    slug: string;
    title_en: string;
    title_pl: string;
    short_description_en: string;
    short_description_pl: string;
    long_description_en?: string;
    long_description_pl?: string;
    venus_signs: VenusSign[];
    moods: Mood[];
    hero_image: string;
    gallery_images: string[];
    product_ids: string[];
    collection_id?: string;
    photographer?: string;
    model?: string;
    location?: string;
    is_featured: boolean;
    published_at: string;
    created_at: string;
    updated_at: string;
}

// ===========================================
// BLOG TYPES
// ===========================================

export interface BlogPost {
    id: string;
    slug: string;
    title_en: string;
    title_pl: string;
    excerpt_en: string;
    excerpt_pl: string;
    content_en: string;
    content_pl: string;
    cover_image: string;
    tags: string[];
    venus_signs?: VenusSign[];
    moods?: Mood[];
    author: string;
    reading_time_minutes: number;
    is_featured: boolean;
    related_product_ids?: string[];
    related_collection_ids?: string[];
    published_at: string;
    created_at: string;
    updated_at: string;
}

// ===========================================
// USER & AUTH TYPES
// ===========================================

export interface User {
    id: string;
    email: string;
    first_name?: string;
    last_name?: string;
    phone?: string;
    avatar_url?: string;
    preferred_language: 'en' | 'pl';
    venus_profile?: VenusProfile;
    is_admin?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Address {
    id: string;
    user_id: string;
    label?: string;
    first_name: string;
    last_name: string;
    street_line_1: string;
    street_line_2?: string;
    city: string;
    state_province?: string;
    postal_code: string;
    country: string;
    phone?: string;
    is_default: boolean;
    created_at: string;
    updated_at: string;
}

// ===========================================
// CART & ORDER TYPES
// ===========================================

export interface CartItem {
    product: Product;
    quantity: number;
    size: ProductSize | string;
    color?: string;
    added_at: string;
}

export interface Cart {
    items: CartItem[];
    subtotal_pln: number;
    subtotal_eur: number;
    total_items: number;
}

export type OrderStatus =
    | 'pending'
    | 'confirmed'
    | 'processing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';

export interface OrderItem {
    product_id: string;
    product_name_en: string;
    product_name_pl: string;
    product_image: string;
    quantity: number;
    size: string;
    color?: string;
    unit_price_pln: number;
    unit_price_eur: number;
    total_price_pln: number;
    total_price_eur: number;
}

export interface Order {
    id: string;
    user_id: string;
    order_number: string;
    status: OrderStatus;
    items: OrderItem[];
    subtotal_pln: number;
    subtotal_eur: number;
    shipping_cost_pln: number;
    shipping_cost_eur: number;
    tax_pln: number;
    tax_eur: number;
    total_pln: number;
    total_eur: number;
    shipping_address: Address;
    billing_address?: Address;
    shipping_method?: string;
    tracking_number?: string;
    notes?: string;
    created_at: string;
    updated_at: string;
}

// ===========================================
// WISHLIST TYPES
// ===========================================

export interface WishlistItem {
    product: Product;
    added_at: string;
}

// ===========================================
// NEWSLETTER & CONTACT TYPES
// ===========================================

export interface NewsletterSubscriber {
    id: string;
    email: string;
    venus_sign?: VenusSign;
    preferred_language: 'en' | 'pl';
    subscribed_at: string;
    is_active: boolean;
}

export interface ContactMessage {
    id: string;
    name: string;
    email: string;
    subject: string;
    message: string;
    created_at: string;
    is_read: boolean;
    replied_at?: string;
}

// ===========================================
// DAILY HOROSCOPE TYPES
// ===========================================

export interface DailyHoroscope {
    id: string;
    venus_sign: VenusSign;
    date: string;
    horoscope_en: string;
    horoscope_pl: string;
    style_tip_en: string;
    style_tip_pl: string;
    lucky_color: string;
    mood_of_the_day: Mood;
    featured_product_id?: string;
}

// ===========================================
// VENUS COMPATIBILITY TYPES
// ===========================================

export type CompatibilityLevel = 'high' | 'medium' | 'low';

export interface VenusCompatibility {
    sign_1: VenusSign;
    sign_2: VenusSign;
    compatibility_level: CompatibilityLevel;
    description_en: string;
    description_pl: string;
    gift_suggestions_en: string[];
    gift_suggestions_pl: string[];
}

// ===========================================
// SEO TYPES
// ===========================================

export interface SEOData {
    title: string;
    description: string;
    og_title?: string;
    og_description?: string;
    og_image?: string;
    canonical_url?: string;
    keywords?: string[];
}

// ===========================================
// API RESPONSE TYPES
// ===========================================

export interface ApiResponse<T> {
    data: T;
    error: string | null;
    status: 'success' | 'error';
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    per_page: number;
    total_pages: number;
}

// ===========================================
// FILTER & SORT TYPES
// ===========================================

export interface ProductFilters {
    venus_signs?: VenusSign[];
    categories?: ProductCategory[];
    moods?: Mood[];
    price_min?: number;
    price_max?: number;
    sizes?: (ProductSize | string)[];
    in_stock_only?: boolean;
    is_sale?: boolean;
    is_new?: boolean;
    collection_id?: string;
}

export type ProductSortBy =
    | 'best_match'
    | 'newest'
    | 'price_asc'
    | 'price_desc'
    | 'name_asc'
    | 'name_desc';
