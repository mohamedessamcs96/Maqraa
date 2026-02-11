import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import {
  Users,
  CheckCircle2,
  Clock,
  AlertCircle,
  Settings,
  Zap,
} from "lucide-react";

interface AdminStats {
  pendingApplications: number;
  underReviewApplications: number;
  approvedApplications: number;
  rejectedApplications: number;
  pendingServices: number;
  activeServices: number;
}

export function AdminDashboard() {
  const navigate = useNavigate();
  const [stats, setStats] = React.useState<AdminStats>({
    pendingApplications: 0,
    underReviewApplications: 0,
    approvedApplications: 0,
    rejectedApplications: 0,
    pendingServices: 0,
    activeServices: 0,
  });

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-20"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-4xl font-bold text-emerald-900 mb-2">
            لوحة تحكم المسؤول
          </h1>
          <p className="text-emerald-700">إدارة تطبيقات المعلمين والخدمات</p>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          <Card className="bg-gradient-to-br from-amber-100 to-orange-100 border-amber-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-amber-900 opacity-90">
                التطبيقات المعلقة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-900">
                {stats.pendingApplications}
              </div>
              <p className="text-xs text-amber-700 mt-1">بحاجة للمراجعة</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-100 to-cyan-100 border-blue-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-blue-900 opacity-90">
                قيد المراجعة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-900">
                {stats.underReviewApplications}
              </div>
              <p className="text-xs text-blue-700 mt-1">تطبيقات قيد الفحص</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-emerald-100 to-teal-100 border-emerald-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-emerald-900 opacity-90">
                موافق عليها
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-emerald-900">
                {stats.approvedApplications}
              </div>
              <p className="text-xs text-emerald-700 mt-1">معلمون معتمدون</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-100 to-rose-100 border-red-200">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-red-900 opacity-90">
                مرفوضة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-900">
                {stats.rejectedApplications}
              </div>
              <p className="text-xs text-red-700 mt-1">تطبيقات مرفوضة</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Main Actions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8"
        >
          {/* Applications Card */}
          <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Users className="w-5 h-5 text-emerald-600" />
                <CardTitle className="text-emerald-900">
                  تطبيقات المعلمين
                </CardTitle>
              </div>
              <CardDescription className="text-emerald-700">
                مراجعة والموافقة على تطبيقات المعلمين الجدد
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate("/admin/applications")}
                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
              >
                عرض جميع التطبيقات
              </Button>
              <Button
                onClick={() => navigate("/admin/applications?status=1")}
                variant="outline"
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <Clock className="w-4 h-4 mr-2" />
                المعلقة فقط ({stats.pendingApplications})
              </Button>
            </CardContent>
          </Card>

          {/* Services Card */}
          <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <CardTitle className="text-emerald-900">
                  خدمات المعلمين
                </CardTitle>
              </div>
              <CardDescription className="text-emerald-700">
                مراجعة الأسعار والموافقة على الخدمات الجديدة
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={() => navigate("/admin/services")}
                className="w-full bg-teal-600 hover:bg-teal-700 text-white"
              >
                عرض جميع الخدمات
              </Button>
              <Button
                onClick={() => navigate("/admin/services?status=1")}
                variant="outline"
                className="w-full border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <AlertCircle className="w-4 h-4 mr-2" />
                المعلقة فقط ({stats.pendingServices})
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* Management Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-2xl font-bold text-emerald-900 mb-4">
            إدارة النظام
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Manage Teachers Card */}
            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-5 h-5 text-emerald-600" />
                  <CardTitle className="text-emerald-900">
                    إدارة المعلمين
                  </CardTitle>
                </div>
                <CardDescription className="text-emerald-700">
                  إضافة وتفعيل وتعطيل وحذف المعلمين
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/admin/manage-teachers")}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Users className="w-4 h-4 mr-2" />
                  إدارة المعلمين
                </Button>
                <div className="text-xs text-emerald-700 p-2 bg-emerald-50 rounded border border-emerald-200">
                  • إضافة معلمين جدد
                  <br />
                  • تفعيل/تعطيل المعلمين
                  <br />• حذف المعلمين نهائياً
                </div>
              </CardContent>
            </Card>

            {/* Manage Services Card */}
            <Card className="bg-white border-emerald-200 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <Zap className="w-5 h-5 text-teal-600" />
                  <CardTitle className="text-emerald-900">
                    إدارة الخدمات
                  </CardTitle>
                </div>
                <CardDescription className="text-emerald-700">
                  إضافة وحذف وإدارة خدمات المعلمين
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  onClick={() => navigate("/admin/manage-services")}
                  className="w-full bg-teal-600 hover:bg-teal-700 text-white"
                >
                  <Zap className="w-4 h-4 mr-2" />
                  إدارة الخدمات
                </Button>
                <div className="text-xs text-emerald-700 p-2 bg-emerald-50 rounded border border-emerald-200">
                  • إضافة خدمات جديدة
                  <br />
                  • حذف الخدمات
                  <br />• الموافقة على الخدمات
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
