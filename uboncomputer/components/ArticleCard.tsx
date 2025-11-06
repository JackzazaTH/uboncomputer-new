


import React from 'react';
import { Article, Page } from '../types';

interface ArticleCardProps {
    article: Article;
    onNavigate: (page: Page, data?: { articleId: number }) => void;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article, onNavigate }) => {
    return (
        <div 
            onClick={() => onNavigate('articleDetail', { articleId: article.id })}
            className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group cursor-pointer"
        >
            <div className="relative overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 dark:bg-gray-900/80 backdrop-blur-sm text-gray-800 dark:text-gray-200 text-center rounded-md px-3 py-2 shadow-sm">
                    <span className="block font-bold text-lg leading-tight">{article.date.split(' ')[0]}</span>
                    <span className="block text-xs uppercase tracking-wider">{article.date.split(' ')[1]} {article.date.split(' ')[2]}</span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-3 flex-grow group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">{article.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <span className="text-sm font-semibold text-orange-600 dark:text-orange-400 group-hover:text-orange-500 dark:group-hover:text-orange-300 mt-auto self-start">
                    อ่านต่อทั้งหมด
                </span>
            </div>
        </div>
    );
};

export default ArticleCard;