
import React, { useState, useRef, useEffect } from 'react';
import { 
  ShoppingCart, User, Search, Menu, X, ChevronRight, LayoutGrid, ChevronDown,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Flame, PackageSearch, GitCompare, Gamepad2,
  Home, Building, Newspaper, Phone, Info as InfoIcon, Printer, MessageSquare, LogOut, Shield
} from 'lucide-react';
import SearchOverlay from './SearchOverlay';
import SearchPreview from './SearchPreview';
import { Page, Product, HeaderMenuData, LucideIconName, User as UserType, Branding } from '../types';
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
  branding?: Branding;
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


const Header: React.FC<HeaderProps> = ({ onSearchSubmit, onNavigate, onAuthClick, currentPage, topBarText, allProducts, headerMenuData, isUserLoggedIn, currentUser, onUserLogout, branding }) => {
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
      const scrolled = window.scrollY > 10;
      setIsScrolled(scrolled);
      if (scrolled) {
        setIsCategoryDropdownOpen(false); // Close dropdown on scroll
      }
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
    { name: 'สินค้าทั้งหมด', page: 'allProducts', action: () => onNavigate('allProducts'), icon: <LayoutGrid className="w-4 h-4 mr-1" /> },
    { name: 'คอมพิวเตอร์เซต', page: 'computerSet', action: () => onNavigate('computerSet') },
    { name: 'จัดสเปคคอม', page: 'pcBuilder', action: () => onNavigate('pcBuilder') },
    { name: 'โปรโมชั่น', page: 'promotions', action: () => onNavigate('promotions'), icon: <Flame className="w-4 h-4 mr-1 text-red-500" /> },
    { name: 'รีวิว', page: 'reviews', action: () => onNavigate('reviews'), icon: <MessageSquare className="w-4 h-4 mr-1 text-green-500" /> },
    { name: 'เช็คสถานะ', page: 'orderStatus', action: () => onNavigate('orderStatus'), icon: <PackageSearch className="w-4 h-4 mr-1 text-blue-500" /> },
    { name: 'องค์กร', page: 'corporate', action: () => onNavigate('corporate') },
    { name: 'บทความ', page: 'articles', action: () => onNavigate('articles') },
    { name: 'ติดต่อเรา', page: 'contact', action: () => onNavigate('contact') },
  ];

  const mobileNavIcons: Partial<Record<Page, React.ReactNode>> = { home: <Home size={20} />, computerSet: <Computer size={20} />, pcBuilder: <Wrench size={20} />, promotions: <Flame size={20} />, reviews: <MessageSquare size={20} />, orderStatus: <PackageSearch size={20} />, corporate: <Building size={20} />, articles: <Newspaper size={20} />, contact: <Phone size={20} />, about: <InfoIcon size={20} />, account: <User size={20} />, allProducts: <LayoutGrid size={20} /> };

  const logoTextFirst = branding?.logoTextFirst || 'UBON';
  const logoTextSecond = branding?.logoTextSecond || 'COMPUTER';
  const subtitle = branding?.subtitle || 'Technology Store';
  const LogoIcon = branding?.icon && iconMap[branding.icon] ? (React.cloneElement(iconMap[branding.icon] as React.ReactElement<any>, { className: "text-white w-6 h-6" })) : 'U';

  return (
    <header className={`fixed top-0 left-0 right-0 z-[900] transition-all duration-300 overflow-visible ${isScrolled ? 'bg-white shadow-lg py-2' : 'bg-white border-b border-gray-100 py-3'}`}>
      {/* Top Bar */}
      <div className={`bg-slate-900 text-white transition-all duration-500 overflow-hidden ${isScrolled ? 'h-0 opacity-0' : 'h-8 opacity-100'}`}>
        <div className="container mx-auto px-4 sm:px-6 2xl:px-8 h-full flex justify-between items-center">
          <p className="text-[10px] sm:text-xs font-medium tracking-wide opacity-90 truncate flex items-center gap-2">
             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
             {topBarText}
          </p>
          <div className="flex items-center gap-4">
             <button onClick={() => onNavigate('about')} className="text-[10px] sm:text-xs hover:text-orange-400 transition-colors font-medium">เกี่ยวกับเรา</button>
            {isAdmin && (
              <button onClick={() => onNavigate('admin')} className="text-[10px] sm:text-xs font-semibold flex items-center gap-1.5 text-orange-400 hover:text-orange-300 transition-colors">
                <Shield size={12}/> แผงควบคุม
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Header Content */}
      <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
        <div className="flex justify-between items-center h-16 transition-all duration-300">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0 mr-4 lg:mr-8">
              <button onClick={() => onNavigate('home')} className="group flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-orange-500/20 group-hover:scale-105 transition-transform duration-300">
                     {typeof LogoIcon === 'string' ? LogoIcon : LogoIcon}
                  </div>
                  <div className="flex flex-col items-start leading-none">
                      <span className="text-xl font-black text-gray-900 tracking-tight group-hover:text-orange-600 transition-colors uppercase">{logoTextFirst}<span className="text-orange-500">{logoTextSecond}</span></span>
                      <span className="text-[9px] text-gray-400 tracking-[0.3em] uppercase font-bold mt-0.5">{subtitle}</span>
                  </div>
              </button>
          </div>

          {/* Search Bar - Desktop */}
          <div ref={searchContainerRef} className="hidden 2xl:flex flex-1 justify-center max-w-2xl mx-auto px-4 relative z-[905]">
            <form onSubmit={handleSearchSubmit} className="w-full relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400 group-focus-within:text-orange-500 transition-colors" />
              </div>
              <input 
                type="search" 
                placeholder="ค้นหาสินค้า..." 
                value={liveSearchTerm} 
                onChange={handleSearchChange} 
                onFocus={() => liveSearchTerm && setIsPreviewOpen(true)} 
                className="w-full bg-gray-100 border border-gray-200 text-gray-900 text-sm rounded-full focus:ring-2 focus:ring-orange-500/20 focus:bg-white focus:border-orange-500 block pl-10 pr-12 py-2.5 transition-all duration-300 placeholder:text-gray-400 hover:bg-white hover:shadow-sm hover:border-gray-300"
              />
              <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-400 p-1.5 rounded-full hover:text-orange-600 transition-colors">
                 <Search size={14} />
              </button>
              
              {isPreviewOpen && liveSearchTerm && (
                 <div className="absolute top-full left-0 right-0 mt-2 rounded-2xl shadow-2xl overflow-hidden bg-white border border-gray-100 animate-fade-in-up ring-1 ring-black/5 z-[950]">
                     <SearchPreview searchTerm={liveSearchTerm} products={allProducts} onNavigate={handlePreviewNavigate} onSearchSubmit={onSearchSubmit} onClose={() => setIsPreviewOpen(false)}/>
                 </div>
              )}
            </form>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3 ml-auto">
            <button className="2xl:hidden p-2 rounded-full text-gray-600 hover:bg-gray-100 transition-colors" onClick={() => setIsSearchOpen(true)}>
                <Search className="w-5 h-5" />
            </button>

            {/* Desktop Account & Cart */}
            <div className="hidden 2xl:flex items-center gap-2">
              {isUserLoggedIn && currentUser ? (
                <div className="flex items-center gap-1 pl-1 pr-1 py-1 bg-gray-50 border border-gray-200 rounded-full hover:border-orange-200 transition-all hover:shadow-sm cursor-pointer group">
                   <button onClick={() => onNavigate('account')} className="flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-orange-600 px-1.5 py-0.5 rounded-full">
                      <div className="w-7 h-7 bg-orange-100 text-orange-600 rounded-full flex items-center justify-center text-xs font-bold border border-orange-200 group-hover:scale-105 transition-transform">
                          {currentUser.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="truncate max-w-[80px] text-xs font-bold text-gray-800 leading-tight mr-1">{currentUser.name}</span>
                   </button>
                   <div className="w-px h-4 bg-gray-300 mx-1"></div>
                   <button onClick={onUserLogout} title="ออกจากระบบ" className="p-1.5 text-gray-400 hover:bg-red-50 hover:text-red-500 rounded-full transition-colors"><LogOut size={14} /></button>
                </div>
              ) : (
                <button onClick={onAuthClick} className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-orange-600 transition-colors px-4 py-2 rounded-full hover:bg-orange-50 border border-transparent hover:border-orange-100">
                    <User className="w-5 h-5" />
                    <span>เข้าสู่ระบบ</span>
                </button>
              )}

              <div className="h-6 w-px bg-gray-200 mx-2"></div>

              <button onClick={() => onNavigate('compare')} className="relative p-2.5 text-gray-500 hover:text-orange-600 transition-colors group rounded-full hover:bg-gray-50" title="เปรียบเทียบสินค้า">
                  <GitCompare className="w-5 h-5 group-hover:rotate-180 transition-transform duration-500" />
                  {compareItems.length > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center h-3.5 w-3.5 bg-blue-600 text-white text-[9px] font-bold rounded-full shadow-sm ring-2 ring-white animate-scale-in">
                        {compareItems.length}
                    </span>
                  )}
              </button>

              <button onClick={() => onNavigate('cart')} className="relative p-2.5 text-gray-500 hover:text-orange-600 transition-colors group rounded-full hover:bg-gray-50" title="ตะกร้าสินค้า">
                  <ShoppingCart className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  {totalItems > 0 && (
                    <span className="absolute top-1 right-1 flex items-center justify-center h-3.5 w-3.5 bg-orange-600 text-white text-[9px] font-bold rounded-full shadow-sm ring-2 ring-white animate-scale-in">
                        {totalItems}
                    </span>
                  )}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button className="2xl:hidden p-2 text-gray-800 hover:bg-gray-100 rounded-full" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Navigation Bar - Desktop - Always Visible */}
        <div className="hidden 2xl:block h-12 border-t border-gray-100 mt-2 overflow-visible">
           <div className="flex items-center h-full relative">
                {/* Category Dropdown */}
                <div className="relative mr-6" ref={categoryDropdownRef}>
                    <button 
                        onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)} 
                        className={`flex items-center gap-2 px-5 py-1.5 rounded-full text-sm font-bold transition-all duration-300 ${isCategoryDropdownOpen ? 'bg-gray-900 text-white shadow-lg transform scale-105 ring-2 ring-offset-1 ring-gray-900' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                    >
                        <LayoutGrid size={16} />
                        <span>สินค้าทั้งหมด</span>
                        <ChevronDown size={14} className={`transition-transform duration-300 ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
                    </button>

                    {/* Mega Menu Dropdown */}
                    {isCategoryDropdownOpen && (
                        <div className="absolute top-full left-0 mt-4 w-[900px] bg-white rounded-3xl shadow-2xl border border-gray-100 z-[910] overflow-hidden flex animate-fade-in-up origin-top-left ring-1 ring-black/5">
                            {/* Sidebar Groups */}
                            <div className="w-72 bg-gray-50/90 border-r border-gray-100 p-3 space-y-1">
                                {headerMenuData.map((group) => (
                                    <button 
                                        key={group.id} 
                                        onMouseEnter={() => setExpandedGroups([group.id])}
                                        className={`w-full text-left px-4 py-3.5 rounded-xl text-sm font-bold flex justify-between items-center transition-all duration-200 ${expandedGroups.includes(group.id) ? 'bg-white text-orange-600 shadow-sm ring-1 ring-gray-100' : 'text-gray-600 hover:bg-white/50 hover:text-gray-900'}`}
                                    >
                                        {group.title}
                                        <ChevronRight size={16} className={`transition-transform duration-200 ${expandedGroups.includes(group.id) ? 'translate-x-1 text-orange-500' : 'text-gray-400'}`} />
                                    </button>
                                ))}
                            </div>
                            {/* Content Links */}
                            <div className="flex-1 p-8 bg-white">
                                {headerMenuData.map((group) => (
                                    expandedGroups.includes(group.id) && (
                                        <div key={group.id} className="grid grid-cols-2 gap-x-8 gap-y-6 animate-fade-in">
                                            {group.links.map((link) => (
                                                <button 
                                                    key={link.id} 
                                                    onClick={() => { onNavigate(link.page); setIsCategoryDropdownOpen(false); }} 
                                                    className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 group transition-all duration-200 border border-transparent hover:border-gray-100 hover:shadow-sm"
                                                >
                                                    <div className="w-12 h-12 rounded-2xl bg-orange-50 group-hover:bg-white flex items-center justify-center text-orange-500 group-hover:text-orange-600 transition-all shadow-sm group-hover:shadow-md ring-1 ring-orange-100/50 shrink-0">
                                                        {iconMap[link.icon]}
                                                    </div>
                                                    <div className="text-left pt-1">
                                                        <span className="block text-sm font-bold text-gray-800 group-hover:text-orange-700 transition-colors">{link.name}</span>
                                                        <span className="block text-[11px] text-gray-400 font-medium group-hover:text-gray-500 mt-0.5">เลือกซื้อ {link.name} ราคาพิเศษ</span>
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
                <nav className="flex items-center gap-1 flex-1 overflow-x-auto no-scrollbar mask-gradient-r">
                    {mainNavLinks.filter(link => link.name !== 'สินค้าทั้งหมด').map((link) => { // Filter out "All Products" from main nav as it's already in the dropdown button
                        const isCurrent = link.page === currentPage; 
                        const baseClasses = "flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold transition-all duration-300 whitespace-nowrap select-none";
                        const activeClasses = isCurrent ? "text-white bg-gray-900 shadow-md scale-105" : "text-gray-500 hover:text-orange-600 hover:bg-gray-50";
                        
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
            <div className="2xl:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-[940]" onClick={() => setIsMobileMenuOpen(false)}></div>
            <div className="2xl:hidden fixed top-0 left-0 h-full w-[85%] max-w-xs bg-white shadow-2xl z-[950] transform transition-transform duration-300 ease-out" style={{ transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)' }}>
                <div className="flex flex-col h-full">
                    <div className="flex items-center justify-between p-5 border-b border-gray-100 bg-gray-50/50">
                        <span className="text-xl font-extrabold text-gray-900">เมนูหลัก</span>
                        <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-200 transition-colors text-gray-500"><X size={24} /></button>
                    </div>
                    
                    <div className="p-5 border-b border-gray-100">
                        {isUserLoggedIn && currentUser ? (
                            <div className="bg-gradient-to-br from-orange-50 to-white rounded-2xl p-4 border border-orange-100 shadow-sm">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-12 h-12 bg-white text-orange-600 rounded-full flex items-center justify-center font-bold text-lg shadow-md border border-orange-100">
                                        {currentUser.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div className="overflow-hidden">
                                        <p className="font-bold text-gray-800 truncate text-base">{currentUser.name}</p>
                                        <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
                                    </div>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <button onClick={() => { onNavigate('account'); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 p-2.5 bg-white border border-gray-200 rounded-xl text-xs font-bold text-gray-700 hover:border-orange-300 hover:text-orange-600 transition-all shadow-sm">
                                        <User size={16} /> บัญชี
                                    </button>
                                    <button onClick={() => { onUserLogout(); setIsMobileMenuOpen(false); }} className="flex items-center justify-center gap-2 p-2.5 bg-red-50 border border-red-100 rounded-xl text-xs font-bold text-red-600 hover:bg-red-100 transition-all shadow-sm">
                                        <LogOut size={16} /> ออก
                                    </button>
                                </div>
                            </div>
                        ) : (
                            <button onClick={() => { onAuthClick(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-3 p-3.5 bg-gray-900 text-white rounded-xl font-bold shadow-lg shadow-gray-900/20 hover:bg-black transition-all active:scale-95">
                                <User size={20} />
                                <span>เข้าสู่ระบบ / สมัครสมาชิก</span>
                            </button>
                        )}
                    </div>

                    <nav className="flex-grow p-3 overflow-y-auto space-y-1">
                         {mainNavLinks.map((link) => { 
                            const isCurrent = link.page === currentPage;
                            return (
                                <button 
                                    key={link.name} 
                                    onClick={() => { if(link.action) link.action(); setIsMobileMenuOpen(false); }} 
                                    className={`w-full flex items-center gap-4 p-3.5 rounded-2xl text-sm font-bold transition-all ${isCurrent ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/30' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                                >
                                    <span className={`p-2 rounded-xl ${isCurrent ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'}`}>
                                        {mobileNavIcons[link.page] || link.icon || <ChevronRight size={18}/>}
                                    </span>
                                    {link.name}
                                    {isCurrent && <ChevronRight size={16} className="ml-auto text-white/80" />}
                                </button>
                            )
                         })}
                         {/* Add All Products to Mobile Menu */}
                         <button 
                            onClick={() => { onNavigate('allProducts'); setIsMobileMenuOpen(false); }}
                            className="w-full flex items-center gap-4 p-3.5 rounded-2xl text-sm font-bold text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-all"
                         >
                             <span className="p-2 rounded-xl bg-gray-100 text-gray-500">
                                 <LayoutGrid size={20} />
                             </span>
                             สินค้าทั้งหมด
                         </button>
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
