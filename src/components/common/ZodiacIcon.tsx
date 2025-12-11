import type { ComponentProps } from 'react';

/* ===========================================
   ZODIAC ICONS - PREMIUM COLLECTION
   High-quality, elegant SVG paths designed for House of Venus.
   Style: Minimalist monoline, consistent stroke width, geometric precision.
   =========================================== */

export const ZODIAC_SVG_PATHS: Record<string, string> = {
    // Aries: Styled ram's horns ensuring symmetrical curvature
    aries: "M12 21V10 M6 4a6 6 0 0 1 6 6 a6 6 0 0 1 6-6",

    // Taurus: Perfect circle with elegant horns
    taurus: "M12 20a6 6 0 1 0 0-12 6 6 0 0 0 0 12z M6 8a6 6 0 0 1 12 0",

    // Gemini: Pillars connected by curved horizons
    gemini: "M5 4.5c4 2 10 2 14 0 M5 19.5c4 2 10 2 14 0 M7 5.5v13 M17 5.5v13",

    // Cancer: Interlocking claws, perfectly circular flow
    cancer: "M6 15a3 3 0 1 0 3-3 3 3 0 0 0-3 3zm0 0h12 M18 9a3 3 0 1 0-3 3 3 3 0 0 0 3-3zm0 0H6",

    // Leo: Fluid tail loop connecting to the main mane
    leo: "M16 4a3 3 0 0 0-3 3c0 1.5 1 2.5 1 4a4 4 0 1 1-8 0c0-2 1-3.5 3-4",

    // Virgo: Loop detail on the final leg
    virgo: "M5 4v16M5 12c3 0 4-5 7-5s4 5 4 5v8 M16 12c3 0 4-5 7-5s2 1 2 3v3l-4 4",

    // Libra: The setting sun with horizon
    libra: "M4 19h16 M4 15h16 M7 15a5 5 0 0 1 10 0",

    // Scorpio: Sharp tail stinger
    scorpio: "M5 4v12 M5 10c3 0 4-5 7-5s4 5 4 5v8 M16 10c3 0 4-5 7-5s3 2 3 5v6l3 3",

    // Sagittarius: The arrow, clean diagonal
    sagittarius: "M5 19L19 5 M19 5v8 M19 5H11 M7 17l-3 3",

    // Capricorn: The sea-goat tail loop
    capricorn: "M4 8.5c1-3 5-3 5 0v3c0 3 4 3 4 0s-4-4-4 0 M10 11.5L8 16",

    // Aquarius: Two parallel fluid waves
    aquarius: "M4 10c2.5-3.5 6-3.5 8 0s5.5 3.5 8 0 M4 16c2.5-3.5 6-3.5 8 0s5.5 3.5 8 0",

    // Pisces: Two fish tied by a cord
    pisces: "M18 4c-4 5-4 11 0 16 M6 4c4 5 4 11 0 16 M2 12h20"
};

interface ZodiacIconProps extends ComponentProps<'svg'> {
    sign: string | null | undefined;
    size?: number | string;
}

export default function ZodiacIcon({
    sign,
    size = 24,
    className,
    ...props
}: ZodiacIconProps) {
    const signKey = sign?.toLowerCase() as keyof typeof ZODIAC_SVG_PATHS;
    const path = ZODIAC_SVG_PATHS[signKey];

    if (!path) {
        return null;
    }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={className}
            {...props}
        >
            <path d={path} />
        </svg>
    );
}
