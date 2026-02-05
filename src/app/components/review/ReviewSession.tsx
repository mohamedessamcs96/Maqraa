import { ArrowRight, Play, Pause, Volume2, BookOpen } from 'lucide-react';
import { motion } from 'motion/react';
import { useState } from 'react';

interface ReviewSessionProps {
  onComplete: () => void;
  onBack: () => void;
}

export function ReviewSession({ onComplete, onBack }: ReviewSessionProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const verses = [
    { id: 1, surah: 'الفاتحة', ayah: '1-7', text: 'الحمد لله رب العالمين الرحمن الرحيم' },
    { id: 2, surah: 'الفاتحة', ayah: '8-9', text: 'مالك يوم الدين إياك نعبد وإياك نستعين' },
  ];

  const currentVerse = verses[currentIndex];

  const handleNext = () => {
    if (currentIndex < verses.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      onComplete();
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col" dir="rtl">
      {/* Header */}
      <div
        className="px-6 py-4 text-white"
        style={{ backgroundColor: '#059669' }}
      >
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full">
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold">جلسة مراجعة</h1>
            <p className="text-sm text-emerald-100">سورة الفاتحة</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        {/* Progress */}
        <div className="w-full mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>{currentIndex + 1} من {verses.length}</span>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-2">
            <div
              className="bg-emerald-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / verses.length) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Verse Display */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-2xl p-8 text-center mb-8 border border-emerald-200"
        >
          <p className="text-sm text-emerald-600 font-semibold mb-3">
            {currentVerse.surah} - الآية {currentVerse.ayah}
          </p>
          <p className="text-2xl leading-relaxed text-gray-800 mb-6 font-arabic">
            {currentVerse.text}
          </p>
          <button className="flex items-center justify-center gap-2 bg-emerald-500 text-white px-6 py-2 rounded-full hover:bg-emerald-600 transition-colors mx-auto">
            <Volume2 className="w-4 h-4" />
            استمع للتلاوة
          </button>
        </motion.div>

        {/* Status */}
        <div className="bg-blue-50 rounded-xl p-4 text-center mb-8 border border-blue-200 w-full">
          <p className="text-sm text-gray-700">
            هل تذكر هذه الآية؟ حاول تلاوتها قبل الضغط على التالي
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="px-6 py-6 border-t border-gray-200 space-y-3">
        <div className="flex gap-3">
          <button
            onClick={handlePrevious}
            disabled={currentIndex === 0}
            className="flex-1 px-4 py-3 rounded-xl border-2 border-gray-300 font-bold text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
          >
            السابق
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-colors"
          >
            {currentIndex === verses.length - 1 ? 'إنهاء' : 'التالي'}
          </button>
        </div>
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          className="w-full px-4 py-3 rounded-xl bg-blue-50 text-blue-600 font-bold border-2 border-blue-200 flex items-center justify-center gap-2 hover:bg-blue-100 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
          {isPlaying ? 'إيقاف' : 'تشغيل الجلسة'}
        </button>
      </div>
    </div>
  );
}
