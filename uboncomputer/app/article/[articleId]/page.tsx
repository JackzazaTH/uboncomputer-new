'use client';
import React, { useEffect } from 'react';
import ArticlePage from '../../../components/ArticlePage';
import { useAppContext } from '../../../context/AppContext';
import { notFound } from 'next/navigation';

export default function ArticleDetailPage({ params }: { params: { articleId: string } }) {
  const { articles } = useAppContext();
  const article = articles.find(a => a.id === parseInt(params.articleId));

  useEffect(() => {
    if (article) {
        const title = `${article.title} | Uboncomputer`;
        document.title = title;
        // In a real app, you'd also update meta tags here or use Next.js metadata API with server-side data fetching
    }
  }, [article]);

  if (!article) {
    // In a real app with server fetching, this would be handled better.
    // For this client-side data, we can redirect or show a not found component.
    // notFound() can only be used in Server Components, so we'll just show a message.
    return <div>Article not found</div>;
  }

  return <ArticlePage article={article} />;
}
