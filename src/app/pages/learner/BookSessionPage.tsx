import { useMemo, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Clock, CreditCard, ShieldCheck } from 'lucide-react';
import { mockTeachers } from '../../data/mockData';
import type { Session } from '../../types';
import { useAuthContext } from '../../context/AuthContext';
import { storage } from '../../lib/storage';

const serviceLabels: Record<string, string> = {
  memorization: 'حفظ الكتاب',
  tajweed: 'تصحيح التلاوة',
  khatmah: 'برنامج الختمة',
  iqra: 'تعليم الإقراء',
  ijazah: 'برنامج الإجازة',
  children: 'متخصص للأطفال',
  women: 'متخصص للنساء',
  seniors: 'متخصص لكبار السن',
};

export function BookSessionPage() {
  const navigate = useNavigate();
  const { teacherId = '' } = useParams<{ teacherId: string }>();
  const [searchParams] = useSearchParams();
  const { user } = useAuthContext();

  const teacher = useMemo(() => mockTeachers.find((t) => t.id === teacherId), [teacherId]);

  const serviceId = searchParams.get('service') ?? '';
  const date = searchParams.get('date') ?? '';
  const time = searchParams.get('time') ?? '';

  const service = useMemo(() => teacher?.services.find((s) => s.id === serviceId), [teacher, serviceId]);

  const [duration, setDuration] = useState<Session['duration']>(1);

  const total = useMemo(() => {
    const rate = service?.hourlyRate ?? 0;
    return Math.round(rate * duration);
  }, [service, duration]);

  const canBook = !!user && !!teacher && !!service && !!date && !!time;

  const handleCreateSession = () => {
    if (!user || !teacher || !service || !date || !time) return;

    const sessions = storage.getSessions();
    const now = new Date().toISOString();

    const newSession: Session = {
      id: `session-${Date.now()}`,
      learnerId: 'learner-1',
      teacherId: teacher.id,
      serviceType: service.type,
      date,
      time,
      duration,
      hourlyRate: service.hourlyRate,
      totalPrice: total,
      status: 'requested',
      createdAt: now,
    };

    storage.saveSessions([newSession, ...sessions]);
    navigate(`/learner/checkout/${newSession.id}`);
  };

  if (!teacher) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <p className="font-bold text-gray-900">المعلم غير موجود</p>
          <button onClick={() => navigate('/learner/teachers')} className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl">
            العودة لقائمة المعلمين
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
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">حجز جلسة</h1>
          <p className="text-sm text-gray-600 mt-1">مع {teacher.name}</p>

          <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-600">الخدمة</p>
              <p className="font-bold text-gray-900 break-words">{service ? serviceLabels[service.type] : '—'}</p>
            </div>
            <div className="p-4 rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-600">السعر/ساعة</p>
              <p className="font-bold text-gray-900">{service?.hourlyRate ?? '—'} ر.س</p>
            </div>
            <div className="p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
              <Calendar className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">التاريخ</p>
                <p className="font-bold text-gray-900">{date || '—'}</p>
              </div>
            </div>
            <div className="p-4 rounded-2xl border border-gray-200 flex items-center gap-3">
              <Clock className="w-5 h-5 text-gray-600" />
              <div>
                <p className="text-xs text-gray-600">الوقت</p>
                <p className="font-bold text-gray-900">{time || '—'}</p>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <label className="block text-sm font-bold text-gray-700 mb-2">مدة الجلسة</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 1.5, 2].map((d) => (
                <button
                  key={d}
                  onClick={() => setDuration(d as any)}
                  className={`py-3 rounded-2xl font-bold border transition ${duration === d ? 'bg-green-700 text-white border-green-700' : 'bg-white text-gray-800 border-gray-200 hover:border-green-700'}`}
                >
                  {d} ساعة
                </button>
              ))}
            </div>
          </div>

          <div className="mt-5 p-4 rounded-2xl bg-green-50 border border-green-200 flex items-start gap-3">
            <ShieldCheck className="w-5 h-5 text-green-700 mt-0.5" />
            <div className="min-w-0">
              <p className="font-bold text-green-900">ملخص الدفع (محاكاة)</p>
              <p className="text-sm text-green-800 mt-1">إجمالي: <span className="font-bold">{total} ر.س</span></p>
              <p className="text-xs text-green-800 mt-1">سيتم تحصيل الرسوم قبل بدء الجلسة (Escrow).</p>
            </div>
          </div>

          <button
            disabled={!canBook}
            onClick={handleCreateSession}
            className="mt-6 w-full bg-green-700 text-white font-bold py-3.5 rounded-2xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <CreditCard className="w-5 h-5" />
            المتابعة للدفع
          </button>

          {!user && (
            <p className="mt-3 text-xs text-gray-500">سجل الدخول لإكمال الحجز.</p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
