import React, { useState } from 'react';

const FeedbackForm: React.FC = () => {
    const [leadId, setLeadId] = useState(1); // デモ用のリードID
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('loading');

        try {
            const response = await fetch('http://localhost:8000/api/feedback', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ lead_id: leadId, rating, comment }),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus('success');
                console.log("Feedback Success:", data);
            } else {
                setStatus('error');
                alert('フィードバック送信に失敗しました: ' + (data.detail || '不明なエラー'));
            }
        } catch (error) {
            setStatus('error');
            console.error('Network Error:', error);
            alert('ネットワークエラーにより送信に失敗しました。');
        }
    };

    if (status === 'success') {
        return <div className="container mx-auto p-8 text-center text-green-600 bg-white shadow-md rounded-lg mt-10">
            <h2 className="text-2xl font-bold">フィードバックありがとうございます！</h2>
            <p className="mt-2 text-lg">感謝のしるしとして <span className="font-bold text-orange-500">100ポイント</span> を付与しました。</p>
            <button
                onClick={() => { setStatus('idle'); setComment(''); setRating(5); }}
                className="mt-6 text-indigo-600 hover:text-indigo-800 underline"
            >
                他のフィードバックを送る
            </button>
        </div>
    }

    return (
        <div className="container mx-auto p-4 max-w-xl mt-10 bg-white shadow-lg rounded-lg">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">顧客満足度アンケート</h1>
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Rating Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        サービスの評価 (5段階)
                    </label>
                    <div className="flex gap-4">
                        {[1, 2, 3, 4, 5].map(r => (
                            <label key={r} className={`cursor-pointer px-4 py-2 border rounded-md transition-colors ${rating === r ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-gray-50 text-gray-600 hover:bg-indigo-50'}`}>
                                <input
                                    type="radio"
                                    name="rating"
                                    value={r}
                                    checked={rating === r}
                                    onChange={() => setRating(r)}
                                    className="hidden"
                                />
                                {r}
                            </label>
                        ))}
                    </div>
                </div>
                {/* Comment Field */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        コメント・ご意見
                    </label>
                    <textarea
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="改善点やご意見をどうぞ"
                        rows={4}
                    />
                </div>
                <button
                    type="submit"
                    disabled={status === 'loading'}
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                >
                    {status === 'loading' ? '送信中...' : 'フィードバックを送信する'}
                </button>
            </form>
        </div>
    );
};

export default FeedbackForm;
