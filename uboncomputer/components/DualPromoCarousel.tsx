import React, { useState, useEffect, useCallback } from 'react';
import { DualCarouselContent } from '../types';

interface CarouselProps {
  slides: { id: number, src: string, alt: string }[];
}

const Carousel: React.FC<CarouselProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === slides.length - 1 ? 0 : prevIndex + 1));
  }, [slides.length]);

  useEffect(() => {
    const slideInterval = setInterval(nextSlide, 5000);
    return () => clearInterval(slideInterval);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-64 md:h-80 overflow-hidden rounded-xl shadow-lg">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 w-full h-full transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img src={slide.src} alt={slide.alt} className="w-full h-full object-cover" />
        </div>
      ))}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, slideIndex) => (
          <button
            key={slideIndex}
            onClick={() => setCurrentIndex(slideIndex)}
            className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
              currentIndex === slideIndex ? 'bg-white scale-110 shadow-md' : 'bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${slideIndex + 1}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

interface DualPromoCarouselProps {
  carousels: DualCarouselContent[];
}

const DualPromoCarousel: React.FC<DualPromoCarouselProps> = ({ carousels }) => {
  const carousel1 = carousels.find(c => c.id === 1);
  const carousel2 = carousels.find(c => c.id === 2);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {carousel1 && <Carousel slides={carousel1.slides} />}
      {carousel2 && <Carousel slides={carousel2.slides} />}
    </div>
  );
};

export default DualPromoCarousel;
