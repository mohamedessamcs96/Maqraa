import { useMemo } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, CreditCard, MessageCircle, Video } from 'lucide-react';
import { mockTeachers, mockChatMessages } from '../../data/mockData';
import { ChatWidget } from '../../components/shared/ChatWidget';
import { storage } from '../../lib/storage';
import type { ChatMessage, Session } from '../../types';

const statusLabels: Record<string, string> = {
  requested: 'مطلوبة',
  confirmed: 'مؤكدة',
  paid: 'مدفوعة',
  in_progress: 'جارية',
  completed: 'مكتملة',
  cancelled: 'ملغاة',
  no_show: 'لم يحضر',
};

export function SessionDetailsPage() {
  const navigate = useNavigate();
  const { sessionId = '' } = useParams<{ sessionId: string }>();

  const session = useMemo(() => storage.getSessions().find((s) => s.id === sessionId) ?? null, [sessionId]);

  const teacher = useMemo(() => {
    if (!session) return null;
    return mockTeachers.find((t) => t.id === session.teacherId) ?? null;
  }, [session]);

  const messages = useMemo(() => {
    if (!session) return [] as ChatMessage[];
    const seeded = mockChatMessages.filter((m) => m.sessionId === session.id);
    return seeded;
  }, [session]);

  const handleSend = (text: string) => {
    if (!session) return;
    const m: ChatMessage = {
      id: `msg-${Date.now()}`,
      sessionId: session.id,
      senderId: 'learner-1',
      senderName: 'المتعلم',
      message: text,
      messageType: 'text',
      timestamp: new Date().toISOString(),
    };

    // For now we keep chat messages demo-only (not persisted).
    // If you want persistence, we can add storage.getChatMessages/saveChatMessages.
    messages.unshift(m);
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <p className="font-bold text-gray-900">الجلسة غير موجودة</p>
          <button onClick={() => navigate('/learner/sessions')} className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl">
            العودة للجلسات
          </button>
        </div>
      </div>
    );
  }

  const canPay = session.status === 'confirmed' || session.status === 'requested';

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
            <ArrowRight className="w-5 h-5" />
            رجوع
          </button>
          <h1 className="font-bold">تفاصيل الجلسة</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-4">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <img src={teacher?.photoUrl || ''} alt={teacher?.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
              <div className="min-w-0">
                <p className="font-bold text-gray-900 truncate">{teacher?.name || '—'}</p>
                <p className="text-sm text-gray-600">📅 {session.date} • 🕒 {session.time}</p>
                <p className="text-xs text-gray-500 mt-1">المدة: {session.duration} ساعة • الإجمالي: {session.totalPrice} ر.س</p>
              </div>
            </div>
            <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 flex-shrink-0">
              {statusLabels[session.status] ?? session.status}
            </span>
          </div>

          {session.status === 'paid' && session.zoomLink && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="font-bold text-emerald-900">رابط Zoom جاهز</p>
              <a className="text-sm text-emerald-800 break-all underline" href={session.zoomLink} target="_blank" rel="noreferrer">
                {session.zoomLink}
              </a>
              <button
                onClick={() => navigate('/learner/zoom-test')}
                className="mt-3 inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-green-700 text-white font-bold hover:bg-green-800"
              >
                <Video className="w-4 h-4" />
                تجربة Zoom داخل التطبيق
              </button>
            </div>
          )}

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {canPay && (
              <button
                onClick={() => navigate(`/learner/checkout/${session.id}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-green-700 text-white font-bold hover:bg-green-800"
              >
                <CreditCard className="w-5 h-5" />
                ادفع لتأكيد الجلسة
              </button>
            )}
            <button
              onClick={() => navigate(`/learner/sessions/${session.id}/chat`)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl border border-gray-200 font-bold text-gray-800 hover:bg-gray-50"
            >
              <MessageCircle className="w-5 h-5" />
              الدردشة
            </button>
          </div>
        </motion.div>

        {/* Inline chat preview on details page for convenience */}
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <p className="font-bold text-gray-900 mb-3">الدردشة</p>
          <ChatWidget sessionId={session.id} messages={messages} onSendMessage={handleSend} isOpen />
        </div>
      </div>
    </div>
  );
}
