import { Teacher, Learner, Session, Review, Payment, Payout, ChatMessage, Notification, TeacherApplication } from '../types';

export const mockTeachers: Teacher[] = [
  {
    id: 'teacher-1',
    name: 'أ.د محمد العريان',
    email: 'mohammed@example.com',
    phone: '+966501234567',
    bio: 'حافظ للقرآن الكريم معروف بدقة التجويد والصبر في التعليم',
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 245,
    services: [
      { id: 's1', type: 'memorization', hourlyRate: 100, status: 'approved' },
      { id: 's2', type: 'tajweed', hourlyRate: 120, status: 'approved' },
      { id: 's3', type: 'ijazah', hourlyRate: 150, status: 'approved' },
    ],
    applicationStatus: 'approved',
    certifications: ['إجازة متصلة', 'شهادة تجويد', 'ماجستير علوم قرآن'],
    joiningDate: '2023-01-15',
  },
  {
    id: 'teacher-2',
    name: 'فاطمة الزهراء',
    email: 'fatima@example.com',
    phone: '+966502234567',
    bio: 'متخصصة في تعليم الأطفال والنساء بأسلوب تفاعلي وممتع',
    photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    rating: 4.8,
    reviewCount: 189,
    services: [
      { id: 's4', type: 'children', hourlyRate: 90, status: 'approved' },
      { id: 's5', type: 'women', hourlyRate: 95, status: 'approved' },
      { id: 's6', type: 'tajweed', hourlyRate: 110, status: 'approved' },
    ],
    applicationStatus: 'approved',
    certifications: ['إجازة شاطبية', 'شهادة تربية إسلامية'],
    joiningDate: '2023-03-20',
  },
  {
    id: 'teacher-3',
    name: 'عبدالله الشمري',
    email: 'abdullah@example.com',
    phone: '+966503234567',
    bio: 'متخصص في الحفظ السريع والمكثف مع خبرة أكثر من 20 سنة',
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    rating: 4.7,
    reviewCount: 156,
    services: [
      { id: 's7', type: 'memorization', hourlyRate: 110, status: 'approved' },
      { id: 's8', type: 'khatmah', hourlyRate: 130, status: 'approved' },
    ],
    applicationStatus: 'approved',
    certifications: ['إجازة متصلة', 'شهادة إتقان التجويد'],
    joiningDate: '2023-02-10',
  },
  {
    id: 'teacher-4',
    name: 'نور محمود',
    email: 'noor@example.com',
    phone: '+966504234567',
    bio: 'معلمة متخصصة في تصحيح التلاوة والتجويد',
    photoUrl: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    rating: 4.9,
    reviewCount: 203,
    services: [
      { id: 's9', type: 'tajweed', hourlyRate: 115, status: 'approved' },
      { id: 's10', type: 'iqra', hourlyRate: 85, status: 'approved' },
    ],
    applicationStatus: 'approved',
    certifications: ['إجازة قالون', 'شهادة متقدمة في التجويد'],
    joiningDate: '2023-04-05',
  },
];

export const mockLearners: Learner[] = [
  {
    id: 'learner-1',
    userId: 'user-1',
    goals: ['memorization', 'tajweed'],
    ageGroup: 'adult',
    preferredSchedule: 'evening',
    language: 'ar',
    totalSessions: 42,
    totalHours: 68,
    joinedAt: '2023-06-01',
  },
];

export const mockSessions: Session[] = [
  {
    id: 'session-1',
    learnerId: 'learner-1',
    teacherId: 'teacher-1',
    serviceType: 'memorization',
    date: '2026-02-10',
    time: '19:00',
    duration: 1.5,
    hourlyRate: 100,
    totalPrice: 150,
    status: 'completed',
    zoomMeetingId: 'mockmeeting123',
    zoomLink: 'https://zoom.us/j/mockmeeting123',
    createdAt: '2026-02-08',
    startedAt: '2026-02-10T19:00:00',
    completedAt: '2026-02-10T20:30:00',
  },
  {
    id: 'session-2',
    learnerId: 'learner-1',
    teacherId: 'teacher-2',
    serviceType: 'tajweed',
    date: '2026-02-15',
    time: '18:00',
    duration: 1,
    hourlyRate: 95,
    totalPrice: 95,
    status: 'confirmed',
    zoomMeetingId: 'mockmeeting124',
    zoomLink: 'https://zoom.us/j/mockmeeting124',
    createdAt: '2026-02-09',
  },
  {
    id: 'session-3',
    learnerId: 'learner-1',
    teacherId: 'teacher-3',
    serviceType: 'memorization',
    date: '2026-02-20',
    time: '17:00',
    duration: 2,
    hourlyRate: 110,
    totalPrice: 220,
    status: 'requested',
    createdAt: '2026-02-07',
  },
];

export const mockReviews: Review[] = [
  {
    id: 'review-1',
    sessionId: 'session-1',
    learnerId: 'learner-1',
    teacherId: 'teacher-1',
    rating: 5,
    comment: 'معلم ممتاز جداً، شرح واضح وصبور جداً',
    createdAt: '2026-02-10',
  },
  {
    id: 'review-2',
    sessionId: 'session-1',
    learnerId: 'learner-1',
    teacherId: 'teacher-1',
    rating: 5,
    comment: 'أفضل معلم حتى الآن',
    createdAt: '2026-02-10',
  },
];

