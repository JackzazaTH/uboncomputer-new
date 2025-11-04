'use client';
import React from 'react';
import AdminPage from '../../components/AdminPage';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';

export default function Admin() {
  const context = useAppContext();
  const router = useRouter();

  const handleLogout = () => {
    context.handleAdminLogout();
    router.push('/');
  };

  return (
    <AdminPage
      products={context.products}
      categories={context.categories}
      articles={context.articles}
      computerSetGroups={context.computerSetGroups}
      heroSlides={context.heroSlides}
      seoData={context.seoData}
      homepageContent={context.homepageContent}
      categoryPageData={context.categoryPageData}
      discountCodes={context.discountCodes}
      onSaveProduct={context.onSaveProduct}
      onDeleteProduct={context.onDeleteProduct}
      onSaveArticle={context.onSaveArticle}
      onDeleteArticle={context.onDeleteArticle}
      onSaveHeroSlide={context.onSaveHeroSlide}
      onDeleteHeroSlide={context.onDeleteHeroSlide}
      onSaveComputerSetGroup={context.onSaveComputerSetGroup}
      onDeleteComputerSetGroup={context.onDeleteComputerSetGroup}
      onSaveSeoData={context.onSaveSeoData}
      onSaveHomepageContent={context.onSaveHomepageContent}
      onSaveCategoryPageData={context.onSaveCategoryPageData}
      onSaveDiscountCode={context.onSaveDiscountCode}
      onDeleteDiscountCode={context.onDeleteDiscountCode}
      onLogout={handleLogout}
    />
  );
}
