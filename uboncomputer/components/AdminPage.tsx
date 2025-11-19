
import React, { useState, useEffect } from 'react';
import { 
  Product, Category, Article, ComputerSetGroup, HeroSlide, SeoData, HomepageContent, 
  AllCategoryPageData, DiscountCode, AdminOrder, CareersPageContent, JobApplication, 
  HeaderMenuData, User, LogEntry, UserRole, ComputerSetPageContent, LogLevel,
  Brand, DisplayProduct, AdminOrderStatus
} from '../types';
import { 
  LayoutDashboard, ShoppingCart, Users, Newspaper, Tag, Briefcase, Settings, 
  LogOut, Edit, Trash2, PlusCircle, Save, X, ChevronDown, ChevronUp,
  Shield, Package, Image, Search,
  Monitor, FileText, RefreshCw, Truck, CheckCircle, AlertTriangle, List, XCircle, Menu
} from 'lucide-react';

import HomepageManagement from './HomepageManagement';
import ProductForm from './ProductForm';
import { useToast } from '../hooks/useToast';
import ImageUpload from './ImageUpload';

// --- Helper Components ---

export const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' }> = ({ title, onClose, children, size = 'lg' }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center p-4 animate-fade-in backdrop-blur-sm">
            <div 
                className={`bg-white rounded-xl shadow-2xl w-full max-w-${size} max-h-[90vh] flex flex-col animate-slide-in-up border border-gray-100`}
                onClick={e => e.stopPropagation()}
                >
                <div className="flex-shrink-0 flex justify-between items-center p-5 border-b">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-1.5 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors">
                      <X size={20} />
                    </button>
                </div>
                <div className="flex-grow p-6 overflow-y-auto custom-scrollbar">{children}</div>
            </div>
        </div>
    );
};

export const FormWrapper: React.FC<{ onSave: () => void; onCancel: () => void; children: React.ReactNode }> = ({ onSave, onCancel, children }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="flex flex-col h-full">
            <div className="space-y-5 flex-grow">{children}</div>
            <div className="mt-8 flex justify-end space-x-3 pt-4 border-t">
                <button type="button" onClick={onCancel} className="px-5 py-2.5 rounded-lg border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors">
                  ยกเลิก
                </button>
                <button type="submit" className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 shadow-sm transition-colors">
                  บันทึกข้อมูล
                </button>
            </div>
        </form>
    );
};

interface FormInputProps {
    label: string;
    name: string;
    value: string | number;
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
    type?: string;
    as?: 'input' | 'textarea' | 'select';
    required?: boolean;
    children?: React.ReactNode;
    placeholder?: string;
    disabled?: boolean;
}

