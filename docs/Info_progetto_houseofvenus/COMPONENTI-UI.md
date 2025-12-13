# 🧩 Componenti UI

> **Libreria:** Componenti React custom  
> **Stile:** CSS Modules + Framer Motion

---

## 📂 Componenti Common

| Componente | Path | Descrizione |
|------------|------|-------------|
| `Starfield` | `common/Starfield.tsx` | Background stellato animato |
| `LocationPicker` | `common/LocationPicker.tsx` | Selezione paese/città |
| `ProtectedRoute` | `common/ProtectedRoute.tsx` | Route protetta auth |
| `LoadingSpinner` | `common/LoadingSpinner.tsx` | Spinner caricamento |

---

## 📂 Componenti Layout

| Componente | Path | Descrizione |
|------------|------|-------------|
| `Header` | `layout/Header.tsx` | Navbar principale |
| `Footer` | `layout/Footer.tsx` | Footer sito |
| `MobileMenu` | `layout/MobileMenu.tsx` | Menu hamburger |

---

## 📂 Componenti Product

| Componente | Path | Descrizione |
|------------|------|-------------|
| `ProductCard` | `product/ProductCard.tsx` | Card prodotto |
| `ProductGrid` | `product/ProductGrid.tsx` | Griglia prodotti |
| `QuickViewModal` | `product/QuickViewModal.tsx` | Modal anteprima |
| `ProductFilters` | `product/ProductFilters.tsx` | Filtri laterali |

---

## 📂 Componenti Home

| Componente | Path | Descrizione |
|------------|------|-------------|
| `HeroSection` | `home/HeroSection.tsx` | Hero banner |
| `MiniVenusCalculator` | `home/MiniVenusCalculator.tsx` | Calculator compatto |
| `FeaturedProducts` | `home/FeaturedProducts.tsx` | Prodotti in evidenza |
| `ZodiacCollections` | `home/ZodiacCollections.tsx` | Collezioni zodiacali |

---

## 🎨 Design Tokens

```css
/* Colori */
--color-gold: hsl(43, 96%, 56%);
--color-deep-purple: hsl(280, 60%, 50%);
--color-surface: #ffffff;
--color-text-primary: hsl(25, 30%, 25%);

/* Spacing */
--space-1: 0.25rem;
--space-2: 0.5rem;
--space-4: 1rem;
--space-8: 2rem;

/* Border Radius */
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--radius-full: 9999px;

/* Shadows */
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

---

## 🎬 Animazioni (Framer Motion)

```typescript
// Fade in
const fadeIn = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 }
};

// Slide up
const slideUp = {
    initial: { y: 20, opacity: 0 },
    animate: { y: 0, opacity: 1 }
};

// Scale
const scale = {
    whileHover: { scale: 1.05 },
    whileTap: { scale: 0.95 }
};
```
