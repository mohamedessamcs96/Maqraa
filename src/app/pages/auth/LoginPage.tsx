import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Lock, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { login, isLoading } = useAuth();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.includes('@')) {
      newErrors.email = 'البريد الإلكتروني غير صحيح';
    }

    if (formData.password.length < 6) {
      newErrors.password = 'كلمة المرور غير صحيحة';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoggingIn(true);
    try {
      await login(formData.email, formData.password);

      // Simulate role detection
      let redirectPath = '/learner/dashboard';
      if (formData.email.includes('teacher')) {
        redirectPath = '/teacher/dashboard';
      } else if (formData.email.includes('admin')) {
        redirectPath = '/admin/dashboard';
      }

      setTimeout(() => onNavigate(redirectPath), 500);
    } catch (error) {
      setErrors({ submit: 'البريد أو كلمة المرور غير صحيحة' });
    } finally {
      setIsLoggingIn(false);
    }
  };

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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">دخول الحساب</h1>
          <p className="text-gray-600">أدخل بيانات حسابك للمتابعة</p>
        </div>

        {/* Demo Credentials */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6 text-sm">
          <p className="font-bold text-blue-900 mb-2">بيانات تجريبية:</p>
          <div className="space-y-1 text-blue-800 text-xs">
            <p>متعلم: user@example.com</p>
            <p>معلم: teacher@example.com</p>
            <p>إدارة: admin@example.com</p>
            <p>كلمة المرور: 123456</p>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
            <div className="relative">
              <Mail className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
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
            <div className="flex items-center justify-between mb-2">
              <label className="text-sm font-bold text-gray-700">كلمة المرور</label>
              <button
                type="button"
                onClick={() => onNavigate('/forgot-password')}
                className="text-sm text-green-700 hover:underline"
              >
                نسيت كلمة المرور؟
              </button>
            </div>
            <div className="relative">
              <Lock className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pr-10 pl-10 py-2 border-2 border-gray-200 rounded-lg focus:border-green-700 focus:outline-none"
                placeholder="••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-3 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <div className="flex items-center gap-2 mt-1 text-red-600 text-sm">
                <AlertCircle className="w-4 h-4" />
                {errors.password}
              </div>
            )}
          </div>

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
            disabled={isLoading || isLoggingIn}
            className="w-full py-3 bg-green-700 text-white font-bold rounded-lg hover:bg-green-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoggingIn || isLoading ? 'جاري الدخول...' : 'دخول'}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="text-center mt-6 text-gray-600">
          ليس لديك حساب؟{' '}
          <button
            onClick={() => onNavigate('/signup')}
            className="text-green-700 font-bold hover:underline"
          >
            إنشاء حساب جديد
          </button>
        </p>

        {/* Or continue as guest */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <button
            onClick={() => onNavigate('/learner/teachers')}
            className="w-full py-2 text-gray-700 font-semibold border border-gray-200 rounded-lg hover:bg-gray-50 transition"
          >
            المتابعة كزائر
          </button>
        </div>
      </motion.div>
    </div>
  );
}
