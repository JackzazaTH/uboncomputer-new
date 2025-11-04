import React from 'react';
import { ArrowRight } from 'lucide-react';
import ArticleCard from './ArticleCard';
import { Article, NavigateFunction } from '../types';

interface ArticleSectionProps {
  articles: Article[];
  title: string;
  onNavigate: NavigateFunction;
}

const ArticleSection: React.FC<ArticleSectionProps> = ({ articles, title, onNavigate }) => {
  const articlesToShow = articles.slice(0, 3);

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onNavigate('articles');
            }}
            className="text-sm font-semibold text-orange-600 hover:text-orange-500 flex items-center transition-colors"
          >
            ดูทั้งหมด
            <ArrowRight size={16} className="ml-1" />
          </a>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articlesToShow.map((article) => (
            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ArticleSection;