export const mockPayments: Payment[] = [
  {
    id: 'payment-1',
    sessionId: 'session-1',
    learnerId: 'learner-1',
    amount: 150,
    status: 'completed',
    paymentMethod: 'card',
    transactionId: 'txn_123456',
    createdAt: '2026-02-08',
    completedAt: '2026-02-08',
  },
];

export const mockPayouts: Payout[] = [
  {
    id: 'payout-1',
    teacherId: 'teacher-1',
    amount: 1250,
    status: 'processed',
    month: '2026-01',
    createdAt: '2026-02-01',
    processedAt: '2026-02-02',
  },
  {
    id: 'payout-2',
    teacherId: 'teacher-1',
    amount: 890,
    status: 'pending',
    month: '2026-02',
    createdAt: '2026-02-05',
  },
];

export const mockChatMessages: ChatMessage[] = [
  {
    id: 'msg-1',
    sessionId: 'session-1',
    senderId: 'teacher-1',
    senderName: 'أ.د محمد العريان',
    message: 'السلام عليكم، تفضل بالانضمام للجلسة',
    messageType: 'text',
    timestamp: '2026-02-10T19:00:00',
  },
  {
    id: 'msg-2',
    sessionId: 'session-1',
    senderId: 'system',
    senderName: 'النظام',
    message: 'https://zoom.us/j/mockmeeting123',
    messageType: 'zoom_link',
    timestamp: '2026-02-10T19:00:30',
  },
  {
    id: 'msg-3',
    sessionId: 'session-1',
    senderId: 'learner-1',
    senderName: 'محمد علي',
    message: 'وعليكم السلام ورحمة الله',
    messageType: 'text',
    timestamp: '2026-02-10T19:01:00',
  },
];

export const mockNotifications: Notification[] = [
  {
    id: 'notif-1',
    userId: 'user-1',
    type: 'session_confirmed',
    title: 'تم تأكيد الجلسة',
    message: 'تم تأكيد جلستك مع أ.د محمد العريان يوم 2026-02-15',
    read: false,
    createdAt: '2026-02-09',
    actionUrl: '/learner/sessions/session-2',
  },
];

export const mockTeacherApplications: TeacherApplication[] = [
  {
    id: 'app-1',
    teacherId: 'teacher-1',
    teacherName: 'أ.د محمد العريان',
    email: 'mohammed@example.com',
    phone: '+966501234567',
    bio: 'حافظ للقرآن الكريم معروف بدقة التجويد',
    documents: {
      memorization_cert: 'https://example.com/docs/cert1.pdf',
      ijazah: 'https://example.com/docs/ijazah1.pdf',
      personal_id: 'https://example.com/docs/id1.pdf',
    },
    status: 'approved',
    appliedAt: '2023-01-10',
    reviewedAt: '2023-01-15',
  },
  {
    id: 'app-2',
    teacherId: 'new-teacher-1',
    teacherName: 'سارة أحمد',
    email: 'sarah@example.com',
    phone: '+966505234567',
    bio: 'معلمة قرآن متخصصة',
    documents: {
      memorization_cert: 'https://example.com/docs/cert2.pdf',
      ijazah: '',
      personal_id: 'https://example.com/docs/id2.pdf',
    },
    status: 'document_required',
    requiredDocuments: ['ijazah'],
    appliedAt: '2026-02-01',
  },
  {
    id: 'app-3',
    teacherId: 'new-teacher-2',
    teacherName: 'خالد الملحم',
    email: 'khaled@example.com',
    phone: '+966506234567',
    bio: 'حافظ وباحث في علوم القرآن',
    documents: {
      memorization_cert: 'https://example.com/docs/cert3.pdf',
      ijazah: 'https://example.com/docs/ijazah3.pdf',
      personal_id: 'https://example.com/docs/id3.pdf',
    },
    status: 'pending',
    appliedAt: '2026-02-05',
  },
];

export const teacherServices = [
  { id: 'memorization', label: 'حفظ الكتاب', icon: 'BookOpen' },
  { id: 'tajweed', label: 'تصحيح التلاوة', icon: 'Mic' },
  { id: 'khatmah', label: 'برنامج الختمة', icon: 'Award' },
  { id: 'iqra', label: 'تعليم الإقراء', icon: 'BookMarked' },
  { id: 'ijazah', label: 'برنامج الإجازة', icon: 'Certificate' },
  { id: 'children', label: 'متخصص للأطفال', icon: 'Users' },
  { id: 'women', label: 'متخصص للنساء', icon: 'Users' },
  { id: 'seniors', label: 'متخصص لكبار السن', icon: 'Users' },
];

export const learnerGoals = [
  { id: 'memorization', label: 'حفظ القرآن الكريم' },
  { id: 'tajweed', label: 'تصحيح التلاوة' },
  { id: 'ijazah', label: 'الحصول على إجازة' },
  { id: 'khatmah', label: 'إكمال ختمة' },
  { id: 'iqra', label: 'تعلم الإقراء' },
];
