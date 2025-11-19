
import React from 'react';
import { PromoBanner } from '../types';

interface PromoBannersProps {
  banners: PromoBanner[];
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="py-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {banners.map((promo) => (
            <a href={promo.link} key={promo.id} className="block rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 group transform hover:-translate-y-1">
              <div className="relative overflow-hidden bg-gray-200 aspect-[2/1] md:aspect-auto md:h-40">
                  <img 
                    src={promo.src} 
                    alt={promo.alt} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </a>
          ))}
        </div>
    </section>
  );
};

export default PromoBanners;
