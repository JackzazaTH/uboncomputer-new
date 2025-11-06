
import React from 'react';
import { IntroSectionContent } from '../types';

interface IntroSectionProps {
  content: IntroSectionContent;
}

const IntroSection: React.FC<IntroSectionProps> = ({ content }) => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-900">{content.title}</h2>
        <p className="mt-4 max-w-4xl mx-auto text-gray-600">
          {content.paragraph}
        </p>
        <a href={content.buttonLink} className="mt-6 inline-block bg-orange-600 text-white font-bold py-2.5 px-6 rounded-md hover:bg-orange-700 transition-colors">
          {content.buttonText}
        </a>
      </div>
    </section>
  );
};

export default IntroSection;