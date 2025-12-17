'use client';

import React, { useEffect, useRef } from 'react';
import './glowy-cards.css';

interface GlowyGridProps {
    children: React.ReactNode;
}

export function GlowyGrid({ children }: GlowyGridProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;

        const onPointerMove = (e: PointerEvent) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            container.style.setProperty('--x', `${x}px`);
            container.style.setProperty('--y', `${y}px`);
        };

        container.addEventListener('pointermove', onPointerMove);
        return () => {
            container.removeEventListener('pointermove', onPointerMove);
        };
    }, []);

    return (
        <div ref={containerRef} className="glowy-grid relative grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 group/grid overflow-hidden">
            {children}
            {/* Spotlight Overlay */}
            <div
                className="pointer-events-none absolute -inset-px transition-opacity duration-300 opacity-0 group-hover/grid:opacity-100"
                style={{
                    background: `radial-gradient(600px circle at var(--x) var(--y), rgba(16, 185, 129, 0.25), transparent 40%)`,
                    zIndex: 10,
                }}
                aria-hidden="true"
            />
        </div>
    );
}
