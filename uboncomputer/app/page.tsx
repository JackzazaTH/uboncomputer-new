'use client';
import React, { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';
import Hero from '../components/Hero';
import PromoBanners from '../components/PromoBanners';
import DualPromoCarousel from '../components/DualPromoCarousel';
import StoreInfo from '../components/StoreInfo';
import CategoryGrid from '../components/CategoryGrid';
import MainPromoBanner from '../components/MainPromoBanner';
import ArticleSection from '../components/ArticleSection';
import InfoBar from '../components/InfoBar';
import YoutubeSection from '../components/YoutubeSection';
import ProductDisplaySection from '../components/ProductDisplaySection';
import IntroSection from '../components/IntroSection';

export default function HomePage() {
  const { heroSlides, homepageContent, articles, seoData } = useAppContext();
  
  useEffect(() => {
    const pageSeo = seoData['home'];
    if (pageSeo) {
      document.title = pageSeo.title;
      // You can add more meta tag updates here if needed
    }
  }, [seoData]);

  return (
    <div className="animate-fade-in">
      <Hero slides={heroSlides} />
      <div className="animate-slide-in-up" style={{ animationDelay: '0ms' }}><PromoBanners banners={homepageContent.promoBanners} /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}><IntroSection content={homepageContent.introSection} /></div>
      
      <section className="py-12 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <DualPromoCarousel carousels={homepageContent.dualCarousels} />
          <StoreInfo content={homepageContent.storeInfo} />
        </div>
      </section>

      <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}><CategoryGrid /></div>
      
      <div className="animate-slide-in-up" style={{ animationDelay: '0ms' }}><MainPromoBanner banner={homepageContent.mainPromoBanner} /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}><ProductDisplaySection title={homepageContent.sectionTitles.newProducts} products={homepageContent.newProducts} brands={[]} sidebarTitle="สินค้าใหม่" /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}><ProductDisplaySection title={homepageContent.sectionTitles.notebooks} products={homepageContent.notebooks} brands={homepageContent.notebookBrands} sidebarTitle="โน้ตบุ๊ค" /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}><ProductDisplaySection title={homepageContent.sectionTitles.computers} products={homepageContent.computers} brands={homepageContent.computerBrands} sidebarTitle="คอมพิวเตอร์" /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}><ProductDisplaySection title={homepageContent.sectionTitles.printers} products={homepageContent.printers} brands={homepageContent.printerBrands} sidebarTitle="ปริ้นเตอร์" /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '500ms' }}><ProductDisplaySection title={homepageContent.sectionTitles.preBuiltPCs} products={homepageContent.preBuiltPCs} brands={homepageContent.preBuiltPCBrands} sidebarTitle="คอมประกอบ" /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '600ms' }}><YoutubeSection title={homepageContent.sectionTitles.youtube} videos={homepageContent.youtube.videos} /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '700ms' }}><ArticleSection articles={articles} title={homepageContent.sectionTitles.articles} /></div>
      <div className="animate-slide-in-up" style={{ animationDelay: '800ms' }}><InfoBar items={homepageContent.infoBar.items} /></div>
    </div>
  );
}
