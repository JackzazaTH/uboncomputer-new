
import React from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, GitCompare, Star, Heart, Eye } from 'lucide-react';
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
  
  const handleViewDetail = (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate('productDetail', { productId: product.id });
  }

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : 0;

  return (
    <div 
      className="bg-white rounded-2xl p-3 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-100 cursor-pointer relative h-full overflow-hidden hover:-translate-y-1"
      onClick={() => onNavigate('productDetail', { productId: product.id })}
    >
      {/* Image Area */}
      <div className="relative bg-gray-50 rounded-xl aspect-[4/3] p-4 flex items-center justify-center overflow-hidden mb-3 group-hover:bg-gray-100 transition-colors">
        {hasDiscount && (
          <div className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-2 py-1 rounded-md z-20 shadow-sm">
            -{discountPercentage}%
          </div>
        )}
        <button className="absolute top-2 right-2 p-1.5 rounded-full bg-white text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0 z-20 hover:scale-110">
            <Heart size={16} />
        </button>

        <div className="w-full h-full relative flex items-center justify-center z-0">
             <img 
                src={product.imageUrls[0]} 
                alt={product.name} 
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 group-hover:scale-110 will-change-transform"
             />
        </div>

        {/* Hover Actions Overlay */}
        <div className="absolute inset-x-0 bottom-0 p-3 flex justify-center items-end gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300 z-20 pb-4 bg-gradient-to-t from-black/10 to-transparent">
             <button 
                onClick={handleViewDetail}
                className="p-2 bg-white text-gray-700 rounded-lg shadow-md hover:bg-orange-500 hover:text-white transition-colors transform hover:scale-110"
                title="ดูรายละเอียด"
              >
                  <Eye size={18} />
              </button>
              <button 
                onClick={handleCompareClick}
                className={`p-2 rounded-lg shadow-md transition-colors transform hover:scale-110 ${isComparing ? 'bg-orange-100 text-orange-600' : 'bg-white text-gray-700 hover:bg-orange-500 hover:text-white'}`}
                title="เปรียบเทียบ"
              >
                  <GitCompare size={18} />
              </button>
              <button 
                onClick={handleAddToCart} 
                className="p-2 bg-gray-900 text-white rounded-lg shadow-md hover:bg-orange-600 transition-colors transform hover:scale-110"
                title="เพิ่มลงตะกร้า"
              >
                <ShoppingCart size={18} />
              </button>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-grow px-1">
        <div className="flex justify-between items-start mb-1">
             <span className="text-[10px] font-bold tracking-wider text-gray-500 uppercase">{product.category}</span>
             {product.rating > 0 && (
                 <div className="flex items-center gap-1">
                     <Star size={10} className="fill-yellow-400 text-yellow-400"/>
                     <span className="text-[10px] font-bold text-gray-700">{product.rating.toFixed(1)}</span>
                 </div>
             )}
        </div>

        <h3 className="text-sm font-bold text-gray-800 mb-1 leading-snug line-clamp-2 group-hover:text-orange-600 transition-colors min-h-[2.5em]" title={product.name}>
            {product.name}
        </h3>
        
        <div className="flex-grow"></div>

        <div className="mt-2 pt-2 border-t border-dashed border-gray-100 flex items-end justify-between">
          <div className="flex flex-col">
             {hasDiscount && (
                <span className="text-[10px] text-gray-400 line-through font-medium">
                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.oldPrice!)}
                </span>
             )}
             <span className="text-base font-black text-gray-900 -mt-0.5">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.price)}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
