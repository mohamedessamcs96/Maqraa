import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import {
  ArrowRight,
  Upload,
  AlertCircle,
  User,
  Calendar,
  Globe,
  MapPin,
  FileText,
  CheckCircle,
} from "lucide-react";
import { useAuthContext } from "../../context/AuthContext";
import type { TeacherProfileSetup } from "../../types";
import { storage } from "../../lib/storage";

const languageOptions = ["English", "Arabic", "French", "Urdu", "Turkish"];
const genderOptions = [
  { value: "male", label: "ذكر" },
  { value: "female", label: "أنثى" },
  { value: "other", label: "أخرى" },
];

function makeFakeUploadUrl(filename: string) {
  const safe = filename.trim() || "profile.jpg";
  return `local://uploads/${Date.now()}-${safe}`;
}

export function TeacherProfileSetupPage() {
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [profilePictureId, setProfilePictureId] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [bio, setBio] = useState(user?.bio ?? "");
  const [nationality, setNationality] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [street, setStreet] = useState("");
  const [building, setBuilding] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "other">("male");

  const [submitting, setSubmitting] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState("");

  const [existingSetup, setExistingSetup] =
    useState<TeacherProfileSetup | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!user) return;
    (async () => {
      try {
        const setups = (await storage.getTeacherProfileSetups?.()) ?? [];
        if (!mounted) return;
        const found = setups.find((s) => s.teacherId === user.id) ?? null;
        setExistingSetup(found as any);
        if (found) {
          setProfilePictureId(found.profilePictureId || "");
          setDateOfBirth(found.dateOfBirth || "");
          setSelectedLanguages(found.languages || []);
          setBio(found.bio || user?.bio || "");
          setNationality(found.nationality || "");
          setCountry(found.country || "");
          setCity(found.city || "");
          setStreet(found.street || "");
          setBuilding(found.building || "");
          setPostalCode(found.postalCode || "");
          setGender(found.gender || "male");
        }
      } catch (err) {
        // ignore
      }
    })();
    return () => {
      mounted = false;
    };
  }, [user]);

  const isTeacher = user?.role === "teacher";

  const canSubmit =
    isTeacher &&
    profilePictureId.trim() &&
    dateOfBirth.trim() &&
    selectedLanguages.length > 0 &&
    bio.trim() &&
    nationality.trim() &&
    country.trim() &&
    city.trim() &&
    street.trim() &&
    building.trim() &&
    postalCode.trim() &&
    gender;

  const handleProfilePictureUpload = (file?: File | null) => {
    const filename = file?.name ?? "profile.jpg";
    const url = makeFakeUploadUrl(filename);
    setProfilePictureId(url);
    setUploadedFileName(filename);
  };

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages((prev) =>
      prev.includes(lang) ? prev.filter((l) => l !== lang) : [...prev, lang],
    );
  };

  const handleSubmit = async () => {
    if (!user || !canSubmit) return;

    setSubmitting(true);
    try {
      const now = new Date().toISOString();

      const profileSetup: TeacherProfileSetup = {
        teacherId: user.id,
        profilePictureId,
        dateOfBirth,
        languages: selectedLanguages,
        bio,
        nationality,
        country,
        city,
        street,
        building,
        postalCode,
        gender,
        completedAt: now,
      };

      // Save via storage (may call API)
      const setups = (await storage.getTeacherProfileSetups?.()) ?? [];
      const withoutCurrent = setups.filter((s) => s.teacherId !== user.id);
      await storage.saveTeacherProfileSetups?.([
        profileSetup,
        ...withoutCurrent,
      ]);

      // Navigate to the application page
      navigate("/teacher/apply");
    } finally {
      setSubmitting(false);
    }
  };

  if (!user) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="font-bold text-gray-900">تحتاج لتسجيل الدخول أولاً</p>
          <button
            onClick={() => navigate("/login")}
            className="mt-4 w-full bg-emerald-700 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition"
          >
            تسجيل الدخول
          </button>
        </div>
      </div>
    );
  }

  if (!isTeacher) {
    return (
      <div
        className="min-h-screen bg-gray-50 flex items-center justify-center p-4"
        dir="rtl"
      >
        <div className="bg-white rounded-2xl shadow-lg p-6 max-w-md w-full text-center">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-3" />
          <p className="font-bold text-gray-900">هذه الصفحة للمعلمين فقط</p>
          <button
            onClick={() => navigate("/home")}
            className="mt-4 w-full bg-emerald-700 text-white font-bold py-3 rounded-xl hover:bg-emerald-800 transition"
          >
            العودة للرئيسية
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 p-4 md:p-6"
      dir="rtl"
    >
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="flex items-center gap-2 text-emerald-600 hover:text-emerald-700 mb-4"
          >
            <ArrowRight className="w-4 h-4" />
            العودة
          </button>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            ملف الملف الشخصي
          </h1>
          <p className="text-gray-600">
            أكمل بيانات ملفك الشخصي قبل رفع الوثائق المطلوبة
          </p>
        </motion.div>

        {/* Main Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg p-6 md:p-8"
        >
          <form className="space-y-6">
            {/* Profile Picture Upload */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <div className="flex items-center gap-2 mb-2">
                  <Upload className="w-5 h-5 text-emerald-600" />
                  الصورة الشخصية
                </div>
              </label>
              <div className="border-2 border-dashed border-emerald-200 rounded-xl p-6 text-center hover:border-emerald-400 transition">
                {profilePictureId ? (
                  <div className="flex flex-col items-center gap-2">
                    <CheckCircle className="w-12 h-12 text-green-500" />
                    <p className="text-sm text-gray-600">{uploadedFileName}</p>
                    <p className="text-xs text-gray-500">تم التحميل بنجاح</p>
                    <button
                      type="button"
                      onClick={() => {
                        setProfilePictureId("");
                        setUploadedFileName("");
                      }}
                      className="mt-2 text-xs text-red-600 hover:text-red-700"
                    >
                      غيّر الصورة
                    </button>
                  </div>
                ) : (
                  <label className="cursor-pointer">
                    <Upload className="w-8 h-8 text-emerald-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">
                      اضغط لتحميل الصورة
                    </p>
                    <p className="text-xs text-gray-500 mt-1">JPG أو PNG</p>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        handleProfilePictureUpload(e.target.files?.[0])
                      }
                      className="hidden"
                    />
                  </label>
                )}
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-emerald-600" />
                  تاريخ الميلاد
                </div>
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Languages */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  اللغات
                </div>
              </label>
              <div className="flex flex-wrap gap-3">
                {languageOptions.map((lang) => (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => toggleLanguage(lang)}
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      selectedLanguages.includes(lang)
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
              {selectedLanguages.length > 0 && (
                <p className="text-xs text-gray-500 mt-2">
                  المختارة: {selectedLanguages.join(", ")}
                </p>
              )}
            </div>

            {/* Bio */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  النبذة الشخصية
                </div>
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="اكتب عن نفسك، تخصصاتك، وعلم التجويد الذي تقدمه..."
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Nationality */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-emerald-600" />
                  الجنسية
                </div>
              </label>
              <input
                type="text"
                value={nationality}
                onChange={(e) => setNationality(e.target.value)}
                placeholder="مثال: السعودية"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                required
              />
            </div>

            {/* Address */}
            <div className="border-t pt-6">
              <h3 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <MapPin className="w-5 h-5 text-emerald-600" />
                العنوان
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الدولة
                  </label>
                  <input
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="مثال: السعودية"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المدينة
                  </label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="مثال: الرياض"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الشارع
                  </label>
                  <input
                    type="text"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    placeholder="اسم الشارع"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    المبنى / الرقم
                  </label>
                  <input
                    type="text"
                    value={building}
                    onChange={(e) => setBuilding(e.target.value)}
                    placeholder="رقم المبنى"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    الرمز البريدي
                  </label>
                  <input
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    placeholder="مثال: 11111"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                <div className="flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  الجنس
                </div>
              </label>
              <div className="flex gap-3">
                {genderOptions.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() =>
                      setGender(option.value as "male" | "female" | "other")
                    }
                    className={`px-4 py-2 rounded-lg font-medium transition ${
                      gender === option.value
                        ? "bg-emerald-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6 border-t">
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!canSubmit || submitting}
                className={`w-full py-3 px-4 rounded-lg font-bold flex items-center justify-center gap-2 transition ${
                  canSubmit && !submitting
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {submitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    جاري الحفظ...
                  </>
                ) : (
                  <>
                    المتابعة إلى رفع الوثائق
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>

        {/* Info Box */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 bg-emerald-50 border border-emerald-200 rounded-xl p-4"
        >
          <p className="text-sm text-emerald-800">
            <strong>ملاحظة:</strong> هذه البيانات ستظهر في ملفك الشخصي وستساعد
            الطلاب بفهم خلفيتك بشكل أفضل.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
