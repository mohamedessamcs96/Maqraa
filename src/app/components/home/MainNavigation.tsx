import { BookOpen, Mic, Award, FileText } from 'lucide-react';
import { motion } from 'motion/react';

interface MainNavigationProps {
  activeTab: 'home' | 'review' | 'recitation' | 'memorization' | 'ijazah';
  onTabChange: (tab: 'home' | 'review' | 'recitation' | 'memorization' | 'ijazah') => void;
}

export function MainNavigation({ activeTab, onTabChange }: MainNavigationProps) {
  const tabs = [
    { id: 'review' as const, icon: BookOpen, label: 'مراجعة', arabicLabel: 'مراجعة حفظ' },
    { id: 'recitation' as const, icon: Mic, label: 'تصحيح', arabicLabel: 'تصحيح تلاوة' },
    { id: 'memorization' as const, icon: Award, label: 'حفظ', arabicLabel: 'حفظ جديد' },
    { id: 'ijazah' as const, icon: FileText, label: 'إجازات', arabicLabel: 'برامج الإجازات' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg" dir="rtl">
      <div className="max-w-md mx-auto px-2 py-2 flex justify-around">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <motion.button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              whileTap={{ scale: 0.95 }}
              className={`flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all ${
                isActive
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs font-semibold">{tab.label}</span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
