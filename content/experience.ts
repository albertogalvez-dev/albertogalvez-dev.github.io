export interface Experience {
    id: string;
    company: string;
    role: string;
    period: string;
    location: string;
    description: string;
    responsibilities: string[];
}

export const experiences: Experience[] = [
    {
        id: 'exp-1',
        company: 'To be defined',
        role: 'Internship (Prácticas)',
        period: 'Upcoming',
        location: 'Granada, Spain',
        description: 'Looking for my first internship opportunity',
        responsibilities: [
            'Open to Full Stack internship roles (Java | SQL | JavaScript).',
            'Ready to contribute and learn in a team environment.',
            'Available in Granada or remote.',
        ],
    },
];

export function getAllExperiences(): Experience[] {
    return experiences;
}

