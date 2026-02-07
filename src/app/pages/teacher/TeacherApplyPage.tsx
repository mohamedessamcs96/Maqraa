import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight, Upload, CheckCircle, AlertCircle, FileText } from 'lucide-react';
import { useAuthContext } from '../../context/AuthContext';
import type { TeacherApplication } from '../../types';
import { storage } from '../../lib/storage';

type DocKey = keyof TeacherApplication['documents'];

const docLabels: Record<DocKey, string> = {
  memorization_cert: 'شهادة حفظ القرآن',
  ijazah: 'إجازة / تصريح تعليم (إن وجد)',
  personal_id: 'الهوية الشخصية',
};

function makeFakeUploadUrl(filename: string) {
  const safe = filename.trim() || 'document.pdf';
  return `local://uploads/${Date.now()}-${safe}`;
}

export function TeacherApplyPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [fullName, setFullName] = useState(user?.name ?? '');
  const [email, setEmail] = useState(user?.email ?? '');
  const [phone, setPhone] = useState(user?.phone ?? '');
  const [bio, setBio] = useState(user?.bio ?? '');

  const [docs, setDocs] = useState<TeacherApplication['documents']>({
    memorization_cert: '',
    ijazah: '',
    personal_id: '',
  });

  const [submitting, setSubmitting] = useState(false);

  const existingApp = useMemo(() => {
    if (!user) return null;
    return storage.getTeacherApplications().find((a) => a.teacherId === user.id) ?? null;
  }, [user]);

  const isTeacher = user?.role === 'teacher';

  const missingDocs = useMemo(() => {
    const missing: DocKey[] = [];
    (Object.keys(docs) as DocKey[]).forEach((k) => {
      if (!docs[k]) missing.push(k);
    });
    return missing;
  }, [docs]);

  const canSubmit = isTeacher && fullName.trim() && email.trim() && phone.trim() && bio.trim() && missingDocs.length === 0;

  const handleUpload = (key: DocKey, file?: File | null) => {
    const filename = file?.name ?? `${key}.pdf`;
    setDocs((prev) => ({ ...prev, [key]: makeFakeUploadUrl(filename) }));
  };

  const handleSubmit = async () => {
    if (!user || !canSubmit) return;

    setSubmitting(true);
    try {
      const apps = storage.getTeacherApplications();
      const now = new Date().toISOString();

      const newApp: TeacherApplication = {
        id: `app-${Date.now()}`,
        teacherId: user.id,
        teacherName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        documents: docs,
        status: 'pending',
        appliedAt: now,
      };

      const withoutMine = apps.filter((a) => a.teacherId !== user.id);
      storage.saveTeacherApplications([newApp, ...withoutMine]);

      navigate('/teacher/application-status');
    } finally {
      setSubmitting(false);
    }
  };

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

  if (!isTeacher) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
            <ArrowRight className="w-5 h-5" />
            رجوع
          </button>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
            <AlertCircle className="w-10 h-10 text-amber-500 mx-auto mb-3" />
            <p className="font-bold text-gray-900">هذه الصفحة مخصصة لحسابات المعلمين</p>
            <p className="text-sm text-gray-600 mt-2">قم بإنشاء حساب بدور "Teacher" لاستخدام نموذج التقديم.</p>
          </div>
        </div>
      </div>
    );
  }

  if (existingApp) {
    return (
      <div className="min-h-screen bg-gray-50" dir="rtl">
        <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
          <button onClick={() => navigate('/teacher/application-status')} className="flex items-center gap-2 hover:opacity-90">
            <ArrowRight className="w-5 h-5" />
            حالة الطلب
          </button>
        </div>
        <div className="max-w-md mx-auto p-4">
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-3">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div>
                <p className="font-bold text-gray-900">لديك طلب مُسجّل مسبقاً</p>
                <p className="text-sm text-gray-600">يمكنك متابعة حالته أو تعديل المستندات إذا طُلِبت.</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/teacher/application-status')}
              className="mt-5 w-full bg-green-700 text-white font-bold py-3 rounded-xl hover:bg-green-800 transition"
            >
              متابعة حالة الطلب
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <div className="bg-green-700 text-white p-4 sticky top-0 z-10">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 hover:opacity-90">
          <ArrowRight className="w-5 h-5" />
          رجوع
        </button>
      </div>

      <div className="max-w-2xl mx-auto p-4 sm:p-6">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-2xl shadow-lg p-5 sm:p-8">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">التقديم كمعلم</h1>
          <p className="text-sm text-gray-600 mb-6">املأ بياناتك وارفع المستندات المطلوبة (محاكاة رفع الملفات).</p>

          {/* Basic info */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">رقم الجوال</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                inputMode="tel"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                inputMode="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700"
              />
            </div>
            <div className="sm:col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-2">نبذة مختصرة</label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-green-700 resize-none"
              />
            </div>
          </div>

          {/* Documents */}
          <div className="mt-6">
            <h2 className="font-bold text-gray-900 mb-3">المستندات المطلوبة</h2>
            <div className="space-y-3">
              {(Object.keys(docs) as DocKey[]).map((key) => {
                const uploaded = !!docs[key];
                return (
                  <div key={key} className="border border-gray-200 rounded-2xl p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center flex-shrink-0">
                          <FileText className="w-5 h-5 text-gray-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-gray-900 text-sm sm:text-base">{docLabels[key]}</p>
                          <p className="text-xs text-gray-600 break-words">{uploaded ? docs[key] : 'لم يتم الرفع بعد'}</p>
                        </div>
                      </div>
                      <label className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-green-700 text-white text-sm font-bold hover:bg-green-800 transition cursor-pointer flex-shrink-0">
                        <Upload className="w-4 h-4" />
                        رفع
                        <input
                          type="file"
                          className="hidden"
                          onChange={(e) => handleUpload(key, e.target.files?.[0])}
                          accept="application/pdf,image/*"
                        />
                      </label>
                    </div>
                  </div>
                );
              })}
            </div>

            {missingDocs.length > 0 && (
              <div className="mt-4 p-4 rounded-2xl bg-amber-50 border border-amber-200">
                <p className="text-sm font-bold text-amber-800">يرجى رفع جميع المستندات قبل الإرسال.</p>
              </div>
            )}
          </div>

          <button
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            className="mt-6 w-full bg-green-700 text-white font-bold py-3.5 rounded-2xl hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'جاري الإرسال...' : 'إرسال الطلب'}
          </button>

          <p className="mt-3 text-xs text-gray-500">
            ملاحظة: هذه تجربة محاكاة. يتم حفظ البيانات محلياً في المتصفح (localStorage).
          </p>
        </motion.div>
      </div>
    </div>
  );
}
