import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ExternalLink, Github, ArrowLeft } from 'lucide-react';
import { PageContainer } from '@/components/page-container';
import { SectionSpark } from '@/components/SectionSpark';
import { ProjectGallery } from '@/components/project-gallery';
import { getProjectById, getAllProjects, ProjectMediaVideo } from '@/content/projects';
import { cn, getDeviconUrl } from '@/lib/utils';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
    const projects = getAllProjects();
    return projects.map((project) => ({
        slug: project.id,
    }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectById(slug);
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

export default async function ProjectPage({ params }: Props) {
    const { slug } = await params;
    const project = getProjectById(slug);

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
                                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10 hover:text-white"
                            >
                                <Github className="h-4 w-4" aria-hidden="true" />
                                Repo
                            </a>
                        )}

                        <button
                            type="button"
                            disabled
                            className="inline-flex items-center gap-2 rounded-full bg-primary/50 px-5 py-2.5 text-sm font-semibold text-primary-foreground/70 cursor-not-allowed"
                        >
                            <ExternalLink className="h-4 w-4" aria-hidden="true" />
                            Demo Live
                        </button>
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

                    {/* Challenges */}
                    {project.challenges && (
                        <section>
                            <h2 className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                Engineering Challenges
                            </h2>
                            <div className="rounded-xl border border-white/10 bg-white/5 p-6">
                                <p className="text-base leading-relaxed text-white/75">
                                    {project.challenges}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* Media */}
                    <section>
                        <h2 className="mb-6 text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                            Media Gallery
                        </h2>
                        {project.media &&
                            ((project.media.images && project.media.images.length > 0) ||
                                (project.media.videos && project.media.videos.length > 0)) ? (
                            <ProjectGallery media={project.media} />
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
                            {project.stack.map((tech) => {
                                const iconUrl = getDeviconUrl(tech);
                                return (
                                    <span
                                        key={tech}
                                        className="group flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/70 transition-colors hover:border-white/20 hover:text-white"
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
                </aside>
            </div>
        </PageContainer>
    );
}

