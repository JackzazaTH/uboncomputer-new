'use client';
import React, { useState, useMemo } from 'react';
import { Product, NavigateFunction } from '../types';
import ProductCard from './ProductCard';
import { Percent, List } from 'lucide-react';

interface PromotionsPageProps {
  allProducts: Product[];
  onNavigate: NavigateFunction;
}

const PromotionsPage: React.FC<PromotionsPageProps> = ({ allProducts, onNavigate }) => {
  const promotionProducts = useMemo(() => {
    return allProducts
      .filter(p => p.oldPrice && p.oldPrice > p.price)
      .map(p => ({
        ...p,
        discount: p.oldPrice ? ((p.oldPrice - p.price) / p.oldPrice) * 100 : 0
      }));
  }, [allProducts]);

  const [sortOption, setSortOption] = useState('default');

  const sortedProducts = useMemo(() => {
    let result = [...promotionProducts];
    switch (sortOption) {
      case 'discount_desc':
        result.sort((a, b) => b.discount - a.discount);
        break;
      case 'price_asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price_desc':
        result.sort((a, b) => b.price - a.price);
        break;
      default: // popular or default
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
    }
    return result;
  }, [promotionProducts, sortOption]);

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
               <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-gray-500 hover:text-orange-600">หน้าแรก</a>
              <svg className="fill-current w-3 h-3 mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800 font-semibold">โปรโมชั่น</span>
            </li>
          </ol>
        </nav>

        <div className="mb-8 relative rounded-lg overflow-hidden text-white flex items-center justify-center h-64 bg-gradient-to-r from-red-600 to-orange-500">
             <div className="absolute inset-0 bg-black/20"></div>
             <div className="relative text-center z-10 p-4">
                <Percent size={48} className="mx-auto mb-2" />
                <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">สินค้าโปรโมชั่น</h1>
                <p className="mt-2 text-lg text-white/90">ราคาพิเศษสุดคุ้ม ที่นี่ที่เดียว!</p>
             </div>
        </div>
        
        <main>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700 font-semibold mb-2 sm:mb-0">
                    พบสินค้าโปรโมชั่น <span className="text-orange-600">{sortedProducts.length}</span> รายการ
                </p>
                <div className="flex items-center space-x-2">
                    <label htmlFor="sort" className="text-sm font-medium">เรียงตาม:</label>
                    <select id="sort" value={sortOption} onChange={e => setSortOption(e.target.value)} className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 text-sm bg-white text-gray-800">
                        <option value="default">แนะนำ</option>
                        <option value="discount_desc">ส่วนลด: มากไปน้อย</option>
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
                    <h3 className="mt-4 text-xl font-bold text-gray-800">ไม่มีสินค้าโปรโมชั่นในขณะนี้</h3>
                    <p className="mt-1 text-gray-500">โปรดกลับมาตรวจสอบอีกครั้งในภายหลัง</p>
                </div>
            )}
           
          </main>
      </div>
    </div>
  );
};

export default PromotionsPage;