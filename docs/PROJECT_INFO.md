# House of Venus - Project Overview al 08/12/2025

## 🌟 Concept

**House of Venus** is a premium astrology-inspired fashion e-commerce platform that combines zodiac/Venus sign astrology with fashion recommendations. The unique selling point is personalized style recommendations based on the user's Venus sign (the astrological placement associated with beauty, aesthetics, and personal style).

---

## 🎯 Target Audience

- Fashion-forward individuals aged 18-40
- Astrology enthusiasts who integrate cosmic themes into their lifestyle
- Shoppers seeking unique, personalized fashion experiences
- Those interested in premium, boutique fashion with mystical aesthetics

---

## 🔮 Core Features

### 1. Venus Calculator
- Users input their birth date, time, and location
- Calculates their Venus sign placement
- Provides personalized style recommendations based on their Venus sign
- Suggests products aligned with their cosmic aesthetic

### 2. E-Commerce Shop
- Product catalog with filtering by:
  - Category (Dresses, Tops, Bottoms, Outerwear, Jewelry)
  - Venus Sign compatibility
  - Price, rating, popularity
- Product detail pages with:
  - Image gallery
  - Size/color selection
  - Venus sign badge showing which signs it's designed for
  - Related products recommendations

### 3. Collections
- Curated fashion collections themed around zodiac elements
- Each collection features specific Venus signs
- Seasonal and thematic groupings (e.g., "Fire & Desire", "Earth Luxe")

### 4. Lookbooks
- Editorial photo galleries
- Photographer/model credits
- Venus sign themed styling inspiration
- "Shop the Look" functionality linking to products

### 5. Blog/Journal
- Astrology and fashion content
- Venus sign style guides
- Horoscope-style fashion forecasts
- Lifestyle articles

### 6. User Features
- User authentication (Supabase)
- Shopping cart with persistence
- Wishlist functionality
- Bilingual support (English/Polish)

---

## 🎨 Current Design Language

### Visual Elements
- **Color Palette**: Dark mode with gold accents, purple gradients
- **Typography**: Display font for headings, clean sans-serif for body
- **Effects**: Floating orbs, starfield backgrounds, glassmorphism
- **Animations**: Framer Motion for smooth transitions

### Aesthetic Themes
- Celestial/cosmic mysticism
- Luxury/premium feel
- Dark elegant backgrounds
- Gold shimmer accents
- Zodiac symbolism throughout

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18 + TypeScript + Vite |
| Styling | CSS Modules (Vanilla CSS) |
| Animations | Framer Motion |
| State | Zustand (cart, wishlist) |
| Backend | Supabase (PostgreSQL + Auth) |
| Routing | React Router v6 |
| Icons | Lucide React |
| i18n | Custom context (EN/PL) |

---

## 📱 Page Structure

```
/                    → Homepage (Hero, Zodiac slider, Featured products, Lookbook preview)
/shop                → Product listing with filters
/product/:id         → Product detail page
/collections         → All collections grid
/collections/:slug   → Collection detail with products
/lookbook            → All lookbooks grid
/lookbook/:slug      → Lookbook gallery + shop the look
/blog                → Blog posts grid
/blog/:slug          → Blog post detail
/venus-calculator    → Venus sign calculator tool
/cart                → Shopping cart
/wishlist            → Saved items
/checkout            → Multi-step checkout
/account             → User profile (auth required)
```

---

## 📊 Database Structure (Supabase)

| Table | Purpose |
|-------|---------|
| `products` | products with images, prices, Venus signs |
| `collections` | themed collections |
| `lookbooks` | editorial lookbooks |
| `blog_posts` | articles with content |
| `orders` | Order records |
| `order_items` | Line items for orders |
| `user_profiles` | Extended user data |
| `newsletter_subscribers` | Email subscribers |

---

## 🌐 Bilingual Support

- Full English and Polish translations
- Language toggle in header
- All content (products, collections, blog posts) has both EN and PL versions

---

## 🎭 Key UI Components

- **ProductCard**: Hover effects, wishlist toggle, quick add to cart
- **ZodiacIcon**: icons for all 12 zodiac signs
- **ZodiacSlider**: Horizontal scroll of zodiac signs
- **Header**: Mega navigation, cart/wishlist counts, language toggle
- **Footer**: Links, newsletter signup, social icons

---

## 💫 Unique Selling Points for UI Redesign

1. **Personalization**: Venus sign integration should feel magical, not just a filter
2. **Discovery**: Users should "discover their style" through cosmic theming
3. **Premium Feel**: Fashion should look aspirational and luxurious
4. **Mystical Atmosphere**: Subtle cosmic elements without being overwhelming
5. **Mobile-First**: Many users will browse on mobile devices

---

## 📝 Notes for UI Redesign

- Current design uses dark theme exclusively
- Consider light mode option?
- Quick view modal for products is not yet implemented
- Product images are currently placeholder URLs from Unsplash
- Consider micro-interactions for zodiac elements
- Checkout flow could be more streamlined
