'use client';

import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product, Category, Article, ComputerSetGroup, HeroSlide, Page, SeoData, HomepageContent, AllCategoryPageData, DiscountCode } from '../types';
import { mockProducts, mockCategories, mockComputerSetGroups, mockArticles, mockHeroSlides, mockSeoData, mockHomepageContent, mockCategoryPageData, mockDiscountCodes } from '../constants';
import { useToast } from '../hooks/useToast';

interface AppContextType {
  products: Product[];
  categories: Category[];
  computerSetGroups: ComputerSetGroup[];
  articles: Article[];
  heroSlides: HeroSlide[];
  seoData: SeoData;
  homepageContent: HomepageContent;
  categoryPageData: AllCategoryPageData;
  discountCodes: DiscountCode[];
  
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (isOpen: boolean) => void;
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: (isOpen: boolean) => void;
  isAdminLoggedIn: boolean;
  
  handleAdminLogin: (user: string, pass: string) => boolean;
  handleAdminLogout: () => void;
  
  onSaveProduct: (productToSave: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onSaveArticle: (articleToSave: Article) => void;
  onDeleteArticle: (articleId: number) => void;
  onSaveHeroSlide: (slideToSave: HeroSlide) => void;
  onDeleteHeroSlide: (slideId: number) => void;
  onSaveComputerSetGroup: (groupToSave: ComputerSetGroup) => void;
  onDeleteComputerSetGroup: (groupId: number) => void;
  onSaveSeoData: (newSeoData: SeoData) => void;
  onSaveHomepageContent: (newContent: HomepageContent) => void;
  onSaveCategoryPageData: (newData: AllCategoryPageData) => void;
  onSaveDiscountCode: (codeToSave: DiscountCode) => void;
  onDeleteDiscountCode: (codeId: number) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { addToast } = useToast();

  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories] = useState<Category[]>(mockCategories);
  const [computerSetGroups, setComputerSetGroups] = useState<ComputerSetGroup[]>(mockComputerSetGroups);
  const [articles, setArticles] = useState<Article[]>(mockArticles);
  const [heroSlides, setHeroSlides] = useState<HeroSlide[]>(mockHeroSlides);
  const [seoData, setSeoData] = useState<SeoData>(mockSeoData);
  const [homepageContent, setHomepageContent] = useState<HomepageContent>(mockHomepageContent);
  const [categoryPageData, setCategoryPageData] = useState<AllCategoryPageData>(mockCategoryPageData);
  const [discountCodes, setDiscountCodes] = useState<DiscountCode[]>(mockDiscountCodes);

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminLoggedIn, setIsAdminLoggedIn] = useState(false);

  const handleAdminLogin = (user: string, pass: string): boolean => {
      if (user === 'admin' && pass === 'admin987') {
          setIsAdminLoggedIn(true);
          setIsLoginModalOpen(false);
          addToast('เข้าสู่ระบบแอดมินสำเร็จ!', 'success');
          // Navigation will be handled by the component using this function
          return true;
      }
      addToast('ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง', 'error');
      return false;
  };

  const handleAdminLogout = () => {
      setIsAdminLoggedIn(false);
      addToast('ออกจากระบบแอดมินแล้ว', 'info');
      // Navigation will be handled by the component
  };

  const onSaveProduct = (productToSave: Product) => {
    setProducts(prev => {
        const exists = prev.some(p => p.id === productToSave.id);
        if (exists) {
            return prev.map(p => p.id === productToSave.id ? productToSave : p);
        } else {
            const newId = Math.max(0, ...prev.map(p => p.id)) + 1;
            return [...prev, { ...productToSave, id: newId }];
        }
    });
    addToast('บันทึกสินค้าเรียบร้อยแล้ว', 'success');
  };

  const onDeleteProduct = (productId: number) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
          setProducts(prev => prev.filter(p => p.id !== productId));
          addToast('ลบสินค้าเรียบร้อยแล้ว', 'success');
      }
  };

  const onSaveArticle = (articleToSave: Article) => {
    setArticles(prev => {
        const exists = prev.some(a => a.id === articleToSave.id);
        if (exists) {
            return prev.map(a => a.id === articleToSave.id ? { ...articleToSave, link: `/article/${articleToSave.id}` } : a);
        } else {
            const newId = Math.max(0, ...prev.map(a => a.id)) + 1;
            return [...prev, { ...articleToSave, id: newId, link: `/article/${newId}` }];
        }
    });
    addToast('บันทึกบทความเรียบร้อยแล้ว', 'success');
  };

  const onDeleteArticle = (articleId: number) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบบทความนี้?')) {
          setArticles(prev => prev.filter(a => a.id !== articleId));
          addToast('ลบบทความเรียบร้อยแล้ว', 'success');
      }
  };
  
  const onSaveHeroSlide = (slideToSave: HeroSlide) => {
    setHeroSlides(prev => {
        const exists = prev.some(s => s.id === slideToSave.id);
        if (exists) {
            return prev.map(s => s.id === slideToSave.id ? slideToSave : s);
        } else {
            const newId = Math.max(0, ...prev.map(s => s.id)) + 1;
            return [...prev, { ...slideToSave, id: newId }];
        }
    });
    addToast('บันทึก Hero Banner เรียบร้อยแล้ว', 'success');
  };

  const onDeleteHeroSlide = (slideId: number) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบ Hero Banner นี้?')) {
          setHeroSlides(prev => prev.filter(s => s.id !== slideId));
          addToast('ลบ Hero Banner เรียบร้อยแล้ว', 'success');
      }
  };
  
  const onSaveComputerSetGroup = (groupToSave: ComputerSetGroup) => {
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
    addToast('บันทึกข้อมูลคอมเซ็ตเรียบร้อยแล้ว', 'success');
  };

  const onDeleteComputerSetGroup = (groupId: number) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกลุ่มคอมเซ็ตนี้?')) {
          setComputerSetGroups(prev => prev.filter(g => g.id !== groupId));
          addToast('ลบกลุ่มคอมเซ็ตเรียบร้อยแล้ว', 'success');
      }
  };

  const onSaveSeoData = (newSeoData: SeoData) => {
    setSeoData(newSeoData);
    addToast('บันทึกข้อมูล SEO เรียบร้อยแล้ว', 'success');
  };
  
  const onSaveHomepageContent = (newContent: HomepageContent) => {
    setHomepageContent(newContent);
    addToast('บันทึกข้อมูลหน้าแรกเรียบร้อยแล้ว', 'success');
  };

  const onSaveCategoryPageData = (newData: AllCategoryPageData) => {
    setCategoryPageData(newData);
    addToast('บันทึกข้อมูลหน้าหมวดหมู่เรียบร้อยแล้ว', 'success');
  };

  const onSaveDiscountCode = (codeToSave: DiscountCode) => {
    setDiscountCodes(prev => {
        const exists = prev.some(c => c.id === codeToSave.id);
        if (exists) {
            return prev.map(c => c.id === codeToSave.id ? codeToSave : c);
        } else {
            const newId = Math.max(0, ...prev.map(c => c.id)) + 1;
            return [...prev, { ...codeToSave, id: newId }];
        }
    });
    addToast('บันทึกโค้ดส่วนลดเรียบร้อยแล้ว', 'success');
  };
  
  const onDeleteDiscountCode = (codeId: number) => {
      if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโค้ดส่วนลดนี้?')) {
          setDiscountCodes(prev => prev.filter(c => c.id !== codeId));
          addToast('ลบโค้ดส่วนลดเรียบร้อยแล้ว', 'success');
      }
  };


  const value: AppContextType = {
    products, categories, computerSetGroups, articles, heroSlides, seoData, homepageContent, categoryPageData, discountCodes,
    isAuthModalOpen, setIsAuthModalOpen,
    isLoginModalOpen, setIsLoginModalOpen,
    isAdminLoggedIn,
    handleAdminLogin, handleAdminLogout,
    onSaveProduct, onDeleteProduct,
    onSaveArticle, onDeleteArticle,
    onSaveHeroSlide, onDeleteHeroSlide,
    onSaveComputerSetGroup, onDeleteComputerSetGroup,
    onSaveSeoData, onSaveHomepageContent, onSaveCategoryPageData,
    onSaveDiscountCode, onDeleteDiscountCode,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
