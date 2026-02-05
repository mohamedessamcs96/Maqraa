import { Plus, BookOpen, Target, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface MemorizationHomeProps {
  onStartNew: () => void;
  onViewPlan: () => void;
  onViewTracker: () => void;
}

export function MemorizationHome({ onStartNew, onViewPlan, onViewTracker }: MemorizationHomeProps) {
  const activePlans = [
    { id: 1, surah: 'سورة يس', progress: 60, dailyTarget: '10 آيات', daysLeft: '8' },
    { id: 2, surah: 'سورة المعارج', progress: 30, dailyTarget: '5 آيات', daysLeft: '20' },
  ];

  const stats = [
    { icon: BookOpen, label: 'المحفوظ', value: '50 صفحة', color: 'emerald' },
    { icon: Target, label: 'الهدف الأسبوعي', value: '100 آية', color: 'blue' },
    { icon: TrendingUp, label: 'متوسط اليوم', value: '15 آية', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-white pb-32" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-orange-500 to-red-500 text-white px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">حفظ جديد</h1>
        <p className="text-orange-100">برامج حفظ منظمة وفعالة</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="grid grid-cols-3 gap-2">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-3"
              >
                <div className="flex items-center gap-1 mb-2">
                  <Icon className={`w-4 h-4 text-${stat.color}-600`} />
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-sm font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Start New Button */}
      <div className="px-6 py-6 border-b border-gray-200">
        <motion.button
          onClick={onStartNew}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Plus className="w-6 h-6" />
          ابدأ برنامج حفظ جديد
        </motion.button>
      </div>

      {/* Active Plans */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">البرامج النشطة</h2>
        {activePlans.length === 0 ? (
          <p className="text-center text-gray-600 py-8">لم تبدأ أي برنامج حفظ بعد</p>
        ) : (
          <div className="space-y-3">
            {activePlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl p-4 border border-orange-200"
              >
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-bold text-gray-800">{plan.surah}</h3>
                  <span className="text-xs font-semibold text-orange-600 bg-orange-100 px-2 py-1 rounded-full">
                    {plan.progress}%
                  </span>
                </div>
                <div className="w-full bg-orange-300 rounded-full h-2 mb-3">
                  <div
                    className="bg-gradient-to-r from-orange-500 to-red-500 h-2 rounded-full"
                    style={{ width: `${plan.progress}%` }}
                  ></div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                  <div>الهدف اليومي: {plan.dailyTarget}</div>
                  <div>الانتهاء في: {plan.daysLeft}</div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="px-6 pb-6 space-y-3">
        <button
          onClick={onViewPlan}
          className="w-full border-2 border-orange-500 text-orange-600 rounded-2xl py-3 font-bold transition-colors hover:bg-orange-50"
        >
          إدارة البرامج
        </button>
        <button
          onClick={onViewTracker}
          className="w-full border-2 border-orange-500 text-orange-600 rounded-2xl py-3 font-bold transition-colors hover:bg-orange-50"
        >
          متابعة التقدم
        </button>
      </div>
    </div>
  );
}
