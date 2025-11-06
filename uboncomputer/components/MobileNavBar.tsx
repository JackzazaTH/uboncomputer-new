
import React, { useState } from 'react';
import { Home, LayoutGrid, Wrench, ShoppingCart, User, GitCompare } from 'lucide-react';
import CategoryModal from './CategoryModal';
import { Page } from '../types';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';

interface MobileNavBarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onAuthClick: () => void;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onNavigate, currentPage, onAuthClick }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { totalItems } = useCart();
  const { compareItems } = useComparison();

  const navItems = [
    { name: 'หน้าแรก', icon: <Home size={24} />, page: 'home' as Page },
    { name: 'หมวดหมู่', icon: <LayoutGrid size={24} />, action: 'openCategoryModal' },
    { name: 'เปรียบเทียบ', icon: <GitCompare size={24} />, page: 'compare' as Page, badge: compareItems.length, badgeColor: 'bg-blue-500' },
    { name: 'ตะกร้า', icon: <ShoppingCart size={24} />, page: 'cart' as Page, badge: totalItems, badgeColor: 'bg-orange-500' },
    { name: 'บัญชี', icon: <User size={24} />, action: 'openAuthModal' },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    if (item.page) {
      onNavigate(item.page);
    } else if (item.action === 'openCategoryModal') {
      setIsCategoryModalOpen(true);
    } else if (item.action === 'openAuthModal') {
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
                  onClick={() => handleItemClick(item)}
                  className={`${commonClasses} ${activeClasses}`}
                  aria-label={item.name}
                >
                  {React.cloneElement(item.icon, { className: 'w-6 h-6' })}
                  <span className="text-xs font-medium">{item.name}</span>
                  {item.badge && item.badge > 0 && (
                     <span className={`absolute top-0 right-[calc(50%-20px)] flex items-center justify-center h-4 w-4 ${item.badgeColor} text-white text-[10px] rounded-full`}>
                        {item.badge}
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