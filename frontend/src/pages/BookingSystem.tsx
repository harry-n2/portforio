import React, { useState, useEffect } from 'react';

const BookingSystem: React.FC = () => {
    const [selectedDate, setSelectedDate] = useState<string>('');
    const [slots, setSlots] = useState<any[]>([]);
    const [selectedSlot, setSelectedSlot] = useState<any>(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);

    // Initial date for demo
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        setSelectedDate(today);
    }, []);

    // Fetch slots when date changes
    useEffect(() => {
        if (selectedDate) {
            fetchSlots(selectedDate);
            setSelectedSlot(null);
        }
    }, [selectedDate]);

    const fetchSlots = async (date: string) => {
        try {
            const res = await fetch('http://localhost:8000/api/calendar/slots', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ date }),
            });
            const data = await res.json();
            setSlots(data.slots || []);
        } catch (e) {
            console.error("Failed to fetch slots", e);
        }
    };

    const handleBooking = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSlot) return;
        setLoading(true);

        try {
            // 1. Reserve Slot
            const bookRes = await fetch('http://localhost:8000/api/calendar/book', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    slot_start: selectedSlot.start,
                    slot_end: selectedSlot.end,
                    name,
                    email
                })
            });

            if (!bookRes.ok) throw new Error("Booking failed");

            // 2. Initiate Payment
            const payRes = await fetch('http://localhost:8000/api/payment/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    amount: 5000,
                    currency: 'jpy',
                    lead_id: 1 // Demo ID
                })
            });

            const payData = await payRes.json();
            if (payData.checkout_url) {
                window.location.href = payData.checkout_url;
            } else {
                alert("Payment initiation failed");
                setLoading(false);
            }

        } catch (error) {
            console.error(error);
            alert("Booking Process Failed");
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto p-4 max-w-xl">
            <h1 className="text-3xl font-bold mb-6 text-indigo-900">オンライン予約 (Google Calendar連携)</h1>

            <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700">日付選択</label>
                <input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
                />
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                {slots.map((slot, idx) => (
                    <button
                        key={idx}
                        disabled={!slot.available}
                        onClick={() => setSelectedSlot(slot)}
                        className={`p-3 rounded-md text-sm font-bold transition-colors ${!slot.available
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : selectedSlot === slot
                                    ? 'bg-indigo-600 text-white ring-2 ring-indigo-300'
                                    : 'bg-white border border-indigo-200 text-indigo-700 hover:bg-indigo-50'
                            }`}
                    >
                        {slot.start.split('T')[1].slice(0, 5)}
                    </button>
                ))}
            </div>

            {selectedSlot && (
                <form onSubmit={handleBooking} className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                    <h3 className="text-lg font-bold mb-4">予約者情報入力</h3>
                    <div className="space-y-4">
                        <input
                            type="text" placeholder="お名前" required
                            value={name} onChange={e => setName(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <input
                            type="email" placeholder="メールアドレス" required
                            value={email} onChange={e => setEmail(e.target.value)}
                            className="w-full p-2 border rounded"
                        />
                        <button
                            type="submit" disabled={loading}
                            className="w-full py-3 bg-orange-600 text-white font-bold rounded hover:bg-orange-700"
                        >
                            {loading ? '処理中...' : '予約して決済へ進む (¥5,000)'}
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default BookingSystem;
