import { useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, ShieldCheck, Lock, AlertCircle, CheckCircle } from 'lucide-react';
import type { Payment } from '../../types';
import { storage } from '../../lib/storage';

function maskCard(card: string) {
  const digits = card.replace(/\D/g, '');
  if (digits.length < 4) return '****';
  return `**** **** **** ${digits.slice(-4)}`;
}

export function CheckoutPage() {
  const navigate = useNavigate();
  const { sessionId = '' } = useParams<{ sessionId: string }>();

  const [cardNumber, setCardNumber] = useState('4242 4242 4242 4242');
  const [exp, setExp] = useState('12/30');
  const [cvc, setCvc] = useState('123');
  const [name, setName] = useState('Test User');
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'failed'>('idle');

  const session = useMemo(() => storage.getSessions().find((s) => s.id === sessionId) ?? null, [sessionId]);

  const canPay = !!session && status !== 'processing' && cardNumber.trim() && exp.trim() && cvc.trim() && name.trim();

  const handlePay = async () => {
    if (!session || !canPay) return;

    setStatus('processing');

    // Simulate gateway latency
    await new Promise((r) => setTimeout(r, 900));

    // Deterministic "failure" scenario for demos
    const shouldFail = cardNumber.replace(/\s/g, '').endsWith('0000');

    const payments = storage.getPayments();
    const now = new Date().toISOString();

    const payment: Payment = {
      id: `pay-${Date.now()}`,
      sessionId: session.id,
      learnerId: session.learnerId,
      amount: session.totalPrice,
      status: shouldFail ? 'failed' : 'completed',
      paymentMethod: 'card',
      transactionId: `txn_${Math.random().toString(16).slice(2, 10)}`,
      createdAt: now,
      completedAt: shouldFail ? undefined : now,
    };

    storage.savePayments([payment, ...payments]);

    if (shouldFail) {
      setStatus('failed');
      return;
    }

    // Move session to paid + simulate Zoom meeting link
    const sessions = storage.getSessions();
    const updated = sessions.map((s) =>
      s.id === session.id
        ? {
            ...s,
            status: 'paid' as const,
            zoomMeetingId: `mockmeeting-${Date.now()}`,
            zoomLink: `https://zoom.us/j/mockmeeting-${Date.now()}`,
          }
        : s
    );
    storage.saveSessions(updated);

    setStatus('success');
    setTimeout(() => navigate(`/learner/sessions/${session.id}`), 700);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="font-bold text-gray-900">الجلسة غير موجودة</p>
          <button onClick={() => navigate('/learner/dashboard')} className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl">
            العودة للوحة التحكم
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">الدفع الآمن</h1>
          <p className="text-sm text-gray-600 mt-1">محاكاة بوابة دفع (Escrow) قبل بدء الجلسة.</p>

          <div className="mt-5 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green-700 mt-0.5" />
            <div className="min-w-0">
              <p className="font-bold text-green-900">المبلغ المطلوب</p>
              <p className="text-sm text-green-800 mt-1">{session.totalPrice} ر.س</p>
              <p className="text-xs text-green-800 mt-1">سيتم تأكيد الجلسة وإرسال رابط Zoom بعد نجاح الدفع.</p>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">اسم حامل البطاقة</label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم البطاقة</label>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
              <p className="text-xs text-gray-500 mt-2">للتجربة: أي بطاقة تنتهي بـ 0000 ستفشل.</p>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">MM/YY</label>
              <input
                value={exp}
                onChange={(e) => setExp(e.target.value)}
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">CVC</label>
              <input
                value={cvc}
                onChange={(e) => setCvc(e.target.value)}
                inputMode="numeric"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
          </div>

          <div className="mt-5 flex items-center gap-2 text-xs text-gray-600">
            <Lock className="w-4 h-4" />
            <span>بياناتك مشفرة (محاكاة).</span>
            <span className="mr-auto font-bold">{maskCard(cardNumber)}</span>
          </div>

          {status === 'failed' && (
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
              <div>
                <p className="font-bold text-red-800">فشلت عملية الدفع</p>
                <p className="text-sm text-red-700 mt-1">جرّب بطاقة مختلفة أو عدّل البيانات.</p>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-emerald-600 mt-0.5" />
              <div>
                <p className="font-bold text-emerald-800">تم الدفع بنجاح</p>
                <p className="text-sm text-emerald-700 mt-1">سيتم توجيهك لتفاصيل الجلسة.</p>
              </div>
            </div>
          )}

          <button
            disabled={!canPay}
            onClick={handlePay}
            className="mt-6 w-full bg-green-700 text-white font-bold py-3.5 rounded-2xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            {status === 'processing' ? 'جاري معالجة الدفع...' : 'ادفع الآن'}
          </button>
        </motion.div>
      </div>
    </div>
  );
}
