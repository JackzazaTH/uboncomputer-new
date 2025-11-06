import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Send, ArrowLeft } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface ForgotPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onBackToLogin: () => void;
}

const ForgotPasswordModal: React.FC<ForgotPasswordModalProps> = ({ isOpen, onClose, onBackToLogin }) => {
  const [email, setEmail] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    if (!isOpen) return;

    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Simulate sending reset link
      addToast('หากอีเมลของท่านมีอยู่ในระบบ เราได้ส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้แล้ว', 'success');
      onClose(); // Close this modal after submission
    } else {
      addToast('กรุณากรอกอีเมลของคุณ', 'error');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div ref={modalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-md mx-auto relative transform animate-slide-in-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <h2 className="text-xl font-bold text-center text-gray-800 mb-2">ลืมรหัสผ่าน</h2>
            <p className="text-center text-gray-500 text-sm mb-6">
              กรุณากรอกอีเมลที่ท่านใช้ลงทะเบียน เราจะส่งลิงก์สำหรับรีเซ็ตรหัสผ่านไปให้
            </p>
            
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                ref={inputRef}
                type="email" 
                name="email" 
                placeholder="อีเมล" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
                className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" 
              />
            </div>
            
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              <Send size={20} />
              ส่งลิงก์รีเซ็ตรหัสผ่าน
            </button>
            
            <div className="text-center">
              <button 
                type="button" 
                onClick={onBackToLogin}
                className="text-sm text-orange-600 hover:underline flex items-center justify-center mx-auto"
              >
                <ArrowLeft size={16} className="mr-1" />
                กลับไปหน้าเข้าสู่ระบบ
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordModal;
