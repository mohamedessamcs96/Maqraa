import React from 'react';

interface MobileAppContainerProps {
  children: React.ReactNode;
}

export function MobileAppContainer({ children }: MobileAppContainerProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-2 md:p-4">
      {/* Mobile Phone Frame */}
      <div className="w-full max-w-md relative">
        {/* Phone Notch/Status Bar Area */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-black rounded-b-3xl z-50 flex items-center justify-center">
          <div className="flex items-center justify-between w-full px-6 text-white text-xs">
            <span>9:41</span>
            <div className="flex gap-1">
              <span>📶</span>
              <span>📡</span>
              <span>🔋</span>
            </div>
          </div>
        </div>

        {/* Phone Screen */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden relative pt-8" style={{
          aspectRatio: '9/20',
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
        }}>
          {/* Screen Content */}
          <div className="h-full overflow-y-auto">
            {children}
          </div>

          {/* Phone Bottom Bezel */}
          <div className="absolute bottom-0 left-0 right-0 h-6 bg-black rounded-t-3xl" />
        </div>

        {/* Phone Side Bezel */}
        <div className="absolute top-12 left-0 w-1 h-12 bg-gray-800 rounded-r" />
        <div className="absolute top-32 right-0 w-1 h-8 bg-gray-800 rounded-l" />
      </div>
    </div>
  );
}
