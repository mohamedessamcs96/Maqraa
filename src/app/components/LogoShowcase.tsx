import { Logo } from '@/app/components/Logo';

export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8" dir="rtl">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-800 mb-2 text-center">شعار منصة مقرأة</h1>
        <p className="text-gray-600 text-center mb-12">هوية بصرية متكاملة</p>

        {/* Main Logo Display */}
        <div className="bg-white rounded-3xl shadow-xl p-12 mb-8">
          <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
            {/* Light background version */}
            <div className="flex-1 text-center">
              <h3 className="text-lg font-bold text-gray-700 mb-6">نسخة الخلفية الفاتحة</h3>
              <div className="bg-white p-8 rounded-2xl border-2 border-gray-200">
                <Logo size={140} showText={true} variant="dark" />
              </div>
            </div>

            {/* Dark background version */}
            <div className="flex-1 text-center">
              <h3 className="text-lg font-bold text-gray-700 mb-6">نسخة الخلفية الداكنة</h3>
              <div className="bg-gradient-to-br from-emerald-600 to-teal-700 p-8 rounded-2xl">
                <Logo size={140} showText={true} variant="light" />
              </div>
            </div>
          </div>
        </div>

        {/* Logo Variations */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* Icon only */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-sm font-bold text-gray-700 mb-6">الشعار فقط</h3>
            <div className="flex justify-center">
              <Logo size={100} showText={false} variant="dark" />
            </div>
          </div>

          {/* Small size */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-sm font-bold text-gray-700 mb-6">حجم صغير</h3>
            <div className="flex justify-center">
              <Logo size={80} showText={true} variant="dark" />
            </div>
          </div>

          {/* Large size */}
          <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
            <h3 className="text-sm font-bold text-gray-700 mb-6">حجم كبير</h3>
            <div className="flex justify-center">
              <Logo size={120} showText={true} variant="dark" />
            </div>
          </div>
        </div>

        {/* Brand Colors */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">الألوان الأساسية</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 mb-3 shadow-md"></div>
              <p className="font-medium text-gray-800">أخضر زمردي</p>
              <p className="text-sm text-gray-500">#10b981</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-teal-600 to-teal-700 mb-3 shadow-md"></div>
              <p className="font-medium text-gray-800">أخضر فيروزي</p>
              <p className="text-sm text-gray-500">#0d9488</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 mb-3 shadow-md"></div>
              <p className="font-medium text-gray-800">ذهبي (نور)</p>
              <p className="text-sm text-gray-500">#f59e0b</p>
            </div>
            <div className="text-center">
              <div className="w-full h-24 rounded-xl bg-white border-2 border-gray-300 mb-3 shadow-md"></div>
              <p className="font-medium text-gray-800">أبيض نقي</p>
              <p className="text-sm text-gray-500">#ffffff</p>
            </div>
          </div>
        </div>

        {/* Brand Identity */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">هوية العلامة التجارية</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl">
              <div className="w-10 h-10 bg-emerald-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                م
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">اسم المنصة: مقرأة</h3>
                <p className="text-gray-600 text-sm">منصة قرآنية رقمية تربط الطلاب بحفاظ القرآن والمجازين في الإقراء</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl">
              <div className="w-10 h-10 bg-amber-600 text-white rounded-lg flex items-center justify-center flex-shrink-0 font-bold">
                ن
              </div>
              <div>
                <h3 className="font-bold text-gray-800 mb-1">الشعار: نورٌ يُتلى</h3>
                <p className="text-gray-600 text-sm">يعبر عن القرآن الكريم كنور يضيء القلوب من خلال التلاوة</p>
              </div>
            </div>

            <div className="p-4 bg-gray-50 rounded-xl">
              <h3 className="font-bold text-gray-800 mb-2">القيم الأساسية</h3>
              <div className="grid md:grid-cols-3 gap-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-emerald-700">تعظيم القرآن</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-emerald-700">الإتقان</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-emerald-700">اليسر</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-emerald-700">الموثوقية</p>
                </div>
                <div className="bg-white p-3 rounded-lg border border-gray-200">
                  <p className="font-medium text-emerald-700">الشمولية</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Logo Concept Explanation */}
        <div className="bg-gradient-to-br from-emerald-600 to-teal-700 text-white rounded-2xl shadow-lg p-8 mt-8">
          <h2 className="text-2xl font-bold mb-6">مفهوم الشعار</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">📖</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">الكتاب المفتوح</h3>
                <p className="text-white/90 text-sm">يمثل القرآن الكريم مفتوحاً للجميع، متاحاً للتعلم والتلاوة</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">✨</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">أشعة النور</h3>
                <p className="text-white/90 text-sm">تمثل النور المنبعث من القرآن الكريم الذي ينير القلوب والعقول</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🎨</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">الألوان الإسلامية</h3>
                <p className="text-white/90 text-sm">الأخضر الزمردي يرمز للإسلام والنماء، والذهبي يمثل النور والتميز</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-sm">🔄</span>
              </div>
              <div>
                <h3 className="font-bold mb-1">الحركة والديناميكية</h3>
                <p className="text-white/90 text-sm">التصميم المتحرك يعكس الحياة والنشاط في رحلة التعلم القرآني</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
