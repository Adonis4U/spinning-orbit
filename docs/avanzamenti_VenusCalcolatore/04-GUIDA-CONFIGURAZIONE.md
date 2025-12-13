# 🔧 Guida Configurazione

> **Progetto:** House of Venus  
> **Data:** 13 Dicembre 2024

---

## 1. Variabili d'Ambiente

### File `.env`
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...your_anon_key
VITE_GOOGLE_GEO_API_KEY=AIza...your_google_key
```

---

## 2. Supabase Secrets

| Nome | Descrizione |
|------|-------------|
| `GOOGLE_GEO_API_KEY` | API Key Google Geocoding |
| `SUPADB_URL` | URL del database |
| `SUPADB_ANON_KEY` | Anon Key pubblica |
| `SUPADB_SERVICE_ROLE_KEY` | Service Role Key |

### Aggiungere via CLI
```bash
npx supabase secrets set GOOGLE_GEO_API_KEY=your_key
```

---

## 3. Google Cloud Setup

1. Crea progetto su [Google Cloud Console](https://console.cloud.google.com)
2. Abilita **Geocoding API**
3. Crea API Key con restrizioni HTTP referrers

---

## 4. Build & Deploy

```bash
npm run build      # Build produzione
npm run preview    # Test locale
vercel --prod      # Deploy Vercel
```

---

## 5. Troubleshooting

| Problema | Soluzione |
|----------|-----------|
| Geocoding non funziona | Verifica API key e abilitazione API |
| Dropdown trasparente | Forza `background: white !important` |
| Ascendant sbagliato | Timezone browser diverso da luogo nascita |
