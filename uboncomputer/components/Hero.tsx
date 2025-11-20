


import React, { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from '../types';
import { ArrowRight } from 'lucide-react';

interface HeroProps {
    slides: HeroSlide[];
}

const Hero: React.FC<HeroProps> = ({ slides }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        if (!slides || slides.length === 0) return;
        const isLastSlide = currentIndex === slides.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    }, [currentIndex, slides]);
    
    useEffect(() => {
        const slideInterval = setInterval(nextSlide, 7000);
        return () => clearInterval(slideInterval);
    }, [nextSlide]);
    
    if (!slides || slides.length === 0) {
        return <section className="relative h-[500px] md:h-[600px] 2xl:h-[700px] w-full overflow-hidden bg-gray-900 flex items-center justify-center text-white"><p>Loading slides...</p></section>;
    }

  return (
    <section className="relative h-[550px] md:h-[650px] 2xl:h-[750px] w-full overflow-hidden bg-gray-900 group">
      {slides.map((slide, index) => (
         <div key={slide.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {/* Image with subtle scale animation */}
            <img 
                src={slide.image} 
                alt="Hero background" 
                className={`w-full h-full object-cover transition-transform duration-[10000ms] ease-out ${index === currentIndex ? 'scale-105' : 'scale-100'}`} 
            />
            {/* Modern Gradient Overlay - Improved visibility */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/50 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 via-slate-900/30 to-transparent opacity-80"></div>
         </div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8 h-full relative z-20">
        <div className="flex flex-col justify-center h-full text-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 pb-12 md:pb-0 pt-16">
            <div className={`space-y-6 transition-all duration-700 transform ${currentIndex >= 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
              <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-black tracking-tight leading-[1.1] drop-shadow-2xl">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 filter drop-shadow-md animate-fade-in">{slides[currentIndex].titleLine1}</span>
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500 filter drop-shadow-md mt-2">{slides[currentIndex].titleLine2}</span>
                  <span className="block text-gray-300 text-2xl sm:text-3xl md:text-4xl mt-4 font-bold tracking-wider uppercase">{slides[currentIndex].titleLine3}</span>
              </h1>
             <div className="mt-10 sm:mt-12 flex flex-wrap gap-4">
               <a
                href="#products"
                className="inline-flex items-center bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-base sm:text-lg px-10 py-4 rounded-full hover:shadow-[0_10px_30px_-10px_rgba(234,88,12,0.6)] transition-all transform hover:-translate-y-1 active:scale-95 ring-1 ring-white/20 backdrop-blur-sm"
              >
                {slides[currentIndex].cta}
                <ArrowRight className="ml-2 w-5 h-5" />
              </a>
              <button className="inline-flex items-center bg-white/10 backdrop-blur-md text-white font-bold text-base sm:text-lg px-8 py-4 rounded-full hover:bg-white/20 transition-all border border-white/20 hover:border-white/40">
                  ดูรายละเอียด
              </button>
             </div>
            </div>
        </div>
      </div>

       {/* Modern Dot Indicators */}
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out shadow-lg backdrop-blur-sm ${
              currentIndex === slideIndex ? 'w-12 bg-orange-500' : 'w-3 bg-white/30 hover:bg-white/60'
            }`}
          ></button>
        ))}
      </div>
      
      {/* Bottom Fade for smooth transition to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-slate-50 to-transparent z-10"></div>
    </section>
  );
};

export default Hero;
