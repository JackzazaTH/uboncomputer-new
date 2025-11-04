import React from 'react';
import Link from 'next/link';
import { Article } from '../types';

interface ArticleCardProps {
    article: Article;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ article }) => {
    return (
        <Link 
            href={`/article/${article.id}`}
            className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col group"
        >
            <div className="relative overflow-hidden">
                <img src={article.imageUrl} alt={article.title} className="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-gray-800 text-center rounded-md px-3 py-2 shadow-sm">
                    <span className="block font-bold text-lg leading-tight">{article.date.split(' ')[0]}</span>
                    <span className="block text-xs uppercase tracking-wider">{article.date.split(' ')[1]} {article.date.split(' ')[2]}</span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-lg font-bold text-gray-800 mb-3 flex-grow group-hover:text-orange-600 transition-colors">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">{article.excerpt}</p>
                <span className="text-sm font-semibold text-orange-600 group-hover:text-orange-500 mt-auto self-start">
                    อ่านต่อทั้งหมด
                </span>
            </div>
        </Link>
    );
};

export default ArticleCard;
