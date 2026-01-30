'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect when user has scrolled past a threshold
 * Uses requestAnimationFrame for performance
 * @param threshold - Scroll position in pixels to trigger (default: 80)
 * @returns boolean indicating if scrolled past threshold
 */
export function useScrollThreshold(threshold: number = 80): boolean {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        let ticking = false;

        const checkScroll = () => {
            const scrollY = window.scrollY;
            setIsScrolled(scrollY > threshold);
            ticking = false;
        };

        const handleScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(checkScroll);
                ticking = true;
            }
        };

        // Check initial position
        checkScroll();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [threshold]);

    return isScrolled;
}
