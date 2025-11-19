
import React from 'react';
import { Facebook, Youtube } from 'lucide-react';
import { Page, SocialLink, SocialPlatform } from '../types';

interface FooterProps {
    onAuthClick: () => void;
    onNavigate: (page: Page) => void;
    socialLinks: SocialLink[];
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


const Footer: React.FC<FooterProps> = ({ onAuthClick, onNavigate, socialLinks }) => {
  interface LinkItem {
    name: string;
    page?: Page;
    action?: () => void;
  }

  const links: Record<string, LinkItem[]> = {
    'ช่วยเหลือ': [
        { name: 'คำถามที่พบบ่อย', page: 'faq' },
        { name: 'สถานะการสั่งซื้อ', page: 'orderStatus' },
        { name: 'การจัดส่ง', page: 'shipping' },
        { name: 'การคืนสินค้า', page: 'returns' },
    ],
    'บริษัท': [
        { name: 'เกี่ยวกับเรา', page: 'about' },
        { name: 'รีวิวจากลูกค้า', page: 'reviews' },
        { name: 'ร่วมงานกับเรา', page: 'careers' },
        { name: 'เข้าสู่ระบบ (พนักงาน/ลูกค้า)', action: onAuthClick },
        { name: 'ติดต่อเรา', page: 'contact' },
    ],
    'กฎหมาย': [
        { name: 'นโยบายความเป็นส่วนตัว', page: 'privacy' },
        { name: 'ข้อกำหนดการใช้งาน', page: 'terms' },
        { name: 'นโยบายคุกกี้', page: 'cookies' },
    ],
  };

  const socialIcons: Record<SocialPlatform, React.ReactNode> = {
    Facebook: <Facebook size={20} />,
    Youtube: <Youtube size={20} />,
    Tiktok: <TiktokIcon />,
  };

  return (
    <footer className="bg-[#111827] text-gray-400 border-t border-orange-600/30 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/4 w-1/2 h-1 bg-orange-500/20 blur-xl"></div>
      
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12">
          {/* Brand Column */}
          <div className="lg:col-span-4 mb-8 lg:mb-0">
             <button onClick={() => onNavigate('home')} className="group mb-6 block">
                <div className="flex items-center gap-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20">U</div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-2xl font-bold text-white tracking-tight">UBON<span className="text-orange-500">COMPUTER</span></span>
                    </div>
                </div>
             </button>
            <p className="text-sm leading-relaxed text-gray-400 mb-6 max-w-sm">
                ร้านค้าอุปกรณ์ไอทีครบวงจรที่คุณไว้วางใจได้ จัดสเปคคอมพิวเตอร์ ประกอบคอมคุณภาพเยี่ยม พร้อมบริการหลังการขายที่ใส่ใจ
            </p>
            <div className="flex space-x-3">
                {socialLinks.map(link => (
                    <a 
                        key={link.id} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-orange-600 hover:text-white transition-all duration-300"
                    >
                        {socialIcons[link.platform]}
                    </a>
                ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8">
            {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs border-b border-gray-800 pb-2 inline-block">{title}</h4>
                <ul className="space-y-3">
                    {items.map(item => (
                    <li key={item.name}>
                        {item.action ? (
                            <button onClick={item.action} className="text-sm hover:text-orange-400 transition-colors text-left w-full hover:translate-x-1 duration-200 inline-block">
                                {item.name}
                            </button>
                        ) : (
                            <button onClick={() => onNavigate(item.page!)} className="text-sm hover:text-orange-400 transition-colors text-left w-full hover:translate-x-1 duration-200 inline-block">
                                {item.name}
                            </button>
                        )}
                    </li>
                    ))}
                </ul>
                </div>
            ))}
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="text-xs text-gray-500 text-center sm:text-left">
             <p>&copy; {new Date().getFullYear()} Ubon Computer Co., Ltd. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-4 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
              {/* Payment Icons Placeholders */}
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center"><span className="text-[8px] font-bold text-blue-800">VISA</span></div>
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center"><span className="text-[8px] font-bold text-red-600">Master</span></div>
              <div className="h-6 w-10 bg-white rounded px-1 flex items-center justify-center"><span className="text-[8px] font-bold text-blue-500">Pay</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
