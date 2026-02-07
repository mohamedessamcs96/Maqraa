import { motion } from 'motion/react';
import { Video, Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface ZoomMeetingProps {
  meetingId: string;
  meetingPassword?: string;
  teacherName: string;
  sessionStartTime?: string;
  onJoinClick?: () => void;
}

export function ZoomMeeting({
  meetingId,
  meetingPassword,
  teacherName,
  sessionStartTime,
  onJoinClick,
}: ZoomMeetingProps) {
  const [copied, setCopied] = useState(false);

  const zoomUrl = `https://zoom.us/wc/join/${meetingId}`;

  const handleCopyMeetingId = () => {
    navigator.clipboard.writeText(meetingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleJoinMeeting = () => {
    if (onJoinClick) {
      onJoinClick();
    }
    // In production, this would open the Zoom app or web interface
    window.open(zoomUrl, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 border-2 border-blue-200"
    >
      <div className="flex items-start gap-4">
        <div className="bg-blue-500 text-white p-3 rounded-lg">
          <Video className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-gray-900 mb-1">
            جلسة Zoom مع {teacherName}
          </h3>
          {sessionStartTime && (
            <p className="text-sm text-gray-600 mb-4">
              وقت البدء: {sessionStartTime}
            </p>
          )}
          
          <div className="bg-white rounded-lg p-4 mb-4 space-y-3">
            <div>
              <p className="text-xs text-gray-500 mb-1">معرف الاجتماع</p>
              <div className="flex items-center gap-2">
                <code className="bg-gray-100 px-3 py-2 rounded font-mono text-sm font-bold">
                  {meetingId}
                </code>
                <button
                  onClick={handleCopyMeetingId}
                  className="p-2 hover:bg-gray-200 rounded transition"
                  title="نسخ معرف الاجتماع"
                >
                  {copied ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <Copy className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {meetingPassword && (
              <div>
                <p className="text-xs text-gray-500 mb-1">كلمة المرور</p>
                <code className="bg-gray-100 px-3 py-2 rounded font-mono text-sm font-bold">
                  {meetingPassword}
                </code>
              </div>
            )}
          </div>

          <button
            onClick={handleJoinMeeting}
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
          >
            <Video className="w-5 h-5" />
            انضم إلى الاجتماع الآن
          </button>

          <p className="text-xs text-gray-600 mt-3 text-center">
            أو انسخ معرف الاجتماع والصقه في تطبيق Zoom على جهازك
          </p>
        </div>
      </div>
    </motion.div>
  );
}
