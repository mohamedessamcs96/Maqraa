import { TrendingUp, Calendar, CheckCircle, Clock, Award } from 'lucide-react';
import { motion } from 'motion/react';

interface IjazahProgressProps {
  onBack: () => void;
}

export function IjazahProgress({ onBack }: IjazahProgressProps) {
  const enrolledPrograms = [
    {
      id: 1,
      name: 'الإجازة الكاملة',
      instructor: 'د. أحمد حسن',
      progress: 45,
      totalPages: 604,
      completedPages: 272,
      sessionsDone: 15,
      sessionsLeft: 18,
      nextSession: 'الخميس الساعة 6 مساءً',
    },
    {
      id: 2,
      name: 'إجازة جزء عم',
      instructor: 'الشيخ عبدالله المصري',
      progress: 70,
      totalPages: 30,
      completedPages: 21,
      sessionsDone: 8,
      sessionsLeft: 3,
      nextSession: 'الأربعاء الساعة 8 مساءً',
    },
  ];

  return (
    <div className="min-h-screen bg-white pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-6 py-6">
        <button onClick={onBack} className="mb-4 text-purple-100 hover:text-white">
          ← عودة
        </button>
        <h1 className="text-2xl font-bold">تقدمي في الإجازات</h1>
        <p className="text-purple-100 mt-1">متابعة برامج الإجازات المسجلة</p>
      </div>

      {/* Programs */}
      <div className="px-6 py-6">
        {enrolledPrograms.length === 0 ? (
          <div className="text-center py-12">
            <Award className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">لم تسجل في أي برنامج إجازة بعد</p>
            <button
              onClick={onBack}
              className="bg-purple-500 text-white px-6 py-2 rounded-xl font-bold hover:bg-purple-600"
            >
              استكشف البرامج
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {enrolledPrograms.map((program, index) => (
              <motion.div
                key={program.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200"
              >
                {/* Header */}
                <div className="mb-4">
                  <h3 className="text-lg font-bold text-gray-800 mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-600">المحفز: {program.instructor}</p>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-2">
                    <span>{program.completedPages} من {program.totalPages} صفحة</span>
                    <span className="font-bold text-purple-600">{program.progress}%</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-3">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full"
                      style={{ width: `${program.progress}%` }}
                    ></div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">الجلسات المكتملة</p>
                    <p className="text-lg font-bold text-gray-800">{program.sessionsDone}</p>
                  </div>
                  <div className="bg-white rounded-lg p-3 border border-purple-200">
                    <p className="text-xs text-gray-600 mb-1">الجلسات المتبقية</p>
                    <p className="text-lg font-bold text-gray-800">{program.sessionsLeft}</p>
                  </div>
                </div>

                {/* Next Session */}
                <div className="bg-white rounded-lg p-3 border border-purple-200">
                  <p className="text-xs text-gray-600 mb-1 flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    الجلسة القادمة
                  </p>
                  <p className="font-bold text-gray-800">{program.nextSession}</p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
