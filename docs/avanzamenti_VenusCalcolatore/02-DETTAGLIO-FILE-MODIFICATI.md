# 📂 Dettaglio Modifiche ai File

> **Documento:** Changelog Dettagliato per File  
> **Progetto:** House of Venus - Venus Calculator  
> **Data:** 13 Dicembre 2024

---

## 🗂️ Indice dei File

1. [src/utils/astroCalc.ts](#1-srcutilsastrocalcts)
2. [src/utils/debounce.ts](#2-srcutilsdebouncets)
3. [src/data/ascendantData.ts](#3-srcdataascendantdatats)
4. [src/components/common/LocationPicker.tsx](#4-srccomponentscommonlocationpickertsx)
5. [src/components/common/LocationPicker.module.css](#5-srccomponentscommonlocationpickermodulecss)
6. [src/pages/VenusCalculator/VenusCalculator.tsx](#6-srcpagesvenusvenulatortsx)
7. [src/components/home/MiniVenusCalculator.tsx](#7-srccomponentshomeminivenuslculator)
8. [src/types/domain.ts](#8-srctypesdomaints)
9. [src/contexts/VenusProfileContext.tsx](#9-srccontextsvenuprofilecontexttsx)

---

## 1. `src/utils/astroCalc.ts`

### Stato: NUOVO FILE ✨

### Descrizione
Modulo principale per tutti i calcoli astronomici del Venus Calculator.

### Funzioni Esportate

#### `longitudeToZodiacSign(longitude: number): VenusSign`
Converte una longitudine eclittica (0-360°) nel corrispondente segno zodiacale.

```typescript
// Esempio
longitudeToZodiacSign(45) // → 'taurus' (45° = 15° in Toro)
longitudeToZodiacSign(0)  // → 'aries'
longitudeToZodiacSign(359) // → 'pisces'
```

#### `getDegreeInSign(longitude: number): number`
Restituisce il grado all'interno del segno (0-30°).

```typescript
getDegreeInSign(45) // → 15 (15° in Toro)
```

#### `calculateVenusSign(birthDate: Date, birthTime?: string): VenusSign`
Calcola il segno di Venere usando effemeridi astronomiche.

**Algoritmo:**
1. Crea oggetto Date con data e ora
2. Usa libreria `ephemeris` per calcolare posizione Venere
3. Estrae longitudine eclittica
4. Converte in segno zodiacale
5. Fallback a metodo semplificato in caso di errore

#### `calculateAscendant(birthDate: Date, birthTime: string, latitude: number, longitude: number): VenusSign`
Calcola l'Ascendente (segno nascente) usando il metodo RAMC.

**Algoritmo Dettagliato:**
```
1. Parse birth time → hours, minutes
2. Create local Date object
3. Convert to UTC using JavaScript Date
4. Calculate Julian Day: JD = f(year, month, day, hour, minute)
5. Calculate GMST (Greenwich Mean Sidereal Time)
6. Calculate RAMC = GMST + longitude
7. Calculate obliquity of ecliptic
8. Apply spherical trigonometry formula:
   tan(ASC) = cos(RAMC) / -(sin(ε)*tan(φ) + cos(ε)*sin(RAMC))
9. Correct quadrant based on denominator sign
10. Convert to zodiac sign
```

#### `geocodePlace(placeName: string): Promise<{lat, lon} | null>`
Ottiene coordinate geografiche da nome luogo usando Nominatim.

#### `calculateFullChart(birthDate: Date, birthTime: string, birthPlace: string)`
Wrapper per calcolare sia Venus che Ascendant con geocoding.

### Funzioni Interne (non esportate)

#### `julianDayToGST(jd: number): number`
Converte Giorno Giuliano in Tempo Siderale di Greenwich.

#### `dateToJulianDay(year, month, day, hour, minute): number`
Calcola il Giorno Giuliano da componenti data/ora.

---

## 2. `src/utils/debounce.ts`

### Stato: NUOVO FILE ✨

### Descrizione
Utility per limitare la frequenza di esecuzione di funzioni (usata per API calls).

### Codice Completo
```typescript
export function debounce<T extends (...args: any[]) => any>(
    func: T,
    wait: number
): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    return (...args: Parameters<T>) => {
        if (timeoutId !== null) {
            clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(() => {
            func(...args);
            timeoutId = null;
        }, wait);
    };
}
```

### Uso nel Progetto
```typescript
const searchCities = debounce(async (query, countryCode) => {
    // API call
}, 300); // 300ms delay
```

---

## 3. `src/data/ascendantData.ts`

### Stato: NUOVO FILE ✨

### Descrizione
Dati descrittivi per ogni Ascendente zodiacale.

### Struttura Dati
```typescript
interface AscendantSignData {
    sign: VenusSign;
    name: {
        en: string;
        pl: string;
    };
    description: {
        en: string;
        pl: string;
    };
    firstImpression: {
        en: string;
        pl: string;
    };
    styleVibe: {
        en: string;
        pl: string;
    };
    fashionApproach: {
        en: string;
        pl: string;
    };
}
```

### Funzioni Esportate
- `getAscendantSignData(sign: VenusSign): AscendantSignData`
- `getAllAscendantSigns(): AscendantSignData[]`

### Segni Coperti
Tutti i 12 segni con descrizioni complete in EN e PL.

---

## 4. `src/components/common/LocationPicker.tsx`

### Stato: NUOVO FILE ✨

### Descrizione
Componente riutilizzabile per selezione paese + città con autocomplete.

### Props Interface
```typescript
interface LocationPickerProps {
    value: LocationPickerValue;
    onChange: (value: LocationPickerValue) => void;
    language: 'en' | 'pl';
    compact?: boolean; // Per MiniVenusCalculator
}

interface LocationPickerValue {
    country: string;
    countryCode: string;
    city: string;
    lat: number | null;
    lon: number | null;
}
```

### Caratteristiche Tecniche
- **Country Dropdown**: Searchable con 50+ paesi
- **City Autocomplete**: Debounced API calls a Nominatim
- **Google Fallback**: Se Nominatim fallisce
- **Click Outside**: Chiude dropdown automaticamente
- **Keyboard Navigation**: Supporto base

### Lista Paesi (COUNTRIES constant)
```typescript
{ code: 'PL', name_en: 'Poland', name_pl: 'Polska' },
{ code: 'US', name_en: 'United States', name_pl: 'Stany Zjednoczone' },
{ code: 'IT', name_en: 'Italy', name_pl: 'Włochy' },
// ... 50+ countries
```

---

## 5. `src/components/common/LocationPicker.module.css`

### Stato: NUOVO FILE ✨

### Classi CSS Principali

| Classe | Descrizione |
|--------|-------------|
| `.locationPicker` | Container principale |
| `.fieldGroup` | Gruppo label + input |
| `.label` | Etichetta con icona |
| `.select` | Button trigger dropdown paese |
| `.dropdown` | Menu dropdown (z-index: 1000, bg: white !important) |
| `.searchWrapper` | Container ricerca paese |
| `.searchInput` | Input ricerca |
| `.optionsList` | Lista opzioni scrollabile |
| `.option` | Singola opzione (hover: gold) |
| `.input` | Input città |
| `.loader` | Spinner durante ricerca |
| `.clearButton` | Pulsante X per cancellare |
| `.compact` | Variante compatta |

### Fix Applicati
```css
/* Fix sfondo trasparente */
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

---

## 6. `src/pages/VenusCalculator/VenusCalculator.tsx`

### Stato: MODIFICATO 🔄

### Modifiche Principali

#### Import Aggiunti
```typescript
import { calculateVenusSign, calculateAscendant } from '../../utils/astroCalc';
import { getAscendantSignData } from '../../data/ascendantData';
import LocationPicker, { type LocationPickerValue } from '../../components/common/LocationPicker';
```

#### Import Rimossi
```typescript
// import { geocodePlace } from '../../utils/astroCalc'; // Non più usato direttamente
// import { MapPin } from 'lucide-react'; // Sostituito da LocationPicker
```

#### Nuovi State
```typescript
const [location, setLocation] = useState<LocationPickerValue>({
    country: '',
    countryCode: '',
    city: profile.placeOfBirth || '',
    lat: profile.latitude ?? null,
    lon: profile.longitude ?? null,
});
const [ascendantResult, setAscendantResult] = useState<VenusSign | null>(null);
const [formError, setFormError] = useState<string | null>(null);
```

#### handleCalculate Riscritto
```typescript
// Usa coordinate da LocationPicker invece di geocoding
if (location.lat !== null && location.lon !== null) {
    const ascendant = calculateAscendant(
        new Date(birthDate), 
        birthTime, 
        location.lat, 
        location.lon
    );
    setAscendantResult(ascendant);
}
```

#### handleReset Aggiornato
```typescript
setLocation({
    country: '',
    countryCode: '',
    city: '',
    lat: null,
    lon: null,
});
setFormError(null);
```

#### Nuovo JSX per Ascendant Display
```tsx
{ascendantResult && ascendantSignData && (
    <motion.div className={styles.ascendantCard}>
        <div className={styles.ascendantHeader}>
            <Sunrise size={24} />
            <h3>Your Rising Sign</h3>
        </div>
        // ... display ascendant data
    </motion.div>
)}
```

---

## 7. `src/components/home/MiniVenusCalculator.tsx`

### Stato: MODIFICATO 🔄

### Modifiche Principali

#### Import Aggiornati
```typescript
// PRIMA
import { calculateVenusSign } from '../../utils/venusMath';

// DOPO
import { calculateVenusSign, calculateAscendant } from '../../utils/astroCalc';
import LocationPicker, { type LocationPickerValue } from '../common/LocationPicker';
```

#### Result State Aggiornato
```typescript
// PRIMA
const [result, setResult] = useState<{
    sign: string;
    keywords: string[];
    matches: string[];
    colors: string[];
} | null>(null);

// DOPO
const [result, setResult] = useState<{
    sign: VenusSign;
    ascendant: VenusSign | null;  // NUOVO
    keywords: string[];
    matches: string[];
    colors: string[];
} | null>(null);
```

#### Birth Time Ora Obbligatorio
```typescript
// PRIMA
disabled={!birthDate || isCalculating}

// DOPO  
disabled={!birthDate || !birthTime || isCalculating}
```

#### Nuovo Display Ascendant
```tsx
{result.ascendant && ascendantZodiacData && (
    <motion.div className={styles.ascendantMini}>
        <Sunrise size={14} />
        <span>Rising: {ascendantZodiacData.symbol} {ascendantZodiacData.name_en}</span>
    </motion.div>
)}
```

---

## 8. `src/types/domain.ts`

### Stato: MODIFICATO 🔄

### Modifiche all'Interface VenusProfile
```typescript
interface VenusProfile {
    // ... campi esistenti ...
    
    // NUOVI CAMPI
    ascendingSign?: VenusSign;  // Segno Ascendente
    latitude?: number;          // Latitudine luogo nascita
    longitude?: number;         // Longitudine luogo nascita
}
```

---

## 9. `src/contexts/VenusProfileContext.tsx`

### Stato: MODIFICATO 🔄

### Modifiche al DEFAULT_PROFILE
```typescript
const DEFAULT_PROFILE: VenusProfile = {
    // ... campi esistenti ...
    
    // NUOVI DEFAULT
    ascendingSign: undefined,
    latitude: undefined,
    longitude: undefined,
};
```

### Nuova Funzione nel Context
```typescript
interface VenusProfileContextType {
    // ... esistenti ...
    setAscendingSign: (sign: VenusSign) => void;  // NUOVO
}

// Implementazione
const setAscendingSign = useCallback((sign: VenusSign) => {
    updateProfile({ ascendingSign: sign });
}, [updateProfile]);
```

---

## 📊 Statistiche Modifiche

| Tipo | Conteggio |
|------|-----------|
| File Nuovi | 5 |
| File Modificati | 4+ |
| Righe Aggiunte | ~1500+ |
| Funzioni Nuove | 10+ |
| Componenti Nuovi | 1 |

---

## 🧪 Coverage Test

### Funzionalità Testate
- [x] Calcolo Venus Sign
- [x] Calcolo Ascendant
- [x] Geocoding Nominatim
- [x] Fallback Google
- [x] LocationPicker dropdown
- [x] LocationPicker autocomplete
- [x] Form validation
- [x] Bilingual support

### Browser Testati
- Chrome (principale)
- Edge
- Firefox (da verificare)
