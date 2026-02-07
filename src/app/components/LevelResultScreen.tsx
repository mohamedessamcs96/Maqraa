import { Star, TrendingUp, Award, Sparkles, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

interface LevelResultScreenProps {
  level: string;
  onViewTutors: () => void;
}

export function LevelResultScreen({ level, onViewTutors }: LevelResultScreenProps) {
  const getLevelInfo = () => {
    switch (level) {
      case 'مبتدئ':
        return {
          color: 'from-blue-500 to-blue-600',
          bgColor: 'from-blue-50 to-indigo-50',
          score: 65,
          description: 'لديك أساسيات جيدة في التلاوة',
          recommendations: [
            'التركيز على إتقان مخارج الحروف',
            'دراسة الأحكام الأساسية للتجويد',
            'الممارسة اليومية مع متابعة معلم مجاز'
          ]
        };
      case 'متوسط':
        return {
          color: 'from-emerald-500 to-teal-600',
          bgColor: 'from-emerald-50 to-teal-50',
          score: 78,
          description: 'مستوى جيد مع إمكانية للتحسين',
          recommendations: [
            'إتقان أحكام المد والغنة',
            'تحسين الوقف والابتداء',
            'دراسة الأحكام المتقدمة في التجويد'
          ]
        };
      case 'متقدم':
        return {
          color: 'from-purple-500 to-violet-600',
          bgColor: 'from-purple-50 to-violet-50',
          score: 88,
          description: 'مستوى متقدم وأداء ممتاز',
          recommendations: [
            'البدء في دراسة القراءات العشر',
            'التعمق في علوم القرآن والتفسير',
            'المشاركة في برامج الإقراء والإجازات'
          ]
        };
      case 'محترف':
        return {
          color: 'from-amber-500 to-orange-600',
          bgColor: 'from-amber-50 to-orange-50',
          score: 95,
          description: 'إتقان عالي وأداء احترافي',
          recommendations: [
            'الحصول على إجازة في القراءات',
            'تدريس القرآن الكريم والإقراء',
            'المشاركة في المسابقات القرآنية'
          ]
        };
      default:
        return {
          color: 'from-gray-500 to-gray-600',
          bgColor: 'from-gray-50 to-gray-100',
          score: 70,
          description: 'مستوى جيد',
          recommendations: ['مواصلة التعلم والممارسة']
        };
    }
  };

  const levelInfo = getLevelInfo();

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Header with gradient */}
      <div className="px-4 sm:px-6 py-10 sm:py-12 relative overflow-hidden" style={{ backgroundColor: '#059669', color: '#ffffff' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative z-10 text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
            className="w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ backgroundColor: 'rgba(255,255,255,0.2)' }}
          >
            <Award className="w-12 h-12" style={{ color: '#ffffff' }} />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2" style={{ color: '#ffffff' }}>نتيجة التقييم</h1>
          <p style={{ color: 'rgba(255,255,255,0.9)' }}>منصة مقرأة • تحليل شامل لأدائك</p>
        </motion.div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-40 h-40 rounded-full -translate-x-1/2 -translate-y-1/2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 rounded-full translate-x-1/2 translate-y-1/2" style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}></div>
      </div>

      {/* Main content */}
  <div className="flex-1 -mt-6 bg-white rounded-t-3xl px-4 sm:px-6 py-6 sm:py-8 overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {/* Level badge */}
          <div className={`bg-gradient-to-br ${levelInfo.bgColor} rounded-2xl p-6 mb-6 text-center`}>
            <div className="flex items-center justify-center gap-2 mb-2">
              <Sparkles className="w-5 h-5 text-amber-500" />
              <span className="text-gray-600 text-sm">مستواك</span>
              <Sparkles className="w-5 h-5 text-amber-500" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">{level}</h2>
            <p className="text-gray-600">{levelInfo.description}</p>
          </div>

          {/* Score circle */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">التقييم العام</h3>
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(levelInfo.score / 20)
                        ? 'fill-amber-400 text-amber-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
            
            <div className="relative">
              <div className="flex items-end justify-center gap-12 mb-4">
                <div className="text-center flex-1">
                  <div className={`text-5xl font-bold bg-gradient-to-r ${levelInfo.color} bg-clip-text text-transparent`}>
                    {levelInfo.score}
                  </div>
                  <div className="text-gray-500 text-sm">من 100</div>
                </div>
              </div>
              
              {/* Progress bar */}
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${levelInfo.score}%` }}
                  transition={{ delay: 0.5, duration: 1, ease: 'easeOut' }}
                  className={`h-full bg-gradient-to-r ${levelInfo.color} rounded-full`}
                />
              </div>
            </div>
          </div>

          {/* Detailed scores */}
          <div className="bg-white border-2 border-gray-100 rounded-2xl p-6 mb-6">
            <h3 className="text-lg font-bold text-gray-800 mb-4">تفاصيل الأداء</h3>
            <div className="space-y-4">
              <ScoreItem label="مخارج الحروف" score={levelInfo.score + 5} color={levelInfo.color} />
              <ScoreItem label="أحكام التجويد" score={levelInfo.score - 3} color={levelInfo.color} />
              <ScoreItem label="الطلاقة والنطق" score={levelInfo.score + 2} color={levelInfo.color} />
              <ScoreItem label="سرعة القراءة" score={levelInfo.score - 5} color={levelInfo.color} />
            </div>
          </div>

          {/* Recommendations */}
          <div className={`bg-gradient-to-br ${levelInfo.bgColor} rounded-2xl p-6 mb-6`}>
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              توصيات للتحسين
            </h3>
            <ul className="space-y-3">
              {levelInfo.recommendations.map((rec, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-xs">{index + 1}</span>
                  </div>
                  <span>{rec}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* CTA */}
          <motion.button
            onClick={onViewTutors}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center gap-2"
            style={{ backgroundColor: '#059669', color: '#ffffff' }}
          >
            اختر معلمك المناسب
            <ArrowLeft className="w-5 h-5" />
          </motion.button>

          <p className="text-center text-sm mt-4" style={{ color: '#6b7280' }}>
            لقد اخترنا لك أفضل المعلمين المناسبين لمستواك
          </p>
        </motion.div>
      </div>
    </div>
  );
}

interface ScoreItemProps {
  label: string;
  score: number;
  color: string;
}

function ScoreItem({ label, score, color }: ScoreItemProps) {
  const clampedScore = Math.min(Math.max(score, 0), 100);
  
  return (
    <div>
      <div className="flex justify-between mb-2">
        <span className="text-gray-700 text-sm">{label}</span>
        <span className="text-gray-900 font-bold text-sm">{clampedScore}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${clampedScore}%` }}
          transition={{ delay: 0.3, duration: 0.8, ease: 'easeOut' }}
          className={`h-full bg-gradient-to-r ${color} rounded-full`}
        />
      </div>
    </div>
  );
}