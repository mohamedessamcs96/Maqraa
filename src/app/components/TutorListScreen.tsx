import { ArrowRight, Star, Users, Award, Clock, Filter, Search } from 'lucide-react';
import { motion } from 'motion/react';
import { Tutor } from '@/app/App';
import { useState } from 'react';

interface TutorListScreenProps {
  onSelectTutor: (tutor: Tutor) => void;
  onBack: () => void;
}

const tutors: Tutor[] = [
  {
    id: '1',
    name: 'الشيخ محمد الأحمد',
    title: 'حاصل على إجازة في القراءات العشر',
    image: 'https://images.unsplash.com/photo-1715347783170-87337f31ef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB0ZWFjaGVyJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njg2MzM0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    students: 450,
    experience: 12,
    specialization: ['تجويد', 'حفظ', 'قراءات'],
    price: 150,
    available: true,
    bio: 'حافظ للقرآن الكريم ومُجاز في القراءات العشر من الأزهر الشريف. متخصص في تصحيح التلاوة والإقراء.'
  },
  {
    id: '2',
    name: 'الدكتور أحمد حسن',
    title: 'دكتوراه في علوم القرآن والتفسير',
    image: 'https://images.unsplash.com/photo-1715625911582-afd2db935496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob2xhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODYzMzQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 5.0,
    students: 680,
    experience: 15,
    specialization: ['تفسير', 'تجويد', 'ختمات'],
    price: 200,
    available: true,
    bio: 'أستاذ جامعي متخصص في علوم القرآن والتفسير. يشرف على برامج الختمات القرآنية والإجازات.'
  },
  {
    id: '3',
    name: 'الشيخ عبدالله المصري',
    title: 'معلم قرآن معتمد ومجاز',
    image: 'https://images.unsplash.com/photo-1632301252896-efe259986a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2ODYzMzQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.8,
    students: 320,
    experience: 8,
    specialization: ['حفظ', 'تجويد', 'مبتدئين'],
    price: 120,
    available: true,
    bio: 'متخصص في تعليم المبتدئين والأطفال بأسلوب تعليمي ميسّر. خبرة واسعة في برامج الحفظ.'
  },
  {
    id: '4',
    name: 'الأستاذة فاطمة السعيد',
    title: 'معلمة قرآن للنساء والأطفال',
    image: 'https://images.unsplash.com/photo-1715347783170-87337f31ef19?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtdXNsaW0lMjB0ZWFjaGVyJTIwcmVhZGluZ3xlbnwxfHx8fDE3Njg2MzM0NDZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    students: 380,
    experience: 10,
    specialization: ['حفظ', 'نساء', 'أطفال'],
    price: 130,
    available: true,
    bio: 'حافظة للقرآن الكريم ومتخصصة في تعليم النساء والأطفال. تشرف على برامج خاصة للأسر.'
  },
  {
    id: '5',
    name: 'الشيخ يوسف الشامي',
    title: 'متخصص في أحكام التجويد والإقراء',
    image: 'https://images.unsplash.com/photo-1715625911582-afd2db935496?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpc2xhbWljJTIwc2Nob2xhciUyMHBvcnRyYWl0fGVufDF8fHx8MTc2ODYzMzQ0Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.9,
    students: 520,
    experience: 14,
    specialization: ['تجويد', 'إقراء', 'إجازات'],
    price: 180,
    available: true,
    bio: 'مُجاز في الإقراء ومتخصص في تدريس أحكام التجويد. يشرف على برامج الإجازات القرآنية.'
  },
  {
    id: '6',
    name: 'الشيخ إبراهيم الخطيب',
    title: 'حافظ ومعلم لكبار السن',
    image: 'https://images.unsplash.com/photo-1632301252896-efe259986a60?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxxdXJhbiUyMGxlYXJuaW5nfGVufDF8fHx8MTc2ODYzMzQ0N3ww&ixlib=rb-4.1.0&q=80&w=1080',
    rating: 4.7,
    students: 280,
    experience: 20,
    specialization: ['حفظ', 'كبار السن', 'ختمات'],
    price: 140,
    available: false,
    bio: 'خبرة طويلة في تعليم كبار السن بطرق مناسبة وميسرة. متخصص في الختمات المراجعة.'
  },
];

