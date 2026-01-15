'use client';

import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import type { Project, ProjectStatus } from '@/content/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    showStatus?: boolean;
}

export function ProjectCard({ project, showStatus }: ProjectCardProps) {
    const statusLabels: Record<ProjectStatus, string> = {
        in_progress: 'In progress',
        coming_soon: 'Coming soon',
        completed: 'Completed',
    };

    const statusStyles: Record<ProjectStatus, string> = {
        in_progress: 'bg-primary/10 text-primary ring-primary/30',
        coming_soon: 'bg-white/5 text-white/60 ring-white/15',
        completed: 'bg-secondary/10 text-secondary ring-secondary/30',
    };

    const stackPreview = project.stack.slice(0, 5);
    const remainingStack = project.stack.length - stackPreview.length;

    return (
        <article
            className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] md:p-8 motion-reduce:transition-none"
            data-project-id={project.id}
        >
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        {project.shortDescription}
                    </p>
                </div>

                <div className="flex shrink-0 flex-col items-end gap-2 text-right">

                    <span
                        className={cn(
                            'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
                            statusStyles[project.status]
                        )}
                    >
                        {statusLabels[project.status]}
                    </span>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {stackPreview.map((tech) => (
                    <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                        {tech}
                    </span>
                ))}
                {remainingStack > 0 && (
                    <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                        +{remainingStack}
                    </span>
                )}
            </div>

            <div className="relative z-20 mt-8 flex flex-wrap gap-3">
                {project.repoUrl && (
                    <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        Repo
                    </a>
                )}

                {project.demoUrl && (
                    <button
                        type="button"
                        disabled
                        className="inline-flex items-center gap-2 rounded-full bg-primary/50 px-4 py-2 text-sm font-semibold text-primary-foreground/70 cursor-not-allowed"
                    >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live
                    </button>
                )}
            </div>

            {/* Stretched Link for the whole card */}
            <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 z-10 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background"
                aria-label={`View details for ${project.title}`}
            />

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
            >
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(190,242,100,0.10),transparent_60%)]" />
            </div>
        </article>
    );
}

