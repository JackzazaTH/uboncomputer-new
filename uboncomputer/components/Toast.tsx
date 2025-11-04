import React, { useState, useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';
import { ToastType } from '../hooks/useToast';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
}

const toastConfig = {
  success: {
    icon: <CheckCircle className="w-6 h-6 text-green-500" />,
    style: 'bg-green-50 border-green-200',
  },
  error: {
    icon: <XCircle className="w-6 h-6 text-red-500" />,
    style: 'bg-red-50 border-red-200',
  },
  info: {
    icon: <Info className="w-6 h-6 text-blue-500" />,
    style: 'bg-blue-50 border-blue-200',
  },
};

const Toast: React.FC<ToastProps> = ({ message, type, onClose }) => {
  const [isExiting, setIsExiting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 5000); // Auto-close after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsExiting(true);
    setTimeout(onClose, 500); // Wait for fade-out animation
  };
  
  const config = toastConfig[type];

  return (
    <div className={`w-full ${config.style} rounded-lg shadow-lg p-4 flex items-start gap-3 border-l-4 ${isExiting ? 'animate-fade-out' : 'animate-slide-in-right'}`}>
      <div className="flex-shrink-0">{config.icon}</div>
      <div className="flex-grow">
        <p className="text-sm font-medium text-gray-800">{message}</p>
      </div>
      <div className="flex-shrink-0">
        <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-200/50">
          <X className="w-4 h-4 text-gray-500" />
        </button>
      </div>
    </div>
  );
};

export default Toast;
