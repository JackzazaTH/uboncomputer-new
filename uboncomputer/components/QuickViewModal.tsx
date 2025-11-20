
import React, { useState, useEffect } from 'react';
import { X, ShoppingCart, ArrowRight, CheckCircle, AlertCircle } from 'lucide-react';
import { Product, Page } from '../types';
import { useQuickView } from '../hooks/useQuickView';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import StarRating from './StarRating';

interface QuickViewModalProps {
  onNavigate: (page: Page, data?: { productId: number }) => void;
}

const QuickViewModal: React.FC<QuickViewModalProps> = ({ onNavigate }) => {
  const { selectedProduct, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    if (selectedProduct) {
        setQuantity(1);
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedProduct]);

  if (!selectedProduct) return null;

  const handleAddToCart = () => {
    addToCart(selectedProduct, quantity);
    addToast(`เพิ่ม '${selectedProduct.name}' ลงตะกร้าแล้ว`, 'success');
    closeQuickView();
  };

  const handleViewDetails = () => {
    onNavigate('productDetail', { productId: selectedProduct.id });
    closeQuickView();
  };

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  const hasDiscount = selectedProduct.oldPrice && selectedProduct.oldPrice > selectedProduct.price;
  const discountPercentage = hasDiscount ? Math.round(((selectedProduct.oldPrice! - selectedProduct.price) / selectedProduct.oldPrice!) * 100) : 0;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4 sm:p-6 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity" onClick={closeQuickView}></div>
      
      <div className="relative bg-white w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh] animate-slide-in-up">
        <button 
            onClick={closeQuickView} 
            className="absolute top-4 right-4 p-2 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 hover:text-gray-800 transition-colors z-10"
        >
            <X size={20} />
        </button>

        {/* Image Section */}
        <div className="w-full md:w-1/2 bg-gray-50 p-8 flex items-center justify-center relative min-h-[300px]">
             {hasDiscount && (
                <div className="absolute top-4 left-4 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-sm z-10">
                    ลด {discountPercentage}%
                </div>
            )}
            <img 
                src={selectedProduct.imageUrls[0]} 
                alt={selectedProduct.name} 
                className="max-w-full max-h-[300px] md:max-h-[400px] object-contain mix-blend-multiply"
            />
        </div>

        {/* Info Section */}
        <div className="w-full md:w-1/2 p-8 overflow-y-auto custom-scrollbar bg-white">
            <div className="mb-2">
                <span className="text-xs font-bold text-orange-600 bg-orange-50 px-2 py-1 rounded uppercase tracking-wider">{selectedProduct.category}</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-3 leading-tight">{selectedProduct.name}</h2>
            
            <div className="flex items-center gap-2 mb-5">
                <StarRating rating={selectedProduct.rating} readOnly size={16} />
                <span className="text-sm text-gray-500">({selectedProduct.reviewCount} รีวิว)</span>
            </div>

            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gray-100">
                <span className="text-3xl font-extrabold text-gray-900">{formatCurrency(selectedProduct.price)}</span>
                {hasDiscount && (
                    <span className="text-lg text-gray-400 line-through font-medium">{formatCurrency(selectedProduct.oldPrice!)}</span>
                )}
            </div>

            <div className="mb-8">
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center gap-2"><CheckCircle size={14} className="text-green-500"/> คุณสมบัติเด่น</h3>
                {selectedProduct.specs && Object.keys(selectedProduct.specs).length > 0 ? (
                    <ul className="space-y-2 text-sm text-gray-600">
                        {Object.entries(selectedProduct.specs).slice(0, 4).map(([key, val]) => (
                            <li key={key} className="flex justify-between border-b border-dashed border-gray-100 pb-1 last:border-0">
                                <span className="font-medium text-gray-800">{key}</span>
                                <span>{val}</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p className="text-sm text-gray-500 line-clamp-3">{selectedProduct.description}</p>
                )}
            </div>

            {/* Actions */}
            <div className="space-y-3 mt-auto">
                {selectedProduct.availability !== 'outOfStock' ? (
                     <div className="flex items-stretch gap-3">
                         <div className="flex items-center border border-gray-300 rounded-lg h-12">
                            <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 h-full hover:bg-gray-100 text-gray-600 rounded-l-lg transition-colors">-</button>
                            <span className="w-10 text-center font-bold text-gray-900">{quantity}</span>
                            <button onClick={() => setQuantity(quantity + 1)} className="px-3 h-full hover:bg-gray-100 text-gray-600 rounded-r-lg transition-colors">+</button>
                         </div>
                         <button 
                            onClick={handleAddToCart}
                            className="flex-1 bg-gray-900 hover:bg-black text-white font-bold rounded-lg flex items-center justify-center gap-2 transition-all shadow-lg shadow-gray-900/20 active:scale-95"
                        >
                            <ShoppingCart size={20} />
                            เพิ่มลงตะกร้า
                         </button>
                     </div>
                ) : (
                    <div className="w-full py-3 bg-gray-100 text-gray-400 font-bold rounded-lg text-center flex items-center justify-center gap-2">
                        <AlertCircle size={20}/> สินค้าหมดชั่วคราว
                    </div>
                )}

                <button 
                    onClick={handleViewDetails}
                    className="w-full py-3 bg-white border border-gray-200 text-gray-700 font-bold rounded-lg hover:border-orange-500 hover:text-orange-600 transition-all flex items-center justify-center gap-2 active:bg-gray-50"
                >
                    ดูรายละเอียดเต็ม <ArrowRight size={16} />
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default QuickViewModal;
