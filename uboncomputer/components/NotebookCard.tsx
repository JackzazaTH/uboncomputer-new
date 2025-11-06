import React from 'react';
import { DisplayProduct, Product, Page } from '../types';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useComparison } from '../hooks/useComparison';
import { ShoppingCart, Eye, GitCompare } from 'lucide-react';

interface NotebookCardProps {
  product: DisplayProduct;
  onNavigate: (page: Page, data?: { productId?: number }) => void;
}

const NotebookCard: React.FC<NotebookCardProps> = ({ product, onNavigate }) => {
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  const isComparing = isInCompare(product.id);

  const handleNavigate = () => {
    onNavigate('productDetail', { productId: product.id });
  };
  
  const getProductForContext = (): Product => {
     return {
      id: product.id,
      name: product.name,
      price: product.price,
      oldPrice: product.oldPrice,
      imageUrls: product.imageUrls,
      brand: product.brand,
      category: 'Notebook',
      costPrice: product.price * 0.9, // Placeholder
      stock: 99, // Placeholder
      availability: 'inStock', // Placeholder
      rating: 4.5, // Placeholder
      reviewCount: 10, // Placeholder
      description: product.specs,
      specs: {}, // Specs are in a single string for DisplayProduct
    };
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const productForCart = getProductForContext();
    addToCart(productForCart);
    addToast(`เพิ่ม '${product.name}' ลงตะกร้าแล้ว`, 'success');
  };
  
  const handleCompareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const productForCompare = getProductForContext();
    if (isComparing) {
      removeFromCompare(product.id);
      addToast(`นำ '${product.name}' ออกจากการเปรียบเทียบ`, 'info');
    } else {
      addToCompare(productForCompare);
    }
  };
  
  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'decimal' }).format(amount);

  return (
    <div 
      className="bg-white rounded-lg overflow-hidden flex flex-col group border border-gray-200 hover:shadow-lg transition-all duration-300 h-full p-4 relative cursor-pointer"
      onClick={handleNavigate}
    >
      {product.discountPercentage && (
        <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full z-20">
          -{product.discountPercentage}%
        </div>
      )}
      <div className="relative mb-4">
        <div className="block">
            <img 
              src={product.imageUrls[0]} 
              alt={product.name} 
              className="w-full h-48 object-contain transition-transform duration-500 group-hover:scale-105"
            />
        </div>
        {/* Hover overlay for buttons */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10 pb-4">
            <button onClick={(e) => { e.stopPropagation(); handleNavigate(); }} className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:text-orange-500 transition-all scale-90 group-hover:scale-100" title="ดูรายละเอียด">
                <Eye size={20} />
            </button>
            <button 
                onClick={handleCompareClick} 
                className={`p-3 bg-white/90 rounded-full transition-all scale-90 group-hover:scale-100 ${isComparing ? 'text-orange-500' : 'text-gray-800 hover:text-orange-500'}`} 
                title={isComparing ? "นำออกจากการเปรียบเทียบ" : "เพิ่มเพื่อเปรียบเทียบ"}>
                <GitCompare size={20} />
            </button>
            <button 
                onClick={handleAddToCart} 
                className="p-3 bg-white/90 rounded-full text-gray-800 hover:bg-white hover:text-orange-500 transition-all scale-90 group-hover:scale-100" 
                title="เพิ่มลงตะกร้า">
                <ShoppingCart size={20} />
            </button>
        </div>
      </div>
      <div className="flex flex-col flex-grow">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 flex-grow h-12 line-clamp-2">
            <span className="hover:text-orange-600 transition-colors">{product.name}</span>
        </h3>
        <p className="text-xs text-gray-500 mb-3 h-10 line-clamp-2">{product.specs}</p>
        
        <div className="mt-auto text-right">
            <p className="text-xl font-bold text-gray-800">
                ฿{formatCurrency(product.price)}
            </p>
            {product.oldPrice && (
                <p className="text-sm text-gray-400 line-through">
                    ฿{formatCurrency(product.oldPrice)}
                </p>
            )}
        </div>
      </div>
    </div>
  );
};

export default NotebookCard;