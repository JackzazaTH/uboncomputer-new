
import React, { useState, useMemo, useLayoutEffect, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Footer from './components/Footer';
import PromoBanners from './components/PromoBanners';
import DualPromoCarousel from './components/DualPromoCarousel';
import StoreInfo from './components/StoreInfo';
import CategoryGrid from './components/CategoryGrid';
import MainPromoBanner from './components/MainPromoBanner';
import ArticleSection from './components/ArticleSection';
import InfoBar from './components/InfoBar';
import MobileNavBar from './components/MobileNavBar';
// FIX: Changed to a named import for PCBuilderPage to resolve the "no default export" error.
import { PCBuilderPage } from './components/PCBuilderPage';
import ComputerSetPage from './components/ComputerSetPage';
import ComputerSetDetailPage from './components/ComputerSetDetailPage';
import ArticleListPage from './components/ArticleListPage';
import ArticlePage from './components/ArticlePage';
import ContactPage from './components/ContactPage';
import AuthModal from './components/AuthModal';
import AboutPage from './components/AboutPage';
// FIX: Changed from a default to a named import for AdminPage to resolve the module resolution error.
import { AdminPage } from './components/AdminPage';
import LoginModal from './components/LoginModal';
import CartPage from './components/CartPage';
import CheckoutPage from './components/CheckoutPage';
import PromotionsPage from './components/PromotionsPage';
import ProductPage from './components/ProductPage';
import CorporatePage from './components/CorporatePage';
import FAQPage from './components/FAQPage';
import OrderStatusPage from './components/OrderStatusPage';
import SearchResultsPage from './components/SearchResultsPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import TermsOfServicePage from './components/TermsOfServicePage';
import CookiePolicyPage from './components/CookiePolicyPage';
import ShippingPolicyPage from './components/ShippingPolicyPage';
import ReturnPolicyPage from './components/ReturnPolicyPage';
import CareersPage from './components/CareersPage';
import ComparePage from './components/ComparePage';
import ComparisonTray from './components/ComparisonTray';
// FIX: Corrected typo 'AllCategoryPage-Data' to 'AllCategoryPageData' which was causing multiple type errors.
import { Product, Category, Article, ComputerSetGroup, HeroSlide, Page, SeoData, SeoEditablePage, Brand, DisplayProduct, HomepageContent, ProductCategory, AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, ComputerSetProduct } from './types';
import { mockProducts, mockCategories, mockComputerSetGroups, mockArticles, mockHeroSlides, mockSeoData, mockHomepageContent, mockCategoryPageData, mockDiscountCodes, mockAdminOrders, mockCareersPageContent } from './constants';
import YoutubeSection from './components/YoutubeSection';
import ProductDisplaySection from './components/ProductDisplaySection';
import IntroSection from './components/IntroSection';
import CategoryPage from './components/CategoryPage';
import { categoryConfigurations } from './categoryConfig';
import LoadingScreen from './components/LoadingScreen';
import ForgotPasswordModal from './components/ForgotPasswordModal';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentComputerSet, setCurrentComputerSet] = useState<ComputerSetProduct | null>(null);
  const [searchQuery, setSearchQuery] = useState('');


  // Admin and Data State
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [computerSetGroups, setComputerSetGroups] = useState<ComputerSetGroup[]>(mockComputerSetGroups);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(mockHeroSlides);
  const [seoData, setSeoData] = useState<SeoData>(mockSeoData);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(mockHomepageContent);
  const [categoryPageData, setCategoryPageData] = useState<AllCategoryPageData>(mockCategoryPageData);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(mockDiscountCodes);
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(mockAdminOrders);
  const [careersPageContent, setCareersPageContent] = useState<CareersPageContent>(mockCareersPageContent);
  
  const [isLoading, setIsLoading] = useState(true);
  const [isHidingLoader, setIsHidingLoader] = useState(false);


  useEffect(() => {
     // Show loader for a minimum duration to give a smoother experience
    const timer = setTimeout(() => {
      setIsHidingLoader(true); // Start fade-out animation
      setTimeout(() => setIsLoading(false), 500); // Remove loader from DOM after animation
    }, 1500);

    // Disable the browser's default scroll restoration behavior.
    // This ensures our manual `scrollTo` in `useLayoutEffect` is the single
    // source of truth for the scroll position on page navigation, preventing
    // the browser from interfering and causing inconsistent scroll positions.
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
     return () => clearTimeout(timer); // Cleanup timer
  }, []);


  // Dynamic SEO & Scroll-to-top Effect
  useLayoutEffect(() => {
    // Using useLayoutEffect ensures this runs synchronously after DOM mutations
    // but before the browser paints, reliably scrolling to the top before the
    // user sees the new page content. The 'auto' behavior overrides any
    // 'scroll-smooth' CSS.
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    const updateMeta = (selector: string, attribute: string, value: string) => {
        const element = document.querySelector(selector);
        if (element) {
            element.setAttribute(attribute, value);
        }
    };
    
    if (currentPage === 'articleDetail' && currentArticle) {
        const title = `${currentArticle.title} | Uboncomputer`;
        const description = currentArticle.excerpt;
        const url = `https://www.uboncomputer.com/article/${currentArticle.id}`;

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', currentArticle.imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', currentArticle.imageUrl);
        return;
    }

    if (currentPage === 'productDetail' && currentProduct) {
        const title = `${currentProduct.name} | Uboncomputer`;
        const description = currentProduct.description || `ซื้อ ${currentProduct.name} ราคาพิเศษ. ${currentProduct.category} คุณภาพดีจากแบรนด์ ${currentProduct.brand}.`;
        const url = `https://www.uboncomputer.com/product/${currentProduct.id}`;

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', currentProduct.imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', currentProduct.imageUrl);
        return;
    }

    if (currentPage === 'computerSetDetail' && currentComputerSet) {
        const title = `${currentComputerSet.name} | Uboncomputer`;
        const description = `ซื้อคอมพิวเตอร์เซ็ต ${currentComputerSet.name} สเปค ${currentComputerSet.specs} ราคาพิเศษ.`;
        const url = `https://www.uboncomputer.com/computer-set/${currentComputerSet.id}`;

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', currentComputerSet.imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', currentComputerSet.imageUrl);
        return;
    }


    const pageKey = currentPage as SeoEditablePage;

    if (!(pageKey in seoData)) {
      return;
    }

    const pageSeo = seoData[pageKey];
    let { title, description } = pageSeo;
    
    if (pageKey === 'searchResults' && searchQuery) {
        title = `ผลการค้นหาสำหรับ "${searchQuery}" | Uboncomputer`;
    }


    const paths: Partial<Record<SeoEditablePage, string>> = {
        home: '/',
        pcBuilder: '/pc-builder',
        computerSet: '/computer-set',
        articles: '/articles',
        promotions: '/promotions',
        contact: '/contact',
        about: '/about',
        cart: '/cart',
        checkout: '/checkout',
        corporate: '/corporate',
        faq: '/faq',
        orderStatus: '/order-status',
        searchResults: '/search',
        privacy: '/privacy-policy',
        terms: '/terms-of-service',
        cookies: '/cookie-policy',
        shipping: '/shipping-policy',
        returns: '/return-policy',
        careers: '/careers',
        compare: '/compare',
        cpu: '/cpu',
        gpu: '/gpu',
        ram: '/ram',
        motherboard: '/motherboard',
        storage: '/storage',
        case: '/case',
        cooling: '/cooling',
        powerSupply: '/power-supply',
        gamingGear: '/gaming-gear',
        network: '/network',
        software: '/software',
        server: '/server'
    };
    const path = paths[pageKey] || `/${pageKey}`;

    document.title = title;
    updateMeta('meta[name="description"]', 'content', description);
    updateMeta('link[rel="canonical"]', 'href', `https://www.uboncomputer.com${path}`);
    updateMeta('meta[property="og:title"]', 'content', title);
    updateMeta('meta[property="og:description"]', 'content', description);
    updateMeta('meta[property="og:url"]', 'content', `https://www.uboncomputer.com${path}`);
    updateMeta('meta[property="twitter:title"]', 'content', title);
    updateMeta('meta[property="twitter:description"]', 'content', description);
    updateMeta('meta[property="og:image"]', 'content', 'https://www.img.in.th/images/9920d317075c7423013280048e426210.png');
    updateMeta('meta[property="twitter:image"]', 'content', 'https://www.img.in.th/images/9920d317075c7423013280048e426210.png');
  }, [currentPage, seoData, currentArticle, currentProduct, currentComputerSet, searchQuery]);


  const navigateTo = (page: Page, data?: { articleId?: number; productId?: number; computerSetId?: number; searchQuery?: string }) => {
    if (page === 'admin' && !isAdminLoggedIn) {
        setCurrentPage('home');
        setIsLoginModalOpen(true);
        return;
    }
    
    setCurrentArticle(null);
    setCurrentProduct(null);
    setCurrentComputerSet(null);

    if (page === 'searchResults' && data?.searchQuery) {
        setSearchQuery(data.searchQuery);
    }

    if (page === 'articleDetail' && data?.articleId) {
        const article = articles.find(a => a.id === data.articleId);
        if (article) {
            setCurrentArticle(article);
        } else {
            setCurrentPage('articles'); 
            return;
        }
    } else if (page === 'productDetail' && data?.productId) {
        const product = products.find(p => p.id === data.productId);
        if (product) {
            setCurrentProduct(product);
        } else {
            setCurrentPage('home'); 
            return;
        }
    } else if (page === 'computerSetDetail' && data?.computerSetId) {
        let foundSet: ComputerSetProduct | null = null;
        for (const group of computerSetGroups) {
            const found = group.products.find(p => p.id === data.computerSetId);
            if (found) {
                foundSet = found;
                break;
            }
        }
        if (foundSet) {
            setCurrentComputerSet(foundSet);
        } else {
            setCurrentPage('computerSet'); // Fallback if not found
            return;
        }
    }


    setCurrentPage(page);
  };
  
  const handleAdminLogin = (user: string, pass: string): boolean => {
      if (user === 'admin' && pass === 'admin987') {
          setIsAdminLoggedIn(true);
          setIsLoginModalOpen(false);
          navigateTo('admin');
          return true;
      }
      return false;
  };

  const handleAdminLogout = () => {
      setIsAdminLoggedIn(false);
      navigateTo('home');
  };

  const handleSaveProduct = (productToSave: Product) => {
    setProducts(prev => {
        const exists = prev.some(p => p.id === productToSave.id);
        if (exists) {
            return prev.map(p => p.id === productToSave.id ? productToSave : p);
        } else {
            const newId = Math.max(0, ...prev.map(p => p.id)) + 1;
            return [...prev, { ...productToSave, id: newId }];
        }
    });
  };

  const handleDeleteProduct = (productId: number) => {
      setProducts(prev => prev.filter(p => p.id !== productId));
  };

  const handleSaveArticle = (articleToSave: Article) => {
    setArticles(prev => {
        const exists = prev.some(a => a.id === articleToSave.id);
        if (exists) {
            return prev.map(a => a.id === articleToSave.id ? { ...articleToSave, link: `/article/${articleToSave.id}` } : a);
        } else {
            const newId = Math.max(0, ...prev.map(a => a.id)) + 1;
            return [...prev, { ...articleToSave, id: newId, link: `/article/${newId}` }];
        }
    });
  };

  const handleDeleteArticle = (articleId: number) => {
      setArticles(prev => prev.filter(a => a.id !== articleId));
  };

  const handleSaveHeroSlide = (slideToSave: HeroSlide) => {
    setHeroSlides(prev => {
        const exists = prev.some(s => s.id === slideToSave.id);
        if (exists) {
            return prev.map(s => s.id === slideToSave.id ? slideToSave : s);
        } else {
            const newId = Math.max(0, ...prev.map(s => s.id)) + 1;
            return [...prev, { ...slideToSave, id: newId }];
        }
    });
  };

  const handleDeleteHeroSlide = (slideId: number) => {
      setHeroSlides(prev => prev.filter(s => s.id !== slideId));
  };
  
  const handleSaveComputerSetGroup = (groupToSave: ComputerSetGroup) => {
    setComputerSetGroups(prev => {
        const exists = prev.some(g => g.id === groupToSave.id);
        if (exists) {
            return prev.map(g => g.id === groupToSave.id ? groupToSave : g);
        } else {
            const newId = Math.max(0, ...prev.map(g => g.id)) + 1;
            const newProducts = groupToSave.products.map((p, index) => ({
                ...p,
                id: p.id || (Date.now() + index)
            }));
            return [...prev, { ...groupToSave, id: newId, products: newProducts }];
        }
    });
  };

  const handleDeleteComputerSetGroup = (groupId: number) => {
      setComputerSetGroups(prev => prev.filter(g => g.id !== groupId));
  };

  const handleSaveSeoData = (newSeoData: SeoData) => {
    setSeoData(newSeoData);
  };

  const handleSaveHomepageContent = (newContent: HomepageContent) => {
    setHomepageContent(newContent);
  };

  const handleSaveCategoryPageData = (newData: AllCategoryPageData) => {
    setCategoryPageData(newData);
  };

  const handleSaveDiscountCode = (codeToSave: DiscountCode) => {
    setDiscountCodes(prev => {
        const exists = prev.some(c => c.id === codeToSave.id);
        if (exists) {
            return prev.map(c => c.id === codeToSave.id ? codeToSave : c);
        } else {
            const newId = Math.max(0, ...prev.map(c => c.id)) + 1;
            return [...prev, { ...codeToSave, id: newId }];
        }
    });
  };

  const handleDeleteDiscountCode = (codeId: number) => {
      setDiscountCodes(prev => prev.filter(c => c.id !== codeId));
  };

  const handleSaveAdminOrder = (orderToSave: AdminOrder) => {
    setAdminOrders(prev => {
        const exists = prev.some(o => o.id === orderToSave.id);
        if (exists) {
            return prev.map(o => o.id === orderToSave.id ? orderToSave : o);
        }
        // Adding new order is not implemented in this flow, only updating
        return prev;
    });
  };

  const handleDeleteAdminOrder = (orderId: number) => {
      setAdminOrders(prev => prev.filter(o => o.id !== orderId));
  };

  const handleSaveCareersPageContent = (newContent: CareersPageContent) => {
    setCareersPageContent(newContent);
  };

  const renderPage = () => {
    const categoryKey = currentPage as ProductCategory;
    const categoryConfig = categoryConfigurations[categoryKey];

    if (categoryConfig) {
      const pageData = categoryPageData[categoryKey];
      return <CategoryPage allProducts={products} categoryConfig={categoryConfig} bannerUrl={pageData.bannerUrl} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero slides={heroSlides} />
            <div className="animate-slide-in-up" style={{ animationDelay: '0ms' }}><PromoBanners banners={homepageContent.promoBanners} /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}><IntroSection content={homepageContent.introSection} /></div>
            
            <section className="py-12 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <DualPromoCarousel carousels={homepageContent.dualCarousels} />
                <StoreInfo content={homepageContent.storeInfo} />
              </div>
            </section>

            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}><CategoryGrid onNavigate={navigateTo} /></div>
            
            <div className="animate-slide-in-up" style={{ animationDelay: '0ms' }}><MainPromoBanner banner={homepageContent.mainPromoBanner} /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}><ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.newProducts} products={homepageContent.newProducts} brands={[]} sidebarTitle="สินค้าใหม่" /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '200ms' }}><ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.notebooks} products={homepageContent.notebooks} brands={homepageContent.notebookBrands} sidebarTitle="โน้ตบุ๊ค" /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}><ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.computers} products={homepageContent.computers} brands={homepageContent.computerBrands} sidebarTitle="คอมพิวเตอร์" /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}><ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.printers} products={homepageContent.printers} brands={homepageContent.printerBrands} sidebarTitle="ปริ้นเตอร์" /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '500ms' }}><ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.preBuiltPCs} products={homepageContent.preBuiltPCs} brands={homepageContent.preBuiltPCBrands} sidebarTitle="คอมประกอบ" /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '600ms' }}><YoutubeSection title={homepageContent.sectionTitles.youtube} videos={homepageContent.youtube.videos} /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '700ms' }}><ArticleSection onNavigate={navigateTo} articles={articles} title={homepageContent.sectionTitles.articles} /></div>
            <div className="animate-slide-in-up" style={{ animationDelay: '800ms' }}><InfoBar items={homepageContent.infoBar.items} /></div>
          </>
        );
      case 'pcBuilder':
        return <PCBuilderPage products={products} />;
      case 'computerSet':
        return <ComputerSetPage onNavigate={navigateTo} groups={computerSetGroups} />;
      case 'computerSetDetail':
        return currentComputerSet ? <ComputerSetDetailPage 
            product={currentComputerSet}
            relatedProducts={computerSetGroups.find(g => g.products.some(p => p.id === currentComputerSet.id))?.products.filter(p => p.id !== currentComputerSet.id) || []}
            onNavigate={navigateTo}
          /> : null;
      case 'articles':
        return <ArticleListPage articles={articles} onNavigate={navigateTo} />;
      case 'articleDetail':
        return currentArticle ? <ArticlePage article={currentArticle} onNavigate={navigateTo} /> : null;
      case 'productDetail':
        return currentProduct ? <ProductPage product={currentProduct} allProducts={products} onNavigate={navigateTo} /> : null;
      case 'searchResults':
        return <SearchResultsPage query={searchQuery} allProducts={products} onNavigate={navigateTo} />;
      case 'promotions':
        return <PromotionsPage allProducts={products} onNavigate={navigateTo} />;
      case 'contact':
        return <ContactPage />;
      case 'about':
        return <AboutPage onNavigate={navigateTo} />;
      case 'cart':
        return <CartPage onNavigate={navigateTo} />;
      case 'checkout':
        return <CheckoutPage onNavigate={navigateTo} discountCodes={discountCodes} />;
      case 'corporate':
        return <CorporatePage />;
      case 'faq':
        return <FAQPage onNavigate={navigateTo} />;
      case 'orderStatus':
        return <OrderStatusPage adminOrders={adminOrders} />;
      case 'compare':
        return <ComparePage onNavigate={navigateTo} />;
      case 'privacy':
        return <PrivacyPolicyPage onNavigate={navigateTo} />;
      case 'terms':
        return <TermsOfServicePage onNavigate={navigateTo} />;
      case 'cookies':
        return <CookiePolicyPage onNavigate={navigateTo} />;
      case 'shipping':
        return <ShippingPolicyPage onNavigate={navigateTo} />;
      case 'returns':
        return <ReturnPolicyPage onNavigate={navigateTo} />;
      case 'careers':
        return <CareersPage content={careersPageContent} onNavigate={navigateTo} />;
      case 'admin':
        return isAdminLoggedIn ? (
          <AdminPage
            products={products}
            categories={categories}
            articles={articles}
            computerSetGroups={computerSetGroups}
            heroSlides={heroSlides}
            seoData={seoData}
            homepageContent={homepageContent}
            categoryPageData={categoryPageData}
            discountCodes={discountCodes}
            adminOrders={adminOrders}
            careersPageContent={careersPageContent}
            onSaveProduct={handleSaveProduct}
            onDeleteProduct={handleDeleteProduct}
            onSaveArticle={handleSaveArticle}
            onDeleteArticle={handleDeleteArticle}
            onSaveHeroSlide={handleSaveHeroSlide}
            onDeleteHeroSlide={handleDeleteHeroSlide}
            onSaveComputerSetGroup={handleSaveComputerSetGroup}
            onDeleteComputerSetGroup={handleDeleteComputerSetGroup}
            onSaveSeoData={handleSaveSeoData}
            onSaveHomepageContent={handleSaveHomepageContent}
            onSaveCategoryPageData={handleSaveCategoryPageData}
            onSaveDiscountCode={handleSaveDiscountCode}
            onDeleteDiscountCode={handleDeleteDiscountCode}
            onSaveAdminOrder={handleSaveAdminOrder}
            onDeleteAdminOrder={handleDeleteAdminOrder}
            onSaveCareersPageContent={handleSaveCareersPageContent}
            onLogout={handleAdminLogout}
          />
        ) : null;
      default:
        return null;
    }
  };
  
  const pageKey = `${currentPage}-${currentArticle?.id || 'none'}-${currentProduct?.id || 'none'}-${currentComputerSet?.id || 'none'}-${searchQuery}`;
  
  if (currentPage === 'admin' && isAdminLoggedIn) {
     return (
        <>
            {isLoading && <LoadingScreen isHiding={isHidingLoader} />}
            <div className={`transition-opacity duration-500 ${isHidingLoader || !isLoading ? 'opacity-100' : 'opacity-0'}`}>
                {renderPage()}
            </div>
        </>
    );
  }

  return (
    <>
      {isLoading && <LoadingScreen isHiding={isHidingLoader} />}
      <div className={`bg-gray-50 min-h-screen flex flex-col pb-20 lg:pb-0 transition-opacity duration-500 ${isHidingLoader || !isLoading ? 'opacity-100' : 'opacity-0'}`}>
        <Header 
          onSearchSubmit={(term) => navigateTo('searchResults', { searchQuery: term })} 
          onNavigate={navigateTo} 
          onAuthClick={() => setIsAuthModalOpen(true)} 
          currentPage={currentPage}
          topBarText={homepageContent.headerTopBarText}
          allProducts={products}
        />
        <main className="flex-grow relative z-0 overflow-x-hidden">
          <div key={pageKey} className="animate-fade-in">
            {renderPage()}
          </div>
        </main>
        <Footer 
          onAdminLoginClick={() => setIsLoginModalOpen(true)} 
          onNavigate={navigateTo}
          socialLinks={homepageContent.socialLinks}
        />
        <ComparisonTray onNavigate={navigateTo} />
        <MobileNavBar onNavigate={navigateTo} currentPage={currentPage} onAuthClick={() => setIsAuthModalOpen(true)} />
        {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)} 
            onForgotPasswordClick={() => {
              setIsAuthModalOpen(false);
              setIsForgotPasswordModalOpen(true);
            }}
          />
        )}
        {isForgotPasswordModalOpen && (
          <ForgotPasswordModal
            isOpen={isForgotPasswordModalOpen}
            onClose={() => setIsForgotPasswordModalOpen(false)}
            onBackToLogin={() => {
              setIsForgotPasswordModalOpen(false);
              setIsAuthModalOpen(true);
            }}
          />
        )}
        {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLogin={handleAdminLogin} />}
      </div>
    </>
  );
};

export default App;