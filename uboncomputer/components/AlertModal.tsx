import React, { useEffect, useRef } from 'react';
import { X, Info } from 'lucide-react';

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
}

const AlertModal: React.FC<AlertModalProps> = ({ isOpen, onClose, title, message }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);
  
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-[110] flex items-center justify-center p-4 animate-fade-in">
      <div ref={modalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-auto relative transform animate-slide-in-up text-center p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>
        
        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 mb-4">
            <Info className="h-6 w-6 text-orange-600" aria-hidden="true" />
        </div>

        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
        <p className="text-gray-600 mt-2">{message}</p>

        <div className="mt-6">
          <button
            type="button"
            onClick={onClose}
            className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-orange-600 text-base font-medium text-white hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 sm:text-sm"
          >
            ตกลง
          </button>
        </div>
      </div>
    </div>
  );
};

export default AlertModal;
