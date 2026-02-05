import { Mic, TrendingUp, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface RecitationHomeProps {
  onStartRecording: () => void;
  onViewHistory: () => void;
}

export function RecitationHome({ onStartRecording, onViewHistory }: RecitationHomeProps) {
  const recentSessions = [
    { id: 1, date: 'اليوم', surah: 'سورة الفاتحة', score: 94, level: 'متقدم' },
    { id: 2, date: 'أمس', surah: 'سورة آل عمران (1-20)', score: 88, level: 'جيد' },
    { id: 3, date: '3 أيام', surah: 'سورة البقرة (1-30)', score: 85, level: 'جيد' },
  ];

  const stats = [
    { icon: Mic, label: 'إجمالي التسجيلات', value: '32', color: 'emerald' },
    { icon: TrendingUp, label: 'متوسط النقاط', value: '89', color: 'blue' },
    { icon: Clock, label: 'وقت التصحيح', value: '2 دقيقة', color: 'orange' },
    { icon: Award, label: 'أفضل نتيجة', value: '98', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-white pb-32" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">تصحيح التلاوة</h1>
        <p className="text-blue-100">سجل تلاوتك واحصل على تصحيح فوري</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Start Recording Button */}
      <div className="px-6 py-6 border-b border-gray-200">
        <motion.button
          onClick={onStartRecording}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-blue-500 to-indigo-500 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Mic className="w-6 h-6" />
          سجل تلاوتك الآن
        </motion.button>
      </div>

      {/* Recent Sessions */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">جلسات حديثة</h2>
        <div className="space-y-3">
          {recentSessions.map((session, index) => (
            <motion.div
              key={session.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
            >
              <div className="flex items-start justify-between mb-2">
                <div>
                  <p className="text-xs text-blue-600 font-semibold mb-1">{session.date}</p>
                  <h3 className="font-bold text-gray-800">{session.surah}</h3>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-blue-600">{session.score}</p>
                  <span className="text-xs text-blue-500">{session.level}</span>
                </div>
              </div>
              <button className="text-sm text-blue-600 hover:text-blue-700 font-semibold">
                عرض التصحيح ←
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View More Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onViewHistory}
          className="w-full border-2 border-blue-500 text-blue-600 rounded-2xl py-3 font-bold transition-colors hover:bg-blue-50"
        >
          عرض السجل الكامل
        </button>
      </div>
    </div>
  );
}
