'use client';

import { useState } from 'react';
import { cn, copyToClipboard } from '@/lib/utils';

interface CopyEmailButtonProps {
    email: string;
    className?: string;
}

export function CopyEmailButton({ email, className }: CopyEmailButtonProps) {
    const [showCopied, setShowCopied] = useState(false);

    const handleCopy = async () => {
        const success = await copyToClipboard(email);
        if (!success) return;

        setShowCopied(true);
        window.setTimeout(() => setShowCopied(false), 1500);
    };

    return (
        <div className={cn('relative', className)}>
            <button
                type="button"
                onClick={handleCopy}
                className="inline-flex h-11 items-center justify-center rounded-full bg-white/5 px-6 text-sm font-medium text-white/90 transition hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
                Copy Email
            </button>

            {showCopied && (
                <span
                    className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground shadow-sm"
                    role="status"
                    aria-live="polite"
                >
                    Copied!
                </span>
            )}
        </div>
    );
}
