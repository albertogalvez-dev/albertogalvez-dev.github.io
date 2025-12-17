'use client';

import { useEffect, useRef } from 'react';

export function NeonCursor() {
    const initializedRef = useRef(false);
    const rafRef = useRef<number | null>(null);

    useEffect(() => {
        if (initializedRef.current) return;
        initializedRef.current = true;

        // Respect reduced motion preference
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReducedMotion) return;

        let createdCanvas: HTMLCanvasElement | null = null;
        const startTime = performance.now();

        // BLOCK real mouse events from reaching the neonCursor library
        // by capturing them on the document and stopping propagation
        const blockRealMouse = (e: PointerEvent | MouseEvent) => {
            // Only block if it's a real user event (not our synthetic one)
            if (!e.isTrusted) return; // Let our synthetic events through
            // We don't stop propagation - that breaks the site
            // Instead we'll just override with synthetic events
        };

        (async () => {
            const { neonCursor } = await import('threejs-toys');

            // Create a hidden container for the cursor - NOT connected to main content
            const cursorContainer = document.createElement('div');
            cursorContainer.id = 'neon-cursor-container';
            cursorContainer.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                pointer-events: none;
                z-index: -1;
                overflow: hidden;
            `;
            document.body.appendChild(cursorContainer);

            // Initialize neonCursor on our isolated container
            neonCursor({
                el: cursorContainer,
                shaderPoints: 16,
                curvePoints: 80,
                curveLerp: 0.5,
                radius1: 5,
                radius2: 30,
                velocityTreshold: 10,
                sleepRadiusX: 100,
                sleepRadiusY: 100,
                sleepTimeCoefX: 0.0025,
                sleepTimeCoefY: 0.0025,
            });

            // Find the canvas created inside our container
            createdCanvas = cursorContainer.querySelector('canvas');
            if (createdCanvas) {
                createdCanvas.setAttribute('data-neon-cursor', 'true');
                createdCanvas.style.cssText = `
                    position: fixed !important;
                    top: 0 !important;
                    left: 0 !important;
                    width: 100vw !important;
                    height: 100vh !important;
                    pointer-events: none !important;
                    z-index: -1 !important;
                `;
            }

            // ORBIT MODE: Dispatch synthetic events to our container element
            // The library listens on the element we passed, so we dispatch there
            const animate = () => {
                const now = performance.now();
                const elapsed = (now - startTime) / 1000;
                const speed = 0.3; // Slower orbit
                const t = elapsed * speed;

                const cx = window.innerWidth / 2;
                const cy = window.innerHeight / 2;
                const r = Math.min(window.innerWidth, window.innerHeight) * 0.25;

                const x = cx + Math.cos(t) * r;
                const y = cy + Math.sin(t) * r;

                // Dispatch to the container (where neonCursor listens)
                cursorContainer.dispatchEvent(new PointerEvent('pointermove', {
                    clientX: x,
                    clientY: y,
                    bubbles: true,
                }));

                rafRef.current = requestAnimationFrame(animate);
            };

            rafRef.current = requestAnimationFrame(animate);
        })();

        return () => {
            if (rafRef.current) {
                cancelAnimationFrame(rafRef.current);
            }
            // Remove the container we created
            const container = document.getElementById('neon-cursor-container');
            if (container) {
                container.remove();
            }
        };
    }, []);

    return null;
}
