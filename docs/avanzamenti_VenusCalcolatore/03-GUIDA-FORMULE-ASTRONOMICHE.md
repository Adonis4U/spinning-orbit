# 🔧 Guida Tecnica - Formule Astronomiche

> **Documento:** Spiegazione Algoritmi di Calcolo  
> **Progetto:** House of Venus - Venus Calculator  
> **Data:** 13 Dicembre 2024

---

## 📋 Indice

1. [Calcolo del Segno di Venere](#1-calcolo-del-segno-di-venere)
2. [Calcolo dell'Ascendente](#2-calcolo-dellascendente)
3. [Sistema di Coordinate](#3-sistema-di-coordinate)
4. [Conversioni Temporali](#4-conversioni-temporali)
5. [Riferimenti e Fonti](#5-riferimenti-e-fonti)

---

## 1. Calcolo del Segno di Venere

### 1.1 Teoria Base

Il **Segno di Venere** indica la posizione del pianeta Venere lungo l'eclittica al momento della nascita. L'eclittica è divisa in 12 segni di 30° ciascuno.

```
Ariete:     0° - 30°
Toro:      30° - 60°
Gemelli:   60° - 90°
Cancro:    90° - 120°
Leone:    120° - 150°
Vergine:  150° - 180°
Bilancia: 180° - 210°
Scorpione:210° - 240°
Sagittario:240° - 270°
Capricorno:270° - 300°
Acquario: 300° - 330°
Pesci:    330° - 360°
```

### 1.2 Implementazione con Ephemeris

```typescript
import ephemeris from 'ephemeris';

function calculateVenusSign(birthDate: Date, birthTime?: string): VenusSign {
    // 1. Costruisci la data con ora
    const date = new Date(birthDate);
    if (birthTime) {
        const [h, m] = birthTime.split(':').map(Number);
        date.setHours(h, m);
    }

    // 2. Calcola posizione usando effemeridi
    const result = ephemeris.getPosition(date, 0, 0, 0);
    
    // 3. Estrai longitudine di Venere
    const venusLongitude = result.venus.raw.longitude;
    
    // 4. Converti in segno zodiacale
    return longitudeToZodiacSign(venusLongitude);
}
```

### 1.3 Formula di Conversione

```typescript
function longitudeToZodiacSign(longitude: number): VenusSign {
    // Normalizza a 0-360°
    const normalized = ((longitude % 360) + 360) % 360;
    
    // Calcola indice segno (0-11)
    const signIndex = Math.floor(normalized / 30);
    
    // Mappa indice a nome segno
    const signs = ['aries', 'taurus', ...];
    return signs[signIndex];
}
```

---

## 2. Calcolo dell'Ascendente

### 2.1 Definizione Astronomica

L'**Ascendente** (Rising Sign) è il grado dell'eclittica che sorge all'orizzonte est nel momento esatto della nascita, visto da una specifica località geografica.

### 2.2 Formula Matematica Completa

La formula standard per calcolare l'Ascendente è:

```
tan(λ) = cos(RAMC) / -(sin(ε) × tan(φ) + cos(ε) × sin(RAMC))
```

Dove:
- **λ** = Longitudine eclittica dell'Ascendente
- **RAMC** = Right Ascension of Medium Coeli (Local Sidereal Time in gradi)
- **ε** = Obliquità dell'eclittica (~23.44°)
- **φ** = Latitudine geografica del luogo di nascita

### 2.3 Passaggi del Calcolo

#### Passo 1: Conversione Ora Locale → UTC

```typescript
// JavaScript Date gestisce automaticamente il timezone
const localDate = new Date(birthDate);
localDate.setHours(hours, minutes, 0, 0);

const utcYear = localDate.getUTCFullYear();
const utcMonth = localDate.getUTCMonth() + 1;
const utcDay = localDate.getUTCDate();
const utcHours = localDate.getUTCHours();
const utcMinutes = localDate.getUTCMinutes();
```

#### Passo 2: Calcolo Giorno Giuliano

Il Giorno Giuliano (JD) è un conteggio continuo di giorni dall'1 gennaio 4713 a.C.

```typescript
function dateToJulianDay(year, month, day, hour, minute): number {
    let y = year;
    let m = month;

    // Gennaio e Febbraio sono mesi 13 e 14 dell'anno precedente
    if (m <= 2) {
        y -= 1;
        m += 12;
    }

    // Costanti del calendario gregoriano
    const A = Math.floor(y / 100);
    const B = 2 - A + Math.floor(A / 4);

    // Frazione del giorno
    const dayFraction = (hour + minute / 60) / 24;

    // Formula del Giorno Giuliano
    const jd = Math.floor(365.25 * (y + 4716))
        + Math.floor(30.6001 * (m + 1))
        + day + dayFraction + B - 1524.5;

    return jd;
}
```

#### Passo 3: Calcolo GMST (Greenwich Mean Sidereal Time)

```typescript
function calculateGMST(jd: number): number {
    // Secoli giuliani da J2000.0 (1 gennaio 2000 12:00 TT)
    const T = (jd - 2451545.0) / 36525;

    // Formula IAU 2006
    let gmst = 280.46061837 
        + 360.98564736629 * (jd - 2451545.0) 
        + 0.000387933 * T * T 
        - T * T * T / 38710000;

    // Normalizza a 0-360°
    return ((gmst % 360) + 360) % 360;
}
```

#### Passo 4: Calcolo RAMC (Local Sidereal Time)

```typescript
// RAMC = GMST + Longitudine geografica (est positiva)
let ramc = gmst + longitude;
ramc = ((ramc % 360) + 360) % 360;
```

#### Passo 5: Calcolo Obliquità dell'Eclittica

L'obliquità varia lentamente nel tempo (nutazione):

```typescript
const T = (jd - 2451545.0) / 36525;
const obliquityDeg = 23.4392911 - 0.0130042 * T;
const obliquityRad = (obliquityDeg * Math.PI) / 180;
```

#### Passo 6: Applicazione Formula Ascendente

```typescript
// Converti in radianti
const ramcRad = (ramc * Math.PI) / 180;
const latRad = (latitude * Math.PI) / 180;

// Calcola componenti trigonometriche
const sinRAMC = Math.sin(ramcRad);
const cosRAMC = Math.cos(ramcRad);
const sinObl = Math.sin(obliquityRad);
const cosObl = Math.cos(obliquityRad);
const tanLat = Math.tan(latRad);

// Formula: tan(λ) = cos(RAMC) / -(sin(ε)×tan(φ) + cos(ε)×sin(RAMC))
const y = cosRAMC;
const x = -(sinObl * tanLat + cosObl * sinRAMC);

// Usa atan2 per gestione corretta del quadrante
let ascRad = Math.atan2(y, x);
let ascDeg = (ascRad * 180) / Math.PI;
```

#### Passo 7: Correzione del Quadrante

```typescript
// Normalizza a 0-360°
ascDeg = ((ascDeg % 360) + 360) % 360;

// Correzione quadrante: se il denominatore (x) è positivo,
// l'Ascendente è nell'emisfero opposto
if (x > 0) {
    ascDeg += 180;
}
if (ascDeg >= 360) {
    ascDeg -= 360;
}
```

---

## 3. Sistema di Coordinate

### 3.1 Coordinate Geografiche

| Parametro | Descrizione | Range | Convenzione |
|-----------|-------------|-------|-------------|
| Latitudine (φ) | N-S dalla linea equatoriale | -90° a +90° | Nord = positivo |
| Longitudine (λ) | E-W dal meridiano di Greenwich | -180° a +180° | Est = positivo |

### 3.2 Coordinate Eclittiche

Il sistema eclittico ha come piano di riferimento l'orbita terrestre:

| Parametro | Descrizione | Range |
|-----------|-------------|-------|
| Longitudine eclittica | Posizione lungo l'eclittica | 0° - 360° |
| Latitudine eclittica | Distanza dall'eclittica | -90° a +90° |

### 3.3 Sistema Equatoriale

| Parametro | Descrizione |
|-----------|-------------|
| Ascensione Retta (RA) | Angolo lungo l'equatore celeste |
| Declinazione (Dec) | Angolo dall'equatore celeste |

---

## 4. Conversioni Temporali

### 4.1 Tempo Solare vs Tempo Siderale

- **Giorno Solare**: 24 ore (rotazione rispetto al Sole)
- **Giorno Siderale**: 23h 56m 4s (rotazione rispetto alle stelle)

### 4.2 Giorno Giuliano (JD)

| Epoca | JD |
|-------|-----|
| J2000.0 (1 Gen 2000 12:00 TT) | 2451545.0 |
| 30 Apr 1978 10:55 UTC | ~2443619.955 |

### 4.3 Secolo Giuliano (T)

```typescript
T = (JD - 2451545.0) / 36525
```

Usato per calcoli di precisione che considerano la variazione secolare.

---

## 5. Riferimenti e Fonti

### 5.1 Algoritmi

1. **Meeus, Jean** - *Astronomical Algorithms* (1991)
   - Formule standard per GMST, JD, obliquità
   
2. **IAU Standards**
   - GMST formula (IAU 2006 precession model)
   - Obliquità media dell'eclittica

### 5.2 Effemeridi

- **VSOP87**: Teoria planetaria per posizioni Sole/pianeti
- **ephemeris npm package**: Implementazione JavaScript di effemeridi

### 5.3 Strumenti di Verifica

Per verificare i calcoli:
- [astro.com](https://astro.com) - Calcoli astrologici professionali
- [cafeastrology.com](https://cafeastrology.com) - Calcoli gratuiti
- [astrotheme.com](https://astrotheme.com) - Database celebrità

---

## 📊 Esempio Completo

### Input
- **Data**: 30 Aprile 1978
- **Ora**: 10:55 (ora locale)
- **Luogo**: Varsavia, Polonia (52.23°N, 21.01°E)

### Calcolo Passo-Passo

```
1. Ora UTC: 10:55 CEST = 08:55 UTC (aprile = ora legale +2)
   (Ma JavaScript Date usa il timezone del browser)

2. JD: ≈ 2443619.87

3. T: (2443619.87 - 2451545.0) / 36525 ≈ -0.2170

4. GMST: 280.46 + 360.99*(JD-2451545) + ... ≈ 47.5°

5. RAMC: 47.5° + 21.01° = 68.51°

6. Obliquità: 23.44° + 0.0130*0.217 ≈ 23.44°

7. Formula Ascendente:
   y = cos(68.51°) = 0.365
   x = -(sin(23.44°)*tan(52.23°) + cos(23.44°)*sin(68.51°))
     = -(0.398*1.29 + 0.917*0.93)
     = -(0.513 + 0.853)
     = -1.366
   
   atan2(0.365, -1.366) ≈ 165° (circa Leone/Vergine)

8. Segno: Longitudine 165° → Vergine (150°-180°)
```

### Nota sui Risultati
La precisione dipende da:
- Accuratezza dell'ora di nascita
- Correzione timezone (ora legale storica)
- Libreria effemeridi utilizzata
