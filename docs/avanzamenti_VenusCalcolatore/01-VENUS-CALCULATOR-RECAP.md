## 🔮 Venus Calculator - Cronologia Completa delle Modifiche

> **Data Ultimo Aggiornamento:** 13 Dicembre 2024  
> **Progetto:** House of Venus - Spinning Orbit  
> **Versione:** 2.0.0

---

## 📋 Indice

1. [Panoramica del Progetto](#panoramica-del-progetto)
2. [Fase 1: Calcolo Accurato del Segno di Venere](#fase-1-calcolo-accurato-del-segno-di-venere)
3. [Fase 2: Implementazione Calcolo Ascendente](#fase-2-implementazione-calcolo-ascendente)
4. [Fase 3: Geocodifica e Localizzazione](#fase-3-geocodifica-e-localizzazione)
5. [Fase 4: Sistema LocationPicker Avanzato](#fase-4-sistema-locationpicker-avanzato)
6. [Fase 5: Correzioni UI e Bug Fix](#fase-5-correzioni-ui-e-bug-fix)
7. [File Modificati](#file-modificati)
8. [Dipendenze Aggiunte](#dipendenze-aggiunte)
9. [Configurazione API](#configurazione-api)

---

## 🎯 Panoramica del Progetto

Il **Venus Calculator** è uno strumento astrologico che calcola:
- **Segno di Venere**: Basato sulla posizione astronomica di Venere al momento della nascita
- **Ascendente (Segno Nascente)**: Basato sull'orizzonte orientale al momento e luogo di nascita

### Obiettivi Principali
1. ✅ Calcolo astronomico accurato usando effemeridi
2. ✅ Supporto bilingue (EN/PL)
3. ✅ Geocodifica avanzata con autocompletamento
4. ✅ Integrazione nella homepage (MiniVenusCalculator)
5. ✅ UI/UX moderna e responsiva

---

## 🪐 Fase 1: Calcolo Accurato del Segno di Venere

### Problema Iniziale
Il calcolo originale in `venusMath.ts` usava periodi fissi basati su date statiche, non considerando:
- L'ora di nascita
- Il movimento retrogrado di Venere
- La posizione astronomica precisa

### Soluzione Implementata

#### File Creato: `src/utils/astroCalc.ts`

```typescript
export function calculateVenusSign(birthDate: Date, birthTime?: string): VenusSign
```

**Caratteristiche:**
- Utilizza il pacchetto npm `ephemeris` per calcoli astronomici precisi
- Calcola la longitudine eclittica di Venere
- Converte la longitudine nel segno zodiacale corrispondente
- Include fallback al metodo originale in caso di errore

### Formula di Conversione
```typescript
function longitudeToZodiacSign(longitude: number): VenusSign {
    const normalizedLong = ((longitude % 360) + 360) % 360;
    const signIndex = Math.floor(normalizedLong / 30);
    const signs: VenusSign[] = [
        'aries', 'taurus', 'gemini', 'cancer', 'leo', 'virgo',
        'libra', 'scorpio', 'sagittarius', 'capricorn', 'aquarius', 'pisces'
    ];
    return signs[signIndex];
}
```

---

## 🌅 Fase 2: Implementazione Calcolo Ascendente

### Teoria Astronomica
L'Ascendente è il punto dell'eclittica che sorge all'orizzonte orientale nel momento e luogo esatti della nascita.

### Algoritmo Implementato (Metodo RAMC)

#### Passaggi del Calcolo:

1. **Conversione Ora Locale → UTC**
   ```typescript
   const localDate = new Date(birthDate);
   localDate.setHours(hours, minutes, 0, 0);
   const utcHours = localDate.getUTCHours();
   ```

2. **Calcolo Giorno Giuliano**
   ```typescript
   const jd = dateToJulianDay(utcYear, utcMonth, utcDay, utcHours, utcMinutes);
   ```

3. **Calcolo Tempo Siderale di Greenwich (GMST)**
   ```typescript
   let gmst = 280.46061837 
       + 360.98564736629 * (jd - 2451545.0) 
       + 0.000387933 * T * T 
       - T * T * T / 38710000;
   ```

4. **Calcolo RAMC (Right Ascension of Medium Coeli)**
   ```typescript
   let ramc = gmst + longitude;
   ```

5. **Formula dell'Ascendente**
   ```typescript
   const y = cosRAMC;
   const x = -(sinObl * tanLat + cosObl * sinRAMC);
   let ascRad = Math.atan2(y, x);
   ```

6. **Correzione del Quadrante**
   ```typescript
   if (x > 0) {
       ascDeg += 180;
   }
   ```

### File Creato: `src/data/ascendantData.ts`

Contiene descrizioni dettagliate per ogni Ascendente:
- Descrizione generale
- First Impression (prima impressione)
- Style Vibe (stile personale)
- Fashion Approach (approccio alla moda)

---

## 📍 Fase 3: Geocodifica e Localizzazione

### API Utilizzate

#### 1. Nominatim (OpenStreetMap) - Primario
```typescript
const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${encodedPlace}&limit=5`,
    {
        headers: {
            'User-Agent': 'HouseOfVenus/1.0 (venus-calculator)',
        },
    }
);
```

#### 2. Google Geocoding API - Fallback
```typescript
const googleApiKey = import.meta.env.VITE_GOOGLE_GEO_API_KEY;
const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${googleApiKey}`
);
```

### Funzione `geocodePlace`
```typescript
export async function geocodePlace(placeName: string): Promise<{ lat: number; lon: number } | null>
```

---

## 🗺️ Fase 4: Sistema LocationPicker Avanzato

### Componente Creato: `src/components/common/LocationPicker.tsx`

#### Caratteristiche:
- **Dropdown Country**: Lista di paesi con ricerca
- **Autocomplete City**: Suggerimenti città filtrati per paese
- **Debounce**: Limitazione chiamate API (300ms)
- **Bilingue**: Supporto EN/PL
- **Compatto**: Versione ridotta per MiniVenusCalculator

#### Struttura Dati
```typescript
export interface LocationPickerValue {
    country: string;
    countryCode: string;
    city: string;
    lat: number | null;
    lon: number | null;
}
```

#### Lista Paesi Supportati
50+ paesi con nomi in inglese e polacco:
- Poland/Polska
- United States/Stany Zjednoczone
- Italy/Włochy
- Germany/Niemcy
- France/Francja
- ... e altri

### File CSS: `LocationPicker.module.css`
- Stili per dropdown con sfondo bianco solido
- Input field con focus state
- Suggerimenti autocomplete
- Responsivo

---

## 🔧 Fase 5: Correzioni UI e Bug Fix

### Bug Risolti

#### 1. Sfondo Dropdown Trasparente
**Problema:** I dropdown mostravano sfondo trasparente invece di bianco
**Soluzione:** 
```css
.dropdown {
    background: #ffffff;
    background-color: white !important;
    z-index: 1000;
}

.option {
    background: white;
    background-color: white !important;
}
```

#### 2. Label "for Ascendant" Posizionata Male
**Problema:** La dicitura era sul campo Country invece di City
**Soluzione:** Spostata nel JSX:
```tsx
{/* City label - prima */}
<label>{labels.city}</label>

{/* City label - dopo */}
<label>
    {labels.city}
    <span className={styles.optional}>{labels.forAscendant}</span>
</label>
```

#### 3. Calcolo Ascendente Errato
**Problema:** Timezone stimato da longitudine dava risultati sbagliati
**Soluzione:** Uso di JavaScript Date per conversione UTC automatica:
```typescript
// Prima (sbagliato)
const timezoneOffsetHours = longitude / 15;

// Dopo (corretto)
const localDate = new Date(birthDate);
localDate.setHours(hours, minutes, 0, 0);
const utcHours = localDate.getUTCHours();
```

#### 4. TypeScript Type Error in Debounce
**Problema:** Tipo generico non accettava funzioni async con parametri string
**Soluzione:**
```typescript
// Prima
export function debounce<T extends (...args: unknown[]) => void>

// Dopo
export function debounce<T extends (...args: any[]) => any>
```

---

## 📁 File Modificati

### Nuovi File Creati

| File | Descrizione |
|------|-------------|
| `src/utils/astroCalc.ts` | Calcoli astronomici (Venus, Ascendant, Geocoding) |
| `src/utils/debounce.ts` | Utility per limitare frequenza chiamate |
| `src/data/ascendantData.ts` | Dati descrittivi per ogni Ascendente |
| `src/components/common/LocationPicker.tsx` | Componente selezione luogo |
| `src/components/common/LocationPicker.module.css` | Stili LocationPicker |

### File Modificati

| File | Modifiche |
|------|-----------|
| `src/pages/VenusCalculator/VenusCalculator.tsx` | Integrazione calcoli accurati, LocationPicker, display Ascendente |
| `src/pages/VenusCalculator/VenusCalculator.module.css` | Stili per Ascendant card, form errors, required indicator |
| `src/components/home/MiniVenusCalculator.tsx` | Calcoli accurati, LocationPicker compatto, Ascendente in risultati |
| `src/components/home/MiniVenusCalculator.module.css` | Stili Ascendant mini, form error, required |
| `src/types/domain.ts` | Aggiunto `ascendingSign`, `latitude`, `longitude` a VenusProfile |
| `src/contexts/VenusProfileContext.tsx` | Aggiunto `setAscendingSign`, aggiornato DEFAULT_PROFILE |

---

## 📦 Dipendenze Aggiunte

```json
{
  "dependencies": {
    "ephemeris": "^2.x.x"
  }
}
```

**Installazione:**
```bash
npm install ephemeris
```

---

## ⚙️ Configurazione API

### Variabili d'Ambiente

#### File `.env` (Frontend)
```env
VITE_GOOGLE_GEO_API_KEY=your_google_api_key_here
```

#### Supabase Edge Function Secrets
| Nome Secret | Descrizione |
|-------------|-------------|
| `GOOGLE_GEO_API_KEY` | API Key Google Geocoding |
| `SUPADB_URL` | URL Database Supabase |
| `SUPADB_ANON_KEY` | Anon Key Database |
| `SUPADB_SERVICE_ROLE_KEY` | Service Role Key |

---

## 🧪 Test di Verifica

### Caso di Test Utente
- **Data:** 30/04/1978
- **Ora:** 10:55
- **Luogo:** Varsavia, Polonia
- **Coordinate:** Lat 52.2297, Lon 21.0122

### Risultati Attesi
Il calcolo deve produrre risultati coerenti con calcolatori astrologici online affidabili.

---

## 📝 Note Tecniche

### Precisione del Calcolo
- Il calcolo del Segno di Venere usa effemeridi astronomiche precise
- L'Ascendente è calcolato usando il metodo RAMC (Right Ascension of Medium Coeli)
- L'obliquità dell'eclittica è calcolata per l'epoca corretta

### Limiti Noti
1. La conversione timezone usa JavaScript Date che dipende dal timezone del browser
2. Il calcolo è più preciso per località con timezone standard
3. Non considera l'ora legale storica (DST)

### Miglioramenti Futuri Suggeriti
1. Integrazione con database timezone (es. IANA)
2. Uso di timezone storiche accurate
3. Validazione incrociata con multiple fonti astronomiche
