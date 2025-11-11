import React from 'react';
import { ComputerSetProduct, Page } from '../types';

interface ComputerSetCardProps {
  product: ComputerSetProduct;
  onNavigate: (page: Page, data: { computerSetId: number }) => void;
}

const ComputerSetCard: React.FC<ComputerSetCardProps> = ({ product, onNavigate }) => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'decimal' }).format(amount);

  const specString = Object.entries(product.specs)
      .filter(([key, value]) => key !== 'notes' && value)
      .map(([, value]) => value as string)
      .join(' / ');

  return (
    <button
      onClick={() => onNavigate('computerSetDetail', { computerSetId: product.id })}
      className="bg-white rounded-lg overflow-hidden flex flex-col group border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 h-full text-left w-full"
    >
      <div className="relative overflow-hidden">
        <img 
          // FIX: Changed product.imageUrl to product.imageUrls[0] to match the ComputerSetProduct type.
          src={product.imageUrls[0]} 
          alt={product.name} 
          className="w-full h-auto object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {product.badge && (
            <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                {product.badge}
            </div>
        )}
      </div>
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex-grow h-12 line-clamp-2">{product.name}</h3>
        <p className="text-xs text-gray-500 mb-3 h-10 line-clamp-2">{specString}</p>
        
        <div className="mt-auto">
            <div className="text-right mb-2">
                <p className="text-lg font-bold text-red-600">
                    ฿{formatCurrency(product.price)}
                </p>
                {product.oldPrice && (
                    <p className="text-xs text-gray-400 line-through">
                        ฿{formatCurrency(product.oldPrice)}
                    </p>
                )}
            </div>
            <div className="w-full bg-orange-500 text-white font-semibold py-2 rounded-md group-hover:bg-orange-600 transition-colors text-sm text-center">
                ดูเพิ่มเติม
            </div>
        </div>
      </div>
    </button>
  );
};

export default ComputerSetCard;