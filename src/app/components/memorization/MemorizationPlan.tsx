import { ArrowRight, Plus, Calendar, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface MemorizationPlanProps {
  onBack: () => void;
}

export function MemorizationPlan({ onBack }: MemorizationPlanProps) {
  const [selectedSurah, setSelectedSurah] = useState<string | null>(null);

  const surahs = [
    { id: 1, name: 'سورة يس', ayahCount: 83, estimatedDays: '10' },
    { id: 2, name: 'سورة المعارج', ayahCount: 44, estimatedDays: '6' },
    { id: 3, name: 'سورة الإنسان', ayahCount: 31, estimatedDays: '5' },
    { id: 4, name: 'سورة الطارق', ayahCount: 17, estimatedDays: '3' },
    { id: 5, name: 'سورة الأعلى', ayahCount: 19, estimatedDays: '3' },
    { id: 6, name: 'سورة الغاشية', ayahCount: 26, estimatedDays: '4' },
  ];

  const memorizations = [
    { id: 1, surah: 'سورة الفاتحة', startDate: '1 يناير 2026', status: 'مكتملة' },
    { id: 2, surah: 'سورة الناس', startDate: '5 يناير 2026', status: 'مكتملة' },
    { id: 3, surah: 'سورة الفيل', startDate: '10 يناير 2026', status: 'مكتملة' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowRight className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">خطط الحفظ</h1>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex gap-0 border-b border-gray-200 sticky top-0 bg-white z-10">
        <button className="flex-1 py-4 font-bold text-orange-600 border-b-2 border-orange-500 bg-orange-50">
          سور جديدة
        </button>
        <button className="flex-1 py-4 font-bold text-gray-600 border-b-2 border-transparent hover:text-gray-700">
          مكتملة
        </button>
      </div>

      {/* Surahs List */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">اختر ما تريد حفظه:</h2>
        <div className="space-y-3">
          {surahs.map((surah, index) => (
            <motion.button
              key={surah.id}
              onClick={() => setSelectedSurah(surah.name)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full text-right bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 text-lg mb-1">{surah.name}</h3>
                  <p className="text-sm text-gray-600">
                    {surah.ayahCount} آية • {surah.estimatedDays} أيام
                  </p>
                </div>
                <Plus className="w-6 h-6 text-orange-600 flex-shrink-0" />
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="px-6 py-4">
        <div className="border-t border-gray-200"></div>
      </div>

      {/* Completed Plans */}
      <div className="px-6 py-6 pb-20">
        <h2 className="text-lg font-bold text-gray-800 mb-4">سور مكتملة</h2>
        <div className="space-y-3">
          {memorizations.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800 mb-1">{item.surah}</h3>
                  <p className="text-sm text-gray-600 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.startDate}
                  </p>
                </div>
                <CheckCircle className="w-6 h-6 text-emerald-600 flex-shrink-0" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
