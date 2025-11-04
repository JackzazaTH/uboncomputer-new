'use client';
import React from 'react';
import ArticleListPage from '../../components/ArticleListPage';
import { useAppContext } from '../../context/AppContext';

export default function Articles() {
  const { articles, onNavigate } = useAppContext();
  return <ArticleListPage articles={articles} onNavigate={onNavigate} />;
}