export const FormInput: React.FC<FormInputProps> = ({ label, name, value, onChange, type = 'text', as = 'input', required = true, children, placeholder, disabled }) => {
    const commonProps = {
        name,
        id: name,
        value,
        onChange,
        required,
        placeholder,
        disabled,
        className: "mt-1 block w-full border border-gray-300 rounded-lg shadow-sm py-2.5 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-100 transition-all",
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-semibold text-gray-700 mb-1">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
            {as === 'textarea' ? (
                <textarea {...commonProps} rows={4} className={`${commonProps.className} resize-none`} />
            ) : as === 'select' ? (
                <select {...commonProps}>{children}</select>
            ) : (
                <input type={type} {...commonProps} />
            )}
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

// --- Order Modal ---

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
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Users className="w-4 h-4 mr-2"/> ข้อมูลลูกค้า</h4>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500">ชื่อ</p>
                                <p className="font-medium">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500">เบอร์โทร</p>
                                <p className="font-medium">{order.customer.phone}</p>
                            </div>
                            <div className="col-span-2">
                                <p className="text-gray-500">ที่อยู่จัดส่ง</p>
                                <p className="font-medium">{order.customer.address} {order.customer.district} {order.customer.province} {order.customer.zipcode}</p>
                            </div>
                             <div className="col-span-2">
                                <p className="text-gray-500">อีเมล</p>
                                <p className="font-medium">{order.customer.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                        <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Package className="w-4 h-4 mr-2"/> รายการสินค้า</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-3 py-2 text-left">สินค้า</th>
                                        <th className="px-3 py-2 text-center">จำนวน</th>
                                        <th className="px-3 py-2 text-right">รวม</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y">
                                    {order.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-3 py-2">
                                                <div className="flex items-center">
                                                    <img src={item.imageUrls[0]} className="w-8 h-8 object-contain rounded border mr-2" alt="" />
                                                    <span className="line-clamp-1">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-3 py-2 text-center">{item.quantity}</td>
                                            <td className="px-3 py-2 text-right">{formatCurrency(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="mt-4 pt-3 border-t flex justify-end">
                            <div className="w-48 space-y-1 text-sm">
                                <div className="flex justify-between"><span>รวมสินค้า</span> <span>{formatCurrency(order.total)}</span></div>
                                <div className="flex justify-between"><span>ค่าจัดส่ง</span> <span>{formatCurrency(order.shipping)}</span></div>
                                {order.discount > 0 && <div className="flex justify-between text-green-600"><span>ส่วนลด</span> <span>-{formatCurrency(order.discount)}</span></div>}
                                <div className="flex justify-between font-bold text-lg pt-2 border-t"><span>ยอดสุทธิ</span> <span className="text-orange-600">{formatCurrency(order.grandTotal)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-6">
                    <div className="bg-white p-4 rounded-lg border shadow-sm">
                         <h4 className="font-bold text-gray-800 mb-3 flex items-center"><Truck className="w-4 h-4 mr-2"/> สถานะการจัดส่ง</h4>
                         <div className="space-y-4">
                             <FormInput label="สถานะ" name="status" value={editedOrder.status} onChange={handleChange} as="select">
                                 <option value="Pending">รอดำเนินการ (Pending)</option>
                                 <option value="Processing">กำลังเตรียมสินค้า (Processing)</option>
                                 <option value="Shipped">จัดส่งแล้ว (Shipped)</option>
                                 <option value="Completed">สำเร็จ (Completed)</option>
                                 <option value="Cancelled">ยกเลิก (Cancelled)</option>
                             </FormInput>
                             <FormInput label="ขนส่ง" name="carrier" value={editedOrder.carrier || ''} onChange={handleChange} placeholder="เช่น Kerry, Flash" />
                             <FormInput label="Tracking Number" name="trackingNumber" value={editedOrder.trackingNumber || ''} onChange={handleChange} placeholder="ระบุหมายเลขพัสดุ" />
                         </div>
                    </div>
                    
                    <div className="flex flex-col gap-3">
                         <button onClick={handleSave} className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-sm flex items-center justify-center">
                             <Save size={18} className="mr-2" /> บันทึกการเปลี่ยนแปลง
                         </button>
                         <button onClick={onClose} className="w-full bg-white border border-gray-300 text-gray-700 py-2.5 rounded-lg font-bold hover:bg-gray-50 transition-colors">
                             ปิดหน้าต่าง
                         </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
};

// --- Main Admin Page Component ---

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
  onDeleteJobApplication: (appId: number) => void;
  onSaveHeaderMenuData: (data: HeaderMenuData) => void;
  onSaveUser: (user: User) => void;
  onDeleteUser: (userId: number) => void;
  onClearLogs: () => void;
  onResetAllData: () => void;
  onLogout: () => void;
  onNavigate: (page: any) => void; // using any for simplicity with custom navigation
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  
  const { addToast } = useToast();

  // --- Dashboard Stats ---
  const totalRevenue = props.adminOrders.filter(o => o.status !== 'Cancelled').reduce((acc, o) => acc + o.grandTotal, 0);
  const pendingOrders = props.adminOrders.filter(o => o.status === 'Pending').length;
  const lowStockProducts = props.products.filter(p => p.stock < 5).length;
  const totalUsers = props.users.length;

  // --- Handlers ---
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleAddProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditOrder = (order: AdminOrder) => {
      setSelectedOrder(order);
      setIsOrderModalOpen(true);
  };

  const filteredProducts = props.products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  const filteredOrders = props.adminOrders.filter(o => 
      o.orderNumber.toLowerCase().includes(searchTerm.toLowerCase()) || 
      o.customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
        <div className="p-3 rounded-full bg-green-100 text-green-600 mr-4"><ShoppingCart size={24} /></div>
        <div><p className="text-sm text-gray-500">ยอดขายรวม</p><p className="text-2xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
        <div className="p-3 rounded-full bg-orange-100 text-orange-600 mr-4"><Package size={24} /></div>
        <div><p className="text-sm text-gray-500">ออเดอร์รอจัดการ</p><p className="text-2xl font-bold text-gray-800">{pendingOrders}</p></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
        <div className="p-3 rounded-full bg-red-100 text-red-600 mr-4"><AlertTriangle size={24} /></div>
        <div><p className="text-sm text-gray-500">สินค้าใกล้หมด</p><p className="text-2xl font-bold text-gray-800">{lowStockProducts}</p></div>
      </div>
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center">
        <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4"><Users size={24} /></div>
        <div><p className="text-sm text-gray-500">ผู้ใช้งานทั้งหมด</p><p className="text-2xl font-bold text-gray-800">{totalUsers}</p></div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="ค้นหาสินค้า..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-blue-500 focus:border-blue-500" />
        </div>
        <button onClick={handleAddProduct} className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 font-medium"><PlusCircle className="w-5 h-5 mr-2" /> เพิ่มสินค้า</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">สินค้า</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">หมวดหมู่</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ราคา</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">สต็อก</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredProducts.map(product => (
              <tr key={product.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <img src={product.imageUrls[0]} alt="" className="w-10 h-10 rounded object-contain border bg-white" />
                  <span className="font-medium text-gray-900 line-clamp-1" title={product.name}>{product.name}</span>
                </td>
                <td className="px-6 py-4 text-gray-600">{product.category}</td>
                <td className="px-6 py-4 font-medium text-gray-900">{formatCurrency(product.price)}</td>
                <td className="px-6 py-4">
                    <span className={`px-2 py-1 rounded text-xs font-bold ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                        {product.stock}
                    </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:bg-blue-50 p-1.5 rounded"><Edit size={18} /></button>
                  <button onClick={() => { if(window.confirm('ยืนยันการลบ?')) props.onDeleteProduct(product.id) }} className="text-red-600 hover:bg-red-50 p-1.5 rounded"><Trash2 size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="relative w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="ค้นหาออเดอร์..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-blue-500 focus:border-blue-500" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">รหัสสั่งซื้อ</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">วันที่</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ลูกค้า</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">ยอดรวม</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase">สถานะ</th>
              <th className="px-6 py-3 text-xs font-semibold text-gray-500 uppercase text-right">จัดการ</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredOrders.map(order => (
              <tr key={order.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => handleEditOrder(order)}>
                <td className="px-6 py-4 font-medium text-blue-600">{order.orderNumber}</td>
                <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString('th-TH')}</td>
                <td className="px-6 py-4 text-gray-900">{order.customer.name}</td>
                <td className="px-6 py-4 font-medium">{formatCurrency(order.grandTotal)}</td>
                <td className="px-6 py-4">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                        {order.status}
                    </span>
                </td>
                <td className="px-6 py-4 text-right">
                   <button className="text-gray-500 hover:text-blue-600"><Edit size={18} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  // --- Layout ---
  const tabs = [
    { id: 'dashboard', label: 'แดชบอร์ด', icon: <LayoutDashboard size={20} /> },
    { id: 'products', label: 'สินค้า', icon: <Package size={20} /> },
    { id: 'orders', label: 'คำสั่งซื้อ', icon: <ShoppingCart size={20} /> },
    { id: 'content', label: 'เนื้อหาหน้าเว็บ', icon: <Monitor size={20} /> },
    { id: 'users', label: 'ผู้ใช้งาน', icon: <Users size={20} /> },
    { id: 'settings', label: 'ตั้งค่า', icon: <Settings size={20} /> },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r shadow-sm fixed h-full z-10 hidden lg:block">
        <div className="p-6 border-b flex items-center gap-3">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center text-white font-bold">U</div>
            <span className="font-bold text-lg text-gray-800">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-1">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors font-medium ${activeTab === tab.id ? 'bg-blue-50 text-blue-600' : 'text-gray-600 hover:bg-gray-50'}`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t">
             <button onClick={props.onLogout} className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 transition-colors font-medium">
                <LogOut size={20} /> ออกจากระบบ
             </button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="lg:ml-64 flex-grow flex flex-col min-h-screen">
          {/* Mobile Header */}
          <header className="bg-white border-b p-4 lg:hidden flex justify-between items-center sticky top-0 z-20">
               <span className="font-bold text-lg">Admin Panel</span>
               <button className="p-2 bg-gray-100 rounded-md"><Menu size={20}/></button>
          </header>

          <main className="p-4 sm:p-6 lg:p-8 flex-grow">
            {activeTab === 'dashboard' && renderDashboard()}
            {activeTab === 'products' && renderProducts()}
            {activeTab === 'orders' && renderOrders()}
            {activeTab === 'content' && (
                <HomepageManagement 
                    content={props.homepageContent} 
                    onSave={props.onSaveHomepageContent}
                    computerSetPageContent={props.computerSetPageContent}
                    onSaveComputerSetPageContent={props.onSaveComputerSetPageContent}
                />
            )}
            {activeTab === 'users' && (
                <div className="bg-white rounded-xl shadow-sm border p-6 text-center text-gray-500">
                    <Users size={48} className="mx-auto mb-4 text-gray-300"/>
                    <p>ส่วนจัดการผู้ใช้งาน (Coming Soon)</p>
                </div>
            )}
             {activeTab === 'settings' && (
                <div className="space-y-6">
                     <div className="bg-white rounded-xl shadow-sm border p-6">
                        <h3 className="font-bold text-lg mb-4 text-red-600">Danger Zone</h3>
                        <div className="flex gap-4">
                            <button onClick={props.onClearLogs} className="px-4 py-2 border border-red-300 text-red-600 rounded-lg hover:bg-red-50 font-medium">ล้าง Logs</button>
                            <button onClick={props.onResetAllData} className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-medium">รีเซ็ตข้อมูลทั้งหมด</button>
                        </div>
                     </div>
                </div>
            )}
          </main>
      </div>

      {/* Modals */}
      {isProductModalOpen && (
        <ProductForm 
            isOpen={isProductModalOpen} 
            onClose={() => setIsProductModalOpen(false)} 
            onSave={(product) => { props.onSaveProduct(product); setIsProductModalOpen(false); addToast('บันทึกสินค้าเรียบร้อย', 'success'); }} 
            product={editingProduct} 
            categories={props.categories} 
        />
      )}
      
      {isOrderModalOpen && selectedOrder && (
          <OrderDetailsModal 
            order={selectedOrder} 
            onClose={() => setIsOrderModalOpen(false)} 
            onSave={props.onSaveAdminOrder} 
          />
      )}
    </div>
  );
};

export default AdminPage;
