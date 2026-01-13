'use client';

import { Download } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { SITE_CONFIG, STATS } from '@/lib/constants';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ScrollReveal } from '@/components/scroll-reveal';

export function AboutSection() {
    return (
        <section className="py-16 sm:py-20">
            <PageContainer>
                <ScrollReveal>
                    <div className="flex items-center gap-3 mb-12">
                        <SectionSpark />
                        <h2 className="text-3xl font-bold tracking-tight">About me</h2>
                    </div>
                </ScrollReveal>

                <div className="grid gap-12 md:grid-cols-2">
                    {/* Image */}
                    <div className="flex justify-center md:justify-start">
                        <div className="relative h-64 w-64 rounded-full bg-muted flex items-center justify-center">
                            <div className="text-6xl font-bold text-muted-foreground">
                                {SITE_CONFIG.name.split(' ').map(n => n[0]).join('')}
                            </div>
                        </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-semibold">
                            Hi, I'm Alberto Gálvez
                        </h3>
                        <p className="text-muted-foreground leading-7">
                            {SITE_CONFIG.aboutParagraph}
                        </p>
                        <p className="text-muted-foreground leading-7">
                            {SITE_CONFIG.aboutParagraph2}
                        </p>
                        <Link href={SITE_CONFIG.cvUrl} target="_blank">
                            <Button>
                                <Download className="mr-2 h-4 w-4" />
                                See CV
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Stats - no borders, like rijalghodi.xyz */}
                <div className="mt-16 grid gap-8 sm:grid-cols-3">
                    {STATS.map((stat) => (
                        <div key={stat.label} className="flex items-baseline gap-4">
                            <div className="text-4xl font-bold text-white">
                                {stat.value}
                            </div>
                            <div>
                                <div className="font-medium text-white/90">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-white/60">
                                    {stat.description}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </PageContainer>
        </section>
    );
}
