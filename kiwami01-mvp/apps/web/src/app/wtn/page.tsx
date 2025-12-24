"use client"

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Check, Zap, Globe, Users, FileText, ChevronDown } from 'lucide-react'
import Link from 'next/link'

// WTN Theme Colors
const COLORS = {
    NAVY: '#050a14',
    GOLD: '#c5a059',
    SLATE: '#8892b0',
    WHITE: '#ffffff',
}

const EFFICIENCY_DATA = [
    { name: 'Traditional', value: 100, label: '従来の手法' },
    { name: 'Month 1', value: 80, label: '導入1ヶ月' },
    { name: 'Month 3', value: 45, label: '導入3ヶ月' },
    { name: 'Month 6', value: 15, label: '導入6ヶ月' }, // 85% reduction
    { name: 'Month 12', value: 4, label: 'WTN完全移行' }, // 96% reduction
]

const SERVICES = [
    {
        title: "AIマーケティング支援",
        description: "データが導く次世代の集客エコシステム。市場トレンド and 顧客行動を精緻に分析し、コンバージョンを最大化します。",
        icon: <Zap className="w-8 h-8 text-[#c5a059]" />,
        link: "https://harry-n2.github.io/wtn/lp_free_report.html"
    },
    {
        title: "AI海外ビジネス支援",
        description: "言語の壁を超え、世界市場へ。現地の文化や商習慣に最適化されたグローバル戦略を立案します。",
        icon: <Globe className="w-8 h-8 text-[#c5a059]" />,
        link: "https://ljpbqpwr5vbk.jp.larksuite.com/docx/GIfWd2Dk7oR1L1xrIIej8AT3prd"
    },
    {
        title: "AIツール講座 × 業務改善",
        description: "ChatGPTやNotebookLMを使いこなす、日常業務の自動化。SNS集客からタスク管理まで実践的に伝授。",
        icon: <Users className="w-8 h-8 text-[#c5a059]" />,
        link: "https://ljpbqpwr5vbk.jp.larksuite.com/docx/NtFcdL7qgoZdSwxp4xdj5QVupGb"
    },
    {
        title: "AI副業支援",
        description: "AIを味方に新し収益源を。高品質なコンテンツ生成を武器に、個人のスキルを収益化へと導きます。",
        icon: <FileText className="w-8 h-8 text-[#c5a059]" />,
        link: "https://harry-n2.github.io/wtn/lp.html"
    }
]

