/* ===========================================
   SUPABASE CLIENT
   Configured with real credentials
   =========================================== */

import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

// Supabase project credentials from environment
const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || 'https://btjoiriuugjqjyjdtauw.supabase.co';
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0am9pcml1dWdqcWp5amR0YXV3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUyMzI5MDMsImV4cCI6MjA4MDgwODkwM30.tTpolRYY0Sh66Xk_sYM1yYC5YXoUBjJHM9WbHXuwGnw';

// Create typed Supabase client
export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: true,
    },
});

// Re-export types for convenience
export type { Database } from './types';
export * from './types';

// Helper function to check if we have valid credentials
export function hasValidSupabaseConfig(): boolean {
    return (
        SUPABASE_URL !== 'https://your-project.supabase.co' &&
        SUPABASE_ANON_KEY !== 'your-anon-key'
    );
}

// Log connection status
if (hasValidSupabaseConfig()) {
    console.log('✅ Supabase connected to:', SUPABASE_URL);
} else {
    console.warn(
        '⚠️ Supabase is using placeholder credentials. ' +
        'Create a .env file with VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable database features.'
    );
}
