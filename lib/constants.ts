import { PROFILE } from '@/src/config/profile';

export const SITE_CONFIG = {
    name: 'Alberto Gálvez',
    role: 'Junior Full Stack Developer',
    location: 'Granada, Spain',
    email: PROFILE.email,
    github: PROFILE.githubUrl,
    linkedin: PROFILE.linkedinUrl,
    cvUrl: '/CV_Alberto_Galvez.pdf',
    description:
        'Web & Multiplatform App Development student focused on full-stack projects with Java, SQL, and JavaScript. Looking for internship/junior roles. I enjoy clean code and thorough documentation.',
    aboutParagraph:
        'I build modern web applications with a full-stack mindset, combining clean frontend UI with solid backend fundamentals. I focus on writing maintainable code, documenting what I build, and shipping real projects end-to-end.',
    aboutParagraph2:
        "I'm currently studying Web & Multiplatform Application Development (DAM/DAW) and looking for internship or junior opportunities. I work with Java, SQL, and JavaScript/TypeScript, and I'm growing my skills in Spring Boot, .NET, FastAPI, databases, and DevOps tooling.",
};

export const STATS = [
    {
        label: 'Year of experience',
        value: '1+',
        description: 'Learning by building real projects',
    },
    {
        label: 'Successful projects',
        value: '4+',
        description: 'Presentable apps and coursework deliverables',
    },
    {
        label: 'Main focus',
        value: '100%',
        description: 'Performance, accessibility & UX',
    },
];

export const TECH_STACKS = [
    {
        category: 'Frontend',
        technologies: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'Angular', 'Astro', 'React', 'Tailwind CSS'],
    },
    {
        category: 'Backend',
        technologies: ['Java', 'Kotlin', 'C#', 'C++', 'PHP', 'Python'],
    },
    {
        category: 'Frameworks',
        technologies: ['Spring Boot', '.NET', 'FastAPI'],
    },
    {
        category: 'Database',
        technologies: ['PostgreSQL', 'MySQL', 'MariaDB', 'Oracle Database', 'MongoDB'],
    },
    {
        category: 'DevOps / Cloud',
        technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Git', 'Linux', 'AWS', 'Azure'],
    },
];

// Map technology names to Devicon icon names (for CDN)
// Format: https://cdn.jsdelivr.net/gh/devicons/devicon/icons/{name}/{name}-{variant}.svg
export const DEVICON_MAP: Record<string, string> = {
    // Frontend
    'HTML': 'html5/html5-original',
    'CSS': 'css3/css3-original',
    'JavaScript': 'javascript/javascript-original',
    'TypeScript': 'typescript/typescript-original',
    'Angular': 'angularjs/angularjs-original',
    'Astro': 'astro/astro-original',
    'React': 'react/react-original',
    'Tailwind CSS': 'tailwindcss/tailwindcss-original',
    'TailwindCSS': 'tailwindcss/tailwindcss-original', // Add alias for project data
    // Backend
    'Java': 'java/java-original',
    'Kotlin': 'kotlin/kotlin-original',
    'C#': 'csharp/csharp-original',
    'C++': 'cplusplus/cplusplus-original',
    'PHP': 'php/php-plain', // Note: some icons might be plain
    'Python': 'python/python-original',
    // Frameworks
    'Spring Boot': 'spring/spring-original',
    '.NET': 'dotnetcore/dotnetcore-original',
    '.NET 8': 'dotnetcore/dotnetcore-original', // Alias
    'FastAPI': 'fastapi/fastapi-original',
    // Database
    'PostgreSQL': 'postgresql/postgresql-original',
    'MySQL': 'mysql/mysql-original',
    'MariaDB': 'mariadb/mariadb-original',
    'Oracle Database': 'oracle/oracle-original',
    'MongoDB': 'mongodb/mongodb-original',
    'Redis': 'redis/redis-original', // Add Redis
    // DevOps / Cloud
    'Docker': 'docker/docker-original',
    'Kubernetes': 'kubernetes/kubernetes-original',
    'GitHub Actions': 'github/github-original',
    'Git': 'git/git-original',
    'Linux': 'linux/linux-original',
    'AWS': 'amazonwebservices/amazonwebservices-plain-wordmark',
    'AWS S3': 'amazonwebservices/amazonwebservices-plain-wordmark', // Alias
    'Azure': 'azure/azure-original',
    'Prisma': 'prisma/prisma-original', // Add Prisma
    'Nginx': 'nginx/nginx-original', // Add Nginx
    'Node.js': 'nodejs/nodejs-original', // Add Node.js
    'Express': 'express/express-original', // Add Express
    'Socket.io': 'socketio/socketio-original', // Add Socket.io
};

export const SOCIAL_LINKS = {
    github: SITE_CONFIG.github,
    linkedin: SITE_CONFIG.linkedin,
    email: `mailto:${SITE_CONFIG.email}`,
};
