
import React, { useState, useEffect, useCallback } from 'react';
import { HeroSlide } from '../types';

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
        return <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-gray-900 flex items-center justify-center text-white"><p>Loading slides...</p></section>;
    }

  return (
    <section className="relative h-[65vh] min-h-[500px] w-full overflow-hidden bg-gray-900">
      {slides.map((slide, index) => (
         <div key={slide.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${index === currentIndex ? 'opacity-100' : 'opacity-0'}`}>
            <img src={slide.image} alt="Hero background" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-black/60"></div>
         </div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="relative z-10 flex flex-col justify-center h-full text-white w-full md:w-3/5 lg:w-1/2">
            <div className="animate-slide-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
                  <span>{slides[currentIndex].titleLine1}</span><br/>
                  <span>{slides[currentIndex].titleLine2}</span><br/>
                  <span>{slides[currentIndex].titleLine3}</span>
              </h1>
             <div className="mt-8">
               <a
                href="#products"
                className="inline-block bg-lime-400 text-gray-900 font-bold text-lg px-8 py-3 rounded-md hover:bg-lime-300 transition-colors transform hover:scale-105"
              >
                {slides[currentIndex].cta}
              </a>
             </div>
            </div>
        </div>
      </div>

       {/* Dot Indicators */}
      <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-3">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`w-3 h-3 rounded-full cursor-pointer transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white scale-125' : 'bg-white/40 hover:bg-white/75'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;