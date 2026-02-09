import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import { Clock, DollarSign, Plus, Edit2, Trash2, Save, X } from "lucide-react";

interface Service {
  id: string;
  type: string;
  hourlyRate: number;
  status: "active" | "inactive";
}

interface AvailableSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
}

export function TeacherServicesPage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [services, setServices] = useState<Service[]>([
    { id: "s1", type: "حفظ القرآن", hourlyRate: 100, status: "active" },
    { id: "s2", type: "تصحيح التلاوة", hourlyRate: 120, status: "active" },
    { id: "s3", type: "برنامج الإجازة", hourlyRate: 150, status: "inactive" },
  ]);

  const [availableSlots, setAvailableSlots] = useState<AvailableSlot[]>([
    { id: "slot-1", day: "الأحد", startTime: "18:00", endTime: "20:00" },
    { id: "slot-2", day: "الثلاثاء", startTime: "19:00", endTime: "21:00" },
    { id: "slot-3", day: "الخميس", startTime: "17:00", endTime: "19:00" },
  ]);

  const [newService, setNewService] = useState({ type: "", hourlyRate: "" });
  const [newSlot, setNewSlot] = useState({
    day: "",
    startTime: "",
    endTime: "",
  });
  const [editingService, setEditingService] = useState<string | null>(null);
  const [editingSlot, setEditingSlot] = useState<string | null>(null);

  const handleAddService = () => {
    if (newService.type && newService.hourlyRate) {
      setServices([
        ...services,
        {
          id: `s-${Date.now()}`,
          type: newService.type,
          hourlyRate: parseInt(newService.hourlyRate),
          status: "active",
        },
      ]);
      setNewService({ type: "", hourlyRate: "" });
    }
  };

  const handleDeleteService = (id: string) => {
    setServices(services.filter((s) => s.id !== id));
  };

  const handleToggleService = (id: string) => {
    setServices(
      services.map((s) =>
        s.id === id
          ? { ...s, status: s.status === "active" ? "inactive" : "active" }
          : s,
      ),
    );
  };

  const handleAddSlot = () => {
    if (newSlot.day && newSlot.startTime && newSlot.endTime) {
      setAvailableSlots([
        ...availableSlots,
        {
          id: `slot-${Date.now()}`,
          day: newSlot.day,
          startTime: newSlot.startTime,
          endTime: newSlot.endTime,
        },
      ]);
      setNewSlot({ day: "", startTime: "", endTime: "" });
    }
  };

  const handleDeleteSlot = (id: string) => {
    setAvailableSlots(availableSlots.filter((s) => s.id !== id));
  };

  const daysOfWeek = [
    "السبت",
    "الأحد",
    "الاثنين",
    "الثلاثاء",
    "الأربعاء",
    "الخميس",
    "الجمعة",
  ];

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-teal-50"
      dir="rtl"
    >
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">خدماتي وأسعاري</h1>
            <p className="text-gray-600">
              إدارة الخدمات والأسعار والمواعيد المتاحة
            </p>
          </div>
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg"
          >
            الرجوع إلى لوحة التحكم
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Services Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-emerald-600" />
              الخدمات والأسعار
            </h2>

            {/* Existing Services */}
            <div className="space-y-3 mb-6">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`flex items-center justify-between p-4 border rounded-lg ${
                    service.status === "active"
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-gray-50 border-gray-200"
                  }`}
                >
                  <div>
                    <div className="font-semibold">{service.type}</div>
                    <div className="text-sm text-gray-600">
                      {service.hourlyRate} SAR / الساعة
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleService(service.id)}
                      className={`px-3 py-1 rounded text-sm ${
                        service.status === "active"
                          ? "bg-emerald-600 text-white"
                          : "bg-gray-400 text-white"
                      }`}
                    >
                      {service.status === "active" ? "نشط" : "غير نشط"}
                    </button>
                    <button
                      onClick={() => handleDeleteService(service.id)}
                      className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Add Service */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة خدمة جديدة
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="اسم الخدمة (مثل: حفظ القرآن)"
                  value={newService.type}
                  onChange={(e) =>
                    setNewService({ ...newService, type: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                />
                <input
                  type="number"
                  placeholder="السعر بالساعة (SAR)"
                  value={newService.hourlyRate}
                  onChange={(e) =>
                    setNewService({ ...newService, hourlyRate: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                />
                <button
                  onClick={handleAddService}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  إضافة الخدمة
                </button>
              </div>
            </div>
          </div>

          {/* Availability Section */}
          <div className="bg-white rounded-2xl shadow p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-emerald-600" />
              المواعيد المتاحة
            </h2>

            {/* Existing Slots */}
            <div className="space-y-3 mb-6">
              {availableSlots.map((slot) => (
                <div
                  key={slot.id}
                  className="flex items-center justify-between p-4 border border-emerald-100 bg-emerald-50 rounded-lg"
                >
                  <div>
                    <div className="font-semibold">{slot.day}</div>
                    <div className="text-sm text-gray-600">
                      {slot.startTime} - {slot.endTime}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteSlot(slot.id)}
                    className="px-2 py-1 text-red-600 hover:bg-red-50 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Add Slot */}
            <div className="border-t pt-4">
              <h3 className="font-semibold mb-3 flex items-center gap-2">
                <Plus className="w-4 h-4" />
                إضافة موعد متاح
              </h3>
              <div className="space-y-3">
                <select
                  value={newSlot.day}
                  onChange={(e) =>
                    setNewSlot({ ...newSlot, day: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">اختر اليوم</option>
                  {daysOfWeek.map((day) => (
                    <option key={day} value={day}>
                      {day}
                    </option>
                  ))}
                </select>
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="time"
                    value={newSlot.startTime}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, startTime: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                  <input
                    type="time"
                    value={newSlot.endTime}
                    onChange={(e) =>
                      setNewSlot({ ...newSlot, endTime: e.target.value })
                    }
                    className="px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <button
                  onClick={handleAddSlot}
                  className="w-full px-4 py-2 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700"
                >
                  إضافة الموعد
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Card */}
        <div className="mt-6 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl shadow p-6 text-white">
          <h3 className="text-lg font-semibold mb-3">ملخص الخدمات</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <div className="text-sm opacity-90">عدد الخدمات النشطة</div>
              <div className="text-2xl font-bold">
                {services.filter((s) => s.status === "active").length}
              </div>
            </div>
            <div>
              <div className="text-sm opacity-90">المواعيد المتاحة</div>
              <div className="text-2xl font-bold">{availableSlots.length}</div>
            </div>
            <div>
              <div className="text-sm opacity-90">متوسط السعر</div>
              <div className="text-2xl font-bold">
                {services.length > 0
                  ? Math.round(
                      services.reduce((sum, s) => sum + s.hourlyRate, 0) /
                        services.length,
                    )
                  : 0}{" "}
                SAR
              </div>
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 flex justify-center">
          <button className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 shadow">
            حفظ جميع التغييرات
          </button>
        </div>
      </div>
    </div>
  );
}
