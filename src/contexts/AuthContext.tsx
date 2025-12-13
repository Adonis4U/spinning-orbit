/* ===========================================
   AUTH CONTEXT
   Manages user authentication with Supabase
   =========================================== */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { supabase } from '../integrations/supabase/client';
import type { User } from '../types/domain';

// Supabase User type (simplified)
interface SupabaseUser {
    id: string;
    email?: string;
    user_metadata?: {
        first_name?: string;
        last_name?: string;
        avatar_url?: string;
    };
}

// Admin email(s) - you can add more emails here
const ADMIN_EMAILS = ['adonis.gagliardi@gmail.com'];

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    isAdmin: boolean;
    signInWithEmail: (email: string, password: string) => Promise<{ error: Error | null }>;
    signUpWithEmail: (email: string, password: string, metadata?: { first_name?: string; last_name?: string }) => Promise<{ data: { session: unknown } | null; error: Error | null }>;
    signOut: () => Promise<void>;
    updateUserProfile: (data: Partial<User>) => Promise<{ error: Error | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

// Convert Supabase user to our User type
function mapSupabaseUser(supabaseUser: SupabaseUser | null): User | null {
    if (!supabaseUser) return null;

    return {
        id: supabaseUser.id,
        email: supabaseUser.email || '',
        first_name: supabaseUser.user_metadata?.first_name,
        last_name: supabaseUser.user_metadata?.last_name,
        avatar_url: supabaseUser.user_metadata?.avatar_url,
        preferred_language: 'en',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
    };
}

export function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for existing session on mount
    useEffect(() => {
        const initAuth = async () => {
            try {
                const { data: { session } } = await supabase.auth.getSession();
                setUser(mapSupabaseUser(session?.user as SupabaseUser | null));
            } catch (error) {
                console.error('Failed to get session:', error);
            } finally {
                setIsLoading(false);
            }
        };

        initAuth();

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setUser(mapSupabaseUser(session?.user as SupabaseUser | null));
            setIsLoading(false);
        });

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    const signInWithEmail = async (email: string, password: string) => {
        try {
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                return { error: new Error(error.message) };
            }

            return { error: null };
        } catch (error) {
            return { error: error as Error };
        }
    };

    const signUpWithEmail = async (
        email: string,
        password: string,
        metadata?: { first_name?: string; last_name?: string }
    ) => {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: metadata,
                },
            });

            if (error) {
                return { data: null, error: new Error(error.message) };
            }

            return { data, error: null };
        } catch (error) {
            return { data: null, error: error as Error };
        }
    };

    const signOut = async () => {
        try {
            await supabase.auth.signOut();
            setUser(null);
        } catch (error) {
            console.error('Failed to sign out:', error);
        }
    };

    const updateUserProfile = async (data: Partial<User>) => {
        try {
            const { error } = await supabase.auth.updateUser({
                data: {
                    first_name: data.first_name,
                    last_name: data.last_name,
                    avatar_url: data.avatar_url,
                },
            });

            if (error) {
                return { error: new Error(error.message) };
            }

            // Update local user state
            setUser(prev => prev ? { ...prev, ...data } : null);

            return { error: null };
        } catch (error) {
            return { error: error as Error };
        }
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                isAdmin: !!user && ADMIN_EMAILS.includes(user.email.toLowerCase()),
                signInWithEmail,
                signUpWithEmail,
                signOut,
                updateUserProfile,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

// Custom hook for using auth context
export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}

// Export context for advanced usage
export { AuthContext };
