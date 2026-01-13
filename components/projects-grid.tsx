'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { ExternalLink, Github, X } from 'lucide-react';
import type { Project, ProjectMediaVideo, ProjectStatus } from '@/content/projects';
import { GlowyGrid } from '@/components/glowy-grid';
import { ProjectCard } from '@/components/project-card';
import { cn } from '@/lib/utils';

interface ProjectsGridProps {
    projects: Project[];
}

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

export function ProjectsGrid({ projects }: ProjectsGridProps) {
    const [activeProjectId, setActiveProjectId] = useState<string | null>(null);
    const modalRef = useRef<HTMLDivElement>(null);
    const lastActiveElementRef = useRef<HTMLElement | null>(null);

    const activeProject = useMemo(
        () => projects.find((project) => project.id === activeProjectId) ?? null,
        [projects, activeProjectId]
    );

    const openProject = (project: Project, trigger?: HTMLElement | null) => {
        lastActiveElementRef.current =
            trigger ?? (document.activeElement as HTMLElement | null);
        setActiveProjectId(project.id);
        if (window.location.hash !== `#${project.id}`) {
            window.location.hash = project.id;
        }
    };

    const closeModal = () => {
        setActiveProjectId(null);
    };

    useEffect(() => {
        const openFromHash = () => {
            const id = window.location.hash.replace('#', '').trim();
            if (!id) {
                setActiveProjectId(null);
                return;
            }
            const project = projects.find((item) => item.id === id);
            if (!project) {
                setActiveProjectId(null);
                return;
            }
            setActiveProjectId(project.id);
            const card = document.querySelector<HTMLElement>(
                `[data-project-id="${project.id}"]`
            );
            if (card) {
                lastActiveElementRef.current = card;
            }
        };

        openFromHash();
        window.addEventListener('hashchange', openFromHash);
        return () => window.removeEventListener('hashchange', openFromHash);
    }, [projects]);

    useEffect(() => {
        if (!activeProject) return;
        const originalOverflow = document.body.style.overflow;
        const originalPaddingRight = document.body.style.paddingRight;
        const scrollbarWidth =
            window.innerWidth - document.documentElement.clientWidth;

        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = `${scrollbarWidth}px`;
        }

        const focusTarget = modalRef.current;
        if (focusTarget) {
            requestAnimationFrame(() => focusTarget.focus());
        }

        return () => {
            document.body.style.overflow = originalOverflow;
            document.body.style.paddingRight = originalPaddingRight;
        };
    }, [activeProject]);

    useEffect(() => {
        if (!activeProject) {
            if (window.location.hash) {
                window.history.replaceState(
                    null,
                    '',
                    `${window.location.pathname}${window.location.search}`
                );
            }
            if (lastActiveElementRef.current) {
                lastActiveElementRef.current.focus();
                lastActiveElementRef.current = null;
            }
        }
    }, [activeProject]);

    useEffect(() => {
        if (!activeProject) return;
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                event.preventDefault();
                closeModal();
            }
        };
        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeProject]);

    return (
        <>
            <GlowyGrid>
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onOpen={openProject}
                        showStatus
                    />
                ))}
            </GlowyGrid>

            {activeProject && (
                <div
                    className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 px-4 py-6 backdrop-blur-sm sm:items-center sm:px-8"
                    onClick={(event) => {
                        if (event.target === event.currentTarget) {
                            closeModal();
                        }
                    }}
                >
                    <div
                        ref={modalRef}
                        role="dialog"
                        aria-modal="true"
                        aria-labelledby="project-modal-title"
                        aria-describedby="project-modal-summary"
                        tabIndex={-1}
                        className="relative w-full max-w-4xl overflow-hidden rounded-t-2xl border border-white/10 bg-background/95 shadow-2xl outline-none sm:max-h-[85vh] sm:rounded-2xl"
                    >
                        <div className="flex items-start justify-between gap-4 border-b border-white/10 px-6 py-5">
                            <div className="min-w-0">
                                <div className="flex flex-wrap items-center gap-3">
                                    <h2
                                        id="project-modal-title"
                                        className="text-2xl font-semibold tracking-tight text-white"
                                    >
                                        {activeProject.title}
                                    </h2>
                                    <span
                                        className={cn(
                                            'whitespace-nowrap rounded-full px-3 py-1 text-xs font-semibold ring-1 ring-inset',
                                            statusStyles[activeProject.status]
                                        )}
                                    >
                                        {statusLabels[activeProject.status]}
                                    </span>
                                </div>
                                <p className="mt-2 text-sm text-white/60">
                                    {activeProject.role}
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Close project details"
                                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/70 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                            >
                                <X className="h-4 w-4" aria-hidden="true" />
                            </button>
                        </div>

                        <div className="max-h-[75vh] space-y-8 overflow-y-auto px-6 py-6 sm:max-h-[70vh]">
                            <section>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                    Summary
                                </h3>
                                <div
                                    id="project-modal-summary"
                                    className="mt-3 space-y-3 text-sm leading-relaxed text-white/75"
                                >
                                    {activeProject.longDescription
                                        .split('\n')
                                        .filter(Boolean)
                                        .map((paragraph, index) => (
                                            <p key={index}>{paragraph}</p>
                                        ))}
                                </div>
                                {activeProject.highlights &&
                                    activeProject.highlights.length > 0 && (
                                        <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-white/70">
                                            {activeProject.highlights.map(
                                                (item) => (
                                                    <li key={item}>{item}</li>
                                                )
                                            )}
                                        </ul>
                                    )}
                            </section>

                            <section>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                    Stack
                                </h3>
                                <div className="mt-3 flex flex-wrap gap-2">
                                    {activeProject.stack.map((item) => (
                                        <span
                                            key={item}
                                            className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                        >
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </section>

                            <section>
                                <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-white/60">
                                    Media
                                </h3>
                                {activeProject.media &&
                                ((activeProject.media.images &&
                                    activeProject.media.images.length > 0) ||
                                    (activeProject.media.videos &&
                                        activeProject.media.videos.length >
                                            0)) ? (
                                    <div className="mt-4 space-y-6">
                                        {activeProject.media.images &&
                                            activeProject.media.images.length >
                                                0 && (
                                                <div className="flex gap-4 overflow-x-auto pb-2">
                                                    {activeProject.media.images.map(
                                                        (image) => (
                                                            <div
                                                                key={image.src}
                                                                className="min-w-[240px] flex-1 overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:min-w-[280px]"
                                                            >
                                                                <img
                                                                    src={
                                                                        image.src
                                                                    }
                                                                    alt={
                                                                        image.alt
                                                                    }
                                                                    loading="lazy"
                                                                    className="h-full w-full object-cover"
                                                                />
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}

                                        {activeProject.media.videos &&
                                            activeProject.media.videos.length >
                                                0 && (
                                                <div className="grid gap-4 sm:grid-cols-2">
                                                    {activeProject.media.videos.map(
                                                        (video, index) => (
                                                            <div
                                                                key={`${video.type}-${video.title}-${index}`}
                                                                className="aspect-video overflow-hidden rounded-xl border border-white/10 bg-black/40"
                                                            >
                                                                {video.type ===
                                                                'mp4' ? (
                                                                    <video
                                                                        controls
                                                                        preload="metadata"
                                                                        poster={
                                                                            video.poster
                                                                        }
                                                                        className="h-full w-full"
                                                                    >
                                                                        <source
                                                                            src={
                                                                                video.src
                                                                            }
                                                                            type="video/mp4"
                                                                        />
                                                                    </video>
                                                                ) : (
                                                                    <iframe
                                                                        src={getVideoEmbedUrl(
                                                                            video
                                                                        )}
                                                                        title={
                                                                            video.title
                                                                        }
                                                                        className="h-full w-full"
                                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                        allowFullScreen
                                                                    />
                                                                )}
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            )}
                                    </div>
                                ) : (
                                    <div className="mt-4 rounded-xl border border-dashed border-white/15 bg-white/5 px-4 py-6 text-sm text-white/60">
                                        Media coming soon.
                                    </div>
                                )}
                            </section>

                            <section className="flex flex-wrap gap-3">
                                {activeProject.repoUrl && (
                                    <a
                                        href={activeProject.repoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-medium text-white/80 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        <Github
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Repo
                                    </a>
                                )}

                                {activeProject.demoUrl ? (
                                    <a
                                        href={activeProject.demoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
                                    >
                                        <ExternalLink
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Demo Live
                                    </a>
                                ) : (
                                    <button
                                        type="button"
                                        disabled
                                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-semibold text-white/50"
                                    >
                                        <ExternalLink
                                            className="h-4 w-4"
                                            aria-hidden="true"
                                        />
                                        Demo Live (Coming soon)
                                    </button>
                                )}
                            </section>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
