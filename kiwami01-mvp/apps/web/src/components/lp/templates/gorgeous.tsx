import { Button } from "@/components/ui/button"
import { LPContent } from "./index"
import { motion } from "framer-motion"

export function GorgeousTemplate({ content }: { content: LPContent }) {
    return (
        <div className="min-h-screen bg-background text-foreground font-sans">
            {/* Hero Section */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-br from-background/90 via-background/80 to-background/50 z-10" />
                    {/* Placeholder for Hero Image - in real app, passed via props */}
                    <div className="w-full h-full bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center" />
                </div>

                <div className="container relative z-20 text-center px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-5xl md:text-7xl font-serif font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary via-white to-primary mb-6"
                    >
                        {content.catchCopy}
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed font-light"
                    >
                        {content.bodyCopy.intro}
                    </motion.p>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)]">
                            {content.ctaText}
                        </Button>
                    </motion.div>
                </div>
            </section>

            {/* Problem & Solution (Glassmorphism) */}
            <section className="py-24 relative overflow-hidden">
                <div className="absolute top-1/2 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />

                <div className="container relative z-10 px-4">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="backdrop-blur-xl bg-white/5 border border-white/10 p-10 rounded-2xl shadow-xl">
                            <h2 className="text-sm font-bold tracking-[0.3em] text-primary mb-6 uppercase">The Challenge</h2>
                            <p className="text-2xl font-serif leading-relaxed">{content.bodyCopy.problemStatement}</p>
                        </div>
                        <div>
                            <h2 className="text-sm font-bold tracking-[0.3em] text-primary mb-6 uppercase">The Solution</h2>
                            <p className="text-lg text-muted-foreground leading-loose">{content.bodyCopy.solution}</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Benefits */}
            <section className="py-24 bg-card/50">
                <div className="container px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-serif font-bold mb-4">Why It Matters</h2>
                        <div className="w-20 h-1 bg-primary mx-auto" />
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {content.bodyCopy.benefits.map((benefit, i) => (
                            <div key={i} className="group p-8 border border-white/5 hover:border-primary/30 transition-colors rounded-xl bg-gradient-to-b from-white/5 to-transparent">
                                <div className="text-5xl font-serif text-primary/20 group-hover:text-primary transition-colors mb-6">0{i + 1}</div>
                                <h3 className="text-xl font-bold mb-4">{benefit}</h3>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-32 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-primary/10 z-0" />
                <div className="container relative z-10 px-4">
                    <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8">{content.bodyCopy.cta}</h2>
                    <Button size="lg" className="rounded-full px-12 py-8 text-xl font-bold bg-primary text-primary-foreground hover:scale-105 transition-transform shadow-[0_0_40px_-10px_rgba(197,160,89,0.5)]">
                        {content.ctaText}
                    </Button>
                    <p className="mt-8 text-primary font-medium tracking-widest uppercase text-sm">{content.bodyCopy.socialProof}</p>
                </div>
            </section>
        </div>
    )
}
