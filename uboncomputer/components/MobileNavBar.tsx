'use client';
import React, { useState } from 'react';
import { Home, LayoutGrid, Wrench, ShoppingCart, User } from 'lucide-react';
import CategoryModal from './CategoryModal';
import { Page, NavigateFunction } from '../types';
import { useCart } from '../hooks/useCart';

interface MobileNavBarProps {
  onAuthClick: () => void;
  onNavigate: NavigateFunction;
  currentPage: Page;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onAuthClick, onNavigate, currentPage }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { totalItems } = useCart();

  const navItems: { name: string; icon: React.ReactNode; page?: Page; action?: string }[] = [
    { name: 'หน้าแรก', icon: <Home size={24} />, page: 'home' },
    { name: 'หมวดหมู่', icon: <LayoutGrid size={24} />, action: 'openCategoryModal' },
    { name: 'จัดสเปคคอม', icon: <Wrench size={24} />, page: 'pcBuilder' },
    { name: 'ตะกร้า', icon: <ShoppingCart size={24} />, page: 'cart' },
    { name: 'บัญชี', icon: <User size={24} />, action: 'openAuthModal' },
  ];

  const handleItemClick = (action?: string, page?: Page) => {
    if (page) {
        onNavigate(page);
    } else if (action === 'openCategoryModal') {
        setIsCategoryModalOpen(true);
    } else if (action === 'openAuthModal') {
        onAuthClick();
    }
  };

  return (
    <>
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-white shadow-[0_-2px_10px_rgba(0,0,0,0.08)] z-50 border-t border-gray-200">
        <div className="container mx-auto px-2">
          <div className="flex justify-around items-center h-16">
            {navItems.map((item) => {
              const isCurrent = item.page ? currentPage === item.page : false;
              const commonClasses = "flex flex-col items-center justify-center space-y-1 w-full transition-colors duration-200 relative";
              const activeClasses = isCurrent ? 'text-red-600' : 'text-gray-600 hover:text-red-500';
              
              return (
                 <button
                  key={item.name}
                  onClick={() => handleItemClick(item.action, item.page)}
                  className={`${commonClasses} ${activeClasses}`}
                  aria-label={item.name}
                >
                  {/* FIX: Add <any> type assertion to React.ReactElement to resolve className prop error */}
                  {React.cloneElement(item.icon as React.ReactElement<any>, { className: 'w-6 h-6' })}
                  <span className="text-xs font-medium">{item.name}</span>
                  {item.page === 'cart' && totalItems > 0 && (
                     <span className="absolute top-0 right-[calc(50%-20px)] flex items-center justify-center h-4 w-4 bg-orange-500 text-white text-[10px] rounded-full">
                        {totalItems}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>
      <CategoryModal 
        isOpen={isCategoryModalOpen} 
        onClose={() => setIsCategoryModalOpen(false)}
        onNavigate={onNavigate}
      />
    </>
  );
};

export default MobileNavBar;