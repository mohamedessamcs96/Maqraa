import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, CheckCircle, Clock, AlertCircle, FileText } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import { storage } from '../../lib/storage';

export function TeacherApplicationStatusPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const app = useMemo(() => {
    if (!user) return null;
    return storage.getTeacherApplications().find((a) => a.teacherId === user.id) ?? null;
  }, [user]);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4" dir="rtl">
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="font-bold text-gray-900">تحتاج لتسجيل الدخول أولاً</p>
          <button
            onClick={() => navigate('/login')}
            className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (!app) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
          <button onClick={() => navigate('/teacher/apply')} className="flex items-center gap-2 hover:opacity-90">
            <ArrowRight className="w-5 h-5" />
            التقديم كمعلم
          </button>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <FileText className="w-10 h-10 text-gray-500 mx-auto mb-3" />
            <p className="font-bold text-gray-900">لا يوجد طلب حالياً</p>
            <p className="text-sm text-gray-600 mt-2">قم بتقديم طلبك ورفع المستندات المطلوبة.</p>
            <button
              onClick={() => navigate('/teacher/apply')}
              className="mt-5 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition"
            >
              ابدأ التقديم
            </button>
          </div>
        </div>
      </div>
    );
  }

  const statusChip = (() => {
    switch (app.status) {
      case 'approved':
        return { label: '✅ تم القبول', cls: 'bg-emerald-100 text-emerald-700', icon: CheckCircle };
      case 'rejected':
        return { label: '❌ مرفوض', cls: 'bg-red-100 text-red-700', icon: AlertCircle };
      case 'document_required':
        return { label: '📎 مستندات ناقصة', cls: 'bg-amber-100 text-amber-800', icon: AlertCircle };
      case 'under_review':
        return { label: '🔍 تحت المراجعة', cls: 'bg-blue-100 text-blue-700', icon: Clock };
      case 'pending':
      default:
        return { label: '⏳ قيد الانتظار', cls: 'bg-gray-100 text-gray-700', icon: Clock };
    }
  })();

  const StatusIcon = statusChip.icon;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <div className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900">حالة طلب التقديم</h1>
              <p className="text-sm text-gray-600 mt-1 break-words">{app.teacherName} • {app.email}</p>
            </div>
            <div className={`px-3 py-2 rounded-xl text-sm font-bold ${statusChip.cls} flex items-center gap-2 flex-shrink-0`}>
              <StatusIcon className="w-4 h-4" />
              {statusChip.label}
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-600">تاريخ التقديم</p>
              <p className="font-bold text-gray-900">{new Date(app.appliedAt).toLocaleDateString('ar-SA')}</p>
            </div>
            <div className="p-4 rounded-2xl border border-gray-200">
              <p className="text-xs text-gray-600">آخر تحديث</p>
              <p className="font-bold text-gray-900">
                {app.reviewedAt ? new Date(app.reviewedAt).toLocaleDateString('ar-SA') : 'لم يتم بعد'}
              </p>
            </div>
          </div>

          {app.status === 'rejected' && app.rejectionReason && (
            <div className="mt-4 p-4 rounded-2xl bg-red-50 border border-red-200">
              <p className="text-sm font-bold text-red-800">سبب الرفض</p>
              <p className="text-sm text-red-700 mt-1 break-words">{app.rejectionReason}</p>
            </div>
          )}

          {app.status === 'document_required' && app.requiredDocuments?.length && (
            <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
              <p className="text-sm font-bold text-amber-800">مستندات مطلوبة</p>
              <ul className="mt-2 text-sm text-amber-800 list-disc pr-5 space-y-1">
                {app.requiredDocuments.map((d) => (
                  <li key={d} className="break-words">{d}</li>
                ))}
              </ul>
              <button
                onClick={() => navigate('/teacher/documents')}
                className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition"
              >
                تحديث المستندات
              </button>
            </div>
          )}

          {app.status === 'approved' && (
            <div className="mt-4 p-4 rounded-2xl bg-emerald-50 border border-emerald-200">
              <p className="text-sm font-bold text-emerald-800">تم قبول طلبك 🎉</p>
              <p className="text-sm text-emerald-700 mt-1">يمكنك الآن إعداد خدماتك وتسعيرك.</p>
              <button
                onClick={() => navigate('/teacher/services')}
                className="mt-4 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition"
              >
                إعداد الخدمات والتسعير
              </button>
            </div>
          )}

          <p className="mt-4 text-xs text-gray-500">
            هذه الصفحة محاكاة لحالة الطلب وفقاً لمواصفات المنصة.
          </p>
        </div>
      </div>
    </div>
  );
}
