
import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { X, Search, SlidersHorizontal, Check, AlertCircle } from 'lucide-react';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  products: Product[];
  onSelectProduct: (product: Product) => void;
  currentSelection?: Product | null;
  compatibilityMessage?: string | null;
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  isOpen,
  onClose,
  category,
  products,
  onSelectProduct,
  currentSelection,
  compatibilityMessage
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setSearchTerm('');
      setSelectedBrand('all');
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const categoryProducts = useMemo(() => {
    if (!category) return [];
    return products.filter(p => p.category === category);
  }, [products, category]);

  const availableBrands = useMemo(() => {
    const brands = [...new Set(categoryProducts.map(p => p.brand))].sort();
    return brands.length > 0 ? brands : [];
  }, [categoryProducts]);

  const processedProducts = useMemo(() => {
    let items = [...categoryProducts];

    if (selectedBrand !== 'all') {
      items = items.filter(p => p.brand === selectedBrand);
    }

    if (searchTerm) {
      items = items.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }

    switch (sortOption) {
      case 'price_asc': items.sort((a, b) => a.price - b.price); break;
      case 'price_desc': items.sort((a, b) => b.price - a.price); break;
      case 'name_asc': items.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return items;
  }, [categoryProducts, searchTerm, sortOption, selectedBrand]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  if (!isOpen || !category) return null;

  const FilterControls = () => (
    <div className="space-y-6">
      <div>
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-2">เรียงตาม:</label>
        <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm py-2.5">
          <option value="price_asc">ราคา: น้อยไปมาก</option>
          <option value="price_desc">ราคา: มากไปน้อย</option>
          <option value="name_asc">ชื่อ: A-Z</option>
        </select>
      </div>
      {availableBrands.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-3">แบรนด์</h3>
          <div className="space-y-2 max-h-60 overflow-y-auto custom-scrollbar pr-2">
            <label className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
              <input type="radio" name="brand" value="all" checked={selectedBrand === 'all'} onChange={(e) => setSelectedBrand(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" />
              <span className="ml-3 text-gray-800 text-sm">ทั้งหมด</span>
            </label>
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center p-2 rounded-md hover:bg-gray-50 cursor-pointer transition-colors">
                <input type="radio" name="brand" value={brand} checked={selectedBrand === brand} onChange={(e) => setSelectedBrand(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" />
                <span className="ml-3 text-gray-800 text-sm">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/80 z-[100] flex justify-center items-center p-0 sm:p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white sm:rounded-2xl shadow-2xl w-full max-w-6xl h-full sm:h-[90vh] flex flex-col animate-slide-in-up overflow-hidden">
        {/* Header */}
        <div className="flex flex-col border-b bg-white z-20">
            <div className="flex justify-between items-center p-4 sm:px-6">
                <div>
                    <h2 className="text-xl font-bold text-gray-900">เลือก {category}</h2>
                    {compatibilityMessage && (
                         <p className="text-xs text-blue-600 flex items-center mt-1">
                             <AlertCircle size={12} className="mr-1"/> {compatibilityMessage}
                         </p>
                    )}
                </div>
                <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500">
                    <X className="w-6 h-6" />
                </button>
            </div>
            
            {/* Search Bar & Mobile Filter Toggle */}
            <div className="p-4 sm:px-6 bg-gray-50 border-t border-gray-100 flex gap-3">
                 <div className="relative flex-grow">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                        type="text"
                        placeholder={`ค้นหา ${category}...`}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 sm:text-sm transition-shadow"
                        autoFocus
                    />
                </div>
                <button 
                    onClick={() => setIsMobileFilterOpen(true)} 
                    className="md:hidden flex items-center justify-center px-4 py-2.5 border border-gray-300 rounded-xl bg-white text-gray-700 font-medium hover:bg-gray-50 active:bg-gray-100"
                >
                    <SlidersHorizontal size={18} />
                </button>
            </div>
        </div>

        {/* Main Content */}
        <div className="flex-grow flex overflow-hidden bg-gray-50">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 p-6 border-r bg-white overflow-y-auto">
            <FilterControls />
          </aside>

          {/* Product List */}
          <main className="flex-1 overflow-y-auto p-2 sm:p-4 custom-scrollbar">
            {processedProducts.length > 0 ? (
              <div className="grid grid-cols-1 gap-3">
                {processedProducts.map(product => {
                   const isSelected = currentSelection?.id === product.id;
                   return (
                    <div 
                        key={product.id} 
                        onClick={() => { onSelectProduct(product); onClose(); }}
                        className={`flex flex-col sm:flex-row items-center gap-4 p-4 rounded-xl border transition-all cursor-pointer group relative overflow-hidden ${isSelected ? 'bg-orange-50 border-orange-500 ring-1 ring-orange-500' : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'}`}
                    >
                        <div className="w-20 h-20 sm:w-24 sm:h-24 bg-white rounded-lg p-2 border border-gray-100 flex-shrink-0">
                             <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-contain" />
                        </div>
                        
                        <div className="flex-grow text-center sm:text-left min-w-0">
                            <div className="flex flex-col h-full justify-center">
                                <p className="font-bold text-gray-800 text-sm sm:text-base line-clamp-2 mb-1 group-hover:text-orange-600 transition-colors">{product.name}</p>
                                {product.brand && <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-500 text-[10px] rounded-md self-center sm:self-start font-medium">{product.brand}</span>}
                            </div>
                        </div>

                        <div className="flex-shrink-0 flex flex-row sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-3 sm:gap-1 mt-2 sm:mt-0 pt-2 sm:pt-0 border-t sm:border-0 border-dashed border-gray-200">
                            <p className="text-lg font-extrabold text-orange-600 whitespace-nowrap">
                                {formatCurrency(product.price)}
                            </p>
                            <button
                                className={`px-6 py-2 rounded-lg font-bold text-sm transition-all active:scale-95 flex items-center ${isSelected ? 'bg-green-500 text-white cursor-default' : 'bg-gray-900 text-white hover:bg-orange-600 shadow-sm'}`}
                            >
                                {isSelected ? <><Check size={16} className="mr-1"/> เลือกแล้ว</> : 'เลือก'}
                            </button>
                        </div>
                    </div>
                   )
                })}
              </div>
            ) : (
              <div className="text-center py-20 flex flex-col items-center justify-center h-full text-gray-400">
                <Search size={48} className="mb-4 opacity-50" />
                <p className="text-lg font-medium">ไม่พบสินค้าที่ตรงกับเกณฑ์</p>
                <p className="text-sm mt-1">ลองปรับเปลี่ยนตัวกรองหรือคำค้นหา</p>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="absolute inset-0 bg-white z-50 flex flex-col animate-slide-in-right">
            <div className="flex justify-between items-center p-4 border-b bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 flex items-center"><SlidersHorizontal className="mr-2"/> ตัวกรอง & จัดเรียง</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="p-2 bg-orange-100 text-orange-700 rounded-full font-bold text-sm">
                เสร็จสิ้น
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-grow">
              <FilterControls />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelectionModal;
