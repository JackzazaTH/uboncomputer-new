
import React from 'react';
import { Facebook, Youtube } from 'lucide-react';
import { Page, SocialLink, SocialPlatform, Branding } from '../types';

interface FooterProps {
    onAuthClick: () => void;
    onNavigate: (page: Page) => void;
    socialLinks: SocialLink[];
    branding?: Branding;
}

interface LinkItem {
    name: string;
    page?: Page;
    action?: () => void;
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


const Footer: React.FC<FooterProps> = ({ onAuthClick, onNavigate, socialLinks, branding }) => {
  
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

  const logoTextFirst = branding?.logoTextFirst || 'UBON';
  const logoTextSecond = branding?.logoTextSecond || 'COMPUTER';
  const subtitle = branding?.subtitle || 'Technology Store';
  const logoInitial = branding?.logoTextFirst ? branding.logoTextFirst.charAt(0).toUpperCase() : 'U';

  return (
    <footer className="bg-[#0b1120] text-slate-400 pt-20 pb-12 relative overflow-hidden border-t border-slate-800">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-orange-500/5 blur-[100px] rounded-full pointer-events-none"></div>
      
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Brand Column */}
          <div className="lg:col-span-4 pr-0 lg:pr-8">
             <button onClick={() => onNavigate('home')} className="group mb-6 block">
                <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl shadow-lg shadow-orange-500/20 ring-1 ring-white/10">
                        {logoInitial}
                    </div>
                    <div className="flex flex-col items-start leading-none">
                        <span className="text-2xl font-black text-white tracking-tight uppercase">{logoTextFirst}<span className="text-orange-500">{logoTextSecond}</span></span>
                        <span className="text-[10px] tracking-[0.3em] uppercase text-slate-500 font-bold mt-1">{subtitle}</span>
                    </div>
                </div>
             </button>
            <p className="text-sm leading-7 text-slate-400 mb-8 font-light">
                ร้านค้าอุปกรณ์ไอทีครบวงจรที่คุณไว้วางใจได้ จัดสเปคคอมพิวเตอร์ ประกอบคอมคุณภาพเยี่ยม พร้อมบริการหลังการขายที่ใส่ใจที่สุดในอุบลราชธานี และจัดส่งทั่วประเทศ
            </p>
            <div className="flex space-x-3">
                {socialLinks.map(link => (
                    <a 
                        key={link.id} 
                        href={link.url} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="w-10 h-10 rounded-full bg-slate-800/50 border border-slate-700 flex items-center justify-center hover:bg-orange-600 hover:border-orange-500 hover:text-white transition-all duration-300 hover:-translate-y-1"
                    >
                        {socialIcons[link.platform]}
                    </a>
                ))}
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-8 grid grid-cols-2 sm:grid-cols-3 gap-8 lg:gap-12">
            {Object.entries(links).map(([title, items]) => (
                <div key={title}>
                <h4 className="font-bold text-white mb-6 uppercase tracking-wider text-xs text-orange-500">{title}</h4>
                <ul className="space-y-3">
                    {items.map(item => (
                    <li key={item.name}>
                        {item.action ? (
                            <button onClick={item.action} className="text-sm text-slate-400 hover:text-white transition-colors text-left w-full hover:translate-x-1 duration-200 inline-block py-0.5 font-medium">
                                {item.name}
                            </button>
                        ) : (
                            <button onClick={() => onNavigate(item.page!)} className="text-sm text-slate-400 hover:text-white transition-colors text-left w-full hover:translate-x-1 duration-200 inline-block py-0.5 font-medium">
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

        <div className="mt-20 pt-8 border-t border-slate-800/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xs text-slate-500 text-center md:text-left font-medium">
             <p>&copy; {new Date().getFullYear()} {logoTextFirst}{logoTextSecond} Co., Ltd. All rights reserved.</p>
          </div>
          <div className="flex items-center gap-3 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
              <div className="h-7 bg-white/5 border border-white/10 rounded px-2 flex items-center justify-center"><span className="text-[10px] font-bold text-slate-300">VISA</span></div>
              <div className="h-7 bg-white/5 border border-white/10 rounded px-2 flex items-center justify-center"><span className="text-[10px] font-bold text-slate-300">Mastercard</span></div>
              <div className="h-7 bg-white/5 border border-white/10 rounded px-2 flex items-center justify-center"><span className="text-[10px] font-bold text-slate-300">PromptPay</span></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
