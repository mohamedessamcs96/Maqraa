import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { ArrowRight, Mail, Lock, User, AlertCircle } from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import { UserRole } from "../../types";

interface SignUpPageProps {
  initialRole?: UserRole;
}

export function SignUpPage({ initialRole = "learner" }: SignUpPageProps) {
  const navigate = useNavigate();
  const { register, isLoading } = useAuthContext();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: initialRole,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "الاسم مطلوب";
    }

    if (!formData.email.includes("@")) {
      newErrors.email = "البريد الإلكتروني غير صحيح";
    }

    if (formData.password.length < 6) {
      newErrors.password = "كلمة المرور يجب أن تكون 6 أحرف على الأقل";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "كلمات المرور غير متطابقة";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      await register(
        formData.email,
        formData.password,
        formData.name,
        formData.role,
      );
      setSubmitted(true);

      // Redirect based on role
      if (formData.role === "teacher") {
        setTimeout(() => navigate("/teacher/profile-setup"), 1000);
      } else {
        setTimeout(() => navigate("/learner/assessment"), 1000);
      }
    } catch (error) {
      setErrors({ submit: "حدث خطأ في التسجيل" });
    }
  };

  if (submitted) {
    return (
      <div
        className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-2xl p-8 shadow-xl max-w-md w-full text-center"
        >
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
            <ArrowRight className="w-8 h-8 text-green-700" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            تم التسجيل بنجاح!
          </h2>
          <p className="text-gray-600 mb-6">
            {formData.role === "teacher"
              ? "سيتم توجيهك لإكمال بيانات ملفك الشخصي"
              : "سيتم توجيهك لاختبار المستوى"}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center p-4"
      dir="rtl"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full"
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            إنشاء حساب جديد
          </h1>
          <p className="text-gray-600">انضم إلى منصة مقرأة التعليمية</p>
        </div>

        {/* Role Selection */}
        <div className="mb-6">
          <label className="block text-sm font-bold text-gray-700 mb-3">
            اختر نوع الحساب
          </label>
          <div className="grid grid-cols-2 gap-3">
            {(["learner", "teacher"] as const).map((role) => (
              <button
                key={role}
                onClick={() => setFormData({ ...formData, role })}
                className={`p-4 rounded-lg border-2 font-bold transition ${
                  formData.role === role
                    ? "border-green-700 bg-green-50 text-green-700"
                    : "border-gray-200 bg-white text-gray-600 hover:border-green-200"
                }`}
              >
                {role === "learner" ? "👨‍🎓 متعلم" : "👨‍🏫 معلم"}
              </button>
            ))}
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              الاسم الكامل
            </label>
            <div className="relative">
              <User className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="اسمك الكامل"
              />
            </div>
            {errors.name && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.name}
              </div>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              البريد الإلكتروني
            </label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="your@email.com"
              />
            </div>
            {errors.email && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.email}
              </div>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.password && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              تأكيد كلمة المرور
            </label>
            <div className="relative">
              <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="w-full pr-10 pl-4 py-2 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.confirmPassword}
              </div>
            )}
          </div>

          {/* Show Password */}
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
            <input
              type="checkbox"
              checked={showPassword}
              onChange={(e) => setShowPassword(e.target.checked)}
              className="rounded"
            />
            إظهار كلمة المرور
          </label>

          {/* Submit Error */}
          {errors.submit && (
            <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
              <AlertCircle className="w-4 h-4" />
              {errors.submit}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "جاري التسجيل..." : "إنشاء حساب"}
          </button>
        </form>

        {/* Login Link */}
        <p className="text-center mt-6 text-gray-600">
          هل لديك حساب بالفعل؟{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-green-700 font-bold hover:underline"
          >
            دخول الآن
          </button>
        </p>
      </motion.div>
    </div>
  );
}
