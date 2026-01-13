export interface Project {
    id: string;
    title: string;
    shortDescription: string;
    role: string;
    featured: boolean;
    tech: string[];
    repoUrl: string;
    liveUrl?: string;
    image: string;
}

export const projects: Project[] = [
    {
        id: 'project-1',
        title: 'Sistema de Gestión de Inventario',
        shortDescription:
            'Aplicación full-stack CRUD para gestión de inventario con Java Spring Boot, MySQL y frontend en JavaScript.',
        role: 'Full Stack Developer',
        featured: true,
        tech: ['Java', 'Spring Boot', 'MySQL', 'HTML', 'CSS', 'JavaScript'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name', // TODO: Replace with actual repo
        liveUrl: undefined,
        image: '/projects/project-1.png', // TODO: Add actual project screenshot
    },
    {
        id: 'project-2',
        title: 'Portfolio Responsive',
        shortDescription:
            'Sitio web portfolio personal diseñado con HTML5, CSS3 y JavaScript. Totalmente responsive y optimizado.',
        role: 'Frontend Developer',
        featured: true,
        tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name', // TODO: Replace with actual repo
        liveUrl: 'https://albertogalvez-dev.github.io/TODO-add-repo-name', // TODO: Replace with actual URL
        image: '/projects/project-2.png', // TODO: Add actual project screenshot
    },
    {
        id: 'project-3',
        title: 'API REST de Gestión de Tareas',
        shortDescription:
            'API RESTful para gestión de tareas con autenticación JWT, desarrollada con Node.js y Express.',
        role: 'Backend Developer',
        featured: true,
        tech: ['Node.js', 'Express', 'JWT', 'REST API', 'MySQL'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name', // TODO: Replace with actual repo
        liveUrl: undefined,
        image: '/projects/project-3.png', // TODO: Add actual project screenshot
    },
    {
        id: 'project-4',
        title: 'Diseño de Base de Datos E-Commerce',
        shortDescription:
            'Diseño completo de base de datos relacional para plataforma e-commerce con diagramas ER y normalización.',
        role: 'Database Designer',
        featured: true,
        tech: ['MySQL', 'Database Design', 'ER Diagrams', 'Normalization'],
        repoUrl: 'https://github.com/albertogalvez-dev/TODO-add-repo-name', // TODO: Replace with actual repo
        liveUrl: undefined,
        image: '/projects/project-4.png', // TODO: Add actual project screenshot
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

