/* ===========================================
   LANGUAGE CONTEXT
   Manages EN/PL language with persistence
   =========================================== */

import { createContext, useContext, useEffect, useState, type ReactNode, useCallback } from 'react';
import { translations, type TranslationKeys } from '../i18n';

// Language types
export type Language = 'en' | 'pl';

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    t: (key: TranslationKeys) => string;
    tRaw: <T>(key: string) => T | string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const STORAGE_KEY = 'hov-language';

interface LanguageProviderProps {
    children: ReactNode;
    defaultLanguage?: Language;
}

export function LanguageProvider({ children, defaultLanguage = 'en' }: LanguageProviderProps) {
    // Initialize language from localStorage or default
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window === 'undefined') return defaultLanguage;
        const stored = localStorage.getItem(STORAGE_KEY);
        return (stored as Language) || defaultLanguage;
    });

    // Persist language and update document lang attribute
    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, language);
        document.documentElement.setAttribute('lang', language);
    }, [language]);

    const setLanguage = (newLanguage: Language) => {
        setLanguageState(newLanguage);
    };

    // Translation function - gets nested keys like "header.nav.shop"
    const t = useCallback((key: TranslationKeys): string => {
        const keys = key.split('.');
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                console.warn(`Translation missing for key: ${key} in language: ${language}`);
                return key;
            }
        }

        if (typeof value === 'string') {
            return value;
        }

        console.warn(`Translation value is not a string for key: ${key}`);
        return key;
    }, [language]);

    // Raw translation function for getting objects/arrays
    const tRaw = useCallback(<T,>(key: string): T | string => {
        const keys = key.split('.');
        let value: unknown = translations[language];

        for (const k of keys) {
            if (value && typeof value === 'object' && k in value) {
                value = (value as Record<string, unknown>)[k];
            } else {
                return key;
            }
        }

        return value as T;
    }, [language]);

    return (
        <LanguageContext.Provider value={{ language, setLanguage, t, tRaw }}>
            {children}
        </LanguageContext.Provider>
    );
}

// Custom hook for using language context
export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
}

// Shorthand hook for just the translation function
export function useTranslation() {
    const { t, tRaw, language } = useLanguage();
    return { t, tRaw, language };
}

// Export context for advanced usage
export { LanguageContext };
