'use client';

import { memo, useEffect, useRef, useState } from 'react';
import { ArrowRight, Github, Linkedin, Mail } from 'lucide-react';
import { copyToClipboard } from '@/lib/utils';
import { PROFILE } from '@/src/config/profile';
import { useHeroTypewriter } from '@/hooks/useHeroTypewriter';

const FULL_STACK_TEXT = 'Full-stack';
const DEVELOPER_TEXT = 'Developer';

const TAGLINE_TEXT =
    'Building modern web apps: frontend + backend + API + database. Always improving through real projects.';

function TypeCaret({ className }: { className?: string }) {
    return (
        <span
            aria-hidden="true"
            className={[
                'ml-1 inline-block align-[0.08em] text-primary',
                'animate-[caret_1s_steps(1,end)_infinite] motion-reduce:animate-none',
                className,
            ].join(' ')}
        >
            |
        </span>
    );
}

type TypewriterOverlayProps = {
    fullText: string;
    typedText: string;
    showCaret: boolean;
    showCursorAfterDone?: boolean;
};

function TypewriterOverlay({
    fullText,
    typedText,
    showCaret,
    showCursorAfterDone = true,
}: TypewriterOverlayProps) {
    const shouldShowCaret = showCaret || (showCursorAfterDone && typedText === fullText);

    return (
        <span className="relative block">
            <span className="select-none opacity-0">{fullText}</span>
            <span className="absolute inset-0">
                {typedText}
                {shouldShowCaret && <TypeCaret />}
            </span>
        </span>
    );
}

function usePrefersReducedMotion(): boolean {
    const [reducedMotion, setReducedMotion] = useState(false);

    useEffect(() => {
        const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

        const update = () => setReducedMotion(mediaQuery.matches);
        update();

        if (typeof mediaQuery.addEventListener === 'function') {
            mediaQuery.addEventListener('change', update);
            return () => mediaQuery.removeEventListener('change', update);
        }

        mediaQuery.addListener(update);
        return () => mediaQuery.removeListener(update);
    }, []);

    return reducedMotion;
}

export const HeroSection = memo(function HeroSection() {
    const reducedMotion = usePrefersReducedMotion();
    const { fullStack, developer, tagline, phase } = useHeroTypewriter({ reducedMotion, taglineText: TAGLINE_TEXT });

    const [showCopied, setShowCopied] = useState(false);
    const hideCopiedTimeoutRef = useRef<number | null>(null);

    useEffect(() => {
        return () => {
            if (hideCopiedTimeoutRef.current !== null) {
                window.clearTimeout(hideCopiedTimeoutRef.current);
                hideCopiedTimeoutRef.current = null;
            }
        };
    }, []);

    const copyEmail = async () => {
        const success = await copyToClipboard(PROFILE.email);
        if (!success) return;

        setShowCopied(true);
        if (hideCopiedTimeoutRef.current !== null) {
            window.clearTimeout(hideCopiedTimeoutRef.current);
        }
        hideCopiedTimeoutRef.current = window.setTimeout(() => setShowCopied(false), 2000);
    };

    const showCaretInFullStack = phase === 'FULL_STACK';
    const showCaretInDeveloper = phase !== 'FULL_STACK';

    return (
        <section id="home" className="text-white overflow-clip pt-24 pb-4 px-6 sm:px-12">
            <div className="relative mx-auto w-full max-w-screen-lg">
                <div className="relative pt-20 pb-24 sm:py-24 flex items-center">
                    <div className="w-full">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-8 flex-col lg:flex-row lg:items-end lg:gap-10">
                                <h1 className="font-mono mt-4 md:mt-2 text-5xl sm:text-6xl sm:text-start lg:text-8xl font-semibold tracking-tight leading-snug">
                                    <span className="relative inline-block whitespace-nowrap">
                                        <span className="select-none opacity-0">{FULL_STACK_TEXT}</span>
                                        <span id="type-fullstack" className="absolute inset-0">
                                            {fullStack}
                                            {showCaretInFullStack && <TypeCaret />}
                                        </span>
                                    </span>{' '}
                                    <span className="inline lg:hidden relative">
                                        <span className="select-none opacity-0">{DEVELOPER_TEXT}</span>
                                        <span className="absolute inset-0">
                                            {developer}
                                            {showCaretInDeveloper && <TypeCaret />}
                                        </span>
                                    </span>
                                </h1>

                                <div className="w-full sm:w-[240px]">
                                    <a
                                        href="#projects"
                                        className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background sm:h-11 sm:px-6 sm:text-lg motion-reduce:transition-none"
                                    >
                                        Projects
                                        <ArrowRight className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>

                            <div className="flex gap-3 items-start">
                                <p className="text-lg sm:text-xl py-4 text-white/70 leading-relaxed text-balance break-words">
                                    <TypewriterOverlay
                                        fullText={TAGLINE_TEXT}
                                        typedText={tagline}
                                        showCaret={phase === 'TAGLINE'}
                                        showCursorAfterDone={false}
                                    />
                                </p>

                                <span className="font-mono mt-4 md:mt-2 hidden lg:block text-4xl sm:text-6xl lg:text-8xl md:font-semibold tracking-tight text-end">
                                    <span className="relative inline-block whitespace-nowrap">
                                        <span className="select-none opacity-0">{DEVELOPER_TEXT}</span>
                                        <span id="type-developer" className="absolute inset-0">
                                            {developer}
                                            {showCaretInDeveloper && <TypeCaret />}
                                        </span>
                                    </span>
                                </span>
                            </div>

                            <div className="flex flex-col gap-6 mt-6 items-center justify-center sm:justify-start flex-wrap min-[475px]:flex-row">
                                <div className="flex gap-4 flex-col w-full min-[475px]:flex-row min-[475px]:w-fit">
                                    <a
                                        href={`mailto:${PROFILE.email}`}
                                        className="inline-flex w-full min-[475px]:w-fit items-center justify-center gap-2 rounded-full bg-primary px-5 py-2.5 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                                    >
                                        <Mail className="h-5 w-5" aria-hidden="true" />
                                        Contact Me
                                    </a>

                                    <div className="relative w-full min-[475px]:w-fit">
                                        <button
                                            type="button"
                                            onClick={copyEmail}
                                            className="inline-flex w-full min-[475px]:w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-base font-medium text-white transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                                        >
                                            Copy Email
                                        </button>

                                        {showCopied && (
                                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-md bg-primary px-3 py-1 text-sm font-medium text-primary-foreground">
                                                Copied!
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <a
                                        aria-label="Github"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                                        href={PROFILE.githubUrl}
                                    >
                                        <Github className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                    <a
                                        aria-label="LinkedIn"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                                        href={PROFILE.linkedinUrl}
                                    >
                                        <Linkedin className="h-5 w-5" aria-hidden="true" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
