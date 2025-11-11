import React, { useState, useMemo } from 'react';
import { Product, Page } from '../types';
import { CategoryConfig } from '../categoryConfig';
import ProductCard from './ProductCard';
import { SlidersHorizontal, List } from 'lucide-react';

interface CategoryPageProps {
  allProducts: Product[];
  categoryConfig: CategoryConfig;
  bannerUrl: string;
  // FIX: Made the `data` parameter optional to align with the navigate function from App.tsx and fix type errors.
  onNavigate: (page: Page, data?: { productId: number }) => void;
}

// Helper function to safely get nested properties
const getProperty = (obj: any, path: string): any => {
  return path.split('.').reduce((acc, part) => acc && acc[part], obj);
};

const CategoryPage: React.FC<CategoryPageProps> = ({ allProducts, categoryConfig, bannerUrl, onNavigate }) => {
  const categoryProducts = useMemo(() => allProducts.filter(p => p.category === categoryConfig.internalCat), [allProducts, categoryConfig]);

  const [activeFilters, setActiveFilters] = useState<Record<string, string[]>>({});
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);
  const [sortOption, setSortOption] = useState('default');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const availableFilters = useMemo(() => {
    const filters: Record<string, string[]> = {};
    categoryConfig.filters.forEach(filter => {
        const options = [...new Set(categoryProducts.map(p => getProperty(p, filter.key)).filter(Boolean))].sort();
        if (options.length > 1) {
            filters[filter.key] = options;
        }
    });
    return filters;
  }, [categoryProducts, categoryConfig.filters]);

  const handleFilterChange = (key: string, value: string) => {
    setActiveFilters(prev => {
        const currentValues = prev[key] || [];
        const newValues = currentValues.includes(value)
            ? currentValues.filter(v => v !== value)
            : [...currentValues, value];
        return { ...prev, [key]: newValues };
    });
  };

  const resetFilters = () => {
    setActiveFilters({});
    setPriceRange([0, 100000]);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let result = categoryProducts;

    // Apply dynamic filters
    Object.entries(activeFilters).forEach(([key, values]) => {
      if (values.length > 0) {
        result = result.filter(p => values.includes(getProperty(p, key)));
      }
    });

    // Apply price range filter
    result = result.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    // Apply sorting
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
        result.sort((a, b) => a.id - b.id);
        break;
    }

    return result;
  }, [categoryProducts, activeFilters, priceRange, sortOption]);

  const FilterSidebar = () => (
    <aside className="2xl:col-span-1">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-24">
        <h2 className="text-xl font-bold mb-4 flex items-center"><SlidersHorizontal className="mr-2"/>ตัวกรอง</h2>
        
        <div className="space-y-6">
          {categoryConfig.filters.map(filter => {
            const options = availableFilters[filter.key];
            if (!options) return null;

            return (
              <div key={filter.key}>
                <h3 className="font-semibold mb-2">{filter.label}</h3>
                <div className="space-y-2 max-h-48 overflow-y-auto">
                  {options.map(option => (
                    <label key={option} className="flex items-center">
                      <input type="checkbox" checked={activeFilters[filter.key]?.includes(option)} onChange={() => handleFilterChange(filter.key, option)} className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"/>
                      <span className="ml-3 text-gray-700">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            );
          })}
          
          <div>
             <h3 className="font-semibold mb-2">ช่วงราคา</h3>
             <div className="flex items-center space-x-2">
                 <input type="number" value={priceRange[0]} onChange={e => setPriceRange([+e.target.value, priceRange[1]])} className="w-full border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900" placeholder="ต่ำสุด"/>
                 <span>-</span>
                 <input type="number" value={priceRange[1]} onChange={e => setPriceRange([priceRange[0], +e.target.value])} className="w-full border-gray-300 rounded-md shadow-sm text-sm bg-white text-gray-900" placeholder="สูงสุด"/>
             </div>
          </div>

          <button onClick={resetFilters} className="w-full text-center py-2 px-4 border border-red-500 text-red-500 rounded-md hover:bg-red-50 transition-colors text-sm font-semibold">
            ล้างตัวกรองทั้งหมด
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <nav className="text-sm mb-4" aria-label="Breadcrumb">
          <ol className="list-none p-0 inline-flex">
            <li className="flex items-center">
              {/* FIX: Simplified onNavigate call since data parameter is optional. */}
              <a href="#" onClick={(e) => { e.preventDefault(); onNavigate('home'); }} className="text-gray-500 hover:text-orange-600">หน้าแรก</a>
              <svg className="fill-current w-3 h-3 mx-2 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
            </li>
            <li className="flex items-center">
              <span className="text-gray-800 font-semibold">{categoryConfig.title}</span>
            </li>
          </ol>
        </nav>

        <div className="mb-8">
            <img src={bannerUrl} alt={`${categoryConfig.name} Promotion Banner`} className="w-full rounded-lg shadow-sm" />
        </div>
        
        <div className="grid grid-cols-1 2xl:grid-cols-4 gap-8">
          <div className="2xl:hidden">
            <button onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)} className="w-full flex items-center justify-center py-3 px-4 bg-white rounded-lg shadow-sm border border-gray-200 font-bold">
              <SlidersHorizontal className="mr-2"/>
              ตัวกรองสินค้า
            </button>
            {isMobileFiltersOpen && <div className="mt-4"><FilterSidebar/></div>}
          </div>
          
          <div className="hidden 2xl:block">
            <FilterSidebar />
          </div>

          <main className="2xl:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 p-4 bg-white rounded-lg shadow-sm border border-gray-200">
                <p className="text-gray-700 font-semibold mb-2 sm:mb-0">
                    พบสินค้า <span className="text-orange-600">{filteredAndSortedProducts.length}</span> รายการ
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

            {filteredAndSortedProducts.length > 0 ? (
                 <div className="grid grid-cols-2 md:grid-cols-3 2xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map(product => (
                        <ProductCard key={product.id} product={product} onNavigate={onNavigate} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-20 bg-white rounded-lg shadow-sm border border-gray-200">
                    <List size={48} className="mx-auto text-gray-400"/>
                    <h3 className="mt-4 text-xl font-bold text-gray-800">ไม่พบสินค้า</h3>
                    <p className="mt-1 text-gray-500">ลองปรับเปลี่ยนตัวกรองของคุณ</p>
                </div>
            )}
           
          </main>
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;