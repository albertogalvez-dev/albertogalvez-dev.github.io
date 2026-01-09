import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { AnimatedNavbar } from '@/components/animated-navbar';
import { Footer } from '@/components/footer';
import { Toaster } from 'sonner';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });
const jetbrainsMono = JetBrains_Mono({
    subsets: ['latin'],
    variable: '--font-jetbrains-mono',
});

export const metadata: Metadata = {
    title: {
        default: 'Alberto Gálvez - Full Stack Developer',
        template: '%s | Alberto Gálvez',
    },
    description: 'Portfolio profesional de Alberto Gálvez, Junior Full Stack Developer especializado en desarrollo web moderno.',
    openGraph: {
        title: 'Alberto Gálvez - Full Stack Developer',
        description: 'Portfolio profesional de Alberto Gálvez',
        url: 'https://albertogalvez-dev.github.io',
        siteName: 'Alberto Gálvez Portfolio',
        locale: 'es_ES',
        type: 'website',
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="es" className="dark">
            <body className={`${inter.className} ${jetbrainsMono.variable} text-white`}>
                <AnimatedNavbar />
                <main className="min-h-screen">{children}</main>
                <Footer />
                <Toaster position="bottom-right" theme="dark" />
            </body>
        </html>
    );
}

