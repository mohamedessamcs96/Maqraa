import { ArrowRight, Volume2, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface RecitationCorrectionProps {
  onBack: () => void;
}

export function RecitationCorrection({ onBack }: RecitationCorrectionProps) {
  const corrections = [
    {
      type: 'good',
      text: 'الحمد لله رب العالمين',
      issue: 'ممتاز! التجويد صحيح',
      score: 100,
    },
    {
      type: 'warning',
      text: 'الرحمن الرحيم',
      issue: 'احرص على إظهار النون في "الرحمن"',
      score: 85,
    },
    {
      type: 'good',
      text: 'مالك يوم الدين',
      issue: 'النطق صحيح والتجويد دقيق',
      score: 98,
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-blue-500 to-indigo-500 text-white px-6 py-6">
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowRight className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">تصحيح التلاوة</h1>
        </div>
      </div>

      {/* Overall Score */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 text-center border border-blue-200">
          <p className="text-sm text-blue-600 font-semibold mb-2">النتيجة الإجمالية</p>
          <div className="flex items-end justify-center gap-2">
            <p className="text-5xl font-bold text-blue-600">92</p>
            <p className="text-2xl text-blue-500 mb-1">/100</p>
          </div>
          <p className="text-gray-700 mt-4 text-sm">أداء ممتاز! استمر في التحسن</p>
        </div>
      </div>

      {/* Detailed Analysis */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">تحليل التلاوة</h2>
        <div className="space-y-3">
          {corrections.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-xl p-4 border-l-4 ${
                item.type === 'good'
                  ? 'bg-emerald-50 border-l-emerald-500'
                  : 'bg-orange-50 border-l-orange-500'
              }`}
            >
              <div className="flex items-start justify-between mb-2">
                <p className="font-arabic text-lg text-gray-800 flex-1">{item.text}</p>
                <span className="text-2xl font-bold text-gray-800 ml-4">{item.score}</span>
              </div>
              <div className="flex items-start gap-2">
                {item.type === 'good' ? (
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-orange-500 flex-shrink-0 mt-0.5" />
                )}
                <p className="text-sm text-gray-700">{item.issue}</p>
              </div>
              <button className="mt-2 flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700">
                <Volume2 className="w-4 h-4" />
                استمع للتصحيح
              </button>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Tips Section */}
      <div className="px-6 py-6 border-t border-gray-200">
        <h3 className="font-bold text-gray-800 mb-3">نصائح للتحسن:</h3>
        <ul className="space-y-2 text-sm text-gray-700">
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-1">•</span>
            <span>انتبه لأحكام النون والميم</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-1">•</span>
            <span>تدرب على المد والقصر</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-emerald-500 font-bold mt-1">•</span>
            <span>استمع لقراءات معتمدة</span>
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="px-6 py-6 space-y-3">
        <button className="w-full bg-blue-500 text-white rounded-xl py-3 font-bold hover:bg-blue-600 transition-colors">
          سجل مرة أخرى
        </button>
        <button
          onClick={onBack}
          className="w-full border-2 border-gray-300 text-gray-700 rounded-xl py-3 font-bold hover:bg-gray-50 transition-colors"
        >
          عودة
        </button>
      </div>
    </div>
  );
}
