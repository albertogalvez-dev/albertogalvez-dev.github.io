import type { Metadata } from 'next';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ProjectCard } from '@/components/project-card';
import { GlowyGrid } from '@/components/glowy-grid';
import { getAllProjects } from '@/content/projects';

export const metadata: Metadata = {
    title: 'Projects',
    description: 'Explore all my web development and software projects.',
};

export default function ProjectsPage() {
    const projects = getAllProjects();

    return (
        <PageContainer as="main" className="pt-28 pb-16 sm:pt-32 sm:pb-20">
            <div className="flex items-center gap-3">
                <SectionSpark />
                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Projects</h1>
            </div>
            <p className="mt-4 max-w-2xl text-white/70">
                A curated list of projects, with more details and live demos added over time.
            </p>

            <div className="mt-12">
                <GlowyGrid>
                    {projects.map((project) => (
                        <ProjectCard key={project.id} project={project} />
                    ))}
                </GlowyGrid>
            </div>
        </PageContainer>
    );
}

