
import React from 'react';
import { ComputerSetProduct, Page } from '../types';
import { ArrowRight, Cpu, CheckCircle2 } from 'lucide-react';

interface ComputerSetCardProps {
  product: ComputerSetProduct;
  onNavigate: (page: Page, data: { computerSetId: number }) => void;
}

const ComputerSetCard: React.FC<ComputerSetCardProps> = ({ product, onNavigate }) => {
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  return (
    <button
      onClick={() => onNavigate('computerSetDetail', { computerSetId: product.id })}
      className="bg-white rounded-2xl overflow-hidden flex flex-col group border border-gray-100 hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 h-full text-left w-full relative transform hover:-translate-y-1"
    >
      <div className="relative overflow-hidden aspect-[16/10] bg-gradient-to-b from-gray-100 to-white p-4">
        {product.badge && (
            <div className="absolute top-3 left-3 bg-gradient-to-r from-red-600 to-orange-500 text-white text-[10px] font-bold px-3 py-1 rounded-full z-10 shadow-md uppercase tracking-wider">
                {product.badge}
            </div>
        )}
        <img 
          src={product.imageUrls[0]} 
          alt={product.name} 
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110 drop-shadow-xl"
        />
      </div>
      
      <div className="p-5 flex flex-col flex-grow relative">
        {/* CPU Badge */}
        <div className="absolute -top-4 right-4 bg-white border border-gray-100 shadow-sm rounded-full px-3 py-1 flex items-center gap-1.5 text-xs font-bold text-gray-700">
            <Cpu size={14} className="text-orange-500"/>
            {product.specs.cpu.split(' ').slice(0, 2).join(' ')}
        </div>

        <h3 className="text-base font-bold text-gray-800 mb-3 line-clamp-2 group-hover:text-orange-600 transition-colors mt-2">{product.name}</h3>
        
        <div className="space-y-1.5 mb-4 flex-grow">
            <div className="flex items-start gap-2 text-xs text-gray-500">
                <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0"/>
                <span className="line-clamp-1">{product.specs.vga}</span>
            </div>
            <div className="flex items-start gap-2 text-xs text-gray-500">
                <CheckCircle2 size={14} className="text-green-500 mt-0.5 flex-shrink-0"/>
                <span className="line-clamp-1">{product.specs.ram} / {product.specs.storage}</span>
            </div>
        </div>
        
        <div className="pt-4 border-t border-dashed border-gray-100 flex items-center justify-between mt-auto">
            <div className="flex flex-col">
                 {product.oldPrice && (
                    <p className="text-xs text-gray-400 line-through font-medium">
                        {formatCurrency(product.oldPrice)}
                    </p>
                )}
                <p className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                    {formatCurrency(product.price)}
                </p>
            </div>
            <div className="w-8 h-8 rounded-full bg-orange-50 flex items-center justify-center text-orange-600 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <ArrowRight size={16} />
            </div>
        </div>
      </div>
    </button>
  );
};

export default ComputerSetCard;
