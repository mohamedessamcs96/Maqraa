import { useMemo, useState } from 'react';
import { ZoomMeeting } from '../../components/shared/ZoomMeeting';

const MEETING_PRESETS = [
  {
    label: 'جلسة تجريبية (بدون كلمة مرور)',
    meetingId: '12345678901',
    meetingPassword: undefined,
    teacherName: 'أ/ أحمد',
    sessionStartTime: 'الآن',
  },
  {
    label: 'جلسة تجريبية (مع كلمة مرور)',
    meetingId: '98765432109',
    meetingPassword: '112233',
    teacherName: 'أ/ فاطمة',
    sessionStartTime: 'بعد 10 دقائق',
  },
] as const;

export function ZoomTestPage() {
  const [presetIndex, setPresetIndex] = useState(0);

  const preset = useMemo(() => MEETING_PRESETS[presetIndex]!, [presetIndex]);

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      <div className="bg-emerald-600 text-white px-4 py-4">
        <div className="max-w-md mx-auto">
          <p className="text-xs opacity-90">اختبار التكامل</p>
          <h1 className="text-lg font-bold">Zoom Integration Test</h1>
        </div>
      </div>

      <div className="max-w-md mx-auto px-4 py-6 space-y-4">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-4">
          <h2 className="font-bold text-gray-900 mb-2">اختر سيناريو</h2>
          <div className="grid grid-cols-1 gap-2">
            {MEETING_PRESETS.map((p, idx) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setPresetIndex(idx)}
                className={
                  idx === presetIndex
                    ? 'text-right rounded-xl border-2 border-emerald-500 bg-emerald-50 px-3 py-3'
                    : 'text-right rounded-xl border border-gray-200 bg-white hover:bg-gray-50 px-3 py-3'
                }
              >
                <div className="text-sm font-bold text-gray-900">{p.label}</div>
                <div className="text-xs text-gray-600 mt-1">
                  المعلّم: {p.teacherName} • Meeting ID: {p.meetingId}
                </div>
              </button>
            ))}
          </div>

          <p className="text-xs text-gray-500 mt-3">
            ملاحظة: هذا اختبار واجهة فقط. زر “انضم” سيفتح رابط Zoom في تبويب جديد.
          </p>
        </div>

        <ZoomMeeting
          meetingId={preset.meetingId}
          meetingPassword={preset.meetingPassword}
          teacherName={preset.teacherName}
          sessionStartTime={preset.sessionStartTime}
          onJoinClick={() => {
            // Keep it simple: allow the existing component to open a new tab.
            // This callback is here so we can later wire analytics / logging.
            // eslint-disable-next-line no-console
            console.info('[ZoomTest] Join clicked', {
              meetingId: preset.meetingId,
              teacherName: preset.teacherName,
            });
          }}
        />
      </div>
    </div>
  );
}
