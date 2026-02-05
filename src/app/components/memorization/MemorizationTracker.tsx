import { TrendingUp, Calendar, Target, Zap, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';

interface MemorizationTrackerProps {
  onBack: () => void;
}

export function MemorizationTracker({ onBack }: MemorizationTrackerProps) {
  const dailyProgress = [
    { day: 'الأحد', ayahs: 15, status: 'مكتمل' },
    { day: 'الإثنين', ayahs: 12, status: 'مكتمل' },
    { day: 'الثلاثاء', ayahs: 18, status: 'مكتمل' },
    { day: 'الأربعاء', ayahs: 14, status: 'مكتمل' },
    { day: 'الخميس', ayahs: 10, status: 'بانتظار' },
    { day: 'الجمعة', ayahs: 0, status: 'لم يبدأ' },
    { day: 'السبت', ayahs: 0, status: 'لم يبدأ' },
  ];

  const weekStats = [
    { label: 'المحفوظ هذا الأسبوع', value: '89', icon: BookOpen },
    { label: 'متوسط يومي', value: '12.7', icon: Target },
    { label: 'أيام متتالية', value: '4', icon: Zap },
  ];

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 text-orange-100 hover:text-white">
          ← عودة
        </button>
        <h1 className="text-2xl font-bold">متتبع الحفظ</h1>
        <p className="text-orange-100 mt-1">متابعة تقدمك اليومي</p>
      </div>

      {/* Weekly Stats */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-3">
          {weekStats.map((stat, index) => {
            const Icon = TrendingUp;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 text-center border border-orange-200"
              >
                <Icon className="w-5 h-5 text-orange-600 mx-auto mb-2" />
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-orange-600">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Daily Progress */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">التقدم اليومي</h2>
        <div className="space-y-2">
          {dailyProgress.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className={`rounded-xl p-4 ${
                day.status === 'مكتمل'
                  ? 'bg-emerald-50 border border-emerald-200'
                  : day.status === 'بانتظار'
                    ? 'bg-blue-50 border border-blue-200'
                    : 'bg-gray-50 border border-gray-200'
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-bold text-gray-800">{day.day}</h3>
                  <p className="text-xs text-gray-600">
                    {day.ayahs > 0 ? `${day.ayahs} آية` : 'لم يتم التسجيل'}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-800">{day.ayahs}</p>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      day.status === 'مكتمل'
                        ? 'bg-emerald-100 text-emerald-700'
                        : day.status === 'بانتظار'
                          ? 'bg-blue-100 text-blue-700'
                          : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {day.status}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Week Chart */}
      <div className="px-6 py-6 border-t border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">رسم بياني أسبوعي</h2>
        <div className="flex items-end justify-between gap-1 h-40 bg-gray-50 rounded-xl p-4">
          {dailyProgress.map((day, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="flex-1 flex flex-col items-center gap-2"
            >
              <div
                className="w-full bg-gradient-to-t from-orange-500 to-red-500 rounded-t-lg transition-all"
                style={{
                  height: `${(day.ayahs / 20) * 100}%`,
                  minHeight: day.ayahs > 0 ? '20px' : '0',
                }}
              ></div>
              <p className="text-xs text-gray-600 font-bold">{day.day.substring(0, 2)}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Motivation Message */}
      <div className="px-6 py-6 mt-4">
        <div className="bg-gradient-to-br from-orange-50 to-red-50 rounded-2xl p-4 border border-orange-200">
          <p className="text-sm font-semibold text-orange-700 mb-2">
            💪 أنت تسير بشكل رائع!
          </p>
          <p className="text-sm text-gray-700">
            استمر في هذا الزخم. لقد حفظت 89 آية هذا الأسبوع. اجعل هدفك 100 آية الأسبوع القادم!
          </p>
        </div>
      </div>
    </div>
  );
}
