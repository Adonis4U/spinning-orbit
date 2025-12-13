---
description: SEO RULES
---

# 🔍 SEO Best Practices - House of Venus

> **Data:** 13 Dicembre 2024  
> **Versione:** 1.0  
> **NOTA:** Queste regole dovrebbero essere copiate in `.agent/rules/rulesothers.md`

---

Ogni pagina e componente DEVE seguire queste regole SEO:

## Meta Tags Base
- **Title Tags**: Ogni pagina DEVE avere un title unico e descrittivo (50-60 caratteri). Usa `react-helmet-async`.
- **Meta Description**: Ogni pagina DEVE avere una description (150-160 caratteri) bilingue EN/PL.
- **Canonical URLs**: Implementare `<link rel="canonical">` per evitare contenuti duplicati.
- **Robots meta**: Usare `noindex` per pagine private (account, admin, checkout).

## Open Graph & Social
- **Open Graph**: Ogni pagina pubblica DEVE avere:
  - `og:title`, `og:description`, `og:image`, `og:url`, `og:type`
- **Twitter Cards**: Implementare `twitter:card`, `twitter:title`, `twitter:description`
- **Image OG**: Preparare immagini 1200x630px per condivisione social

## Struttura HTML
- **Heading Hierarchy**: Una sola `<h1>` per pagina, poi `<h2>`-`<h6>` in ordine gerarchico
- **Semantic HTML**: Usare tag semantici (`<main>`, `<article>`, `<section>`, `<nav>`, `<aside>`)
- **Alt Text**: Tutte le immagini DEVONO avere `alt` descrittivo e pertinente
- **Unique IDs**: Elementi interattivi con ID unici per tracking

## Structured Data (JSON-LD)
- **Product Schema**: Per pagine prodotto con price, availability, rating
- **Organization Schema**: Per brand House of Venus
- **BreadcrumbList**: Per navigazione
- **WebSite**: Con SearchAction per la searchbox
- **Article/BlogPosting**: Per blog posts

## File Critici (/public/)
- **robots.txt**: ✅ Creato - Definire pagine da indicizzare/escludere
- **sitemap.xml**: ✅ Creato - Lista URL per crawler
- **favicon**: ✅ Creato - SVG brandizzato con simbolo Venere
- **manifest.json**: ✅ Creato - Per PWA e bookmark mobile

## Performance & Core Web Vitals
- **LCP (Largest Contentful Paint)**: < 2.5s - Ottimizzare immagini above-the-fold
- **FID (First Input Delay)**: < 100ms - Evitare JS bloccante
- **CLS (Cumulative Layout Shift)**: < 0.1 - Definire dimensioni immagini/video
- **Lighthouse Score**: Verificare periodicamente con punteggio > 90

## Immagini
- **Formato**: Preferire WebP con fallback PNG/JPG
- **Lazy Loading**: `loading="lazy"` per immagini sotto la fold
- **Dimensioni**: Specificare sempre `width` e `height` per evitare CLS
- **Responsive**: Usare `srcset` per immagini responsive

## Multilingua (EN/PL)
- **Hreflang**: Implementare `<link rel="alternate" hreflang="x">` tags
- **URL Structure**: Considerare `/en/` e `/pl/` prefixes per future espansioni
- **Contenuti**: Tutti i meta tags devono essere bilingui

## Monitoring
- **Google Search Console**: Verificare property e monitorare errori
- **Google Analytics / Plausible**: Tracking visite e behavior
- **Core Web Vitals**: Verificare mensilmente con PageSpeed Insights
