import { BookOpen, Mic, Users, Award, Target, Heart, Shield } from 'lucide-react';
import { motion } from 'motion/react';
import { MiqraaLogo } from '@/app/components/MiqraaLogo';

interface WelcomeScreenProps {
  onStartTest: () => void;
}

export function WelcomeScreen({ onStartTest }: WelcomeScreenProps) {
  return (
    <div className="h-full flex flex-col bg-gradient-to-br from-emerald-600 to-teal-700 text-white" dir="rtl">
      {/* Header with decorative pattern */}
      <div className="relative overflow-hidden pt-8 pb-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center relative z-10"
        >
          <MiqraaLogo size="large" showTagline={false} />
          <p className="text-lg text-white/90 italic mt-2">نورٌ يُتلى</p>
        </motion.div>
        
        {/* Decorative circles */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3"></div>
      </div>

      {/* Main content */}
      <div className="flex-1 bg-white rounded-t-[2rem] px-6 py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          <h2 className="text-2xl font-bold text-gray-800 mb-2 text-center">مرحباً بك</h2>
          <p className="text-gray-600 text-center mb-6 leading-relaxed">
            منصة قرآنية رقمية تربط الراغبين في حفظ القرآن الكريم وتصحيح تلاوته وختمه بحفظ القرآن والمجازين في الإقراء
          </p>

          {/* Vision & Values */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-5 mb-6 border border-emerald-100">
            <div className="flex items-start gap-3 mb-4">
              <Target className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
              <div>
                <h3 className="font-bold text-gray-800 text-sm mb-1">رؤيتنا</h3>
                <p className="text-gray-700 text-sm leading-relaxed">
                  منارة رقمية عالمية في تعليم القرآن الكريم ونشر نور القرآن في كل بيت
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-2 mt-3">
              <span className="px-3 py-1 bg-white rounded-full text-xs text-emerald-700 font-medium border border-emerald-200">
                تعظيم القرآن
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-emerald-700 font-medium border border-emerald-200">
                الإتقان
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-emerald-700 font-medium border border-emerald-200">
                اليسر
              </span>
              <span className="px-3 py-1 bg-white rounded-full text-xs text-emerald-700 font-medium border border-emerald-200">
                الموثوقية
              </span>
            </div>
          </div>

          {/* Services */}
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-3">خدماتنا</h3>
            <div className="space-y-3">
              <ServiceItem icon={<BookOpen className="w-5 h-5" />} text="برامج حفظ القرآن" />
              <ServiceItem icon={<Mic className="w-5 h-5" />} text="تصحيح التلاوة" />
              <ServiceItem icon={<Award className="w-5 h-5" />} text="الإقراء والإجازات" />
              <ServiceItem icon={<Users className="w-5 h-5" />} text="برامج خاصة للنساء والأطفال وكبار السن" />
            </div>
          </div>

          {/* How it works */}
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-5 mb-6 border border-blue-100">
            <h3 className="text-lg font-bold text-gray-800 mb-3">آلية العمل</h3>
            <div className="grid grid-cols-3 gap-3">
              <StepBadge number="٢" text="تسجيل" />
              <StepBadge number="٢" text="تقييم" />
              <StepBadge number="٣" text="مطابقة" />
              <StepBadge number="٤" text="جدولة" />
              <StepBadge number="٥" text="متابعة" />
              <StepBadge number="٦" text="تقييم" />
            </div>
          </div>

          {/* Start button */}
          <motion.button
            onClick={onStartTest}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
          >
            <Mic className="w-5 h-5" />
            ابدأ الاختبار الآن
          </motion.button>

          <p className="text-center text-gray-500 text-sm mt-3">
            اختبار مجاني لتحديد مستواك • دقيقة واحدة فقط
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function ServiceItem({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="flex items-center gap-3 text-gray-700">
      <div className="w-9 h-9 bg-emerald-100 text-emerald-600 rounded-lg flex items-center justify-center flex-shrink-0">
        {icon}
      </div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

function StepBadge({ number, text }: { number: string; text: string }) {
  return (
    <div className="text-center">
      <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm mx-auto mb-1">
        {number}
      </div>
      <p className="text-xs text-gray-700 font-medium">{text}</p>
    </div>
  );
}