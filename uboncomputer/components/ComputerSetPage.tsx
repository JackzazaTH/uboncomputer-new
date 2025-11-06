

import React, { useRef } from 'react';
import { ComputerSetGroup } from '../types';
import ComputerSetCard from './ComputerSetCard';
import { Page } from '../types';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface ComputerSetPageProps {
    onNavigate: (page: Page) => void;
    groups: ComputerSetGroup[];
}

const ComputerSetPage: React.FC<ComputerSetPageProps> = ({ onNavigate, groups }) => {
    const scrollRefs = useRef<Array<React.RefObject<HTMLDivElement>>>(
        groups.map(() => React.createRef())
    );

    const handleScroll = (index: number, direction: 'left' | 'right') => {
        const scroller = scrollRefs.current[index]?.current;
        if (scroller) {
            const scrollAmount = scroller.clientWidth * 0.9; // Scroll by 90% of the visible width
            scroller.scrollBy({
                left: direction === 'left' ? -scrollAmount : scrollAmount,
                behavior: 'smooth',
            });
        }
    };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Main Banner */}
        <div className="mb-8">
          <img src="https://www.img.in.th/images/220268482a5c48b26f582d02c525f9b4.png" alt="Spooky Special" className="w-full rounded-lg" />
        </div>

        {/* Info Section */}
        <section className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-bold text-gray-800">Ubon Computer คอมพิวเตอร์ประกอบสำหรับเล่นเกม ราคาถูก อัปเดตล่าสุด {new Date().getFullYear()}</h2>
            <p className="mt-2 max-w-3xl mx-auto text-gray-600 text-sm">
            Ubon Computer จัดสเปคคอมพิวเตอร์ประกอบสำหรับเล่นเกมระดับ Hi-End พร้อมให้คำปรึกษา แก้ไขปัญหาและอัปเกรดคอมพิวเตอร์ของท่านให้ทันสมัย พร้อมบริการหลังการขายที่ดีเยี่ยม
            </p>
            <button onClick={() => onNavigate('pcBuilder')} className="mt-4 inline-block bg-red-600 text-white font-bold py-2 px-6 rounded-md hover:bg-red-700 transition-colors">
                จัดสเปคคอมพิวเตอร์เซต
            </button>
        </section>

        {/* Secondary Banners */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            <a href="#"><img src="https://www.img.in.th/images/1545934421b473da6d302927c3f0b2da.png" alt="Monthly Computer Set" className="rounded-lg w-full" /></a>
            <a href="#"><img src="https://www.img.in.th/images/7356c3674681329a6568853b038c353c.png" alt="Computer Set Promotion" className="rounded-lg w-full" /></a>
        </div>
        
        {/* Product Groups */}
        <div className="space-y-16">
            {groups.map((group, index) => (
                <section key={group.id}>
                    <div className="mb-6">
                        <img src={group.bannerUrl} alt="Promotion Banner" className="rounded-lg w-full" />
                    </div>
                    <div className="relative group/carousel">
                         <button 
                            onClick={() => handleScroll(index, 'left')}
                            className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all -translate-x-4 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
                            aria-label="Previous set"
                            >
                            <ChevronLeft className="w-6 h-6 text-gray-800" />
                        </button>
                        
                        <div 
                            ref={scrollRefs.current[index]}
                            className="flex items-stretch overflow-x-auto scroll-smooth gap-4 pb-4 -mx-2 px-2"
                            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                        >
                            {group.products.map(product => (
                                <div key={product.id} className="flex-shrink-0 w-[80%] sm:w-[45%] md:w-[31.5%] lg:w-[24%]">
                                    <ComputerSetCard product={product} />
                                </div>
                            ))}
                        </div>

                        <button 
                            onClick={() => handleScroll(index, 'right')}
                            className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-all translate-x-4 opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
                            aria-label="Next set"
                            >
                            <ChevronRight className="w-6 h-6 text-gray-800" />
                        </button>
                    </div>
                </section>
            ))}
        </div>

      </div>
    </div>
  );
};

export default ComputerSetPage;