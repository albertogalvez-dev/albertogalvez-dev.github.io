'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { Project, ProjectStatus } from '@/content/projects';

// ─────────────────────────────────────────────────────────────────────────────
// Status Badge Styles
// ─────────────────────────────────────────────────────────────────────────────

const STATUS_STYLES: Record<ProjectStatus, { bg: string; text: string; ring: string; label: string }> = {
    live: {
        bg: 'bg-emerald-400/10',
        text: 'text-emerald-300',
        ring: 'ring-emerald-400/30',
        label: 'Live',
    },
    'in-progress': {
        bg: 'bg-amber-400/10',
        text: 'text-amber-300',
        ring: 'ring-amber-400/30',
        label: 'In progress',
    },
    'coming-soon': {
        bg: 'bg-neutral-400/10',
        text: 'text-neutral-400',
        ring: 'ring-neutral-400/30',
        label: 'Coming soon',
    },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
    const style = STATUS_STYLES[status];
    return (
        <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
        >
            {style.label}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Project Card Component
// ─────────────────────────────────────────────────────────────────────────────

interface ProjectCardProps {
    project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
    return (
        <Link
            href={`/projects/${project.slug}`}
            className="group relative block overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-all duration-200 hover:border-white/20 hover:bg-white/[0.06] hover:-translate-y-1 hover:shadow-lg hover:shadow-black/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/50 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 md:p-8 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
        >
            {/* Header: Title + Status Badge */}
            <div className="flex items-start justify-between gap-4">
                <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                        <StatusBadge status={project.status} />
                        <span className="text-xs text-white/50">{project.role}</span>
                    </div>
                    <h3 className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">
                        {project.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/70 sm:text-base">
                        {project.shortDescription}
                    </p>
                </div>
            </div>

            {/* Tech Stack Chips */}
            {project.tech.length > 0 && (
                <div className="mt-6 flex flex-wrap gap-2">
                    {project.tech.slice(0, 5).map((tech) => (
                        <span
                            key={tech}
                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                        >
                            {tech}
                        </span>
                    ))}
                    {project.tech.length > 5 && (
                        <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/50">
                            +{project.tech.length - 5}
                        </span>
                    )}
                </div>
            )}

            {/* Micro-CTA */}
            <div className="mt-6 flex items-center gap-1.5 text-sm font-medium text-emerald-400 transition-colors group-hover:text-emerald-300">
                <span>View details</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
            </div>

            {/* Hover Glow Effect */}
            <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-200 group-hover:opacity-100 motion-reduce:transition-none"
            >
                <div className="absolute -inset-24 bg-[radial-gradient(circle_at_top,rgba(16,185,129,0.10),transparent_60%)]" />
            </div>
        </Link>
    );
}
