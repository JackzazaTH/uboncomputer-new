
import React from 'react';
import { PromoBanner } from '../types';
import { ArrowRight } from 'lucide-react';

interface PromoBannersProps {
  banners: PromoBanner[];
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="py-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((promo) => (
            <a 
              href={promo.link} 
              key={promo.id} 
              className="relative block rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-2 border border-gray-100"
            >
              <div className="relative overflow-hidden bg-gray-200 aspect-[21/9] md:aspect-auto md:h-56">
                  <img 
                    src={promo.src} 
                    alt={promo.alt} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-[150%] bg-gradient-to-r from-transparent via-white/30 to-transparent group-hover:translate-x-[150%] transition-transform duration-1000 ease-in-out z-10 pointer-events-none"></div>
                  
                  {/* View Detail Badge */}
                  <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 z-20">
                      <span className="flex items-center gap-1 bg-white/95 backdrop-blur-md text-xs font-bold text-gray-900 px-4 py-2 rounded-full shadow-lg">
                          ดูรายละเอียด <ArrowRight size={12} className="text-orange-500" />
                      </span>
                  </div>
              </div>
            </a>
          ))}
        </div>
    </section>
  );
};

export default PromoBanners;
