/* ===========================================
   USE PRODUCTS BY SIGN HOOK
   Dedicated hook for fetching products by
   Venus zodiac sign — uses array column with
   fallback to legacy single-value column
   =========================================== */

import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { VenusSign } from '../types/domain';

export interface SignProduct {
    id: string;
    name_en: string;
    name_pl: string;
    slug: string;
    description_en: string | null;
    description_pl: string | null;
    price_pln: number;
    original_price_pln: number | null;
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
    created_at: string;
}

type SortOption = 'newest' | 'price_asc' | 'price_desc' | 'name';

interface UseProductsBySignOptions {
    sortBy?: SortOption;
    category?: string;
    limit?: number;
}

interface UseProductsBySignResult {
    products: SignProduct[];
    loading: boolean;
    error: Error | null;
    count: number;
    refetch: () => void;
}

/**
 * Dedicated hook for fetching products that belong to a given Venus sign.
 * Tries the `venus_signs` array column first (via .contains), then
 * falls back to the legacy `venus_sign` text column if the array column
 * doesn't exist or isn't populated yet.
 */
export function useProductsBySign(
    sign: VenusSign | null | undefined,
    options: UseProductsBySignOptions = {}
): UseProductsBySignResult {
    const [products, setProducts] = useState<SignProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchProducts = useCallback(async () => {
        if (!sign) {
            setProducts([]);
            setLoading(false);
            return;
        }

        try {
            setLoading(true);
            setError(null);

            // Attempt array-based query first
            let query = supabase.from('products').select('*');

            // Try containment on the array column
            query = query.contains('venus_signs', [sign]);

            if (options.category) {
                query = query.eq('category', options.category);
            }

            // Server-side sorting
            switch (options.sortBy) {
                case 'price_asc':
                    query = query.order('price_pln', { ascending: true });
                    break;
                case 'price_desc':
                    query = query.order('price_pln', { ascending: false });
                    break;
                case 'name':
                    query = query.order('name_en', { ascending: true });
                    break;
                default:
                    query = query.order('created_at', { ascending: false });
            }

            if (options.limit) {
                query = query.limit(options.limit);
            }

            const { data, error: queryError } = await query;

            if (queryError) {
                // Fallback: venus_signs column may not exist yet
                if (queryError.message?.includes('venus_signs')) {
                    let fallbackQuery = supabase
                        .from('products')
                        .select('*')
                        .eq('venus_sign', sign);

                    if (options.category) {
                        fallbackQuery = fallbackQuery.eq('category', options.category);
                    }

                    switch (options.sortBy) {
                        case 'price_asc':
                            fallbackQuery = fallbackQuery.order('price_pln', { ascending: true });
                            break;
                        case 'price_desc':
                            fallbackQuery = fallbackQuery.order('price_pln', { ascending: false });
                            break;
                        case 'name':
                            fallbackQuery = fallbackQuery.order('name_en', { ascending: true });
                            break;
                        default:
                            fallbackQuery = fallbackQuery.order('created_at', { ascending: false });
                    }

                    if (options.limit) {
                        fallbackQuery = fallbackQuery.limit(options.limit);
                    }

                    const { data: fbData, error: fbError } = await fallbackQuery;
                    if (fbError) throw fbError;
                    setProducts((fbData as SignProduct[]) || []);
                    return;
                }
                throw queryError;
            }

            setProducts((data as SignProduct[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error(`Failed to fetch products for ${sign}`));
        } finally {
            setLoading(false);
        }
    }, [sign, options.sortBy, options.category, options.limit]);

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);

    return {
        products,
        loading,
        error,
        count: products.length,
        refetch: fetchProducts,
    };
}

/**
 * Fetch product count per Venus sign (for collection landing pages).
 * Returns a Record<string, number> mapping sign → product count.
 */
export function useProductCountsBySign() {
    const [counts, setCounts] = useState<Record<string, number>>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetch = async () => {
            try {
                const { data } = await supabase
                    .from('products')
                    .select('venus_sign');

                if (data) {
                    const result: Record<string, number> = {};
                    data.forEach((p: { venus_sign: string }) => {
                        if (p.venus_sign) {
                            result[p.venus_sign] = (result[p.venus_sign] || 0) + 1;
                        }
                    });
                    setCounts(result);
                }
            } catch {
                // Silently fail — counts are non-critical
            } finally {
                setLoading(false);
            }
        };
        fetch();
    }, []);

    return { counts, loading };
}

export default useProductsBySign;
