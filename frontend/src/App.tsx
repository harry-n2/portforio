import { useState } from 'react';
import LPGenerator from './pages/LPGenerator';
import BookingSystem from './pages/BookingSystem';
import FeedbackForm from './pages/FeedbackForm';
import ContentGenerator from './pages/ContentGenerator';

function App() {
  const [activeTab, setActiveTab] = useState<'lp' | 'booking' | 'feedback' | 'content'>('lp');

  return (
    <div className="min-h-screen bg-gray-100 font-sans text-gray-900">
      {/* Navigation Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-xl font-bold text-indigo-800">極ゼロ１集客</div>
          <nav className="flex space-x-2">
            {[
              { id: 'lp', label: 'LP生成' },
              { id: 'booking', label: '予約管理' },
              { id: 'feedback', label: 'フィードバック' },
              { id: 'content', label: 'コンテンツ生成' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === tab.id
                  ? 'bg-indigo-100 text-indigo-700'
                  : 'text-gray-500 hover:text-gray-700'
                  }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="py-10">
        {activeTab === 'lp' && <LPGenerator />}
        {activeTab === 'booking' && <BookingSystem />}
        {activeTab === 'feedback' && <FeedbackForm />}
        {activeTab === 'content' && <ContentGenerator />}
      </main>
    </div>
  );
}

export default App;
