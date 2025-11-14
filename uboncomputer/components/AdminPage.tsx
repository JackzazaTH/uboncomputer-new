import React, { useState, ReactNode, useEffect, useMemo } from 'react';
import { 
  Product, Category, Article, ComputerSetGroup, HeroSlide, SeoData, HomepageContent, 
  AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, JobApplication, 
  HeaderMenuData, User, LogEntry, UserRole, ComputerSetPageContent, LogLevel, SeoEditablePage,
  ComputerSetProduct, HeroSlide as HeroSlideType, HeaderMenuData as MenuDataType, JobOpening, ProductCategory, AdminOrderStatus,
  CategoryGroup, CategoryLink, LucideIconName, Page, CareersFeatureCard
} from '../types';
import { 
  LayoutDashboard, ShoppingCart, Users, Newspaper, Tag, Briefcase, Settings, 
  Home, LogOut, Edit, Trash2, PlusCircle, Save, X, ChevronDown, ChevronUp, AlertTriangle,
  Shield, Package, Computer, Image, LayoutGrid, Menu, Globe, FileText, Pencil, Eye, Search,
  Wrench, Monitor, Printer, Laptop, Cpu, CircuitBoard, Cog, MemoryStick, HardDrive, Power, Box, Fan, Gamepad2, Router, FileCode, Server
} from 'lucide-react';

import HomepageManagement from './HomepageManagement';
import ProductForm from './ProductForm';
// FIX: Import 'useToast' hook to resolve 'Cannot find name 'useToast'' error.
import { useToast } from '../hooks/useToast';
import ImageUpload from './ImageUpload';

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
    placeholder?: string;
}

