/* ===========================================
   USE PRODUCTS HOOK
   Fetch products from Supabase with advanced
   filtering, sorting, and Venus sign support
   =========================================== */

import { useState, useEffect, useCallback, useMemo } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { VenusSign } from '../types/domain';

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
    venus_signs: string[] | null;
    is_new: boolean;
    is_sale: boolean;
    is_bestseller: boolean;
    in_stock: boolean;
    rating: number;
    review_count: number;
    colors: { name: string; namePl: string; hex: string }[] | null;
    sizes: string[] | null;
    materials_en: string[] | null;
    materials_pl: string[] | null;
    sku: string | null;
    created_at: string;
}

export type ProductSortBy = 'newest' | 'oldest' | 'price_asc' | 'price_desc' | 'name_asc' | 'name_desc';

interface UseProductsOptions {
    id?: string;
    slug?: string;
    /** Legacy: single sign filter (uses `venus_sign` column with .eq) */
    venusSign?: string;
    /** Array-based filter: matches products whose `venus_signs` array contains the given sign.
     *  Falls back to `venus_sign` column if `venus_signs` column is not yet populated. */
    venusSignArray?: VenusSign;
    category?: string;
    featured?: boolean;
    inStockOnly?: boolean;
    isNew?: boolean;
    isSale?: boolean;
    sortBy?: ProductSortBy;
    limit?: number;
    /** Search query — matches against name_en and name_pl */
    search?: string;
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

    // Memoize options key for dependency tracking
    const optionsKey = useMemo(() => JSON.stringify(options), [
        options.id, options.slug, options.venusSign, options.venusSignArray,
        options.category, options.featured, options.inStockOnly,
        options.isNew, options.isSale, options.sortBy, options.limit, options.search,
    ]);

    const fetchProducts = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase.from('products').select('*');

            // --- Filters ---
            if (options.id) {
                query = query.eq('id', options.id);
            }
            if (options.slug) {
                query = query.eq('slug', options.slug);
            }

            // Venus sign filtering — prefer array column, fallback to single column
            if (options.venusSignArray) {
                // Try the array column first via .contains
                query = query.contains('venus_signs', [options.venusSignArray]);
            } else if (options.venusSign) {
                query = query.eq('venus_sign', options.venusSign.toLowerCase());
            }

            if (options.category) {
                query = query.eq('category', options.category);
            }
            if (options.featured) {
                query = query.or('is_new.eq.true,is_bestseller.eq.true');
            }
            if (options.inStockOnly) {
                query = query.eq('in_stock', true);
            }
            if (options.isNew) {
                query = query.eq('is_new', true);
            }
            if (options.isSale) {
                query = query.eq('is_sale', true);
            }
            if (options.search) {
                const term = `%${options.search}%`;
                query = query.or(`name_en.ilike.${term},name_pl.ilike.${term}`);
            }

            // --- Sorting ---
            switch (options.sortBy) {
                case 'newest':
                    query = query.order('created_at', { ascending: false });
                    break;
                case 'oldest':
                    query = query.order('created_at', { ascending: true });
                    break;
                case 'price_asc':
                    query = query.order('price_pln', { ascending: true });
                    break;
                case 'price_desc':
                    query = query.order('price_pln', { ascending: false });
                    break;
                case 'name_asc':
                    query = query.order('name_en', { ascending: true });
                    break;
                case 'name_desc':
                    query = query.order('name_en', { ascending: false });
                    break;
                default:
                    query = query.order('created_at', { ascending: false });
            }

            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: queryError } = await query;

            if (queryError) {
                // If the venus_signs column doesn't exist yet, retry with venus_sign
                if (queryError.message?.includes('venus_signs') && options.venusSignArray) {
                    let fallbackQuery = supabase
                        .from('products')
                        .select('*')
                        .eq('venus_sign', options.venusSignArray);

                    if (options.limit) fallbackQuery = fallbackQuery.limit(options.limit);

                    const { data: fbData, error: fbError } = await fallbackQuery;
                    if (fbError) throw fbError;
                    setProducts((fbData as Product[]) || []);
                    return;
                }
                throw queryError;
            }

            setProducts((data as Product[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch products'));
        } finally {
            setLoading(false);
        }
    }, [optionsKey]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        product: products[0] || null,
        loading,
        error,
        refetch: fetchProducts,
    };
}

export default useProducts;
