
import React from 'react';
import { Article, Page } from '../types';
import { ArrowLeft, Calendar } from 'lucide-react';

interface ArticlePageProps {
  article: Article;
  onNavigate: (page: Page) => void;
}

const ArticlePage: React.FC<ArticlePageProps> = ({ article, onNavigate }) => {
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
        
        <img 
          src={article.imageUrl} 
          alt={article.title} 
          className="w-full h-auto rounded-lg shadow-lg mb-8 aspect-video object-cover" 
        />
        
        <div className="prose lg:prose-xl max-w-none text-gray-800 leading-relaxed">
           {article.content.split('\n').map((paragraph, index) => (
             paragraph.trim() !== '' && <p key={index} className="mb-4">{paragraph}</p>
           ))}
        </div>
      </div>
    </div>
  );
};

export default ArticlePage;