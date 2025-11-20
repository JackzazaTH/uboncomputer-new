
import React, { useState, useEffect } from 'react';
import { Product, Category, ProductAvailability } from '../types';
import ImageUpload from './ImageUpload'; // Import the new component
import { Trash2 } from 'lucide-react';

interface ProductFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (product: Product) => void;
  product: Product | null;
  categories: Category[];
}

const emptyProduct: Omit<Product, 'id' | 'specs'> = {
  name: '',
  category: '',
  price: 0,
  oldPrice: 0,
  costPrice: 0,
  stock: 0,
  availability: 'inStock',
  imageUrls: [],
  rating: 0,
  reviewCount: 0,
  brand: '',
  notes: '',
  reviews: [],
};

type SpecUI = { key: string; value: string };

const ProductForm: React.FC<ProductFormProps> = ({ isOpen, onClose, onSave, product, categories }) => {
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'specs'>>(emptyProduct);
  const [specs, setSpecs] = useState<SpecUI[]>([]);

  useEffect(() => {
    if (isOpen) {
        if (product) {
            const { specs, ...rest } = product;
            setFormData({ ...emptyProduct, ...rest });
            setSpecs(specs ? Object.entries(specs).map(([key, value]) => ({ key, value })) : []);
        } else {
            setFormData(emptyProduct);
            setSpecs([]);
        }
    }
  }, [product, isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
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
  
  const handleImagesChange = (images: string[]) => {
    setFormData(prev => ({ ...prev, imageUrls: images }));
  };

  const handleSpecChange = (index: number, field: 'key' | 'value', value: string) => {
    const newSpecs = [...specs];
    newSpecs[index][field] = value;
    setSpecs(newSpecs);
  };

  const handleAddSpec = () => {
    setSpecs([...specs, { key: '', value: '' }]);
  };

  const handleRemoveSpec = (index: number) => {
    setSpecs(specs.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const specsObject = specs.reduce((acc, { key, value }) => {
        if (key.trim()) {
            acc[key.trim()] = value;
        }
        return acc;
    }, {} as Record<string, string>);

    const productToSave = { ...formData, id: product?.id || 0, specs: specsObject };
    onSave(productToSave);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in backdrop-blur-sm">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[90vh] overflow-y-auto animate-slide-in-up border border-gray-100">
        <form onSubmit={handleSubmit} className="p-8 md:p-10">
          <div className="flex justify-between items-center mb-8 pb-4 border-b">
             <h2 className="text-3xl font-bold text-gray-900">
               {product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'}
             </h2>
             <button type="button" onClick={onClose} className="text-gray-400 hover:text-gray-600">
               <span className="sr-only">Close</span>
               <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
          </div>
          
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-bold text-gray-700 mb-2">ชื่อสินค้า</label>
                        <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label htmlFor="category" className="block text-sm font-bold text-gray-700 mb-2">หมวดหมู่</label>
                            <select name="category" id="category" value={formData.category} onChange={handleChange} required className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900">
                                <option value="">เลือกหมวดหมู่</option>
                                {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                            </select>
                        </div>
                        <div>
                            <label htmlFor="brand" className="block text-sm font-bold text-gray-700 mb-2">แบรนด์</label>
                            <input type="text" name="brand" id="brand" value={formData.brand} onChange={handleChange} required className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         <div>
                            <label htmlFor="oldPrice" className="block text-sm font-bold text-gray-700 mb-2">ราคาเดิม (บาท)</label>
                            <input type="number" name="oldPrice" id="oldPrice" value={formData.oldPrice || ''} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                        </div>
                        <div>
                            <label htmlFor="price" className="block text-sm font-bold text-gray-700 mb-2">ราคาขาย (บาท) <span className="text-red-500">*</span></label>
                            <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} required className="block w-full border-2 border-orange-200 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 font-semibold" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                         <div>
                            <label htmlFor="costPrice" className="block text-sm font-bold text-gray-700 mb-2">ต้นทุน (บาท)</label>
                            <input type="number" name="costPrice" id="costPrice" value={formData.costPrice} onChange={handleChange} required className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
                        </div>
                        <div>
                            <label htmlFor="availability" className="block text-sm font-bold text-gray-700 mb-2">สถานะ</label>
                            <select name="availability" id="availability" value={formData.availability} onChange={handleChange} className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900">
                                <option value="inStock">มีสินค้า</option>
                                <option value="outOfStock">สินค้าหมด</option>
                                <option value="preOrder">พรีออเดอร์</option>
                                <option value="byOrder">สั่งจอง</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="stock" className="block text-sm font-bold text-gray-700 mb-2">จำนวนสต็อก</label>
                            <input type="number" name="stock" id="stock" value={formData.stock} onChange={handleChange} required 
                                disabled={formData.availability === 'outOfStock'}
                                className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 disabled:bg-gray-100" 
                            />
                        </div>
                    </div>

                    <div>
                        <label htmlFor="notes" className="block text-sm font-bold text-gray-700 mb-2">หมายเหตุ (สำหรับแอดมิน)</label>
                        <textarea
                            name="notes"
                            id="notes"
                            value={formData.notes || ''}
                            onChange={handleChange}
                            rows={3}
                            placeholder="บันทึกช่วยจำภายใน..."
                            className="block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900"
                        />
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                        <ImageUpload 
                          label="รูปภาพสินค้า (รูปแรกจะเป็นปก)"
                          currentImages={formData.imageUrls}
                          onImagesChange={handleImagesChange}
                        />
                    </div>

                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-200">
                      <h3 className="text-lg font-bold text-gray-800 mb-4">คุณสมบัติ (Specifications)</h3>
                      <div className="space-y-3">
                        {specs.map((spec, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <input 
                              type="text" 
                              value={spec.key} 
                              onChange={(e) => handleSpecChange(index, 'key', e.target.value)}
                              placeholder="เช่น Socket"
                              className="w-1/3 border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <input 
                              type="text" 
                              value={spec.value}
                              onChange={(e) => handleSpecChange(index, 'value', e.target.value)}
                              placeholder="เช่น LGA1700"
                              className="flex-1 border-gray-300 rounded-lg shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-orange-500"
                            />
                            <button type="button" onClick={() => handleRemoveSpec(index)} className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors">
                              <Trash2 size={18} />
                            </button>
                          </div>
                        ))}
                      </div>
                      <button type="button" onClick={handleAddSpec} className="mt-4 flex items-center text-sm font-bold text-orange-600 hover:text-orange-700">
                        <span className="text-xl mr-1">+</span> เพิ่มคุณสมบัติ
                      </button>
                    </div>
                </div>
            </div>
          </div>

          <div className="mt-10 flex justify-end space-x-4 pt-6 border-t">
            <button type="button" onClick={onClose} className="bg-white border border-gray-300 text-gray-700 font-bold py-3 px-8 rounded-lg hover:bg-gray-50 transition-colors">
              ยกเลิก
            </button>
            <button type="submit" className="bg-orange-600 text-white font-bold py-3 px-8 rounded-lg hover:bg-orange-700 shadow-md hover:shadow-lg transition-all transform active:scale-95">
              บันทึกข้อมูล
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
