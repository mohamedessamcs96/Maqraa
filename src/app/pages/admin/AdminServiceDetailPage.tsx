import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
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
  AlertCircle,
  CheckCircle,
  XCircle,
  DollarSign,
} from "lucide-react";

interface TeacherInfo {
  id: string;
  name: string;
  email: string;
}

interface ServiceDetail {
  id: number;
  teacher_id: string;
  teacher_name: string;
  service_type: number;
  service_type_display: string;
  hourly_rate: string;
  status: number;
  status_display: string;
  admin_final_rate?: string;
  admin_approved_at?: string;
  approved_by?: TeacherInfo;
  admin_notes?: string;
  created_at: string;
}

const STATUS_COLORS: Record<
  number,
  { bg: string; text: string; label: string; icon: any }
> = {
  1: {
    bg: "bg-amber-100",
    text: "text-amber-800",
    label: "بانتظار الموافقة",
    icon: AlertCircle,
  },
  2: {
    bg: "bg-blue-100",
    text: "text-blue-800",
    label: "قيد المراجعة",
    icon: AlertCircle,
  },
  3: {
    bg: "bg-emerald-100",
    text: "text-emerald-800",
    label: "نشطة",
    icon: CheckCircle,
  },
  4: { bg: "bg-red-100", text: "text-red-800", label: "مرفوضة", icon: XCircle },
};

