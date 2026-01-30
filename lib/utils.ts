import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export function formatDate(date: string): string {
    return new Date(date).toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
}

export async function copyToClipboard(text: string): Promise<boolean> {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const input = document.createElement('input');
        input.value = text;
        input.setAttribute('readonly', '');
        input.style.position = 'fixed';
        input.style.left = '-999999px';
        input.style.opacity = '0';
        document.body.appendChild(input);
        input.select();
        input.setSelectionRange(0, input.value.length);
        try {
            document.execCommand('copy');
            document.body.removeChild(input);
            return true;
        } catch (error) {
            document.body.removeChild(input);
            return false;
        }
    }
}

import { DEVICON_MAP } from './constants';

export function getDeviconUrl(techName: string): string | null {
    const iconUrl = DEVICON_MAP[techName];
    if (!iconUrl) return null;
    return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${iconUrl}.svg`;
}
