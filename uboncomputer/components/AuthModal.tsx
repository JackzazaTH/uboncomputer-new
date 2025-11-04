import React, { useState, useEffect, useRef } from 'react';
import { X, Mail, Lock, User as UserIcon, LogIn } from 'lucide-react';
import AlertModal from './AlertModal';
import { useToast } from '../hooks/useToast';

interface AuthModalProps {
  onClose: () => void;
}

const AuthModal: React.FC<AuthModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const { addToast } = useToast();

  // Close modal on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);
  
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;

    if (email && password) {
      // Simulate success
      addToast('เข้าสู่ระบบสำเร็จ!', 'success');
      onClose();
    } else {
      // Simulate error
      addToast('กรุณากรอกอีเมลและรหัสผ่าน', 'error');
    }
  };

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement)?.value;
    const email = (form.elements.namedItem('email') as HTMLInputElement)?.value;
    const password = (form.elements.namedItem('password') as HTMLInputElement)?.value;
    const confirmPassword = (form.elements.namedItem('confirmPassword') as HTMLInputElement)?.value;
    const terms = (form.elements.namedItem('terms') as HTMLInputElement)?.checked;

    if (!name || !email || !password || !confirmPassword) {
      addToast('กรุณากรอกข้อมูลให้ครบถ้วน', 'error');
      return;
    }
    if (password !== confirmPassword) {
      addToast('รหัสผ่านไม่ตรงกัน', 'error');
      return;
    }
    if (!terms) {
      addToast('กรุณายอมรับข้อตกลงและเงื่อนไข', 'error');
      return;
    }
    // Simulate success
    addToast('สมัครสมาชิกสำเร็จ! กรุณาเข้าสู่ระบบ', 'success');
    setActiveTab('login'); // Switch to login tab after successful registration
  };


  const TabButton: React.FC<{ tab: 'login' | 'register'; label: string }> = ({ tab, label }) => (
    <button
      onClick={() => setActiveTab(tab)}
      className={`w-1/2 pb-3 font-bold text-center border-b-2 transition-colors ${
        activeTab === tab
          ? 'text-orange-500 border-orange-500'
          : 'text-gray-500 border-gray-200 hover:border-gray-400'
      }`}
    >
      {label}
    </button>
  );

  const SocialButton: React.FC<{ provider: string; children: React.ReactNode }> = ({ provider, children }) => (
    <button 
      onClick={() => setIsAlertOpen(true)}
      type="button"
      className="flex-1 flex items-center justify-center gap-2 py-2.5 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors text-sm font-medium">
      {children}
      {provider}
    </button>
  );

  return (
    <>
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
            <div className="flex border-b mb-6">
              <TabButton tab="login" label="เข้าสู่ระบบ" />
              <TabButton tab="register" label="สมัครสมาชิก" />
            </div>

            {activeTab === 'login' ? (
              <form className="space-y-5" onSubmit={handleLoginSubmit}>
                <h2 className="text-xl font-bold text-center text-gray-800 mb-2">ยินดีต้อนรับกลับมา!</h2>
                <p className="text-center text-gray-500 text-sm mb-6">เข้าสู่ระบบเพื่อดำเนินการต่อ</p>
                
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" name="email" placeholder="อีเมล" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" name="password" placeholder="รหัสผ่าน" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>
                <div className="text-right">
                  <a href="#" className="text-sm text-orange-600 hover:underline">ลืมรหัสผ่าน?</a>
                </div>
                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center gap-2">
                  <LogIn size={20} />
                  เข้าสู่ระบบ
                </button>
                
                <div className="flex items-center my-6">
                  <hr className="flex-grow border-gray-300" />
                  <span className="mx-4 text-sm text-gray-500">หรือเข้าสู่ระบบด้วย</span>
                  <hr className="flex-grow border-gray-300" />
                </div>

                <div className="flex gap-4">
                    <SocialButton provider="Google">
                        <svg className="w-5 h-5" viewBox="0 0 48 48"><path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571l6.19,5.238C41.38,36.128,44,30.638,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path></svg>
                    </SocialButton>
                    <SocialButton provider="Facebook">
                        <svg className="w-5 h-5 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"></path></svg>
                    </SocialButton>
                </div>
              </form>
            ) : (
              <form className="space-y-5" onSubmit={handleRegisterSubmit}>
                 <h2 className="text-xl font-bold text-center text-gray-800 mb-2">สร้างบัญชีใหม่</h2>
                 <p className="text-center text-gray-500 text-sm mb-6">เริ่มใช้งาน Uboncomputer วันนี้!</p>
                
                <div className="relative">
                  <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="text" name="name" placeholder="ชื่อ-นามสกุล" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="email" name="email" placeholder="อีเมล" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" name="password" placeholder="รหัสผ่าน" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>
                 <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input type="password" name="confirmPassword" placeholder="ยืนยันรหัสผ่าน" required className="w-full border border-gray-300 rounded-md py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-orange-500 bg-white text-gray-900 placeholder:text-gray-500" />
                </div>

                <div className="flex items-start">
                    <input id="terms" name="terms" type="checkbox" required className="h-4 w-4 mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500" />
                    <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                      ฉันยอมรับ <a href="#" className="font-medium text-orange-600 hover:underline">ข้อตกลงการใช้งาน</a> และ <a href="#" className="font-medium text-orange-600 hover:underline">นโยบายความเป็นส่วนตัว</a>
                    </label>
                </div>

                <button type="submit" className="w-full bg-orange-500 text-white font-bold py-3 rounded-md hover:bg-orange-600 transition-colors">สมัครสมาชิก</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <AlertModal 
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="ยังไม่พร้อมใช้งาน"
        message="ฟีเจอร์นี้ยังไม่เปิดให้บริการ ขออภัยในความไม่สะดวกครับ กรุณาเข้าสู่ระบบโดยการสมัครสมาชิกหรือล็อกอิน"
      />
    </>
  );
};

export default AuthModal;