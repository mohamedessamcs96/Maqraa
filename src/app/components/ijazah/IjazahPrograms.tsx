import { Award, BookOpen, Users, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';

interface IjazahProgramsProps {
  onSelectProgram: (programId: string) => void;
  onViewProgress: () => void;
}

export function IjazahPrograms({ onSelectProgram, onViewProgress }: IjazahProgramsProps) {
  const programs = [
    {
      id: 'quran-complete',
      name: 'الإجازة الكاملة',
      description: 'إجازة في القرآن الكريم كاملاً',
      duration: '12 شهر',
      level: 'متقدم',
      instructor: 'د. أحمد حسن',
      price: '500 ريال',
      spots: '2 متاحة',
    },
    {
      id: 'reading-ten',
      name: 'إجازة القراءات العشر',
      description: 'إجازة متخصصة في القراءات القرآنية العشر',
      duration: '8 شهور',
      level: 'متقدم',
      instructor: 'الشيخ محمد الأحمد',
      price: '400 ريال',
      spots: '3 متاحة',
    },
    {
      id: 'juz-30',
      name: 'إجازة جزء عم',
      description: 'إجازة متخصصة في الجزء الثلاثين',
      duration: '2 شهر',
      level: 'مبتدئ',
      instructor: 'الشيخ عبدالله المصري',
      price: '150 ريال',
      spots: 'متاحة',
    },
  ];

  const stats = [
    { icon: Award, label: 'برامج متاحة', value: '3', color: 'emerald' },
    { icon: Users, label: 'محفزون مسجلون', value: '124', color: 'blue' },
    { icon: BookOpen, label: 'تخصصات', value: '5', color: 'orange' },
    { icon: TrendingUp, label: 'نسبة النجاح', value: '98%', color: 'purple' },
  ];

  return (
    <div className="min-h-screen bg-white pb-32" dir="rtl">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-500 to-pink-500 text-white px-6 py-8">
        <h1 className="text-3xl font-bold mb-2">برامج الإجازات</h1>
        <p className="text-purple-100">احصل على إجازة قرآنية رسمية ومعترف بها</p>
      </div>

      {/* Stats */}
      <div className="px-6 py-6 border-b border-gray-200">
        <div className="grid grid-cols-2 gap-3">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-4"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon className={`w-5 h-5 text-${stat.color}-600`} />
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-lg font-bold text-gray-800">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Programs List */}
      <div className="px-6 py-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">اختر برنامجاً:</h2>
        <div className="space-y-4">
          {programs.map((program, index) => (
            <motion.button
              key={program.id}
              onClick={() => onSelectProgram(program.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="w-full text-right bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-5 border border-purple-200 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 mb-1">{program.name}</h3>
                  <p className="text-sm text-gray-700 mb-3">{program.description}</p>
                </div>
                <div className="text-left ml-4">
                  <p className="text-lg font-bold text-purple-600">{program.price}</p>
                  <span className="text-xs text-purple-500">{program.spots}</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs text-gray-600 mb-3">
                <div>
                  <span className="font-semibold">المدة:</span> {program.duration}
                </div>
                <div>
                  <span className="font-semibold">المستوى:</span> {program.level}
                </div>
              </div>
              <p className="text-xs text-gray-600 border-t border-purple-200 pt-3">
                المحفز: {program.instructor}
              </p>
            </motion.button>
          ))}
        </div>
      </div>

      {/* View Progress */}
      <div className="px-6 pb-6">
        <button
          onClick={onViewProgress}
          className="w-full border-2 border-purple-500 text-purple-600 rounded-2xl py-3 font-bold transition-colors hover:bg-purple-50"
        >
          عرض تقدمي في البرامج
        </button>
      </div>
    </div>
  );
}
