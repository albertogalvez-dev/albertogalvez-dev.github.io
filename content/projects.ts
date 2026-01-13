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
}

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'Sistema de Gestion de Inventario',
        status: 'in_progress',
        role: 'Full Stack Developer',
        shortDescription:
            'Aplicacion full-stack CRUD para gestion de inventario con Java Spring Boot, MySQL y frontend en JavaScript.',
        longDescription:
            'Plataforma interna para registrar entradas y salidas, controlar stock y generar reportes operativos.\nIncluye modulos de productos, proveedores y alertas para quiebres de stock.',
        highlights: [
            'ABM de productos y proveedores',
            'Alertas de stock minimo',
            'Reportes exportables',
        ],
        featured: true,
        stack: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
    },
    {
        id: 'project-2',
        title: 'Portfolio Responsive',
        status: 'completed',
        role: 'Frontend Developer',
        shortDescription:
            'Sitio web portfolio personal diseno con HTML5, CSS3 y JavaScript. Totalmente responsive y optimizado.',
        longDescription:
            'Portfolio personal con secciones de proyectos, habilidades y contacto.\nOptimizado para rendimiento y adaptado a multiples dispositivos.',
        highlights: [
            'Layout responsive mobile-first',
            'Animaciones sutiles y consistentes',
            'SEO basico y performance',
        ],
        featured: true,
        stack: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
        demoUrl: 'https://albertogalvez-dev.github.io/TODO-add-repo-name',
    },
    {
        id: 'project-3',
        title: 'API REST de Gestion de Tareas',
        status: 'in_progress',
        role: 'Backend Developer',
        shortDescription:
            'API RESTful para gestion de tareas con autenticacion JWT, desarrollada con Node.js y Express.',
        longDescription:
            'API para crear, asignar y priorizar tareas con autenticacion basada en JWT.\nIncluye endpoints paginados y validaciones para flujos de trabajo.',
        highlights: [
            'CRUD de tareas con filtros',
            'Auth JWT con roles',
            'Documentacion de endpoints',
        ],
        featured: true,
        stack: ['Node.js', 'Express', 'JWT', 'REST API', 'MySQL'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
    },
    {
        id: 'project-4',
        title: 'Diseno de Base de Datos E-Commerce',
        status: 'completed',
        role: 'Database Designer',
        shortDescription:
            'Diseno completo de base de datos relacional para plataforma e-commerce con diagramas ER y normalizacion.',
        longDescription:
            'Modelo relacional para catalogo, pedidos y clientes con integridad referencial.\nIncluye reglas de normalizacion y vistas para consultas frecuentes.',
        highlights: [
            'ERD completo',
            'Normalizacion hasta 3FN',
            'Indices para rendimiento',
        ],
        featured: true,
        stack: ['MySQL', 'Database Design', 'ER Diagrams', 'Normalization'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
    },
    {
        id: 'wms',
        title: 'WMS - Warehouse Management System',
        status: 'in_progress',
        role: 'Full Stack Developer & DevOps',
        shortDescription:
            'WMS web app para entradas, ubicaciones, picking y despacho con foco operativo.',
        longDescription:
            'Sistema WMS para flujos de recepcion, ubicaciones y picking guiado.\nIncluye paneles operativos y reportes en tiempo real.',
        highlights: [
            'Picking por oleadas',
            'Trazabilidad de lotes',
            'Panel operativo en tiempo real',
        ],
        featured: false,
        stack: ['Java', 'Spring Boot', 'PostgreSQL', 'Docker', 'Redis', 'React'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
    },
    {
        id: 'helpdesk',
        title: 'Helpdesk Ticketing Platform',
        status: 'coming_soon',
        role: 'Full Stack Developer',
        shortDescription:
            'Plataforma de tickets con SLAs, colas de soporte y base de conocimiento.',
        longDescription:
            'Herramienta para gestionar incidencias con flujos de aprobacion y SLAs.\nIncluye portal de autoservicio y panel para agentes.',
        highlights: [
            'Automatizaciones SLA',
            'Etiquetas y prioridades',
            'Base de conocimiento',
        ],
        featured: false,
        stack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Tailwind CSS'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name',
    },
];

export function getAllProjects(): Project[] {
    return projects;
}

export function getProjectById(id: string): Project | undefined {
    return projects.find((project) => project.id === id);
}

export function getFeaturedProjects(limit: number = 4): Project[] {
    return projects.filter((project) => project.featured).slice(0, limit);
}
