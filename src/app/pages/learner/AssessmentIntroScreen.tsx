import { motion } from 'motion/react';
import { Mic, ArrowLeft } from 'lucide-react';

interface AssessmentIntroScreenProps {
  onStart: () => void;
  onSkip?: () => void;
}

export function AssessmentIntroScreen({ onStart, onSkip }: AssessmentIntroScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#486837]/10 via-white to-white" dir="rtl">
      <div className="mx-auto w-full max-w-md px-3 sm:px-4 py-6 sm:py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-[#fff7ed] p-5 sm:p-8 text-center shadow-sm border border-black/5"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="text-2xl">⚡</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">اختبر مستواك الآن</h1>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            سجل نفسك في اختبار مدته دقيقة واحدة فقط. سنحلل أدائك ونربطك بأفضل معلم مناسب لمستواك.
          </p>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="mt-5 sm:mt-6 w-full rounded-2xl bg-[#c2410c] px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-bold text-white shadow-sm hover:bg-[#9a3412] transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            ابدأ الاختبار (اختياري)
            <Mic className="h-5 w-5" />
          </motion.button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="mt-4 text-xs sm:text-sm text-gray-600 hover:text-gray-800"
            >
              يمكنك أيضاً البدء مباشرة بدون اختبار واختيار المعلم يدويًا
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
