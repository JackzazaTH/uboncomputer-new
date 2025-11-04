import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import { X, Search, SlidersHorizontal } from 'lucide-react';

interface ProductSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: string | null;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

const ProductSelectionModal: React.FC<ProductSelectionModalProps> = ({
  isOpen,
  onClose,
  category,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');
  const [selectedBrand, setSelectedBrand] = useState<string>('all');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
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
    return brands.length > 1 ? brands : [];
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
        <label htmlFor="sort" className="block text-sm font-medium text-gray-700 mb-1">เรียงตาม:</label>
        <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm">
          <option value="price_asc">ราคา: น้อยไปมาก</option>
          <option value="price_desc">ราคา: มากไปน้อย</option>
          <option value="name_asc">ชื่อ: A-Z</option>
        </select>
      </div>
      {availableBrands.length > 0 && (
        <div>
          <h3 className="text-sm font-medium text-gray-700 mb-2">แบรนด์</h3>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="radio" name="brand" value="all" checked={selectedBrand === 'all'} onChange={(e) => setSelectedBrand(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" />
              <span className="ml-2 text-gray-800">ทั้งหมด</span>
            </label>
            {availableBrands.map(brand => (
              <label key={brand} className="flex items-center">
                <input type="radio" name="brand" value={brand} checked={selectedBrand === brand} onChange={(e) => setSelectedBrand(e.target.value)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300" />
                <span className="ml-2 text-gray-800">{brand}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-[70] flex justify-center items-center p-2 sm:p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-6xl h-[95vh] flex flex-col animate-slide-in-up">
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b flex-shrink-0">
          <h2 className="text-lg sm:text-xl font-bold text-gray-900">เลือก {category}</h2>
          <div className="relative hidden md:block w-full max-w-xs lg:max-w-sm ml-auto mr-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="ค้นหาสินค้า..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
            />
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-gray-200 transition-colors">
            <X className="w-6 h-6 text-gray-700" />
          </button>
        </div>

        {/* Mobile Search & Filter Button */}
        <div className="p-4 border-b md:hidden space-y-3">
          <div className="relative">
             <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="ค้นหาสินค้า..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
              />
          </div>
          <button onClick={() => setIsMobileFilterOpen(true)} className="w-full flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-md bg-white font-semibold">
            <SlidersHorizontal size={16} />
            ตัวกรอง & จัดเรียง
          </button>
        </div>

        {/* Main content */}
        <div className="flex-grow flex overflow-hidden">
          {/* Sidebar (Desktop) */}
          <aside className="hidden md:block w-64 p-4 border-r overflow-y-auto bg-gray-50/50">
            <FilterControls />
          </aside>

          {/* Product List */}
          <main className="flex-1 overflow-y-auto">
            {processedProducts.length > 0 ? (
              <div className="divide-y">
                {processedProducts.map(product => (
                  <div key={product.id} className="flex flex-col sm:flex-row items-center gap-4 p-3 hover:bg-gray-50">
                    <img src={product.imageUrl} alt={product.name} className="w-20 h-20 object-contain flex-shrink-0 rounded-md border" />
                    <div className="flex-grow min-w-0 text-center sm:text-left">
                        <p className="font-semibold text-gray-800 text-sm line-clamp-2">{product.name}</p>
                    </div>
                    <div className="flex-shrink-0 flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 w-full sm:w-auto justify-between sm:justify-center px-4 sm:px-0">
                        <p className="text-lg font-bold text-gray-900 flex-shrink-0">
                            {formatCurrency(product.price)}
                        </p>
                        <button
                            onClick={() => onSelectProduct(product)}
                            className="bg-blue-600 text-white font-bold py-2 px-6 rounded-md hover:bg-blue-700 transition-colors text-sm"
                        >
                            เลือก
                        </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16 flex flex-col items-center justify-center h-full">
                <p className="text-lg text-gray-500">ไม่พบสินค้าที่ตรงกับเกณฑ์</p>
                <p className="text-sm text-gray-400">ลองปรับเปลี่ยนตัวกรองหรือคำค้นหา</p>
              </div>
            )}
          </main>
        </div>

        {/* Mobile Filter Modal */}
        {isMobileFilterOpen && (
          <div className="absolute inset-0 bg-white z-10 md:hidden flex flex-col">
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold text-lg">ตัวกรอง & จัดเรียง</h3>
              <button onClick={() => setIsMobileFilterOpen(false)} className="font-bold text-orange-600 px-4 py-2">
                เสร็จสิ้น
              </button>
            </div>
            <div className="p-4 overflow-y-auto">
              <FilterControls />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductSelectionModal;
