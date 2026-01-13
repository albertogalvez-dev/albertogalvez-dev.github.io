'use client';

import { Building2, Calendar, MapPin } from 'lucide-react';
import { getAllExperiences } from '@/content/experience';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ScrollReveal } from '@/components/scroll-reveal';

export function ExperienceTimeline() {
    const experiences = getAllExperiences();

    return (
        <section className="py-16 sm:py-20">
            <PageContainer>
                <ScrollReveal>
                    <div className="flex items-center gap-3">
                        <SectionSpark />
                        <h2 className="text-3xl font-bold tracking-tight">My Work Experience</h2>
                    </div>
                    <p className="mt-4 max-w-2xl text-white/70">
                        Experiences that I've had throughout my career.
                    </p>
                </ScrollReveal>

                <ol className="relative mt-12 grid gap-y-12 before:absolute before:inset-y-0 before:left-5 before:w-px before:bg-white/10 before:content-['']">
                    {experiences.map((exp) => (
                        <li key={exp.id} className="grid grid-cols-[2.5rem_1fr] gap-x-6">
                            <div className="relative flex justify-center">
                                <span
                                    className="mt-2 h-3 w-3 rounded-full bg-white/20 ring-4 ring-white/10"
                                    aria-hidden="true"
                                />
                            </div>

                            <article className="grid grid-cols-1 gap-y-6 lg:grid-cols-12 lg:gap-x-12">
                                <div className="lg:col-span-4">
                                    <div className="flex items-center gap-2 text-sm text-white/60">
                                        <Calendar className="h-4 w-4 text-white/40" aria-hidden="true" />
                                        <span>{exp.period}</span>
                                    </div>

                                    <h3 className="mt-2 text-xl font-semibold text-primary sm:text-2xl">
                                        {exp.role}
                                    </h3>

                                    <div className="mt-4 space-y-2 text-sm text-white/70">
                                        <div className="flex items-center gap-2">
                                            <Building2 className="h-4 w-4 text-white/40" aria-hidden="true" />
                                            <span>{exp.company}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="h-4 w-4 text-white/40" aria-hidden="true" />
                                            <span>{exp.location}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="lg:col-span-8">
                                    <p className="text-base font-medium text-white sm:text-lg">
                                        {exp.description}
                                    </p>
                                    <ul className="mt-4 space-y-3">
                                        {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                                            <li key={idx} className="flex gap-3 text-white/70">
                                                <span
                                                    className="mt-2 h-1.5 w-1.5 flex-none rounded-full bg-white/30"
                                                    aria-hidden="true"
                                                />
                                                <span className="text-sm leading-6 sm:text-base">{resp}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </article>
                        </li>
                    ))}
                </ol>
            </PageContainer>
        </section>
    );
}
