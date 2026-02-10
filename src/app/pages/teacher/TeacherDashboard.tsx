import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { storage } from "../../lib/storage";
import {
  mockSessions,
  mockPayouts,
  mockTeacherApplications,
} from "../../data/mockData";
import {
  Calendar,
  DollarSign,
  FileText,
  CheckCircle,
  Clock,
  User,
  AlertCircle,
} from "lucide-react";

export function TeacherDashboard() {
  const { user, logout } = useAuthContext();
  const navigate = useNavigate();

  const [profileSetup, setProfileSetup] = useState<any | null>(null);
  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      try {
        const setups = (await storage.getTeacherProfileSetups?.()) ?? [];
        if (!mounted) return;
        setProfileSetup(setups.find((s) => s.teacherId === user.id) ?? null);
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const teacherEmailMap: Record<string, string> = {
    "teacher@example.com": "teacher-1",
    "fatima@example.com": "teacher-2",
    "mohammed@example.com": "teacher-1",
  };

  const teacherId = user?.email ? teacherEmailMap[user.email] : null;

  const upcomingSessions = teacherId
    ? mockSessions
        .filter((s) => s.teacherId === teacherId && s.status !== "completed")
        .sort((a, b) => (a.date > b.date ? 1 : -1))
    : [];

  const payouts = teacherId
    ? mockPayouts.filter((p) => p.teacherId === teacherId)
    : [];
  const totalPaid = payouts
    .filter((p) => p.status === "processed")
    .reduce((sum, p) => sum + (p.amount || 0), 0);
  const totalPending = payouts
    .filter((p) => p.status === "pending")
    .reduce((sum, p) => sum + (p.amount || 0), 0);

  const application = teacherId
    ? mockTeacherApplications.find((a) => a.teacherId === teacherId)
    : undefined;

  const statusBadge = (status: string) => {
    switch (status) {
      case "confirmed":
        return "bg-emerald-100 text-emerald-800";
      case "requested":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-slate-100 text-slate-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-teal-50"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full overflow-hidden bg-white shadow flex items-center justify-center">
              {user?.photoUrl ? (
                <img
                  src={user.photoUrl}
                  alt="avatar"
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="text-emerald-600" />
              )}
            </div>
            <div>
              <div className="text-lg font-bold">
                مرحباً، {user?.name || "المعلم"}
              </div>
              <div className="text-sm text-gray-600">
                لوحة تحكم المعلم — إدارة الجلسات والمستندات والأرباح
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/teacher/profile")}
              className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg shadow-sm"
            >
              البروفايل
            </button>
            <button
              onClick={() => navigate("/teacher/services")}
              className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg shadow-sm"
            >
              خدماتي
            </button>
            <button
              onClick={() => navigate("/teacher/documents")}
              className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg shadow-sm"
            >
              مستنداتي
            </button>
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-rose-600 text-white rounded-lg shadow"
            >
              تسجيل خروج
            </button>
          </div>
        </div>

        {/* Profile Setup Alert */}
        {!profileSetup && (
          <div className="mb-6 bg-amber-50 border-l-4 border-amber-500 p-4 rounded-lg flex items-start justify-between">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-amber-900">
                  أكمل بيانات ملفك الشخصي
                </h3>
                <p className="text-sm text-amber-800 mt-1">
                  لكي تتمكن من رفع الوثائق والتقديم، عليك إكمال بيانات ملفك
                  الشخصي أولاً.
                </p>
              </div>
            </div>
            <button
              onClick={() => navigate("/teacher/profile-setup")}
              className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition font-medium whitespace-nowrap ms-4"
            >
              أكمل الآن
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">الجلسات القادمة</h2>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Calendar className="w-4 h-4" />
                عرض كامل
              </div>
            </div>

            {upcomingSessions.length === 0 ? (
              <div className="py-8 text-center text-gray-600">
                لا توجد جلسات قادمة في الوقت الحالي.
              </div>
            ) : (
              <ul className="space-y-4">
                {upcomingSessions.map((s) => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:shadow"
                  >
                    <div>
                      <div className="flex items-center gap-3">
                        <div
                          className={`px-3 py-1 rounded-full text-sm ${statusBadge(s.status)}`}
                        >
                          {s.status}
                        </div>
                        <div className="font-medium">{s.serviceType}</div>
                      </div>
                      <div className="text-sm text-gray-500 mt-1">
                        {s.date} — {s.time} • المدة: {s.duration} ساعة
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <div className="text-sm text-gray-500">السعر</div>
                        <div className="font-semibold text-emerald-700">
                          {s.totalPrice} SAR
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => navigate(`/sessions/${s.id}`)}
                          className="px-3 py-1 border rounded text-sm"
                        >
                          تفاصيل
                        </button>
                        <button
                          onClick={() => navigate(`/sessions/${s.id}`)}
                          className="px-3 py-1 bg-emerald-600 text-white rounded text-sm"
                        >
                          فتح الجلسة
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-6 border-t pt-4">
              <h3 className="font-semibold mb-3">ملاحظات سريعة</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-lg">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> إجمالي
                    المدفوع
                  </div>
                  <div className="text-xl font-bold text-emerald-800">
                    {totalPaid} SAR
                  </div>
                </div>
                <div className="p-4 bg-yellow-50 border border-yellow-100 rounded-lg">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-yellow-600" /> معلق للدفع
                  </div>
                  <div className="text-xl font-bold text-yellow-800">
                    {totalPending} SAR
                  </div>
                </div>
                <div className="p-4 bg-slate-50 border border-slate-100 rounded-lg">
                  <div className="text-sm text-gray-600 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-slate-600" /> جلسات
                    قادمة
                  </div>
                  <div className="text-xl font-bold text-slate-800">
                    {upcomingSessions.length}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="bg-white rounded-2xl shadow p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              حالة التقديم <FileText className="w-4 h-4 text-emerald-600" />
            </h3>

            {application ? (
              <div className="space-y-3">
                <div className="text-sm text-gray-600">الحالة الحالية</div>
                <div className="flex items-center justify-between">
                  <div className="font-medium text-emerald-700">
                    {application.status}
                  </div>
                  {application.status === "document_required" && (
                    <div className="text-sm text-rose-600">مطلوب مستندات</div>
                  )}
                </div>

                {application.requiredDocuments &&
                  application.requiredDocuments.length > 0 && (
                    <div className="text-sm text-gray-600">
                      المستندات المطلوبة:{" "}
                      {application.requiredDocuments.join(", ")}
                    </div>
                  )}

                <div className="pt-2">
                  <button
                    onClick={() => navigate("/teacher/documents")}
                    className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg"
                  >
                    إدارة المستندات
                  </button>
                </div>

                <div className="pt-4">
                  <h4 className="font-semibold mb-2">إجراءات سريعة</h4>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => navigate("/teacher/profile")}
                      className="px-3 py-2 border rounded"
                    >
                      البروفايل الشخصي
                    </button>
                    <button
                      onClick={() => navigate("/teacher/services")}
                      className="px-3 py-2 border rounded"
                    >
                      خدماتي وأسعاري
                    </button>
                    <button
                      onClick={() => navigate("/teacher/application-status")}
                      className="px-3 py-2 border rounded"
                    >
                      حالة الطلب
                    </button>
                    <button
                      onClick={() => navigate("/teacher/apply")}
                      className="px-3 py-2 border rounded"
                    >
                      تحديث الطلب
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                لا توجد حالة تقديم مرتبطة بهذا الحساب التجريبي.
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  );
}
