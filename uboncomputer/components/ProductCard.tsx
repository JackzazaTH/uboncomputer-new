
import React from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, GitCompare } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';
import { useComparison } from '../hooks/useComparison';

interface ProductCardProps {
  product: Product;
  // FIX: Made the 'data' parameter optional to align with the more general navigate function from App.tsx.
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
      className="bg-white rounded-lg overflow-hidden flex flex-col group border border-gray-200 hover:border-orange-500 hover:shadow-lg transition-all duration-300 relative cursor-pointer"
      onClick={() => onNavigate('productDetail', { productId: product.id })}
    >
      {hasDiscount && (
        <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
          -{discountPercentage}%
        </div>
      )}
      <div className="overflow-hidden">
        <img 
          src={product.imageUrl} 
          alt={product.name} 
          className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-xs text-orange-600 font-semibold mb-1">{product.category.toUpperCase()}</p>
        <h3 className="text-md font-semibold text-gray-800 mb-2 flex-grow h-14">{product.name}</h3>
        
        <div className="text-xs text-gray-600 mb-3 space-y-1 h-10">
            {product.brand && <p className="truncate"><strong>แบรนด์:</strong> {product.brand}</p>}
            {product.specs?.socket && <p className="truncate"><strong>ซ็อกเก็ต:</strong> {product.specs.socket}</p>}
        </div>

        <div className="flex items-end justify-between">
          <div className="flex flex-col items-start">
             <p className="text-xl font-bold text-gray-900">
                {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.price)}
            </p>
            {hasDiscount && (
                <p className="text-sm text-gray-400 line-through">
                    {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(product.oldPrice!)}
                </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleCompareClick} 
              className={`p-2 bg-gray-100 rounded-full transition-colors duration-300 z-10 ${isComparing ? 'text-orange-500' : 'text-gray-600 hover:text-orange-500'}`}
              title={isComparing ? "นำออกจากการเปรียบเทียบ" : "เพิ่มเพื่อเปรียบเทียบ"}
            >
              <GitCompare className="w-5 h-5" />
            </button>
            <button onClick={handleAddToCart} className="p-2 bg-gray-100 rounded-full text-gray-600 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-300 z-10">
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;