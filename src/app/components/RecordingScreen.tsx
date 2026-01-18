import { useState, useEffect } from 'react';
import { ArrowRight, Mic, StopCircle, Play, Check } from 'lucide-react';
import { motion } from 'motion/react';

interface RecordingScreenProps {
  onComplete: () => void;
  onBack: () => void;
}

type RecordingState = 'ready' | 'recording' | 'analyzing' | 'complete';

export function RecordingScreen({ onComplete, onBack }: RecordingScreenProps) {
  const [state, setState] = useState<RecordingState>('ready');
  const [timeLeft, setTimeLeft] = useState(60);
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    if (state === 'recording' && timeLeft > 0) {
      const timer = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (state === 'recording' && timeLeft === 0) {
      handleStopRecording();
    }
  }, [state, timeLeft]);

  // Simulate audio levels during recording
  useEffect(() => {
    if (state === 'recording') {
      const interval = setInterval(() => {
        setAudioLevel(Math.random() * 100);
      }, 100);
      return () => clearInterval(interval);
    }
  }, [state]);

  const handleStartRecording = () => {
    setState('recording');
    setTimeLeft(60);
  };

  const handleStopRecording = () => {
    setState('analyzing');
    setTimeout(() => {
      setState('complete');
      setTimeout(onComplete, 1500);
    }, 2000);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Header */}
      <div className="px-6 py-4" style={{ backgroundColor: '#059669', color: '#ffffff' }}>
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
          <div>
            <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>تقييم مستوى التلاوة</h1>
            <p className="text-sm" style={{ color: '#d1fae5' }}>منصة مقرأة • نورٌ يُتلى</p>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center p-6 bg-white">
        {state === 'ready' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="mb-8">
              <div className="w-32 h-32 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Mic className="w-16 h-16 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">جاهز للبدء؟</h2>
              <p className="text-gray-600">اضغط على الزر أدناه وابدأ بتلاوة أي سورة تحفظها</p>
            </div>

            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-6 mb-8 max-w-sm mx-auto">
              <h3 className="font-bold text-gray-800 mb-3">نصائح للحصول على أفضل تقييم:</h3>
              <ul className="text-gray-700 text-sm space-y-2 text-right">
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>اختر مكاناً هادئاً</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>تحدث بصوت واضح</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>اقرأ بتأنٍ وتركيز</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span>لا تتوقف حتى انتهاء الوقت</span>
                </li>
              </ul>
            </div>

            <motion.button
              onClick={handleStartRecording}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
              style={{ backgroundColor: '#059669', color: '#ffffff' }}
            >
              <Play className="w-5 h-5" />
              ابدأ التسجيل
            </motion.button>
          </motion.div>
        )}

        {state === 'recording' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center w-full"
          >
            <div className="mb-8">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="w-40 h-40 bg-gradient-to-br from-red-500 to-rose-600 rounded-full flex items-center justify-center mx-auto mb-6 relative"
              >
                <Mic className="w-20 h-20 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-red-400"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.7, 0, 0.7] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </motion.div>
              
              <div className="text-6xl font-bold text-gray-800 mb-2">{formatTime(timeLeft)}</div>
              <p className="text-gray-600">جاري التسجيل...</p>
            </div>

            {/* Audio level indicator */}
            <div className="max-w-sm mx-auto mb-8">
              <div className="flex gap-1 justify-center items-end h-20">
                {[...Array(20)].map((_, i) => (
                  <motion.div
                    key={i}
                    className="w-2 bg-gradient-to-t from-emerald-600 to-teal-400 rounded-full"
                    animate={{
                      height: `${Math.max(10, (audioLevel + i * 5) % 100)}%`,
                    }}
                    transition={{ duration: 0.1 }}
                  />
                ))}
              </div>
            </div>

            <motion.button
              onClick={handleStopRecording}
              whileTap={{ scale: 0.95 }}
              className="bg-red-600 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center gap-2 mx-auto"
            >
              <StopCircle className="w-5 h-5" />
              إيقاف التسجيل
            </motion.button>
          </motion.div>
        )}

        {(state === 'analyzing' || state === 'complete') && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            {state === 'analyzing' ? (
              <>
                <div className="mb-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                    className="w-32 h-32 border-8 border-emerald-200 border-t-emerald-600 rounded-full mx-auto mb-6"
                  />
                  <h2 className="text-2xl font-bold text-gray-800 mb-2">جاري التحليل...</h2>
                  <p className="text-gray-600">يتم تقييم تلاوتك بواسطة الذكاء الاصطناعي</p>
                </div>
                <div className="flex flex-col gap-2 max-w-xs mx-auto">
                  <div className="flex items-center gap-3 text-gray-700">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.3 }}
                      className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span>تحليل مخارج الحروف</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span>فحص أحكام التجويد</span>
                  </div>
                  <div className="flex items-center gap-3 text-gray-700">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.9 }}
                      className="w-5 h-5 bg-emerald-600 rounded-full flex items-center justify-center flex-shrink-0"
                    >
                      <Check className="w-3 h-3 text-white" />
                    </motion.div>
                    <span>تقييم الطلاقة والنطق</span>
                  </div>
                </div>
              </>
            ) : (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200 }}
                  className="w-32 h-32 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <Check className="w-16 h-16 text-white" />
                </motion.div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">تم التحليل بنجاح!</h2>
                <p className="text-gray-600">جاري عرض النتائج...</p>
              </>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}