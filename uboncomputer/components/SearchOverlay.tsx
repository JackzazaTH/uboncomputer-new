'use client';
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Search, X } from 'lucide-react';
import { Product } from '../types';

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onSearchSubmit: (term: string) => void;
  allProducts: Product[];
}

const SearchOverlay: React.FC<SearchOverlayProps> = ({ isOpen, onClose, onSearchSubmit, allProducts }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = 'auto';
      setSearchTerm('');
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  const filteredProducts = useMemo(() => {
    if (searchTerm.trim().length < 2) {
      return [];
    }
    const lowercasedTerm = searchTerm.toLowerCase();
    return allProducts
      .filter(product => product.name.toLowerCase().includes(lowercasedTerm))
      .slice(0, 15);
  }, [searchTerm, allProducts]);

  const handleNavigate = (productId: number) => {
    router.push(`/product/${productId}`);
    onClose();
  };
  
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  if (!isOpen) return null;

  return (
    <div 
      className="fixed inset-0 bg-white z-[60] lg:hidden animate-fade-in-down" 
      role="dialog" 
      aria-modal="true"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex flex-col h-full">
          <form onSubmit={(e) => { e.preventDefault(); onSearchSubmit(searchTerm); }} className="flex items-center h-20 border-b">
            <div className="relative w-full">
                <div className="absolute inset-y-0 left-0 flex items-center pointer-events-none">
                    <Search className="w-5 h-5 text-gray-400" />
                </div>
                <input
                    ref={inputRef}
                    type="search"
                    placeholder="ค้นหาสินค้า..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full border-0 py-2 pl-8 pr-4 text-lg text-gray-800 focus:outline-none focus:ring-0 bg-transparent placeholder:text-gray-500"
                    autoComplete="off"
                />
            </div>
             <button type="button" onClick={onClose} className="p-2 ml-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors flex-shrink-0">
               <X className="w-6 h-6 text-gray-700" />
             </button>
          </form>
          <div className="flex-grow pt-4 overflow-y-auto">
            {searchTerm.length > 1 && filteredProducts.length === 0 && (
                 <div className="text-center py-10">
                    <p className="text-gray-600">ไม่พบสินค้าสำหรับ "{searchTerm}"</p>
                </div>
            )}
            {filteredProducts.length > 0 && (
                <ul className="divide-y">
                    {filteredProducts.map(product => (
                        <li key={product.id}>
                            <button onClick={() => handleNavigate(product.id)} className="w-full flex items-center gap-4 p-3 text-left hover:bg-gray-50 rounded-lg">
                                <img src={product.imageUrl} alt={product.name} className="w-16 h-16 object-contain flex-shrink-0" />
                                <div className="flex-grow">
                                    <p className="font-medium text-gray-800 text-sm line-clamp-2">{product.name}</p>
                                    <p className="text-orange-600 font-bold">{formatCurrency(product.price)}</p>
                                </div>
                            </button>
                        </li>
                    ))}
                </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchOverlay;
