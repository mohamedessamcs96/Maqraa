import { useState, useCallback, useMemo, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowRight,
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
  X,
  Award,
  IdCard,
  Book,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import type { TeacherApplication } from "../../types";
import { storage } from "../../lib/storage";
import { api } from "../../lib/api";

type DocKey = keyof TeacherApplication["documents"];

interface DocumentConfig {
  key: DocKey;
  label: string;
  description: string;
  icon: typeof Award;
  required: boolean;
}

const documentConfigs: DocumentConfig[] = [
  {
    key: "memorization_cert",
    label: "شهادة حفظ القرآن الكريم",
    description: "شهادة معتمدة توضح مستوى الحفظ (جزئي أو كامل)",
    icon: Book,
    required: true,
  },
  {
    key: "ijazah",
    label: "الإجازة في القراءات",
    description: "إجازة معتمدة من شيخ مُجاز (إن وجدت)",
    icon: Award,
    required: false,
  },
  {
    key: "personal_id",
    label: "إثبات الهوية",
    description: "صورة من بطاقة الهوية أو جواز السفر",
    icon: IdCard,
    required: true,
  },
];

interface UploadedFile {
  url: string;
  filename: string;
  size: number;
  uploadedAt: string;
}

function makeFakeUploadUrl(file: File): UploadedFile {
  return {
    url: `local://uploads/${Date.now()}-${file.name}`,
    filename: file.name,
    size: file.size,
    uploadedAt: new Date().toISOString(),
  };
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function TeacherDocumentsPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [docs, setDocs] = useState<Record<DocKey, UploadedFile | null>>({
    memorization_cert: null,
    ijazah: null,
    personal_id: null,
  });

  const [dragOver, setDragOver] = useState<DocKey | null>(null);
  const [uploading, setUploading] = useState<DocKey | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const [existingApp, setExistingApp] = useState<TeacherApplication | null>(
    null,
  );
  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      try {
        const apps = (await storage.getTeacherApplications?.()) ?? [];
        if (!mounted) return;
        setExistingApp(apps.find((a) => a.teacherId === user.id) ?? null);
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const isTeacher = user?.role === "teacher";

  const missingRequired = useMemo(() => {
    return documentConfigs.filter((cfg) => cfg.required && !docs[cfg.key]);
  }, [docs]);

  const canSubmit = isTeacher && missingRequired.length === 0;

  const handleDragOver = useCallback((e: React.DragEvent, key: DocKey) => {
    e.preventDefault();
    setDragOver(key);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(null);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent, key: DocKey) => {
    e.preventDefault();
    setDragOver(null);
    const file = e.dataTransfer.files[0];
    if (file) handleFileUpload(key, file);
  }, []);

  const handleFileUpload = async (key: DocKey, file: File) => {
    // Validate file type
    const validTypes = [
      "application/pdf",
      "image/jpeg",
      "image/png",
      "image/jpg",
    ];
    if (!validTypes.includes(file.type)) {
      alert("نوع الملف غير مدعوم. يُرجى رفع PDF أو صورة (JPG/PNG)");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      alert("حجم الملف كبير جداً. الحد الأقصى 10 ميجابايت");
      return;
    }

    setUploading(key);
    try {
      if (api.isEnabled()) {
        const res = await api.uploadFile(file).catch(() => null);
        // ApiResponse expected -> res.data may contain the uploaded file info
        const data = (res && (res as any).data) || null;
        if (data) {
          const url =
            data.url || data.path || data.fileUrl || data.file || null;
          if (url) {
            setDocs((prev) => ({
              ...prev,
              [key]: {
                url,
                filename: file.name,
                size: file.size,
                uploadedAt: new Date().toISOString(),
              },
            }));
            return;
          }
        }
      }
      // fallback
      await new Promise((resolve) => setTimeout(resolve, 800));
      setDocs((prev) => ({ ...prev, [key]: makeFakeUploadUrl(file) }));
    } finally {
      setUploading(null);
    }
  };

  const handleRemove = (key: DocKey) => {
    setDocs((prev) => ({ ...prev, [key]: null }));
  };

  const handleSubmit = async () => {
    if (!user || !canSubmit) return;

    setSubmitting(true);
    try {
      const apps = (await storage.getTeacherApplications?.()) ?? [];
      const now = new Date().toISOString();

      // Convert uploaded files to simple URLs for storage
      const documentUrls: TeacherApplication["documents"] = {
        memorization_cert: docs.memorization_cert?.url ?? "",
        ijazah: docs.ijazah?.url ?? "",
        personal_id: docs.personal_id?.url ?? "",
      };

      const newApp: TeacherApplication = {
        id: `app-${Date.now()}`,
        teacherId: user.id,
        teacherName: user.name,
        email: user.email,
        phone: user.phone ?? "",
        bio: user.bio ?? "",
        documents: documentUrls,
        status: "pending",
        appliedAt: now,
      };

      const withoutMine = apps.filter((a) => a.teacherId !== user.id);
      storage.saveTeacherApplications([newApp, ...withoutMine]);

      // Navigate to status page
      navigate("/teacher/application-status");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-white flex items-center justify-center p-4"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-xl p-8 max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-xl font-extrabold text-gray-900 mb-2">
            تحتاج لتسجيل الدخول
          </h2>
          <p className="text-sm text-gray-600 mb-6">
            يُرجى تسجيل الدخول للوصول إلى هذه الصفحة
          </p>
          <button
            onClick={() => navigate("/login")}
            className="w-full bg-[var(--brand-primary)] text-white font-extrabold py-3.5 rounded-2xl hover:bg-[var(--brand-primary-dark)] transition"
          >
            تسجيل الدخول
          </button>
        </motion.div>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-white"
        dir="rtl"
      >
        <div className="bg-[var(--brand-primary)] text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 hover:opacity-90 transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold">رجوع</span>
          </button>
        </div>
        <div className="max-w-md mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 rounded-full bg-amber-50 flex items-center justify-center mx-auto mb-4">
              <AlertCircle className="w-8 h-8 text-amber-500" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2">
              صفحة مخصصة للمعلمين
            </h2>
            <p className="text-sm text-gray-600">
              هذه الصفحة متاحة فقط لحسابات المعلمين. يُرجى إنشاء حساب بدور
              "Teacher" للاستمرار.
            </p>
          </motion.div>
        </div>
      </div>
    );
  }

  if (existingApp && existingApp.status !== "document_required") {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-white"
        dir="rtl"
      >
        <div className="bg-[var(--brand-primary)] text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
          <button
            onClick={() => navigate("/teacher/application-status")}
            className="inline-flex items-center gap-2 hover:opacity-90 transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold">متابعة الطلب</span>
          </button>
        </div>
        <div className="max-w-md mx-auto p-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl shadow-lg p-8"
          >
            <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-extrabold text-gray-900 mb-2 text-center">
              طلبك مُسجّل بنجاح
            </h2>
            <p className="text-sm text-gray-600 text-center mb-6">
              لديك طلب مُسجّل بالفعل. يمكنك متابعة حالة الطلب أو تعديل المستندات
              إذا طُلبت.
            </p>
            <button
              onClick={() => navigate("/teacher/application-status")}
              className="w-full bg-[var(--brand-primary)] text-white font-extrabold py-3.5 rounded-2xl hover:bg-[var(--brand-primary-dark)] transition"
            >
              متابعة حالة الطلب
            </button>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-white"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-[var(--brand-primary)] text-white px-4 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 hover:opacity-90 transition"
          >
            <ArrowRight className="w-5 h-5" />
            <span className="font-bold">رجوع</span>
          </button>
          <div className="text-center">
            <div className="text-sm font-extrabold">رفع المستندات</div>
            <div className="text-xs text-white/85">الشهادات والإجازات</div>
          </div>
          <div className="w-16" />
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-4 py-6 sm:px-6 sm:py-8">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-3xl shadow-lg p-6 sm:p-8"
        >
          {/* Intro */}
          <div className="text-center mb-6">
            <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <Upload className="w-7 h-7 text-emerald-700" />
            </div>
            <h1 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-2">
              رفع مستنداتك التعليمية
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 leading-relaxed">
              يُرجى رفع الشهادات والإجازات التي تثبت مؤهلاتك التعليمية. جميع
              الملفات آمنة ومحمية.
            </p>
          </div>

          {/* Document Upload Cards */}
          <div className="space-y-5">
            {documentConfigs.map((config) => {
              const IconComponent = config.icon;
              const uploaded = docs[config.key];
              const isUploading = uploading === config.key;
              const isDragging = dragOver === config.key;

              return (
                <motion.div
                  key={config.key}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`
                    relative border-2 rounded-2xl p-5 transition-all
                    ${isDragging ? "border-emerald-500 bg-emerald-50/50 shadow-md" : "border-gray-200 bg-white"}
                    ${uploaded ? "border-emerald-200 bg-emerald-50/30" : ""}
                  `}
                  onDragOver={(e) => handleDragOver(e, config.key)}
                  onDragLeave={handleDragLeave}
                  onDrop={(e) => handleDrop(e, config.key)}
                >
                  {/* Header */}
                  <div className="flex items-start gap-4 mb-3">
                    <div
                      className={`
                      w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                      ${uploaded ? "bg-emerald-100" : "bg-gray-100"}
                    `}
                    >
                      <IconComponent
                        className={`w-6 h-6 ${uploaded ? "text-emerald-700" : "text-gray-600"}`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <h3 className="font-extrabold text-gray-900 text-sm sm:text-base">
                            {config.label}
                            {config.required && (
                              <span className="text-red-500 mr-1">*</span>
                            )}
                          </h3>
                          <p className="text-xs text-gray-600 mt-0.5">
                            {config.description}
                          </p>
                        </div>
                        {uploaded && (
                          <button
                            onClick={() => handleRemove(config.key)}
                            className="flex-shrink-0 w-8 h-8 rounded-lg bg-red-50 hover:bg-red-100 flex items-center justify-center transition"
                            aria-label="حذف"
                          >
                            <X className="w-4 h-4 text-red-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Upload Area or File Info */}
                  <AnimatePresence mode="wait">
                    {isUploading ? (
                      <motion.div
                        key="uploading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="flex items-center gap-3 p-3 rounded-xl bg-emerald-50 border border-emerald-200"
                      >
                        <div className="w-6 h-6 border-3 border-emerald-200 border-t-emerald-600 rounded-full animate-spin" />
                        <span className="text-xs font-bold text-emerald-800">
                          جاري الرفع...
                        </span>
                      </motion.div>
                    ) : uploaded ? (
                      <motion.div
                        key="uploaded"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="p-3 rounded-xl bg-emerald-50 border border-emerald-200"
                      >
                        <div className="flex items-center gap-3">
                          <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold text-emerald-900 truncate">
                              {uploaded.filename}
                            </p>
                            <p className="text-xs text-emerald-700 mt-0.5">
                              {formatFileSize(uploaded.size)} • تم الرفع بنجاح
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    ) : (
                      <motion.label
                        key="upload"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="block cursor-pointer"
                      >
                        <div
                          className={`
                          p-4 rounded-xl border-2 border-dashed transition-all text-center
                          ${isDragging ? "border-emerald-500 bg-emerald-50" : "border-gray-300 hover:border-emerald-400 hover:bg-emerald-50/30"}
                        `}
                        >
                          <Upload className="w-6 h-6 text-gray-400 mx-auto mb-2" />
                          <p className="text-xs font-bold text-gray-700 mb-1">
                            اسحب الملف هنا أو انقر للاختيار
                          </p>
                          <p className="text-xs text-gray-500">
                            PDF, JPG, PNG (حتى 10 ميجابايت)
                          </p>
                        </div>
                        <input
                          type="file"
                          className="hidden"
                          accept="application/pdf,image/jpeg,image/png,image/jpg"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) handleFileUpload(config.key, file);
                          }}
                        />
                      </motion.label>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

          {/* Missing Required Warning */}
          {missingRequired.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 p-3 rounded-2xl bg-amber-50 border border-amber-200"
            >
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-xs font-bold text-amber-900">
                    مستندات مطلوبة ناقصة
                  </p>
                  <p className="text-xs text-amber-800 mt-1">
                    يُرجى رفع جميع المستندات الإلزامية قبل الإرسال:
                  </p>
                  <ul className="text-xs text-amber-800 mt-2 mr-4 list-disc space-y-0.5">
                    {missingRequired.map((cfg) => (
                      <li key={cfg.key}>{cfg.label}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            whileTap={{ scale: canSubmit ? 0.98 : 1 }}
            disabled={!canSubmit || submitting}
            onClick={handleSubmit}
            className={`
              mt-5 w-full py-3.5 rounded-2xl font-extrabold text-sm transition-all shadow-sm
              ${
                canSubmit
                  ? "bg-[var(--brand-primary)] text-white hover:bg-[var(--brand-primary-dark)] hover:shadow-md"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }
            `}
          >
            {submitting ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                جاري الإرسال...
              </span>
            ) : (
              "إرسال المستندات"
            )}
          </motion.button>

          {/* Footer Note */}
          <p className="mt-4 text-xs text-center text-gray-500 leading-relaxed">
            ملاحظة: هذه واجهة تجريبية. يتم حفظ البيانات محلياً في المتصفح
            (localStorage). في التطبيق الفعلي، سيتم رفع الملفات إلى خادم آمن.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
