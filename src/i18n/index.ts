/* ===========================================
   I18N INDEX - Translations Entry Point
   =========================================== */

import { en } from './en';
import { pl } from './pl';

// Type for translation schema (inferred from en.ts)
export type TranslationSchema = typeof en;

// All translations
export const translations: Record<'en' | 'pl', TranslationSchema> = {
    en,
    pl,
};

// Helper type for nested object keys (dot notation)
type NestedKeyOf<T> = T extends object
    ? {
        [K in keyof T & string]: T[K] extends object
        ? `${K}` | `${K}.${NestedKeyOf<T[K]>}`
        : `${K}`;
    }[keyof T & string]
    : never;

// Type for translation keys like "header.nav.shop"
export type TranslationKeys = NestedKeyOf<TranslationSchema>;

// Re-export translations
export { en, pl };
