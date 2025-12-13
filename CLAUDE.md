# 🤖 AI Agent Instructions - House of Venus

> **Progetto:** House of Venus - Spinning Orbit  
> **Tipo:** E-commerce + Astrology Tool  
> **Stack:** React + TypeScript + Vite + Supabase

---

## 📋 ISTRUZIONI PRIORITARIE

Prima di apportare QUALSIASI modifica al codice, l'agente AI DEVE:

1. **Leggere la documentazione completa** in `/docs/`
2. **Comprendere l'architettura** esistente
3. **Seguire le convenzioni** già stabilite
4. **Preservare il design system** definito

---

## 📚 DOCUMENTAZIONE OBBLIGATORIA

### 🔴 LETTURA PRIORITÀ ALTA

| Percorso | Contenuto |
|----------|-----------|
| `/docs/doc_vari/ARCHITETTURA-TECNICA.md` | Stack, struttura progetto, data flow |
| `/docs/doc_vari/DATABASE-SCHEMA.md` | Schema Supabase, tabelle, RLS |
| `/docs/doc_vari/COMPONENTI-UI.md` | Libreria componenti, design tokens |

### 🟡 LETTURA CONTESTO

| Percorso | Contenuto |
|----------|-----------|
| `/docs/doc_vari/PANORAMICA-SITO.md` | Overview funzionalità sito |
| `/docs/doc_vari/ROUTING.md` | Struttura route e navigazione |
| `/docs/doc_vari/API-ENDPOINTS.md` | Supabase API, geocoding |
| `/docs/doc_vari/STILI-DESIGN.md` | Design system CSS completo | Però Per lo Stile generale possiamo sempre migliorare e cambiare! Quindi non esitare a chiedere!

### 🟢 STORICO PROGETTO

| Percorso | Contenuto |
|----------|-----------|
| `/docs/planning_and_task/README.md` | Indice fasi progetto |
| `/docs/planning_and_task/FASE-01-SETUP-INIZIALE.md` | Setup iniziale |
| `/docs/planning_and_task/FASE-02-AUTENTICAZIONE.md` | Sistema auth |
| `/docs/planning_and_task/FASE-03-PRODOTTI-CATALOGO.md` | E-commerce |
| `/docs/planning_and_task/FASE-04-VENUS-CALCULATOR.md` | Calcolo Venere |
| `/docs/planning_and_task/FASE-05-CART-WISHLIST.md` | Carrello |
| `/docs/planning_and_task/FASE-06-CHECKOUT.md` | Checkout |
| `/docs/planning_and_task/FASE-07-ASCENDANT-LOCATION.md` | Ascendente |

### 📈 AVANZAMENTI RECENTI

| Percorso | Contenuto |
|----------|-----------|
| `/docs/avanzamenti/01-VENUS-CALCULATOR-RECAP.md` | Recap Venus Calculator |
| `/docs/avanzamenti/02-DETTAGLIO-FILE-MODIFICATI.md` | Changelog file |
| `/docs/avanzamenti/03-GUIDA-FORMULE-ASTRONOMICHE.md` | Algoritmi calcolo |
| `/docs/avanzamenti/04-GUIDA-CONFIGURAZIONE.md` | Setup e deploy |
| `/docs/avanzamenti/05-CRONOLOGIA-SESSIONI.md` | Storico sessioni |

---

## 🏗️ STRUTTURA PROGETTO (Fino adesso 13/12/2025)

```
spinning-orbit/
├── src/
│   ├── components/       # Componenti React
│   │   ├── common/       # Riutilizzabili (LocationPicker, etc.)
│   │   ├── layout/       # Header, Footer
│   │   ├── product/      # ProductCard, QuickViewModal
│   │   └── home/         # MiniVenusCalculator, Hero
│   ├── pages/            # Route pages
│   ├── contexts/         # React Context (Auth, Language, VenusProfile)
│   ├── hooks/            # Custom hooks (useProducts, useAuth)
│   ├── stores/           # Zustand (cart, wishlist)
│   ├── utils/            # Utilities (astroCalc, venusMath)
│   ├── types/            # TypeScript types (domain.ts)
│   ├── data/             # Static data (venusData, ascendantData)
│   ├── constants/        # Constants (zodiac)
│   ├── i18n/             # Translations (en, pl)
│   └── styles/           # Global CSS
├── public/               # Static assets
├── docs/                 # Documentazione
└── supabase/             # Supabase config
```

