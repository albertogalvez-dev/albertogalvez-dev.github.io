'use client';

import { cn } from '@/lib/utils';

type SectionSparkProps = {
    className?: string;
};

export function SectionSpark({ className }: SectionSparkProps) {
    return (
        <>
            <style>{`
                @keyframes sectionSpark {
                    0%,
                    100% {
                        transform: rotate(0deg) scale(1);
                    }
                    50% {
                        transform: rotate(12deg) scale(1.05);
                    }
                }

                .section-spark {
                    transform-origin: center;
                    animation: sectionSpark 2.2s ease-in-out infinite;
                }

                @media (prefers-reduced-motion: reduce) {
                    .section-spark {
                        animation: none;
                    }
                }
            `}</style>
            <svg
                aria-hidden="true"
                viewBox="0 0 24 24"
                className={cn('section-spark h-7 w-7 text-white/90', className)}
                fill="none"
            >
                <path
                    d="M12 2.5v5M12 16.5v5M2.5 12h5M16.5 12h5M4.4 4.4l3.5 3.5M16.1 16.1l3.5 3.5M19.6 4.4l-3.5 3.5M7.9 16.1l-3.5 3.5"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    opacity="0.95"
                />
                <circle cx="12" cy="12" r="1.25" fill="currentColor" opacity="0.9" />
            </svg>
        </>
    );
}
