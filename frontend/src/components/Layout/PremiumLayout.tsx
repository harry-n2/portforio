import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GoldButton } from '../UI/GoldButton';

// Placeholder Logo until we have an image
const Logo = () => (
    <div className="font-serif text-2xl font-bold tracking-widest text-gold-400">
        WTN <span className="text-xs font-sans tracking-normal text-white/50 block -mt-1">World Trade Next</span>
    </div>
);

export const PremiumLayout = ({ children }: { children: React.ReactNode }) => {
    const [scrolled, setScrolled] = useState(false);
    const { scrollY } = useScroll();

    // Parallax background effect
    const backgroundY = useTransform(scrollY, [0, 1000], ['0%', '20%']);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <div className="relative min-h-screen bg-navy-900 text-white selection:bg-gold-400 selection:text-navy-900 overflow-hidden">

            {/* Ambient Background Elements */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                {/* Gradient Orb 1 */}
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-gold-600/10 rounded-full blur-[120px]" />
                {/* Gradient Orb 2 */}
                <div className="absolute bottom-[-20%] right-[-10%] w-[60vw] h-[60vw] bg-navy-700/30 rounded-full blur-[150px]" />

                {/* Grain Texture Overlay (Optional, adds cinematic feel) */}
                <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
                    style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}
                />
            </div>

            {/* Sticky Navigation */}
            <motion.header
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'py-4 glass shadow-2xl bg-navy-900/80' : 'py-8 bg-transparent'}`}
                initial={{ y: -100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                <div className="container mx-auto px-6 flex items-center justify-between">
                    <Logo />

                    <nav className="hidden md:flex items-center gap-8">
                        {['Vision', 'Pain Points', 'Solution', 'Contact'].map((item) => (
                            <a
                                key={item}
                                href={`#${item.toLowerCase().replace(' ', '-')}`}
                                className="text-sm uppercase tracking-widest text-white/70 hover:text-gold-400 transition-colors"
                            >
                                {item}
                            </a>
                        ))}
                    </nav>

                    <GoldButton size="sm" variant="outline">
                        Client Login
                    </GoldButton>
                </div>
            </motion.header>

            {/* Main Content */}
            <main className="relative z-10 flex flex-col min-h-screen">
                {children}
            </main>

            {/* Footer */}
            <footer className="relative z-10 bg-navy-950 py-12 border-t border-white/5">
                <div className="container mx-auto px-6 text-center text-white/30 text-xs">
                    <p>&copy; {new Date().getFullYear()} World Trade Next. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};
