import React from 'react';
import { MainPromo } from '../types';

interface MainPromoBannerProps {
  banner: MainPromo;
}

const MainPromoBanner: React.FC<MainPromoBannerProps> = ({ banner }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <a href={banner.link} className="block rounded-xl overflow-hidden shadow-lg group">
          <img
            src={banner.src}
            alt={banner.alt}
            className="w-full h-auto object-contain transform group-hover:scale-105 transition-transform duration-500"
          />
        </a>
      </div>
    </section>
  );
};

export default MainPromoBanner;
