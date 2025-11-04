'use client';
import React, { useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { Product } from '../types';
import { ArrowRight } from 'lucide-react';

interface SearchPreviewProps {
  searchTerm: string;
  products: Product[];
  onSearchSubmit: (term: string) => void;
  onClose: () => void;
}

const SearchPreview: React.FC<SearchPreviewProps> = ({ searchTerm, products, onSearchSubmit, onClose }) => {
  const router = useRouter();

  const filteredProducts = useMemo(() => {
    if (!searchTerm) return [];
    const lowercasedTerm = searchTerm.toLowerCase();
    return products
      .filter(product => product.name.toLowerCase().includes(lowercasedTerm))
      .slice(0, 5);
  }, [searchTerm, products]);
  
  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);
    
  const handleNavigate = (productId: number) => {
      router.push(`/product/${productId}`);
      onClose();
  }

  if (filteredProducts.length === 0) {
    return (
        <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-50 p-4 text-center text-gray-500">
            ไม่พบสินค้าสำหรับ "{searchTerm}"
        </div>
    );
  }

  return (
    <div className="absolute top-full left-0 mt-2 w-full bg-white rounded-md shadow-lg border border-gray-200 z-50 animate-fade-in-down overflow-hidden">
      <ul className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
        {filteredProducts.map(product => (
          <li key={product.id}>
            <button
              onClick={() => handleNavigate(product.id)}
              className="w-full flex items-center gap-4 p-3 text-left hover:bg-gray-50 transition-colors"
            >
              <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-contain flex-shrink-0" />
              <div className="flex-grow">
                <p className="font-medium text-gray-800 text-sm line-clamp-1">{product.name}</p>
                <p className="text-orange-600 font-semibold">{formatCurrency(product.price)}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      <button 
        onClick={() => onSearchSubmit(searchTerm)}
        className="w-full text-center py-3 px-4 bg-gray-100 hover:bg-gray-200 text-sm font-semibold text-orange-600 flex items-center justify-center gap-2"
        >
        แสดงผลการค้นหาทั้งหมด ({searchTerm}) <ArrowRight size={16} />
      </button>
    </div>
  );
};

export default SearchPreview;
