import React, { useEffect, useState } from "react";
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../../components/ui/dialog";
import {
  ArrowRight,
  Plus,
  Trash2,
  Power,
  PowerOff,
  Search,
  Filter,
} from "lucide-react";

interface Teacher {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: "active" | "inactive" | "suspended";
  yearsOfExperience: number;
  qualification: string;
  joinedAt: string;
  servicesCount: number;
}

export function AdminManageTeachersPage() {
  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([
    {
      id: "teacher-1",
      name: "أحمد محمود",
      email: "ahmed@example.com",
      phone: "+966501234567",
      status: "active",
      yearsOfExperience: 5,
      qualification: "إجازة من الأزهر",
      joinedAt: "2024-01-15",
      servicesCount: 3,
    },
    {
      id: "teacher-2",
      name: "فاطمة علي",
      email: "fatima@example.com",
      phone: "+966507654321",
      status: "active",
      yearsOfExperience: 3,
      qualification: "بكالوريوس الدراسات الإسلامية",
      joinedAt: "2024-02-01",
      servicesCount: 2,
    },
  ]);

  const [isAddingTeacher, setIsAddingTeacher] = useState(false);
  const [newTeacher, setNewTeacher] = useState({
    name: "",
    email: "",
    phone: "",
    qualification: "",
  });

  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState<
    "all" | "active" | "inactive" | "suspended"
  >("all");

  const filteredTeachers = teachers.filter((teacher) => {
    const matchesSearch =
      teacher.name.includes(searchTerm) ||
      teacher.email.includes(searchTerm) ||
      teacher.phone.includes(searchTerm);
    const matchesStatus =
      filterStatus === "all" || teacher.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const handleAddTeacher = () => {
    if (!newTeacher.name || !newTeacher.email) {
      alert("يرجى ملء جميع الحقول");
      return;
    }

    const teacher: Teacher = {
      id: `teacher-${Date.now()}`,
      name: newTeacher.name,
      email: newTeacher.email,
      phone: newTeacher.phone,
      qualification: newTeacher.qualification,
      status: "active",
      yearsOfExperience: 0,
      joinedAt: new Date().toISOString().split("T")[0],
      servicesCount: 0,
    };

    setTeachers([...teachers, teacher]);
    setNewTeacher({ name: "", email: "", phone: "", qualification: "" });
    setIsAddingTeacher(false);
    alert("تم إضافة المعلم بنجاح");
  };

  const handleDeleteTeacher = (id: string) => {
    if (confirm("هل أنت متأكد من حذف هذا المعلم؟")) {
      setTeachers(teachers.filter((t) => t.id !== id));
      alert("تم حذف المعلم بنجاح");
    }
  };

  const handleToggleStatus = (id: string) => {
    setTeachers(
      teachers.map((t) => {
        if (t.id === id) {
          const newStatus = t.status === "active" ? "inactive" : "active";
          alert(
            `تم ${newStatus === "active" ? "تفعيل" : "تعطيل"} المعلم بنجاح`,
          );
          return { ...t, status: newStatus };
        }
        return t;
      }),
    );
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-emerald-100 text-emerald-800";
      case "inactive":
        return "bg-amber-100 text-amber-800";
      case "suspended":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "active":
        return "نشط";
      case "inactive":
        return "معطل";
      case "suspended":
        return "موقوف";
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
              إدارة المعلمين
            </h1>
            <p className="text-emerald-700">إضافة وحذف وتفعيل المعلمين</p>
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

        {/* Add Teacher Button */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Dialog open={isAddingTeacher} onOpenChange={setIsAddingTeacher}>
            <DialogTrigger asChild>
              <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                إضافة معلم جديد
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-white">
              <DialogHeader>
                <DialogTitle className="text-emerald-900">
                  إضافة معلم جديد
                </DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    الاسم
                  </label>
                  <Input
                    value={newTeacher.name}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, name: e.target.value })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="اسم المعلم"
                  />
                </div>
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    البريد الإلكتروني
                  </label>
                  <Input
                    type="email"
                    value={newTeacher.email}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, email: e.target.value })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="email@example.com"
                  />
                </div>
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    الهاتف
                  </label>
                  <Input
                    value={newTeacher.phone}
                    onChange={(e) =>
                      setNewTeacher({ ...newTeacher, phone: e.target.value })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="+966501234567"
                  />
                </div>
                <div>
                  <label className="text-emerald-900 text-sm block mb-2 font-medium">
                    المؤهل
                  </label>
                  <Input
                    value={newTeacher.qualification}
                    onChange={(e) =>
                      setNewTeacher({
                        ...newTeacher,
                        qualification: e.target.value,
                      })
                    }
                    className="border-emerald-200 focus:border-emerald-500"
                    placeholder="المؤهل الدراسي"
                  />
                </div>
                <Button
                  onClick={handleAddTeacher}
                  className="w-full bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  إضافة المعلم
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
              placeholder="البحث عن معلم..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-10 border-emerald-200 focus:border-emerald-500"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {(["all", "active", "inactive", "suspended"] as const).map(
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
                    : status === "active"
                      ? "نشط"
                      : status === "inactive"
                        ? "معطل"
                        : "موقوف"}
                </Button>
              ),
            )}
          </div>
        </motion.div>

        {/* Teachers List */}
        <div className="space-y-4">
          {filteredTeachers.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <Card className="bg-white border-emerald-200">
                <CardContent className="py-12 flex items-center justify-center">
                  <p className="text-emerald-600">لا توجد معلمين</p>
                </CardContent>
              </Card>
            </motion.div>
          ) : (
            filteredTeachers.map((teacher, idx) => (
              <motion.div
                key={teacher.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <Card className="bg-white border-emerald-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <h3 className="text-lg font-semibold text-emerald-900">
                            {teacher.name}
                          </h3>
                          <Badge className={getStatusColor(teacher.status)}>
                            {getStatusLabel(teacher.status)}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              البريد الإلكتروني
                            </p>
                            <p className="text-sm text-gray-700">
                              {teacher.email}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              الهاتف
                            </p>
                            <p className="text-sm text-gray-700">
                              {teacher.phone}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              الخبرة
                            </p>
                            <p className="text-sm text-gray-700">
                              {teacher.yearsOfExperience} سنوات
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-emerald-600 mb-1 font-medium">
                              الخدمات
                            </p>
                            <p className="text-sm text-gray-700">
                              {teacher.servicesCount} خدمات
                            </p>
                          </div>
                        </div>

                        <div>
                          <p className="text-xs text-emerald-600 mb-1 font-medium">
                            المؤهل
                          </p>
                          <p className="text-sm text-gray-700">
                            {teacher.qualification}
                          </p>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2 ml-4">
                        <Button
                          size="sm"
                          onClick={() => handleToggleStatus(teacher.id)}
                          className={
                            teacher.status === "active"
                              ? "bg-amber-600 hover:bg-amber-700"
                              : "bg-emerald-600 hover:bg-emerald-700"
                          }
                        >
                          {teacher.status === "active" ? (
                            <>
                              <PowerOff className="w-4 h-4 mr-1" />
                              تعطيل
                            </>
                          ) : (
                            <>
                              <Power className="w-4 h-4 mr-1" />
                              تفعيل
                            </>
                          )}
                        </Button>

                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleDeleteTeacher(teacher.id)}
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
