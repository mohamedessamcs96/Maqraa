import { motion } from 'motion/react';
import { Mic, ArrowLeft, ArrowRight, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AssessmentIntroScreenProps {
  onStart: () => void;
  onSkip?: () => void;
}

export function AssessmentIntroScreen({ onStart, onSkip }: AssessmentIntroScreenProps) {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-white" dir="rtl">
      <div className="mx-auto w-full max-w-md px-3 sm:px-4 py-5 sm:py-8">
        {/* Header */}
        <div className="mb-3 flex items-center justify-between rounded-2xl bg-[#486837] px-3 py-3 text-white shadow-sm">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 hover:bg-white/15 active:bg-white/20 transition"
            aria-label="رجوع"
          >
            {/* In RTL, a right arrow visually reads as “back” */}
            <ArrowRight className="h-5 w-5" />
          </button>

          <div className="text-center leading-tight">
            <div className="text-base font-extrabold">اختبار المستوى</div>
            <div className="text-xs text-white/85">دقيقة واحدة فقط</div>
          </div>

          <div className="h-10 w-10" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-3xl bg-white p-5 sm:p-7 text-center shadow-sm border border-black/5"
        >
          <div className="mb-3 flex items-center justify-center gap-2">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
              <Sparkles className="h-5 w-5" />
            </span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-gray-900">اختبر مستواك الآن</h1>
          </div>

          <p className="text-sm sm:text-base leading-relaxed text-gray-700">
            سجل نفسك في اختبار مدته دقيقة واحدة فقط. سنحلل أدائك ونربطك بأفضل معلم مناسب لمستواك.
          </p>

          <div className="mt-4 grid grid-cols-3 gap-2 text-xs sm:text-sm">
            <div className="rounded-2xl border border-black/5 bg-emerald-50/60 px-3 py-2">
              <div className="font-extrabold text-emerald-800">60 ثانية</div>
              <div className="text-emerald-900/70">مدة الاختبار</div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-emerald-50/60 px-3 py-2">
              <div className="font-extrabold text-emerald-800">تقييم فوري</div>
              <div className="text-emerald-900/70">نتيجة تقديرية</div>
            </div>
            <div className="rounded-2xl border border-black/5 bg-emerald-50/60 px-3 py-2">
              <div className="font-extrabold text-emerald-800">خصوصية</div>
              <div className="text-emerald-900/70">آمن ومحمي</div>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.98 }}
            onClick={onStart}
            className="mt-5 sm:mt-6 w-full rounded-2xl bg-[#486837] px-5 sm:px-6 py-3.5 sm:py-4 text-sm sm:text-base font-extrabold text-white shadow-sm hover:bg-[#3b552d] transition flex items-center justify-center gap-2"
          >
            <ArrowLeft className="h-5 w-5" />
            ابدأ الاختبار (اختياري)
            <Mic className="h-5 w-5" />
          </motion.button>

          {onSkip && (
            <button
              onClick={onSkip}
              className="mt-4 text-xs sm:text-sm text-emerald-800/80 hover:text-emerald-900"
            >
              يمكنك أيضاً البدء مباشرة بدون اختبار واختيار المعلم يدويًا
            </button>
          )}
        </motion.div>
      </div>
    </div>
  );
}
