import { HeroSection } from '@/components/hero-section';
import { AboutSection } from '@/components/about-section';
import { TechStacksSection } from '@/components/tech-stacks-section';
import { FeaturedProjects } from '@/components/featured-projects';
import { ExperienceTimeline } from '@/components/experience-timeline';

export default function HomePage() {
    return (
        <>
            <HeroSection />

            <AboutSection />

            <TechStacksSection />

            <section id="projects">
                <FeaturedProjects />
            </section>

            <section id="about">
                <ExperienceTimeline />
            </section>
        </>
    );
}
