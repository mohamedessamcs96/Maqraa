import { TrendingUp, Calendar, Target, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewProgressProps {
  onBack: () => void;
}

export function ReviewProgress({ onBack }: ReviewProgressProps) {
  const progressData = [
    { week: 'الأسبوع الأول', sessions: 15, accuracy: 88, time: 450 },
    { week: 'الأسبوع الثاني', sessions: 18, accuracy: 91, time: 540 },
    { week: 'الأسبوع الثالث', sessions: 20, accuracy: 94, time: 600 },
    { week: 'الأسبوع الرابع', sessions: 22, accuracy: 96, time: 660 },
  ];

  const achievements = [
    { id: 1, icon: '🎯', title: 'بداية قوية', description: 'أكملت 5 جلسات مراجعة' },
    { id: 2, icon: '⭐', title: 'متقن', description: 'حققت نسبة دقة 90%' },
    { id: 3, icon: '🏆', title: 'ملتزم', description: 'مراجعة يومية لمدة أسبوع' },
    { id: 4, icon: '💎', title: 'ماستر', description: 'أنهيت 50 جلسة مراجعة' },
  ];

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-6 py-8">
        <button onClick={onBack} className="mb-4 text-emerald-100 hover:text-white">
          ← عودة
        </button>
        <h1 className="text-3xl font-bold">تقدمك</h1>
        <p className="text-emerald-100 mt-1">مراقبة تطورك في المراجعة</p>
      </div>

      {/* Key Metrics */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">إحصائيات عامة</h2>
        <div className="grid grid-cols-2 gap-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 border border-emerald-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="w-5 h-5 text-emerald-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">الدقة المتوسطة</p>
            <p className="text-2xl font-bold text-gray-800">92.25%</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Calendar className="w-5 h-5 text-blue-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">إجمالي الجلسات</p>
            <p className="text-2xl font-bold text-gray-800">75</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-gradient-to-br from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Target className="w-5 h-5 text-orange-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">الوقت المستثمر</p>
            <p className="text-2xl font-bold text-gray-800">50 س</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200"
          >
            <div className="flex items-center gap-2 mb-2">
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <p className="text-xs text-gray-600 mb-1">الشريط الحالي</p>
            <p className="text-2xl font-bold text-gray-800">12 أيام</p>
          </motion.div>
        </div>
      </div>

      {/* Weekly Progress Chart */}
      <div className="px-6 py-6 border-b border-gray-200">
        <h2 className="text-lg font-bold text-gray-800 mb-4">التقدم الأسبوعي</h2>
        <div className="space-y-4">
          {progressData.map((week, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gray-50 rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">{week.week}</h3>
                <span className="text-xs text-emerald-600 font-bold bg-emerald-100 px-2 py-1 rounded-full">
                  {week.accuracy}%
                </span>
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs mb-3">
                <div>
                  <p className="text-gray-600">الجلسات</p>
                  <p className="font-bold text-gray-800">{week.sessions}</p>
                </div>
                <div>
                  <p className="text-gray-600">الدقة</p>
                  <p className="font-bold text-gray-800">{week.accuracy}%</p>
                </div>
                <div>
                  <p className="text-gray-600">الوقت (د)</p>
                  <p className="font-bold text-gray-800">{week.time}</p>
                </div>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                  style={{ width: `${week.accuracy}%` }}
                ></div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Achievements */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">الإنجازات</h2>
        <div className="grid grid-cols-2 gap-3">
          {achievements.map((achievement, index) => (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl p-4 text-center border border-yellow-200"
            >
              <p className="text-4xl mb-2">{achievement.icon}</p>
              <h3 className="font-bold text-gray-800 text-sm mb-1">{achievement.title}</h3>
              <p className="text-xs text-gray-600">{achievement.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
