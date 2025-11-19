
import React from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, GitCompare, Star } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';
import StarRating from './StarRating';

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
      className="bg-white rounded-2xl overflow-hidden flex flex-col group border border-gray-100 transition-all duration-300 relative cursor-pointer hover:border-orange-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)] transform hover:-translate-y-1"
      onClick={() => onNavigate('productDetail', { productId: product.id })}
    >
      {/* Badge & Actions Overlay */}
      <div className="relative overflow-hidden bg-gray-50 aspect-[4/3] p-4">
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-full z-10 shadow-sm">
            -{discountPercentage}%
          </div>
        )}
        {/* Image */}
        <img 
          src={product.imageUrls[0]} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110"
        />
        {/* Quick Action Button (visible on hover) */}
        <div className="absolute bottom-3 right-3 flex flex-col gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 z-10">
             <button 
                onClick={handleCompareClick}
                className={`p-2.5 rounded-full shadow-md transition-colors ${isComparing ? 'bg-orange-100 text-orange-600' : 'bg-white text-gray-600 hover:text-orange-600 hover:bg-orange-50'}`}
                title="เปรียบเทียบ"
             >
                 <GitCompare size={18} />
             </button>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex justify-between items-start mb-1">
             <span className="text-[10px] font-bold tracking-wider text-orange-500 uppercase bg-orange-50 px-2 py-0.5 rounded-sm">{product.category}</span>
             {product.rating > 0 && (
                 <div className="flex items-center gap-1">
                     <Star size={10} className="fill-yellow-400 text-yellow-400"/>
                     <span className="text-[10px] font-semibold text-gray-500">{product.rating.toFixed(1)}</span>
                 </div>
             )}
        </div>

        <h3 className="text-sm font-semibold text-gray-800 mb-2 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors h-10" title={product.name}>
            {product.name}
        </h3>
        
        {/* Spacer */}
        <div className="flex-grow"></div>

        <div className="mt-3 pt-3 border-t border-dashed border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
             {hasDiscount && (
                <span className="text-xs text-gray-400 line-through">
                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.oldPrice!)}
                </span>
             )}
             <span className="text-lg font-bold text-gray-900 group-hover:text-orange-600 transition-colors">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.price)}
            </span>
          </div>

          <button 
            onClick={handleAddToCart} 
            className="p-2 bg-gray-900 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg active:scale-95"
            title="เพิ่มลงตะกร้า"
          >
            <ShoppingCart size={18} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
