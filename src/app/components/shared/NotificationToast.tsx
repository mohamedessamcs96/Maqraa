import { Notification } from '../../types';
import { X, Bell, CheckCircle, AlertCircle, Info } from 'lucide-react';

interface NotificationProps {
  notification: Notification;
  onDismiss: () => void;
}

export function NotificationToast({ notification, onDismiss }: NotificationProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'session_confirmed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'document_approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'session_reminder':
        return <AlertCircle className="w-5 h-5 text-blue-600" />;
      case 'payment_received':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  return (
    <div className="fixed bottom-4 right-4 max-w-sm bg-white rounded-lg shadow-lg p-4 flex items-start gap-4 z-50 animate-slide-in">
      {getIcon()}
      <div className="flex-1">
        <h3 className="font-bold text-gray-900">{notification.title}</h3>
        <p className="text-sm text-gray-600">{notification.message}</p>
      </div>
      <button onClick={onDismiss} className="text-gray-400 hover:text-gray-600">
        <X className="w-5 h-5" />
      </button>
    </div>
  );
}
