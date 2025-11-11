import React, { useState } from 'react';
import { Product, Page } from '../types';
import { ShoppingCart, CheckCircle, ShieldCheck, Truck, Plus, Minus, XCircle, GitCompare, Clock, Info } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import { useComparison } from '../hooks/useComparison';
import ProductCard from './ProductCard';
import { categoryConfigurations } from '../categoryConfig';

interface ProductPageProps {
  product: Product;
  allProducts: Product[];
  onNavigate: (page: Page, data?: { productId: number }) => void;
}

const ProductPage: React.FC<ProductPageProps> = ({ product, allProducts, onNavigate }) => {
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.imageUrls[0]);
  const { addToCart } = useCart();
  const { addToast } = useToast();
  const { addToCompare, removeFromCompare, isInCompare } = useComparison();

  const isComparing = isInCompare(product.id);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    addToast(`เพิ่ม '${product.name}' x${quantity} ลงตะกร้าแล้ว`, 'success');
  };
  
  const handleCompareClick = () => {
    if (isComparing) {
      removeFromCompare(product.id);
      addToast(`นำ '${product.name}' ออกจากการเปรียบเทียบ`, 'info');
    } else {
      addToCompare(product);
    }
  };

  const relatedProducts = allProducts
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const hasDiscount = product.oldPrice && product.oldPrice > product.price;
  const discountPercentage = hasDiscount ? Math.round(((product.oldPrice! - product.price) / product.oldPrice!) * 100) : 0;

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  const isCategoryPage = Object.keys(categoryConfigurations).includes(product.category.toLowerCase());

  const renderAvailabilityStatus = () => {
    switch (product.availability) {
      case 'inStock':
        return (
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            <span>สถานะ: <span className="font-semibold text-green-600">มีสินค้า</span></span>
          </div>
        );
      case 'preOrder':
        return (
          <div className="flex items-center">
            <Clock className="w-5 h-5 text-blue-500 mr-2" />
            <span>สถานะ: <span className="font-semibold text-blue-600">สินค้าพรีออเดอร์</span></span>
          </div>
        );
      case 'byOrder':
        return (
          <div className="flex items-center">
            <Info className="w-5 h-5 text-purple-500 mr-2" />
            <span>สถานะ: <span className="font-semibold text-purple-600">สินค้า By-Order</span></span>
          </div>
        );
      case 'outOfStock':
      default:
        return (
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <span>สถานะ: <span className="font-semibold text-red-600">สินค้าหมด</span></span>
          </div>
        );
    }
  };

  const addToCartButtonText = () => {
    switch (product.availability) {
        case 'preOrder': return 'พรีออเดอร์';
        case 'byOrder': return 'สั่งจอง';
        default: return 'เพิ่มลงตะกร้า';
    }
  };


  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Image Gallery */}
          <div className="flex flex-col">
            <div className="flex-grow flex justify-center items-center bg-gray-50 rounded-lg p-4 h-96 min-h-[24rem]">
                <img 
                  src={activeImage} 
                  alt={product.name} 
                  className="max-w-full h-auto max-h-full object-contain transition-opacity duration-300"
                />
            </div>
            {product.imageUrls.length > 1 && (
                <div className="mt-4">
                    <div className="flex items-center gap-2 overflow-x-auto pb-2 -mx-2 px-2">
                        {product.imageUrls.map((imgUrl, index) => (
                            <button 
                                key={index} 
                                onClick={() => setActiveImage(imgUrl)}
                                className={`flex-shrink-0 w-20 h-20 rounded-md border-2 p-1 transition-all ${activeImage === imgUrl ? 'border-orange-500' : 'border-gray-200 hover:border-gray-400'}`}
                            >
                                <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-contain" />
                            </button>
                        ))}
                    </div>
                </div>
            )}
          </div>

          {/* Product Details */}
          <div>
            <nav className="text-sm mb-4" aria-label="Breadcrumb">
              <ol className="list-none p-0 inline-flex">
                <li className="flex items-center">
                  <button onClick={() => onNavigate('home')} className="text-gray-500 hover:text-orange-600">หน้าแรก</button>
                  <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                </li>
                <li className="flex items-center">
                   {isCategoryPage ? (
                     <button onClick={() => onNavigate(product.category.toLowerCase() as Page)} className="text-gray-800 font-semibold hover:text-orange-600">{product.category}</button>
                  ) : (
                     <span className="text-gray-800 font-semibold">{product.category}</span>
                  )}
                </li>
              </ol>
            </nav>

            <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>
            <p className="text-gray-500 mb-4">แบรนด์: <span className="font-semibold text-gray-700">{product.brand}</span></p>

            <div className="flex items-baseline mb-6">
              <p className="text-4xl font-bold text-orange-600">{formatCurrency(product.price)}</p>
              {hasDiscount && (
                <div className="ml-4">
                  <p className="text-xl text-gray-400 line-through">{formatCurrency(product.oldPrice!)}</p>
                  <p className="text-sm font-semibold text-red-600">ประหยัด {discountPercentage}%</p>
                </div>
              )}
            </div>

            <p className="text-gray-700 mb-6">{product.description}</p>
            
            <div className="flex items-center mb-6">
              <label htmlFor="quantity" className="mr-4 font-semibold">จำนวน:</label>
              <div className="flex items-center border rounded-md">
                <button onClick={() => setQuantity(q => Math.max(1, q - 1))} className="px-3 py-2 text-gray-600 hover:bg-gray-100"><Minus size={16}/></button>
                <input 
                  type="number" 
                  id="quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                  className="w-16 text-center border-l border-r focus:outline-none bg-white" 
                  min="1"
                />
                <button onClick={() => setQuantity(q => q + 1)} className="px-3 py-2 text-gray-600 hover:bg-gray-100"><Plus size={16}/></button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4 items-center">
              <button 
                onClick={handleAddToCart} 
                disabled={product.availability === 'outOfStock'}
                className="flex-grow sm:flex-grow-0 flex items-center justify-center bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                <ShoppingCart className="mr-2"/>
                {addToCartButtonText()}
              </button>
              <button 
                onClick={handleCompareClick} 
                className={`flex-grow sm:flex-grow-0 flex items-center justify-center font-bold py-3 px-8 rounded-lg transition-colors ${isComparing ? 'bg-orange-100 text-orange-700 border border-orange-200' : 'bg-gray-200 text-gray-800 hover:bg-gray-300'}`}>
                <GitCompare className="mr-2"/>
                {isComparing ? 'นำออกจากการเปรียบเทียบ' : 'เพิ่มเพื่อเปรียบเทียบ'}
              </button>
            </div>

            <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">
              {renderAvailabilityStatus()}
              <div className="flex items-center"><ShieldCheck className="w-5 h-5 text-blue-500 mr-2"/><span>รับประกันสินค้าของแท้ 100%</span></div>
              <div className="flex items-center"><Truck className="w-5 h-5 text-purple-500 mr-2"/><span>จัดส่งทั่วประเทศ</span></div>
            </div>
          </div>
        </div>

        {/* Specs and Related Products */}
        <div className="mt-16">
          <div className="border-b mb-8">
            <h2 className="text-2xl font-bold text-gray-900 pb-2 border-b-2 border-orange-500 inline-block">ข้อมูลจำเพาะ</h2>
          </div>
          <div className="bg-gray-50 p-6 rounded-lg">
             <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
               {product.specs && Object.keys(product.specs).length > 0 ? Object.entries(product.specs).map(([key, value]) => (
                 <li key={key} className="flex border-b pb-2">
                   <span className="font-semibold text-gray-800 w-1/3 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                   <span className="text-gray-600 w-2/3">{value}</span>
                 </li>
               )) : <p>ไม่มีข้อมูลจำเพาะ</p>}
             </ul>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">สินค้าที่เกี่ยวข้อง</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard key={p.id} product={p} onNavigate={onNavigate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductPage;