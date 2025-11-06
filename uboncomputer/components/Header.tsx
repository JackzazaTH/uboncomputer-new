
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, User, Search, Menu, X, ChevronRight, LayoutGrid, ChevronDown,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Flame, PackageSearch, GitCompare, Gamepad2
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import SearchPreview from './SearchPreview';
import { Page, Product } from '../types';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';

type NavLink = {
  name: string;
  page: Page;
  action?: () => void;
  href?: string;
  icon?: React.ReactNode;
};

interface HeaderProps {
  onSearchSubmit: (term: string) => void;
  onNavigate: (page: Page, data?: { productId: number }) => void;
  onAuthClick: () => void;
  currentPage: Page;
  topBarText: string;
  allProducts: Product[];
}

const Header: React.FC<HeaderProps> = ({ onSearchSubmit, onNavigate, onAuthClick, currentPage, topBarText, allProducts }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  
  const [liveSearchTerm, setLiveSearchTerm] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { compareItems } = useComparison();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) {
        setIsCategoryDropdownOpen(false);
      }
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsPreviewOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setLiveSearchTerm(term);
    setIsPreviewOpen(term.length > 0);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (liveSearchTerm.trim()) {
      onSearchSubmit(liveSearchTerm.trim());
      setIsPreviewOpen(false);
      setLiveSearchTerm('');
    }
  };

  const handlePreviewNavigate = (page: Page, data?: { productId: number }) => {
      onNavigate(page, data);
      setIsPreviewOpen(false);
      setLiveSearchTerm('');
  }

  const mainNavLinks: NavLink[] = [
    { name: 'หน้าแรก', page: 'home', action: () => onNavigate('home') },
    { name: 'คอมพิวเตอร์เซต', page: 'computerSet', action: () => onNavigate('computerSet') },
    { name: 'จัดสเปคคอม', page: 'pcBuilder', action: () => onNavigate('pcBuilder') },
    { name: 'โปรโมชั่น', page: 'promotions', action: () => onNavigate('promotions'), icon: <Flame className="w-4 h-4 mr-1 text-red-500" /> },
    { name: 'เช็คสถานะ', page: 'orderStatus', action: () => onNavigate('orderStatus'), icon: <PackageSearch className="w-4 h-4 mr-1 text-blue-500" /> },
    { name: 'หน่วยงานและองค์กร', page: 'corporate', action: () => onNavigate('corporate') },
    { name: 'บทความ', page: 'articles', action: () => onNavigate('articles') },
    { name: 'ติดต่อเรา', page: 'contact', action: () => onNavigate('contact') },
    { name: 'เกี่ยวกับเรา', page: 'about', action: () => onNavigate('about') },
  ];

  const dropdownCategories = [
    { name: 'จัดสเปคคอม', icon: <Wrench size={20} className="text-gray-500"/>, page: 'pcBuilder' as Page },
    { name: 'คอมพิวเตอร์เซตโปรโมชั่น', icon: <Computer size={20} className="text-gray-500"/>, page: 'computerSet' as Page },
    { name: 'โน้ตบุ๊ค', icon: <Laptop size={20} className="text-gray-500"/>, page: 'home' as Page }, // Placeholder
    { name: 'ซีพียู', icon: <Cpu size={20} className="text-gray-500"/>, page: 'cpu' as Page },
    { name: 'การ์ดจอ', icon: <CircuitBoard size={20} className="text-gray-500"/>, page: 'gpu' as Page },
    { name: 'เมนบอร์ด', icon: <Cog size={20} className="text-gray-500"/>, page: 'motherboard' as Page },
    { name: 'แรม', icon: <MemoryStick size={20} className="text-gray-500"/>, page: 'ram' as Page },
    { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive size={20} className="text-gray-500"/>, page: 'storage' as Page },
    { name: 'พาวเวอร์ซัพพลาย', icon: <Power size={20} className="text-gray-500"/>, page: 'powerSupply' as Page },
    { name: 'เคส', icon: <Box size={20} className="text-gray-500"/>, page: 'case' as Page },
    { name: 'ชุดระบายความร้อน', icon: <Fan size={20} className="text-gray-500"/>, page: 'cooling' as Page },
    { name: 'เกมมิ่งเกียร์', icon: <Gamepad2 size={20} className="text-gray-500"/>, page: 'gamingGear' as Page },
    // These can be linked to other pages or stay as placeholders
    { name: 'เน็ตเวิร์ค', icon: <Router size={20} className="text-gray-500"/>, page: 'network' as Page }, 
    { name: 'ซอฟต์แวร์', icon: <FileCode size={20} className="text-gray-500"/>, page: 'software' as Page },
    { name: 'เซิร์ฟเวอร์', icon: <Server size={20} className="text-gray-500"/>, page: 'server' as Page },
];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Bar */}
      <div className="bg-gray-800 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-10">
            <p className="text-sm">{topBarText}</p>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
             <button onClick={() => onNavigate('home')} className="text-3xl font-bold text-gray-900 tracking-wider">
                UBON<span className="text-orange-500">COMPUTER</span>
              </button>
          </div>
          
          {/* Desktop Search Bar */}
          <div ref={searchContainerRef} className="hidden lg:flex flex-1 justify-center px-6 lg:px-12">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-lg relative">
              <input
                type="search"
                placeholder="ค้นหาสินค้า..."
                value={liveSearchTerm}
                onChange={handleSearchChange}
                onFocus={() => liveSearchTerm && setIsPreviewOpen(true)}
                className="w-full bg-gray-100 border border-gray-300 rounded-full py-2.5 pl-12 pr-4 text-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all placeholder:text-gray-500"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              {isPreviewOpen && liveSearchTerm && (
                  <SearchPreview
                    searchTerm={liveSearchTerm}
                    products={allProducts}
                    onNavigate={handlePreviewNavigate}
                    onSearchSubmit={onSearchSubmit}
                    onClose={() => setIsPreviewOpen(false)}
                   />
              )}
            </form>
          </div>
          
          {/* Spacer on mobile */}
          <div className="flex-1 lg:hidden"></div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Mobile Search Icon */}
            <button className="lg:hidden p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-6 h-6" />
            </button>
            {/* Desktop User Icon */}
            <button onClick={onAuthClick} className="hidden lg:flex p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <User className="w-6 h-6" />
            </button>
            <button onClick={() => onNavigate('compare')} className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <GitCompare className="w-6 h-6" />
              {compareItems.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-blue-500 text-white text-xs rounded-full">
                  {compareItems.length}
                </span>
              )}
            </button>
            <button onClick={() => onNavigate('cart')} className="relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-orange-500 text-white text-xs rounded-full">
                  {totalItems}
                </span>
              )}
            </button>
             <button className="lg:hidden text-gray-800" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
          </div>
        </div>
      </div>

      {/* Navigation Bar */}
      <div className="border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-14">
            <div className="relative" ref={categoryDropdownRef}>
              <button 
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold px-4 py-2 rounded-md flex items-center transition-colors"
              >
                <LayoutGrid size={20} className="mr-2" />
                <span>หมวดหมู่สินค้า</span>
                <ChevronDown size={20} className={`ml-2 transition-transform duration-200 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isCategoryDropdownOpen && (
                 <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-fade-in-down">
                   <ul className="py-2 max-h-96 overflow-y-auto">
                     {dropdownCategories.map((category) => (
                       <li key={category.name}>
                        <button onClick={() => { onNavigate(category.page); setIsCategoryDropdownOpen(false); }} className="w-full flex items-center justify-between px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150">
                          <div className="flex items-center">
                             {category.icon}
                             <span className="ml-3 font-medium">{category.name}</span>
                           </div>
                           <ChevronRight size={16} className="text-gray-400" />
                         </button>
                       </li>
                     ))}
                   </ul>
                 </div>
              )}
            </div>
            <nav className="hidden lg:flex items-center space-x-6">
              {mainNavLinks.map((link) => {
                const isCurrent = link.page === currentPage;
                const className = `font-medium transition-colors flex items-center ${isCurrent ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`;
                return link.action ? (
                  <button key={link.name} onClick={link.action} className={className}>
                    {link.icon}{link.name}
                  </button>
                ) : (
                  <a key={link.name} href={link.href} className={className}>
                    {link.icon}{link.name}
                  </a>
                );
              })}
            </nav>
            <div className="hidden lg:block">
              {/* Could be an empty div for spacing or another element */}
            </div>
          </div>
        </div>
      </div>

       {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-200 bg-white">
          <nav className="flex flex-col space-y-1 px-4 py-4">
            {mainNavLinks.map((link) => {
                const isCurrent = link.page === currentPage;
                const className = `font-medium transition-colors rounded-md px-3 py-2 text-left flex items-center ${isCurrent ? 'bg-orange-100 text-orange-600' : 'text-gray-600 hover:bg-gray-100 hover:text-orange-500'}`;
                return link.action ? (
                  <button key={link.name} onClick={() => {link.action!(); setIsMobileMenuOpen(false);}} className={className}>
                    {link.icon}{link.name}
                  </button>
                ) : (
                  <a key={link.name} href={link.href} className={className}>
                    {link.icon}{link.name}
                  </a>
                )
            })}
          </nav>
        </div>
      )}
      <SearchOverlay 
        isOpen={isSearchOpen} 
        onClose={() => setIsSearchOpen(false)} 
        onNavigate={onNavigate}
        allProducts={allProducts}
      />
    </header>
  );
};

export default Header;