export const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, type = 'text', as = 'input', required = true, children, placeholder }) => {
    const commonProps = {
        name,
        id: name,
        value,
        onChange,
        required,
        placeholder,
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

const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

const statusColors: Record<AdminOrderStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    Processing: 'bg-blue-100 text-blue-800 border-blue-200',
    Shipped: 'bg-purple-100 text-purple-800 border-purple-200',
    Completed: 'bg-green-100 text-green-800 border-green-200',
    Cancelled: 'bg-red-100 text-red-800 border-red-200',
};


const OrderDetailsModal: React.FC<{ order: AdminOrder, onClose: () => void, onSave: (order: AdminOrder) => void }> = ({ order, onClose, onSave }) => {
    const [editedOrder, setEditedOrder] = useState<AdminOrder>(order);
    const { addToast } = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setEditedOrder(prev => ({ ...prev, [name]: value }));
    };

    const handleSave = () => {
        onSave(editedOrder);
        addToast(`อัปเดตคำสั่งซื้อ #${order.orderNumber} เรียบร้อยแล้ว`, 'success');
        onClose();
    };

    return (
        <Modal title={`รายละเอียดคำสั่งซื้อ #${order.orderNumber}`} onClose={onClose} size="3xl">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">ข้อมูลลูกค้า</h4>
                        <div className="text-sm space-y-1 bg-gray-50 p-4 rounded-md border">
                            <p><strong>ชื่อ:</strong> {order.customer.name}</p>
                            <p><strong>อีเมล:</strong> {order.customer.email}</p>
                            <p><strong>โทรศัพท์:</strong> {order.customer.phone}</p>
                            <p><strong>ที่อยู่:</strong> {`${order.customer.address}, ${order.customer.district}, ${order.customer.province} ${order.customer.zipcode}`}</p>
                        </div>
                    </div>
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">รายการสินค้า</h4>
                        <div className="space-y-3">
                            {order.items.map(item => (
                                <div key={item.id} className="flex items-center gap-4 p-2 border-b">
                                    <img src={item.imageUrls[0]} alt={item.name} className="w-12 h-12 object-contain rounded border flex-shrink-0" />
                                    <div className="flex-grow">
                                        <p className="text-sm font-semibold">{item.name}</p>
                                        <p className="text-xs text-gray-500">จำนวน: {item.quantity}</p>
                                    </div>
                                    <p className="text-sm font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="md:col-span-1 space-y-6">
                    <div>
                        <h4 className="font-bold text-gray-800 mb-2">สรุปยอด</h4>
                        <div className="text-sm space-y-2 bg-gray-50 p-4 rounded-md border">
                            <div className="flex justify-between"><span>ราคารวม</span> <span>{formatCurrency(order.total)}</span></div>
                            <div className="flex justify-between"><span>ค่าจัดส่ง</span> <span>{formatCurrency(order.shipping)}</span></div>
                            <div className="flex justify-between text-red-600"><span>ส่วนลด</span> <span>- {formatCurrency(order.discount)}</span></div>
                            <div className="flex justify-between font-bold text-base border-t pt-2 mt-2"><span>ยอดสุทธิ</span> <span>{formatCurrency(order.grandTotal)}</span></div>
                        </div>
                    </div>
                     <div>
                        <h4 className="font-bold text-gray-800 mb-2">แก้ไขข้อมูล</h4>
                        <div className="space-y-4">
                           <FormInput label="สถานะ" name="status" value={editedOrder.status} onChange={handleChange} as="select">
                               <option>Pending</option><option>Processing</option><option>Shipped</option><option>Completed</option><option>Cancelled</option>
                           </FormInput>
                           <FormInput label="บริษัทขนส่ง" name="carrier" value={editedOrder.carrier || ''} onChange={handleChange} required={false} />
                           <FormInput label="หมายเลขพัสดุ" name="trackingNumber" value={editedOrder.trackingNumber || ''} onChange={handleChange} required={false} />
                        </div>
                    </div>
                </div>
            </div>
             <div className="mt-8 flex justify-end space-x-4">
                <button type="button" onClick={onClose} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">ยกเลิก</button>
                <button type="button" onClick={handleSave} className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">บันทึก</button>
            </div>
        </Modal>
    );
};


// --- Management Components ---

const OrderManagement: React.FC<{ orders: AdminOrder[]; onSave: (order: AdminOrder) => void; onDelete: (orderId: number) => void; }> = ({ orders, onSave, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [editingOrder, setEditingOrder] = useState<AdminOrder | null>(null);

    const filteredOrders = useMemo(() => {
        return orders
            .filter(order =>
                order.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                order.customer.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }, [orders, searchTerm]);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6">จัดการรายการสั่งซื้อ ({filteredOrders.length})</h2>
            
            <div className="mb-4 relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400"/></div>
                <input
                    type="search"
                    placeholder="ค้นหาด้วย Order #, ชื่อลูกค้า, หรืออีเมล..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border rounded-lg bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
            </div>

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Order #</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">ลูกค้า</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">วันที่</th>
                            <th className="p-3 text-right text-sm font-semibold text-gray-600">ยอดรวม</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-600">สถานะ</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-600">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {filteredOrders.map(order => (
                            <tr key={order.id} className="hover:bg-gray-50">
                                <td className="p-3 font-mono text-sm">{order.orderNumber}</td>
                                <td className="p-3 text-sm">{order.customer.name}</td>
                                <td className="p-3 text-sm">{new Date(order.date).toLocaleDateString('th-TH')}</td>
                                <td className="p-3 text-right font-mono text-sm">{formatCurrency(order.grandTotal)}</td>
                                <td className="p-3 text-center">
                                    <span className={`text-xs font-bold px-3 py-1.5 rounded-full ${statusColors[order.status]}`}>
                                        {order.status}
                                    </span>
                                </td>
                                <td className="p-3 text-center">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => setEditingOrder(order)} className="p-2 text-gray-500 hover:bg-gray-200 rounded-full" title="ดูรายละเอียด/แก้ไข">
                                            <Eye size={18} />
                                        </button>
                                        <button onClick={() => onDelete(order.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="ลบรายการ">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {editingOrder && (
                <OrderDetailsModal 
                    order={editingOrder} 
                    onClose={() => setEditingOrder(null)} 
                    onSave={onSave} 
                />
            )}
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
            imageUrls: [],
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
        
        const handleImageChange = (images: string[]) => {
            setFormState(prev => ({ ...prev, imageUrls: images }));
        };

        const handleSaveClick = () => {
            onSave({ ...formState, id: article?.id || 0, link: article?.link || '#' });
        };

        return <Modal title={article ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'} onClose={onClose} size="2xl">
            <FormWrapper onSave={handleSaveClick} onCancel={onClose}>
                <FormInput label="หัวข้อ" name="title" value={formState.title} onChange={handleChange} />
                <ImageUpload
                    label="รูปภาพประกอบบทความ (สูงสุด 20 รูป, รูปแรกคือรูปปก)"
                    currentImages={formState.imageUrls}
                    onImagesChange={handleImageChange}
                    maxImages={20}
                />
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
                            <img src={article.imageUrls?.[0]} alt={article.title} className="w-16 h-16 object-cover rounded"/>
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

const ComputerSetGroupForm: React.FC<{
  group: ComputerSetGroup | null;
  onSave: (group: ComputerSetGroup) => void;
  onClose: () => void;
}> = ({ group, onSave, onClose }) => {
    const emptyGroup: ComputerSetGroup = {
        id: group ? group.id : Date.now(),
        bannerUrl: '',
        products: [],
    };
    const [formData, setFormData] = useState<ComputerSetGroup>(group ? JSON.parse(JSON.stringify(group)) : emptyGroup);

    const handleBannerChange = (images: string[]) => {
        setFormData(prev => ({ ...prev, bannerUrl: images[0] || '' }));
    };

    const handleProductChange = (index: number, field: keyof Omit<ComputerSetProduct, 'id' | 'specs' | 'imageUrls'>, value: any) => {
        const newProducts = [...formData.products];
        const productToUpdate = { ...newProducts[index] };
        // @ts-ignore
        productToUpdate[field] = value;
        newProducts[index] = productToUpdate;
        setFormData(prev => ({ ...prev, products: newProducts }));
    };
    
    const handleProductSpecChange = (index: number, specKey: keyof ComputerSetProduct['specs'], value: string) => {
        const newProducts = [...formData.products];
        const updatedSpecs = { ...newProducts[index].specs, [specKey]: value };
        newProducts[index] = { ...newProducts[index], specs: updatedSpecs };
        setFormData(prev => ({ ...prev, products: newProducts }));
    };

    const handleProductImagesChange = (index: number, images: string[]) => {
        const newProducts = [...formData.products];
        newProducts[index].imageUrls = images;
        setFormData(prev => ({ ...prev, products: newProducts }));
    }

    const addProduct = () => {
        const newProduct: ComputerSetProduct = {
            id: Date.now(),
            name: '',
            specs: { cpu: '', vga: '', ram: '', storage: '', motherboard: '', psu: '', case: '', cooling: '', notes: '' },
            price: 0,
            imageUrls: [],
        };
        setFormData(prev => ({ ...prev, products: [...prev.products, newProduct] }));
    };

    const removeProduct = (productIndex: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้ออกจากกลุ่ม?')) {
            setFormData(prev => ({ ...prev, products: prev.products.filter((_, i) => i !== productIndex) }));
        }
    };
    
    const handleSubmit = () => {
        onSave(formData);
    };

    return (
        <Modal title={group ? `แก้ไขกลุ่มคอมเซ็ต #${group.id}` : 'เพิ่มกลุ่มคอมเซ็ตใหม่'} onClose={onClose} size="5xl">
            <FormWrapper onSave={handleSubmit} onCancel={onClose}>
                <div className="space-y-6">
                    <div>
                        <h3 className="text-lg font-medium text-gray-800 mb-2">แบนเนอร์กลุ่ม</h3>
                        <ImageUpload
                            label="ภาพแบนเนอร์"
                            currentImages={formData.bannerUrl ? [formData.bannerUrl] : []}
                            onImagesChange={handleBannerChange}
                            maxImages={1}
                        />
                    </div>
                    
                    <div className="border-t pt-4">
                        <h3 className="text-lg font-medium text-gray-800 mb-4">สินค้าในกลุ่มนี้</h3>
                        <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2">
                            {formData.products.map((product, index) => (
                                <div key={index} className="p-4 border rounded-lg bg-gray-50/50 relative">
                                    <button type="button" onClick={() => removeProduct(index)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><Trash2 size={16}/></button>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="md:col-span-1 space-y-4">
                                            <FormInput label="ชื่อสินค้า" name="name" value={product.name} onChange={e => handleProductChange(index, 'name', e.target.value)} />
                                            <div className="grid grid-cols-2 gap-2">
                                                <FormInput label="ราคา" name="price" type="number" value={product.price} onChange={e => handleProductChange(index, 'price', parseFloat(e.target.value) || 0)} />
                                                <FormInput label="ราคาเดิม" name="oldPrice" type="number" value={product.oldPrice || ''} onChange={e => handleProductChange(index, 'oldPrice', parseFloat(e.target.value) || 0)} required={false} />
                                            </div>
                                            <FormInput label="ป้ายกำกับ (Badge)" name="badge" as="select" value={product.badge || ''} onChange={e => handleProductChange(index, 'badge', e.target.value as 'NEW' | 'HOT')} required={false}>
                                                <option value="">None</option>
                                                <option value="NEW">NEW</option>
                                                <option value="HOT">HOT</option>
                                            </FormInput>
                                             <ImageUpload label="รูปสินค้า" currentImages={product.imageUrls} onImagesChange={images => handleProductImagesChange(index, images)} maxImages={1} />
                                        </div>
                                        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {Object.keys(product.specs).map(specKey => (
                                                <FormInput
                                                    key={specKey}
                                                    label={`Spec: ${specKey}`}
                                                    name={specKey}
                                                    value={product.specs[specKey as keyof typeof product.specs] || ''}
                                                    onChange={e => handleProductSpecChange(index, specKey as keyof typeof product.specs, e.target.value)}
                                                    as={specKey === 'notes' ? 'textarea' : 'input'}
                                                    required={specKey !== 'notes'}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button type="button" onClick={addProduct} className="mt-4 flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มสินค้า</button>
                    </div>
                </div>
            </FormWrapper>
        </Modal>
    );
};

const ComputerSetManagement: React.FC<{ groups: ComputerSetGroup[], onSave: (g: ComputerSetGroup) => void, onDelete: (id: number) => void }> = ({ groups, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingGroup, setEditingGroup] = useState<ComputerSetGroup | null>(null);
    const { addToast } = useToast();

    const handleEdit = (group: ComputerSetGroup) => {
        setEditingGroup(group);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingGroup(null);
        setIsModalOpen(true);
    };

    const handleDelete = (groupId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกลุ่มคอมเซ็ตนี้ทั้งหมด? การกระทำนี้ไม่สามารถย้อนกลับได้')) {
            onDelete(groupId);
            addToast('ลบกลุ่มคอมเซ็ตเรียบร้อยแล้ว', 'success');
        }
    };

    const handleSave = (groupToSave: ComputerSetGroup) => {
        onSave(groupToSave);
        setIsModalOpen(false);
        setEditingGroup(null);
        addToast('บันทึกกลุ่มคอมเซ็ตเรียบร้อยแล้ว', 'success');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการคอมเซ็ต ({groups.length})</h2>
                <button onClick={handleAdd} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                    <PlusCircle className="mr-2" />เพิ่มกลุ่มใหม่
                </button>
            </div>

            {isModalOpen && (
                <ComputerSetGroupForm
                    group={editingGroup}
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <div className="space-y-4">
                {groups.map(group => (
                    <div key={group.id} className="bg-white rounded-lg shadow-sm border border-gray-200">
                         <div className="p-4 bg-gray-50 flex justify-between items-center">
                            <h3 className="text-lg font-bold text-gray-800">Group Banner: {group.id}</h3>
                             <div className="flex items-center gap-2">
                                <button onClick={() => handleEdit(group)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full" title="Edit Group">
                                    <Pencil size={18} />
                                </button>
                                <button onClick={() => handleDelete(group.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Delete Group">
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        </div>
                        <div className="p-4 md:p-6 space-y-4">
                            <img src={group.bannerUrl} alt={`Banner ${group.id}`} className="w-full h-auto rounded-md mb-4 max-h-40 object-cover border"/>
                            <h4 className="font-semibold">Products ({group.products.length})</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {group.products.map(p => (
                                    <div key={p.id} className="flex items-start gap-3 p-3 border rounded-md bg-gray-50/50">
                                        <img src={p.imageUrls[0]} alt={p.name} className="w-16 h-16 object-contain rounded flex-shrink-0" />
                                        <div>
                                            <p className="font-semibold text-sm">{p.name}</p>
                                            <p className="text-xs text-gray-600">{p.specs.cpu} / {p.specs.vga}</p>
                                            <p className="font-bold text-sm text-orange-600 mt-1">{formatCurrency(p.price)}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const HeroSlideForm: React.FC<{
  slide: HeroSlideType | null;
  onSave: (slide: HeroSlideType) => void;
  onClose: () => void;
}> = ({ slide, onSave, onClose }) => {
  const emptySlide: Omit<HeroSlideType, 'id'> = {
    titleLine1: '',
    titleLine2: '',
    titleLine3: '',
    image: '',
    cta: '',
  };
  const [formState, setFormState] = useState<Omit<HeroSlideType, 'id'>>(
    slide ? { titleLine1: slide.titleLine1, titleLine2: slide.titleLine2, titleLine3: slide.titleLine3, image: slide.image, cta: slide.cta } : emptySlide
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };
  
  const handleImageChange = (images: string[]) => {
      setFormState(prev => ({ ...prev, image: images[0] || '' }));
  };

  const handleSaveClick = () => {
    onSave({ ...formState, id: slide?.id || 0 });
  };

  return (
    <Modal title={slide ? 'แก้ไข Hero Banner' : 'เพิ่ม Hero Banner ใหม่'} onClose={onClose} size="2xl">
      <FormWrapper onSave={handleSaveClick} onCancel={onClose}>
        <ImageUpload
            label="รูปภาพ Banner"
            currentImages={formState.image ? [formState.image] : []}
            onImagesChange={handleImageChange}
            maxImages={1}
        />
        <FormInput label="Title Line 1" name="titleLine1" value={formState.titleLine1} onChange={handleChange} />
        <FormInput label="Title Line 2" name="titleLine2" value={formState.titleLine2} onChange={handleChange} />
        <FormInput label="Title Line 3" name="titleLine3" value={formState.titleLine3} onChange={handleChange} />
        <FormInput label="Call to Action Text (CTA)" name="cta" value={formState.cta} onChange={handleChange} />
      </FormWrapper>
    </Modal>
  );
};


const HeroBannerManagement: React.FC<{ slides: HeroSlideType[], onSave: (s: HeroSlideType) => void, onDelete: (id: number) => void }> = ({ slides, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlideType | null>(null);
    const { addToast } = useToast();

    const handleEdit = (slide: HeroSlideType) => {
        setEditingSlide(slide);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingSlide(null);
        setIsModalOpen(true);
    };

    const handleDelete = (slideId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบแบนเนอร์นี้?')) {
            onDelete(slideId);
            addToast('ลบแบนเนอร์เรียบร้อยแล้ว', 'success');
        }
    };

    const handleSave = (slideToSave: HeroSlideType) => {
        onSave(slideToSave);
        setIsModalOpen(false);
        setEditingSlide(null);
        addToast('บันทึกแบนเนอร์เรียบร้อยแล้ว', 'success');
    };

    return (
         <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการ Hero Banner ({slides.length})</h2>
                <button onClick={handleAdd} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                    <PlusCircle className="mr-2" />เพิ่ม Banner ใหม่
                </button>
            </div>

            {isModalOpen && (
                <HeroSlideForm 
                    slide={editingSlide} 
                    onSave={handleSave}
                    onClose={() => setIsModalOpen(false)} 
                />
            )}

             <div className="space-y-3">
                {slides.map(slide => (
                    <div key={slide.id} className="bg-white p-3 rounded-md shadow-sm border flex items-center justify-between">
                         <div className="flex items-center gap-4">
                            <img src={slide.image} alt={slide.titleLine1} className="w-24 h-16 object-cover rounded"/>
                            <p className="font-semibold">{slide.titleLine1} / {slide.titleLine2}</p>
                         </div>
                         <div className="flex items-center gap-2">
                             <button onClick={() => handleEdit(slide)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Pencil size={18} /></button>
                             <button onClick={() => handleDelete(slide.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
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
            <Accordion title="Banners" startsOpen={true}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {Object.keys(localData).map(cat => (
                        <div key={cat} className="p-4 border rounded-lg bg-gray-50/50">
                            <ImageUpload 
                                label={`Banner for ${cat}`} 
                                currentImages={localData[cat as ProductCategory].bannerUrl ? [localData[cat as ProductCategory].bannerUrl] : []} 
                                onImagesChange={imgs => handleChange(cat as ProductCategory, imgs[0] || '')}
                                maxImages={1}
                            />
                        </div>
                    ))}
                </div>
            </Accordion>
             <div className="mt-6"><button onClick={() => onSave(localData)} className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><Save className="mr-2" /> บันทึก</button></div>
        </div>
    );
};

const DiscountCodeForm: React.FC<{ code: DiscountCode | null, onSave: (c: DiscountCode) => void, onClose: () => void }> = ({ code, onSave, onClose }) => {
    const emptyCode = { code: '', type: 'percentage' as 'percentage' | 'fixed', value: 0, isActive: true };
    const [formState, setFormState] = useState<Omit<DiscountCode, 'id'>>(code ? { code: code.code, type: code.type, value: code.value, isActive: code.isActive } : emptyCode);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        if (name === 'isActive') {
            setFormState({ ...formState, isActive: value === 'true' });
        } else {
            setFormState({ ...formState, [name]: name === 'value' ? parseFloat(value) || 0 : value });
        }
    };

    const handleSaveClick = () => {
        onSave({ ...formState, id: code?.id || 0 });
    };

    return (
        <Modal title={code ? 'แก้ไขโค้ดส่วนลด' : 'เพิ่มโค้ดส่วนลดใหม่'} onClose={onClose}>
            <FormWrapper onSave={handleSaveClick} onCancel={onClose}>
                <FormInput label="โค้ด" name="code" value={formState.code} onChange={handleChange} />
                <FormInput label="ประเภท" name="type" as="select" value={formState.type} onChange={handleChange}>
                    <option value="percentage">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (THB)</option>
                </FormInput>
                <FormInput label="มูลค่า" name="value" type="number" value={formState.value} onChange={handleChange} />
                <FormInput label="สถานะ" name="isActive" as="select" value={formState.isActive.toString()} onChange={handleChange}>
                    <option value="true">Active (ใช้งานได้)</option>
                    <option value="false">Inactive (ไม่ใช้งาน)</option>
                </FormInput>
            </FormWrapper>
        </Modal>
    );
};


const DiscountCodeManagement: React.FC<{ codes: DiscountCode[], onSave: (c: DiscountCode) => void, onDelete: (id: number) => void }> = ({ codes, onSave, onDelete }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);
    const { addToast } = useToast();

    const handleEdit = (code: DiscountCode) => {
        setEditingCode(code);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingCode(null);
        setIsModalOpen(true);
    };

    const handleDelete = (codeId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโค้ดส่วนลดนี้?')) {
            onDelete(codeId);
            addToast('ลบโค้ดส่วนลดแล้ว', 'success');
        }
    };
    
    const handleSave = (codeToSave: DiscountCode) => {
        onSave(codeToSave);
        setIsModalOpen(false);
        setEditingCode(null);
        addToast('บันทึกโค้ดส่วนลดเรียบร้อยแล้ว', 'success');
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการโค้ดส่วนลด</h2>
                <button onClick={handleAdd} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">
                    <PlusCircle className="mr-2" />เพิ่มโค้ดใหม่
                </button>
            </div>

            {isModalOpen && <DiscountCodeForm code={editingCode} onSave={handleSave} onClose={() => setIsModalOpen(false)} />}

            <div className="bg-white rounded-lg shadow overflow-x-auto">
                <table className="min-w-full">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Code</th>
                            <th className="p-3 text-left text-sm font-semibold text-gray-600">Type</th>
                            <th className="p-3 text-right text-sm font-semibold text-gray-600">Value</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-600">Active</th>
                            <th className="p-3 text-center text-sm font-semibold text-gray-600">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {codes.map(code => (
                            <tr key={code.id}>
                                <td className="p-3 font-mono">{code.code}</td>
                                <td className="p-3">{code.type}</td>
                                <td className="p-3 text-right font-mono">{code.type === 'percentage' ? `${code.value}%` : formatCurrency(code.value)}</td>
                                <td className="p-3 text-center">
                                    {code.isActive ? (
                                        <span className="px-3 py-1 text-xs font-semibold leading-5 rounded-full bg-green-100 text-green-800">
                                            ใช้งานได้
                                        </span>
                                    ) : (
                                        <span className="px-3 py-1 text-xs font-semibold leading-5 rounded-full bg-red-100 text-red-800">
                                            ไม่ใช้งาน
                                        </span>
                                    )}
                                </td>
                                <td className="p-3">
                                    <div className="flex justify-center items-center gap-2">
                                        <button onClick={() => handleEdit(code)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full" title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        <button onClick={() => handleDelete(code.id)} className="p-2 text-red-600 hover:bg-red-100 rounded-full" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const iconMap: Record<LucideIconName, React.FC<any>> = {
  Wrench, Computer, Monitor, Printer, Laptop, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Box, Fan, Gamepad2, Router, FileCode, Server
};

const MenuManagement: React.FC<{ data: MenuDataType, onSave: (d: MenuDataType) => void, seoData: SeoData, categoryPageData: AllCategoryPageData }> = ({ data, onSave, seoData, categoryPageData }) => {
    const [localData, setLocalData] = useState<MenuDataType>(data);
    const { addToast } = useToast();
    const [modalState, setModalState] = useState<{
        type: 'group' | 'link' | null;
        data: CategoryGroup | CategoryLink | null;
        groupId?: number;
    }>({ type: null, data: null });

    const LUCIDE_ICON_NAMES: LucideIconName[] = ['Wrench', 'Computer', 'Monitor', 'Printer', 'Laptop', 'Cpu', 'CircuitBoard', 'Cog', 'MemoryStick', 'HardDrive', 'Power', 'Box', 'Fan', 'Gamepad2', 'Router', 'FileCode', 'Server'];
    const PAGE_NAMES: Page[] = [...new Set([...Object.keys(seoData), ...Object.keys(categoryPageData)])] as Page[];

    const handleSave = () => {
        onSave(localData);
        addToast('บันทึกการเปลี่ยนแปลงเมนูเรียบร้อยแล้ว', 'success');
    };

    const handleAddGroup = () => setModalState({ type: 'group', data: null });
    const handleEditGroup = (group: CategoryGroup) => setModalState({ type: 'group', data: group });
    const handleDeleteGroup = (groupId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบกลุ่มเมนูนี้?')) {
            setLocalData(prev => prev.filter(g => g.id !== groupId));
        }
    };
    const handleSaveGroup = (group: CategoryGroup) => {
        setLocalData(prev => {
            const exists = prev.some(g => g.id === group.id);
            if (exists) {
                return prev.map(g => g.id === group.id ? group : g);
            }
            return [...prev, { ...group, id: Date.now() }];
        });
        setModalState({ type: null, data: null });
    };

    const handleAddLink = (groupId: number) => setModalState({ type: 'link', data: null, groupId });
    const handleEditLink = (link: CategoryLink, groupId: number) => setModalState({ type: 'link', data: link, groupId });
    const handleDeleteLink = (groupId: number, linkId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบลิงก์นี้?')) {
            setLocalData(prev => prev.map(g => {
                if (g.id === groupId) {
                    return { ...g, links: g.links.filter(l => l.id !== linkId) };
                }
                return g;
            }));
        }
    };
    const handleSaveLink = (link: CategoryLink, groupId?: number) => {
        if (!groupId) return;
        setLocalData(prev => prev.map(g => {
            if (g.id === groupId) {
                const exists = g.links.some(l => l.id === link.id);
                const newLinks = exists
                    ? g.links.map(l => l.id === link.id ? link : l)
                    : [...g.links, { ...link, id: Date.now() }];
                return { ...g, links: newLinks };
            }
            return g;
        }));
        setModalState({ type: null, data: null });
    };

    const GroupForm = () => {
        const [title, setTitle] = useState((modalState.data as CategoryGroup)?.title || '');
        return (
            <Modal title={modalState.data ? 'แก้ไขกลุ่มเมนู' : 'เพิ่มกลุ่มเมนูใหม่'} onClose={() => setModalState({ type: null, data: null })}>
                <FormWrapper onSave={() => handleSaveGroup({ ...(modalState.data as CategoryGroup), title, id: (modalState.data as CategoryGroup)?.id || Date.now(), links: (modalState.data as CategoryGroup)?.links || [] })} onCancel={() => setModalState({ type: null, data: null })}>
                    <FormInput label="ชื่อกลุ่ม" name="title" value={title} onChange={e => setTitle(e.target.value)} />
                </FormWrapper>
            </Modal>
        );
    };

    const LinkForm = () => {
        const [link, setLink] = useState<Omit<CategoryLink, 'id'>>({
            name: (modalState.data as CategoryLink)?.name || '',
            icon: (modalState.data as CategoryLink)?.icon || 'Wrench',
            page: (modalState.data as CategoryLink)?.page || 'home',
        });

        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setLink({ ...link, [e.target.name]: e.target.value });
        };
        
        return (
            <Modal title={modalState.data ? 'แก้ไขลิงก์เมนู' : 'เพิ่มลิงก์เมนูใหม่'} onClose={() => setModalState({ type: null, data: null })}>
                <FormWrapper onSave={() => handleSaveLink({ ...link, id: (modalState.data as CategoryLink)?.id || Date.now() }, modalState.groupId)} onCancel={() => setModalState({ type: null, data: null })}>
                    <FormInput label="ชื่อลิงก์" name="name" value={link.name} onChange={handleChange} />
                    <FormInput label="ไอคอน" name="icon" as="select" value={link.icon} onChange={handleChange}>
                        {LUCIDE_ICON_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                    </FormInput>
                    <FormInput label="หน้าเพจ (Page)" name="page" as="select" value={link.page} onChange={handleChange}>
                        {PAGE_NAMES.map(name => <option key={name} value={name}>{name}</option>)}
                    </FormInput>
                </FormWrapper>
            </Modal>
        );
    };

    return (
        <div className="p-6">
            {(modalState.type === 'group') && <GroupForm />}
            {(modalState.type === 'link') && <LinkForm />}
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการเมนู</h2>
                <button onClick={handleAddGroup} className="flex items-center bg-blue-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-600">
                    <PlusCircle className="mr-2" />เพิ่มกลุ่มใหม่
                </button>
            </div>
            <div className="space-y-4">
                {localData.map(group => (
                    <Accordion key={group.id} title={group.title}>
                        <div className="flex items-center gap-2 mb-4">
                            <button onClick={() => handleEditGroup(group)} className="text-sm font-semibold text-indigo-600">แก้ไขกลุ่ม</button>
                            <span className="text-gray-300">|</span>
                            <button onClick={() => handleDeleteGroup(group.id)} className="text-sm font-semibold text-red-600">ลบกลุ่ม</button>
                        </div>
                        <div className="space-y-2">
                            {group.links.map(link => {
                                const Icon = iconMap[link.icon] || Box;
                                return (
                                <div key={link.id} className="flex items-center justify-between p-2 bg-gray-50 rounded-md border">
                                    <div className="flex items-center gap-3">
                                        <Icon className="w-5 h-5 text-gray-500" />
                                        <span className="font-medium">{link.name}</span>
                                        <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded">{link.page}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => handleEditLink(link, group.id)} className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded"><Pencil size={16} /></button>
                                        <button onClick={() => handleDeleteLink(group.id, link.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16} /></button>
                                    </div>
                                </div>
                                )
                            })}
                        </div>
                         <button onClick={() => handleAddLink(group.id)} className="mt-4 flex items-center bg-green-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-green-600"><PlusCircle size={16} className="mr-2"/>เพิ่มลิงก์ใหม่</button>
                    </Accordion>
                ))}
            </div>
             <div className="mt-6"><button onClick={handleSave} className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><Save className="mr-2" /> บันทึกเมนู</button></div>
        </div>
    );
};

const CareersManagement: React.FC<{ content: CareersPageContent, applications: JobApplication[], onSave: (c: CareersPageContent) => void, onDeleteApp: (id: number) => void }> = ({ content, applications, onSave, onDeleteApp }) => {
    const [localContent, setLocalContent] = useState<CareersPageContent>(content);
    const [isJobModalOpen, setIsJobModalOpen] = useState(false);
    const [editingJob, setEditingJob] = useState<JobOpening | null>(null);
    const [isAppModalOpen, setIsAppModalOpen] = useState(false);
    const [viewingApplication, setViewingApplication] = useState<JobApplication | null>(null);
    const { addToast } = useToast();

    useEffect(() => { setLocalContent(content); }, [content]);

    const handleContentChange = (section: 'hero' | 'whyUs' | 'cta', field: string, value: string) => {
        setLocalContent(prev => ({...prev, [section]: { ...prev[section], [field]: value } }));
    };

    const handleFeatureChange = (index: number, field: keyof Omit<CareersFeatureCard, 'id'>, value: string) => {
        const newFeatures = [...localContent.whyUs.features];
        // @ts-ignore
        newFeatures[index][field] = value;
        setLocalContent(prev => ({ ...prev, whyUs: { ...prev.whyUs, features: newFeatures } }));
    };

    const handleSaveMainContent = () => { onSave(localContent); addToast('บันทึกเนื้อหาหลักแล้ว', 'success'); };

    const handleOpenJobModal = (job: JobOpening | null) => { setEditingJob(job); setIsJobModalOpen(true); };

    const handleSaveJob = (jobToSave: JobOpening) => {
        const newJobs = editingJob
            ? localContent.openings.jobs.map(j => j.id === jobToSave.id ? jobToSave : j)
            : [...localContent.openings.jobs, { ...jobToSave, id: Date.now() }];
        onSave({ ...localContent, openings: { ...localContent.openings, jobs: newJobs } });
        addToast('บันทึกตำแหน่งงานแล้ว', 'success');
        setIsJobModalOpen(false);
    };

    const handleDeleteJob = (jobId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบตำแหน่งงานนี้?')) {
            const newJobs = localContent.openings.jobs.filter(j => j.id !== jobId);
            onSave({ ...localContent, openings: { ...localContent.openings, jobs: newJobs } });
            addToast('ลบตำแหน่งงานแล้ว', 'success');
        }
    };

    const JobFormModal = () => {
        const emptyJob: Omit<JobOpening, 'id'> = { title: '', location: '', type: 'Full-time', description: '', salary: '', isActive: true };
        const [formState, setFormState] = useState(editingJob ? { ...editingJob } : emptyJob);
        const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
            const { name, value, type } = e.target;
            const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
            setFormState(prev => ({ ...prev, [name]: name === 'isActive' ? (val === 'true' || val === true) : val }));
        };
        return <Modal title={editingJob ? 'แก้ไขตำแหน่งงาน' : 'เพิ่มตำแหน่งงานใหม่'} onClose={() => setIsJobModalOpen(false)} size="2xl">
            <FormWrapper onSave={() => handleSaveJob({ ...formState, id: editingJob?.id || 0 })} onCancel={() => setIsJobModalOpen(false)}>
                <FormInput label="ชื่อตำแหน่ง" name="title" value={formState.title} onChange={handleChange} />
                <FormInput label="สถานที่" name="location" value={formState.location} onChange={handleChange} />
                <FormInput label="ประเภทงาน" name="type" as="select" value={formState.type} onChange={handleChange}>
                    <option value="Full-time">Full-time</option>
                    <option value="Part-time">Part-time</option>
                </FormInput>
                <FormInput label="เงินเดือน (ไม่จำเป็น)" name="salary" value={formState.salary || ''} onChange={handleChange} required={false} />
                <FormInput label="รายละเอียดงาน" name="description" as="textarea" value={formState.description} onChange={handleChange} />
                <FormInput label="สถานะ" name="isActive" as="select" value={String(formState.isActive)} onChange={handleChange}>
                    <option value="true">Active</option>
                    <option value="false">Inactive</option>
                </FormInput>
            </FormWrapper>
        </Modal>;
    };

    const ApplicationViewModal = () => (
        <Modal title={`ใบสมัครสำหรับ: ${viewingApplication?.jobTitle}`} onClose={() => setIsAppModalOpen(false)} size="2xl">
            {viewingApplication && <div className="space-y-3 text-sm">
                <p><strong>ผู้สมัคร:</strong> {viewingApplication.fullName}</p>
                <p><strong>อีเมล:</strong> {viewingApplication.email}</p>
                <p><strong>โทรศัพท์:</strong> {viewingApplication.phone}</p>
                <p><strong>วันที่สมัคร:</strong> {new Date(viewingApplication.submissionDate).toLocaleString('th-TH')}</p>
                <p><strong>ไฟล์ Resume:</strong> {viewingApplication.resumeFileName || 'ไม่ได้แนบ'}</p>
                <div className="border-t pt-3 mt-3">
                    <p className="font-semibold">จดหมายแนะนำตัว:</p>
                    <p className="mt-1 whitespace-pre-wrap bg-gray-50 p-3 rounded-md">{viewingApplication.coverLetter || 'ไม่มี'}</p>
                </div>
            </div>}
        </Modal>
    );

    return (
        <div className="p-6">
            {isJobModalOpen && <JobFormModal />}
            {isAppModalOpen && <ApplicationViewModal />}
            <h2 className="text-2xl font-bold mb-6">จัดการหน้าสมัครงาน</h2>
            <Accordion title="จัดการเนื้อหาหลัก">
                <div className="space-y-4">
                    <FormInput label="Hero Title" name="title" value={localContent.hero.title} onChange={(e) => handleContentChange('hero', 'title', e.target.value)} />
                    <FormInput label="Hero Subtitle" name="subtitle" value={localContent.hero.subtitle} onChange={(e) => handleContentChange('hero', 'subtitle', e.target.value)} as="textarea" />
                    <FormInput label="Why Us Title" name="title" value={localContent.whyUs.title} onChange={(e) => handleContentChange('whyUs', 'title', e.target.value)} />
                    {localContent.whyUs.features.map((feature, index) => (
                        <div key={feature.id} className="p-3 border rounded-md">
                            <FormInput label={`Feature ${index + 1} Title`} name="title" value={feature.title} onChange={e => handleFeatureChange(index, 'title', e.target.value)} />
                            <FormInput label={`Feature ${index + 1} Description`} name="description" value={feature.description} onChange={e => handleFeatureChange(index, 'description', e.target.value)} as="textarea" />
                        </div>
                    ))}
                    <FormInput label="CTA Title" name="title" value={localContent.cta.title} onChange={(e) => handleContentChange('cta', 'title', e.target.value)} />
                </div>
                <button onClick={handleSaveMainContent} className="mt-4 flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700"><Save className="mr-2"/> บันทึกเนื้อหา</button>
            </Accordion>
            <Accordion title="ตำแหน่งงานที่เปิดรับ" startsOpen>
                <button onClick={() => handleOpenJobModal(null)} className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 mb-4"><PlusCircle className="mr-2" />เพิ่มตำแหน่งงานใหม่</button>
                <div className="space-y-3">
                    {content.openings.jobs.map(job => (
                        <div key={job.id} className="p-3 border rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{job.title} - <span className={`text-xs px-2 py-0.5 rounded-full ${job.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-200 text-gray-700'}`}>{job.isActive ? 'Active' : 'Inactive'}</span></p>
                                <p className="text-sm text-gray-500">{job.location}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => handleOpenJobModal(job)} className="p-2 text-indigo-600 hover:bg-indigo-100 rounded"><Pencil size={18} /></button>
                                <button onClick={() => handleDeleteJob(job.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            </Accordion>
            <Accordion title={`ใบสมัครที่ส่งเข้ามา (${applications.length})`}>
                <div className="space-y-3">
                    {applications.map(app => (
                        <div key={app.id} className="p-3 border rounded-md flex justify-between items-center">
                            <div>
                                <p className="font-semibold">{app.fullName} for {app.jobTitle}</p>
                                <p className="text-sm text-gray-500">{app.email} / {app.phone}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <button onClick={() => { setViewingApplication(app); setIsAppModalOpen(true); }} className="p-2 text-blue-600 hover:bg-blue-100 rounded"><Eye size={18} /></button>
                                <button onClick={() => onDeleteApp(app.id)} className="p-2 text-red-600 hover:bg-red-100 rounded"><Trash2 size={18} /></button>
                            </div>
                        </div>
                    ))}
                </div>
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

const UserFormModal: React.FC<{
  user: User | null;
  onSave: (user: Partial<User>) => void;
  onClose: () => void;
  addToast: (message: string, type: 'success' | 'error' | 'info') => void;
}> = ({ user, onSave, onClose, addToast }) => {
    const isNewUser = !user;
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        role: user?.role || 'user' as UserRole,
        password: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveClick = () => {
        if (!formData.name || !formData.email) {
            addToast('กรุณากรอกชื่อและอีเมล', 'error');
            return;
        }
        if (isNewUser && !formData.password) {
            addToast('รหัสผ่านจำเป็นสำหรับผู้ใช้ใหม่', 'error');
            return;
        }

        const userToSave: Partial<User> = {
            id: user?.id,
            ...formData,
        };
        onSave(userToSave);
    };

    return (
        <Modal title={isNewUser ? 'เพิ่มผู้ใช้ใหม่' : 'แก้ไขผู้ใช้'} onClose={onClose}>
            <FormWrapper onSave={handleSaveClick} onCancel={onClose}>
                <FormInput label="ชื่อ" name="name" value={formData.name} onChange={handleChange} />
                <FormInput label="อีเมล" name="email" type="email" value={formData.email} onChange={handleChange} />
                <FormInput label="บทบาท (Role)" name="role" as="select" value={formData.role} onChange={handleChange}>
                    <option value="user">User</option>
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                </FormInput>
                <FormInput
                    label="รหัสผ่านใหม่"
                    name="password"
                    type="password"
                    value={formData.password}
                    onChange={handleChange}
                    required={isNewUser}
                    placeholder={isNewUser ? 'จำเป็นต้องกรอก' : 'ปล่อยว่างไว้เพื่อใช้รหัสเดิม'}
                />
            </FormWrapper>
        </Modal>
    );
};

const UserManagement: React.FC<{
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: number) => void;
  onAdd: () => void;
}> = ({ users, onEdit, onDelete, onAdd }) => {
    const roleColors: Record<UserRole, string> = {
        admin: 'bg-red-100 text-red-800',
        editor: 'bg-yellow-100 text-yellow-800',
        user: 'bg-gray-200 text-gray-800',
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">จัดการผู้ใช้ ({users.length})</h2>
                <button
                    onClick={onAdd}
                    className="flex items-center bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600"
                >
                    <PlusCircle className="mr-2" />
                    เพิ่มผู้ใช้ใหม่
                </button>
            </div>
            <div className="bg-white rounded-lg shadow overflow-hidden">
                {users.map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border-b last:border-b-0">
                        <div>
                            <p className="font-semibold flex items-center gap-2">
                                {user.name}
                                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${roleColors[user.role]}`}>
                                    {user.role}
                                </span>
                            </p>
                            <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onEdit(user)}
                                className="p-2 text-indigo-600 hover:bg-indigo-100 rounded-full"
                                title="แก้ไข"
                            >
                                <Edit size={18} />
                            </button>
                            <button
                                onClick={() => {
                                    if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้ ${user.name}?`)) {
                                        onDelete(user.id);
                                    }
                                }}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-full"
                                title="ลบ"
                            >
                                <Trash2 size={18} />
                            </button>
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
  const [activeView, setActiveView] = useState('orders');
  const [isUserModalOpen, setIsUserModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const { addToast } = useToast();

   const menuItems = [
    { id: 'orders', label: 'รายการสั่งซื้อ', icon: <ShoppingCart size={20} /> },
    { id: 'products', label: 'จัดการสินค้า', icon: <Package size={20} /> },
    { id: 'homepage', label: 'จัดการหน้าแรก', icon: <Home size={20} /> },
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
  
  const handleOpenUserModal = (user: User | null) => {
    setEditingUser(user);
    setIsUserModalOpen(true);
  };

  const handleSaveUserWrapper = (userDataFromForm: Partial<User>) => {
    const isNewUser = !userDataFromForm.id;

    let userToSave: User;
    if (isNewUser) {
        userToSave = {
            id: Date.now(),
            createdAt: new Date().toISOString(),
            name: userDataFromForm.name || '',
            email: userDataFromForm.email || '',
            password: userDataFromForm.password || 'default-password', // Should be handled better
            role: userDataFromForm.role || 'user',
        };
    } else {
        const existingUser = props.users.find(u => u.id === userDataFromForm.id);
        if (!existingUser) return;
        userToSave = {
            ...existingUser,
            name: userDataFromForm.name || existingUser.name,
            email: userDataFromForm.email || existingUser.email,
            role: userDataFromForm.role || existingUser.role,
            password: userDataFromForm.password ? userDataFromForm.password : existingUser.password,
        };
    }
    props.onSaveUser(userToSave);
    addToast(isNewUser ? 'เพิ่มผู้ใช้ใหม่สำเร็จ' : 'อัปเดตข้อมูลผู้ใช้สำเร็จ', 'success');
    setIsUserModalOpen(false);
    setEditingUser(null);
  };

  const handleDeleteUserWrapper = (userId: number) => {
    const user = props.users.find(u => u.id === userId);
    if (user) {
      props.onDeleteUser(userId);
      addToast(`ลบผู้ใช้ ${user.name} สำเร็จ`, 'success');
    }
  }

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
        return <MenuManagement data={props.headerMenuData} onSave={props.onSaveHeaderMenuData} seoData={props.seoData} categoryPageData={props.categoryPageData} />;
      case 'careers':
        return <CareersManagement content={props.careersPageContent} applications={props.jobApplications} onSave={props.onSaveCareersPageContent} onDeleteApp={props.onDeleteJobApplication} />;
      case 'seo':
        return <SeoManagement data={props.seoData} onSave={props.onSaveSeoData} />;
      case 'users':
        return <UserManagement 
                    users={props.users} 
                    onEdit={handleOpenUserModal}
                    onDelete={handleDeleteUserWrapper}
                    onAdd={() => handleOpenUserModal(null)}
               />;
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

      {isUserModalOpen && (
          <UserFormModal 
            user={editingUser}
            onSave={handleSaveUserWrapper}
            onClose={() => setIsUserModalOpen(false)}
            addToast={addToast}
          />
      )}
    </div>
  );
};