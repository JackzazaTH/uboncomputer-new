import React from 'react';
import { Facebook, Youtube } from 'lucide-react';
import { Page, NavigateFunction } from '../types';

interface FooterProps {
    onAdminLoginClick: () => void;
    onNavigate: NavigateFunction;
}

const TiktokIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
        {...props}
    >
      <path d="M21 8a5 5 0 0 0-5-5h-1v11a4 4 0 1 1-4-4" />
    </svg>
);


const Footer: React.FC<FooterProps> = ({ onAdminLoginClick, onNavigate }) => {
  const links: { [key: string]: { name: string; page?: Page; action?: () => void }[] } = {
    'ช่วยเหลือ': [
        { name: 'คำถามที่พบบ่อย', page: 'faq' },
        { name: 'สถานะการสั่งซื้อ', page: 'orderStatus' },
        { name: 'การจัดส่ง', page: 'shipping' },
        { name: 'การคืนสินค้า', page: 'returns' },
    ],
    'บริษัท': [
        { name: 'เกี่ยวกับเรา', page: 'about' },
        { name: 'ร่วมงานกับเรา', page: 'careers' },
        { name: 'เข้าสู่ระบบสำหรับพนักงาน', action: onAdminLoginClick },
        { name: 'ติดต่อเรา', page: 'contact' },
    ],
    'กฎหมาย': [
        { name: 'นโยบายความเป็นส่วนตัว', page: 'privacy' },
        { name: 'ข้อกำหนดการใช้งาน', page: 'terms' },
        { name: 'นโยบายคุกกี้', page: 'cookies' },
    ],
  };

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="mb-8 md:mb-0">
             <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-3xl font-bold text-white tracking-wider mb-4 inline-block text-left">
                UBON<span className="text-orange-500">COMPUTER</span>
              </a>
            <p className="max-w-xs text-sm">ร้านค้าออนไลน์ชั้นนำสำหรับส่วนประกอบคอมพิวเตอร์และอุปกรณ์ไอที</p>
          </div>

          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="font-bold text-white mb-4 uppercase tracking-wider text-sm">{title}</h4>
              <ul className="space-y-3">
                {items.map(item => (
                  <li key={item.name}>
                    {item.action ? (
                        <button onClick={item.action} className="hover:text-orange-400 transition-colors text-sm text-left w-full">
                            {item.name}
                        </button>
                    ) : (
                        <a href="#" onClick={(e) => { e.preventDefault(); item.page && onNavigate(item.page); }} className="hover:text-orange-400 transition-colors text-sm text-left w-full">
                            {item.name}
                        </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-center sm:text-left mb-4 sm:mb-0">
             <p>&copy; {new Date().getFullYear()} Uboncomputer. สงวนลิขสิทธิ์</p>
          </div>
          <div className="flex space-x-5">
            <a href="#" className="hover:text-orange-400 transition-colors"><Facebook size={22} /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><Youtube size={22} /></a>
            <a href="#" className="hover:text-orange-400 transition-colors"><TiktokIcon /></a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;