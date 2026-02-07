import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Search, Filter } from 'lucide-react';
import { mockTeachers } from '../../data/mockData';
import { storage } from '../../lib/storage';

const statusLabels: Record<string, string> = {
  requested: 'مطلوبة',
  confirmed: 'مؤكدة',
  paid: 'مدفوعة',
  in_progress: 'جارية',
  completed: 'مكتملة',
  cancelled: 'ملغاة',
  no_show: 'لم يحضر',
};

export function SessionsListPage() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');

  const sessions = useMemo(() => storage.getSessions(), []);

  const filtered = useMemo(() => {
    const q = query.trim();
    if (!q) return sessions;
    return sessions.filter((s) => {
      const teacher = mockTeachers.find((t) => t.id === s.teacherId);
      const name = teacher?.name ?? '';
      return name.includes(q) || s.date.includes(q) || s.time.includes(q) || s.serviceType.includes(q);
    });
  }, [query, sessions]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <div className="flex items-center justify-between gap-3">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
            <ArrowRight className="w-5 h-5" />
            رجوع
          </button>
          <h1 className="font-bold">جلساتي</h1>
          <div className="w-10" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <div className="flex items-center gap-2 w-full">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                <Search className="w-5 h-5 text-gray-600" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="ابحث باسم المعلم أو التاريخ"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-gray-200 font-bold text-gray-700 hover:bg-gray-50">
              <Filter className="w-4 h-4" />
              فلترة
            </button>
          </div>

          <div className="mt-5 space-y-3">
            {filtered.length === 0 ? (
              <p className="text-center text-gray-600 py-10">لا توجد جلسات</p>
            ) : (
              filtered.map((s, idx) => {
                const teacher = mockTeachers.find((t) => t.id === s.teacherId);
                return (
                  <motion.button
                    key={s.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.03 }}
                    onClick={() => navigate(`/learner/sessions/${s.id}`)}
                    className="w-full text-right p-4 rounded-2xl border border-gray-200 hover:border-green-700 hover:bg-green-50/30 transition"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3 min-w-0">
                        <img src={teacher?.photoUrl || ''} alt={teacher?.name} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 truncate">{teacher?.name || '—'}</p>
                          <p className="text-sm text-gray-600 truncate">{s.serviceType}</p>
                          <p className="text-xs text-gray-500 mt-1">📅 {s.date} • 🕒 {s.time}</p>
                        </div>
                      </div>
                      <span className="px-3 py-1 rounded-xl text-xs font-bold bg-gray-100 text-gray-700 flex-shrink-0">
                        {statusLabels[s.status] ?? s.status}
                      </span>
                    </div>
                  </motion.button>
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
