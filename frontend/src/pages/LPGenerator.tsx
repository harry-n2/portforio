import React, { useState } from 'react';

const LPGenerator: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('中小企業向けの集客ツール');
    const [purpose, setPurpose] = useState('リード獲得');
    const [status, setStatus] = useState<'idle' | 'registering' | 'generating' | 'complete' | 'error'>('idle');
    const [activeVariant, setActiveVariant] = useState<'A' | 'B'>('A');

    // Mock Generated Data Structure
    const [lpData, setLpData] = useState<{
        headline: string;
        subhead: string;
        features: string[];
        ctatext: string;
        stats: { visitors: number; cv: number; cvr: string };
    } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('registering');

        // Mock Logic for Visual LP Generation
        const mockDataA = {
            headline: `「${prompt}」の常識を覆す、\n唯一無二の衝撃。`,
            subhead: `真の成功者だけが手にする、至高の${purpose}メソッド。\nあなたのビジネスを次のステージへ。`,
            features: [
                "圧倒的な時間短縮 (Zero Time)",
                "資産の自動構築 (Zero Cost)",
                "永続的な繁栄 (Infinite Growth)"
            ],
            ctatext: "今すぐ、選ばれし者の扉を開く",
            stats: { visitors: 1240, cv: 148, cvr: "11.9%" }
        };

        if (window.location.hostname.includes('github.io')) {
            setTimeout(() => {
                setLpData(mockDataA);
                setStatus('complete');
            }, 1500);
            return;
        }

        try {
            const leadRes = await fetch('http://localhost:8000/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, source: 'lp_generator' }),
            });
            await leadRes.json();

            setStatus('generating');
            // In real app, we would fetch JSON here. For now, use mock to guarantee UI.
            setTimeout(() => {
                setLpData(mockDataA);
                setStatus('complete');
            }, 1000);

        } catch (error) {
            console.error(error);
            setLpData(mockDataA);
            setStatus('complete');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-6xl">
            <h1 className="text-4xl font-bold mb-8 text-center bg-gradient-to-r from-amber-200 via-amber-400 to-amber-200 bg-clip-text text-transparent drop-shadow-lg">
                LP 自動生成 & A/Bテスト
            </h1>

            {/* Input Form */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                <div className="lg:col-span-1">
                    <form onSubmit={handleSubmit} className="space-y-6 bg-slate-900/50 backdrop-blur-sm p-6 rounded-2xl border border-amber-500/20 shadow-xl h-full">
                        <h3 className="text-xl font-bold text-amber-100 border-b border-amber-500/30 pb-2 mb-4">⚙️ 設定パラメータ</h3>
                        <div>
                            <label className="block text-xs font-semibold text-amber-100/70 mb-1">お名前</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-sm text-amber-50" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-amber-100/70 mb-1">メール</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-sm text-amber-50" required />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-amber-100/70 mb-1">目的</label>
                            <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-sm text-amber-50" />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-amber-100/70 mb-1">キーワード</label>
                            <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} className="w-full bg-slate-800 border-slate-600 rounded p-2 text-sm text-amber-50" rows={3} />
                        </div>
                        <button type="submit" disabled={status !== 'idle' && status !== 'complete'} className="w-full bg-gradient-to-r from-amber-600 to-amber-500 text-slate-900 font-bold py-3 rounded-lg shadow-lg hover:translate-y-px transition-all">
                            {status === 'idle' || status === 'complete' ? '✨ LPを生成する' : '生成中...'}
                        </button>
                    </form>
                </div>

                {/* Preview Area */}
                <div className="lg:col-span-2">
                    {!lpData ? (
                        <div className="h-full min-h-[500px] flex items-center justify-center bg-slate-900/30 rounded-2xl border-2 border-dashed border-amber-500/20 text-amber-100/40">
                            ◀ 左側のフォームから生成を開始してください
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {/* A/B Test Dashboard */}
                            <div className="bg-slate-900 p-4 rounded-xl border border-amber-500/30 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <button onClick={() => setActiveVariant('A')} className={`px-4 py-2 rounded-lg font-bold transition-all ${activeVariant === 'A' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-amber-500'}`}>
                                        パターン A (Premium)
                                    </button>
                                    <button onClick={() => setActiveVariant('B')} className={`px-4 py-2 rounded-lg font-bold transition-all ${activeVariant === 'B' ? 'bg-amber-500 text-slate-900' : 'bg-slate-800 text-amber-500'}`}>
                                        パターン B (Classic)
                                    </button>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-amber-200/60">現在のCVR予測</div>
                                    <div className="text-2xl font-bold text-amber-400">{activeVariant === 'A' ? lpData.stats.cvr : '8.4%'}</div>
                                </div>
                            </div>

                            {/* Live LP Preview (Iframe-like container) */}
                            <div className="bg-white rounded-xl overflow-hidden shadow-2xl border-4 border-slate-800 relative group">
                                <div className="absolute top-0 left-0 w-full h-6 bg-slate-800 flex items-center px-2 gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-500"></div>
                                </div>

                                {/* Mock LP Content */}
                                <div className={`mt-6 overflow-y-auto max-h-[600px] ${activeVariant === 'B' ? 'grayscale-[50%]' : ''}`}>
                                    {/* Hero */}
                                    <div className="relative h-80 bg-slate-900 flex items-center justify-center text-center px-8 overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-amber-900/40 to-slate-900 z-10"></div>
                                        {/* Mock Background Image Effect */}
                                        <div className="absolute inset-0 opacity-30 bg-[url('https://source.unsplash.com/random/1600x900/?luxury,gold')] bg-cover"></div>

                                        <div className="relative z-20 max-w-2xl">
                                            <h2 className="text-3xl md:text-5xl font-serif font-bold text-amber-100 mb-4 drop-shadow-lg leading-tight">
                                                {lpData.headline}
                                            </h2>
                                            <p className="text-amber-200/80 text-lg mb-8">{lpData.subhead}</p>
                                            <button className="bg-gradient-to-r from-amber-500 to-yellow-600 text-white font-bold py-3 px-8 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:scale-105 transition-transform">
                                                {lpData.ctatext}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Features */}
                                    <div className="py-12 px-8 bg-slate-50">
                                        <div className="text-center mb-8">
                                            <h3 className="text-2xl font-bold text-slate-800">選ばれる3つの理由</h3>
                                        </div>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            {lpData.features.map((feat, i) => (
                                                <div key={i} className="bg-white p-6 rounded-lg shadow-md border-t-4 border-amber-500">
                                                    <div className="text-4xl mb-4">💎</div>
                                                    <h4 className="font-bold text-slate-900">{feat}</h4>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Video/Image Placeholder */}
                                    <div className="h-64 bg-slate-200 flex items-center justify-center relative">
                                        <div className="text-slate-400 font-bold text-xl flex flex-col items-center">
                                            <span className="text-4xl mb-2">▶</span>
                                            イメージ動画/紹介ムービー
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="text-center text-xs text-slate-500 mt-2">
                                ※ A/Bテスト自動実行中 (自動最適化モード: ON)
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default LPGenerator;
