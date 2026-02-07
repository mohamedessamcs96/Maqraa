import { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { learnerGoals } from '../../data/mockData';

interface LearnerOnboardingProps {
  onNavigate: (path: string) => void;
}

export function LearnerOnboarding({ onNavigate }: LearnerOnboardingProps) {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    goals: [] as string[],
    ageGroup: '',
    preferredSchedule: '',
    language: 'ar',
  });
  const [isCompleted, setIsCompleted] = useState(false);

  const steps_data = [
    {
      title: 'حدد أهدافك',
      description: 'ما الذي تريد تحقيقه في رحلتك القرآنية؟',
      options: learnerGoals.map((goal) => ({
        id: goal.id,
        label: goal.label,
      })),
      field: 'goals',
      type: 'checkbox',
    },
    {
      title: 'فئة العمر',
      description: 'أي فئة عمرية تنتمي إليها؟',
      options: [
        { id: 'child', label: '👧 طفل (أقل من 12 سنة)' },
        { id: 'adult', label: '👨 بالغ (12-60 سنة)' },
        { id: 'senior', label: '👴 كبير السن (أكثر من 60 سنة)' },
      ],
      field: 'ageGroup',
      type: 'radio',
    },
    {
      title: 'الجدول الزمني المفضل',
      description: 'متى تفضل أن تأخذ دروسك؟',
      options: [
        { id: 'morning', label: '🌅 في الصباح (6-12)' },
        { id: 'afternoon', label: '☀️ بعد الظهر (12-18)' },
        { id: 'evening', label: '🌙 في المساء (18-23)' },
      ],
      field: 'preferredSchedule',
      type: 'radio',
    },
    {
      title: 'اللغة المفضلة',
      description: 'أي لغة تفضل للتواصل؟',
      options: [
        { id: 'ar', label: '🇸🇦 العربية' },
        { id: 'en', label: '🇺🇸 الإنجليزية' },
      ],
      field: 'language',
      type: 'radio',
    },
  ];

  const currentStep = steps_data[step];
  const isLastStep = step === steps_data.length - 1;
  const isStepValid = () => {
    if (currentStep.field === 'goals') {
      return formData.goals.length > 0;
    }
    return (formData as any)[currentStep.field] !== '';
  };

  const handleToggleGoal = (goalId: string) => {
    setFormData((prev) => ({
      ...prev,
      goals: prev.goals.includes(goalId)
        ? prev.goals.filter((g) => g !== goalId)
        : [...prev.goals, goalId],
    }));
  };

  const handleSelectOption = (optionId: string) => {
    setFormData((prev) => ({
      ...prev,
      [currentStep.field]: optionId,
    }));
  };

  const handleNext = () => {
    if (isLastStep) {
      setIsCompleted(true);
      setTimeout(() => onNavigate('/learner/teachers'), 1000);
    } else {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  if (isCompleted) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-12 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">رائع!</h2>
          <p className="text-gray-600 mb-6">تم حفظ تفضيلاتك بنجاح. سيتم توجيهك الآن لاختيار معلمك</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl w-full"
      >
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">{currentStep.title}</h1>
            <span className="text-sm font-bold text-gray-600">
              {step + 1} / {steps_data.length}
            </span>
          </div>
          <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${((step + 1) / steps_data.length) * 100}%` }}
              className="h-full bg-green-700"
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Step Content */}
        <div className="mb-8">
          <p className="text-gray-600 mb-6">{currentStep.description}</p>

          <div className="space-y-3">
            {currentStep.type === 'checkbox'
              ? currentStep.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-700 transition"
                  >
                    <input
                      type="checkbox"
                      checked={formData.goals.includes(option.id)}
                      onChange={() => handleToggleGoal(option.id)}
                      className="w-5 h-5 accent-green-700"
                    />
                    <span className="mr-3 font-semibold text-gray-800">{option.label}</span>
                  </label>
                ))
              : currentStep.options.map((option) => (
                  <label
                    key={option.id}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-lg cursor-pointer hover:border-green-700 transition"
                  >
                    <input
                      type="radio"
                      name={currentStep.field}
                      value={option.id}
                      checked={(formData as any)[currentStep.field] === option.id}
                      onChange={() => handleSelectOption(option.id)}
                      className="w-5 h-5 accent-green-700"
                    />
                    <span className="mr-3 font-semibold text-gray-800">{option.label}</span>
                  </label>
                ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <button
            onClick={handleBack}
            disabled={step === 0}
            className="flex-1 px-6 py-3 border-2 border-gray-200 text-gray-700 font-bold rounded-lg hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            disabled={!isStepValid()}
            className="flex-1 px-6 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {isLastStep ? 'إنهاء' : 'التالي'}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}
