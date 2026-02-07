import { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Send, MessageCircle } from 'lucide-react';
import { ChatMessage } from '../../types';

interface ChatWidgetProps {
  sessionId: string;
  messages: ChatMessage[];
  onSendMessage: (message: string) => void;
  isOpen?: boolean;
  onToggle?: () => void;
}

export function ChatWidget({
  sessionId,
  messages,
  onSendMessage,
  isOpen = true,
  onToggle,
}: ChatWidgetProps) {
  const [newMessage, setNewMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage);
      setNewMessage('');
    }
  };

  if (!isOpen && onToggle) {
    return (
      <motion.button
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 rounded-full bg-green-700 text-white shadow-lg flex items-center justify-center z-40 hover:bg-green-800 transition"
      >
        <MessageCircle className="w-6 h-6" />
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-xl overflow-hidden flex flex-col w-full max-w-md h-[min(500px,calc(100dvh-2rem))] sm:h-[500px]"
      dir="rtl"
    >
      {/* Header */}
      <div className="bg-green-700 text-white p-4 flex items-center justify-between">
        <h3 className="font-bold">الدردشة</h3>
        {onToggle && (
          <button
            onClick={onToggle}
            className="text-white hover:bg-green-600 rounded p-1 transition"
          >
            ✕
          </button>
        )}
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-400">
            <p>لا توجد رسائل بعد</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-2 ${msg.senderId === 'system' ? 'justify-center' : ''}`}
            >
              {msg.messageType === 'zoom_link' ? (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 max-w-xs text-sm">
                  <a
                    href={msg.message}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 font-bold hover:underline break-all"
                  >
                    رابط Zoom
                  </a>
                </div>
              ) : (
                <div
                  className={`rounded-lg p-3 max-w-xs text-sm ${
                    msg.senderId === 'system'
                      ? 'bg-gray-100 text-gray-600 text-xs italic'
                      : 'bg-green-100 text-gray-800'
                  }`}
                >
                  {msg.senderId !== 'system' && (
                    <p className="font-bold text-green-700 text-xs mb-1">{msg.senderName}</p>
                  )}
                  <p className="break-words">{msg.message}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {new Date(msg.timestamp).toLocaleTimeString('ar-SA', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </p>
                </div>
              )}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 p-4 flex gap-2">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleSend();
            }
          }}
          className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:border-green-700 focus:outline-none text-sm"
          placeholder="أكتب رسالتك..."
        />
        <button
          onClick={handleSend}
          className="w-10 h-10 rounded-lg bg-green-700 text-white flex items-center justify-center hover:bg-green-800 transition"
        >
          <Send className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}
