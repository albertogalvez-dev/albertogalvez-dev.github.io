'use client';

import { useState, useEffect } from 'react';

/**
 * Hook to detect which section is currently active based on viewport visibility
 * Uses IntersectionObserver for performance
 * @param sectionIds - Array of section IDs to track (e.g., ['home', 'projects', 'about'])
 * @returns currently active section ID
 */
export function useActiveSection(sectionIds: string[]): string {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        // Track which sections are currently visible
        const visibleSections = new Set<string>();

        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -60% 0px', // Section is "active" when it's in the upper portion of viewport
            threshold: 0,
        };

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        visibleSections.add(id);
                    } else {
                        visibleSections.delete(id);
                    }

                    // Set active to the first visible section in the order of sectionIds
                    const firstVisible = sectionIds.find(sectionId => visibleSections.has(sectionId));
                    if (firstVisible) {
                        setActiveSection(firstVisible);
                    }
                });
            }, observerOptions);

            observer.observe(element);
            observers.push(observer);
        });

        return () => {
            observers.forEach(observer => observer.disconnect());
        };
    }, [sectionIds]);

    return activeSection;
}
