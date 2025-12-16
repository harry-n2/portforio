import React, { useState } from 'react';

const ContentGenerator: React.FC = () => {
    const [topic, setTopic] = useState('');
    const [platform, setPlatform] = useState('sns');
    const [generatedContent, setGeneratedContent] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'complete'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');
        setGeneratedContent('');

        try {
            const response = await fetch('http://localhost:8000/api/generate_content', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ topic, target_platform: platform }),
            });

            const data = await response.json();

            if (response.ok && data.content) {
                setGeneratedContent(data.content);
                setStatus('complete');
            } else {
                alert('コンテンツ生成に失敗しました。');
                setStatus('idle');
            }
        } catch (error) {
            console.error('Content Generation Error:', error);
            alert('ネットワークエラーにより生成に失敗しました。');
            setStatus('idle');
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-2xl mt-10">
            <h1 className="text-3xl font-bold mb-8 text-indigo-900 text-center">SNS/SEO コンテンツ生成</h1>
            <div className="bg-white p-8 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Topic Input */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            コンテンツのトピック・テーマ
                        </label>
                        <input
                            type="text"
                            value={topic}
                            onChange={(e) => setTopic(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="例: 中小企業向けAI導入のメリット"
                            required
                        />
                    </div>
                    {/* Platform Select */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                            ターゲットプラットフォーム
                        </label>
                        <select
                            value={platform}
                            onChange={(e) => setPlatform(e.target.value)}
                            className="block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        >
                            <option value="sns">SNS投稿 (Twitter/Instagram)</option>
                            <option value="seo_blog">SEOブログ記事</option>
                        </select>
                    </div>
                    <button
                        type="submit"
                        disabled={status === 'loading'}
                        className="w-full py-3 px-4 border border-transparent rounded-md shadow-md text-base font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-700 hover:from-blue-700 hover:to-indigo-800 disabled:opacity-50 transform hover:scale-[1.02] transition-all"
                    >
                        {status === 'loading' ? (
                            <span className="flex items-center justify-center">
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                AI思考中...
                            </span>
                        ) : 'コンテンツを自動生成する'}
                    </button>
                </form>
            </div>

            {status === 'complete' && (
                <div className="mt-8">
                    <h2 className="text-xl font-bold text-gray-800 mb-3">AIからの提案結果</h2>
                    <div className="p-6 bg-gradient-to-br from-indigo-50 to-white border border-indigo-100 rounded-lg shadow-inner">
                        <p className="whitespace-pre-wrap text-gray-800 opacity-0 animate-fade-in leading-relaxed">
                            {generatedContent}
                        </p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => navigator.clipboard.writeText(generatedContent)}
                                className="text-sm text-indigo-600 hover:text-indigo-800 flex items-center gap-1"
                            >
                                📋 コピーする
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ContentGenerator;
