'use client';

import { TECH_STACKS } from '@/lib/constants';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ScrollReveal } from '@/components/scroll-reveal';
import { getDeviconUrl } from '@/lib/utils';

export function TechStacksSection() {
    return (
        <section className="py-16 sm:py-20">
            <PageContainer>
                {/* Header with SectionSpark icon (same as Featured Projects) */}
                <ScrollReveal>
                    <div className="flex items-center gap-3">
                        <SectionSpark />
                        <h2 className="text-3xl font-bold tracking-tight">Tech Stacks</h2>
                    </div>
                    <p className="mt-4 max-w-2xl text-white/70">
                        Technologies and tools I use to build projects.
                    </p>
                </ScrollReveal>

                {/* VERTICAL layout: categories stacked one below another */}
                <div className="mt-12 flex flex-col gap-8">
                    {TECH_STACKS.map((stack) => (
                        <div
                            key={stack.category}
                            className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-4 md:gap-8 items-start"
                        >
                            {/* Category label - left side on desktop, top on mobile */}
                            <h3 className="text-base font-semibold text-white/70">
                                {stack.category}
                            </h3>

                            {/* Chips container - right side on desktop, below on mobile */}
                            <div className="flex flex-wrap gap-3">
                                {stack.technologies.map((tech) => {
                                    const iconUrl = getDeviconUrl(tech);
                                    return (
                                        <span
                                            key={tech}
                                            className="group flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 text-sm text-white/80 transition-transform duration-200 hover:rotate-[6deg] hover:border-white/20"
                                        >
                                            {iconUrl && (
                                                <img
                                                    src={iconUrl}
                                                    alt={`${tech} icon`}
                                                    className="h-4 w-4"
                                                    loading="lazy"
                                                />
                                            )}
                                            {tech}
                                        </span>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}
