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

export const SOCIAL_LINKS = {
    github: SITE_CONFIG.github,
    linkedin: SITE_CONFIG.linkedin,
    email: `mailto:${SITE_CONFIG.email}`,
};
