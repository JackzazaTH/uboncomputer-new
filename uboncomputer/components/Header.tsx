
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, User, Search, Menu, X, ChevronRight, LayoutGrid, ChevronDown,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Flame, PackageSearch, GitCompare, Gamepad2,
  Home, Building, Newspaper, Phone, Info as InfoIcon, Printer, MessageSquare, LogOut, Shield
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import SearchPreview from './SearchPreview';
import { Page, Product, HeaderMenuData, LucideIconName, User as UserType } from '../types';
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
  isUserLoggedIn: boolean;
  currentUser: UserType | null;
  onUserLogout: () => void;
}

const iconMap: Record<LucideIconName, React.ReactNode> = {
    Wrench: <Wrench size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Computer: <Computer size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Monitor: <Monitor size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Printer: <Printer size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Laptop: <Laptop size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Cpu: <Cpu size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    CircuitBoard: <CircuitBoard size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Cog: <Cog size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    MemoryStick: <MemoryStick size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    HardDrive: <HardDrive size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Power: <Power size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Box: <Box size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Fan: <Fan size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Gamepad2: <Gamepad2 size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Router: <Router size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    FileCode: <FileCode size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
    Server: <Server size={20} className="text-gray-500 group-hover:text-orange-500 transition-colors"/>,
};


