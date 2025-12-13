/* ===========================================
   CART STORE
   Global state management for shopping cart
   using Zustand with persistence
   =========================================== */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: string;
    name: string;
    namePl: string;
    price: number;
    originalPrice?: number;
    image: string;
    size?: string;
    color?: string;
    quantity: number;
    venusSign?: string;
}

interface CartState {
    items: CartItem[];
    isOpen: boolean;

    // Actions
    addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
    removeItem: (id: string, size?: string, color?: string) => void;
    updateQuantity: (id: string, quantity: number, size?: string, color?: string) => void;
    clearCart: () => void;
    toggleCart: () => void;
    openCart: () => void;
    closeCart: () => void;

    // Computed (using getters via selectors)
    getItemCount: () => number;
    getSubtotal: () => number;
    getItemByKey: (id: string, size?: string, color?: string) => CartItem | undefined;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            isOpen: false,

            addItem: (item, quantity = 1) => {
                set((state) => {
                    const existingIndex = state.items.findIndex(
                        (i) => i.id === item.id && i.size === item.size && i.color === item.color
                    );

                    if (existingIndex > -1) {
                        // Update quantity if item exists
                        const newItems = [...state.items];
                        newItems[existingIndex] = {
                            ...newItems[existingIndex],
                            quantity: newItems[existingIndex].quantity + quantity,
                        };
                        return { items: newItems };
                    }

                    // Add new item
                    return {
                        items: [...state.items, { ...item, quantity }],
                    };
                });
            },

            removeItem: (id, size, color) => {
                set((state) => ({
                    items: state.items.filter(
                        (item) => !(item.id === id && item.size === size && item.color === color)
                    ),
                }));
            },

            updateQuantity: (id, quantity, size, color) => {
                if (quantity <= 0) {
                    get().removeItem(id, size, color);
                    return;
                }

                set((state) => ({
                    items: state.items.map((item) =>
                        item.id === id && item.size === size && item.color === color
                            ? { ...item, quantity }
                            : item
                    ),
                }));
            },

            clearCart: () => set({ items: [] }),

            toggleCart: () => set((state) => ({ isOpen: !state.isOpen })),
            openCart: () => set({ isOpen: true }),
            closeCart: () => set({ isOpen: false }),

            getItemCount: () => {
                return get().items.reduce((total, item) => total + item.quantity, 0);
            },

            getSubtotal: () => {
                return get().items.reduce(
                    (total, item) => total + item.price * item.quantity,
                    0
                );
            },

            getItemByKey: (id, size, color) => {
                return get().items.find(
                    (item) => item.id === id && item.size === size && item.color === color
                );
            },
        }),
        {
            name: 'hov-cart', // Key in localStorage
            partialize: (state) => ({ items: state.items }), // Only persist items, not UI state
        }
    )
);

// Selector hooks for optimized re-renders
export const useCartItemCount = () => useCartStore((state) =>
    state.items.reduce((total, item) => total + item.quantity, 0)
);

export const useCartSubtotal = () => useCartStore((state) =>
    state.items.reduce((total, item) => total + item.price * item.quantity, 0)
);

export const useCartItems = () => useCartStore((state) => state.items);
export const useCartOpen = () => useCartStore((state) => state.isOpen);
