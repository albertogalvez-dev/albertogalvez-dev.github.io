'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ProjectCard } from '@/components/project-card';
import { GlowyGrid } from '@/components/glowy-grid';
import { getFeaturedProjects } from '@/content/projects';
import { ScrollReveal } from '@/components/scroll-reveal';

export function FeaturedProjects() {
    const featured = getFeaturedProjects(4);

    return (
        <section className="py-16 sm:py-20">
            <PageContainer>
                <ScrollReveal>
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <SectionSpark />
                                <h2 className="text-3xl font-bold tracking-tight">Featured Projects</h2>
                            </div>
                            <p className="mt-4 max-w-2xl text-white/70">
                                A selection of recent work, styled to match the rest of the site.
                            </p>
                        </div>

                        <Link
                            href="/projects"
                            className="inline-flex w-fit items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
                        >
                            View All Projects
                            <ArrowRight className="h-4 w-4" aria-hidden="true" />
                        </Link>
                    </div>
                </ScrollReveal>

                <div className="mt-12">
                    <GlowyGrid>
                        {featured.map((project) => (
                            <ProjectCard key={project.id} project={project} />
                        ))}
                    </GlowyGrid>
                </div>
            </PageContainer>
        </section>
    );
}

