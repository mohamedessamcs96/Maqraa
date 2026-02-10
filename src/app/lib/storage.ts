import type {
  Payment,
  Session,
  TeacherApplication,
  TeacherService,
  TeacherProfileSetup,
} from "../types";

/**
 * Very small localStorage wrapper for our "simulated backend".
 * - Uses JSON serialization
 * - Returns defaults when nothing is stored
 * - Keeps types close to backend spec entities
 */

const keys = {
  teacherApplications: "maqraa_teacher_applications",
  teacherServices: "maqraa_teacher_services",
  sessions: "maqraa_sessions",
  payments: "maqraa_payments",
  teacherProfileSetups: "maqraa_teacher_profile_setups",
} as const;

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T) {
  localStorage.setItem(key, JSON.stringify(value));
}

export const storage = {
  // Teacher applications
  getTeacherApplications(): TeacherApplication[] {
    return readJson<TeacherApplication[]>(keys.teacherApplications, []);
  },
  saveTeacherApplications(apps: TeacherApplication[]) {
    writeJson(keys.teacherApplications, apps);
  },

  // Teacher services pricing proposals
  getTeacherServices(): Record<string, TeacherService[]> {
    return readJson<Record<string, TeacherService[]>>(keys.teacherServices, {});
  },
  saveTeacherServices(servicesByTeacherId: Record<string, TeacherService[]>) {
    writeJson(keys.teacherServices, servicesByTeacherId);
  },

  // Sessions + payments
  getSessions(): Session[] {
    return readJson<Session[]>(keys.sessions, []);
  },
  saveSessions(sessions: Session[]) {
    writeJson(keys.sessions, sessions);
  },

  getPayments(): Payment[] {
    return readJson<Payment[]>(keys.payments, []);
  },
  savePayments(payments: Payment[]) {
    writeJson(keys.payments, payments);
  },

  // Teacher profile setups
  getTeacherProfileSetups(): TeacherProfileSetup[] {
    return readJson<TeacherProfileSetup[]>(keys.teacherProfileSetups, []);
  },
  saveTeacherProfileSetups(setups: TeacherProfileSetup[]) {
    writeJson(keys.teacherProfileSetups, setups);
  },
};
