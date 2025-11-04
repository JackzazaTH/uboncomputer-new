'use client';
import React from 'react';
import ArticleCard from './ArticleCard';
import { Article, NavigateFunction } from '../types';

interface ArticleListPageProps {
    articles: Article[];
    onNavigate: NavigateFunction;
}

const ArticleListPage: React.FC<ArticleListPageProps> = ({ articles, onNavigate }) => {
    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 pb-4 border-b-2 border-orange-500 inline-block">บทความและข่าวสาร</h1>

                {/* Featured Article */}
                {featuredArticle && (
                    <section className="mb-12 group">
                        <a 
                            href="#"
                            onClick={(e) => {
                                e.preventDefault();
                                onNavigate('articleDetail', { articleId: featuredArticle.id });
                            }}
                            className="block lg:flex gap-8 bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                        >
                            <div className="lg:w-1/2 overflow-hidden rounded-lg">
                                <img 
                                    src={featuredArticle.imageUrl} 
                                    alt={featuredArticle.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>
                            <div className="lg:w-1/2 mt-6 lg:mt-0 flex flex-col justify-center">
                                <p className="text-sm text-gray-500 mb-2">{featuredArticle.date}</p>
                                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 group-hover:text-orange-600 transition-colors">{featuredArticle.title}</h2>
                                <p className="mt-4 text-gray-600 line-clamp-4">{featuredArticle.excerpt}</p>
                                <span className="text-md font-semibold text-orange-600 group-hover:text-orange-500 mt-6 self-start">
                                    อ่านต่อทั้งหมด &rarr;
                                </span>
                            </div>
                        </a>
                    </section>
                )}

                {/* Other Articles */}
                <section>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {otherArticles.map((article) => (
                            <ArticleCard key={article.id} article={article} onNavigate={onNavigate} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    );
};

export default ArticleListPage;