import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { getProjectById, getAllProjects, ProjectMediaVideo } from '@/content/projects';
import { cn } from '@/lib/utils';

interface Props {
    params: {
        slug: string;
    };
}

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const project = getProjectById(params.slug);
    if (!project) {
        return {
            title: 'Project Not Found',
        };
    }
    return {
        title: `${project.title} | Alberto Galvez`,
        description: project.shortDescription,
    };
}

const statusLabels = {
    in_progress: 'In progress',
    coming_soon: 'Coming soon',
    completed: 'Completed',
};

const statusStyles = {
    in_progress: 'bg-primary/10 text-primary ring-primary/30',
    coming_soon: 'bg-white/5 text-white/60 ring-white/15',
    completed: 'bg-secondary/10 text-secondary ring-secondary/30',
};

function getVideoEmbedUrl(video: ProjectMediaVideo): string {
    switch (video.type) {
        case 'youtube':
            return `https://www.youtube.com/embed/${video.id}`;
        case 'vimeo':
            return `https://player.vimeo.com/video/${video.id}`;
        case 'mp4':
            return video.src;
        default:
            return '';
    }
}

export default function ProjectPage({ params }: Props) {
    const project = getProjectById(params.slug);

    if (!project) {
        notFound();
    }

    return (
        <PageContainer as="main" className="pt-24 pb-16 sm:pt-32 sm:pb-20">
            {/* Back Navigation */}
            <div className="mb-8">
                <Link
                    href="/projects"
                    className="inline-flex items-center gap-2 text-sm text-white/50 transition-colors hover:text-white"
                >
                    <ArrowLeft className="h-4 w-4" />
                    Back to Projects
                </Link>
            </div>

            {/* Header */}
            <header className="mb-12 border-b border-white/10 pb-8">
                <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                        <div className="mb-4 flex flex-wrap items-center gap-3">
                            <SectionSpark className="inline-block" />
                            <h1 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                {project.title}
                            </h1>
                            <span
                                className={cn(
                                    'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
                                    statusStyles[project.status]
                                )}
                            >
                                {statusLabels[project.status]}
                            </span>
                        </div>
                        <p className="text-lg text-white/60">{project.role}</p>
                    </div>

                    <div className="flex flex-wrap gap-3">
                        {project.repoUrl && (
                            <a
                                href={project.repoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white/80 transition-colors hover:bg-white/10"
                            >
                                <Github className="h-4 w-4" aria-hidden="true" />
                                Repo
                            </a>
                        )}

                        {project.demoUrl ? (
                            <a
                                href={project.demoUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover"
                            >
                                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                Demo Live
                            </a>
                        ) : (
                            <button
                                type="button"
                                disabled
                                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-semibold text-white/50 cursor-not-allowed"
                            >
                                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                                Demo Live (Coming soon)
                            </button>
                        )}
                    </div>
                </div>
            </header>

            <div className="grid gap-12 lg:grid-cols-3 lg:gap-16">
                {/* Main Content */}
                <div className="lg:col-span-2 space-y-12">
                    {/* Summary */}
                    <section>
                        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Summary
                        </h2>
                        <div className="space-y-4 text-base leading-relaxed text-white/75">
                            {project.longDescription
                                .split('\n')
                                .filter(Boolean)
                                .map((paragraph, index) => (
                                    <p key={index}>{paragraph}</p>
                                ))}
                        </div>
                        {project.highlights && project.highlights.length > 0 && (
                            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                                {project.highlights.map((item) => (
                                    <li key={item} className="flex items-start gap-2 text-sm text-white/70">
                                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/50" />
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </section>

                    {/* Media */}
                    <section>
                        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Media Gallery
                        </h2>
                        {project.media &&
                            ((project.media.images && project.media.images.length > 0) ||
                                (project.media.videos && project.media.videos.length > 0)) ? (
                            <div className="space-y-8">
                                {/* Videos */}
                                {project.media.videos && project.media.videos.length > 0 && (
                                    <div className="space-y-6">
                                        {project.media.videos.map((video, index) => (
                                            <div
                                                key={`${video.type}-${video.title}-${index}`}
                                                className="overflow-hidden rounded-xl border border-white/10 bg-black/40"
                                            >
                                                <div className="aspect-video w-full">
                                                    {video.type === 'mp4' ? (
                                                        <video
                                                            controls
                                                            preload="metadata"
                                                            poster={video.poster}
                                                            className="h-full w-full"
                                                        >
                                                            <source src={video.src} type="video/mp4" />
                                                        </video>
                                                    ) : (
                                                        <iframe
                                                            src={getVideoEmbedUrl(video)}
                                                            title={video.title}
                                                            className="h-full w-full"
                                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                            allowFullScreen
                                                        />
                                                    )}
                                                </div>
                                                <p className="border-t border-white/5 bg-white/5 px-4 py-3 text-sm font-medium text-white/80">
                                                    {video.title}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {/* Images */}
                                {project.media.images && project.media.images.length > 0 && (
                                    <div className="grid gap-6 sm:grid-cols-2">
                                        {project.media.images.map((image) => (
                                            <div
                                                key={image.src}
                                                className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20"
                                            >
                                                <div className="aspect-[4/3]">
                                                    <img
                                                        src={image.src}
                                                        alt={image.alt}
                                                        loading="lazy"
                                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="rounded-xl border border-dashed border-white/15 bg-white/5 px-8 py-12 text-center">
                                <p className="text-white/40">Media content coming soon.</p>
                            </div>
                        )}
                    </section>
                </div>

                {/* Sidebar - Stack */}
                <aside className="space-y-8">
                    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 lg:sticky lg:top-32">
                        <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Tech Stack
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {project.stack.map((item) => (
                                <span
                                    key={item}
                                    className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 transition-colors hover:bg-white/10 hover:text-white"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </aside>
            </div>
        </PageContainer>
    );
}
