import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Textarea } from "../../components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  ArrowRight,
  FileText,
  AlertCircle,
  CheckCircle,
  XCircle,
  FileQuestion,
} from "lucide-react";

interface Document {
  id: number;
  document_type: number;
  document_type_display: string;
  file: string;
  status: number;
  status_display: string;
  uploaded_at: string;
  reviewed_at?: string;
  rejection_reason?: string;
}

interface ApplicationDetail {
  id: number;
  teacher_id: string;
  teacher_name: string;
  email: string;
  phone: string;
  gender: string;
  nationality: string;
  language: string;
  bio: string;
  years_of_experience: number;
  qualification: string;
  status: number;
  status_display: string;
  applied_at: string;
  reviewed_at?: string;
  reviewed_by?: { id: string; name: string };
  admin_notes?: string;
  rejection_reason?: string;
  documents: Document[];
}

const STATUS_COLORS: Record<
  number,
  { bg: string; text: string; label: string; icon: any }
> = {
  1: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    label: "معلق",
    icon: AlertCircle,
  },
  2: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "قيد المراجعة",
    icon: FileQuestion,
  },
  3: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    label: "موافق عليه",
    icon: CheckCircle,
  },
  4: { bg: "bg-red-100", text: "text-red-800", label: "مرفوض", icon: XCircle },
};

export function AdminApplicationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [application, setApplication] = useState<ApplicationDetail | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<1 | 2 | 3 | null>(null);

  useEffect(() => {
    fetchApplicationDetail();
  }, [id]);

  const fetchApplicationDetail = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAdminApplicationDetail(parseInt(id!));
      if (res.success && res.data) {
        setApplication(res.data);
        setAdminNotes(res.data.admin_notes || "");
        setRejectionReason(res.data.rejection_reason || "");
      }
    } catch (error: any) {
      console.error("Error fetching application:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!application) return;

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherApplication(application.id, {
        action: 1,
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم الموافقة على التطبيق");
        setActionDialogOpen(false);
        setTimeout(() => fetchApplicationDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل الموافقة"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!application || !rejectionReason.trim()) {
      alert("تحذير: يرجى كتابة سبب الرفض");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherApplication(application.id, {
        action: 2,
        rejection_reason: rejectionReason,
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم رفض التطبيق");
        setActionDialogOpen(false);
        setTimeout(() => fetchApplicationDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل رفض التطبيق"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRequestDocuments = async () => {
    if (!application) return;

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherApplication(application.id, {
        action: 3,
        required_documents: ["ijazah", "memorization_cert"],
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم طلب المستندات من المعلم");
        setActionDialogOpen(false);
        setTimeout(() => fetchApplicationDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل طلب المستندات"));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-slate-300">جاري التحميل...</div>
      </div>
    );
  }

  if (!application) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-slate-300">لم يتم العثور على التطبيق</div>
      </div>
    );
  }

  const statusInfo = STATUS_COLORS[application.status];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-20"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-2">
              {application.teacher_name}
            </h1>
            <p className="text-emerald-700">
              تطبيق المعلم - {application.teacher_id}
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin/applications")}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة
          </Button>
        </motion.div>

        {/* Status Card */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="bg-white border-emerald-200 mb-6">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-600 text-sm mb-2 font-medium">
                    حالة التطبيق
                  </p>
                  <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
                    {statusInfo.label}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 text-sm mb-1 font-medium">
                    تاريخ التقديم
                  </p>
                  <p className="text-emerald-900">
                    {new Date(application.applied_at).toLocaleDateString(
                      "ar-SA",
                    )}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Personal Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-white border-emerald-200 mb-6">
            <CardHeader>
              <CardTitle className="text-emerald-900">
                المعلومات الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    البريد الإلكتروني
                  </p>
                  <p className="text-emerald-900">{application.email}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    الهاتف
                  </p>
                  <p className="text-emerald-900">{application.phone}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    الجنس
                  </p>
                  <p className="text-emerald-900">
                    {application.gender === "male" ? "ذكر" : "أنثى"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    الجنسية
                  </p>
                  <p className="text-emerald-900">{application.nationality}</p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    اللغة
                  </p>
                  <p className="text-emerald-900">
                    {application.language === "ar" ? "العربية" : "الإنجليزية"}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    الخبرة
                  </p>
                  <p className="text-emerald-900">
                    {application.years_of_experience} سنوات
                  </p>
                </div>
              </div>

              <div>
                <p className="text-xs text-emerald-600 mb-1 font-medium">
                  السيرة الذاتية
                </p>
                <p className="text-emerald-900 text-sm leading-relaxed">
                  {application.bio}
                </p>
              </div>

              <div>
                <p className="text-xs text-emerald-600 mb-1 font-medium">
                  المؤهل
                </p>
                <p className="text-emerald-900 text-sm">
                  {application.qualification}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-white border-emerald-200 mb-6">
            <CardHeader>
              <CardTitle className="text-emerald-900">المستندات</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {application.documents.map((doc) => (
                  <div
                    key={doc.id}
                    className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-5 h-5 text-emerald-600" />
                      <div>
                        <p className="text-emerald-900 text-sm font-medium">
                          {doc.document_type_display}
                        </p>
                        <p className="text-emerald-600 text-xs">
                          تم الرفع:{" "}
                          {new Date(doc.uploaded_at).toLocaleDateString(
                            "ar-SA",
                          )}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge
                        className={
                          doc.status === 1
                            ? "bg-amber-100 text-amber-800"
                            : "bg-emerald-100 text-emerald-800"
                        }
                      >
                        {doc.status_display}
                      </Badge>
                      <a
                        href={doc.file}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-emerald-600 hover:text-emerald-700 text-sm font-medium"
                      >
                        عرض
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.25 }}
        >
          <Card className="bg-white border-emerald-200 mb-6">
            <CardHeader>
              <CardTitle className="text-emerald-900">
                ملاحظات المسؤول
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="أضف ملاحظاتك هنا..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="border-emerald-200 focus:border-emerald-500"
                rows={4}
              />
            </CardContent>
          </Card>
        </motion.div>

        {/* Actions */}
        {application.status !== 3 && application.status !== 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="flex gap-3 flex-wrap"
          >
            <Dialog open={actionDialogOpen} onOpenChange={setActionDialogOpen}>
              <DialogTrigger asChild>
                <Button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  الموافقة
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    الموافقة على التطبيق
                  </DialogTitle>
                  <DialogDescription className="text-emerald-700">
                    هل تريد الموافقة على {application.teacher_name}؟
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <Button
                    onClick={handleApprove}
                    disabled={isSubmitting}
                    className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد الموافقة"}
                  </Button>
                  <Button
                    onClick={() => setActionDialogOpen(false)}
                    variant="outline"
                    className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  >
                    إلغاء
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Dialog
              open={actionDialogOpen && selectedAction === 2}
              onOpenChange={setActionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="flex-1 border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setSelectedAction(2)}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  الرفض
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    رفض التطبيق
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-emerald-900 text-sm block mb-2 font-medium">
                      سبب الرفض
                    </label>
                    <Textarea
                      placeholder="اشرح سبب الرفض..."
                      value={rejectionReason}
                      onChange={(e) => setRejectionReason(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      rows={4}
                    />
                  </div>
                  <Button
                    onClick={handleReject}
                    disabled={isSubmitting || !rejectionReason.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد الرفض"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            <Button
              variant="outline"
              className="flex-1 border-teal-300 text-teal-600 hover:bg-teal-50"
              onClick={handleRequestDocuments}
            >
              <FileQuestion className="w-4 h-4 mr-2" />
              طلب مستندات
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
