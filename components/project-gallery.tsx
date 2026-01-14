'use client';

import { useState } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { ProjectMedia, ProjectMediaVideo } from '@/content/projects';



interface ProjectGalleryProps {
    media: ProjectMedia;
}

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

export function ProjectGallery({ media }: ProjectGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    return (
        <div className="space-y-8">
            {/* Videos */}
            {media.videos && media.videos.length > 0 && (
                <div className="space-y-6">
                    {media.videos.map((video, index) => (
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
            {media.images && media.images.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2">
                    {media.images.map((image) => (
                        <div
                            key={image.src}
                            onClick={() => setSelectedImage(image.src)}
                            className="group relative overflow-hidden rounded-xl border border-white/10 bg-white/5 transition-colors hover:border-white/20 cursor-pointer"
                        >
                            <div className="aspect-[4/3]">
                                <img
                                    src={image.src}
                                    alt={image.alt}
                                    loading="lazy"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                                    <ZoomIn className="h-8 w-8 text-white/80" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Lightbox Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 rounded-full bg-white/10 p-2 text-white/70 transition-colors hover:bg-white/20 hover:text-white"
                        onClick={() => setSelectedImage(null)}
                    >
                        <X className="h-6 w-6" />
                    </button>
                    <img
                        src={selectedImage}
                        alt="Zoomed view"
                        className="max-h-[90vh] max-w-[90vw] rounded-lg object-contain shadow-2xl"
                        onClick={(e) => e.stopPropagation()}
                    />
                </div>
            )}
        </div>
    );
}
