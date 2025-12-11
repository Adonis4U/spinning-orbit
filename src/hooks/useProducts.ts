/* ===========================================
   USE PRODUCTS HOOK
   Fetch products from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export interface Product {
    id: string;
    name_en: string;
    name_pl: string;
    slug: string;
    description_en: string | null;
    description_pl: string | null;
    price_pln: number;
    original_price_pln: number | null;
    currency: string;
    images: string[];
    category: string;
    category_pl: string | null;
    venus_sign: string;
    is_new: boolean;
    is_sale: boolean;
    is_bestseller: boolean;
    rating: number;
    review_count: number;
    colors: { name: string; namePl: string; hex: string }[] | null;
    sizes: string[] | null;
    materials_en: string[] | null;
    materials_pl: string[] | null;
    sku: string | null;
}

interface UseProductsOptions {
    id?: string;
    slug?: string;
    venusSign?: string;
    category?: string;
    featured?: boolean;
    limit?: number;
}

interface UseProductsResult {
    products: Product[];
    product: Product | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useProducts(options: UseProductsOptions = {}): UseProductsResult {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase.from('products').select('*');

            // Apply filters
            if (options.id) {
                query = query.eq('id', options.id);
            }
            if (options.slug) {
                query = query.eq('slug', options.slug);
            }
            if (options.venusSign) {
                query = query.eq('venus_sign', options.venusSign.toLowerCase());
            }
            if (options.category) {
                query = query.eq('category', options.category);
            }
            if (options.featured) {
                query = query.or('is_new.eq.true,is_bestseller.eq.true');
            }
            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: queryError } = await query;

            if (queryError) throw queryError;
            setProducts((data as Product[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [options.id, options.slug, options.venusSign, options.category, options.featured, options.limit]);

    return {
        products,
        product: products[0] || null,
        loading,
        error,
        refetch: fetchProducts
    };
}

export default useProducts;
