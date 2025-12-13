# 🏗️ Architettura Tecnica

> **Stack:** React + TypeScript + Vite + Supabase

---

## 📊 Stack Tecnologico

### Frontend
| Tecnologia | Versione | Uso |
|------------|----------|-----|
| React | 18.x | UI Framework |
| TypeScript | 5.x | Type safety |
| Vite | 5.x | Build tool |
| React Router | 6.x | Routing |
| Framer Motion | 10.x | Animazioni |
| Zustand | 4.x | State management |

### Backend (BaaS)
| Tecnologia | Uso |
|------------|-----|
| Supabase | Database + Auth |
| PostgreSQL | Database |
| Row Level Security | Sicurezza dati |
| Edge Functions | Serverless functions |

### Styling
| Tecnologia | Uso |
|------------|-----|
| CSS Modules | Scoped styling |
| CSS Custom Properties | Design tokens |
| Lucide React | Iconografia |

---

## 📁 Struttura Progetto

```
spinning-orbit/
├── src/
│   ├── components/       # Componenti React
│   │   ├── common/       # Riutilizzabili
│   │   ├── layout/       # Layout (Header, Footer)
│   │   ├── product/      # Prodotto-related
│   │   └── home/         # Homepage
│   ├── pages/            # Route pages
│   ├── contexts/         # React Context
│   ├── hooks/            # Custom hooks
│   ├── stores/           # Zustand stores
│   ├── utils/            # Utility functions
│   ├── types/            # TypeScript types
│   ├── data/             # Static data
│   ├── constants/        # Constants
│   ├── i18n/             # Translations
│   └── styles/           # Global CSS
├── public/               # Static assets
├── docs/                 # Documentation
└── supabase/             # Supabase config
```

---

## 🔄 Data Flow

```
User Action
    ↓
React Component
    ↓
Custom Hook (useProducts, useAuth, etc.)
    ↓
Supabase Client
    ↓
PostgreSQL Database
    ↓
Response → State Update → UI Re-render
```

---

## 🔐 Autenticazione Flow

```
1. User submits credentials
2. Supabase Auth validates
3. JWT token returned
4. Token stored in localStorage
5. AuthContext updated
6. Protected routes accessible
```

---

## 📦 Build & Deploy

```bash
# Development
npm run dev         # Start dev server

# Production
npm run build       # Build for production
npm run preview     # Preview production build

# Lint
npm run lint        # Run ESLint
```
