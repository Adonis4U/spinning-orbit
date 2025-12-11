/* ===========================================
   USE LOOKBOOKS HOOK
   Fetch lookbooks from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export interface Lookbook {
    id: string;
    slug: string;
    title_en: string;
    title_pl: string;
    description_en: string | null;
    description_pl: string | null;
    venus_sign: string | null;
    hero_image: string | null;
    gallery_images: string[];
    photographer: string | null;
    model: string | null;
    location: string | null;
    product_ids: string[];
    is_featured: boolean;
    published_at: string | null;
}

interface UseLookbooksOptions {
    id?: string;
    slug?: string;
    venusSign?: string;
    featured?: boolean;
    limit?: number;
}

interface UseLookbooksResult {
    lookbooks: Lookbook[];
    lookbook: Lookbook | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useLookbooks(options: UseLookbooksOptions = {}): UseLookbooksResult {
    const [lookbooks, setLookbooks] = useState<Lookbook[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchLookbooks = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase.from('lookbooks').select('*');

            if (options.id) {
                query = query.eq('id', options.id);
            }
            if (options.slug) {
                query = query.eq('slug', options.slug);
            }
            if (options.venusSign) {
                query = query.eq('venus_sign', options.venusSign.toLowerCase());
            }
            if (options.featured) {
                query = query.eq('is_featured', true);
            }
            if (options.limit) {
                query = query.limit(options.limit);
            }

            query = query.order('published_at', { ascending: false });

            const { data, error: queryError } = await query;

            if (queryError) throw queryError;
            setLookbooks((data as Lookbook[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch lookbooks'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLookbooks();
    }, [options.id, options.slug, options.venusSign, options.featured, options.limit]);

    return {
        lookbooks,
        lookbook: lookbooks[0] || null,
        loading,
        error,
        refetch: fetchLookbooks
    };
}

export default useLookbooks;
