/* ===========================================
   USE COLLECTIONS HOOK
   Fetch collections from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export interface Collection {
    id: string;
    slug: string;
    name_en: string;
    name_pl: string;
    description_en: string | null;
    description_pl: string | null;
    short_description_en: string | null;
    short_description_pl: string | null;
    featured_signs: string[];
    hero_image: string | null;
    gradient_from: string | null;
    gradient_to: string | null;
    season: string | null;
    is_featured: boolean;
    product_ids: string[];
    order_index: number | null;
}

interface UseCollectionsOptions {
    id?: string;
    slug?: string;
    featured?: boolean;
    limit?: number;
}

interface UseCollectionsResult {
    collections: Collection[];
    collection: Collection | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useCollections(options: UseCollectionsOptions = {}): UseCollectionsResult {
    const [collections, setCollections] = useState<Collection[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchCollections = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase.from('collections').select('*');

            if (options.id) {
                query = query.eq('id', options.id);
            }
            if (options.slug) {
                query = query.eq('slug', options.slug);
            }
            if (options.featured) {
                query = query.eq('is_featured', true);
            }
            if (options.limit) {
                query = query.limit(options.limit);
            }

            query = query.order('is_featured', { ascending: false }).order('order_index', { ascending: true });

            const { data, error: queryError } = await query;

            if (queryError) throw queryError;
            setCollections((data as Collection[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch collections'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCollections();
    }, [options.id, options.slug, options.featured, options.limit]);

    return {
        collections,
        collection: collections[0] || null,
        loading,
        error,
        refetch: fetchCollections
    };
}

export default useCollections;
