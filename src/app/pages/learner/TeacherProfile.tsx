import { useState } from 'react';
import { motion } from 'motion/react';
import { Star, MapPin, Clock, Award, ArrowLeft, MessageCircle } from 'lucide-react';
import { mockTeachers, mockReviews, mockSessions } from '../../data/mockData';
import { Teacher } from '../../types';

interface TeacherProfileProps {
  teacherId: string;
  onNavigate: (path: string) => void;
}

export function TeacherProfile({ teacherId, onNavigate }: TeacherProfileProps) {
  const teacher = mockTeachers.find((t) => t.id === teacherId);
  const teacherReviews = mockReviews.filter((r) => r.teacherId === teacherId);
  const [activeService, setActiveService] = useState(teacher?.services[0].id || '');

  if (!teacher) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">المعلم غير موجود</p>
      </div>
    );
  }

  const selectedService = teacher.services.find((s) => s.id === activeService);
  const availableSlots = [
    { date: '2026-02-15', time: '18:00' },
    { date: '2026-02-16', time: '19:00' },
    { date: '2026-02-17', time: '17:00' },
    { date: '2026-02-18', time: '20:00' },
    { date: '2026-02-20', time: '19:30' },
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
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header with back button */}
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <button
          onClick={() => onNavigate('/learner/teachers')}
          className="flex items-center gap-2 hover:opacity-80 transition"
        >
          <ArrowLeft className="w-5 h-5" />
          العودة
        </button>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Teacher Header Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden mb-8"
        >
          {/* Cover Image */}
          <div className="h-48 bg-gradient-to-br from-green-400 to-green-600" />

          {/* Teacher Info */}
          <div className="p-8 relative">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Photo */}
              <img
                src={teacher.photoUrl}
                alt={teacher.name}
                className="w-32 h-32 rounded-2xl object-cover border-4 border-white shadow-lg -mt-20"
              />

              {/* Basic Info */}
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">{teacher.name}</h1>
                <p className="text-gray-600 mb-4">{teacher.bio}</p>

                {/* Rating and Stats */}
                <div className="flex flex-wrap gap-6 mb-6">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(teacher.rating)
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-lg">{teacher.rating}</span>
                    <span className="text-gray-600">({teacher.reviewCount} تقييم)</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5" />
                    <span>انضم في {teacher.joiningDate}</span>
                  </div>
                </div>

                {/* Certifications */}
                <div className="flex flex-wrap gap-2">
                  {teacher.certifications.map((cert, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full flex items-center gap-1"
                    >
                      <Award className="w-4 h-4" />
                      {cert}
                    </span>
                  ))}
                </div>
              </div>

              {/* Contact Button */}
              <button className="h-12 px-6 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition flex items-center gap-2 whitespace-nowrap">
                <MessageCircle className="w-5 h-5" />
                تواصل
              </button>
            </div>
          </div>
        </motion.div>

        {/* Services and Booking */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-8"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">الخدمات المتاحة</h2>
            <div className="space-y-3 mb-8">
              {teacher.services.map((service) => (
                <button
                  key={service.id}
                  onClick={() => setActiveService(service.id)}
                  className={`w-full p-4 rounded-lg border-2 transition text-right ${
                    activeService === service.id
                      ? 'border-green-700 bg-green-50'
                      : 'border-gray-200 hover:border-green-400'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-gray-900">{serviceLabels[service.type]}</h3>
                      <p className="text-sm text-gray-600">
                        {service.status === 'approved' ? '✅ معتمد' : '⏳ قيد المراجعة'}
                      </p>
                    </div>
                    <div className="text-lg font-bold text-green-700">{service.hourlyRate} ر.س/ساعة</div>
                  </div>
                </button>
              ))}
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="bg-white rounded-2xl shadow-lg p-8 h-fit sticky top-20"
          >
            <h3 className="text-xl font-bold text-gray-900 mb-6">احجز جلسة</h3>

            {selectedService && (
              <>
                <div className="mb-6 p-4 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-sm text-gray-600 mb-1">الخدمة</p>
                  <p className="font-bold text-gray-900">{serviceLabels[selectedService.type]}</p>
                  <p className="text-lg font-bold text-green-700 mt-2">{selectedService.hourlyRate} ر.س</p>
                </div>

                <div className="space-y-3 mb-6">
                  <h4 className="font-bold text-gray-900">أوقات متاحة:</h4>
                  {availableSlots.map((slot, index) => (
                    <button
                      key={index}
                      onClick={() =>
                        onNavigate(
                          `/learner/book/${teacherId}?service=${selectedService.id}&date=${slot.date}&time=${slot.time}`
                        )
                      }
                      className="w-full p-3 border border-gray-200 rounded-lg hover:bg-green-50 hover:border-green-700 transition text-right"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{slot.time}</span>
                        <span className="font-semibold text-gray-900">{slot.date}</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button
                  onClick={() =>
                    onNavigate(
                      `/learner/book/${teacherId}?service=${selectedService.id}`
                    )
                  }
                  className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition"
                >
                  المتابعة لحجز جلسة
                </button>
              </>
            )}
          </motion.div>
        </div>

        {/* Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-2xl shadow-lg p-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6">التقييمات ({teacherReviews.length})</h2>

          {teacherReviews.length === 0 ? (
            <p className="text-gray-600">لا توجد تقييمات بعد</p>
          ) : (
            <div className="space-y-4">
              {teacherReviews.map((review) => (
                <div key={review.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-bold text-gray-900">متعلم</p>
                      <p className="text-sm text-gray-600">{review.createdAt}</p>
                    </div>
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
