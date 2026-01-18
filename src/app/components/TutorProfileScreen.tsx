import { ArrowRight, Star, Users, Award, Clock, MessageCircle, Video, Calendar, BookOpen, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { Tutor } from '@/app/App';
import { useState } from 'react';

interface TutorProfileScreenProps {
  tutor: Tutor;
  onBack: () => void;
}

export function TutorProfileScreen({ tutor, onBack }: TutorProfileScreenProps) {
  const [selectedPackage, setSelectedPackage] = useState<'trial' | 'monthly' | 'quarterly'>('monthly');

  const packages = {
    trial: { name: 'حصة تجريبية', sessions: 1, price: tutor.price * 0.5, discount: 0 },
    monthly: { name: 'باقة شهرية', sessions: 8, price: tutor.price * 8, discount: 10 },
    quarterly: { name: 'باقة ربع سنوية', sessions: 24, price: tutor.price * 24 * 0.85, discount: 15 },
  };

  const selectedPkg = packages[selectedPackage];

  return (
    <div className="h-full flex flex-col bg-white" dir="rtl">
      {/* Header with cover */}
      <div className="relative">
        <div className="h-32 bg-gradient-to-r from-emerald-600 to-teal-600"></div>
        <button
          onClick={onBack}
          className="absolute top-4 right-4 p-2 bg-black/20 backdrop-blur-sm hover:bg-black/30 rounded-full transition-colors text-white"
        >
          <ArrowRight className="w-6 h-6" />
        </button>

        {/* Profile image */}
        <div className="absolute -bottom-12 right-6">
          <div className="relative">
            <img
              src={tutor.image}
              alt={tutor.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-lg object-cover"
            />
            {tutor.available && (
              <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-emerald-500 border-3 border-white rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-white" />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 pt-16 pb-6">
        {/* Name and title */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-1">{tutor.name}</h1>
          <p className="text-gray-600 mb-3">{tutor.title}</p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <div className="flex items-center gap-0.5">
                <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                <span className="font-bold">{tutor.rating}</span>
              </div>
              <span className="text-gray-500">({tutor.students} تقييم)</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Users className="w-4 h-4" />
              <span>{tutor.students} طالب</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-700">
              <Award className="w-4 h-4" />
              <span>{tutor.experience} سنة خبرة</span>
            </div>
          </div>
        </div>

        {/* Specializations */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">التخصصات</h3>
          <div className="flex flex-wrap gap-2">
            {tutor.specialization.map((spec) => (
              <span
                key={spec}
                className="px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 text-emerald-700 text-sm rounded-lg font-medium border border-emerald-100"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>

        {/* About */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">نبذة عن المعلم</h3>
          <p className="text-gray-700 leading-relaxed">{tutor.bio}</p>
        </div>

        {/* Features */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">ما يميز هذا المعلم</h3>
          <div className="space-y-2">
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} text="شرح واضح ومبسط" />
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} text="متابعة مستمرة للطلاب" />
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} text="مواد تعليمية شاملة" />
            <FeatureItem icon={<CheckCircle className="w-4 h-4" />} text="جدول مرن ومناسب" />
          </div>
        </div>

        {/* Packages */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">اختر الباقة المناسبة</h3>
          <div className="grid grid-cols-3 gap-2 mb-4">
            <PackageOption
              type="trial"
              label="تجريبية"
              selected={selectedPackage === 'trial'}
              onClick={() => setSelectedPackage('trial')}
            />
            <PackageOption
              type="monthly"
              label="شهرية"
              selected={selectedPackage === 'monthly'}
              onClick={() => setSelectedPackage('monthly')}
              recommended
            />
            <PackageOption
              type="quarterly"
              label="ربع سنوية"
              selected={selectedPackage === 'quarterly'}
              onClick={() => setSelectedPackage('quarterly')}
            />
          </div>

          {/* Package details */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-4 border border-emerald-100">
            <div className="flex items-center justify-between mb-3">
              <div>
                <h4 className="font-bold text-gray-800">{selectedPkg.name}</h4>
                <p className="text-gray-600 text-sm">{selectedPkg.sessions} حصة</p>
              </div>
              {selectedPkg.discount > 0 && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full font-bold">
                  خصم {selectedPkg.discount}%
                </span>
              )}
            </div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-emerald-600">
                {Math.round(selectedPkg.price)}
              </span>
              <span className="text-gray-600">ريال</span>
              {selectedPkg.discount > 0 && (
                <span className="text-gray-400 line-through text-sm">
                  {Math.round(tutor.price * selectedPkg.sessions)} ريال
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Reviews preview */}
        <div className="mb-6">
          <h3 className="text-sm font-bold text-gray-800 mb-3">آراء الطلاب</h3>
          <div className="space-y-3">
            <ReviewCard
              name="عبدالله محمد"
              rating={5}
              comment="معلم متميز وأسلوبه في الشرح واضح جداً. استفدت كثيراً"
              date="منذ أسبوع"
            />
            <ReviewCard
              name="فاطمة أحمد"
              rating={5}
              comment="جزاه الله خيراً، صبور ويعطي كل طالب حقه"
              date="منذ أسبوعين"
            />
          </div>
          <button className="text-emerald-600 text-sm font-medium mt-3 hover:underline">
            عرض جميع التقييمات ({tutor.students})
          </button>
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="border-t border-gray-200 px-6 py-4 bg-white shadow-lg">
        <div className="flex gap-3">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-shadow"
          >
            <Calendar className="w-5 h-5" />
            احجز الآن
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="p-3.5 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
          >
            <MessageCircle className="w-5 h-5" />
          </motion.button>
        </div>
        <p className="text-center text-gray-500 text-xs mt-2">
          {tutor.available ? 'متاح للحجز الفوري عبر منصة مقرأة' : 'سيتم التواصل معك لتحديد موعد'}
        </p>
      </div>
    </div>
  );
}

interface PackageOptionProps {
  type: string;
  label: string;
  selected: boolean;
  onClick: () => void;
  recommended?: boolean;
}

function PackageOption({ label, selected, onClick, recommended }: PackageOptionProps) {
  return (
    <div className="relative">
      {recommended && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 bg-emerald-600 text-white text-[10px] px-2 py-0.5 rounded-full whitespace-nowrap z-10">
          الأكثر طلباً
        </div>
      )}
      <button
        onClick={onClick}
        className={`w-full py-3 rounded-xl text-sm font-medium transition-all ${
          selected
            ? 'bg-emerald-600 text-white shadow-md'
            : 'bg-white text-gray-700 border border-gray-300 hover:border-emerald-600'
        }`}
      >
        {label}
      </button>
    </div>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
}

function FeatureItem({ icon, text }: FeatureItemProps) {
  return (
    <div className="flex items-center gap-2 text-gray-700">
      <div className="text-emerald-600">{icon}</div>
      <span className="text-sm">{text}</span>
    </div>
  );
}

interface ReviewCardProps {
  name: string;
  rating: number;
  comment: string;
  date: string;
}

function ReviewCard({ name, rating, comment, date }: ReviewCardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-4">
      <div className="flex items-start justify-between mb-2">
        <div>
          <h4 className="font-medium text-gray-800 text-sm">{name}</h4>
          <p className="text-gray-500 text-xs">{date}</p>
        </div>
        <div className="flex gap-0.5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-3.5 h-3.5 ${
                i < rating ? 'fill-amber-400 text-amber-400' : 'text-gray-300'
              }`}
            />
          ))}
        </div>
      </div>
      <p className="text-gray-700 text-sm leading-relaxed">{comment}</p>
    </div>
  );
}