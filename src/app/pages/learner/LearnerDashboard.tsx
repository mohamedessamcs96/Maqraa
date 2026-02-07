import { useState } from 'react';
import { motion } from 'motion/react';
import {
  BookOpen,
  Clock,
  Award,
  Users,
  ArrowRight,
  LogOut,
  Settings,
  Bell,
} from 'lucide-react';
import { mockTeachers, mockSessions } from '../../data/mockData';
import { useAuth } from '../../hooks/useAuth';

interface LearnerDashboardProps {
  onNavigate: (path: string) => void;
}

export function LearnerDashboard({ onNavigate }: LearnerDashboardProps) {
  const { user, logout } = useAuth();
  const [notificationCount, setNotificationCount] = useState(1);

  const upcomingSessions = mockSessions.filter(
    (s) => s.status === 'confirmed' || s.status === 'paid'
  );
  const completedSessions = mockSessions.filter((s) => s.status === 'completed');

  const stats = [
    {
      icon: BookOpen,
      label: 'إجمالي الجلسات',
      value: mockSessions.length.toString(),
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Clock,
      label: 'ساعات الدراسة',
      value: '68',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Award,
      label: 'معلمون مفضلون',
      value: '3',
      color: 'bg-yellow-100 text-yellow-600',
    },
    {
      icon: Users,
      label: 'المستوى',
      value: 'متقدم',
      color: 'bg-purple-100 text-purple-600',
    },
  ];

  const serviceLabels: Record<string, string> = {
    memorization: 'حفظ الكتاب',
    tajweed: 'تصحيح التلاوة',
    khatmah: 'برنامج الختمة',
    iqra: 'تعليم الإقراء',
    ijazah: 'برنامج الإجازة',
    children: 'متخصص للأطفال',
    women: 'متخصص للنساء',
    seniors: 'متخصص لكبار السن',
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">مرحباً {user?.name}</h1>
            <p className="text-green-100 mt-1">استكمل رحلتك القرآنية اليوم</p>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {}}
              className="relative hover:bg-green-600 rounded-full p-2 transition"
            >
              <Bell className="w-6 h-6" />
              {notificationCount > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {}}
              className="hover:bg-green-600 rounded-full p-2 transition"
            >
              <Settings className="w-6 h-6" />
            </button>
            <button
              onClick={() => {
                logout();
                onNavigate('/landing');
              }}
              className="hover:bg-green-600 rounded-full p-2 transition"
            >
              <LogOut className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
              >
                <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6" />
                </div>
                <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Upcoming Sessions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-2xl shadow-lg p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">الجلسات القادمة</h2>
                <button
                  onClick={() => onNavigate('/learner/sessions')}
                  className="text-green-700 hover:text-green-800 font-bold flex items-center gap-1"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {upcomingSessions.length === 0 ? (
                <div className="text-center py-8 text-gray-600">
                  <p>لا توجد جلسات قادمة</p>
                  <button
                    onClick={() => onNavigate('/learner/teachers')}
                    className="mt-4 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
                  >
                    احجز جلسة الآن
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {upcomingSessions.slice(0, 3).map((session, index) => {
                    const teacher = mockTeachers.find((t) => t.id === session.teacherId);
                    return (
                      <motion.div
                        key={session.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="p-4 border border-gray-200 rounded-lg hover:border-green-700 transition"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-4">
                            <img
                              src={teacher?.photoUrl || ''}
                              alt={teacher?.name}
                              className="w-12 h-12 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-bold text-gray-900">{teacher?.name}</h3>
                              <p className="text-sm text-gray-600">{serviceLabels[session.serviceType]}</p>
                            </div>
                          </div>
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full">
                            {session.status === 'confirmed' ? 'قيد التأكيد' : 'مدفوع'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-sm text-gray-600">
                          <span>
                            📅 {session.date} - {session.time}
                          </span>
                          <span>⏱️ {session.duration} ساعة</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </motion.div>

            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="grid grid-cols-2 gap-4"
            >
              <button
                onClick={() => onNavigate('/learner/teachers')}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center"
              >
                <BookOpen className="w-8 h-8 text-green-700 mx-auto mb-3" />
                <p className="font-bold text-gray-900">ابحث عن معلم</p>
              </button>
              <button
                onClick={() => onNavigate('/learner/sessions')}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition text-center"
              >
                <Clock className="w-8 h-8 text-blue-700 mx-auto mb-3" />
                <p className="font-bold text-gray-900">جلساتي</p>
              </button>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Progress Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-6 border border-green-200"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-4">تقدمك</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">حفظ الكتاب</span>
                    <span className="text-sm font-bold text-green-700">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 transition-all duration-300"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-semibold text-gray-700">التجويد</span>
                    <span className="text-sm font-bold text-green-700">60%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 transition-all duration-300"
                      style={{ width: '60%' }}
                    />
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Recent Reviews */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-2xl shadow-lg p-6"
            >
              <h3 className="font-bold text-lg text-gray-900 mb-4">تقييماتك الأخيرة</h3>
              <div className="space-y-3">
                <div className="p-3 bg-yellow-50 rounded-lg">
                  <div className="flex gap-1 mb-2">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-lg">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-700">معلم ممتاز جداً</p>
                </div>
              </div>
            </motion.div>

            {/* Learning Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-blue-50 rounded-2xl shadow-lg p-6 border border-blue-200"
            >
              <h3 className="font-bold text-lg text-blue-900 mb-4">💡 نصيحة اليوم</h3>
              <p className="text-sm text-blue-800">
                المراجعة اليومية تساعد على تثبيت الحفظ. حاول مراجعة 5 دقائق في الصباح و10 دقائق في المساء
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
