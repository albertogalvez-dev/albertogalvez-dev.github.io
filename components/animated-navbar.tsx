'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const CONFIG = {
    scrollThreshold: 60,
    navHeightTop: 72,
    navHeightScrolled: 56,
    topOffset: 16,
    maxWidthTop: '1280px',
    maxWidthScrolled: '896px',
    horizontalPaddingTop: 24,
    horizontalPaddingScrolled: 24,

    spring: {
        stiffness: 400,
        damping: 40,
        mass: 1,
    },
};

const NAV_ITEMS = [
    { id: 'home', label: 'Home' },
    { id: 'projects', label: 'Projects' },
    { id: 'about', label: 'About Me' },
] as const;

type NavItemId = (typeof NAV_ITEMS)[number]['id'];

const SECTION_IDS = ['home', 'projects', 'about'];

function getNavHref(id: NavItemId, isHome: boolean): string {
    if (id === 'projects') return '/projects';
    if (id === 'about') return '/about';
    return isHome ? `#${id}` : `/#${id}`;
}

function useScrollThreshold(threshold: number): boolean {
    const [isScrolled, setIsScrolled] = useState(false);
    const rafRef = useRef<number | null>(null);
    const lastScrolled = useRef(false);

    useEffect(() => {
        const checkScroll = () => {
            const scrolled = window.scrollY > threshold;
            if (scrolled !== lastScrolled.current) {
                lastScrolled.current = scrolled;
                setIsScrolled(scrolled);
            }
            rafRef.current = null;
        };

        const handleScroll = () => {
            if (rafRef.current === null) {
                rafRef.current = requestAnimationFrame(checkScroll);
            }
        };

        checkScroll();
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (rafRef.current !== null) {
                cancelAnimationFrame(rafRef.current);
            }
        };
    }, [threshold]);

    return isScrolled;
}

function useActiveSection(sectionIds: string[]): string {
    const [activeSection, setActiveSection] = useState(sectionIds[0] || '');

    useEffect(() => {
        const observers: IntersectionObserver[] = [];

        sectionIds.forEach((id) => {
            const element = document.getElementById(id);
            if (!element) return;

            const observer = new IntersectionObserver(
                ([entry]) => {
                    if (entry.isIntersecting) {
                        setActiveSection(id);
                    }
                },
                { rootMargin: '-30% 0px -60% 0px', threshold: 0 }
            );

            observer.observe(element);
            observers.push(observer);
        });

        return () => observers.forEach((o) => o.disconnect());
    }, [sectionIds]);

    return activeSection;
}

