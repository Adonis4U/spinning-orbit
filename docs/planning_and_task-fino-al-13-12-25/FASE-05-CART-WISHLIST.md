# 🛒 Fase 5: Carrello e Wishlist

> **Status:** ✅ COMPLETATO  
> **Periodo:** Dicembre 2024

---

## 🎯 Obiettivi

- [x] Zustand store per Cart
- [x] Zustand store per Wishlist
- [x] Pagina Carrello
- [x] Pagina Wishlist
- [x] Contatori in Header
- [x] Persistenza localStorage

---

## 📋 Task Completati

### 1. Cart Store (Zustand)
- [x] Aggiunta prodotti
- [x] Rimozione prodotti
- [x] Modifica quantità
- [x] Calcolo totale
- [x] Clear cart

### 2. Wishlist Store (Zustand)
- [x] Aggiunta a wishlist
- [x] Rimozione da wishlist
- [x] Toggle wishlist
- [x] Check if in wishlist

### 3. Pagine
- [x] `/cart` - visualizzazione carrello
- [x] `/wishlist` - lista desideri
- [x] Empty state design
- [x] Azioni quick

### 4. Integrazioni
- [x] Header con badge contatori
- [x] ProductCard con heart toggle
- [x] Add to cart da QuickView

---

## 📁 File Creati

| File | Descrizione |
|------|-------------|
| `src/stores/cartStore.ts` | Zustand cart store |
| `src/stores/wishlistStore.ts` | Zustand wishlist store |
| `src/pages/Cart/Cart.tsx` | Pagina carrello |
| `src/pages/Wishlist/Wishlist.tsx` | Pagina wishlist |

---

## 🔧 Struttura Store

```typescript
// Cart Store
interface CartStore {
  items: CartItem[];
  addItem: (product, quantity, variant) => void;
  removeItem: (id) => void;
  updateQuantity: (id, quantity) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

// Wishlist Store
interface WishlistStore {
  items: WishlistItem[];
  addItem: (product) => void;
  removeItem: (id) => void;
  toggleItem: (product) => void;
  isInWishlist: (id) => boolean;
}
```
