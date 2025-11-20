


import React from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, GitCompare, Star, Heart, Plus } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';

interface ProductCardProps {
  product: Product;
  onNavigate: (page: Page, data?: { productId: number }) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onNavigate }) => {
  const { addToast } = useToast();
  const { addToCart } = useCart();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  const isComparing = isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    addToast(`เพิ่ม '${product.name}' ลงตะกร้าแล้ว`, 'success');
  };

  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isComparing) {
      removeFromCompare(product.id);
      addToast(`นำ '${product.name}' ออกจากการเปรียบเทียบ`, 'info');
    } else {
      addToCompare(product);
    }
  };

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : 0;

  return (
    <div 
      className="bg-white rounded-3xl p-4 shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_15px_40px_rgba(0,0,0,0.08)] transition-all duration-300 flex flex-col group border border-gray-100 cursor-pointer relative h-full overflow-hidden hover:border-orange-100 hover:-translate-y-1"
      onClick={() => onNavigate('productDetail', { productId: product.id })}
    >
      {/* Image Area */}
      <div className="relative bg-gray-50 rounded-2xl aspect-[4/3] p-4 flex items-center justify-center overflow-hidden mb-4 group-hover:bg-white transition-colors border border-transparent group-hover:border-gray-50">
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-black px-2.5 py-1 rounded-lg z-10 shadow-md backdrop-blur-sm bg-opacity-90">
            -{discountPercentage}%
          </div>
        )}
        {/* Wishlist Icon placeholder */}
        <button className="absolute top-3 right-3 p-2 rounded-full bg-white text-gray-400 hover:text-red-500 hover:bg-red-50 shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 z-10 scale-90 hover:scale-100">
            <Heart size={18} />
        </button>

        <div className="w-full h-full relative flex items-center justify-center">
             <img 
                src={product.imageUrls[0]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 will-change-transform"
             />
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-center mb-2">
             <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase bg-gray-100 px-2 py-0.5 rounded-md">{product.category}</span>
             {product.rating > 0 && (
                 <div className="flex items-center gap-1">
                     <Star size={12} className="fill-yellow-400 text-yellow-400"/>
                     <span className="text-[11px] font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                 </div>
             )}
        </div>

        <h3 className="text-sm font-bold text-gray-800 mb-2 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[2.5em]" title={product.name}>
            {product.name}
        </h3>
        
        <div className="flex-grow"></div>

        <div className="mt-3 pt-3 border-t border-dashed border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
             {hasDiscount && (
                <span className="text-[11px] text-gray-400 line-through font-medium">
                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.oldPrice!)}
                </span>
             )}
             <span className="text-lg font-black text-gray-900 -mt-1 tracking-tight">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.price)}
            </span>
          </div>

          <div className="flex gap-2 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
              <button 
                onClick={handleCompareClick}
                className={`p-2.5 rounded-xl shadow-sm border transition-all active:scale-95 ${isComparing ? 'bg-orange-50 border-orange-200 text-orange-600' : 'bg-white border-gray-200 text-gray-400 hover:border-orange-300 hover:text-orange-600'}`}
                title="เปรียบเทียบ"
              >
                  <GitCompare size={18} />
              </button>
              <button 
                onClick={handleAddToCart} 
                className="p-2.5 bg-gray-900 text-white rounded-xl hover:bg-orange-600 transition-all shadow-md hover:shadow-orange-200 hover:-translate-y-0.5 active:scale-95 flex items-center justify-center"
                title="เพิ่มลงตะกร้า"
              >
                <Plus size={18} strokeWidth={3} />
              </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
