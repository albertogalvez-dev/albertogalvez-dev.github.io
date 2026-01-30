'use client';

import type { Project } from '@/content/projects';
import { GlowyGrid } from '@/components/glowy-grid';
import { ProjectCard } from '@/components/project-card';

interface ProjectsGridProps {
    projects: Project[];
}

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    return (
        <GlowyGrid>
            {projects.map((project) => (
                <ProjectCard
                    key={project.id}
                    project={project}
                    showStatus
                />
            ))}
        </GlowyGrid>
    );
}

