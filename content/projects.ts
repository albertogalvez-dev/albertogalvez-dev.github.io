/**
 * Project data model for the portfolio Projects Hub.
 * Supports detail pages with slug routing, status indicators, and rich media.
 */

export type ProjectStatus = 'live' | 'in-progress' | 'coming-soon';

export interface ProjectVideo {
    src: string;
    poster?: string;
}

export interface Project {
    slug: string;
    title: string;
    shortDescription: string;
    longDescription: string;
    role: string;
    featured: boolean;
    tech: string[];
    repoUrl: string;
    liveUrl?: string;
    status: ProjectStatus;
    highlights: string[];
    gallery: string[];
    video?: ProjectVideo;
}

export const projects: Project[] = [
    {
        slug: 'wms',
        title: 'WMS – Warehouse Management System',
        shortDescription:
            'Sistema integral de gestión de inventario y almacén con arquitectura de microservicios y despliegue en Oracle Cloud.',
        longDescription:
            'Plataforma empresarial para la gestión completa de operaciones de almacén, incluyendo control de inventario en tiempo real, recepción y despacho de mercancía, gestión de ubicaciones y generación de reportes analíticos. Desarrollado con arquitectura limpia siguiendo principios SOLID y patrones de diseño escalables.\n\nEl sistema implementa autenticación JWT, roles y permisos granulares, además de un dashboard interactivo con métricas clave de rendimiento del almacén.',
        role: 'Full Stack Developer & DevOps',
        featured: true,
        tech: [
            'Java',
            'Spring Boot',
            'Spring Security',
            'PostgreSQL',
            'Docker',
            'Nginx',
            'REST API',
            'JWT',
            'HTML',
            'CSS',
            'JavaScript',
        ],
        repoUrl: 'https://github.com/albertogalvez-dev/wms-warehouse-management',
        liveUrl: '/wms/',
        status: 'in-progress',
        highlights: [
            'Arquitectura de microservicios con Spring Boot y comunicación REST',
            'Autenticación y autorización con JWT y Spring Security',
            'Base de datos PostgreSQL con migraciones Flyway',
            'Despliegue automatizado con Docker y Nginx en Oracle Cloud',
            'Dashboard con métricas de inventario y operaciones en tiempo real',
            'API documentada con OpenAPI/Swagger',
        ],
        gallery: [
            '/projects/wms/dashboard.svg',
            '/projects/wms/inventory.svg',
            '/projects/wms/reports.svg',
        ],
        video: undefined,
    },
    {
        slug: 'helpdesk',
        title: 'Helpdesk MVP',
        shortDescription:
            'Sistema de tickets de soporte técnico con backend en FastAPI, colas Redis y panel de administración en tiempo real.',
        longDescription:
            'MVP de sistema de mesa de ayuda diseñado para equipos de soporte técnico. Permite la creación, asignación y seguimiento de tickets con prioridades y SLAs configurables. Incluye notificaciones en tiempo real, historial de cambios y métricas de rendimiento del equipo.\n\nEl backend utiliza FastAPI para alto rendimiento asíncrono, Redis para colas de tareas y caché, y PostgreSQL como almacenamiento principal. El frontend proporciona un panel intuitivo para agentes y usuarios finales.',
        role: 'Backend Developer & System Architect',
        featured: true,
        tech: [
            'Python',
            'FastAPI',
            'PostgreSQL',
            'Redis',
            'Docker',
            'Nginx',
            'WebSockets',
            'Celery',
            'HTML',
            'CSS',
            'JavaScript',
        ],
        repoUrl: 'https://github.com/albertogalvez-dev/helpdesk-mvp',
        liveUrl: '/helpdesk/',
        status: 'in-progress',
        highlights: [
            'API REST asíncrona de alto rendimiento con FastAPI',
            'Sistema de colas y tareas en background con Redis y Celery',
            'Notificaciones en tiempo real mediante WebSockets',
            'Gestión de SLAs y prioridades con escalamiento automático',
            'Panel de métricas y KPIs del equipo de soporte',
        ],
        gallery: [
            '/projects/helpdesk/inbox.svg',
            '/projects/helpdesk/ticket-detail.svg',
            '/projects/helpdesk/dashboard.svg',
        ],
        video: undefined,
    },
    {
        slug: 'project-3',
        title: 'Project 3',
        shortDescription:
            'Próximo proyecto en desarrollo. Mantente atento para más detalles.',
        longDescription:
            'Este proyecto se encuentra actualmente en fase de planificación y diseño. Pronto se revelarán más detalles sobre su stack tecnológico, funcionalidades y objetivos.\n\nSigue el repositorio o vuelve a consultar esta página para actualizaciones.',
        role: 'Full Stack Developer',
        featured: false,
        tech: [],
        repoUrl: '',
        liveUrl: undefined,
        status: 'coming-soon',
        highlights: [
            'Detalles próximamente',
            'Stack tecnológico por definir',
            'En fase de planificación',
        ],
        gallery: [],
        video: undefined,
    },
    {
        slug: 'project-4',
        title: 'Project 4',
        shortDescription:
            'Próximo proyecto en desarrollo. Mantente atento para más detalles.',
        longDescription:
            'Este proyecto se encuentra actualmente en fase de planificación y diseño. Pronto se revelarán más detalles sobre su stack tecnológico, funcionalidades y objetivos.\n\nSigue el repositorio o vuelve a consultar esta página para actualizaciones.',
        role: 'Full Stack Developer',
        featured: false,
        tech: [],
        repoUrl: '',
        liveUrl: undefined,
        status: 'coming-soon',
        highlights: [
            'Detalles próximamente',
            'Stack tecnológico por definir',
            'En fase de planificación',
        ],
        gallery: [],
        video: undefined,
    },
];

// ────────────────────────────────────────────────────────────────────────────
// Helper Functions
// ────────────────────────────────────────────────────────────────────────────

/**
 * Retrieves all projects.
 */
export function getAllProjects(): Project[] {
    return projects;
}

/**
 * Finds a project by its unique slug.
 * @param slug - The URL-friendly identifier of the project.
 * @returns The matching Project or undefined if not found.
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find((project) => project.slug === slug);
}

/**
 * Returns an array of all project slugs for static path generation.
 * Useful for Next.js generateStaticParams.
 */
export function getAllProjectSlugs(): string[] {
    return projects.map((project) => project.slug);
}

/**
 * Retrieves featured projects up to a specified limit.
 * @param limit - Maximum number of featured projects to return.
 */
export function getFeaturedProjects(limit: number = 4): Project[] {
    return projects.filter((project) => project.featured).slice(0, limit);
}

/**
 * Filters projects by their current status.
 * @param status - The status to filter by.
 */
export function getProjectsByStatus(status: ProjectStatus): Project[] {
    return projects.filter((project) => project.status === status);
}