export function AnimatedNavbar() {
    const pathname = usePathname();
    const isHome = pathname === '/';
    const isScrolled = useScrollThreshold(CONFIG.scrollThreshold);
    const activeSection = useActiveSection(SECTION_IDS);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const activeNavId: NavItemId = isHome
        ? ((SECTION_IDS.includes(activeSection) ? activeSection : 'home') as NavItemId)
        : pathname.startsWith('/projects')
            ? 'projects'
            : pathname.startsWith('/about')
                ? 'about'
                : 'home';

    const scrollTo = useCallback((e: React.MouseEvent, href: string) => {
        e.preventDefault();
        const id = href.replace('#', '');
        const el = document.getElementById(id);
        if (el) {
            const offset = CONFIG.navHeightTop;
            window.scrollTo({ top: el.offsetTop - offset, behavior: 'smooth' });
            setMobileMenuOpen(false);
        }
    }, []);

    const scrollToContact = useCallback(() => {
        document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
        setMobileMenuOpen(false);
    }, []);

    return (
        <>
            {/* Fixed header with consistent padding */}
            <motion.header
                className="fixed left-0 right-0 z-50 px-4 md:px-6"
                initial={false}
                animate={{
                    top: isScrolled ? CONFIG.topOffset : 0,
                }}
                transition={{ ...CONFIG.spring, type: 'spring' }}
            >
                {/* Nav container - CAMBIO 1: transparencia + blur + borde */}
                <motion.nav
                    className={cn(
                        'mx-auto flex items-center justify-between',
                        'backdrop-blur-md bg-[#0f1219]/90',
                        'border border-white/10',
                        'motion-reduce:transition-none'
                    )}
                    initial={false}
                    animate={{
                        height: isScrolled ? CONFIG.navHeightScrolled : CONFIG.navHeightTop,
                        maxWidth: isScrolled ? CONFIG.maxWidthScrolled : CONFIG.maxWidthTop,
                        borderRadius: isScrolled ? 9999 : 12,
                        paddingLeft: isScrolled ? CONFIG.horizontalPaddingScrolled : CONFIG.horizontalPaddingTop,
                        paddingRight: isScrolled ? CONFIG.horizontalPaddingScrolled : CONFIG.horizontalPaddingTop,
                    }}
                    transition={{ ...CONFIG.spring, type: 'spring' }}
                    style={{
                        boxShadow: isScrolled
                            ? '0 4px 20px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.08)'
                            : '0 1px 0 0 rgba(255, 255, 255, 0.08)',
                    }}
                >
                    {/* Logo */}
                    <Link
                        href={isHome ? '#home' : '/'}
                        onClick={isHome ? (e) => scrollTo(e, '#home') : undefined}
                        className="flex items-center shrink-0 group"
                    >
                        <motion.span
                            className="text-xl font-bold text-white font-mono"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {'{ AG }'}
                        </motion.span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-6 absolute left-1/2 -translate-x-1/2">
                        {NAV_ITEMS.map((item) => {
                            const href = getNavHref(item.id, isHome);
                            const isActive = activeNavId === item.id;

                            return (
                                <Link
                                    key={item.id}
                                    href={href}
                                    onClick={href.startsWith('#') ? (e) => scrollTo(e, href) : undefined}
                                    className={cn(
                                        'relative px-4 py-2 text-sm font-medium rounded-lg',
                                        'transition-colors duration-200',
                                        isActive
                                            ? 'text-green-400'
                                            : 'text-neutral-400 hover:text-white'
                                    )}
                                >
                                    {item.label}
                                    {isActive && (
                                        <motion.div
                                            layoutId="activeIndicator"
                                            className="absolute inset-0 bg-white/5 rounded-lg -z-10"
                                            transition={{ ...CONFIG.spring, type: 'spring' }}
                                        />
                                    )}
                                </Link>
                            );
                        })}
                    </div>

                    {/* CTA Button */}
                    <div className="flex items-center gap-3">
                        <motion.button
                            onClick={scrollToContact}
                            className="hidden md:inline-flex items-center justify-center rounded-full font-medium text-sm bg-green-500 text-neutral-900"
                            initial={false}
                            animate={{
                                paddingLeft: isScrolled ? 16 : 20,
                                paddingRight: isScrolled ? 16 : 20,
                                paddingTop: isScrolled ? 8 : 10,
                                paddingBottom: isScrolled ? 8 : 10,
                            }}
                            whileHover={{ scale: 1.02, backgroundColor: 'rgb(74 222 128)' }}
                            whileTap={{ scale: 0.98 }}
                            transition={{ ...CONFIG.spring, type: 'spring' }}
                        >
                            Contact Me
                        </motion.button>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 text-neutral-400 hover:text-white transition-colors"
                            aria-label="Toggle menu"
                        >
                            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </motion.nav>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 md:hidden bg-[#0f1219]/98 backdrop-blur-lg pt-24 px-6"
                    >
                        <motion.nav
                            initial={{ y: -20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="flex flex-col gap-2"
                        >
                            {NAV_ITEMS.map((item, index) => {
                                const href = getNavHref(item.id, isHome);
                                const isActive = activeNavId === item.id;

                                return (
                                    <motion.div
                                        key={item.id}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ delay: 0.1 + index * 0.05 }}
                                    >
                                        <Link
                                            href={href}
                                            onClick={(e) => {
                                                if (href.startsWith('#')) {
                                                    scrollTo(e, href);
                                                    return;
                                                }
                                                setMobileMenuOpen(false);
                                            }}
                                            className={cn(
                                                'block px-4 py-3 text-lg font-medium rounded-lg transition-colors',
                                                isActive
                                                    ? 'bg-green-500/10 text-green-400'
                                                    : 'text-white hover:bg-white/5'
                                            )}
                                        >
                                            {item.label}
                                        </Link>
                                    </motion.div>
                                );
                            })}
                            <motion.button
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.25 }}
                                onClick={scrollToContact}
                                className="mt-4 px-4 py-3 text-lg font-medium rounded-lg bg-green-500 text-neutral-900 hover:bg-green-400 transition-colors"
                            >
                                Contact Me
                            </motion.button>
                        </motion.nav>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
