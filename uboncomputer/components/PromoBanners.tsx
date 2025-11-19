
import React from 'react';
import { PromoBanner } from '../types';

interface PromoBannersProps {
  banners: PromoBanner[];
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="py-8 sm:py-12 -mt-6 sm:-mt-16 relative z-20">
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
          {banners.map((promo) => (
            <a href={promo.link} key={promo.id} className="block rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 group transform hover:-translate-y-1">
              <div className="relative overflow-hidden bg-gray-200 aspect-[2/1] md:aspect-auto md:h-full">
                  <img 
                    src={promo.src} 
                    alt={promo.alt} 
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
