// src/components/Notification.tsx
import React from 'react';

interface NotificationProps {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ message, type, onClose }) => {
  return (
    <div
      className={`fixed bottom-4 right-4 p-4 rounded shadow-lg ${
        type === 'success' ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'
      }`}
    >
      <span>{message}</span>
      <button onClick={onClose} className="ml-2 text-lg font-bold">
        &times;
      </button>
    </div>
  );
};

export default Notification;
