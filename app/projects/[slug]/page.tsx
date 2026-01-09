import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Github, ExternalLink } from 'lucide-react';
import { PageContainer } from '@/components/page-container';
import {
    getProjectBySlug,
    getAllProjectSlugs,
    type Project,
    type ProjectStatus,
} from '@/content/projects';

// ─────────────────────────────────────────────────────────────────────────────
// Static Generation
// ─────────────────────────────────────────────────────────────────────────────

export function generateStaticParams(): { slug: string }[] {
    return getAllProjectSlugs().map((slug) => ({ slug }));
}

export const dynamicParams = false;

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// ─────────────────────────────────────────────────────────────────────────────

type PageProps = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: 'Project Not Found | Alberto Gálvez' };
    }

    return {
        title: `${project.title} | Alberto Gálvez`,
        description: project.shortDescription,
    };
}

// ─────────────────────────────────────────────────────────────────────────────
// Status Badge Component
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
        label: 'In Progress',
    },
    'coming-soon': {
        bg: 'bg-neutral-400/10',
        text: 'text-neutral-400',
        ring: 'ring-neutral-400/30',
        label: 'Coming Soon',
    },
};

function StatusBadge({ status }: { status: ProjectStatus }) {
    const style = STATUS_STYLES[status];
    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset ${style.bg} ${style.text} ${style.ring}`}
        >
            {style.label}
        </span>
    );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main Page Component
// ─────────────────────────────────────────────────────────────────────────────

export default async function ProjectDetailPage({ params }: PageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    const showLiveButton = project.liveUrl && project.status !== 'coming-soon';
    const showRepoButton = project.repoUrl && project.repoUrl.trim() !== '';
    const isInProgress = project.status === 'in-progress';

    return (
        <PageContainer as="main" className="pt-28 pb-16 sm:pt-32 sm:pb-20">
            {/* Back Navigation */}
            <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-sm text-white/60 transition-colors hover:text-white"
            >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                Back to Projects
            </Link>

            {/* Header Section */}
            <header className="mt-8">
                <div className="flex flex-wrap items-center gap-3">
                    <StatusBadge status={project.status} />
                    <span className="text-sm text-white/50">{project.role}</span>
                </div>
                <h1 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
                    {project.title}
                </h1>
            </header>

            {/* About Section */}
            <section className="mt-12">
                <h2 className="text-xl font-semibold text-white">About</h2>
                <div className="mt-4 max-w-3xl space-y-4 text-white/70 leading-relaxed">
                    {project.longDescription.split('\n\n').map((paragraph, idx) => (
                        <p key={idx}>{paragraph}</p>
                    ))}
                </div>
            </section>

            {/* Highlights Section */}
            {project.highlights.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold text-white">Highlights</h2>
                    <ul className="mt-4 max-w-2xl space-y-2">
                        {project.highlights.map((highlight, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-white/70">
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400" aria-hidden="true" />
                                {highlight}
                            </li>
                        ))}
                    </ul>
                </section>
            )}

            {/* Tech Stack Section */}
            {project.tech.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold text-white">Tech Stack</h2>
                    <div className="mt-4 flex flex-wrap gap-2">
                        {project.tech.map((tech) => (
                            <span
                                key={tech}
                                className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-sm text-white/70"
                            >
                                {tech}
                            </span>
                        ))}
                    </div>
                </section>
            )}

            {/* Gallery Section */}
            {project.gallery.length > 0 && (
                <section className="mt-12">
                    <h2 className="text-xl font-semibold text-white">Gallery</h2>
                    <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {project.gallery.map((imgSrc, idx) => (
                            <div
                                key={idx}
                                className="overflow-hidden rounded-lg border border-white/10 bg-white/5"
                            >
                                {/* Using <img> for static export compatibility */}
                                <img
                                    src={imgSrc}
                                    alt={`${project.title} screenshot ${idx + 1}`}
                                    className="h-48 w-full object-cover"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {/* CTAs Section */}
            {(showRepoButton || showLiveButton) && (
                <section className="mt-12">
                    <div className="flex flex-wrap gap-4">
                        {showRepoButton && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
                            >
                                <Github className="h-4 w-4" aria-hidden="true" />
                                View Repository
                            </a>
                        )}

                        {showLiveButton && (
                            <div className="flex flex-col items-start gap-1">
                                <Link
                                    href={project.liveUrl!}
                                    className="inline-flex items-center gap-2 rounded-full bg-emerald-400 px-5 py-2.5 text-sm font-semibold text-neutral-900 transition-colors hover:bg-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                                >
                                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                    {isInProgress ? 'Live (Preview)' : 'Live Demo'}
                                </Link>
                                {isInProgress && (
                                    <p className="text-xs text-amber-300/80">
                                        Deployment en progreso; algunas partes pueden no estar disponibles.
                                    </p>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}
        </PageContainer>
    );
}
