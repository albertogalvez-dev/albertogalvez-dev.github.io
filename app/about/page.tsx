import type { Metadata } from 'next';
import { AboutSection } from '@/components/about-section';
import { ExperienceTimeline } from '@/components/experience-timeline';
import { SITE_CONFIG } from '@/lib/constants';

export const metadata: Metadata = {
    title: 'About Me | ' + SITE_CONFIG.name,
    description: `Learn more about ${SITE_CONFIG.name}, experience and skills in web development.`,
};

export default function AboutPage() {
    return (
        <div className="min-h-screen">
            {/* Reuse the AboutSection component from home */}
            <AboutSection />

            {/* Reuse the ExperienceTimeline component from home */}
            <ExperienceTimeline />
        </div>
    );
}
