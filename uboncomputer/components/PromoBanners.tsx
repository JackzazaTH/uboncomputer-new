import React from 'react';
import { PromoBanner } from '../types';

interface PromoBannersProps {
  banners: PromoBanner[];
}

const PromoBanners: React.FC<PromoBannersProps> = ({ banners }) => {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {banners.map((promo) => (
            <a href={promo.link} key={promo.id} className="rounded-lg overflow-hidden group">
              <img 
                src={promo.src} 
                alt={promo.alt} 
                className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PromoBanners;
