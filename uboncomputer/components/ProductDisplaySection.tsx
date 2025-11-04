'use client';
import React, { useState } from 'react';
import { DisplayProduct, Brand, Page } from '../types';
import NotebookCard from './NotebookCard';
import { LayoutGrid, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface ProductDisplaySectionProps {
    title: string;
    products: DisplayProduct[];
    brands: Brand[];
    sidebarTitle: string;
}

const ProductDisplaySection: React.FC<ProductDisplaySectionProps> = ({ title, products, brands, sidebarTitle }) => {
    const [selectedBrand, setSelectedBrand] = useState<string | null>(null);

    const displayedProducts = (
        selectedBrand
            ? products.filter(n => n.brand === selectedBrand)
            : products
    ).slice(0, 8); // Show up to 8 products

    const hasBrands = brands && brands.length > 0;

    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar */}
                    {hasBrands && (
                        <aside className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 sticky top-24">
                                <h3 className="text-lg font-bold text-gray-800 flex items-center mb-4">
                                    <LayoutGrid className="w-6 h-6 mr-2 text-orange-500" />
                                    {sidebarTitle}
                                </h3>
                                <ul className="space-y-1">
                                    <li>
                                        <button
                                            onClick={() => setSelectedBrand(null)}
                                            className={`w-full text-left px-3 py-2.5 rounded-md transition-colors text-sm font-medium flex items-center ${
                                                selectedBrand === null ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                                            }`}
                                        >
                                            {sidebarTitle}ทั้งหมด
                                        </button>
                                    </li>
                                    {brands.map(brand => (
                                        <li key={brand.name}>
                                            <button
                                                onClick={() => setSelectedBrand(brand.name)}
                                                className={`w-full text-left px-3 py-2.5 rounded-md transition-colors text-sm font-medium flex items-center ${
                                                    selectedBrand === brand.name ? 'bg-orange-100 text-orange-700' : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                            >
                                                {brand.logoUrl && <img src={brand.logoUrl} alt={brand.name} className="w-8 h-8 object-contain mr-3" />}
                                                {brand.name}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </aside>
                    )}

                    {/* Product Grid */}
                    <main className={hasBrands ? "lg:col-span-3" : "lg:col-span-4"}>
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
                             <Link
                                href="#"
                                className="text-sm font-semibold text-gray-600 hover:text-orange-600 flex items-center transition-colors"
                            >
                                ดูทั้งหมด
                                <ArrowRight size={16} className="ml-1" />
                            </Link>
                        </div>
                        {displayedProducts.length > 0 ? (
                            <div className={`grid grid-cols-1 sm:grid-cols-2 ${hasBrands ? 'xl:grid-cols-4' : 'xl:grid-cols-4'} gap-6`}>
                                {displayedProducts.map(product => (
                                    <NotebookCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                             <div className="text-center py-16 bg-white rounded-lg shadow-sm border">
                                <p className="text-xl text-gray-500">
                                    {selectedBrand ? `ไม่พบสินค้าสำหรับแบรนด์ "${selectedBrand}"` : "ไม่พบสินค้าในหมวดหมู่นี้"}
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </section>
    );
};

export default ProductDisplaySection;
