import { Github, Linkedin } from 'lucide-react';
import { CopyEmailButton } from '@/components/copy-email-button';
import { PROFILE } from '@/src/config/profile';

export function Footer() {
    return (
        <footer id="contact" className="py-12 sm:py-14">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    <div className="mb-5">
                        <a
                            href="#home"
                            aria-label="Back to top"
                            className="inline-flex items-center justify-center rounded-md font-mono text-[32px] font-bold leading-none text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                        >
                            {'{ AG }'}
                        </a>
                    </div>

                    <h2 className="text-2xl sm:text-3xl font-semibold text-white">
                        Let's Work Together
                    </h2>

                    <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
                        <a
                            href={`mailto:${PROFILE.email}`}
                            className="inline-flex h-11 items-center justify-center rounded-full bg-green-500 px-6 text-sm font-semibold text-neutral-900 shadow-sm transition-colors hover:bg-green-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-400 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900"
                        >
                            Contact Me
                        </a>
                        <CopyEmailButton email={PROFILE.email} />
                    </div>

                    {/* CAMBIO 2: Iconos GitHub/LinkedIn iguales a los del Hero */}
                    <div className="mt-7 flex items-center gap-2">
                        <a
                            href={PROFILE.githubUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="GitHub"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
                        >
                            <Github className="h-5 w-5" aria-hidden="true" />
                        </a>

                        <a
                            href={PROFILE.linkedinUrl}
                            target="_blank"
                            rel="noreferrer noopener"
                            aria-label="LinkedIn"
                            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white/70 transition-colors hover:text-emerald-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-900 motion-reduce:transition-none"
                        >
                            <Linkedin className="h-5 w-5" aria-hidden="true" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
