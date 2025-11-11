import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, User, Search, Menu, X, ChevronRight, LayoutGrid, ChevronDown,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Flame, PackageSearch, GitCompare, Gamepad2,
  Home, Building, Newspaper, Phone, Info as InfoIcon, Printer, MessageSquare
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import SearchPreview from './SearchPreview';
import { Page, Product, HeaderMenuData, LucideIconName } from '../types';
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
  headerMenuData: HeaderMenuData;
}

const iconMap: Record<LucideIconName, React.ReactNode> = {
    Wrench: <Wrench size={20} className="text-gray-500"/>,
    Computer: <Computer size={20} className="text-gray-500"/>,
    Monitor: <Monitor size={20} className="text-gray-500"/>,
    Printer: <Printer size={20} className="text-gray-500"/>,
    Laptop: <Laptop size={20} className="text-gray-500"/>,
    Cpu: <Cpu size={20} className="text-gray-500"/>,
    CircuitBoard: <CircuitBoard size={20} className="text-gray-500"/>,
    Cog: <Cog size={20} className="text-gray-500"/>,
    MemoryStick: <MemoryStick size={20} className="text-gray-500"/>,
    HardDrive: <HardDrive size={20} className="text-gray-500"/>,
    Power: <Power size={20} className="text-gray-500"/>,
    Box: <Box size={20} className="text-gray-500"/>,
    Fan: <Fan size={20} className="text-gray-500"/>,
    Gamepad2: <Gamepad2 size={20} className="text-gray-500"/>,
    Router: <Router size={20} className="text-gray-500"/>,
    FileCode: <FileCode size={20} className="text-gray-500"/>,
    Server: <Server size={20} className="text-gray-500"/>,
};


