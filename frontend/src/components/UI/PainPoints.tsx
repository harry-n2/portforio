import React from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, Clock, FileWarning, Frown } from 'lucide-react';

const painPoints = [
    {
        icon: Clock,
        title: "Endless Checks",
        desc: "Staff are chased by daily deadlines, spending 180 hours/month on manual confirmations.",
        color: "text-red-400"
    },
    {
        icon: FileWarning,
        title: "Excel Dependency",
        desc: "Critical data managed in fragile Excel sheets. High risk of leaks and version conflicts.",
        color: "text-orange-400"
    },
    {
        icon: AlertTriangle,
        title: "Human Error",
        desc: "One missed expiration date can lead to illegal employment and business suspension.",
        color: "text-yellow-400"
    },
    {
        icon: Frown,
        title: "Mental Fatigue",
        desc: "Constant anxiety of 'forgetting something' wears down your team's morale.",
        color: "text-purple-400"
    }
];

export const PainPoints = () => {
    return (
        <section id="pain-points" className="relative py-32 bg-navy-950">
            <div className="container mx-auto px-6">

                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">
                        The <span className="text-red-500 italic">Hellish</span> Reality
                    </h2>
                    <p className="text-white/60 max-w-2xl mx-auto">
                        Your current workflow is a ticking time bomb. <br />
                        Are you still managing foreign talent with manual checklists?
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {painPoints.map((item, index) => (
                        <motion.div
                            key={index}
                            className="group relative p-8 rounded-xl bg-navy-900 border border-white/5 hover:border-red-500/30 transition-colors duration-500"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className={`mb-6 ${item.color} group-hover:scale-110 transition-transform duration-300`}>
                                <item.icon className="w-10 h-10" />
                            </div>
                            <h3 className="text-xl font-medium text-white mb-4 group-hover:text-red-200 transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-sm text-white/50 leading-relaxed group-hover:text-white/70 transition-colors">
                                {item.desc}
                            </p>
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
