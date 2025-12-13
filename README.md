# 🌟 House of Venus - Spinning Orbit

> **E-commerce + Astrology Platform**  
> Fashion recommendations based on your Venus Sign & Ascendant

[![React](https://img.shields.io/badge/React-18.x-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?logo=vite)](https://vitejs.dev/)
[![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?logo=supabase)](https://supabase.com/)

---

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

## ✨ Features

### 🔮 Venus Calculator
- **Venus Sign Calculation** - Accurate ephemeris-based calculation
- **Ascendant (Rising Sign)** - Based on birth time and location
- **Style Recommendations** - Personalized fashion advice per sign
- **Color Palettes** - Suggested colors for your Venus sign

### 🛍️ E-commerce
- **Product Catalog** - Filterable product grid
- **Quick View** - Modal product preview
- **Shopping Cart** - Persistent cart with Zustand
- **Wishlist** - Save favorite items
- **Checkout** - Multi-step checkout process

### 🌍 Localization
- **Bilingual** - Full EN/PL support
- **Location Picker** - Country/City autocomplete

---

## 🚀 Quick Start

### Prerequisites
- Node.js >= 18.x
- npm >= 9.x

### Installation

```bash
# Clone repository
git clone [repository-url]
cd spinning-orbit

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your Supabase credentials

# Start development server
npm run dev
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server (port 5174) |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

---

## 📁 Project Structure

```
spinning-orbit/
├── src/
│   ├── components/     # React components
│   ├── pages/          # Route pages
│   ├── contexts/       # React Context providers
│   ├── hooks/          # Custom hooks
│   ├── stores/         # Zustand stores
│   ├── utils/          # Utility functions
│   ├── types/          # TypeScript types
│   ├── data/           # Static data
│   ├── i18n/           # Translations
│   └── styles/         # Global CSS
├── public/             # Static assets
├── docs/               # Documentation
└── supabase/           # Supabase config
```

---

## 🔧 Configuration

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GOOGLE_GEO_API_KEY=your_google_key  # Optional fallback
```

---

## 📚 Documentation

| Folder | Content |
|--------|---------|
| `/docs/Info_progetto_houseofvenus/` | Technical documentation |
| `/docs/planning_and_task-*/` | Project phases & planning |
| `/docs/avanzamenti_VenusCalcolatore/` | Venus Calculator details |
| `/CLAUDE.md` | AI Agent instructions |

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Frontend | React 18, TypeScript, Vite |
| Styling | CSS Modules, Framer Motion |
| State | Zustand, React Context |
| Backend | Supabase (PostgreSQL) |
| Auth | Supabase Auth |
| APIs | Nominatim, Google Geocoding |

---

## 📄 License

Private project - All rights reserved

---

*Last updated: December 13, 2024*
