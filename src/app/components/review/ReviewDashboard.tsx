import { BookOpen, Play, TrendingUp, Clock, Target } from 'lucide-react';
import { motion } from 'motion/react';

interface ReviewDashboardProps {
  onStartSession: () => void;
  onViewProgress: () => void;
}

export function ReviewDashboard({ onStartSession, onViewProgress }: ReviewDashboardProps) {
  const reviewPlans = [
    { id: 1, name: 'سورة الفاتحة', progress: 100, lastReviewed: 'اليوم', nextReview: 'غداً' },
    { id: 2, name: 'سورة البقرة (1-20)', progress: 85, lastReviewed: 'أمس', nextReview: 'اليوم' },
    { id: 3, name: 'سورة آل عمران (1-30)', progress: 60, lastReviewed: '3 أيام', nextReview: 'اليوم' },
    { id: 4, name: 'سورة النساء (1-25)', progress: 40, lastReviewed: 'أسبوع', nextReview: 'اليوم' },
  ];

  const stats = [
    { icon: BookOpen, label: 'مجموع الحفظ', value: '50 صفحة', color: 'emerald' },
    { icon: Clock, label: 'متوسط المراجعة', value: '45 دقيقة', color: 'blue' },
    { icon: TrendingUp, label: 'معدل الاحتفاظ', value: '92%', color: 'green' },
    { icon: Target, label: 'هدف اليوم', value: '3 جلسات', color: 'orange' },
  ];

  return (
    <div className="min-h-screen bg-white pb-32" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">مراجعة حفظك</h1>
        <p className="text-emerald-100">حافظ على ما تحفظته بمراجعة منتظمة</p>
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
                <div className="flex items-center gap-3 mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Start Review Button */}
      <div className="px-6 py-6 border-b border-gray-200">
        <motion.button
          onClick={onStartSession}
          whileTap={{ scale: 0.98 }}
          className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-2xl py-4 font-bold text-lg flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transition-shadow"
        >
          <Play className="w-6 h-6" />
          ابدأ جلسة مراجعة الآن
        </motion.button>
      </div>

      {/* Review Plans */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">خطط المراجعة</h2>
        <div className="space-y-3">
          {reviewPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl p-4 border border-gray-200"
            >
              <div className="flex items-start justify-between mb-2">
                <h3 className="font-bold text-gray-800">{plan.name}</h3>
                <span className="text-xs font-semibold text-emerald-600 bg-emerald-100 px-2 py-1 rounded-full">
                  {plan.progress}%
                </span>
              </div>
              <div className="w-full bg-gray-300 rounded-full h-2 mb-3">
                <div
                  className="bg-gradient-to-r from-emerald-500 to-teal-500 h-2 rounded-full"
                  style={{ width: `${plan.progress}%` }}
                ></div>
              </div>
              <div className="flex justify-between text-xs text-gray-600">
                <span>آخر مراجعة: {plan.lastReviewed}</span>
                <span>المراجعة القادمة: {plan.nextReview}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* View Progress Button */}
      <div className="px-6 pb-6">
        <button
          onClick={onViewProgress}
          className="w-full border-2 border-emerald-500 text-emerald-600 rounded-2xl py-3 font-bold transition-colors hover:bg-emerald-50"
        >
          عرض التفاصيل الكاملة
        </button>
      </div>
    </div>
  );
}
