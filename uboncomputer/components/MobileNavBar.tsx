import React, { useState } from 'react';
import { Home, LayoutGrid, GitCompare, ShoppingCart, User, UserCheck } from 'lucide-react';
import CategoryModal from './CategoryModal';
import { Page } from '../types';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';

interface MobileNavBarProps {
  onNavigate: (page: Page) => void;
  currentPage: Page;
  onAuthClick: () => void;
  isUserLoggedIn: boolean;
}

const MobileNavBar: React.FC<MobileNavBarProps> = ({ onNavigate, currentPage, onAuthClick, isUserLoggedIn }) => {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const { totalItems } = useCart();
  const { compareItems } = useComparison();

  const navItems = [
    { name: 'หน้าแรก', icon: <Home size={24} />, page: 'home' as Page },
    { name: 'หมวดหมู่', icon: <LayoutGrid size={24} />, action: 'openCategoryModal' },
    { name: 'เปรียบเทียบ', icon: <GitCompare size={24} />, page: 'compare' as Page, badge: compareItems.length, badgeColor: 'bg-blue-500' },
    { name: 'ตะกร้า', icon: <ShoppingCart size={24} />, page: 'cart' as Page, badge: totalItems, badgeColor: 'bg-orange-500' },
    { name: 'บัญชี', icon: isUserLoggedIn ? <UserCheck size={24} /> : <User size={24} />, action: 'authOrAccount', isAccount: true },
  ];

  const handleItemClick = (item: typeof navItems[0]) => {
    if (item.page) {
      onNavigate(item.page);
    } else if (item.action === 'openCategoryModal') {
      setIsCategoryModalOpen(true);
    } else if (item.action === 'authOrAccount') {
      if (isUserLoggedIn) {
        onNavigate('account');
      } else {
        onAuthClick();
      }
    }
  };

  return (
    <>
      <nav className="2xl:hidden fixed bottom-0 left-0 right-0 bg-white z-50 border-t border-gray-200 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
        <div className="container mx-auto px-2 max-w-md">
          <div className="flex justify-around items-center h-20">
            {navItems.map((item) => {
              const isCurrent = item.page ? currentPage === item.page : false;
              // For Account tab, it's "active" only when on the account page.
              // The logged-in state is indicated by a different icon.
              const isActive = (item.isAccount && currentPage === 'account') || isCurrent;
              
              const commonClasses = "flex flex-col items-center justify-center space-y-1 w-full h-full p-1 transition-colors duration-200";
              const activeClasses = isActive ? 'text-orange-600 font-bold' : 'text-gray-500 hover:text-orange-500';

              return (
                <button
                  key={item.name}
                  onClick={() => handleItemClick(item)}
                  className={`${commonClasses} ${activeClasses}`}
                  aria-label={item.name}
                >
                  <div className="relative">
                    {item.icon}
                    {item.badge !== undefined && item.badge > 0 && (
                       <span className={`absolute -top-1 -right-1.5 flex items-center justify-center h-4 w-4 ${item.badgeColor} text-white text-[9px] font-bold rounded-full border border-white`}>
                          {item.badge > 9 ? '9+' : item.badge}
                      </span>
                    )}
                  </div>
                  <span className="text-xs">{item.name}</span>
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