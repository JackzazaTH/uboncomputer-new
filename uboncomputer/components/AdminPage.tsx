


import React, { useState, ReactNode } from 'react';
import { 
  Product, Category, Article, ComputerSetGroup, HeroSlide, SeoData, HomepageContent, 
  AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, JobApplication, 
  HeaderMenuData, User, LogEntry, UserRole, ComputerSetPageContent
} from '../types';
import { 
  LayoutDashboard, ShoppingCart, Users, Newspaper, Tag, Briefcase, Settings, 
  Home, LogOut, Edit, Trash2, PlusCircle, Save, X, ChevronDown, ChevronUp, AlertTriangle,
// FIX: Import 'Shield' icon from 'lucide-react' to resolve 'Cannot find name 'Shield'' error.
  Shield
} from 'lucide-react';

import HomepageManagement from './HomepageManagement';
import ProductForm from './ProductForm';

// Helper components that are also exported for use in other admin-related components like HomepageManagement
// Modal component
export const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' }> = ({ title, onClose, children, size = 'lg' }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in">
            <div 
                className={`bg-white rounded-lg shadow-xl w-full max-w-${size} max-h-[90vh] flex flex-col animate-slide-in-up`}
                onClick={e => e.stopPropagation()}
                >
                <div className="flex-shrink-0 flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1 rounded-full text-gray-500 hover:bg-gray-200 transition-colors">
                      <X size={20} />
                    </button>
                </div>
                <div className="flex-grow p-6 overflow-y-auto">{children}</div>
            </div>
        </div>
    );
};

// FormWrapper component for Modal footers
export const FormWrapper: React.FC<{ onSave: () => void; onCancel: () => void; children: React.ReactNode }> = ({ onSave, onCancel, children }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
            <div className="space-y-4">{children}</div>
            <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">
                  ยกเลิก
                </button>
                <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                  บันทึก
                </button>
            </div>
        </form>
    );
};

// FormInput component
interface FormInputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    type?: string;
    as?: 'input' | 'textarea' | 'select';
    required?: boolean;
    children?: React.ReactNode; // For select options
}

export const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, type = 'text', as = 'input', required = true, children }) => {
    const commonProps = {
        name,
        id: name,
        value,
        onChange,
        required,
        className: "mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900 disabled:bg-gray-100",
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}{required && '*'}</label>
            {as === 'textarea' ? (
                <textarea {...commonProps} rows={4} />
            ) : as === 'select' ? (
                <select {...commonProps}>{children}</select>
            ) : (
                <input type={type} {...commonProps} />
            )}
        </div>
    );
};

