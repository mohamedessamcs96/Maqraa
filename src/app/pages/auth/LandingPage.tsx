import { motion } from 'motion/react';
import { BookOpen, Users, Award, ArrowRight, Star, CheckCircle, Mic, GraduationCap, Users2 } from 'lucide-react';
import { useState } from 'react';

interface LandingPageProps {
  onNavigate: (path: string) => void;
}

export function LandingPage({ onNavigate }: LandingPageProps) {
  const [email, setEmail] = useState('');
  const [selectedServiceIndex, setSelectedServiceIndex] = useState(0);

  const services = [
    {
      id: 1,
      title: 'برامج حفظ القرآن',
      description: 'برامج منظمة وفعالة لحفظ القرآن الكريم مع معلمين متخصصين',
      icon: BookOpen,
    },
    {
      id: 2,
      title: 'تصحيح التلاوة',
      description: 'تحسين مستوى التلاوة وتصحيح الأخطاء مع متخصصين في التجويد',
      icon: Mic,
    },
    {
      id: 3,
      title: 'الإجازات والشهادات',
      description: 'الحصول على إجازات معترف بها من معلمين معتمدين',
      icon: GraduationCap,
    },
    {
      id: 4,
      title: 'برامج خاصة للأطفال والنساء',
      description: 'برامج مخصصة لتعليم الأطفال والنساء بطرق فعالة وآمنة',
      icon: Users2,
    },
  ];

  const features = [
    { icon: Star, label: 'معلمون معتمدون' },
    { icon: CheckCircle, label: 'جلسات حية مباشرة' },
    { icon: Award, label: 'شهادات معترف بها' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-green-50" dir="rtl">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm border-b border-amber-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-2xl font-bold text-emerald-700"
          >
            🕌 مقرأة
          </motion.div>
          <div className="flex gap-4">
            <button
              onClick={() => onNavigate('/login')}
              className="px-4 py-2 text-gray-700 hover:text-gray-900 transition"
            >
              دخول
            </button>
            <button
              onClick={() => onNavigate('/signup')}
              className="px-6 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
            >
              إنشاء حساب
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="max-w-6xl mx-auto px-4 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            تعلم القرآن من <span className="text-green-700">معلمين معتمدين</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            منصة تعليمية متخصصة تربط المتعلمين مع معلمي القرآن الموثوقين للحصول على تعليم عالي الجودة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <button
              onClick={() => onNavigate('/signup?role=learner')}
              className="px-8 py-4 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition flex items-center justify-center gap-2"
            >
              ابدأ كمتعلم
              <ArrowRight className="w-5 h-5" />
            </button>
            <button
              onClick={() => onNavigate('/signup?role=teacher')}
              className="px-8 py-4 border-2 border-green-700 text-green-700 rounded-lg font-bold hover:bg-green-50 transition"
            >
              تقدم كمعلم
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4"
                >
                  <Icon className="w-8 h-8 text-green-700 mx-auto mb-3" />
                  <p className="font-semibold text-gray-800">{feature.label}</p>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">خدماتنا</h2>
        
        {/* Service Navigation Buttons */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <motion.button
                key={index}
                onClick={() => setSelectedServiceIndex(index)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-6 rounded-2xl transition-all duration-300 flex flex-col items-center gap-3 ${
                  selectedServiceIndex === index
                    ? 'bg-green-700 text-white shadow-lg'
                    : 'bg-white text-gray-900 shadow-md hover:shadow-lg border-2 border-gray-100'
                }`}
              >
                <Icon className="w-8 h-8" />
                <span className="text-sm font-semibold text-center">{service.title}</span>
              </motion.button>
            );
          })}
        </div>

        {/* Selected Service Details */}
        <motion.div
          key={selectedServiceIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-3xl p-12 text-center"
        >
          {(() => {
            const Icon = services[selectedServiceIndex].icon;
            return (
              <>
                <Icon className="w-20 h-20 text-green-700 mx-auto mb-6" />
                <h3 className="text-3xl font-bold text-gray-900 mb-4">
                  {services[selectedServiceIndex].title}
                </h3>
                <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
                  {services[selectedServiceIndex].description}
                </p>
                <button
                  onClick={() => onNavigate('/signup?role=learner')}
                  className="px-8 py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition inline-flex items-center gap-2"
                >
                  ابدأ الآن
                  <ArrowRight className="w-5 h-5" />
                </button>
              </>
            );
          })()}
        </motion.div>
      </section>

      {/* Featured Teachers */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">معلمون موثوقون</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {[
            { name: 'أ.د محمد العريان', specialization: 'متخصص في التجويد', rating: 4.9 },
            { name: 'فاطمة الزهراء', specialization: 'تعليم الأطفال', rating: 4.8 },
            { name: 'عبدالله الشمري', specialization: 'الحفظ السريع', rating: 4.7 },
          ].map((teacher, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition text-center"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-green-400 to-green-600 mx-auto mb-4" />
              <h3 className="font-bold text-lg mb-2">{teacher.name}</h3>
              <p className="text-gray-600 text-sm mb-4">{teacher.specialization}</p>
              <div className="flex items-center justify-center gap-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="font-bold">{teacher.rating}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="text-center">
          <button
            onClick={() => onNavigate('/learner/teachers')}
            className="px-6 py-3 bg-green-700 text-white rounded-lg font-bold hover:bg-green-800 transition"
          >
            عرض جميع المعلمين
          </button>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-green-700 to-emerald-700 rounded-3xl p-12 text-white text-center"
        >
          <h2 className="text-4xl font-bold mb-6">ابدأ رحلتك القرآنية اليوم</h2>
          <p className="text-lg mb-8 opacity-90">
            اختر معلمك المفضل واحجز أول جلسة تعليمية مباشرة
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => onNavigate('/signup?role=learner')}
              className="px-8 py-4 bg-white text-green-700 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              إنشاء حساب متعلم
            </button>
            <button
              onClick={() => onNavigate('/login')}
              className="px-8 py-4 border-2 border-white text-white rounded-lg font-bold hover:bg-white/10 transition"
            >
              دخول الحساب
            </button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-6xl mx-auto px-4 py-12 text-center">
          <p>&copy; 2026 مقرأة - منصة تعليم القرآن الكريم</p>
        </div>
      </footer>
    </div>
  );
}
