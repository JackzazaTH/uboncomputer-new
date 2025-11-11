import React, { useState, ReactNode, useEffect } from 'react';
import { 
  Product, Category, Article, ComputerSetGroup, HeroSlide, SeoData, HomepageContent, 
  AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, JobApplication, 
  HeaderMenuData, User, LogEntry, UserRole, ComputerSetPageContent, LogLevel, SeoEditablePage,
  ComputerSetProduct, HeroSlide as HeroSlideType, HeaderMenuData as MenuDataType, JobOpening, ProductCategory
} from '../types';
import { 
  LayoutDashboard, ShoppingCart, Users, Newspaper, Tag, Briefcase, Settings, 
  Home, LogOut, Edit, Trash2, PlusCircle, Save, X, ChevronDown, ChevronUp, AlertTriangle,
  Shield, Package, Computer, Image, LayoutGrid, Menu, Globe, FileText, Pencil, Eye
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

const Accordion: React.FC<{ title: string; children: React.ReactNode, startsOpen?: boolean }> = ({ title, children, startsOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startsOpen);
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && <div className="p-4 md:p-6 space-y-6">{children}</div>}
        </div>
    );
};


// --- Management Components ---

const OrderManagement: React.FC<{ orders: AdminOrder[]; onSave: (order: AdminOrder) => void; onDelete: (orderId: number) => void; }> = ({ orders, onSave, onDelete }) => {
    const handleStatusChange = (order: AdminOrder, status: AdminOrder['status']) => {
        onSave({ ...order, status });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการรายการสั่งซื้อ ({orders.length})</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left">Order #</th>
                            <th className="p-3 text-left">ลูกค้า</th>
                            <th className="p-3 text-left">วันที่</th>
                            <th className="p-3 text-right">ยอดรวม</th>
                            <th className="p-3 text-center">สถานะ</th>
                            <th className="p-3 text-center">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {orders.map(order => (
                            <tr key={order.id}>
                                <td className="p-3 font-mono">{order.orderNumber}</td>
                                <td className="p-3">{order.customer.name}</td>
                                <td className="p-3">{new Date(order.date).toLocaleDateString('th-TH')}</td>
                                <td className="p-3 text-right font-mono">{new Intl.NumberFormat('th-TH').format(order.grandTotal)}</td>
                                <td className="p-3 text-center">
                                    <select value={order.status} onChange={e => handleStatusChange(order, e.target.value as AdminOrder['status'])} className="rounded-md border-gray-300 text-sm">
                                        <option>Pending</option>
                                        <option>Processing</option>
                                        <option>Shipped</option>
                                        <option>Completed</option>
                                        <option>Cancelled</option>
                                    </select>
                                </td>
                                <td className="p-3 text-center">
                                    <button onClick={() => onDelete(order.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const ArticleManagement: React.FC<{ articles: Article[]; onSave: (a: Article) => void; onDelete: (id: number) => void; }> = ({ articles, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    const handleEdit = (article: Article) => { setEditingArticle(article); setIsModalOpen(true); };
    const handleAdd = () => { setEditingArticle(null); setIsModalOpen(true); };
    const handleSave = (article: Article) => { onSave(article); setIsModalOpen(false); };

    const ArticleForm: React.FC<{ article: Article | null, onSave: (a: Article) => void, onClose: () => void }> = ({ article, onSave, onClose }) => {
        const emptyArticle = {
            date: new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' }),
            title: '',
            excerpt: '',
            imageUrl: '',
            content: '',
        };
        const [formState, setFormState] = useState<Omit<Article, 'id' | 'link'>>(emptyArticle);

        useEffect(() => {
            if (article) {
                const { id, link, ...rest } = article;
                setFormState(rest);
            } else {
                setFormState(emptyArticle);
            }
        }, [article]);

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setFormState({ ...formState, [e.target.name]: e.target.value });
        };
        const handleSaveClick = () => {
            onSave({ ...formState, id: article?.id || 0, link: article?.link || '#' });
        };

        return <Modal title={article ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'} onClose={onClose} size="2xl">
            <FormWrapper onSave={handleSaveClick} onCancel={onClose}>
                <FormInput label="หัวข้อ" name="title" value={formState.title} onChange={handleChange} />
                <FormInput label="URL รูปภาพ" name="imageUrl" value={formState.imageUrl} onChange={handleChange} />
                <FormInput label="เนื้อหาย่อ" name="excerpt" value={formState.excerpt} onChange={handleChange} as="textarea" />
                <FormInput label="เนื้อหาเต็ม" name="content" value={formState.content} onChange={handleChange} as="textarea" />
            </FormWrapper>
        </Modal>;
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการบทความ ({articles.length})</h2>
                <button onClick={handleAdd} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"><PlusCircle className="mr-2" />เพิ่มบทความใหม่</button>
            </div>
            {isModalOpen && <ArticleForm article={editingArticle} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}
            <div className="space-y-3">
                {articles.map(article => (
                    <div key={article.id} className="bg-white p-3 rounded-md shadow-sm border flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <img src={article.imageUrl} alt={article.title} className="w-16 h-16 object-cover rounded"/>
                            <div>
                                <p className="font-semibold">{article.title}</p>
                                <p className="text-sm text-gray-500">{article.date}</p>
                            </div>
                         </div>
                         <div className="flex items-center gap-2">
                             <button onClick={() => handleEdit(article)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Pencil size={18} /></button>
                             <button onClick={() => onDelete(article.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const ComputerSetManagement: React.FC<{ groups: ComputerSetGroup[], onSave: (g: ComputerSetGroup) => void, onDelete: (id: number) => void }> = ({ groups, onSave, onDelete }) => {
    // This is a simplified version. A full implementation would require complex forms for specs.
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการคอมเซ็ต</h2>
            <div className="space-y-4">
                {groups.map(group => (
                    <Accordion key={group.id} title={`Group Banner: ${group.id}`}>
                        <img src={group.bannerUrl} alt={`Banner ${group.id}`} className="w-full h-auto rounded-md mb-4 max-h-48 object-cover"/>
                        <p className="font-semibold">Products ({group.products.length})</p>
                        <ul className="list-disc pl-5">
                            {group.products.map(p => <li key={p.id}>{p.name} - {new Intl.NumberFormat('th-TH').format(p.price)} บาท</li>)}
                        </ul>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

const HeroBannerManagement: React.FC<{ slides: HeroSlideType[], onSave: (s: HeroSlideType) => void, onDelete: (id: number) => void }> = ({ slides, onSave, onDelete }) => {
    // Simplified, full form would be in a modal
    return (
         <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการ Hero Banner</h2>
             <div className="space-y-3">
                {slides.map(slide => (
                    <div key={slide.id} className="bg-white p-3 rounded-md shadow-sm border flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <img src={slide.image} alt={slide.titleLine1} className="w-24 h-16 object-cover rounded"/>
                            <p className="font-semibold">{slide.titleLine1} / {slide.titleLine2}</p>
                         </div>
                         <div className="flex items-center gap-2">
                             <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Pencil size={18} /></button>
                             <button onClick={() => onDelete(slide.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                         </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const CategoryPageManagement: React.FC<{ data: AllCategoryPageData, onSave: (d: AllCategoryPageData) => void }> = ({ data, onSave }) => {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);
    
    const handleChange = (cat: ProductCategory, value: string) => {
        setLocalData(prev => ({ ...prev, [cat]: { ...prev[cat], bannerUrl: value } }));
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการหน้าหมวดหมู่</h2>
            <Accordion title="Banners">
                {Object.keys(localData).map(cat => (
                    <FormInput key={cat} label={`Banner URL for ${cat}`} name={cat} value={localData[cat as ProductCategory].bannerUrl} onChange={e => handleChange(cat as ProductCategory, e.target.value)} />
                ))}
            </Accordion>
             <div className="mt-6"><button onClick={() => onSave(localData)} className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><Save className="mr-2" /> บันทึก</button></div>
        </div>
    );
};

const DiscountCodeManagement: React.FC<{ codes: DiscountCode[], onSave: (c: DiscountCode) => void, onDelete: (id: number) => void }> = ({ codes, onSave, onDelete }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการโค้ดส่วนลด</h2>
            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead><tr><th className="p-3 text-left">Code</th><th className="p-3 text-left">Type</th><th className="p-3 text-right">Value</th><th className="p-3 text-center">Active</th><th className="p-3 text-center">Actions</th></tr></thead>
                    <tbody>
                        {codes.map(code => <tr key={code.id}><td className="p-3 font-mono">{code.code}</td><td>{code.type}</td><td className="text-right">{code.value}</td><td className="text-center">{code.isActive ? 'Yes' : 'No'}</td><td className="p-3 text-center"><button onClick={() => onDelete(code.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button></td></tr>)}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const MenuManagement: React.FC<{ data: MenuDataType, onSave: (d: MenuDataType) => void }> = ({ data, onSave }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการเมนู</h2>
            <div className="space-y-4">
                {data.map(group => (
                    <Accordion key={group.id} title={group.title}>
                        <ul className="list-disc pl-5">
                            {group.links.map(link => <li key={link.id}>{link.name} (Icon: {link.icon}, Page: {link.page})</li>)}
                        </ul>
                    </Accordion>
                ))}
            </div>
        </div>
    );
};

const CareersManagement: React.FC<{ content: CareersPageContent, applications: JobApplication[], onSave: (c: CareersPageContent) => void, onDeleteApp: (id: number) => void }> = ({ content, applications, onSave, onDeleteApp }) => {
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการหน้าสมัครงาน</h2>
            <Accordion title="ตำแหน่งงานที่เปิดรับ" startsOpen>
                {content.openings.jobs.map(job => (
                    <div key={job.id} className="p-3 border rounded-md">
                        <p className="font-semibold">{job.title} - {job.isActive ? 'Active' : 'Inactive'}</p>
                        <p className="text-sm">{job.location}</p>
                    </div>
                ))}
            </Accordion>
            <Accordion title={`ใบสมัครที่ส่งเข้ามา (${applications.length})`}>
                 {applications.map(app => (
                    <div key={app.id} className="p-3 border rounded-md flex justify-between items-center">
                        <div>
                            <p className="font-semibold">{app.fullName} for {app.jobTitle}</p>
                            <p className="text-sm text-gray-500">{app.email} / {app.phone}</p>
                        </div>
                        <button onClick={() => onDeleteApp(app.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                    </div>
                ))}
            </Accordion>
        </div>
    );
};

const SeoManagement: React.FC<{ data: SeoData, onSave: (d: SeoData) => void }> = ({ data, onSave }) => {
    const [localData, setLocalData] = useState(data);

    useEffect(() => {
        setLocalData(data);
    }, [data]);
    
    const handleChange = (page: SeoEditablePage, field: 'title' | 'description', value: string) => {
        setLocalData(prev => ({ ...prev, [page]: { ...prev[page], [field]: value } }));
    };
    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการ SEO</h2>
            <div className="space-y-4">
            {Object.keys(localData).map(pageKey => (
                <Accordion key={pageKey} title={`Page: ${pageKey}`}>
                    <FormInput label="Title" name={`${pageKey}-title`} value={localData[pageKey as SeoEditablePage].title} onChange={(e) => handleChange(pageKey as SeoEditablePage, 'title', e.target.value)} />
                    <FormInput label="Description" name={`${pageKey}-description`} value={localData[pageKey as SeoEditablePage].description} onChange={(e) => handleChange(pageKey as SeoEditablePage, 'description', e.target.value)} as="textarea" />
                </Accordion>
            ))}
            </div>
            <div className="mt-6"><button onClick={() => onSave(localData)} className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><Save className="mr-2" /> บันทึก SEO</button></div>
        </div>
    );
};

// --- END Management Components ---


const LogViewer: React.FC<{ logs: LogEntry[]; onClearLogs: () => void }> = ({ logs, onClearLogs }) => {
    const [levelFilter, setLevelFilter] = useState<LogLevel | 'ALL'>('ALL');
    
    const levelColors: Record<LogLevel, string> = {
        INFO: 'bg-blue-100 text-blue-800',
        SUCCESS: 'bg-green-100 text-green-800',
        WARN: 'bg-yellow-100 text-yellow-800',
        ERROR: 'bg-red-100 text-red-800',
    };

    const filteredLogs = logs.filter(log => levelFilter === 'ALL' || log.level === levelFilter);

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Log Viewer</h2>
                <div className="flex items-center gap-4">
                    <select 
                        value={levelFilter} 
                        onChange={e => setLevelFilter(e.target.value as LogLevel | 'ALL')}
                        className="rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500 bg-white text-gray-800"
                    >
                        <option value="ALL">All Levels</option>
                        <option value="INFO">INFO</option>
                        <option value="SUCCESS">SUCCESS</option>
                        <option value="WARN">WARN</option>
                        <option value="ERROR">ERROR</option>
                    </select>
                    <button onClick={onClearLogs} className="bg-red-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-600">Clear Logs</button>
                </div>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="max-h-[70vh] overflow-y-auto">
                    {filteredLogs.map(log => (
                        <div key={log.id} className="p-3 border-b text-sm font-mono flex items-start gap-4">
                           <span className={`px-2 py-0.5 rounded text-xs font-semibold ${levelColors[log.level]}`}>{log.level}</span>
                           <span className="text-gray-500">{new Date(log.timestamp).toLocaleString('th-TH')}</span>
                           <span className="text-gray-800 flex-grow">{log.message}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

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
        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">สินค้า</th>
                <th className="p-3 text-left text-sm font-semibold text-gray-600">หมวดหมู่</th>
                <th className="p-3 text-right text-sm font-semibold text-gray-600">ราคา</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-600">สต็อก</th>
                <th className="p-3 text-center text-sm font-semibold text-gray-600">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {products.map(product => (
                <tr key={product.id}>
                  <td className="p-3 flex items-center gap-3">
                    <img src={product.imageUrls[0]} alt={product.name} className="w-12 h-12 object-contain rounded" />
                    <span className="font-semibold">{product.name}</span>
                  </td>
                  <td className="p-3 text-sm text-gray-600">{product.category}</td>
                  <td className="p-3 text-right font-mono">{new Intl.NumberFormat('th-TH').format(product.price)}</td>
                  <td className="p-3 text-center font-mono">{product.stock}</td>
                  <td className="p-3">
                    <div className="flex items-center justify-center gap-2">
                      <button onClick={() => handleEdit(product)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Edit size={18} /></button>
                      <button onClick={() => onDelete(product.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
              <button className="p-2 text-indigo-600 hover:bg-indigo-100 rounded" title="แก้ไข (ยังไม่พร้อมใช้งาน)"><Edit size={18} /></button>
              <button onClick={() => onDelete(user.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const SystemSettings: React.FC<{ onResetAllData: () => void; }> = ({ onResetAllData }) => (
    <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">การตั้งค่าระบบ</h2>
        <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-r-lg" role="alert">
            <p className="font-bold flex items-center"><AlertTriangle className="mr-2"/>โซนอันตราย</p>
            <p>การกระทำในส่วนนี้ไม่สามารถย้อนกลับได้ โปรดดำเนินการด้วยความระมัดระวัง</p>
        </div>
        <div className="mt-6">
            <button 
                onClick={onResetAllData}
                className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"
            >
                รีเซ็ตข้อมูลทั้งหมด
            </button>
        </div>
    </div>
);


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
  const [activeView, setActiveView] = useState('homepage');

   const menuItems = [
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: <Home size={20} /> },
    { id: 'products', label: 'จัดการสินค้า', icon: <Package size={20} /> },
    { id: 'orders', label: 'รายการสั่งซื้อ', icon: <ShoppingCart size={20} /> },
    { id: 'computerSets', label: 'จัดการคอมเซ็ต', icon: <Computer size={20} /> },
    { id: 'articles', label: 'จัดการบทความ', icon: <Newspaper size={20} /> },
    { id: 'heroBanners', label: 'จัดการ Hero Banner', icon: <Image size={20} /> },
    { id: 'categoryPages', label: 'จัดการหน้าหมวดหมู่', icon: <LayoutGrid size={20} /> },
    { id: 'discounts', label: 'จัดการโค้ดส่วนลด', icon: <Tag size={20} /> },
    { id: 'menus', label: 'จัดการเมนู', icon: <Menu size={20} /> },
    { id: 'careers', label: 'จัดการหน้าสมัครงาน', icon: <Briefcase size={20} /> },
    { id: 'seo', label: 'จัดการ SEO', icon: <Globe size={20} /> },
    { id: 'users', label: 'จัดการผู้ใช้', icon: <Users size={20} /> },
    { id: 'logs', label: 'Log Viewer', icon: <FileText size={20} /> },
    { id: 'system', label: 'การตั้งค่าระบบ', icon: <Settings size={20} /> },
  ];

  const renderView = () => {
    switch (activeView) {
      case 'homepage':
        return <HomepageManagement 
                  content={props.homepageContent} 
                  onSave={props.onSaveHomepageContent}
                  computerSetPageContent={props.computerSetPageContent}
                  onSaveComputerSetPageContent={props.onSaveComputerSetPageContent}
                />;
      case 'products':
        return <ProductManagement products={props.products} categories={props.categories} onSave={props.onSaveProduct} onDelete={props.onDeleteProduct} />;
      case 'orders':
        return <OrderManagement orders={props.adminOrders} onSave={props.onSaveAdminOrder} onDelete={props.onDeleteAdminOrder} />;
      case 'computerSets':
        return <ComputerSetManagement groups={props.computerSetGroups} onSave={props.onSaveComputerSetGroup} onDelete={props.onDeleteComputerSetGroup} />;
      case 'articles':
        return <ArticleManagement articles={props.articles} onSave={props.onSaveArticle} onDelete={props.onDeleteArticle} />;
      case 'heroBanners':
        return <HeroBannerManagement slides={props.heroSlides} onSave={props.onSaveHeroSlide} onDelete={props.onDeleteHeroSlide} />;
      case 'categoryPages':
        return <CategoryPageManagement data={props.categoryPageData} onSave={props.onSaveCategoryPageData} />;
      case 'discounts':
        return <DiscountCodeManagement codes={props.discountCodes} onSave={props.onSaveDiscountCode} onDelete={props.onDeleteDiscountCode} />;
      case 'menus':
        return <MenuManagement data={props.headerMenuData} onSave={props.onSaveHeaderMenuData} />;
      case 'careers':
        return <CareersManagement content={props.careersPageContent} applications={props.jobApplications} onSave={props.onSaveCareersPageContent} onDeleteApp={props.onDeleteJobApplication} />;
      case 'seo':
        return <SeoManagement data={props.seoData} onSave={props.onSaveSeoData} />;
      case 'users':
        return <UserManagement users={props.users} onSave={props.onSaveUser} onDelete={props.onDeleteUser} />;
      case 'logs':
        return <LogViewer logs={props.logs} onClearLogs={props.onClearLogs} />;
      case 'system':
        return <SystemSettings onResetAllData={props.onResetAllData} />;
      default:
        return <div>Select a view</div>;
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100 font-sans">
      <aside className="w-64 bg-gray-800 text-white flex flex-col flex-shrink-0">
        <div className="h-20 flex items-center justify-center text-xl font-bold border-b border-gray-700">
          <Shield size={24} className="mr-2 text-orange-400"/>
          ADMIN PANEL
        </div>
        <nav className="flex-grow p-2 space-y-1">
          {menuItems.map(tab => (
            <button 
              key={tab.id} 
              onClick={() => setActiveView(tab.id)} 
              className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                activeView === tab.id 
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
        {renderView()}
      </main>
    </div>
  );
};