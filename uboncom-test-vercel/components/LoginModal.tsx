
import React, { useState, useEffect, useRef } from 'react';
import { X, User, Lock, LogIn } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface LoginModalProps {
  onClose: () => void;
  onLogin: (user: string, pass: string) => boolean;
}

const LoginModal: React.FC<LoginModalProps> = ({ onClose, onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { addToast } = useToast();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    
    document.body.style.overflow = 'hidden';
    inputRef.current?.focus();

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [onClose]);

  const handleLoginAttempt = () => {
    setError('');
    const success = onLogin(username, password);
    if (!success) {
      setError('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง');
      addToast('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
    } else {
      addToast('เข้าสู่ระบบสำเร็จ!', 'success');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleLoginAttempt();
  };
  
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLoginAttempt();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-[100] flex items-center justify-center p-4 animate-fade-in">
      <div ref={modalRef} className="bg-white rounded-lg shadow-2xl w-full max-w-sm mx-auto relative transform animate-slide-in-up">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-2 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-full transition-colors"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        <div className="p-8">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-2">เข้าสู่ระบบสำหรับพนักงาน</h2>
          <p className="text-center text-gray-500 text-sm mb-6">กรุณากรอกข้อมูลเพื่อเข้าสู่แผงควบคุม</p>
          
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                ref={inputRef}
                type="text" 
                placeholder="ชื่อผู้ใช้" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyDown={handleKeyDown}
                required 
                className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
            </div>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="password" 
                placeholder="รหัสผ่าน" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={handleKeyDown}
                required 
                className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
            </div>

            {error && <p className="text-sm text-red-600 text-center">{error}</p>}
            
            <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
              <LogIn size={20} />
              เข้าสู่ระบบ
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;