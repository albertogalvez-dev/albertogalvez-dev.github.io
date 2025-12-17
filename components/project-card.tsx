'use client';

import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import type { Project } from '@/content/projects';

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <article className="group relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors duration-200 hover:border-white/20 hover:bg-white/[0.06] md:p-8 motion-reduce:transition-none">
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0">
                    <h3 className="text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        {project.shortDescription}
                    </p>
                </div>

                <span className="shrink-0 whitespace-nowrap rounded-full bg-emerald-400/10 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-inset ring-emerald-400/20">
                    {project.role}
                </span>
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
                {project.tech.slice(0, 6).map((tech) => (
                    <span
                        key={tech}
                        className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                    >
                        {tech}
                    </span>
                ))}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
                <Link
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
                >
                    <Github className="h-4 w-4" aria-hidden="true" />
                    Repo
                </Link>

                {project.liveUrl && (
                    <Link
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-4 py-2 text-sm font-semibold text-neutral-900 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
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
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_60%)]" />
            </div>
        </article>
    );
}

