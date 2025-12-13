# 🎨 Stili e Design System

> **Approccio:** CSS Modules + Custom Properties  
> **Animazioni:** Framer Motion

---

## 🎨 Palette Colori

### Colori Primari (attuali e migliorabili)
| Nome | Valore | Uso |
|------|--------|-----|
| Gold | `hsl(43, 96%, 56%)` | Accenti, CTA |
| Deep Purple | `hsla(315, 73%, 27%, 1.00)` | Astrologia |
| Cream | `hsl(30, 30%, 97%)` | Background |

### Colori Testo (attuali e migliorabili)
| Nome | Valore |
|------|--------|
| Primary | `hsl(25, 30%, 25%)` |
| Secondary | `hsl(25, 20%, 45%)` |
| Tertiary | `hsl(25, 15%, 65%)` |

### Colori UI (attuali e migliorabili)
| Nome | Valore |
|------|--------|
| Surface | `#ffffff` |
| Border | `hsl(25, 20%, 85%)` |
| Error | `#e53935` |
| Success | `#43a047` |

---

## 📐 Spacing Scale (attuali e migliorabili)

```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

---

## 📝 Typography

### Font Families (Migliorabili e aggiornabili)
```css
--font-family-display: 'Playfair Display', serif;
--font-family-body: 'Inter', sans-serif;
```

### Font Sizes (Migliorabili)
```css
--font-size-xs: 0.75rem;   /* 12px */
--font-size-sm: 0.875rem;  /* 14px */
--font-size-base: 1rem;    /* 16px */
--font-size-lg: 1.125rem;  /* 18px */
--font-size-xl: 1.25rem;   /* 20px */
--font-size-2xl: 1.5rem;   /* 24px */
--font-size-3xl: 2rem;     /* 32px */
```

---

## 🔲 Border Radius (attuali e migliorabili)

```css
--radius-sm: 0.25rem;
--radius-md: 0.5rem;
--radius-lg: 1rem;
--radius-xl: 1.5rem;
--radius-2xl: 2rem;
--radius-full: 9999px;
```

---

## 🌑 Shadows (attuali e migliorabili)

```css
--shadow-sm: 0 1px 2px rgba(0,0,0,0.05);
--shadow-md: 0 4px 6px rgba(0,0,0,0.1);
--shadow-lg: 0 10px 15px rgba(0,0,0,0.1);
--shadow-xl: 0 20px 25px rgba(0,0,0,0.15);
```

---

## ⏱️ Transitions (attuali e migliorabili)

```css
--duration-fast: 150ms;
--duration-normal: 300ms;
--duration-slow: 500ms;
--ease-out: cubic-bezier(0, 0, 0.2, 1);
--ease-in-out: cubic-bezier(0.4, 0, 0.2, 1);
```

---

## 📱 Breakpoints (attuali e migliorabili)

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```
