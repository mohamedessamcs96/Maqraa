import { BookOpen, Mic, Award, FileText, Target, TrendingUp, Clock, Users } from 'lucide-react';
import { motion } from 'motion/react';
import { MiqraaLogo } from '../MiqraaLogo';

interface HomePageProps {
  onNavigate: (section: 'review' | 'recitation' | 'memorization' | 'ijazah') => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const stats = [
    { icon: BookOpen, label: 'صفحات محفوظة', value: '45', color: 'emerald' },
    { icon: TrendingUp, label: 'مستوى التلاوة', value: 'متقدم', color: 'blue' },
    { icon: Clock, label: 'ساعات الدراسة', value: '128', color: 'orange' },
    { icon: Users, label: 'جلسات مع معلم', value: '12', color: 'purple' },
  ];

  const sections = [
    {
      id: 'review',
      icon: BookOpen,
      title: 'مراجعة الحفظ',
      description: 'راجع ما حفظته واختبر نفسك',
      color: 'from-amber-600 to-yellow-500',
    },
    {
      id: 'recitation',
      icon: Mic,
      title: 'تصحيح التلاوة',
      description: 'سجل تلاوتك واحصل على تصحيح',
      color: 'from-green-700 to-emerald-600',
    },
    {
      id: 'memorization',
      icon: Award,
      title: 'حفظ جديد',
      description: 'ابدأ برنامج حفظ منظم',
      color: 'from-amber-500 to-orange-400',
    },
    {
      id: 'ijazah',
      icon: FileText,
      title: 'الإجازات',
      description: 'احصل على إجازة قرآنية رسمية',
      color: 'from-green-600 to-teal-500',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50 pb-32" dir="rtl">
      {/* Header */}
      <div
        className="relative overflow-hidden pt-8 pb-12"
        style={{ backgroundColor: 'var(--brand-primary)', color: '#ffffff' }}
      >
        <div className="max-w-md mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <div className="inline-block p-8 rounded-full" style={{ backgroundColor: 'var(--brand-gold)' }}>
              <MiqraaLogo size="small" showTagline={false} />
            </div>
            <h1 className="text-2xl font-bold mt-4">مرحباً بك</h1>
            <p className="text-amber-100 mt-2">استمر في رحلتك القرآنية</p>
          </motion.div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-md mx-auto px-4 -mt-6 mb-8">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-xl p-4 shadow-lg"
              >
                <div
                  className={`w-10 h-10 rounded-lg bg-${stat.color}-100 flex items-center justify-center mb-2`}
                >
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <p className="text-xs text-gray-600">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Sections Grid */}
      <div className="max-w-md mx-auto px-4 mb-8">
        <h2 className="text-lg font-bold text-gray-800 mb-4">اختر ما تريد:</h2>
        <div className="grid grid-cols-2 gap-4">
          {sections.map((section, index) => {
            const Icon = section.icon;
            return (
              <motion.button
                key={section.id}
                onClick={() =>
                  onNavigate(
                    section.id as 'review' | 'recitation' | 'memorization' | 'ijazah'
                  )
                }
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                whileTap={{ scale: 0.95 }}
                className={`bg-gradient-to-br ${section.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-shadow`}
              >
                <Icon className="w-8 h-8 mb-3" />
                <h3 className="font-bold text-sm mb-1">{section.title}</h3>
                <p className="text-xs opacity-90">{section.description}</p>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Quick Tips */}
      <div className="max-w-md mx-auto px-4">
        <div className="bg-amber-50 rounded-2xl p-4 border border-amber-200">
          <h3 className="font-bold text-gray-800 mb-3 flex items-center gap-2">
            <Target className="w-5 h-5 text-amber-600" />
            نصيحة اليوم
          </h3>
          <p className="text-sm text-gray-700">
            المراجعة المنتظمة هي مفتاح استمرار الحفظ. حاول مراجعة ما تحفظه يومياً لمدة 15 دقيقة على الأقل.
          </p>
        </div>
      </div>
    </div>
  );
}
