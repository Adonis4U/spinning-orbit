/* ===========================================
   STARFIELD BACKGROUND COMPONENT
   Animated cosmic stars background
   =========================================== */

import { useRef, useMemo } from 'react';
import styles from './Starfield.module.css';

interface Star {
    id: number;
    x: number;
    y: number;
    size: number;
    opacity: number;
    animationDuration: number;
    animationDelay: number;
}

interface StarfieldProps {
    starCount?: number;
    className?: string;
}

export default function Starfield({ starCount = 100, className = '' }: StarfieldProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    // Generate random stars
    const stars = useMemo((): Star[] => {
        return Array.from({ length: starCount }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            animationDuration: Math.random() * 3 + 2,
            animationDelay: Math.random() * 5,
        }));
    }, [starCount]);

    // Generate shooting stars occasionally
    const shootingStars = useMemo(() => {
        return Array.from({ length: 3 }, (_, i) => ({
            id: i,
            delay: i * 8 + Math.random() * 5,
            duration: 1 + Math.random() * 0.5,
            top: Math.random() * 50,
            left: Math.random() * 30 + 10,
        }));
    }, []);

    return (
        <div ref={containerRef} className={`${styles.starfield} ${className}`}>
            {/* Static stars */}
            {stars.map((star) => (
                <div
                    key={star.id}
                    className={styles.star}
                    style={{
                        left: `${star.x}%`,
                        top: `${star.y}%`,
                        width: `${star.size}px`,
                        height: `${star.size}px`,
                        opacity: star.opacity,
                        animationDuration: `${star.animationDuration}s`,
                        animationDelay: `${star.animationDelay}s`,
                    }}
                />
            ))}

            {/* Shooting stars */}
            {shootingStars.map((star) => (
                <div
                    key={`shooting-${star.id}`}
                    className={styles.shootingStar}
                    style={{
                        top: `${star.top}%`,
                        left: `${star.left}%`,
                        animationDelay: `${star.delay}s`,
                        animationDuration: `${star.duration}s`,
                    }}
                />
            ))}

            {/* Nebula effects */}
            <div className={styles.nebula1} />
            <div className={styles.nebula2} />
        </div>
    );
}
