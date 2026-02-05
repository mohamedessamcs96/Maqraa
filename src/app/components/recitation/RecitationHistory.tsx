import { Calendar, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface RecitationHistoryProps {
  onBack: () => void;
  onViewCorrection: (id: number) => void;
}

export function RecitationHistory({ onBack, onViewCorrection }: RecitationHistoryProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const history = [
    { id: 1, date: '5 فب 2026', surah: 'سورة الفاتحة', score: 94, duration: '2:30' },
    { id: 2, date: '4 فب 2026', surah: 'سورة آل عمران (1-20)', score: 88, duration: '3:15' },
    { id: 3, date: '3 فب 2026', surah: 'سورة البقرة (1-30)', score: 85, duration: '4:00' },
    { id: 4, date: '2 فب 2026', surah: 'سورة النساء (1-25)', score: 91, duration: '3:45' },
    { id: 5, date: '1 فب 2026', surah: 'سورة المائدة (1-20)', score: 87, duration: '3:20' },
    { id: 6, date: '31 يا 2026', surah: 'سورة الأنعام (1-30)', score: 92, duration: '4:10' },
  ];

  const filteredHistory = history.filter(
    (item) =>
      item.surah.includes(searchTerm) ||
      item.date.includes(searchTerm)
  );

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 text-blue-100 hover:text-white">
          ← عودة
        </button>
        <h1 className="text-2xl font-bold">السجل الكامل</h1>
        <p className="text-blue-100 mt-1">كل جلسات التسجيل والتصحيح</p>
      </div>

      {/* Search */}
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex items-center gap-2 bg-gray-100 rounded-xl px-4 py-3">
          <Search className="w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="ابحث عن السورة أو التاريخ..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 bg-transparent outline-none text-gray-700"
          />
        </div>
      </div>

      {/* History List */}
      <div className="px-6 py-6">
        <div className="space-y-3">
          {filteredHistory.map((item, index) => (
            <motion.button
              key={item.id}
              onClick={() => onViewCorrection(item.id)}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="w-full text-right bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <p className="text-xs text-blue-600 font-semibold mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {item.date}
                  </p>
                  <h3 className="font-bold text-gray-800">{item.surah}</h3>
                </div>
                <div className="text-left ml-4">
                  <p className="text-2xl font-bold text-blue-600">{item.score}</p>
                  <p className="text-xs text-gray-600">{item.duration}</p>
                </div>
              </div>
              <p className="text-xs text-gray-600">اضغط لعرض التفاصيل</p>
            </motion.button>
          ))}
        </div>

        {filteredHistory.length === 0 && (
          <div className="text-center py-12">
            <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600">لم يتم العثور على نتائج</p>
          </div>
        )}
      </div>
    </div>
  );
}