// Management sub-components
const ProductManagement: React.FC<{ 
  products: Product[]; 
  categories: Category[]; 
  onSave: (p: Product) => void; 
  onDelete: (id: number) => void;
}> = ({ products, categories, onSave, onDelete }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsFormOpen(true);
    };

    const handleAddNew = () => {
        setEditingProduct(null);
        setIsFormOpen(true);
    };

    const handleSave = (product: Product) => {
        onSave(product);
        setIsFormOpen(false);
    };
    
    return (
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">จัดการสินค้า ({products.length})</h2>
          <button onClick={handleAddNew} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"><PlusCircle className="mr-2" />เพิ่มสินค้าใหม่</button>
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          {products.map(product => (
            <div key={product.id} className="flex items-center p-3 border-b last:border-b-0">
              <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-contain rounded mr-4" />
              <div className="flex-grow">
                <p className="font-semibold">{product.name}</p>
                <p className="text-sm text-gray-500">{product.category} | {new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(product.price)}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => handleEdit(product)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Edit /></button>
                <button onClick={() => onDelete(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 /></button>
              </div>
            </div>
          ))}
        </div>
        {isFormOpen && (
          <ProductForm 
            isOpen={isFormOpen}
            onClose={() => setIsFormOpen(false)}
            onSave={handleSave}
            product={editingProduct}
            categories={categories}
          />
        )}
      </div>
    );
};

const UserManagement: React.FC<{
  users: User[];
  onSave: (user: User) => void;
  onDelete: (userId: number) => void;
}> = ({ users, onSave, onDelete }) => {
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">จัดการผู้ใช้ ({users.length})</h2>
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {users.map(user => (
          <div key={user.id} className="flex items-center justify-between p-3 border-b last:border-b-0">
            <div>
              <p className="font-semibold">{user.name} <span className="text-xs font-normal bg-gray-200 text-gray-700 px-2 py-0.5 rounded-full">{user.role}</span></p>
              <p className="text-sm text-gray-500">{user.email}</p>
            </div>
            <div className="flex items-center gap-2">
              <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Edit /></button>
              <button onClick={() => onDelete(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};


// Props for the main AdminPage component
interface AdminPageProps {
  products: Product[];
  categories: Category[];
  articles: Article[];
  computerSetGroups: ComputerSetGroup[];
  heroSlides: HeroSlide[];
  seoData: SeoData;
  homepageContent: HomepageContent;
  categoryPageData: AllCategoryPageData;
  computerSetPageContent: ComputerSetPageContent;
  discountCodes: DiscountCode[];
  adminOrders: AdminOrder[];
  careersPageContent: CareersPageContent;
  jobApplications: JobApplication[];
  headerMenuData: HeaderMenuData;
  users: User[];
  logs: LogEntry[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (articleId: number) => void;
  onSaveHeroSlide: (slide: HeroSlide) => void;
  onDeleteHeroSlide: (slideId: number) => void;
  onSaveComputerSetGroup: (group: ComputerSetGroup) => void;
  onDeleteComputerSetGroup: (groupId: number) => void;
  onSaveSeoData: (data: SeoData) => void;
  onSaveHomepageContent: (content: HomepageContent) => void;
  onSaveCategoryPageData: (data: AllCategoryPageData) => void;
  onSaveComputerSetPageContent: (content: ComputerSetPageContent) => void;
  onSaveDiscountCode: (code: DiscountCode) => void;
  onDeleteDiscountCode: (codeId: number) => void;
  onSaveAdminOrder: (order: AdminOrder) => void;
  onDeleteAdminOrder: (orderId: number) => void;
  onSaveCareersPageContent: (content: CareersPageContent) => void;
  onDeleteJobApplication: (applicationId: number) => void;
  onSaveHeaderMenuData: (data: HeaderMenuData) => void;
  onSaveUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onClearLogs: () => void;
  onResetAllData: () => void;
  onLogout: () => void;
}

// Main AdminPage component
export const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState('homepage');

  const tabs = [
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: <Home size={20} /> },
    { id: 'products', label: 'จัดการสินค้า', icon: <ShoppingCart size={20} /> },
    { id: 'users', label: 'จัดการผู้ใช้', icon: <Users size={20} /> },
    { id: 'system', label: 'ระบบ', icon: <Settings size={20} /> },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'homepage':
        return <HomepageManagement 
                  content={props.homepageContent} 
                  onSave={props.onSaveHomepageContent} 
                  computerSetPageContent={props.computerSetPageContent}
                  onSaveComputerSetPageContent={props.onSaveComputerSetPageContent}
                />;
      case 'products':
        return <ProductManagement products={props.products} categories={props.categories} onSave={props.onSaveProduct} onDelete={props.onDeleteProduct} />;
      case 'users':
        return <UserManagement users={props.users} onSave={props.onSaveUser} onDelete={props.onDeleteUser} />;
      case 'system':
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">การตั้งค่าระบบ</h2>
            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
                <p className="font-bold flex items-center"><AlertTriangle className="mr-2"/>โซนอันตราย</p>
                <p>การกระทำในส่วนนี้ไม่สามารถย้อนกลับได้ โปรดดำเนินการด้วยความระมัดระวัง</p>
            </div>
            <div className="mt-6">
                <button 
                    onClick={props.onResetAllData}
                    className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
                >
                    รีเซ็ตข้อมูลทั้งหมด
                </button>
            </div>
          </div>
        );
      default:
        return <div>Select a tab</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-gray-700">
          <Shield size={24} className="mr-2 text-orange-400"/>
          ADMIN
        </div>
        <nav className="flex-grow p-2">
          {tabs.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveTab(tab.id)} 
              className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id 
                  ? 'bg-orange-600 text-white' 
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              }`}
            >
              {tab.icon}
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
        <div className="p-2 border-t border-gray-700">
            <button onClick={props.onLogout} className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
                <LogOut size={20} />
                <span>ออกจากระบบ</span>
            </button>
        </div>
      </aside>
      <main className="flex-1 overflow-y-auto">
        {renderContent()}
      </main>
    </div>
  );
};
