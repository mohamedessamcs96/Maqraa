import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  BookOpen,
  Award,
  Edit2,
  Save,
  X,
} from "lucide-react";

export function TeacherProfilePage() {
  const { user } = useAuthContext();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "+966501234567",
    bio: "حافظ للقرآن الكريم معروف بدقة التجويد والصبر في التعليم",
    specializations: ["تجويد", "حفظ", "إجازة"],
    certifications: ["إجازة متصلة", "شهادة تجويد", "ماجستير علوم قرآن"],
    experience: "15 سنة",
    rating: 4.9,
  });

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    // TODO: Call API to save profile
    setIsEditing(false);
  };

  return (
    <div
      className="min-h-screen p-6 bg-gradient-to-br from-emerald-50 to-teal-50"
      dir="rtl"
    >
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold">بروفايل المعلم</h1>
            <p className="text-gray-600">معلومات الملف الشخصي والشهادات</p>
          </div>
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="px-4 py-2 bg-white border border-emerald-200 text-emerald-700 rounded-lg"
          >
            الرجوع إلى لوحة التحكم
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Profile Card */}
          <div className="lg:col-span-1 bg-white rounded-2xl shadow p-6">
            <div className="flex justify-center mb-6">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white">
                <User className="w-12 h-12" />
              </div>
            </div>
            <h2 className="text-xl font-bold text-center">{formData.name}</h2>
            <p className="text-center text-gray-600">{formData.email}</p>
            <div className="mt-4 pt-4 border-t border-emerald-100">
              <div className="text-sm">
                <div className="font-semibold text-emerald-700">التقييم</div>
                <div className="text-xl font-bold text-yellow-500">
                  {formData.rating} ⭐
                </div>
              </div>
              <div className="text-sm mt-3">
                <div className="font-semibold text-emerald-700">الخبرة</div>
                <div className="text-lg font-bold">{formData.experience}</div>
              </div>
            </div>
          </div>

          {/* Profile Info */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">معلومات الملف الشخصي</h3>
              {!isEditing ? (
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-emerald-600 text-white rounded-lg"
                >
                  <Edit2 className="w-4 h-4" />
                  تعديل
                </button>
              ) : (
                <div className="flex gap-2">
                  <button
                    onClick={handleSave}
                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg"
                  >
                    <Save className="w-4 h-4" />
                    حفظ
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="flex items-center gap-2 px-4 py-2 bg-gray-400 text-white rounded-lg"
                  >
                    <X className="w-4 h-4" />
                    إلغاء
                  </button>
                </div>
              )}
            </div>

            {isEditing ? (
              // Edit Mode
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    الاسم
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    البريد الإلكتروني
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    رقم الهاتف
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-1">
                    النبذة الشخصية
                  </label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-2 border rounded-lg focus:border-emerald-500 focus:outline-none"
                  />
                </div>
              </div>
            ) : (
              // View Mode
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <User className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm text-gray-600">الاسم</div>
                    <div className="font-semibold">{formData.name}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm text-gray-600">
                      البريد الإلكتروني
                    </div>
                    <div className="font-semibold">{formData.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-emerald-600" />
                  <div>
                    <div className="text-sm text-gray-600">رقم الهاتف</div>
                    <div className="font-semibold">{formData.phone}</div>
                  </div>
                </div>
                <div className="pt-2">
                  <div className="text-sm text-gray-600 mb-2">
                    النبذة الشخصية
                  </div>
                  <p className="text-gray-800 leading-relaxed">
                    {formData.bio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Specializations & Certifications */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-emerald-600" />
              التخصصات
            </h3>
            <div className="flex flex-wrap gap-2">
              {formData.specializations.map((spec, idx) => (
                <div
                  key={idx}
                  className="px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full text-sm"
                >
                  {spec}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-600" />
              الشهادات
            </h3>
            <ul className="space-y-2">
              {formData.certifications.map((cert, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full" />
                  <span>{cert}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
