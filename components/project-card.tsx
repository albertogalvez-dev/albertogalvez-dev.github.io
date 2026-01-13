'use client';

import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import type { Project, ProjectStatus } from '@/content/projects';
import { cn } from '@/lib/utils';

interface ProjectCardProps {
    project: Project;
    onOpen?: (project: Project, trigger?: HTMLElement | null) => void;
    showStatus?: boolean;
}

export function ProjectCard({ project, onOpen, showStatus }: ProjectCardProps) {
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
            className={cn(
                'group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 md:p-8 motion-reduce:transition-none',
                onOpen
                    ? 'cursor-pointer hover:border-white/20 hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background'
                    : ''
            )}
            data-project-id={project.id}
            role={onOpen ? 'button' : undefined}
            tabIndex={onOpen ? 0 : undefined}
            aria-label={onOpen ? `Open details for ${project.title}` : undefined}
            onClick={(event) => {
                if (!onOpen) return;
                const target = event.target as HTMLElement;
                if (target.closest('a, button, input, textarea, select, [data-stop-open]')) {
                    return;
                }
                onOpen(project, event.currentTarget as HTMLElement);
            }}
            onKeyDown={(event) => {
                if (!onOpen) return;
                if (event.key !== 'Enter' && event.key !== ' ') return;
                const target = event.target as HTMLElement;
                if (target.closest('a, button, input, textarea, select, [data-stop-open]')) {
                    return;
                }
                event.preventDefault();
                onOpen(project, event.currentTarget as HTMLElement);
            }}
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
                    {showStatus && (
                        <span
                            className={cn(
                                'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
                                statusStyles[project.status]
                            )}
                        >
                            {statusLabels[project.status]}
                        </span>
                    )}
                    <span
                        className={cn(
                            'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
                            showStatus
                                ? 'bg-white/5 text-white/70 ring-white/10'
                                : 'bg-primary/10 text-primary ring-primary/20'
                        )}
                    >
                        {project.role}
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

            <div className="mt-8 flex flex-wrap gap-3">
                {project.repoUrl && (
                    <Link
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-stop-open
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                    >
                        <Github className="h-4 w-4" aria-hidden="true" />
                        Repo
                    </Link>
                )}

                {project.demoUrl && (
                    <Link
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        data-stop-open
                        onClick={(event) => event.stopPropagation()}
                        onKeyDown={(event) => event.stopPropagation()}
                        className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background motion-reduce:transition-none"
                    >
                        <ExternalLink className="h-4 w-4" aria-hidden="true" />
                        Live
                    </Link>
                )}
            </div>

            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
            >
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(190,242,100,0.10),transparent_60%)]" />
            </div>
        </article>
    );
}
