import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useAuthContext } from '../../context/AuthContext';

interface LearnerDashboardProps {}

export function LearnerDashboard({}: LearnerDashboardProps) {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext();
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
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">مرحباً {user?.name}</h1>
            <p className="text-green-100 mt-1 text-sm">استكمل رحلتك القرآنية اليوم</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => {}}
              className="relative hover:bg-green-600 rounded-full p-2 transition"
            >
              <Bell className="w-5 h-5" />
              {notificationCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                  {notificationCount}
                </span>
              )}
            </button>
            <button
              onClick={() => {}}
              className="hover:bg-green-600 rounded-full p-2 transition"
            >
              <Settings className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                logout();
                navigate('/');
              }}
              className="hover:bg-green-600 rounded-full p-2 transition"
            >
              <LogOut className="w-5 h-5" />
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
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition"
              >
                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-xs text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
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
              className="bg-white rounded-2xl shadow-lg p-5"
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">الجلسات القادمة</h2>
                <button
                  onClick={() => navigate('/learner/sessions')}
                  className="text-green-700 hover:text-green-800 font-bold flex items-center gap-1 text-sm"
                >
                  عرض الكل
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              {upcomingSessions.length === 0 ? (
                <div className="text-center py-6 text-gray-600">
                  <p className="text-sm">لا توجد جلسات قادمة</p>
                  <button
                    onClick={() => navigate('/learner/teachers')}
                    className="mt-3 px-4 py-2 text-sm bg-green-700 text-white rounded-lg hover:bg-green-800 transition"
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
                        className="p-3 border border-gray-200 rounded-lg hover:border-green-700 transition"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <img
                              src={teacher?.photoUrl || ''}
                              alt={teacher?.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <h3 className="font-bold text-sm text-gray-900">{teacher?.name}</h3>
                              <p className="text-xs text-gray-600">{serviceLabels[session.serviceType]}</p>
                            </div>
                          </div>
                          <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                            {session.status === 'confirmed' ? 'قيد التأكيد' : 'مدفوع'}
                          </span>
                        </div>
                        <div className="flex items-center justify-between text-xs text-gray-600">
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
                onClick={() => navigate('/learner/teachers')}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-center"
              >
                <BookOpen className="w-6 h-6 text-green-700 mx-auto mb-2" />
                <p className="font-bold text-sm text-gray-900">ابحث عن معلم</p>
              </button>
              <button
                onClick={() => navigate('/learner/sessions')}
                className="bg-white rounded-xl p-4 shadow-md hover:shadow-lg transition text-center"
              >
                <Clock className="w-6 h-6 text-blue-700 mx-auto mb-2" />
                <p className="font-bold text-sm text-gray-900">جلساتي</p>
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
              className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl shadow-lg p-4 border border-green-200"
            >
              <h3 className="font-bold text-base text-gray-900 mb-3">تقدمك</h3>
              <div className="space-y-3">
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">حفظ الكتاب</span>
                    <span className="text-xs font-bold text-green-700">45%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-700 transition-all duration-300"
                      style={{ width: '45%' }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-semibold text-gray-700">التجويد</span>
                    <span className="text-xs font-bold text-green-700">60%</span>
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
              className="bg-white rounded-2xl shadow-lg p-4"
            >
              <h3 className="font-bold text-base text-gray-900 mb-3">تقييماتك الأخيرة</h3>
              <div className="space-y-2">
                <div className="p-2 bg-yellow-50 rounded-lg">
                  <div className="flex gap-0.5 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className="text-yellow-400 text-sm">
                        ⭐
                      </span>
                    ))}
                  </div>
                  <p className="text-xs text-gray-700">معلم ممتاز جداً</p>
                </div>
              </div>
            </motion.div>

            {/* Learning Tips */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 }}
              className="bg-blue-50 rounded-2xl shadow-lg p-4 border border-blue-200"
            >
              <h3 className="font-bold text-base text-blue-900 mb-2">💡 نصيحة اليوم</h3>
              <p className="text-xs text-blue-800">
                المراجعة اليومية تساعد على تثبيت الحفظ. حاول مراجعة 5 دقائق في الصباح و10 دقائق في المساء
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
