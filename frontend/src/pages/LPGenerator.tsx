import React, { useState } from 'react';

const LPGenerator: React.FC = () => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [prompt, setPrompt] = useState('中小企業向けの集客ツール');
    const [purpose, setPurpose] = useState('リード獲得');
    const [generatedContent, setGeneratedContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'registering' | 'generating' | 'complete' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('registering');

        try {
            // 1. Register Lead
            const leadRes = await fetch('http://localhost:8000/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, name, source: 'lp_generator' }),
            });

            if (!leadRes.ok) throw new Error('Lead registration failed');

            // 2. Generate Content
            setStatus('generating');
            const genRes = await fetch('http://localhost:8000/api/generate_lp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ purpose, target_audience: prompt }), // Mapping prompt to target_audience for demo
            });

            const data = await genRes.json();
            setGeneratedContent(data.content);
            setStatus('complete');

        } catch (error) {
            console.error(error);
            setStatus('error');
            alert('エラーが発生しました。バックエンドが起動しているか確認してください。');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">LP 自動生成 & リード獲得</h1>

            <form onSubmit={handleSubmit} className="space-y-4 mb-8">
                <div>
                    <label className="block text-sm font-medium text-gray-700">お名前</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">メールアドレス</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">LPの目的</label>
                    <input
                        type="text"
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">ターゲット/商材キーワード</label>
                    <textarea
                        value={prompt}
                        onChange={(e) => setPrompt(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                        rows={3}
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'registering' || status === 'generating'}
                    className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:bg-gray-400"
                >
                    {status === 'idle' && '生成開始'}
                    {status === 'registering' && '登録中...'}
                    {status === 'generating' && 'AI生成中...'}
                    {status === 'complete' && '生成完了！'}
                    {status === 'error' && 'エラー (再試行)'}
                </button>
            </form>

            {generatedContent && (
                <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
                    <h2 className="text-xl font-bold mb-4">生成プレビュー</h2>
                    <div className="prose whitespace-pre-wrap text-gray-800">
                        {generatedContent}
                    </div>
                </div>
            )}
        </div>
    );
};

export default LPGenerator;