const Header: React.FC<HeaderProps> = ({ onSearchSubmit, onNavigate, onAuthClick, currentPage, topBarText, allProducts, headerMenuData, isUserLoggedIn, currentUser, onUserLogout }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<number[]>([headerMenuData?.[0]?.id].filter(Boolean));
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const [liveSearchTerm, setLiveSearchTerm] = useState('');
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);
  
  const categoryDropdownRef = useRef<HTMLDivElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { totalItems } = useCart();
  const { compareItems } = useComparison();

  const isAdmin = currentUser?.role === 'admin' || currentUser?.role === 'editor';

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (categoryDropdownRef.current && !categoryDropdownRef.current.contains(event.target as Node)) setIsCategoryDropdownOpen(false);
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) setIsPreviewOpen(false);
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isCategoryDropdownOpen && expandedGroups.length === 0 && headerMenuData.length > 0) setExpandedGroups([headerMenuData[0].id]);
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
  
  const toggleGroup = (groupId: number) => setExpandedGroups(prev => prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]);

  const mainNavLinks: NavLink[] = [
    { name: 'หน้าแรก', page: 'home', action: () => onNavigate('home') },
    { name: 'คอมพิวเตอร์เซต', page: 'computerSet', action: () => onNavigate('computerSet') },
    { name: 'จัดสเปคคอม', page: 'pcBuilder', action: () => onNavigate('pcBuilder') },
    { name: 'โปรโมชั่น', page: 'promotions', action: () => onNavigate('promotions'), icon: <Flame className="w-4 h-4 mr-1 text-red-500" /> },
    { name: 'รีวิว', page: 'reviews', action: () => onNavigate('reviews'), icon: <MessageSquare className="w-4 h-4 mr-1 text-green-500" /> },
    { name: 'เช็คสถานะ', page: 'orderStatus', action: () => onNavigate('orderStatus'), icon: <PackageSearch className="w-4 h-4 mr-1 text-blue-500" /> },
    { name: 'องค์กร', page: 'corporate', action: () => onNavigate('corporate') },
    { name: 'บทความ', page: 'articles', action: () => onNavigate('articles') },
    { name: 'ติดต่อเรา', page: 'contact', action: () => onNavigate('contact') },
  ];

  const mobileNavIcons: Partial<Record<Page, React.ReactNode>> = { home: <Home size={20} />, computerSet: <Computer size={20} />, pcBuilder: <Wrench size={20} />, promotions: <Flame size={20} />, reviews: <MessageSquare size={20} />, orderStatus: <PackageSearch size={20} />, corporate: <Building size={20} />, articles: <Newspaper size={20} />, contact: <Phone size={20} />, about: <InfoIcon size={20} />, account: <User size={20} />, };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-0' : 'bg-white shadow-sm py-2'}`}>
      {/* Top Bar - Hidden on scroll or make smaller */}
      <div className={`bg-gray-900 text-white transition-all duration-300 overflow-hidden ${isScrolled ? 'h-0' : 'h-10'}`}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8 h-full flex justify-between items-center">
          <p className="text-xs sm:text-sm font-light tracking-wide truncate">{topBarText}</p>
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('about')} className="text-xs sm:text-sm hover:text-orange-400 transition-colors">เกี่ยวกับเรา</button>
            {isAdmin && (
              <button onClick={() => onNavigate('admin')} className="text-xs sm:text-sm font-semibold flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors">
                <Shield size={14}/> แผงควบคุม
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
        <div className="flex justify-between items-center h-16 2xl:h-20 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
              <button onClick={() => onNavigate('home')} className="group flex items-center gap-2">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/30 group-hover:scale-105 transition-transform">U</div>
                  <div className="flex flex-col items-start leading-none">
                      <span className="text-xl font-bold text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors">UBON<span className="text-orange-500">COMPUTER</span></span>
                      <span className="text-[10px] text-gray-500 tracking-widest uppercase">Technology Store</span>
                  </div>
              </button>
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchContainerRef} className="hidden 2xl:flex flex-1 justify-center px-8 max-w-3xl">
            <form onSubmit={handleSearchSubmit} className="w-full relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type="search" 
                placeholder="ค้นหาสินค้าที่คุณต้องการ..." 
                value={liveSearchTerm} 
                onChange={handleSearchChange} 
                onFocus={() => liveSearchTerm && setIsPreviewOpen(true)} 
                className="w-full bg-gray-100/80 border border-transparent text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-orange-500/50 focus:bg-white focus:border-orange-500 block pl-11 pr-4 py-2.5 transition-all duration-300 placeholder:text-gray-500 shadow-inner"
              />
              {isPreviewOpen && liveSearchTerm && (
                 <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-xl overflow-hidden">
                     <SearchPreview searchTerm={liveSearchTerm} products={allProducts} onNavigate={handlePreviewNavigate} onSearchSubmit={onSearchSubmit} onClose={() => setIsPreviewOpen(false)}/>
                 </div>
              )}
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <button className="2xl:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-6 h-6" />
            </button>

            {/* Desktop Account & Cart */}
            <div className="hidden 2xl:flex items-center gap-3">
              {isUserLoggedIn && currentUser ? (
                <div className="flex items-center gap-2 pl-2 pr-1 py-1 bg-gray-50 border border-gray-200 rounded-full hover:border-orange-300 transition-colors">
                   <button onClick={() => onNavigate('account')} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 px-2">
                      <div className="w-6 h-6 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold">
                          {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[100px]">{currentUser.name}</span>
                   </button>
                   <div className="w-px h-4 bg-gray-300 mx-1"></div>
                   <button onClick={onUserLogout} title="ออกจากระบบ" className="p-1.5 text-gray-500 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><LogOut size={16} /></button>
                </div>
              ) : (
                <button onClick={onAuthClick} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-orange-600 transition-colors px-3 py-2 rounded-lg hover:bg-orange-50">
                    <User className="w-5 h-5" />
                    <span>เข้าสู่ระบบ</span>
                </button>
              )}

              <div className="h-6 w-px bg-gray-200 mx-1"></div>

              <button onClick={() => onNavigate('compare')} className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors group">
                  <GitCompare className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {compareItems.length > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-blue-600 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm animate-bounce-small">
                        {compareItems.length}
                    </span>
                  )}
              </button>

              <button onClick={() => onNavigate('cart')} className="relative p-2 text-gray-600 hover:text-orange-600 transition-colors group">
                  <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 flex items-center justify-center h-5 w-5 bg-orange-500 text-white text-[10px] font-bold rounded-full border-2 border-white shadow-sm animate-bounce-small">
                        {totalItems}
                    </span>
                  )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="2xl:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-md" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar - Desktop */}
        <div className={`hidden 2xl:block border-t border-gray-100 transition-all duration-300 ${isScrolled ? 'h-0 opacity-0 overflow-hidden' : 'h-14 opacity-100'}`}>
           <div className="flex items-center h-full">
                {/* Category Dropdown */}
                <div className="relative mr-6" ref={categoryDropdownRef}>
                    <button 
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} 
                        className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${isCategoryDropdownOpen ? 'bg-orange-600 text-white shadow-lg shadow-orange-500/30' : 'bg-orange-50 text-orange-700 hover:bg-orange-100'}`}
                    >
                        <LayoutGrid size={18} />
                        <span>หมวดหมู่สินค้า</span>
                        <ChevronDown size={16} className={`transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-4 w-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 overflow-hidden flex animate-fade-in-up origin-top-left">
                            {/* Sidebar Groups */}
                            <div className="w-64 bg-gray-50/80 border-r border-gray-100 p-2">
                                {headerMenuData.map((group) => (
                                    <button 
                                        key={group.id} 
                                        onMouseEnter={() => setExpandedGroups([group.id])}
                                        className={`w-full text-left px-4 py-3 rounded-xl text-sm font-semibold flex justify-between items-center transition-all ${expandedGroups.includes(group.id) ? 'bg-white text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-gray-100'}`}
                                    >
                                        {group.title}
                                        {expandedGroups.includes(group.id) && <ChevronRight size={14} />}
                                    </button>
                                ))}
                            </div>
                            {/* Content Links */}
                            <div className="flex-1 p-6 bg-white">
                                {headerMenuData.map((group) => (
                                    expandedGroups.includes(group.id) && (
                                        <div key={group.id} className="grid grid-cols-2 gap-4 animate-fade-in">
                                            {group.links.map((link) => (
                                                <button 
                                                    key={link.id} 
                                                    onClick={() => { onNavigate(link.page); setIsCategoryDropdownOpen(false); }} 
                                                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-orange-50 group transition-colors"
                                                >
                                                    <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-gray-500 group-hover:bg-orange-100 group-hover:text-orange-600 transition-colors">
                                                        {iconMap[link.icon]}
                                                    </div>
                                                    <div className="text-left">
                                                        <span className="block text-sm font-bold text-gray-800 group-hover:text-orange-700 transition-colors">{link.name}</span>
                                                        <span className="block text-[10px] text-gray-400 font-medium">เลือกซื้อ {link.name}</span>
                                                    </div>
                                                </button>
                                            ))}
                                        </div>
                                    )
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Main Nav Links */}
                <nav className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar">
                    {mainNavLinks.map((link) => { 
                        const isCurrent = link.page === currentPage; 
                        const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200 whitespace-nowrap select-none";
                        const activeClasses = isCurrent ? "text-orange-600 bg-orange-50 font-bold" : "text-gray-600 hover:text-orange-600 hover:bg-gray-50";
                        
                        const content = <>{link.icon}{link.name}</>;

                        return link.action ? (
                            <button key={link.name} onClick={link.action} className={`${baseClasses} ${activeClasses}`}>
                                {content}
                            </button>
                        ) : (
                            <a key={link.name} href={link.href} className={`${baseClasses} ${activeClasses}`}>
                                {content}
                            </a>
                        );
                    })}
                </nav>
           </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <>
            <div className="2xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="2xl:hidden fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out" style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50">
                        <span className="text-xl font-bold text-gray-900">เมนูหลัก</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-200 transition-colors"><X size={20} /></button>
                    </div>
                    
                    <div className="p-4 border-b border-gray-100">
                        {isUserLoggedIn && currentUser ? (
                            <div className="bg-orange-50 rounded-xl p-4 border border-orange-100">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-orange-200 text-orange-700 rounded-full flex items-center justify-center font-bold text-lg">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-800 truncate">{currentUser.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-2">
                                    <button onClick={() => { onNavigate('account'); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 p-2 bg-white border border-orange-200 rounded-lg text-xs font-bold text-orange-700 hover:bg-orange-100 transition-colors">
                                        <User size={14} /> บัญชี
                                    </button>
                                    <button onClick={() => { onUserLogout(); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 p-2 bg-white border border-red-200 rounded-lg text-xs font-bold text-red-600 hover:bg-red-50 transition-colors">
                                        <LogOut size={14} /> ออก
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-2 p-3 bg-orange-600 text-white rounded-xl font-bold shadow-lg shadow-orange-500/30 hover:bg-orange-700 transition-all">
                                <User size={18} />
                                <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
                            </button>
                        )}
                    </div>

                    <nav className="flex-grow p-2 overflow-y-auto">
                         {mainNavLinks.map((link) => { 
                            const isCurrent = link.page === currentPage;
                            return (
                                <button 
                                    key={link.name} 
                                    onClick={() => { if(link.action) link.action(); setIsMobileMenuOpen(false); }} 
                                    className={`w-full flex items-center gap-4 p-3 rounded-xl text-sm font-medium transition-all mb-1 ${isCurrent ? 'bg-orange-50 text-orange-600 font-bold' : 'text-gray-600 hover:bg-gray-50'}`}
                                >
                                    <span className={`p-1.5 rounded-md ${isCurrent ? 'bg-white text-orange-500 shadow-sm' : 'bg-gray-100 text-gray-500'}`}>
                                        {mobileNavIcons[link.page] || link.icon || <ChevronRight size={16}/>}
                                    </span>
                                    {link.name}
                                </button>
                            )
                         })}
                    </nav>
                </div>
            </div>
        </>
      )}
      <SearchOverlay isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} onNavigate={onNavigate} allProducts={allProducts} onSearchSubmit={onSearchSubmit}/>
    </header>
  );
};

export default Header;
