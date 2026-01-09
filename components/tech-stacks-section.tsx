'use client';

import { TECH_STACKS } from '@/lib/constants';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ScrollReveal } from '@/components/scroll-reveal';

// Map technology names to Devicon icon names (for CDN)
// Format: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-{variant}.svg
const DEVICON_MAP: Record<string, string> = {
    // Frontend
    'HTML': 'html5/html5-original',
    'CSS': 'css3/css3-original',
    'JavaScript': 'javascript/javascript-original',
    'TypeScript': 'typescript/typescript-original',
    'Angular': 'angularjs/angularjs-original',
    'Astro': 'astro/astro-original',
    'React': 'react/react-original',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original',
    // Backend
    'Java': 'java/java-original',
    'Kotlin': 'kotlin/kotlin-original',
    'C#': 'csharp/csharp-original',
    'C++': 'cplusplus/cplusplus-original',
    'PHP': 'php/php-original',
    'Python': 'python/python-original',
    // Frameworks
    'Spring Boot': 'spring/spring-original',
    '.NET': 'dotnetcore/dotnetcore-original',
    'FastAPI': 'fastapi/fastapi-original',
    // Database
    'PostgreSQL': 'postgresql/postgresql-original',
    'MySQL': 'mysql/mysql-original',
    'MariaDB': 'mariadb/mariadb-original',
    'Oracle Database': 'oracle/oracle-original',
    'MongoDB': 'mongodb/mongodb-original',
    // DevOps / Cloud
    'Docker': 'docker/docker-original',
    'Kubernetes': 'kubernetes/kubernetes-original',
    'GitHub Actions': 'github/github-original',
    'Git': 'git/git-original',
    'Linux': 'linux/linux-original',
    'AWS': 'amazonwebservices/amazonwebservices-plain-wordmark',
    'Azure': 'azure/azure-original',
};

// Generate Devicon CDN URL
function getDeviconUrl(techName: string): string | null {
    const iconPath = DEVICON_MAP[techName];
    if (!iconPath) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconPath}.svg`;
}

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
