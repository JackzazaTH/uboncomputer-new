import React, { useState, useEffect } from 'react';
import { Product, Category, ProductAvailability } from '../types';
import ImageUpload from './ImageUpload'; // Import the new component

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
  categories: Category[];
}

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  category: '',
  price: 0,
  oldPrice: 0,
  costPrice: 0,
  stock: 0,
  availability: 'inStock',
  imageUrl: '',
  rating: 0,
  reviewCount: 0,
  brand: '',
};

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id'>>(emptyProduct);

  useEffect(() => {
    if (product) {
      setFormData(product);
    } else {
      setFormData(emptyProduct);
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const isNumeric = ['price', 'costPrice', 'stock', 'oldPrice'].includes(name);

    setFormData(prev => {
      const newState = { 
        ...prev, 
        [name]: isNumeric ? parseFloat(value) || 0 : value 
      };

      if (name === 'availability' && value === 'outOfStock') {
        newState.stock = 0;
      }

      return newState;
    });
  };
  
  const handleImageChange = (base64: string) => {
    setFormData(prev => ({ ...prev, imageUrl: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productToSave = { ...formData, id: product?.id || 0 };
    onSave(productToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-slide-in-up">
        <form onSubmit={handleSubmit} className="p-8">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
          </h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อสินค้า</label>
              <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label htmlFor="category" className="block text-sm font-medium text-gray-700">หมวดหมู่</label>
                    <select name="category" id="category" value={formData.category} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900">
                        <option value="">เลือกหมวดหมู่</option>
                        {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                    </select>
                </div>
                 <div>
                    <label htmlFor="brand" className="block text-sm font-medium text-gray-700">แบรนด์</label>
                    <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div>
                    <label htmlFor="oldPrice" className="block text-sm font-medium text-gray-700">ราคาเดิม (ก่อนลด)</label>
                    <input type="number" name="oldPrice" id="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                </div>
                <div>
                    <label htmlFor="price" className="block text-sm font-medium text-gray-700">ราคาขายปัจจุบัน</label>
                    <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                </div>
                 <div>
                    <label htmlFor="costPrice" className="block text-sm font-medium text-gray-700">ราคาต้นทุน</label>
                    <input type="number" name="costPrice" id="costPrice" value={formData.costPrice} onChange={handleChange} required className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                </div>
                <div>
                    <label htmlFor="availability" className="block text-sm font-medium text-gray-700">สถานะสินค้า</label>
                    <select name="availability" id="availability" value={formData.availability} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900">
                        <option value="inStock">มีสินค้า (In Stock)</option>
                        <option value="outOfStock">สินค้าหมด (Out of Stock)</option>
                        <option value="preOrder">พรีออเดอร์ (Pre-Order)</option>
                        <option value="byOrder">สั่งจอง (By-Order)</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="stock" className="block text-sm font-medium text-gray-700">จำนวนสต็อก</label>
                    <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required 
                        disabled={formData.availability === 'outOfStock'}
                        className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 disabled:bg-gray-100" 
                    />
                </div>
            </div>
            
            <ImageUpload 
              label="รูปภาพสินค้า"
              currentImage={formData.imageUrl}
              onImageChange={handleImageChange}
            />

          </div>

          <div className="mt-8 flex justify-end space-x-4">
            <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors">
              ยกเลิก
            </button>
            <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors">
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;