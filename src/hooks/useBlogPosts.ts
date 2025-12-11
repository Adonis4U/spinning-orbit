/* ===========================================
   USE BLOG POSTS HOOK
   Fetch blog posts from Supabase
   =========================================== */

import { useState, useEffect } from 'react';
import { supabase } from '../integrations/supabase/client';

export interface BlogPost {
    id: string;
    slug: string;
    title_en: string;
    title_pl: string;
    excerpt_en: string | null;
    excerpt_pl: string | null;
    content_en: string | null;
    content_pl: string | null;
    cover_image: string | null;
    author: string;
    author_image: string | null;
    tags: string[];
    reading_time_minutes: number;
    is_featured: boolean;
    published_at: string | null;
}

interface UseBlogPostsOptions {
    id?: string;
    slug?: string;
    featured?: boolean;
    tag?: string;
    limit?: number;
}

interface UseBlogPostsResult {
    posts: BlogPost[];
    post: BlogPost | null;
    loading: boolean;
    error: Error | null;
    refetch: () => void;
}

export function useBlogPosts(options: UseBlogPostsOptions = {}): UseBlogPostsResult {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<Error | null>(null);

    const fetchPosts = async () => {
        try {
            setLoading(true);
            setError(null);

            let query = supabase.from('blog_posts').select('*');

            if (options.id) {
                query = query.eq('id', options.id);
            }
            if (options.slug) {
                query = query.eq('slug', options.slug);
            }
            if (options.featured) {
                query = query.eq('is_featured', true);
            }
            if (options.tag) {
                query = query.contains('tags', [options.tag]);
            }
            if (options.limit) {
                query = query.limit(options.limit);
            }

            query = query.order('published_at', { ascending: false });

            const { data, error: queryError } = await query;

            if (queryError) throw queryError;
            setPosts((data as BlogPost[]) || []);
        } catch (err) {
            setError(err instanceof Error ? err : new Error('Failed to fetch blog posts'));
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPosts();
    }, [options.id, options.slug, options.featured, options.tag, options.limit]);

    return {
        posts,
        post: posts[0] || null,
        loading,
        error,
        refetch: fetchPosts
    };
}

export default useBlogPosts;