const Header: React.FC<HeaderProps> = ({ onSearchSubmit, onNavigate, onAuthClick, currentPage, topBarText, allProducts, headerMenuData }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([headerMenuData?.[0]?.id].filter(Boolean));
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

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    // When dropdown opens, ensure the first group is expanded if none are.
    if (isCategoryDropdownOpen && expandedGroups.length === 0 && headerMenuData.length > 0) {
      setExpandedGroups([headerMenuData[0].id]);
    }
  }, [isCategoryDropdownOpen, expandedGroups, headerMenuData]);


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
  
  const toggleGroup = (groupId: number) => {
    setExpandedGroups(prev => 
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  const mainNavLinks: NavLink[] = [
    { name: 'หน้าแรก', page: 'home', action: () => onNavigate('home') },
    { name: 'คอมพิวเตอร์เซต', page: 'computerSet', action: () => onNavigate('computerSet') },
    { name: 'จัดสเปคคอม', page: 'pcBuilder', action: () => onNavigate('pcBuilder') },
    { name: 'โปรโมชั่น', page: 'promotions', action: () => onNavigate('promotions'), icon: <Flame className="w-4 h-4 mr-1 text-red-500" /> },
    { name: 'รีวิวจากลูกค้า', page: 'reviews', action: () => onNavigate('reviews'), icon: <MessageSquare className="w-4 h-4 mr-1 text-green-500" /> },
    { name: 'เช็คสถานะ', page: 'orderStatus', action: () => onNavigate('orderStatus'), icon: <PackageSearch className="w-4 h-4 mr-1 text-blue-500" /> },
    { name: 'หน่วยงานและองค์กร', page: 'corporate', action: () => onNavigate('corporate') },
    { name: 'บทความ', page: 'articles', action: () => onNavigate('articles') },
    { name: 'ติดต่อเรา', page: 'contact', action: () => onNavigate('contact') },
    { name: 'เกี่ยวกับเรา', page: 'about', action: () => onNavigate('about') },
  ];

  // FIX: Changed Record<Page, React.ReactNode> to Partial<Record<Page, React.ReactNode>> to allow for optional page keys, as not all pages have a defined icon.
  const mobileNavIcons: Partial<Record<Page, React.ReactNode>> = {
      home: <Home size={20} />,
      computerSet: <Computer size={20} />,
      pcBuilder: <Wrench size={20} />,
      promotions: <Flame size={20} />,
      reviews: <MessageSquare size={20} />,
      orderStatus: <PackageSearch size={20} />,
      corporate: <Building size={20} />,
      articles: <Newspaper size={20} />,
      contact: <Phone size={20} />,
      about: <InfoIcon size={20} />,
      // Add other pages if needed, with default
  };

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
            <button onClick={() => onNavigate('compare')} className="hidden lg:flex relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
              <GitCompare className="w-6 h-6" />
              {compareItems.length > 0 && (
                <span className="absolute top-0 right-0 flex items-center justify-center h-5 w-5 bg-blue-500 text-white text-xs rounded-full">
                  {compareItems.length}
                </span>
              )}
            </button>
            <button onClick={() => onNavigate('cart')} className="hidden lg:flex relative p-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
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
                 <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-fade-in-down">
                   <div className="py-2 max-h-96 overflow-y-auto">
                     {headerMenuData.map((group) => (
                       <div key={group.id} className="py-1">
                          <button onClick={() => toggleGroup(group.id)} className="w-full flex items-center justify-between px-4 py-2 text-sm font-bold text-gray-800 hover:bg-gray-100">
                            <span>{group.title}</span>
                             <ChevronDown size={16} className={`text-gray-500 transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'rotate-180' : ''}`} />
                          </button>
                          {expandedGroups.includes(group.id) && (
                            <ul className="pl-4 pt-1 pb-2 border-l-2 border-gray-200 ml-4">
                              {group.links.map((link) => (
                                <li key={link.id}>
                                  <button onClick={() => { onNavigate(link.page); setIsCategoryDropdownOpen(false); }} className="w-full flex items-center justify-between px-3 py-2 text-sm text-gray-700 hover:bg-orange-50 hover:text-orange-600 rounded-md transition-colors duration-150">
                                    <div className="flex items-center">
                                      {iconMap[link.icon]}
                                      <span className="ml-3 font-medium">{link.name}</span>
                                    </div>
                                    <ChevronRight size={16} className="text-gray-400" />
                                  </button>
                                </li>
                              ))}
                            </ul>
                          )}
                       </div>
                     ))}
                   </div>
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
        <>
          <div className="lg:hidden fixed inset-0 bg-black/60 z-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
          <div 
            className="lg:hidden fixed top-0 left-0 h-full w-72 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out"
            style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between p-4 border-b h-20">
                <button onClick={() => { onNavigate('home'); setIsMobileMenuOpen(false); }} className="text-2xl font-bold text-gray-900">
                  UBON<span className="text-orange-500">COM</span>
                </button>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 rounded-full hover:bg-gray-100">
                  <X size={24} />
                </button>
              </div>
              
              <div className="p-4 border-b">
                <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center gap-3 p-3 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-colors">
                  <User size={20} />
                  <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
                </button>
              </div>

              <nav className="flex-grow p-4 space-y-2 overflow-y-auto">
                {mainNavLinks.map((link) => {
                  const isCurrent = link.page === currentPage;
                  const className = `w-full text-left flex items-center gap-4 p-3 rounded-md text-base font-medium transition-colors ${isCurrent ? 'bg-orange-100 text-orange-600' : 'text-gray-700 hover:bg-gray-100'}`;
                  const icon = mobileNavIcons[link.page] || <ChevronRight size={20} />;

                  return link.action ? (
                    <button key={link.name} onClick={() => {link.action!(); setIsMobileMenuOpen(false);}} className={className}>
                      {icon}
                      <span>{link.name}</span>
                    </button>
                  ) : (
                    <a key={link.name} href={link.href} className={className}>
                      {icon}
                      <span>{link.name}</span>
                    </a>
                  );
                })}
              </nav>
            </div>
          </div>
        </>
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