import { motion } from 'motion/react';
import { Mic, ArrowLeft } from 'lucide-react';

interface AssessmentIntroScreenProps {
  onStart: () => void;
  onSkip?: () => void;
}

export function AssessmentIntroScreen({ onStart, onSkip }: AssessmentIntroScreenProps) {
  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-green-700 text-white px-4 py-5 sticky top-0 z-10">
        <div className="max-w-md mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center">
                <Mic className="w-5 h-5" />
              </div>
              <div>
                <h1 className="text-lg font-extrabold">اختبر مستواك الآن</h1>
                <p className="text-xs text-green-100">دقيقة واحدة • تقييم سريع</p>
              </div>
            </div>
            <div className="text-xl">⚡</div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-md mx-auto px-3 sm:px-4 py-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-gray-100"
        >
          <p className="text-sm sm:text-base leading-relaxed text-gray-700 text-center">
            سجل نفسك في اختبار مدته دقيقة واحدة فقط. سنحلل أدائك ونربطك بأفضل معلم مناسب لمستواك.
          </p>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="mt-5 w-full rounded-xl bg-green-700 px-5 py-3.5 text-sm sm:text-base font-bold text-white hover:bg-green-800 transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            ابدأ الاختبار
          </motion.button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="mt-4 w-full text-xs sm:text-sm text-gray-600 hover:text-gray-800"
            >
              أو تخطَّ الاختبار وابدأ باختيار المعلم مباشرة
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
