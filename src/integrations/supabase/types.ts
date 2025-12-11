/* ===========================================
   SUPABASE DATABASE TYPES
   Auto-generated from database schema
   =========================================== */

export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export type Database = {
    public: {
        Tables: {
            blog_posts: {
                Row: {
                    author: string | null
                    content_en: string | null
                    content_pl: string | null
                    cover_image: string | null
                    created_at: string | null
                    excerpt_en: string | null
                    excerpt_pl: string | null
                    id: string
                    is_featured: boolean | null
                    published_at: string | null
                    reading_time_minutes: number | null
                    slug: string
                    tags: string[] | null
                    title_en: string
                    title_pl: string
                    updated_at: string | null
                    venus_signs: string[] | null
                }
                Insert: {
                    author?: string | null
                    content_en?: string | null
                    content_pl?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    excerpt_en?: string | null
                    excerpt_pl?: string | null
                    id?: string
                    is_featured?: boolean | null
                    published_at?: string | null
                    reading_time_minutes?: number | null
                    slug: string
                    tags?: string[] | null
                    title_en: string
                    title_pl: string
                    updated_at?: string | null
                    venus_signs?: string[] | null
                }
                Update: {
                    author?: string | null
                    content_en?: string | null
                    content_pl?: string | null
                    cover_image?: string | null
                    created_at?: string | null
                    excerpt_en?: string | null
                    excerpt_pl?: string | null
                    id?: string
                    is_featured?: boolean | null
                    published_at?: string | null
                    reading_time_minutes?: number | null
                    slug?: string
                    tags?: string[] | null
                    title_en?: string
                    title_pl?: string
                    updated_at?: string | null
                    venus_signs?: string[] | null
                }
            }
            collections: {
                Row: {
                    created_at: string | null
                    description_en: string | null
                    description_pl: string | null
                    featured_signs: string[] | null
                    gradient_from: string | null
                    gradient_to: string | null
                    hero_image: string | null
                    id: string
                    is_featured: boolean | null
                    name_en: string
                    name_pl: string
                    order_index: number | null
                    slug: string
                    updated_at: string | null
                }
                Insert: {
                    created_at?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    featured_signs?: string[] | null
                    gradient_from?: string | null
                    gradient_to?: string | null
                    hero_image?: string | null
                    id?: string
                    is_featured?: boolean | null
                    name_en: string
                    name_pl: string
                    order_index?: number | null
                    slug: string
                    updated_at?: string | null
                }
                Update: {
                    created_at?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    featured_signs?: string[] | null
                    gradient_from?: string | null
                    gradient_to?: string | null
                    hero_image?: string | null
                    id?: string
                    is_featured?: boolean | null
                    name_en?: string
                    name_pl?: string
                    order_index?: number | null
                    slug?: string
                    updated_at?: string | null
                }
            }
            contact_messages: {
                Row: {
                    created_at: string | null
                    email: string
                    id: string
                    is_read: boolean | null
                    message: string
                    name: string
                    replied_at: string | null
                    subject: string | null
                }
                Insert: {
                    created_at?: string | null
                    email: string
                    id?: string
                    is_read?: boolean | null
                    message: string
                    name: string
                    replied_at?: string | null
                    subject?: string | null
                }
                Update: {
                    created_at?: string | null
                    email?: string
                    id?: string
                    is_read?: boolean | null
                    message?: string
                    name?: string
                    replied_at?: string | null
                    subject?: string | null
                }
            }
            daily_horoscopes: {
                Row: {
                    created_at: string | null
                    date: string
                    horoscope_en: string
                    horoscope_pl: string
                    id: string
                    lucky_color: string | null
                    mood_of_the_day: string | null
                    style_tip_en: string | null
                    style_tip_pl: string | null
                    venus_sign: string
                }
                Insert: {
                    created_at?: string | null
                    date: string
                    horoscope_en: string
                    horoscope_pl: string
                    id?: string
                    lucky_color?: string | null
                    mood_of_the_day?: string | null
                    style_tip_en?: string | null
                    style_tip_pl?: string | null
                    venus_sign: string
                }
                Update: {
                    created_at?: string | null
                    date?: string
                    horoscope_en?: string
                    horoscope_pl?: string
                    id?: string
                    lucky_color?: string | null
                    mood_of_the_day?: string | null
                    style_tip_en?: string | null
                    style_tip_pl?: string | null
                    venus_sign?: string
                }
            }
            lookbooks: {
                Row: {
                    created_at: string | null
                    description_en: string | null
                    description_pl: string | null
                    gallery_images: string[] | null
                    hero_image: string | null
                    id: string
                    is_featured: boolean | null
                    published_at: string | null
                    slug: string
                    title_en: string
                    title_pl: string
                    updated_at: string | null
                    venus_signs: string[] | null
                }
                Insert: {
                    created_at?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    gallery_images?: string[] | null
                    hero_image?: string | null
                    id?: string
                    is_featured?: boolean | null
                    published_at?: string | null
                    slug: string
                    title_en: string
                    title_pl: string
                    updated_at?: string | null
                    venus_signs?: string[] | null
                }
                Update: {
                    created_at?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    gallery_images?: string[] | null
                    hero_image?: string | null
                    id?: string
                    is_featured?: boolean | null
                    published_at?: string | null
                    slug?: string
                    title_en?: string
                    title_pl?: string
                    updated_at?: string | null
                    venus_signs?: string[] | null
                }
            }
            newsletter_subscribers: {
                Row: {
                    email: string
                    id: string
                    is_active: boolean | null
                    preferred_language: string | null
                    subscribed_at: string | null
                    venus_sign: string | null
                }
                Insert: {
                    email: string
                    id?: string
                    is_active?: boolean | null
                    preferred_language?: string | null
                    subscribed_at?: string | null
                    venus_sign?: string | null
                }
                Update: {
                    email?: string
                    id?: string
                    is_active?: boolean | null
                    preferred_language?: string | null
                    subscribed_at?: string | null
                    venus_sign?: string | null
                }
            }
            order_items: {
                Row: {
                    color: string | null
                    created_at: string | null
                    id: string
                    order_id: string | null
                    product_id: string | null
                    product_image: string | null
                    product_name_en: string
                    product_name_pl: string
                    quantity: number
                    size: string | null
                    total_price_pln: number
                    unit_price_pln: number
                }
                Insert: {
                    color?: string | null
                    created_at?: string | null
                    id?: string
                    order_id?: string | null
                    product_id?: string | null
                    product_image?: string | null
                    product_name_en: string
                    product_name_pl: string
                    quantity: number
                    size?: string | null
                    total_price_pln: number
                    unit_price_pln: number
                }
                Update: {
                    color?: string | null
                    created_at?: string | null
                    id?: string
                    order_id?: string | null
                    product_id?: string | null
                    product_image?: string | null
                    product_name_en?: string
                    product_name_pl?: string
                    quantity?: number
                    size?: string | null
                    total_price_pln?: number
                    unit_price_pln?: number
                }
            }
            orders: {
                Row: {
                    billing_address: Json | null
                    created_at: string | null
                    id: string
                    notes: string | null
                    order_number: string
                    shipping_address: Json
                    shipping_cost_pln: number | null
                    shipping_method: string | null
                    status: string | null
                    subtotal_pln: number
                    tax_pln: number | null
                    total_pln: number
                    tracking_number: string | null
                    updated_at: string | null
                    user_id: string | null
                }
                Insert: {
                    billing_address?: Json | null
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    order_number: string
                    shipping_address: Json
                    shipping_cost_pln?: number | null
                    shipping_method?: string | null
                    status?: string | null
                    subtotal_pln: number
                    tax_pln?: number | null
                    total_pln: number
                    tracking_number?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
                Update: {
                    billing_address?: Json | null
                    created_at?: string | null
                    id?: string
                    notes?: string | null
                    order_number?: string
                    shipping_address?: Json
                    shipping_cost_pln?: number | null
                    shipping_method?: string | null
                    status?: string | null
                    subtotal_pln?: number
                    tax_pln?: number | null
                    total_pln?: number
                    tracking_number?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                }
            }
            products: {
                Row: {
                    category: string
                    category_pl: string | null
                    colors: Json | null
                    created_at: string | null
                    currency: string | null
                    description_en: string | null
                    description_pl: string | null
                    id: string
                    images: string[]
                    in_stock: boolean | null
                    is_bestseller: boolean | null
                    is_new: boolean | null
                    is_sale: boolean | null
                    materials: Json | null
                    name_en: string
                    name_pl: string
                    original_price_pln: number | null
                    price_pln: number
                    rating: number | null
                    review_count: number | null
                    sizes: string[] | null
                    slug: string
                    updated_at: string | null
                    venus_sign: string
                }
                Insert: {
                    category: string
                    category_pl?: string | null
                    colors?: Json | null
                    created_at?: string | null
                    currency?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    id?: string
                    images?: string[]
                    in_stock?: boolean | null
                    is_bestseller?: boolean | null
                    is_new?: boolean | null
                    is_sale?: boolean | null
                    materials?: Json | null
                    name_en: string
                    name_pl: string
                    original_price_pln?: number | null
                    price_pln: number
                    rating?: number | null
                    review_count?: number | null
                    sizes?: string[] | null
                    slug: string
                    updated_at?: string | null
                    venus_sign: string
                }
                Update: {
                    category?: string
                    category_pl?: string | null
                    colors?: Json | null
                    created_at?: string | null
                    currency?: string | null
                    description_en?: string | null
                    description_pl?: string | null
                    id?: string
                    images?: string[]
                    in_stock?: boolean | null
                    is_bestseller?: boolean | null
                    is_new?: boolean | null
                    is_sale?: boolean | null
                    materials?: Json | null
                    name_en?: string
                    name_pl?: string
                    original_price_pln?: number | null
                    price_pln?: number
                    rating?: number | null
                    review_count?: number | null
                    sizes?: string[] | null
                    slug?: string
                    updated_at?: string | null
                    venus_sign?: string
                }
            }
            user_profiles: {
                Row: {
                    avatar_url: string | null
                    created_at: string | null
                    date_of_birth: string | null
                    first_name: string | null
                    id: string
                    last_name: string | null
                    phone: string | null
                    preferred_language: string | null
                    rising_sign: string | null
                    sun_sign: string | null
                    updated_at: string | null
                    user_id: string | null
                    venus_sign: string | null
                }
                Insert: {
                    avatar_url?: string | null
                    created_at?: string | null
                    date_of_birth?: string | null
                    first_name?: string | null
                    id?: string
                    last_name?: string | null
                    phone?: string | null
                    preferred_language?: string | null
                    rising_sign?: string | null
                    sun_sign?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    venus_sign?: string | null
                }
                Update: {
                    avatar_url?: string | null
                    created_at?: string | null
                    date_of_birth?: string | null
                    first_name?: string | null
                    id?: string
                    last_name?: string | null
                    phone?: string | null
                    preferred_language?: string | null
                    rising_sign?: string | null
                    sun_sign?: string | null
                    updated_at?: string | null
                    user_id?: string | null
                    venus_sign?: string | null
                }
            }
            wishlist_items: {
                Row: {
                    added_at: string | null
                    id: string
                    product_id: string | null
                    user_id: string | null
                }
                Insert: {
                    added_at?: string | null
                    id?: string
                    product_id?: string | null
                    user_id?: string | null
                }
                Update: {
                    added_at?: string | null
                    id?: string
                    product_id?: string | null
                    user_id?: string | null
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
        CompositeTypes: {
            [_ in never]: never
        }
    }
}

// Helper types for easier use
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row']
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert']
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update']

// Convenience type exports
export type Product = Tables<'products'>
export type Collection = Tables<'collections'>
export type BlogPost = Tables<'blog_posts'>
export type Lookbook = Tables<'lookbooks'>
export type Order = Tables<'orders'>
export type OrderItem = Tables<'order_items'>
export type UserProfile = Tables<'user_profiles'>
export type WishlistItem = Tables<'wishlist_items'>
export type NewsletterSubscriber = Tables<'newsletter_subscribers'>
export type DailyHoroscope = Tables<'daily_horoscopes'>
export type ContactMessage = Tables<'contact_messages'>
