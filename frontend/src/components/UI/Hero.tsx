import React from 'react';
import { motion } from 'framer-motion';
import { GoldButton } from './GoldButton';
import { ArrowRight, Sparkles } from 'lucide-react';

export const Hero = () => {
    return (
        <section className="relative min-h-screen flex flex-col justify-center items-center px-6 pt-20 overflow-hidden">

            {/* Cinematic Intro Text */}
            <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="flex items-center justify-center gap-3 text-gold-300 tracking-[0.2em] text-sm uppercase font-medium"
                >
                    <Sparkles className="w-4 h-4" />
                    <span>Foreign Talent Management Automation</span>
                    <Sparkles className="w-4 h-4" />
                </motion.div>

                <motion.h1
                    className="text-5xl md:text-7xl lg:text-8xl font-serif font-light leading-tight text-white tracking-wide"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                >
                    Liberate from <br />
                    <span className="text-gradient-gold font-semibold italic">Operational Hell</span>
                </motion.h1>

                <motion.p
                    className="max-w-2xl mx-auto text-lg md:text-xl text-white/60 font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1, delay: 0.6 }}
                >
                    Zero misses. Zero reworks. Zero communication gaps. <br className="hidden md:block" />
                    Experience the future of automated management with Lark World Trade Next.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                >
                    <GoldButton size="lg" glow>
                        Start Your Liberation
                        <ArrowRight className="w-4 h-4" />
                    </GoldButton>

                    <GoldButton variant="ghost" size="lg">
                        View the Logic
                    </GoldButton>
                </motion.div>

            </div>

            {/* Scroll Indicator */}
            <motion.div
                className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/30 text-xs tracking-widest uppercase"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.5, duration: 1 }}
            >
                <span>Explore</span>
                <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/30 to-white/0" />
            </motion.div>

        </section>
    );
};