export function AdminServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [service, setService] = useState<ServiceDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [adminNotes, setAdminNotes] = useState("");
  const [adjustedRate, setAdjustedRate] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [actionDialogOpen, setActionDialogOpen] = useState(false);
  const [selectedAction, setSelectedAction] = useState<
    "approve" | "adjust_rate" | "reject" | null
  >(null);

  useEffect(() => {
    fetchServiceDetail();
  }, [id]);

  const fetchServiceDetail = async () => {
    try {
      setIsLoading(true);
      // Note: Backend should provide this endpoint like GET /admin/teacher-services/<id>/
      // For now we'll fetch all and filter
      const res = await api.getAdminTeacherServices();
      if (res.success && res.data) {
        const found = res.data.find((s: any) => s.id === parseInt(id!));
        if (found) {
          setService(found);
          setAdminNotes(found.admin_notes || "");
          setAdjustedRate(found.admin_final_rate || found.hourly_rate);
        }
      }
    } catch (error: any) {
      console.error("Error fetching service:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!service) return;

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherService(service.id, {
        action: "approve",
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم الموافقة على الخدمة");
        setActionDialogOpen(false);
        setTimeout(() => fetchServiceDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل الموافقة على الخدمة"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdjustRate = async () => {
    if (!service || !adjustedRate.trim()) {
      alert("تحذير: يرجى إدخال السعر المعدل");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherService(service.id, {
        action: "adjust_rate",
        admin_final_rate: adjustedRate,
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم تعديل السعر والموافقة على الخدمة");
        setActionDialogOpen(false);
        setTimeout(() => fetchServiceDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل تعديل السعر"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!service || !adminNotes.trim()) {
      alert("تحذير: يرجى كتابة سبب الرفض");
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.approveTeacherService(service.id, {
        action: "reject",
        admin_notes: adminNotes,
      });

      if (res.success) {
        alert("نجح: تم رفض الخدمة");
        setActionDialogOpen(false);
        setTimeout(() => fetchServiceDetail(), 500);
      }
    } catch (error: any) {
      alert("خطأ: " + (error?.message || "فشل رفض الخدمة"));
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

  if (!service) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
        <div className="text-slate-300">لم يتم العثور على الخدمة</div>
      </div>
    );
  }

  const statusInfo = STATUS_COLORS[service.status];

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
              {service.teacher_name}
            </h1>
            <p className="text-emerald-700">خدمة المعلم</p>
          </div>
          <Button
            onClick={() => navigate("/admin/services")}
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
                    حالة الخدمة
                  </p>
                  <Badge className={`${statusInfo.bg} ${statusInfo.text}`}>
                    {statusInfo.label}
                  </Badge>
                </div>
                <div className="text-right">
                  <p className="text-emerald-600 text-sm mb-1 font-medium">
                    تاريخ الإضافة
                  </p>
                  <p className="text-emerald-900">
                    {new Date(service.created_at).toLocaleDateString("ar-SA")}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Service Information */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15 }}
        >
          <Card className="bg-white border-emerald-200 mb-6">
            <CardHeader>
              <CardTitle className="text-emerald-900">معلومات الخدمة</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    معرّف المعلم
                  </p>
                  <p className="text-emerald-900 font-mono text-sm">
                    {service.teacher_id}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    نوع الخدمة
                  </p>
                  <p className="text-emerald-900 text-sm">
                    {service.service_type_display}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-emerald-600 mb-1 font-medium">
                    السعر المطلوب (ر.س/ساعة)
                  </p>
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4 text-emerald-600" />
                    <p className="text-emerald-900 text-sm font-medium">
                      {service.hourly_rate}
                    </p>
                  </div>
                </div>
                {service.admin_final_rate && (
                  <div>
                    <p className="text-xs text-emerald-600 mb-1 font-medium">
                      السعر المعتمد (ر.س/ساعة)
                    </p>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-teal-600" />
                      <p className="text-emerald-900 text-sm font-medium">
                        {service.admin_final_rate}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Admin Notes */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
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
        {service.status !== 3 && service.status !== 4 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.25 }}
            className="space-y-4"
          >
            {/* Approve Button */}
            <Dialog
              open={actionDialogOpen && selectedAction === "approve"}
              onOpenChange={setActionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                  onClick={() => setSelectedAction("approve")}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  الموافقة على السعر
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    الموافقة على الخدمة
                  </DialogTitle>
                  <DialogDescription className="text-emerald-700">
                    سيتم الموافقة على الخدمة بالسعر المطلوب:{" "}
                    {service.hourly_rate} ر.س/ساعة
                  </DialogDescription>
                </DialogHeader>
                <Button
                  onClick={handleApprove}
                  disabled={isSubmitting}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  {isSubmitting ? "جاري المعالجة..." : "تأكيد الموافقة"}
                </Button>
              </DialogContent>
            </Dialog>

            {/* Adjust Rate Button */}
            <Dialog
              open={actionDialogOpen && selectedAction === "adjust_rate"}
              onOpenChange={setActionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-teal-300 text-teal-600 hover:bg-teal-50"
                  onClick={() => setSelectedAction("adjust_rate")}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  تعديل السعر والموافقة
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    تعديل السعر
                  </DialogTitle>
                  <DialogDescription className="text-emerald-700">
                    السعر الحالي المطلوب: {service.hourly_rate} ر.س/ساعة
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <label className="text-emerald-900 text-sm block mb-2 font-medium">
                      السعر الجديد (ر.س/ساعة)
                    </label>
                    <Input
                      type="number"
                      step="0.5"
                      value={adjustedRate}
                      onChange={(e) => setAdjustedRate(e.target.value)}
                      className="border-emerald-200 focus:border-emerald-500"
                      placeholder="أدخل السعر الجديد"
                    />
                  </div>
                  <Button
                    onClick={handleAdjustRate}
                    disabled={isSubmitting}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد تعديل السعر"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>

            {/* Reject Button */}
            <Dialog
              open={actionDialogOpen && selectedAction === "reject"}
              onOpenChange={setActionDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                  onClick={() => setSelectedAction("reject")}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  رفض
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-white">
                <DialogHeader>
                  <DialogTitle className="text-emerald-900">
                    رفض الخدمة
                  </DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <Button
                    onClick={handleReject}
                    disabled={isSubmitting || !adminNotes.trim()}
                    className="w-full bg-red-600 hover:bg-red-700 text-white"
                  >
                    {isSubmitting ? "جاري المعالجة..." : "تأكيد الرفض"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </motion.div>
        )}
      </div>
    </div>
  );
}
