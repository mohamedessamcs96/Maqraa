import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "motion/react";
import { api } from "../../lib/api";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  ChevronRight,
  ArrowRight,
  AlertCircle,
  DollarSign,
} from "lucide-react";

interface TeacherService {
  id: number;
  teacher_id: string;
  teacher_name: string;
  service_type: number;
  service_type_display: string;
  hourly_rate: string;
  status: number;
  status_display: string;
  admin_final_rate?: string;
  created_at: string;
}

const STATUS_COLORS: Record<
  number,
  { bg: string; text: string; label: string }
> = {
  1: { bg: "bg-amber-100", text: "text-amber-800", label: "بانتظار الموافقة" },
  2: { bg: "bg-blue-100", text: "text-blue-800", label: "قيد المراجعة" },
  3: { bg: "bg-emerald-100", text: "text-emerald-800", label: "نشطة" },
  4: { bg: "bg-red-100", text: "text-red-800", label: "مرفوضة" },
};

export function AdminServicesPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [services, setServices] = useState<TeacherService[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<number | undefined>(
    searchParams.get("status")
      ? parseInt(searchParams.get("status")!)
      : undefined,
  );

  useEffect(() => {
    fetchServices();
  }, [filter]);

  const fetchServices = async () => {
    try {
      setIsLoading(true);
      const res = await api.getAdminTeacherServices(filter);
      if (res.success && res.data) {
        setServices(res.data);
      }
    } catch (error: any) {
      console.error("Error fetching services:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusInfo = (status: number) => {
    return STATUS_COLORS[status] || STATUS_COLORS[1];
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 pb-20"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 flex items-center justify-between"
        >
          <div>
            <h1 className="text-4xl font-bold text-emerald-900 mb-2">
              خدمات المعلمين
            </h1>
            <p className="text-emerald-700">
              إدارة والموافقة على خدمات المعلمين والأسعار
            </p>
          </div>
          <Button
            onClick={() => navigate("/admin")}
            variant="outline"
            className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            العودة
          </Button>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-2 mb-6 flex-wrap bg-white p-4 rounded-lg shadow-sm"
        >
          <Button
            onClick={() => setFilter(undefined)}
            variant={filter === undefined ? "default" : "outline"}
            className={
              filter === undefined
                ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
            }
          >
            الكل ({services.length})
          </Button>
          {[1, 2, 3, 4].map((status) => {
            const count = services.filter((s) => s.status === status).length;
            return (
              <Button
                key={status}
                onClick={() => setFilter(status)}
                variant={filter === status ? "default" : "outline"}
                className={
                  filter === status
                    ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                    : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                }
              >
                {STATUS_COLORS[status]?.label} ({count})
              </Button>
            );
          })}
        </motion.div>

        {/* Services List */}
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-emerald-600">جاري التحميل...</div>
          </div>
        ) : services.length === 0 ? (
          <Card className="bg-white border-emerald-200">
            <CardContent className="py-12 flex items-center justify-center">
              <div className="text-center">
                <AlertCircle className="w-12 h-12 text-emerald-400 mx-auto mb-4" />
                <p className="text-emerald-600">لا توجد خدمات</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {services.map((service, idx) => {
              const statusInfo = getStatusInfo(service.status);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Card
                    className="bg-white border-emerald-200 hover:shadow-md transition-shadow cursor-pointer"
                    onClick={() => navigate(`/admin/services/${service.id}`)}
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <h3 className="text-lg font-semibold text-emerald-900">
                              {service.teacher_name}
                            </h3>
                            <Badge
                              className={`${statusInfo.bg} ${statusInfo.text}`}
                            >
                              {statusInfo.label}
                            </Badge>
                          </div>

                          <div className="mb-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                            <p className="text-emerald-900 text-sm font-medium">
                              {service.service_type_display}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                              <p className="text-xs text-emerald-600 mb-1 font-medium">
                                معرّف المعلم
                              </p>
                              <p className="text-sm text-gray-700 truncate">
                                {service.teacher_id}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs text-emerald-600 mb-1 font-medium">
                                السعر المطلوب
                              </p>
                              <div className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4 text-emerald-600" />
                                <p className="text-sm text-gray-700">
                                  {service.hourly_rate} ر.س/ساعة
                                </p>
                              </div>
                            </div>
                            {service.admin_final_rate && (
                              <div>
                                <p className="text-xs text-emerald-600 mb-1 font-medium">
                                  السعر النهائي
                                </p>
                                <div className="flex items-center gap-1">
                                  <DollarSign className="w-4 h-4 text-teal-600" />
                                  <p className="text-sm text-gray-700">
                                    {service.admin_final_rate} ر.س/ساعة
                                  </p>
                                </div>
                              </div>
                            )}
                            <div>
                              <p className="text-xs text-emerald-600 mb-1 font-medium">
                                تاريخ الإضافة
                              </p>
                              <p className="text-sm text-gray-700">
                                {new Date(
                                  service.created_at,
                                ).toLocaleDateString("ar-SA")}
                              </p>
                            </div>
                          </div>
                        </div>

                        <Button
                          size="icon"
                          className="ml-4 bg-emerald-600 hover:bg-emerald-700"
                          onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/services/${service.id}`);
                          }}
                        >
                          <ChevronRight className="w-5 h-5" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
