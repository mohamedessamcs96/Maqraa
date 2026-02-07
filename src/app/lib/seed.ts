import { mockPayments, mockSessions, mockTeacherApplications, mockTeachers } from '../data/mockData';
import type { TeacherApplication } from '../types';
import { storage } from './storage';

/**
 * Seed localStorage once, if empty.
 * This makes the “simulated backend” feel persistent across refresh.
 */
export function ensureSeeded() {
  if (typeof window === 'undefined') return;

  // Sessions
  const existingSessions = storage.getSessions();
  if (existingSessions.length === 0) {
    storage.saveSessions(mockSessions);
  }

  // Payments
  const existingPayments = storage.getPayments();
  if (existingPayments.length === 0) {
    storage.savePayments(mockPayments);
  }

  // Teacher applications
  const existingApps = storage.getTeacherApplications();
  if (existingApps.length === 0) {
    storage.saveTeacherApplications(mockTeacherApplications as TeacherApplication[]);
  }

  // Teacher services (copy from mock teachers)
  const existingServices = storage.getTeacherServices();
  if (Object.keys(existingServices).length === 0) {
    const byTeacher: Record<string, any> = {};
    for (const t of mockTeachers) {
      byTeacher[t.id] = t.services;
    }
    storage.saveTeacherServices(byTeacher);
  }
}
