// User roles
export type UserRole = 'learner' | 'teacher' | 'admin';

// Auth types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  token: string | null;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  phone?: string;
  bio?: string;
  photoUrl?: string;
  createdAt: string;
}

// Teacher types
export interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  bio: string;
  photoUrl: string;
  rating: number;
  reviewCount: number;
  services: TeacherService[];
  applicationStatus: 'pending' | 'document_required' | 'approved' | 'rejected';
  certifications: string[];
  joiningDate: string;
}

export interface TeacherService {
  id: string;
  type: 'memorization' | 'tajweed' | 'khatmah' | 'iqra' | 'ijazah' | 'children' | 'women' | 'seniors';
  hourlyRate: number;
  status: 'pending_approval' | 'approved' | 'rejected';
}

export interface TeacherApplication {
  id: string;
  teacherId: string;
  teacherName: string;
  email: string;
  phone: string;
  bio: string;
  documents: {
    memorization_cert: string;
    ijazah: string;
    personal_id: string;
  };
  status: 'pending' | 'document_required' | 'under_review' | 'approved' | 'rejected';
  requiredDocuments?: string[];
  rejectionReason?: string;
  appliedAt: string;
  reviewedAt?: string;
}

// Learner types
export interface Learner {
  id: string;
  userId: string;
  goals: LearnerGoal[];
  ageGroup: 'child' | 'adult' | 'senior';
  preferredSchedule: 'morning' | 'afternoon' | 'evening';
  language: 'ar' | 'en';
  totalSessions: number;
  totalHours: number;
  joinedAt: string;
}

export type LearnerGoal = 'memorization' | 'tajweed' | 'ijazah' | 'khatmah' | 'iqra';

// Session types
export interface Session {
  id: string;
  learnerId: string;
  teacherId: string;
  serviceType: TeacherService['type'];
  date: string;
  time: string;
  duration: 1 | 1.5 | 2;
  hourlyRate: number;
  totalPrice: number;
  status: 'requested' | 'confirmed' | 'paid' | 'in_progress' | 'completed' | 'no_show' | 'cancelled';
  zoomMeetingId?: string;
  zoomLink?: string;
  createdAt: string;
  startedAt?: string;
  completedAt?: string;
  cancelledAt?: string;
}

export interface Review {
  id: string;
  sessionId: string;
  learnerId: string;
  teacherId: string;
  rating: 1 | 2 | 3 | 4 | 5;
  comment: string;
  createdAt: string;
}

// Payment types
export interface Payment {
  id: string;
  sessionId: string;
  learnerId: string;
  amount: number;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'bank_transfer';
  transactionId: string;
  createdAt: string;
  completedAt?: string;
}

export interface Payout {
  id: string;
  teacherId: string;
  amount: number;
  status: 'pending' | 'processed' | 'failed';
  month: string;
  createdAt: string;
  processedAt?: string;
  failureReason?: string;
}

// Chat types
export interface ChatMessage {
  id: string;
  sessionId: string;
  senderId: string;
  senderName: string;
  message: string;
  messageType: 'text' | 'system' | 'zoom_link';
  timestamp: string;
}

// Notification types
export interface Notification {
  id: string;
  userId: string;
  type: 'session_confirmed' | 'payment_received' | 'document_approved' | 'session_reminder';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  actionUrl?: string;
}

// Admin types
export interface AdminStats {
  totalTeachers: number;
  pendingApplications: number;
  totalSessions: number;
  totalRevenue: number;
  monthlyRevenue: number;
  completionRate: number;
}
