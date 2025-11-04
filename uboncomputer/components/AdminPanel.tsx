import React from 'react';
import { Product } from '../types';
import { PlusCircle, Edit, Trash2 } from 'lucide-react';

interface AdminPanelProps {
  products: Product[];
  onAddNew: () => void;
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ products, onAddNew, onEdit, onDelete }) => {
  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">แผงควบคุมผู้ดูแลระบบ</h1>
          <button
            onClick={onAddNew}
            className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            เพิ่มสินค้าใหม่
          </button>
        </div>

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">สินค้า</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ราคา</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">จัดการ</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {products.map((product) => (
                  <tr key={product.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10">
                          <img className="h-10 w-10 rounded-md object-cover" src={product.imageUrl} alt={product.name} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{product.name}</div>
                          <div className="text-sm text-gray-500">{product.category}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(product.price)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button onClick={() => onEdit(product)} className="text-indigo-600 hover:text-indigo-900 mr-4">
                        <Edit className="w-5 h-5" />
                      </button>
                      <button onClick={() => onDelete(product.id)} className="text-red-600 hover:text-red-900">
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
