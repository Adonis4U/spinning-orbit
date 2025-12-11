/* ===========================================
   WISHLIST STORE
   Global state management for wishlist
   using Zustand with persistence
   =========================================== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface WishlistItem {
    id: string;
    name: string;
    namePl: string;
    price: number;
    originalPrice?: number;
    image: string;
    category: string;
    categoryPl: string;
    venusSign?: string;
    addedAt: number; // timestamp
}

interface WishlistState {
    items: WishlistItem[];

    // Actions
    addItem: (item: Omit<WishlistItem, 'addedAt'>) => void;
    removeItem: (id: string) => void;
    toggleItem: (item: Omit<WishlistItem, 'addedAt'>) => boolean; // returns new state
    isInWishlist: (id: string) => boolean;
    clearWishlist: () => void;

    // Computed
    getItemCount: () => number;
}

export const useWishlistStore = create<WishlistState>()(
    persist(
        (set, get) => ({
            items: [],

            addItem: (item) => {
                set((state) => {
                    // Don't add if already exists
                    if (state.items.some((i) => i.id === item.id)) {
                        return state;
                    }
                    return {
                        items: [...state.items, { ...item, addedAt: Date.now() }],
                    };
                });
            },

            removeItem: (id) => {
                set((state) => ({
                    items: state.items.filter((item) => item.id !== id),
                }));
            },

            toggleItem: (item) => {
                const exists = get().items.some((i) => i.id === item.id);
                if (exists) {
                    get().removeItem(item.id);
                    return false;
                } else {
                    get().addItem(item);
                    return true;
                }
            },

            isInWishlist: (id) => {
                return get().items.some((item) => item.id === id);
            },

            clearWishlist: () => set({ items: [] }),

            getItemCount: () => get().items.length,
        }),
        {
            name: 'hov-wishlist', // Key in localStorage
        }
    )
);

// Selector hooks for optimized re-renders
export const useWishlistItemCount = () => useWishlistStore((state) => state.items.length);
export const useWishlistItems = () => useWishlistStore((state) => state.items);
export const useIsInWishlist = (id: string) => useWishlistStore((state) =>
    state.items.some((item) => item.id === id)
);
