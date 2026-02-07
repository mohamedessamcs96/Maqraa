import { useState, useMemo } from 'react';
import { motion } from 'motion/react';
import { Search, Star, Filter, X } from 'lucide-react';
import { mockTeachers } from '../../data/mockData';
import { Teacher } from '../../types';

interface BrowseTeachersProps {
  onNavigate: (path: string) => void;
}

export function BrowseTeachers({ onNavigate }: BrowseTeachersProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<string>('');
  const [minRating, setMinRating] = useState(0);
  const [maxRate, setMaxRate] = useState(200);
  const [showFilters, setShowFilters] = useState(false);

  const services = ['memorization', 'tajweed', 'khatmah', 'iqra', 'ijazah', 'children', 'women', 'seniors'];

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

  const filteredTeachers = useMemo(() => {
    return mockTeachers.filter((teacher) => {
      const matchesSearch =
        teacher.name.includes(searchQuery) ||
        teacher.bio.includes(searchQuery) ||
        searchQuery === '';

      const matchesService =
        selectedService === '' ||
        teacher.services.some((s) => s.type === selectedService);

      const minServiceRate = selectedService
        ? teacher.services.find((s) => s.type === selectedService)?.hourlyRate || 0
        : Math.min(...teacher.services.map((s) => s.hourlyRate));

      const matchesRate = minServiceRate >= 0 && minServiceRate <= maxRate;
      const matchesRating = teacher.rating >= minRating;

      return matchesSearch && matchesService && matchesRate && matchesRating;
    });
  }, [searchQuery, selectedService, minRating, maxRate]);

  return (
    <div className="min-h-screen bg-gray-50 pb-20" dir="rtl">
      {/* Header */}
      <div className="bg-green-700 text-white p-6 sticky top-0 z-30">
        <h1 className="text-3xl font-bold mb-4">ابحث عن معلم</h1>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute right-3 top-3 w-5 h-5 text-gray-300" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="ابحث عن معلم..."
            className="w-full pr-10 pl-4 py-2 rounded-lg bg-white/20 text-white placeholder-gray-200 focus:bg-white/30 focus:outline-none transition"
          />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        {/* Filters Toggle */}
        <div className="mb-6 flex items-center gap-4">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-100 transition"
          >
            <Filter className="w-5 h-5" />
            الفلاتر
          </button>
          {(selectedService || minRating > 0 || maxRate < 200) && (
            <button
              onClick={() => {
                setSelectedService('');
                setMinRating(0);
                setMaxRate(200);
              }}
              className="px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg transition"
            >
              مسح الفلاتر
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar Filters */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="lg:col-span-1"
            >
              <div className="bg-white rounded-xl p-6 shadow-lg sticky top-24">
                <h2 className="font-bold text-lg mb-6 flex items-center justify-between">
                  الفلاتر
                  <button
                    onClick={() => setShowFilters(false)}
                    className="lg:hidden text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </h2>

                {/* Service Filter */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm mb-3 text-gray-700">الخدمة</h3>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                  >
                    <option value="">كل الخدمات</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {serviceLabels[service]}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h3 className="font-bold text-sm mb-3 text-gray-700">التقييم</h3>
                  <div className="space-y-2">
                    {[4.5, 4, 3.5, 0].map((rating) => (
                      <label key={rating} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={minRating === rating}
                          onChange={() => setMinRating(rating)}
                          className="w-4 h-4 accent-green-700"
                        />
                        <span className="text-sm text-gray-700">
                          {rating === 0 ? 'الكل' : `${rating}+ ⭐`}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Filter */}
                <div>
                  <h3 className="font-bold text-sm mb-3 text-gray-700">السعر (ريال)</h3>
                  <input
                    type="range"
                    min="0"
                    max="200"
                    value={maxRate}
                    onChange={(e) => setMaxRate(Number(e.target.value))}
                    className="w-full"
                  />
                  <p className="text-sm text-gray-600 mt-2">حتى {maxRate} ريال/ساعة</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Teachers Grid */}
          <div className={`${showFilters ? 'lg:col-span-3' : 'lg:col-span-4'}`}>
            {filteredTeachers.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">لم يتم العثور على معلمين يطابقون معايير البحث</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredTeachers.map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition"
                  >
                    {/* Teacher Image */}
                    <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 relative">
                      <img
                        src={teacher.photoUrl}
                        alt={teacher.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{teacher.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{teacher.bio}</p>

                      {/* Rating */}
                      <div className="flex items-center gap-2 mb-4">
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(teacher.rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="font-bold">{teacher.rating}</span>
                        <span className="text-gray-600 text-sm">({teacher.reviewCount} تقييم)</span>
                      </div>

                      {/* Services */}
                      <div className="mb-4">
                        <p className="text-sm font-bold text-gray-700 mb-2">الخدمات:</p>
                        <div className="flex flex-wrap gap-2">
                          {teacher.services.slice(0, 2).map((service) => (
                            <span
                              key={service.id}
                              className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full"
                            >
                              {serviceLabels[service.type]}
                            </span>
                          ))}
                          {teacher.services.length > 2 && (
                            <span className="px-3 py-1 bg-gray-100 text-gray-700 text-xs font-bold rounded-full">
                              +{teacher.services.length - 2}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Rates */}
                      <div className="mb-6">
                        <p className="text-xs text-gray-600 mb-2">الأسعار:</p>
                        <p className="text-sm font-bold text-gray-800">
                          من {Math.min(...teacher.services.map((s) => s.hourlyRate))} إلى{' '}
                          {Math.max(...teacher.services.map((s) => s.hourlyRate))} ريال/ساعة
                        </p>
                      </div>

                      {/* Actions */}
                      <button
                        onClick={() => onNavigate(`/learner/teacher/${teacher.id}`)}
                        className="w-full px-4 py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition"
                      >
                        عرض الملف الشخصي
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Results Count */}
            <div className="mt-8 text-center text-gray-600">
              <p>تم العثور على {filteredTeachers.length} معلم</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
