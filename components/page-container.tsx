import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface PageContainerProps {
    children: ReactNode;
    className?: string;
    as?: 'div' | 'section' | 'main';
}

/**
 * PageContainer - Consistent spacing container for all sections
 * Based on rijalghodi.xyz spacing pattern
 */
export function PageContainer({
    children,
    className,
    as: Component = 'div'
}: PageContainerProps) {
    return (
        <Component className={cn(
            'mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8',
            className
        )}>
            {children}
        </Component>
    );
}