---

## ⚙️ CONVENZIONI CODICE

### TypeScript
- Strict mode abilitato
- Interfacce per props componenti
- Types in `/src/types/domain.ts`

### React
- Functional components only
- Custom hooks per logica condivisa
- Context per stato globale

### CSS
- CSS Modules (`.module.css`)
- Design tokens in variabili CSS
- Mobile-first responsive
- Tablet-first responsive
- Desktop-first responsive
- Mobile Optimized

### Naming
- Componenti: PascalCase (Ma vedi cosa poi puo' anche essere meglio o migliorabile!)
- Files: PascalCase per componenti, camelCase per utils (Ma vedi cosa poi puo' anche essere meglio o migliorabile!)
- CSS classes: camelCase (Ma vedi cosa poi puo' anche essere meglio o migliorabile!)

---

## 🌍 SUPPORTO LINGUE

Il sito supporta **EN** e **PL**. Per ogni testo visibile:

```typescript
// ✅ Corretto
{language === 'en' ? 'English text' : 'Tekst polski'}

// ✅ Oppure usa i18n (Nella maggior parte dei casi sarebbe meglio!)
{t('key.path')}
```

---

## 🔮 VENUS CALCULATOR

### File Critici
- `src/utils/astroCalc.ts` - Calcoli astronomici
- `src/data/venusData.ts` - Descrizioni segni Venere
- `src/data/ascendantData.ts` - Descrizioni Ascendenti
- `src/components/common/LocationPicker.tsx` - Selezione località

### Formule
Vedi `/docs/avanzamenti/03-GUIDA-FORMULE-ASTRONOMICHE.md` (che possono essere aggiornate se necessarie ma solo in caso di miglioramenti!)

---

## 🗄️ DATABASE

### Tabelle Principali
- `products`, `categories`, `product_images`, `product_variants`
- `orders`, `order_items`
- `user_profiles` (estensione auth.users)

### RLS
Row Level Security abilitato. Vedi `/docs/doc_vari/DATABASE-SCHEMA.md`

---

## 🚀 COMANDI UTILI

```bash
npm run dev       # Avvia dev server (localhost:5174)
npm run build     # Build produzione
npm run preview   # Preview build
npm run lint      # ESLint check
```

---

## ⚠️ ATTENZIONE

1. **NON modificare** `astroCalc.ts` senza comprendere le formule astronomiche o compromettere il funzionamento
2. **NON modificare** il codice in generale senza comprendere il funzionamento o funzionamenti o compromettendo il codice stesso o altri codici!
2. **NON rimuovere** il fallback Google Geocoding
3. **Mantieni sempre** il supporto bilingue EN/PL
4. **Usa sempre** CSS Modules, non stili inline
5. **Usa sempre** i18n per i testi visibili
6. **Usa sempre** il design system CSS
7. **Usa sempre** le convenzioni del progetto
8. **Ottimizza sempre** il codice
9. **Ottimizza sempre** le performance
10. **Ottimizza sempre** per MOBILE
11. **Ottimizza sempre** per desktop
12. **Crea sempre** un file README.md per ogni cartella
13. **Crea sempre** un file CHANGELOG.md per ogni cartella
14. **Crea sempre** un file TODO.md per ogni cartella
15. **Crea sempre** un backup dei file modificati
16. **Crea sempre** un backup quando creai un file di planning e un file di task e un file di avanzamenti (file tipo Task, Implementation Plan e Avanzamenti)
17. **Testa sempre** su mobile dopo modifiche UI
18. **Testa sempre** su desktop dopo modifiche UI
19. **Testa sempre** su tablet dopo modifiche UI


---

## 📞 API KEYS RICHIESTE

| Chiave | Posizione | Uso |
|--------|-----------|-----|
| `VITE_SUPABASE_URL` | `.env` | Database URL |
| `VITE_SUPABASE_ANON_KEY` | `.env` | Auth pubblica |
| `VITE_GOOGLE_GEO_API_KEY` | `.env` | Geocoding fallback |

---

*Ultimo aggiornamento: 13 Dicembre 2024*
