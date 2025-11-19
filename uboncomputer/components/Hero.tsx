
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
    <section className="relative h-[500px] md:h-[600px] 2xl:h-[700px] w-full overflow-hidden bg-gray-900 group">
      {slides.map((slide, index) => (
         <div key={slide.id} className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}>
            {/* Image with subtle scale animation */}
            <img 
                src={slide.image} 
                alt="Hero background" 
                className={`w-full h-full object-cover transition-transform duration-[7000ms] ease-out ${index === currentIndex ? 'scale-105' : 'scale-100'}`} 
            />
            {/* Modern Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-90"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent opacity-80"></div>
         </div>
      ))}
      
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8 h-full relative z-20">
        <div className="flex flex-col justify-center h-full text-white w-full md:w-3/4 lg:w-2/3 xl:w-1/2 pb-12 md:pb-0">
            <div className="space-y-4 sm:space-y-6 animate-slide-in-up">
              <h1 className="text-4xl sm:text-5xl md:text-6xl 2xl:text-7xl font-extrabold tracking-tight leading-[1.1] drop-shadow-2xl">
                  <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200 filter drop-shadow-lg">{slides[currentIndex].titleLine1}</span>
                  <span className="block text-orange-500 filter drop-shadow-lg">{slides[currentIndex].titleLine2}</span>
                  <span className="block text-gray-200 text-3xl sm:text-4xl md:text-5xl mt-2 font-bold shadow-black">{slides[currentIndex].titleLine3}</span>
              </h1>
             <div className="mt-8 sm:mt-10 flex flex-wrap gap-4">
               <a
                href="#products"
                className="inline-flex items-center bg-orange-600 text-white font-bold text-base sm:text-lg px-8 py-3.5 rounded-full hover:bg-orange-500 transition-all transform hover:scale-105 hover:shadow-[0_0_25px_rgba(249,115,22,0.6)] ring-1 ring-orange-400/50 backdrop-blur-sm"
              >
                {slides[currentIndex].cta}
                <ArrowRight className="ml-2 w-5 h-5 animate-bounce-x" />
              </a>
             </div>
            </div>
        </div>
      </div>

       {/* Modern Dot Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex space-x-3">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            aria-label={`Go to slide ${slideIndex + 1}`}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`h-1.5 rounded-full transition-all duration-500 ease-out shadow-sm ${
              currentIndex === slideIndex ? 'w-12 bg-orange-500' : 'w-3 bg-white/40 hover:bg-white/70'
            }`}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default Hero;