export default function WTNPage() {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);

    return (
        <div className="min-h-screen bg-[#050a14] text-white font-sans selection:bg-[#c5a059] selection:text-white overflow-hidden">
            {/* --- HERO SECTION --- */}
            <section className="relative h-screen flex items-center justify-center overflow-hidden">
                <motion.div
                    style={{ y: y1, opacity }}
                    className="absolute inset-0 z-0"
                >
                    {/* Placeholder for Video Background - usually would use <video> tag */}
                    <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center opacity-40"></div>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/60 via-transparent to-[#050a14]"></div>
                </motion.div>

                <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <h2 className="text-[#c5a059] tracking-[0.5em] text-sm md:text-base font-bold mb-6 uppercase">World Trade Next</h2>
                        <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-bold mb-8 leading-tight">
                            外国人人材管理を、<br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c5a059] to-[#f0e68c]">自動化の頂</span>へ。
                        </h1>
                        <p className="text-slate-300 text-lg md:text-xl font-light tracking-wide mb-12 max-w-2xl mx-auto leading-relaxed">
                            25年の分析知見 × 最新AI技術。「Lark base」で管理の泥臭さを解消し、<br className="hidden md:block" />
                            本来の戦略業務へ全リソースを集中させる。
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <Button
                                className="bg-[#c5a059] text-white hover:bg-[#d4b06a] text-lg px-10 py-7 rounded-none tracking-widest transition-all duration-500 shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:shadow-[0_0_50px_rgba(197,160,89,0.5)]"
                                onClick={() => window.open('https://lin.ee/7qGC2YD', '_blank')}
                            >
                                START AUTOMATION
                            </Button>
                            <Button
                                variant="outline"
                                className="border-[#c5a059] text-[#c5a059] hover:bg-[#c5a059]/10 text-lg px-10 py-7 rounded-none tracking-widest transition-all duration-300"
                                onClick={() => document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' })}
                            >
                                EXPLORE SERVICES
                            </Button>
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className="absolute bottom-10 left-1/2 -translate-x-1/2 text-[#c5a059]"
                >
                    <ChevronDown className="w-8 h-8 opacity-70" />
                </motion.div>
            </section>

            {/* --- PHILOSOPHY SECTION --- */}
            <section className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <h3 className="text-[#c5a059] text-sm font-bold tracking-[0.3em] uppercase mb-4">Philosophy</h3>
                        <h2 className="text-4xl md:text-5xl font-serif font-bold mb-8 leading-tight">
                            未来を、AIと確信に変える。
                        </h2>
                        <p className="text-slate-400 leading-loose text-lg mb-8 font-light">
                            25年の海外ビジネス経験と最新のAI技術を融合。単なる自動化を超え、人がより創造的な仕事に集中できる「知性の共創」を目指します。
                            Larkを基盤とした業務の省小化と、AIマーケティングによる成長の最大化。その両輪で、貴社のビジネスを新たな地平へと導きます。
                        </p>
                        <div className="p-8 border border-[#c5a059]/30 bg-[#c5a059]/5 backdrop-blur-sm relative">
                            <div className="absolute top-0 left-0 w-1 h-full bg-[#c5a059]"></div>
                            <p className="text-white font-serif text-xl italic mb-4">
                                "人の温かみとAIの効率性が共存する組織作りを提供します。"
                            </p>
                            <p className="text-[#c5a059] font-bold tracking-wider text-sm">
                                REPRESENTATIVE: 西野 直品
                            </p>
                        </div>
                    </motion.div>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="relative h-[600px] w-full"
                    >
                        <div className="absolute inset-0 bg-gradient-to-tr from-[#c5a059]/20 to-transparent z-10"></div>
                        {/* Representative Image */}
                        <img
                            src="https://drive.google.com/thumbnail?id=1cs5h12nHzlAgpYu968KwoNcJPX8A0oJG&sz=w1000"
                            alt="Representative"
                            className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000"
                        />
                        <div className="absolute -bottom-10 -left-10 w-40 h-40 border border-[#c5a059]/50 hidden lg:block z-0"></div>
                    </motion.div>
                </div>
            </section>

            {/* --- EFFICIENCY CHART SECTION --- */}
            <section className="py-32 bg-[#0a0f1a] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#c5a059]/5 to-transparent pointer-events-none"></div>
                <div className="max-w-7xl mx-auto px-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-[#c5a059] text-sm font-bold tracking-[0.3em] uppercase mb-4">The Impact</h2>
                        <h3 className="text-4xl md:text-6xl font-serif font-bold text-white mb-6">圧倒的な効率化、その証明</h3>
                        <p className="text-slate-400 max-w-2xl mx-auto">
                            WTNシステム導入による業務時間の削減推移。泥臭い管理業務から解放され、本来の価値創造へシフトする過程を可視化しました。
                        </p>
                    </motion.div>

                    <div className="h-[500px] w-full bg-[#050a14]/50 border border-[#c5a059]/20 p-8 rounded-sm shadow-2xl backdrop-blur-md">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={EFFICIENCY_DATA}>
                                <defs>
                                    <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={COLORS.GOLD} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={COLORS.GOLD} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#8892b0" strokeOpacity={0.1} vertical={false} />
                                <XAxis
                                    dataKey="name"
                                    stroke="#8892b0"
                                    tick={{ fill: '#8892b0', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                />
                                <YAxis
                                    stroke="#8892b0"
                                    tick={{ fill: '#8892b0', fontSize: 12 }}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#050a14', borderColor: '#c5a059', color: '#fff' }}
                                    itemStyle={{ color: '#c5a059' }}
                                    formatter={(value: number) => [`${value}% Cost`, 'Cost Ratio']}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="value"
                                    stroke={COLORS.GOLD}
                                    fillOpacity={1}
                                    fill="url(#colorValue)"
                                    strokeWidth={3}
                                    activeDot={{ r: 8, strokeWidth: 0, fill: '#fff' }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>

            {/* --- SERVICES SECTION --- */}
            <section id="services" className="py-32 relative">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="mb-20">
                        <h2 className="text-[#c5a059] text-sm font-bold tracking-[0.3em] uppercase mb-4">Our Services</h2>
                        <h3 className="text-4xl md:text-5xl font-serif font-bold text-white mb-6">AI × ビジネスの実践知</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {SERVICES.map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.6 }}
                                className="group relative p-10 border border-[#c5a059]/20 bg-[#ffffff]/[0.02] hover:bg-[#c5a059]/10 transition-colors duration-500 overflow-hidden"
                            >
                                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity duration-500">
                                    <ArrowRight className="text-[#c5a059]" />
                                </div>
                                <div className="mb-6">{service.icon}</div>
                                <h4 className="text-2xl font-bold mb-4 font-serif">{service.title}</h4>
                                <p className="text-slate-400 font-light leading-relaxed mb-8">
                                    {service.description}
                                </p>
                                <a
                                    href={service.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center text-[#c5a059] text-sm font-bold tracking-widest uppercase hover:text-white transition-colors"
                                >
                                    View Details <span className="ml-2">→</span>
                                </a>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* --- FOOTER / CTA --- */}
            <section className="py-24 bg-[#c5a059] text-[#050a14]">
                <div className="max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8">
                        Start Your Automation Journey
                    </h2>
                    <p className="text-lg md:text-xl font-medium mb-12 opacity-80">
                        公式LINE登録で、World Trade Next限定の構築スターターキットを無料で受け取る。
                    </p>
                    <Button
                        className="bg-[#050a14] text-white hover:bg-black text-lg px-12 py-8 rounded-none tracking-widest shadow-2xl transition-transform hover:scale-105"
                        onClick={() => window.open('https://lin.ee/7qGC2YD', '_blank')}
                    >
                        LINEで資料を受け取る
                    </Button>
                </div>
            </section>
        </div>
    )
}
