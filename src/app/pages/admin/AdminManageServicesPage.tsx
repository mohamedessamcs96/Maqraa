import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import { ArrowRight, Plus, Trash2, DollarSign, Search } from "lucide-react";

interface Service {
  id: string;
  teacherId: string;
  teacherName: string;
  serviceType: string;
  hourlyRate: number;
  status: "pending" | "active" | "inactive";
  createdAt: string;
}

const SERVICE_TYPES = [
  "تحفيظ القرآن",
  "تجويد",
  "خاتمة القرآن",
  "إقراء",
  "إجازة",
  "للأطفال",
  "للنساء",
  "لكبار السن",
];

export function AdminManageServicesPage() {
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([
    {
      id: "service-1",
      teacherId: "teacher-1",
      teacherName: "أحمد محمود",
      serviceType: "تحفيظ القرآن",
      hourlyRate: 50,
      status: "active",
      createdAt: "2024-01-20",
    },
    {
      id: "service-2",
      teacherId: "teacher-1",
      teacherName: "أحمد محمود",
      serviceType: "تجويد",
      hourlyRate: 45,
      status: "active",
      createdAt: "2024-01-21",
    },
    {
      id: "service-3",
      teacherId: "teacher-2",
      teacherName: "فاطمة علي",
      serviceType: "للأطفال",
      hourlyRate: 35,
      status: "pending",
      createdAt: "2024-02-05",
    },
  ]);

  const [isAddingService, setIsAddingService] = useState(false);
  const [newService, setNewService] = useState({
    teacherName: "",
    serviceType: "",
    hourlyRate: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "pending" | "active" | "inactive"
  >("all");

  const filteredServices = services.filter((service) => {
    const matchesSearch =
      service.teacherName.includes(searchTerm) ||
      service.serviceType.includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || service.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddService = () => {
    if (
      !newService.teacherName ||
      !newService.serviceType ||
      !newService.hourlyRate
    ) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const service: Service = {
      id: `service-${Date.now()}`,
      teacherId: `teacher-${Date.now()}`,
      teacherName: newService.teacherName,
      serviceType: newService.serviceType,
      hourlyRate: parseFloat(newService.hourlyRate),
      status: "pending",
      createdAt: new Date().toISOString().split("T")[0],
    };

    setServices([...services, service]);
    setNewService({ teacherName: "", serviceType: "", hourlyRate: "" });
    setIsAddingService(false);
    alert("تم إضافة الخدمة بنجاح");
  };

  const handleDeleteService = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذه الخدمة؟")) {
      setServices(services.filter((s) => s.id !== id));
      alert("تم حذف الخدمة بنجاح");
    }
  };

  const handleApproveService = (id: string) => {
    setServices(
      services.map((s) => {
        if (s.id === id) {
          alert("تم الموافقة على الخدمة بنجاح");
          return { ...s, status: "active" };
        }
        return s;
      }),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "pending":
        return "bg-amber-100 text-amber-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "نشطة";
      case "pending":
        return "بانتظار الموافقة";
      case "inactive":
        return "معطلة";
      default:
        return status;
    }
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
              إدارة الخدمات
            </h1>
            <p className="text-emerald-700">إضافة وحذف خدمات المعلمين</p>
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

        {/* Add Service Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Dialog open={isAddingService} onOpenChange={setIsAddingService}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                إضافة خدمة جديدة
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-emerald-900">
                  إضافة خدمة جديدة
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    اسم المعلم
                  </label>
                  <Input
                    value={newService.teacherName}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        teacherName: e.target.value,
                      })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="اسم المعلم"
                  />
                </div>
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    نوع الخدمة
                  </label>
                  <select
                    value={newService.serviceType}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        serviceType: e.target.value,
                      })
                    }
                    className="w-full border border-emerald-200 text-gray-700 rounded-md p-2 focus:border-emerald-500 focus:outline-none"
                  >
                    <option value="">اختر نوع الخدمة</option>
                    {SERVICE_TYPES.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    السعر بالساعة (ر.س)
                  </label>
                  <Input
                    type="number"
                    value={newService.hourlyRate}
                    onChange={(e) =>
                      setNewService({
                        ...newService,
                        hourlyRate: e.target.value,
                      })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="50"
                  />
                </div>
                <Button
                  onClick={handleAddService}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  إضافة الخدمة
                </Button>
              </div>
            </DialogContent>
          </Dialog>
        </motion.div>

        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="mb-6 flex gap-3 flex-wrap bg-white p-4 rounded-lg shadow-sm"
        >
          <div className="relative flex-1 min-w-xs">
            <Search className="absolute right-3 top-3 w-5 h-5 text-emerald-400" />
            <Input
              type="text"
              placeholder="البحث عن خدمة أو معلم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 border-emerald-200 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "pending", "active", "inactive"] as const).map(
              (status) => (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  variant={filterStatus === status ? "default" : "outline"}
                  className={
                    filterStatus === status
                      ? "bg-emerald-600 hover:bg-emerald-700 text-white"
                      : "border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                  }
                >
                  {status === "all"
                    ? "الكل"
                    : status === "pending"
                      ? "الانتظار"
                      : status === "active"
                        ? "نشطة"
                        : "معطلة"}
                </Button>
              ),
            )}
          </div>
        </motion.div>

        {/* Services List */}
        <div className="space-y-4">
          {filteredServices.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-white border-emerald-200">
                <CardContent className="py-12 flex items-center justify-center">
                  <p className="text-emerald-600">لا توجد خدمات</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            filteredServices.map((service, idx) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-white border-emerald-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-emerald-900">
                              {service.teacherName}
                            </h3>
                            <p className="text-sm text-emerald-700">
                              {service.serviceType}
                            </p>
                          </div>
                          <Badge className={getStatusColor(service.status)}>
                            {getStatusLabel(service.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              السعر بالساعة
                            </p>
                            <div className="flex items-center gap-1">
                              <DollarSign className="w-4 h-4 text-emerald-600" />
                              <p className="text-sm text-gray-700">
                                {service.hourlyRate} ر.س
                              </p>
                            </div>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              تاريخ الإنشاء
                            </p>
                            <p className="text-sm text-gray-700">
                              {new Date(service.createdAt).toLocaleDateString(
                                "ar-SA",
                              )}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              الحالة
                            </p>
                            <p className="text-sm text-gray-700">
                              {getStatusLabel(service.status)}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-4">
                        {service.status === "pending" && (
                          <Button
                            size="sm"
                            onClick={() => handleApproveService(service.id)}
                            className="bg-emerald-600 hover:bg-emerald-700 text-white"
                          >
                            موافقة
                          </Button>
                        )}

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteService(service.id)}
                          className="border-red-300 text-red-600 hover:bg-red-50"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
