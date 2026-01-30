import projectsData from '@/assets/data/projects.json';

export type ProjectStatus = 'in_progress' | 'coming_soon' | 'completed';

export interface ProjectMediaImage {
    src: string;
    alt: string;
}

export type ProjectMediaVideo =
    | {
        type: 'youtube' | 'vimeo';
        id: string;
        title: string;
    }
    | {
        type: 'mp4';
        src: string;
        poster?: string;
        title: string;
    };

export interface ProjectMedia {
    images?: ProjectMediaImage[];
    videos?: ProjectMediaVideo[];
}

export interface Project {
    id: string;
    title: string;
    status: ProjectStatus;
    role: string;
    shortDescription: string;
    longDescription: string;
    highlights?: string[];
    stack: string[];
    featured: boolean;
    repoUrl?: string;
    demoUrl?: string;
    media?: ProjectMedia;
    challenges?: string;
}

export const projects: Project[] = projectsData as Project[];

export function getAllProjects(): Project[] {
    return projects;
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(limit: number = 4): Project[] {
    return projects.filter((project) => project.featured).slice(0, limit);
}
