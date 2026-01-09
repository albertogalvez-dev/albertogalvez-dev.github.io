'use client';

import { useEffect, useRef, useState } from 'react';

export type HeroTypewriterPhase = 'FULL_STACK' | 'DEVELOPER' | 'TAGLINE' | 'DONE';

type UseHeroTypewriterOptions = {
    reducedMotion: boolean;
    taglineText?: string;
};

type UseHeroTypewriterReturn = {
    fullStack: string;
    developer: string;
    tagline: string;
    phase: HeroTypewriterPhase;
};

const FULL_STACK_TEXT = 'Full-stack';
const DEVELOPER_TEXT = 'Developer';

const MS_PER_CHAR = 70;
const BETWEEN_PHASES_DELAY_MS = 160;

export function useHeroTypewriter({
    reducedMotion,
    taglineText,
}: UseHeroTypewriterOptions): UseHeroTypewriterReturn {
    const [fullStack, setFullStack] = useState(reducedMotion ? FULL_STACK_TEXT : '');
    const [developer, setDeveloper] = useState(reducedMotion ? DEVELOPER_TEXT : '');
    const [tagline, setTagline] = useState(reducedMotion ? (taglineText ?? '') : '');
    const [phase, setPhase] = useState<HeroTypewriterPhase>(reducedMotion ? 'DONE' : 'FULL_STACK');

    const timeoutsRef = useRef<number[]>([]);
    const cancelledRef = useRef(false);

    useEffect(() => {
        cancelledRef.current = false;

        const clearAllTimeouts = () => {
            timeoutsRef.current.forEach((id) => window.clearTimeout(id));
            timeoutsRef.current = [];
        };

        const schedule = (fn: () => void, ms: number) => {
            const id = window.setTimeout(() => {
                if (cancelledRef.current) return;
                fn();
            }, ms);
            timeoutsRef.current.push(id);
            return id;
        };

        clearAllTimeouts();

        if (reducedMotion) {
            setFullStack(FULL_STACK_TEXT);
            setDeveloper(DEVELOPER_TEXT);
            setTagline(taglineText ?? '');
            setPhase('DONE');
            return () => {
                cancelledRef.current = true;
                clearAllTimeouts();
            };
        }

        setFullStack('');
        setDeveloper('');
        setTagline('');
        setPhase('FULL_STACK');

        const typeText = (
            text: string,
            setText: (value: string) => void,
            onDone?: () => void
        ) => {
            let index = 0;

            const step = () => {
                if (cancelledRef.current) return;
                index += 1;
                setText(text.slice(0, index));

                if (index < text.length) {
                    schedule(step, MS_PER_CHAR);
                    return;
                }

                onDone?.();
            };

            schedule(step, MS_PER_CHAR);
        };

        typeText(FULL_STACK_TEXT, setFullStack, () => {
            schedule(() => {
                setPhase('DEVELOPER');
                typeText(DEVELOPER_TEXT, setDeveloper, () => {
                    if (!taglineText) {
                        setPhase('DONE');
                        return;
                    }

                    schedule(() => {
                        setPhase('TAGLINE');
                        typeText(taglineText, setTagline, () => {
                            setPhase('DONE');
                        });
                    }, BETWEEN_PHASES_DELAY_MS);
                });
            }, BETWEEN_PHASES_DELAY_MS);
        });

        return () => {
            cancelledRef.current = true;
            clearAllTimeouts();
        };
    }, [reducedMotion, taglineText]);

    return { fullStack, developer, tagline, phase };
}
