
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
import { PCBuilderPage } from './components/PCBuilderPage';
import ComputerSetPage from './components/ComputerSetPage';
import ComputerSetDetailPage from './components/ComputerSetDetailPage';
import ArticleListPage from './components/ArticleListPage';
import ArticlePage from './components/ArticlePage';
import ContactPage from './components/ContactPage';
import AuthModal from './components/AuthModal';
import AboutPage from './components/AboutPage';
import AdminPage from './components/AdminPage';
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
import ReviewsPage from './components/ReviewsPage';
import AccountPage from './components/AccountPage';
import JobDetailPage from './components/JobDetailPage';
import { Product, Category, Article, ComputerSetGroup, HeroSlide, Page, SeoData, SeoEditablePage, Brand, DisplayProduct, HomepageContent, ProductCategory, AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, ComputerSetProduct, Review, HeaderMenuData, User, JobOpening, JobApplication, LogEntry, LogLevel, UserRole, ComputerSetPageContent } from './types';
import { mockProducts, mockCategories, mockComputerSetGroups, mockArticles, mockHeroSlides, mockSeoData, mockHomepageContent, mockCategoryPageData, mockDiscountCodes, mockAdminOrders, mockCareersPageContent, mockHeaderMenuData, mockUsers, mockComputerSetPageContent } from './constants';
import YoutubeSection from './components/YoutubeSection';
import ProductDisplaySection from './components/ProductDisplaySection';
import IntroSection from './components/IntroSection';
import CategoryPage from './components/CategoryPage';
import { categoryConfigurations } from './categoryConfig';
import LoadingScreen from './components/LoadingScreen';
import ForgotPasswordModal from './components/ForgotPasswordModal';
import AllProductsPage from './components/AllProductsPage';
import CookieConsent from './components/CookieConsent';
import { useToast } from './hooks/useToast';

// --- LocalStorage Database Functions ---
const LOCAL_STORAGE_KEY_PREFIX = 'uboncom_';

const saveData = (key: string, data: any) => {
  try {
    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}${key}`, JSON.stringify(data));
  } catch (error: any) {
    console.error(`Error saving ${key} to localStorage`, error);
    // Simple check for quota exceeded
    if (error.name === 'QuotaExceededError' || 
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED') {
         alert("พื้นที่จัดเก็บเต็ม! ไม่สามารถบันทึกข้อมูลได้ (QuotaExceededError). กรุณาลบรูปภาพหรือข้อมูลเก่าออก");
    }
  }
};

const loadData = <T,>(key: string, fallbackData: T): T => {
  try {
    const item = localStorage.getItem(`${LOCAL_STORAGE_KEY_PREFIX}${key}`);
    return item ? JSON.parse(item) : fallbackData;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage`, error);
    return fallbackData;
  }
};
// --- End LocalStorage Database Functions ---


