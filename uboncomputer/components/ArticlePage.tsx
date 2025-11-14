
import React, { useState, useEffect } from 'react';
import { Article, Page } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (page: Page) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onNavigate }) => {
  const [activeImage, setActiveImage] = useState(article.imageUrls?.[0] || '');

  useEffect(() => {
    setActiveImage(article.imageUrls?.[0] || '');
  }, [article]);

  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <button 
          onClick={() => onNavigate('articles')} 
          className="flex items-center text-orange-600 hover:text-orange-500 font-semibold mb-8 transition-colors"
        >
          <ArrowLeft size={20} className="mr-2" />
          กลับไปที่หน้ารวมบทความ
        </button>
        
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">{article.title}</h1>
        <div className="flex items-center text-gray-500 mb-6">
          <Calendar size={16} className="mr-2" />
          <span>เผยแพร่เมื่อ: {article.date}</span>
        </div>
        
        {article.imageUrls && article.imageUrls.length > 0 && (
          <div className="mb-8">
            <img 
              src={activeImage} 
              alt={article.title} 
              className="w-full h-auto rounded-lg shadow-lg aspect-video object-cover" 
            />
            {article.imageUrls.length > 1 && (
              <div className="mt-4 grid grid-cols-3 sm:grid-cols-5 gap-2">
                {article.imageUrls.map((img, index) => (
                  <button 
                    key={index} 
                    onClick={() => setActiveImage(img)}
                    className={`rounded-md border-2 p-1 transition-all ${activeImage === img ? 'border-orange-500' : 'border-transparent hover:border-gray-400'}`}
                  >
                    <img src={img} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover rounded-sm aspect-video" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        
        <div className="prose 2xl:prose-xl max-w-none text-gray-800 leading-relaxed">
           {article.content.split('\n').map((paragraph, index) => (
             paragraph.trim() !== '' && <p key={index} className="mb-4">{paragraph}</p>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;