export function TutorListScreen({ onSelectTutor, onBack }: TutorListScreenProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<string>('الكل');

  const filters = ['الكل', 'تجويد', 'حفظ', 'قراءات', 'مبتدئين', 'نساء', 'أطفال', 'كبار السن', 'إجازات', 'ختمات'];

  const filteredTutors = tutors.filter((tutor) => {
    const matchesSearch = tutor.name.includes(searchTerm) || tutor.title.includes(searchTerm);
    const matchesFilter =
      selectedFilter === 'الكل' || tutor.specialization.includes(selectedFilter);
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      {/* Header */}
      <div className="px-6 py-4 shadow-lg" style={{ backgroundColor: '#059669', color: '#ffffff' }}>
        <div className="flex items-center gap-4 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
            <ArrowRight className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-xl font-bold" style={{ color: '#ffffff' }}>معلمو مقرأة</h1>
            <p className="text-sm" style={{ color: '#d1fae5' }}>{filteredTutors.length} معلم مجاز متاح</p>
          </div>
        </div>

        {/* Search bar */}
        <div className="relative">
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: '#9ca3af' }} />
          <input
            type="text"
            placeholder="ابحث عن معلم..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pr-12 pl-4 py-3 rounded-xl border focus:outline-none focus:ring-2"
            style={{ 
              backgroundColor: 'rgba(255,255,255,0.2)', 
              color: '#ffffff',
              borderColor: 'rgba(255,255,255,0.3)'
            }}
          />
        </div>
      </div>

      {/* Filters */}
      <div className="px-6 py-4 border-b" style={{ backgroundColor: '#f9fafb', borderColor: '#e5e7eb' }}>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <Filter className="w-5 h-5 flex-shrink-0" style={{ color: '#4b5563' }} />
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setSelectedFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                selectedFilter === filter
                  ? 'border border-transparent'
                  : 'border border-gray-300 hover:border-emerald-600'
              }`}
              style={selectedFilter === filter 
                ? { backgroundColor: '#059669', color: '#ffffff' }
                : { backgroundColor: '#ffffff', color: '#374151' }
              }
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Tutors list */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        <div className="space-y-4 pb-4">
          {filteredTutors.map((tutor, index) => (
            <motion.div
              key={tutor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <TutorCard tutor={tutor} onSelect={() => onSelectTutor(tutor)} />
            </motion.div>
          ))}

          {filteredTutors.length === 0 && (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Search className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-lg font-bold text-gray-800 mb-2">لا توجد نتائج</h3>
              <p className="text-gray-600">جرب البحث بكلمات مختلفة أو تغيير الفلتر</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface TutorCardProps {
  tutor: Tutor;
  onSelect: () => void;
}

function TutorCard({ tutor, onSelect }: TutorCardProps) {
  return (
    <motion.div
      whileTap={{ scale: 0.98 }}
      onClick={onSelect}
      className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex gap-4">
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <img
            src={tutor.image}
            alt={tutor.name}
            className="w-20 h-20 rounded-xl object-cover"
          />
          {tutor.available && (
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 border-2 border-white rounded-full flex items-center justify-center">
              <Clock className="w-3 h-3 text-white" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-gray-800 mb-1">{tutor.name}</h3>
          <p className="text-gray-600 text-sm mb-2 line-clamp-1">{tutor.title}</p>

          {/* Stats */}
          <div className="flex flex-wrap items-center gap-3 text-xs text-gray-600 mb-2">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="font-medium">{tutor.rating}</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="w-3.5 h-3.5" />
              <span>{tutor.students} طالب</span>
            </div>
            <div className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5" />
              <span>{tutor.experience} سنة خبرة</span>
            </div>
          </div>

          {/* Specializations */}
          <div className="flex flex-wrap gap-1.5 mb-2">
            {tutor.specialization.slice(0, 3).map((spec) => (
              <span
                key={spec}
                className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>

          {/* Price and status */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-1">
              <span className="text-lg font-bold text-emerald-600">{tutor.price}</span>
              <span className="text-xs text-gray-500">ريال/ساعة</span>
            </div>
            {tutor.available ? (
              <span className="text-xs text-emerald-600 font-medium">متاح الآن</span>
            ) : (
              <span className="text-xs text-gray-400 font-medium">غير متاح</span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}