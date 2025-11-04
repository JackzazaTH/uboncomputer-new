'use client';
import React, { useState, useMemo } from 'react';
import { Product, NavigateFunction } from '../types';
import ProductCard from './ProductCard';
import { Search, List } from 'lucide-react';

interface SearchResultsPageProps {
  query: string;
  allProducts: Product[];
  onNavigate: NavigateFunction;
}

const SearchResultsPage: React.FC<SearchResultsPageProps> = ({ query, allProducts, onNavigate }) => {
  const [sortOption, setSortOption] = useState('default');

  const searchResults = useMemo(() => {
    if (!query) return [];
    const lowercasedQuery = query.toLowerCase();
    return allProducts.filter(p => p.name.toLowerCase().includes(lowercasedQuery));
  }, [query, allProducts]);

  const sortedProducts = useMemo(() => {
    let result = [...searchResults];
    switch (sortOption) {
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'popular':
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        break;
    }
    return result;
  }, [searchResults, sortOption]);

  return (
    <div className="bg-gray-50 min-h-[60vh]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 flex items-center">
                <Search className="w-8 h-8 mr-3 text-orange-500"/>
                ผลการค้นหา
            </h1>
            <p className="text-gray-600 mt-1">
                ผลลัพธ์สำหรับ: <span className="font-semibold text-gray-800">"{query}"</span>
            </p>
        </div>

        <main>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700 font-semibold mb-2 sm:mb-0">
                    พบสินค้า <span className="text-orange-600">{sortedProducts.length}</span> รายการ
                </p>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-sm font-medium">เรียงตาม:</label>
                    <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white text-gray-800">
                        <option value="default">แนะนำ</option>
                        <option value="popular">ยอดนิยม</option>
                        <option value="price_asc">ราคา: น้อยไปมาก</option>
                        <option value="price_desc">ราคา: มากไปน้อย</option>
                    </select>
                </div>
            </div>

            {sortedProducts.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                    {sortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
                    <List size={48} className="mx-auto text-gray-400"/>
                    <h3 className="mt-4 text-xl font-bold text-gray-800">ไม่พบสินค้าที่ตรงกับการค้นหา</h3>
                    <p className="mt-1 text-gray-500">กรุณาลองใช้คำค้นหาอื่น</p>
                </div>
            )}
           
          </main>
      </div>
    </div>
  );
};

export default SearchResultsPage;