const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);
  const [currentComputerSet, setCurrentComputerSet] = useState<ComputerSetProduct | null>(null);
  const [currentJobOpening, setCurrentJobOpening] = useState<JobOpening | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToast } = useToast();
  
  // --- Unified Authentication and Data State ---
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const isUserLoggedIn = !!currentUser;
  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'editor';

  const [products, setProducts] = useState<Product[]>(() => loadData('products', mockProducts));
  const [categories] = useState<Category[]>(mockCategories);
  const [computerSetGroups, setComputerSetGroups] = useState<ComputerSetGroup[]>(() => loadData('computerSetGroups', mockComputerSetGroups));
  const [articles, setArticles] = useState<Article[]>(() => loadData('articles', mockArticles));
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(() => loadData('heroSlides', mockHeroSlides));
  const [seoData, setSeoData] = useState<SeoData>(() => loadData('seoData', mockSeoData));
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(() => loadData('homepageContent', mockHomepageContent));
  const [categoryPageData, setCategoryPageData] = useState<AllCategoryPageData>(() => loadData('categoryPageData', mockCategoryPageData));
  const [computerSetPageContent, setComputerSetPageContent] = useState<ComputerSetPageContent>(() => loadData('computerSetPageContent', mockComputerSetPageContent));
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(() => loadData('discountCodes', mockDiscountCodes));
  const [adminOrders, setAdminOrders] = useState<AdminOrder[]>(() => loadData('adminOrders', mockAdminOrders));
  const [careersPageContent, setCareersPageContent] = useState<CareersPageContent>(() => loadData('careersPageContent', mockCareersPageContent));
  const [jobApplications, setJobApplications] = useState<JobApplication[]>(() => loadData('jobApplications', []));
  const [headerMenuData, setHeaderMenuData] = useState<HeaderMenuData>(() => loadData('headerMenuData', mockHeaderMenuData));
  
  const [users, setUsers] = useState<User[]>(() => loadData('users', mockUsers));
  const [logs, setLogs] = useState<LogEntry[]>(() => loadData('logs', []));
  
  const [isLoading, setIsLoading] = useState(true);
  const [isHidingLoader, setIsHidingLoader] = useState(false);


  useEffect(() => {
    const timer = setTimeout(() => {
      setIsHidingLoader(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 1500);

    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
     return () => clearTimeout(timer);
  }, []);


  // Dynamic SEO & Scroll-to-top Effect
  useLayoutEffect(() => {
    setTimeout(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    }, 0);
    
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
        const imageUrl = currentArticle.imageUrls?.[0] || '';

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', imageUrl);
        return;
    }

    if (currentPage === 'productDetail' && currentProduct) {
        const title = `${currentProduct.name} | Uboncomputer`;
        const description = currentProduct.description || `ซื้อ ${currentProduct.name} ราคาพิเศษ. ${currentProduct.category} คุณภาพดีจากแบรนด์ ${currentProduct.brand}.`;
        const url = `https://www.uboncomputer.com/product/${currentProduct.id}`;
        const imageUrl = currentProduct.imageUrls?.[0] || '';

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', imageUrl);
        return;
    }

    if (currentPage === 'computerSetDetail' && currentComputerSet) {
        const title = `${currentComputerSet.name} | Uboncomputer`;
        const specString = Object.entries(currentComputerSet.specs)
            .filter(([key, value]) => key !== 'notes' && value)
            .map(([, value]) => value as string)
            .join(', ');
        const description = `ซื้อคอมพิวเตอร์เซ็ต ${currentComputerSet.name} สเปค ${specString} ราคาพิเศษ.`;
        const url = `https://www.uboncomputer.com/computer-set/${currentComputerSet.id}`;
        const imageUrl = currentComputerSet.imageUrls?.[0] || '';

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', imageUrl);
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', imageUrl);
        return;
    }

    if (currentPage === 'jobDetail' && currentJobOpening) {
        const title = `สมัครงาน: ${currentJobOpening.title} | Uboncomputer`;
        const description = `สมัครงานตำแหน่ง ${currentJobOpening.title} ที่ Uboncomputer. ${currentJobOpening.description.substring(0, 150)}...`;
        const url = `https://www.uboncomputer.com/careers/${currentJobOpening.id}`;

        document.title = title;
        updateMeta('meta[name="description"]', 'content', description);
        updateMeta('link[rel="canonical"]', 'href', url);
        updateMeta('meta[property="og:title"]', 'content', title);
        updateMeta('meta[property="og:description"]', 'content', description);
        updateMeta('meta[property="og:url"]', 'content', url);
        updateMeta('meta[property="og:image"]', 'content', 'https://www.img.in.th/images/9920d317075c7423013280048e426210.png');
        updateMeta('meta[property="twitter:title"]', 'content', title);
        updateMeta('meta[property="twitter:description"]', 'content', description);
        updateMeta('meta[property="twitter:image"]', 'content', 'https://www.img.in.th/images/9920d317075c7423013280048e426210.png');
        return;
    }


    const pageKey = currentPage as SeoEditablePage;
    if (!(pageKey in seoData)) return;

    const pageSeo = seoData[pageKey];
    let { title, description } = pageSeo;
    
    if (pageKey === 'searchResults' && searchQuery) {
        title = `ผลการค้นหาสำหรับ "${searchQuery}" | Uboncomputer`;
    }

    const paths: Partial<Record<SeoEditablePage, string>> = { home: '/', pcBuilder: '/pc-builder', computerSet: '/computer-set', articles: '/articles', promotions: '/promotions', contact: '/contact', about: '/about', account: '/account', cart: '/cart', checkout: '/checkout', corporate: '/corporate', faq: '/faq', orderStatus: '/order-status', searchResults: '/search', allProducts: '/products', privacy: '/privacy-policy', terms: '/terms-of-service', cookies: '/cookie-policy', shipping: '/shipping-policy', returns: '/return-policy', careers: '/careers', compare: '/compare', reviews: '/reviews', cpu: '/cpu', gpu: '/gpu', ram: '/ram', motherboard: '/motherboard', storage: '/storage', case: '/case', cooling: '/cooling', powerSupply: '/power-supply', gamingGear: '/gaming-gear', network: '/network', software: '/software', server: '/server' };
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
  }, [currentPage, seoData, currentArticle, currentProduct, currentComputerSet, currentJobOpening, searchQuery]);


  const navigateTo = (page: Page, data?: { articleId?: number; productId?: number; computerSetId?: number; searchQuery?: string; jobId?: number }) => {
    const isAdminPage = page === 'admin';
    const canAccessAdmin = currentUser?.role === 'admin' || currentUser?.role === 'editor';
    if (isAdminPage && !canAccessAdmin) {
        addToast('คุณไม่มีสิทธิ์เข้าถึงหน้านี้', 'error');
        setIsAuthModalOpen(true);
        return;
    }
    
    if (page === 'account' && !isUserLoggedIn) {
        addToast('กรุณาเข้าสู่ระบบเพื่อดูบัญชีของคุณ', 'info');
        setIsAuthModalOpen(true);
        return;
    }
    
    setCurrentArticle(null);
    setCurrentProduct(null);
    setCurrentComputerSet(null);
    setCurrentJobOpening(null);

    if (page === 'searchResults' && data?.searchQuery) setSearchQuery(data.searchQuery);
    if (page === 'articleDetail' && data?.articleId) {
        const article = articles.find(a => a.id === data.articleId);
        if (article) setCurrentArticle(article); else { setCurrentPage('articles'); return; }
    } else if (page === 'productDetail' && data?.productId) {
        const product = products.find(p => p.id === data.productId);
        if (product) setCurrentProduct(product); else { setCurrentPage('home'); return; }
    } else if (page === 'computerSetDetail' && data?.computerSetId) {
        let foundSet: ComputerSetProduct | null = null;
        for (const group of computerSetGroups) { const found = group.products.find(p => p.id === data.computerSetId); if (found) { foundSet = found; break; } }
        if (foundSet) setCurrentComputerSet(foundSet); else { setCurrentPage('computerSet'); return; }
    } else if (page === 'jobDetail' && data?.jobId) {
        const foundJob = careersPageContent.openings.jobs.find(j => j.id === data.jobId) || null;
        if (foundJob) setCurrentJobOpening(foundJob); else { setCurrentPage('careers'); return; }
    }

    setCurrentPage(page);
  };
  
  const addLog = (level: LogLevel, message: string) => {
    const newLog: LogEntry = { id: Date.now(), timestamp: new Date().toISOString(), level, message };
    setLogs(prev => {
      const newLogs = [newLog, ...prev].slice(200); // keep 200 logs
      saveData('logs', newLogs);
      return newLogs;
    });
  };

  const handleClearLogs = () => {
    if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการล้างข้อมูล Log ทั้งหมด?")) {
        setLogs([]);
        saveData('logs', []);
        addToast('ล้างข้อมูล Log ทั้งหมดแล้ว', 'success');
        addLog('WARN', `Logs were cleared by ${currentUser?.name}.`);
    }
  };

  const handleUserLogin = (email: string, pass: string): boolean => {
    const user = users.find(u => u.email.toLowerCase() === email.toLowerCase() && u.password === pass);
    if (user) {
        setCurrentUser(user);
        setIsAuthModalOpen(false);
        addToast(`ยินดีต้อนรับ, ${user.name}!`, 'success');
        addLog('SUCCESS', `User ${user.name} logged in.`);
        return true;
    }
    addToast('อีเมลหรือรหัสผ่านไม่ถูกต้อง', 'error');
    return false;
  };

  const handleUserRegister = (name: string, email: string, pass: string): boolean => {
    const emailExists = users.some(u => u.email.toLowerCase() === email.toLowerCase());
    if (emailExists) {
        addToast('อีเมลนี้ถูกใช้งานแล้ว', 'error');
        return false;
    }
    const newUser: User = {
        id: Date.now(),
        name,
        email,
        password: pass, // In a real app, hash this!
        role: 'user',
        createdAt: new Date().toISOString(),
    };
    setUsers(prev => {
        const newUsers = [...prev, newUser];
        saveData('users', newUsers);
        return newUsers;
    });
    addLog('INFO', `New user registered: ${name} (${email}).`);
    return true;
  };

  const handleUserLogout = () => {
    addLog('INFO', `User ${currentUser?.name} logged out.`);
    setCurrentUser(null);
    addToast('ออกจากระบบสำเร็จ', 'info');
    navigateTo('home');
  };

  const handleSaveUser = (userToSave: User) => {
    setUsers(prev => {
        const newUsers = prev.map(u => u.id === userToSave.id ? userToSave : u);
        saveData('users', newUsers);
        addLog('WARN', `User profile updated for ${userToSave.name} by ${currentUser?.name}.`);
        return newUsers;
    });
  };
  
  const handleDeleteUser = (userId: number) => {
      setUsers(prev => {
          const userToDelete = prev.find(u => u.id === userId);
          const newUsers = prev.filter(u => u.id !== userId);
          saveData('users', newUsers);
          if (userToDelete) {
            addLog('ERROR', `User ${userToDelete.name} was deleted by ${currentUser?.name}.`);
          }
          return newUsers;
      });
  };

  const handleResetAllData = () => {
      if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการรีเซ็ตข้อมูลทั้งหมดกลับเป็นค่าเริ่มต้น? การกระทำนี้ไม่สามารถย้อนกลับได้")) {
          Object.keys(localStorage).forEach(key => {
              if (key.startsWith(LOCAL_STORAGE_KEY_PREFIX)) {
                  localStorage.removeItem(key);
              }
          });
          window.location.reload();
      }
  };

  const handleSaveProduct = (productToSave: Product) => {
    setProducts(prev => {
        const exists = prev.some(p => p.id === productToSave.id);
        const newProducts = exists
            ? prev.map(p => p.id === productToSave.id ? productToSave : p)
            : [...prev, { ...productToSave, id: Math.max(0, ...prev.map(p => p.id)) + 1 }];
        saveData('products', newProducts);
        addLog('INFO', `Product '${productToSave.name}' was ${exists ? 'updated' : 'created'}.`);
        return newProducts;
    });
  };

  const handleDeleteProduct = (productId: number) => {
      setProducts(prev => {
          const productToDelete = prev.find(p => p.id === productId);
          const newProducts = prev.filter(p => p.id !== productId);
          saveData('products', newProducts);
          if(productToDelete) addLog('WARN', `Product '${productToDelete.name}' was deleted.`);
          return newProducts;
      });
  };

  const handleSaveArticle = (articleToSave: Article) => {
    setArticles(prev => {
        const exists = prev.some(a => a.id === articleToSave.id);
        const newId = Math.max(0, ...prev.map(a => a.id)) + 1;
        const newArticles = exists
            ? prev.map(a => a.id === articleToSave.id ? { ...articleToSave, link: `/article/${articleToSave.id}` } : a)
            : [...prev, { ...articleToSave, id: newId, link: `/article/${newId}` }];
        saveData('articles', newArticles);
        return newArticles;
    });
  };

  const handleDeleteArticle = (articleId: number) => {
      setArticles(prev => {
          const newArticles = prev.filter(a => a.id !== articleId);
          saveData('articles', newArticles);
          return newArticles;
      });
  };

  const handleSaveHeroSlide = (slideToSave: HeroSlide) => {
    setHeroSlides(prev => {
        const exists = prev.some(s => s.id === slideToSave.id);
        const newSlides = exists
            ? prev.map(s => s.id === slideToSave.id ? slideToSave : s)
            : [...prev, { ...slideToSave, id: Math.max(0, ...prev.map(s => s.id)) + 1 }];
        saveData('heroSlides', newSlides);
        return newSlides;
    });
  };

  const handleDeleteHeroSlide = (slideId: number) => {
      setHeroSlides(prev => {
          const newSlides = prev.filter(s => s.id !== slideId);
          saveData('heroSlides', newSlides);
          return newSlides;
      });
  };
  
  const handleSaveComputerSetGroup = (groupToSave: ComputerSetGroup) => {
    setComputerSetGroups(prev => {
        const exists = prev.some(g => g.id === groupToSave.id);
        const newGroups = exists
            ? prev.map(g => g.id === groupToSave.id ? groupToSave : g)
            : [...prev, { ...groupToSave, id: Math.max(0, ...prev.map(g => g.id)) + 1, products: groupToSave.products.map((p, index) => ({ ...p, id: p.id || (Date.now() + index) })) }];
        saveData('computerSetGroups', newGroups);
        return newGroups;
    });
  };

  const handleDeleteComputerSetGroup = (groupId: number) => {
      setComputerSetGroups(prev => {
          const newGroups = prev.filter(g => g.id !== groupId);
          saveData('computerSetGroups', newGroups);
          return newGroups;
      });
  };

  const handleSaveSeoData = (newSeoData: SeoData) => { saveData('seoData', newSeoData); setSeoData(newSeoData); };
  const handleSaveHomepageContent = (newContent: HomepageContent) => { saveData('homepageContent', newContent); setHomepageContent(newContent); };
  const handleSaveCategoryPageData = (newData: AllCategoryPageData) => { saveData('categoryPageData', newData); setCategoryPageData(newData); };
  const handleSaveComputerSetPageContent = (newContent: ComputerSetPageContent) => { saveData('computerSetPageContent', newContent); setComputerSetPageContent(newContent); };

  const handleSaveDiscountCode = (codeToSave: DiscountCode) => {
    setDiscountCodes(prev => {
        const exists = prev.some(c => c.id === codeToSave.id);
        const newCodes = exists
            ? prev.map(c => c.id === codeToSave.id ? codeToSave : c)
            : [...prev, { ...codeToSave, id: Math.max(0, ...prev.map(c => c.id)) + 1 }];
        saveData('discountCodes', newCodes);
        return newCodes;
    });
  };

  const handleDeleteDiscountCode = (codeId: number) => {
      setDiscountCodes(prev => {
          const newCodes = prev.filter(c => c.id !== codeId);
          saveData('discountCodes', newCodes);
          return newCodes;
      });
  };

  const handleSaveAdminOrder = (orderToSave: AdminOrder) => {
    setAdminOrders(prev => {
        const exists = prev.some(o => o.id === orderToSave.id);
        const newOrders = exists ? prev.map(o => o.id === orderToSave.id ? orderToSave : o) : prev;
        saveData('adminOrders', newOrders);
        addLog('INFO', `Order #${orderToSave.orderNumber} status updated to ${orderToSave.status}.`);
        return newOrders;
    });
  };

  const handleDeleteAdminOrder = (orderId: number) => {
      setAdminOrders(prev => {
          const newOrders = prev.filter(o => o.id !== orderId);
          saveData('adminOrders', newOrders);
          return newOrders;
      });
  };

  const handleSaveCareersPageContent = (newContent: CareersPageContent) => { saveData('careersPageContent', newContent); setCareersPageContent(newContent); };

  const handleSaveJobApplication = (applicationData: Omit<JobApplication, 'id' | 'submissionDate'>) => {
    setJobApplications(prev => {
        const newApplication: JobApplication = { ...applicationData, id: Date.now(), submissionDate: new Date().toISOString() };
        const newApplications = [newApplication, ...prev];
        saveData('jobApplications', newApplications);
        addLog('SUCCESS', `New job application received from ${applicationData.fullName} for '${applicationData.jobTitle}'.`);
        return newApplications;
    });
  };

  const handleDeleteJobApplication = (applicationId: number) => {
      setJobApplications(prev => {
          const appToDelete = prev.find(app => app.id === applicationId);
          const newApplications = prev.filter(app => app.id !== applicationId);
          saveData('jobApplications', newApplications);
          if (appToDelete) addLog('WARN', `Job application from ${appToDelete.fullName} was deleted.`);
          return newApplications;
      });
  };
  
  const handleSaveHeaderMenuData = (newData: HeaderMenuData) => { saveData('headerMenuData', newData); setHeaderMenuData(newData); };

  const handleSaveReview = (productId: number, reviewData: Omit<Review, 'id' | 'productId' | 'date'>) => {
    setProducts(prevProducts => {
        const productIndex = prevProducts.findIndex(p => p.id === productId);
        if (productIndex === -1) return prevProducts;

        const updatedProduct = { ...prevProducts[productIndex] };
        const newReview: Review = { id: Date.now(), productId: productId, date: new Date().toISOString(), ...reviewData };
        updatedProduct.reviews = [...updatedProduct.reviews, newReview];
        updatedProduct.reviewCount = updatedProduct.reviews.length;
        const totalRating = updatedProduct.reviews.reduce((acc, r) => acc + r.rating, 0);
        updatedProduct.rating = totalRating / updatedProduct.reviewCount;

        const newProducts = [...prevProducts];
        newProducts[productIndex] = updatedProduct;
        saveData('products', newProducts);
        
        if (currentProduct && currentProduct.id === productId) setCurrentProduct(updatedProduct);
        
        addLog('INFO', `New review submitted for '${updatedProduct.name}' by ${reviewData.author}.`);
        return newProducts;
    });
  };

  const renderPage = () => {
    const categoryKey = currentPage as ProductCategory;
    const categoryConfig = categoryConfigurations[categoryKey];

    if (categoryConfig) {
      const pageData = categoryPageData[categoryKey];
      return <CategoryPage allProducts={products} categoryConfig={categoryConfig} bannerUrl={pageData.bannerUrl} onNavigate={navigateTo} />;
    }

    switch (currentPage) {
      case 'home': return (
        <>
            <Hero slides={heroSlides} />
            <div className="animate-slide-in-up" style={{ animationDelay: '0ms' }}>
                <InfoBar items={homepageContent.infoBar.items} />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '100ms' }}>
                <CategoryGrid onNavigate={navigateTo} />
            </div>
            <div className="container mx-auto px-4 sm:px-6 2xl:px-8 py-4 animate-slide-in-up" style={{ animationDelay: '200ms' }}>
                 <PromoBanners banners={homepageContent.promoBanners} />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '300ms' }}>
                 <ProductDisplaySection viewAllPage="allProducts" onNavigate={navigateTo} title={homepageContent.sectionTitles.newProducts} products={homepageContent.newProducts} brands={[]} sidebarTitle="สินค้าใหม่" />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '400ms' }}>
                 <MainPromoBanner banner={homepageContent.mainPromoBanner} />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '500ms' }}>
                 <ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.notebooks} products={homepageContent.notebooks} brands={homepageContent.notebookBrands} sidebarTitle="โน้ตบุ๊ค" />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '600ms' }}>
                 <ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.computers} products={homepageContent.computers} brands={homepageContent.computerBrands} sidebarTitle="คอมพิวเตอร์" />
            </div>
            <section className="py-12 bg-white animate-slide-in-up" style={{ animationDelay: '700ms' }}> 
                 <div className="container mx-auto px-4 sm:px-6 2xl:px-8"> 
                     <DualPromoCarousel carousels={homepageContent.dualCarousels} /> 
                 </div> 
            </section>
            <div className="animate-slide-in-up" style={{ animationDelay: '800ms' }}>
                 <ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.preBuiltPCs} products={homepageContent.preBuiltPCs} brands={homepageContent.preBuiltPCBrands} sidebarTitle="คอมประกอบ" />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '900ms' }}>
                 <ProductDisplaySection onNavigate={navigateTo} title={homepageContent.sectionTitles.printers} products={homepageContent.printers} brands={homepageContent.printerBrands} sidebarTitle="ปริ้นเตอร์" />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '1000ms' }}>
                 <YoutubeSection title={homepageContent.sectionTitles.youtube} videos={homepageContent.youtube.videos} />
            </div>
            <div className="animate-slide-in-up" style={{ animationDelay: '1100ms' }}>
                 <ArticleSection onNavigate={navigateTo} articles={articles} title={homepageContent.sectionTitles.articles} />
            </div>
            <div className="bg-gray-50 py-12 animate-slide-in-up" style={{ animationDelay: '1200ms' }}>
                <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
                    <StoreInfo content={homepageContent.storeInfo} />
                </div>
            </div>
             <div className="animate-slide-in-up" style={{ animationDelay: '1300ms' }}>
                 <IntroSection content={homepageContent.introSection} />
            </div>
        </>
      );
      case 'pcBuilder': return <PCBuilderPage products={products} />;
      case 'computerSet': return <ComputerSetPage onNavigate={navigateTo} groups={computerSetGroups} content={computerSetPageContent} />;
      case 'computerSetDetail': return currentComputerSet ? <ComputerSetDetailPage product={currentComputerSet} relatedProducts={computerSetGroups.find(g => g.products.some(p => p.id === currentComputerSet.id))?.products.filter(p => p.id !== currentComputerSet.id) || []} onNavigate={navigateTo} /> : null;
      case 'articles': return <ArticleListPage articles={articles} onNavigate={navigateTo} />;
      case 'articleDetail': return currentArticle ? <ArticlePage article={currentArticle} onNavigate={navigateTo} /> : null;
      case 'productDetail': return currentProduct ? <ProductPage product={currentProduct} allProducts={products} onNavigate={navigateTo} onSaveReview={handleSaveReview} isUserLoggedIn={isUserLoggedIn} currentUser={currentUser} adminOrders={adminOrders} onAuthClick={() => setIsAuthModalOpen(true)} /> : null;
      case 'searchResults': return <SearchResultsPage query={searchQuery} allProducts={products} onNavigate={navigateTo} />;
      case 'allProducts': return <AllProductsPage allProducts={products} onNavigate={navigateTo} />;
      case 'promotions': return <PromotionsPage allProducts={products} onNavigate={navigateTo} />;
      case 'contact': return <ContactPage />;
      case 'about': return <AboutPage onNavigate={navigateTo} />;
       case 'account': return currentUser ? <AccountPage currentUser={currentUser} userOrders={adminOrders.filter(o => o.customer.email === currentUser.email)} onNavigate={navigateTo} onLogout={handleUserLogout} onSaveAdminOrder={handleSaveAdminOrder} /> : null;
      case 'cart': return <CartPage onNavigate={navigateTo} />;
      case 'checkout': return <CheckoutPage onNavigate={navigateTo} discountCodes={discountCodes} addLog={addLog} currentUser={currentUser} />;
      case 'corporate': return <CorporatePage />;
      case 'faq': return <FAQPage onNavigate={navigateTo} />;
      case 'orderStatus': return <OrderStatusPage adminOrders={adminOrders} />;
      case 'compare': return <ComparePage onNavigate={navigateTo} />;
      case 'reviews': return <ReviewsPage products={products} onNavigate={navigateTo} />;
      case 'privacy': return <PrivacyPolicyPage onNavigate={navigateTo} />;
      case 'terms': return <TermsOfServicePage onNavigate={navigateTo} />;
      case 'cookies': return <CookiePolicyPage onNavigate={navigateTo} />;
      case 'shipping': return <ShippingPolicyPage onNavigate={navigateTo} />;
      case 'returns': return <ReturnPolicyPage onNavigate={navigateTo} />;
      case 'jobDetail': return currentJobOpening ? <JobDetailPage job={currentJobOpening} onNavigate={navigateTo} onSaveApplication={handleSaveJobApplication} /> : null;
      case 'careers': return <CareersPage content={careersPageContent} onNavigate={navigateTo} />;
      case 'admin':
        return isAdmin ? (
          <AdminPage
            products={products}
            categories={categories}
            articles={articles}
            computerSetGroups={computerSetGroups}
            heroSlides={heroSlides}
            seoData={seoData}
            homepageContent={homepageContent}
            categoryPageData={categoryPageData}
            computerSetPageContent={computerSetPageContent}
            discountCodes={discountCodes}
            adminOrders={adminOrders}
            careersPageContent={careersPageContent}
            jobApplications={jobApplications}
            headerMenuData={headerMenuData}
            users={users}
            logs={logs}
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
            onSaveComputerSetPageContent={handleSaveComputerSetPageContent}
            onSaveDiscountCode={handleSaveDiscountCode}
            onDeleteDiscountCode={handleDeleteDiscountCode}
            onSaveAdminOrder={handleSaveAdminOrder}
            onDeleteAdminOrder={handleDeleteAdminOrder}
            onSaveCareersPageContent={handleSaveCareersPageContent}
            onDeleteJobApplication={handleDeleteJobApplication}
            onSaveHeaderMenuData={handleSaveHeaderMenuData}
            onSaveUser={handleSaveUser}
            onDeleteUser={handleDeleteUser}
            onClearLogs={handleClearLogs}
            onResetAllData={handleResetAllData}
            onLogout={handleUserLogout}
            onNavigate={navigateTo}
          />
        ) : null;
      default:
        return null;
    }
  };
  
  const pageKey = `${currentPage}-${currentArticle?.id || 'none'}-${currentProduct?.id || 'none'}-${currentComputerSet?.id || 'none'}-${currentJobOpening?.id || 'none'}-${searchQuery}`;
  
  const isFullPageLayout = currentPage === 'admin';

  return (
    <>
      {isLoading && <LoadingScreen isHiding={isHidingLoader} />}
      <div className={`bg-slate-50 min-h-screen flex flex-col pb-20 2xl:pb-0 transition-opacity duration-500 ${isHidingLoader || !isLoading ? 'opacity-100' : 'opacity-0'}`}>
        
        {!isFullPageLayout && (
            <Header 
              onSearchSubmit={(term) => navigateTo('searchResults', { searchQuery: term })} 
              onNavigate={navigateTo} 
              onAuthClick={() => setIsAuthModalOpen(true)} 
              currentPage={currentPage}
              topBarText={homepageContent.headerTopBarText}
              allProducts={products}
              headerMenuData={headerMenuData}
              isUserLoggedIn={isUserLoggedIn}
              currentUser={currentUser}
              onUserLogout={handleUserLogout}
              branding={homepageContent.branding}
            />
        )}

        {/* Padding adjusted to ensure fixed header does not overlap content */}
        <main className={`flex-grow relative z-0 ${!isFullPageLayout ? 'pt-[120px] 2xl:pt-[130px]' : ''}`}>
          <div key={pageKey} className="animate-slide-in-up">
            {renderPage()}
          </div>
        </main>
        
        {!isFullPageLayout && (
            <Footer 
              onAuthClick={() => setIsAuthModalOpen(true)} 
              onNavigate={navigateTo}
              socialLinks={homepageContent.socialLinks}
              branding={homepageContent.branding}
            />
        )}

        {!isFullPageLayout && (
           <>
              <ComparisonTray onNavigate={navigateTo} />
              <MobileNavBar 
                onNavigate={navigateTo} 
                currentPage={currentPage} 
                onAuthClick={() => setIsAuthModalOpen(true)}
                isUserLoggedIn={isUserLoggedIn}
              />
              <CookieConsent onNavigate={navigateTo} />
           </>
        )}
        
        {isAuthModalOpen && (
          <AuthModal 
            onClose={() => setIsAuthModalOpen(false)} 
            onLogin={handleUserLogin}
            onRegister={handleUserRegister}
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
      </div>
    </>
  );
};

export default App;
