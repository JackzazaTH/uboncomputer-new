'use client';
import React, { useEffect } from 'react';
import CategoryPage from '../../components/CategoryPage';
import { useAppContext } from '../../context/AppContext';
import { categoryConfigurations } from '../../categoryConfig';
import { ProductCategory, Page } from '../../types';
import { notFound } from 'next/navigation';

export default function Category({ params }: { params: { category: string } }) {
  const { products, categoryPageData, seoData } = useAppContext();
  
  const categoryKey = params.category as ProductCategory;
  const categoryConfig = categoryConfigurations[categoryKey];
  const pageData = categoryPageData[categoryKey];

  useEffect(() => {
    const pageSeo = seoData[categoryKey];
    if (pageSeo) {
        document.title = pageSeo.title;
    }
  }, [seoData, categoryKey]);

  if (!categoryConfig || !pageData) {
    // Can't use notFound() in client component, so render a message or redirect.
    return <div>Category not found.</div>;
  }

  return <CategoryPage allProducts={products} categoryConfig={categoryConfig} bannerUrl={pageData.bannerUrl} />;
}
