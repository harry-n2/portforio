import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Zap, Globe, ShieldCheck } from 'lucide-react';
import { GoldButton } from './GoldButton';

const features = [
    {
        icon: Zap,
        title: "Instant Automation",
        desc: "OCR reads residence cards in 30 seconds. Data entry time reduced by 96%."
    },
    {
        icon: ShieldCheck,
        title: "Zero Oversights",
        desc: "Automatic alerts for every expiration. Never miss a deadline again."
    },
    {
        icon: Globe,
        title: "Universal Communication",
        desc: "Built-in translation for seamless support of foreign staff."
    }
];

export const Solution = () => {
    return (
        <section id="solution" className="relative py-32 bg-navy-900 overflow-hidden">

            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gold-400/5 rounded-full blur-[100px]" />

            <div className="container mx-auto px-6 relative z-10">

                <div className="flex flex-col lg:flex-row items-center gap-16">

                    {/* Text Content */}
                    <div className="lg:w-1/2 space-y-8">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
                                Lark <span className="text-gold-400">World Trade Next</span>
                            </h2>
                            <p className="mt-6 text-lg text-white/70 leading-relaxed">
                                The definitive operating system for Foreign Talent Management.
                                We don't just "manage" data; we automate the entire lifecycle.
                            </p>
                        </motion.div>

                        <div className="space-y-6">
                            {features.map((feature, idx) => (
                                <motion.div
                                    key={idx}
                                    className="flex items-start gap-4"
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: idx * 0.2, duration: 0.5 }}
                                >
                                    <div className="p-2 bg-gold-400/10 rounded-lg text-gold-400">
                                        <feature.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-medium text-white">{feature.title}</h3>
                                        <p className="text-white/50 text-sm mt-1">{feature.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.8 }}
                        >
                            <GoldButton size="lg">
                                Schedule a Demo
                            </GoldButton>
                        </motion.div>
                    </div>

                    {/* Visual/Image Placeholder */}
                    <div className="lg:w-1/2 relative">
                        <motion.div
                            className="relative z-10 rounded-2xl overflow-hidden shadow-2xl border border-white/10 bg-navy-800/50 backdrop-blur-sm aspect-video flex items-center justify-center p-8 group"
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                        >
                            {/* Abstract UI representation */}
                            <div className="space-y-4 w-full max-w-md opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse"></div>
                                <div className="h-4 bg-white/10 rounded w-1/2 animate-pulse delay-75"></div>
                                <div className="h-4 bg-white/10 rounded w-full animate-pulse delay-150"></div>
                                <div className="flex gap-4 mt-8">
                                    <div className="h-20 w-20 bg-gold-400/20 rounded-lg"></div>
                                    <div className="h-20 w-20 bg-gold-400/20 rounded-lg"></div>
                                </div>
                            </div>

                            <div className="absolute inset-0 bg-gradient-to-tr from-gold-400/10 to-transparent pointer-events-none" />
                        </motion.div>

                        {/* Decorative Elements behind image */}
                        <div className="absolute -top-10 -right-10 w-24 h-24 border border-gold-400/30 rounded-full" />
                        <div className="absolute -bottom-5 -left-5 w-16 h-16 bg-gold-600/20 rounded-full blur-xl" />
                    </div>

                </div>
            </div>
        </section>
    );
};
