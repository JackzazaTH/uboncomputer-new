import React from 'react';
import { useComparison } from '../hooks/useComparison';
import { Page, Product } from '../types';
import { X, ArrowLeft, GitCompare } from 'lucide-react';

interface ComparePageProps {
    onNavigate: (page: Page) => void;
}

const ComparePage: React.FC<ComparePageProps> = ({ onNavigate }) => {
    const { compareItems, removeFromCompare } = useComparison();

    const allSpecKeys = React.useMemo(() => {
        const keys = new Set<string>();
        compareItems.forEach(item => {
            if (item.specs) {
                Object.keys(item.specs).forEach(key => keys.add(key));
            }
        });
        return Array.from(keys).sort();
    }, [compareItems]);

    const specLabels: Record<string, string> = {
        socket: 'Socket',
        ramType: 'ชนิด RAM',
        formFactor: 'Form Factor',
        wattage: 'กำลังไฟ (วัตต์)',
    };

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

    if (compareItems.length === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <GitCompare size={64} className="mx-auto text-gray-300" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">ไม่มีสินค้าในรายการเปรียบเทียบ</h1>
                <p className="mt-2 text-gray-500">กรุณาเพิ่มสินค้าที่คุณสนใจเพื่อเริ่มการเปรียบเทียบ</p>
                <button 
                    onClick={() => onNavigate('home')}
                    className="mt-6 inline-flex items-center bg-orange-600 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-700 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    กลับไปเลือกซื้อสินค้า
                </button>
            </div>
        );
    }
    
    let gridColsClass = 'grid-cols-2';
    switch (compareItems.length) {
        case 1: gridColsClass = 'grid-cols-2'; break;
        case 2: gridColsClass = 'grid-cols-3'; break;
        case 3: gridColsClass = 'grid-cols-4'; break;
        case 4: gridColsClass = 'grid-cols-5'; break;
    }

    const renderAttributeRowMobile = (label: string, getValue: (item: Product) => React.ReactNode) => (
      <tr className="group">
        <th scope="row" className="sticky left-0 p-3 text-sm font-semibold bg-gray-100 border-b border-r group-hover:bg-gray-200 w-32">
          {label}
        </th>
        {compareItems.map(item => (
          <td key={item.id} className="p-3 text-sm border-b text-center group-hover:bg-gray-50 align-middle">
            {getValue(item)}
          </td>
        ))}
      </tr>
    );

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">เปรียบเทียบสินค้า</h1>
                
                {/* Mobile View */}
                <div className="lg:hidden">
                    <div className="overflow-x-auto rounded-lg border">
                        <table className="min-w-full border-collapse align-top">
                            <thead className="sticky top-20 bg-white z-20">
                                <tr>
                                    <th scope="col" className="sticky left-0 p-3 text-sm font-semibold bg-gray-100 z-10 border-b border-r w-32">
                                    คุณสมบัติ
                                    </th>
                                    {compareItems.map(item => (
                                    <th scope="col" key={item.id} className="p-2 border-b w-40 min-w-[10rem] font-normal">
                                        <div className="relative">
                                        <button 
                                            onClick={() => removeFromCompare(item.id)} 
                                            className="absolute -top-1 -right-1 z-10 p-0.5 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
                                            aria-label={`Remove ${item.name}`}
                                        >
                                            <X size={14} />
                                        </button>
                                        {/* FIX: Changed item.imageUrl to item.imageUrls[0] to match the Product type. */}
                                        <img src={item.imageUrls[0]} alt={item.name} className="w-full h-24 object-contain mb-2" />
                                        <p className="font-semibold text-xs text-gray-800 line-clamp-3">{item.name}</p>
                                        </div>
                                    </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {renderAttributeRowMobile('ราคา', item => <span className="font-bold text-orange-600">{formatCurrency(item.price)}</span>)}
                                {renderAttributeRowMobile('แบรนด์', item => item.brand)}
                                {renderAttributeRowMobile('หมวดหมู่', item => item.category)}
                                {allSpecKeys.map((key) => renderAttributeRowMobile(specLabels[key] || key, item => item.specs?.[key as keyof typeof item.specs] || '-'))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Desktop View */}
                <div className="hidden lg:block overflow-x-auto">
                    <div className={`grid ${gridColsClass} min-w-max gap-4 items-start`}>
                        {/* Header Column */}
                        <div className="sticky top-20 z-10">
                            <div className="h-48"></div> {/* Spacer for image */}
                            <div className="font-bold text-gray-800 p-3 bg-gray-100 border-b">ชื่อสินค้า</div>
                            <div className="font-bold text-gray-800 p-3 bg-white border-b">ราคา</div>
                            <div className="font-bold text-gray-800 p-3 bg-gray-100 border-b">แบรนด์</div>
                            <div className="font-bold text-gray-800 p-3 bg-white border-b">หมวดหมู่</div>
                            {allSpecKeys.map((key, index) => (
                                <div key={key} className={`font-bold text-gray-800 p-3 border-b ${index % 2 ? 'bg-white' : 'bg-gray-100'}`}>
                                    {specLabels[key] || key}
                                </div>
                            ))}
                        </div>

                        {/* Product Columns */}
                        {compareItems.map(item => (
                            <div key={item.id} className="relative border rounded-lg overflow-hidden">
                                <button
                                    onClick={() => removeFromCompare(item.id)}
                                    className="absolute top-2 right-2 z-10 p-1 bg-white/70 rounded-full text-gray-600 hover:bg-red-500 hover:text-white"
                                >
                                    <X size={18} />
                                </button>
                                <div className="h-48 p-4 flex items-center justify-center">
                                    {/* FIX: Changed item.imageUrl to item.imageUrls[0] to match the Product type. */}
                                    <img src={item.imageUrls[0]} alt={item.name} className="max-h-full max-w-full object-contain" />
                                </div>
                                <div className="p-3 bg-gray-50 border-y text-sm font-semibold text-gray-800 h-20 line-clamp-3">{item.name}</div>
                                <div className="p-3 border-b text-lg font-bold text-orange-600">{formatCurrency(item.price)}</div>
                                <div className="p-3 bg-gray-50 border-b text-sm text-gray-700">{item.brand}</div>
                                <div className="p-3 border-b text-sm text-gray-700">{item.category}</div>
                                {allSpecKeys.map((key, index) => (
                                    <div key={key} className={`p-3 border-b text-sm text-gray-700 ${index % 2 ? 'bg-white' : 'bg-gray-50'}`}>
                                        {item.specs?.[key as keyof typeof item.specs] || '-'}
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default ComparePage;