/* ===========================================
   VENUS PROFILE CONTEXT
   Manages user's astrological profile
   =========================================== */

import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import type { VenusSign, VenusProfile } from '../types/domain';

interface VenusProfileContextType {
    profile: VenusProfile;
    setVenusSign: (sign: VenusSign) => void;
    setSunSign: (sign: VenusSign | null) => void;
    setRisingSign: (sign: VenusSign | null) => void;
    updateProfile: (data: Partial<VenusProfile>) => void;
    clearProfile: () => void;
    hasProfile: boolean;
}

const VenusProfileContext = createContext<VenusProfileContextType | undefined>(undefined);

const STORAGE_KEY = 'hov-venus-profile';

const DEFAULT_PROFILE: VenusProfile = {
    venusSign: null,
    sunSign: null,
    risingSign: null,
    dateOfBirth: undefined,
    timeOfBirth: undefined,
    placeOfBirth: undefined,
    lastCalculatedAt: undefined,
};

interface VenusProfileProviderProps {
    children: ReactNode;
}

export function VenusProfileProvider({ children }: VenusProfileProviderProps) {
    // Initialize profile from localStorage
    const [profile, setProfile] = useState<VenusProfile>(() => {
        if (typeof window === 'undefined') return DEFAULT_PROFILE;

        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return { ...DEFAULT_PROFILE, ...JSON.parse(stored) };
            }
        } catch (error) {
            console.error('Failed to parse stored Venus profile:', error);
        }

        return DEFAULT_PROFILE;
    });

    // Persist profile to localStorage
    useEffect(() => {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(profile));
        } catch (error) {
            console.error('Failed to save Venus profile:', error);
        }
    }, [profile]);

    const setVenusSign = (sign: VenusSign) => {
        setProfile(prev => ({
            ...prev,
            venusSign: sign,
            lastCalculatedAt: new Date().toISOString(),
        }));
    };

    const setSunSign = (sign: VenusSign | null) => {
        setProfile(prev => ({
            ...prev,
            sunSign: sign,
        }));
    };

    const setRisingSign = (sign: VenusSign | null) => {
        setProfile(prev => ({
            ...prev,
            risingSign: sign,
        }));
    };

    const updateProfile = (data: Partial<VenusProfile>) => {
        setProfile(prev => ({
            ...prev,
            ...data,
        }));
    };

    const clearProfile = () => {
        setProfile(DEFAULT_PROFILE);
        localStorage.removeItem(STORAGE_KEY);
    };

    const hasProfile = profile.venusSign !== null;

    return (
        <VenusProfileContext.Provider
            value={{
                profile,
                setVenusSign,
                setSunSign,
                setRisingSign,
                updateProfile,
                clearProfile,
                hasProfile,
            }}
        >
            {children}
        </VenusProfileContext.Provider>
    );
}

// Custom hook for using Venus profile context
export function useVenusProfile() {
    const context = useContext(VenusProfileContext);
    if (context === undefined) {
        throw new Error('useVenusProfile must be used within a VenusProfileProvider');
    }
    return context;
}

// Export context for advanced usage
export { VenusProfileContext };
