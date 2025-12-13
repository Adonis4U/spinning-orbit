# House of Venus - Deploy Guide

## 🚀 Quick Deploy

### Prerequisites
- Node.js 20+
- npm
- GitHub repository with Actions enabled

### Local Development
```bash
npm install
npm run dev
```

### Build for Production
```bash
npm run build
```

---

## 📦 GitHub Actions Deploy (Hostinger)

### 1. Configure Secrets

Go to: **Repository → Settings → Secrets and variables → Actions**

Add these secrets:
| Secret | Description |
|--------|-------------|
| `FTP_SERVER` | Hostinger FTP server (e.g., `ftp.houseofvenus.pl`) |
| `FTP_USERNAME` | Your Hostinger FTP username |
| `FTP_PASSWORD` | Your Hostinger FTP password |

### 2. Deploy

**Automatic:** Push to `main` branch triggers deploy.

**Manual:** Go to Actions → "Deploy to Hostinger" → Run workflow

---

## 📁 File Structure on Server

```
/public_html/
├── .htaccess              ← From file_deploy/htaccess_root
├── wp-admin/              ← WordPress (if present)
├── wp-content/
└── hov/                   ← House of Venus App
    ├── .htaccess          ← From file_deploy/htaccess_hov_folder
    ├── index.html
    ├── assets/
    ├── favicon.svg
    ├── robots.txt
    ├── sitemap.xml
    └── manifest.json
```

---

## 🔗 URLs

| Path | Description |
|------|-------------|
| `https://houseofvenus.pl/` | Homepage |
| `https://houseofvenus.pl/shop` | Shop |
| `https://houseofvenus.pl/venus-calculator` | Venus Calculator |
| `https://houseofvenus.pl/collections` | Collections |
| `https://houseofvenus.pl/wp-admin` | WordPress Admin |

---

## ⚙️ Environment Variables

### Frontend (.env)
```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
VITE_GOOGLE_GEO_API_KEY=your_google_api_key
```

### Supabase Edge Functions (Secrets)
| Secret | Used By |
|--------|---------|
| `GOOGLE_GEO_API_KEY` | geocode-place |
| `RESEND_API_KEY` | send-order-confirmation, newsletter-signup |
| `STRIPE_SECRET_KEY` | stripe-webhook |
| `STRIPE_WEBHOOK_SECRET` | stripe-webhook |

---

*Last updated: December 13, 2024*
