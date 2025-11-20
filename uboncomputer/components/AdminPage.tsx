
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
  Monitor, FileText, RefreshCw, Truck, CheckCircle, AlertTriangle, List, XCircle, Menu, Home
} from 'lucide-react';

import HomepageManagement from './HomepageManagement';
import ProductForm from './ProductForm';
import { useToast } from '../hooks/useToast';
import ImageUpload from './ImageUpload';

// --- Helper Components ---

export const Modal: React.FC<{ title: string; onClose: () => void; children: React.ReactNode; size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' }> = ({ title, onClose, children, size = 'lg' }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-[60] flex justify-center items-center p-4 animate-fade-in backdrop-blur-sm">
            <div 
                className={`bg-white rounded-xl shadow-2xl w-full max-w-${size} max-h-[90vh] flex flex-col animate-slide-in-up border border-gray-100`}
                onClick={e => e.stopPropagation()}
                >
                <div className="flex-shrink-0 flex justify-between items-center p-6 border-b">
                    <h3 className="text-2xl font-bold text-gray-800">{title}</h3>
                    <button onClick={onClose} className="p-2 rounded-full text-gray-500 hover:bg-gray-100 hover:text-red-500 transition-colors">
                      <X size={24} />
                    </button>
                </div>
                <div className="flex-grow p-6 md:p-8 overflow-y-auto custom-scrollbar">{children}</div>
            </div>
        </div>
    );
};

export const FormWrapper: React.FC<{ onSave: () => void; onCancel: () => void; children: React.ReactNode }> = ({ onSave, onCancel, children }) => {
    return (
        <form onSubmit={(e) => { e.preventDefault(); onSave(); }} className="flex flex-col h-full">
            <div className="space-y-6 flex-grow">{children}</div>
            <div className="mt-10 flex justify-end space-x-4 pt-6 border-t">
                <button type="button" onClick={onCancel} className="px-6 py-3 rounded-lg border border-gray-300 text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                  ยกเลิก
                </button>
                <button type="submit" className="px-6 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 shadow-md hover:shadow-lg transition-all">
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
        className: "mt-2 block w-full border border-gray-300 rounded-lg shadow-sm py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-gray-900 disabled:bg-gray-100 transition-all text-base",
    };

    return (
        <div>
            <label htmlFor={name} className="block text-sm font-bold text-gray-700">{label}{required && <span className="text-red-500 ml-1">*</span>}</label>
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
        <Modal title={`รายละเอียดคำสั่งซื้อ #${order.orderNumber}`} onClose={onClose} size="5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Users className="w-5 h-5 mr-2"/> ข้อมูลลูกค้า</h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">ชื่อ</p>
                                <p className="font-semibold text-gray-900 text-base">{order.customer.name}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">เบอร์โทร</p>
                                <p className="font-semibold text-gray-900 text-base">{order.customer.phone}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-gray-500 mb-1">ที่อยู่จัดส่ง</p>
                                <p className="font-semibold text-gray-900 text-base">{order.customer.address} {order.customer.district} {order.customer.province} {order.customer.zipcode}</p>
                            </div>
                             <div className="md:col-span-2">
                                <p className="text-gray-500 mb-1">อีเมล</p>
                                <p className="font-semibold text-gray-900 text-base">{order.customer.email}</p>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                        <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Package className="w-5 h-5 mr-2"/> รายการสินค้า</h4>
                        <div className="overflow-x-auto">
                            <table className="min-w-full text-sm">
                                <thead className="bg-gray-50">
                                    <tr>
                                        <th className="px-4 py-3 text-left font-semibold text-gray-600">สินค้า</th>
                                        <th className="px-4 py-3 text-center font-semibold text-gray-600">จำนวน</th>
                                        <th className="px-4 py-3 text-right font-semibold text-gray-600">รวม</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                    {order.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3">
                                                <div className="flex items-center gap-4">
                                                    <img src={item.imageUrls[0]} className="w-12 h-12 object-contain rounded border bg-white" alt="" />
                                                    <span className="font-medium text-gray-900 text-base">{item.name}</span>
                                                </div>
                                            </td>
                                            <td className="px-4 py-3 text-center text-base">{item.quantity}</td>
                                            <td className="px-4 py-3 text-right font-bold text-gray-900 text-base">{formatCurrency(item.price * item.quantity)}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                         <div className="mt-6 pt-4 border-t flex justify-end">
                            <div className="w-64 space-y-2 text-base">
                                <div className="flex justify-between text-gray-600"><span>รวมสินค้า</span> <span>{formatCurrency(order.total)}</span></div>
                                <div className="flex justify-between text-gray-600"><span>ค่าจัดส่ง</span> <span>{formatCurrency(order.shipping)}</span></div>
                                {order.discount > 0 && <div className="flex justify-between text-green-600"><span>ส่วนลด</span> <span>-{formatCurrency(order.discount)}</span></div>}
                                <div className="flex justify-between font-bold text-xl pt-3 border-t text-gray-900"><span>ยอดสุทธิ</span> <span className="text-orange-600">{formatCurrency(order.grandTotal)}</span></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-8">
                    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm h-full">
                         <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center"><Truck className="w-5 h-5 mr-2"/> จัดการสถานะ</h4>
                         <div className="space-y-6">
                             <FormInput label="สถานะคำสั่งซื้อ" name="status" value={editedOrder.status} onChange={handleChange} as="select">
                                 <option value="Pending">รอดำเนินการ (Pending)</option>
                                 <option value="Processing">กำลังเตรียมสินค้า (Processing)</option>
                                 <option value="Shipped">จัดส่งแล้ว (Shipped)</option>
                                 <option value="Completed">สำเร็จ (Completed)</option>
                                 <option value="Cancelled">ยกเลิก (Cancelled)</option>
                             </FormInput>
                             <FormInput label="บริษัทขนส่ง" name="carrier" value={editedOrder.carrier || ''} onChange={handleChange} placeholder="เช่น Kerry, Flash, J&T" />
                             <FormInput label="Tracking Number" name="trackingNumber" value={editedOrder.trackingNumber || ''} onChange={handleChange} placeholder="ระบุหมายเลขพัสดุ" />
                             
                             <div className="pt-6 mt-auto flex flex-col gap-3">
                                 <button onClick={handleSave} className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-md flex items-center justify-center">
                                     <Save size={20} className="mr-2" /> บันทึกการเปลี่ยนแปลง
                                 </button>
                             </div>
                         </div>
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
  onNavigate: (page: any) => void;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const [activeTab, setActiveTab] = useState('content');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isOrderModalOpen, setIsOrderModalOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
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
    <div className="space-y-8">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 rounded-full bg-green-100 text-green-600 mr-4"><ShoppingCart size={32} /></div>
          <div><p className="text-gray-500 font-medium">ยอดขายรวม</p><p className="text-3xl font-bold text-gray-800">{formatCurrency(totalRevenue)}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 rounded-full bg-orange-100 text-orange-600 mr-4"><Package size={32} /></div>
          <div><p className="text-gray-500 font-medium">ออเดอร์รอจัดการ</p><p className="text-3xl font-bold text-gray-800">{pendingOrders}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 rounded-full bg-red-100 text-red-600 mr-4"><AlertTriangle size={32} /></div>
          <div><p className="text-gray-500 font-medium">สินค้าใกล้หมด</p><p className="text-3xl font-bold text-gray-800">{lowStockProducts}</p></div>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex items-center hover:shadow-md transition-shadow">
          <div className="p-4 rounded-full bg-blue-100 text-blue-600 mr-4"><Users size={32} /></div>
          <div><p className="text-gray-500 font-medium">ผู้ใช้งานทั้งหมด</p><p className="text-3xl font-bold text-gray-800">{totalUsers}</p></div>
        </div>
      </div>

      {/* Quick Actions */}
      <div>
          <h3 className="text-xl font-bold text-gray-800 mb-4">เมนูลัด</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <button onClick={() => setActiveTab('content')} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-orange-300 transition-all flex items-center gap-3 group text-left">
                  <div className="p-3 bg-orange-100 text-orange-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Monitor size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-800">จัดการหน้าเว็บ</h4>
                      <p className="text-xs text-gray-500">แก้ไขแบนเนอร์และสินค้าหน้าแรก</p>
                  </div>
              </button>
              
              <button onClick={() => setActiveTab('products')} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-blue-300 transition-all flex items-center gap-3 group text-left">
                  <div className="p-3 bg-blue-100 text-blue-600 rounded-lg group-hover:scale-110 transition-transform">
                      <Package size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-800">จัดการสินค้า</h4>
                      <p className="text-xs text-gray-500">เพิ่ม ลบ แก้ไขรายการสินค้า</p>
                  </div>
              </button>
               <button onClick={() => setActiveTab('orders')} className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:green-300 transition-all flex items-center gap-3 group text-left">
                  <div className="p-3 bg-green-100 text-green-600 rounded-lg group-hover:scale-110 transition-transform">
                      <ShoppingCart size={24} />
                  </div>
                  <div>
                      <h4 className="font-bold text-gray-800">จัดการคำสั่งซื้อ</h4>
                      <p className="text-xs text-gray-500">ตรวจสอบและอัปเดตสถานะ</p>
                  </div>
              </button>
          </div>
      </div>
    </div>
  );

  const renderProducts = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="ค้นหาสินค้า..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
        <button onClick={handleAddProduct} className="w-full sm:w-auto flex items-center justify-center bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-bold shadow-md transition-colors"><PlusCircle className="w-5 h-5 mr-2" /> เพิ่มสินค้าใหม่</button>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">สินค้า</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">หมวดหมู่</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">ราคา</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">สต็อก</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredProducts.map(product => (
                <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 flex items-center gap-4">
                    <img src={product.imageUrls[0]} alt="" className="w-12 h-12 rounded-md object-contain border bg-white p-1" />
                    <span className="font-semibold text-gray-900 text-base line-clamp-1" title={product.name}>{product.name}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">{product.category}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(product.price)}</td>
                  <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${product.stock < 5 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
                          {product.stock} ชิ้น
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <button onClick={() => handleEditProduct(product)} className="text-blue-600 hover:bg-blue-100 p-2 rounded-lg transition-colors"><Edit size={20} /></button>
                    <button onClick={() => { if(window.confirm('ยืนยันการลบ?')) props.onDeleteProduct(product.id) }} className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"><Trash2 size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input type="text" placeholder="ค้นหาออเดอร์ (รหัส, ชื่อลูกค้า)..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="pl-10 pr-4 py-3 border border-gray-300 rounded-lg w-full focus:ring-blue-500 focus:border-blue-500 shadow-sm" />
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">รหัสสั่งซื้อ</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">วันที่</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">ลูกค้า</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">ยอดรวม</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider">สถานะ</th>
                <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase tracking-wider text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-gray-50 cursor-pointer transition-colors" onClick={() => handleEditOrder(order)}>
                  <td className="px-6 py-4 font-bold text-blue-600">#{order.orderNumber}</td>
                  <td className="px-6 py-4 text-gray-600">{new Date(order.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</td>
                  <td className="px-6 py-4 text-gray-900 font-medium">{order.customer.name}</td>
                  <td className="px-6 py-4 font-bold text-gray-900">{formatCurrency(order.grandTotal)}</td>
                  <td className="px-6 py-4">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColors[order.status]}`}>
                          {order.status}
                      </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                     <button className="text-gray-400 hover:text-blue-600 p-1 rounded"><Edit size={20} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
    <div className="min-h-screen bg-gray-100 flex font-sarabun">
      {/* Sidebar - Desktop */}
      <aside className="w-72 bg-white border-r shadow-sm fixed h-full z-20 hidden lg:flex flex-col">
        <div className="p-6 border-b flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-md">U</div>
            <span className="font-bold text-xl text-gray-900 tracking-tight">Admin Panel</span>
        </div>
        <nav className="p-4 space-y-2 flex-grow">
            {tabs.map(tab => (
                <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-bold text-base ${activeTab === tab.id ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}`}
                >
                    {tab.icon}
                    {tab.label}
                </button>
            ))}
        </nav>
        <div className="p-6 border-t bg-gray-50 space-y-2">
             <button onClick={() => props.onNavigate('home')} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-bold text-base text-gray-600 hover:bg-white hover:text-gray-900 hover:shadow-sm">
                <Home size={20} />
                กลับหน้าร้าน
             </button>
             <button onClick={props.onLogout} className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl text-red-600 bg-white border border-red-200 hover:bg-red-50 transition-colors font-bold shadow-sm">
                <LogOut size={20} /> ออกจากระบบ
             </button>
        </div>
      </aside>

      {/* Sidebar - Mobile Overlay */}
      {isSidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden">
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setIsSidebarOpen(false)}></div>
          <aside className="w-72 bg-white border-r shadow-2xl fixed h-full z-40 flex flex-col animate-slide-in-right">
            <div className="p-6 border-b flex items-center justify-between bg-orange-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-orange-600 font-bold">U</div>
                  <span className="font-bold text-lg">Admin Panel</span>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="p-1 hover:bg-orange-700 rounded"><X size={24} /></button>
            </div>
            <nav className="p-4 space-y-2 flex-grow overflow-y-auto">
                {tabs.map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => { setActiveTab(tab.id); setIsSidebarOpen(false); }}
                        className={`w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-bold text-base ${activeTab === tab.id ? 'bg-orange-50 text-orange-600 shadow-sm' : 'text-gray-600 hover:bg-gray-50'}`}
                    >
                        {tab.icon}
                        {tab.label}
                    </button>
                ))}
            </nav>
            <div className="p-6 border-t space-y-2">
                 <button onClick={() => { props.onNavigate('home'); setIsSidebarOpen(false); }} className="w-full flex items-center gap-4 px-5 py-3.5 rounded-xl transition-all font-bold text-base text-gray-600 hover:bg-gray-50">
                    <Home size={20} />
                    กลับหน้าร้าน
                 </button>
                 <button onClick={props.onLogout} className="w-full flex items-center justify-center gap-3 px-5 py-3 rounded-xl text-red-600 bg-red-50 hover:bg-red-100 transition-colors font-bold">
                    <LogOut size={20} /> ออกจากระบบ
                 </button>
            </div>
          </aside>
        </div>
      )}

      {/* Main Content */}
      <div className="lg:ml-72 flex-grow flex flex-col min-h-screen">
          {/* Mobile Header */}
          <header className="bg-white border-b p-4 lg:hidden flex justify-between items-center sticky top-0 z-30 shadow-sm">
               <div className="flex items-center gap-2">
                   <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center text-white font-bold">U</div>
                   <span className="font-bold text-lg text-gray-800">Admin Panel</span>
               </div>
               <button onClick={() => setIsSidebarOpen(true)} className="p-2 bg-gray-100 rounded-lg text-gray-600 hover:bg-gray-200"><Menu size={24}/></button>
          </header>

          <main className="p-4 sm:p-8 lg:p-10 flex-grow max-w-screen-2xl mx-auto w-full">
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
                <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
                    <div className="p-6 border-b flex justify-between items-center">
                         <h3 className="text-xl font-bold text-gray-800 flex items-center"><Users size={24} className="mr-2 text-blue-600"/> จัดการผู้ใช้งาน</h3>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-50 border-b">
                                <tr>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">ชื่อ</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">อีเมล</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">บทบาท</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase">วันที่สมัคร</th>
                                    <th className="px-6 py-4 text-sm font-bold text-gray-600 uppercase text-right">จัดการ</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {props.users.map(user => (
                                    <tr key={user.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 font-medium text-gray-900">{user.name}</td>
                                        <td className="px-6 py-4 text-gray-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.role === 'admin' ? 'bg-red-100 text-red-700' : user.role === 'editor' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-500">{new Date(user.createdAt).toLocaleDateString('th-TH')}</td>
                                        <td className="px-6 py-4 text-right">
                                            {user.role !== 'admin' && (
                                                <button 
                                                    onClick={() => { if(window.confirm(`ยืนยันลบผู้ใช้ ${user.name}?`)) props.onDeleteUser(user.id); }} 
                                                    className="text-red-600 hover:bg-red-100 p-2 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={20} />
                                                </button>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
             {activeTab === 'settings' && (
                <div className="space-y-8">
                     <div className="bg-white rounded-xl shadow-sm border p-8">
                        <h3 className="font-bold text-xl mb-6 text-gray-800 flex items-center"><Shield size={24} className="mr-2 text-gray-600"/> การตั้งค่าระบบ</h3>
                        
                        <div className="p-6 bg-red-50 rounded-xl border border-red-200">
                            <h4 className="font-bold text-lg text-red-700 mb-4">Danger Zone</h4>
                            <div className="flex flex-wrap gap-4">
                                <button onClick={props.onClearLogs} className="px-6 py-2.5 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-100 font-bold transition-colors">ล้าง Logs ระบบ</button>
                                <button onClick={props.onResetAllData} className="px-6 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold shadow-md transition-colors">รีเซ็ตข้อมูลทั้งหมดเป็นค่าเริ่มต้น</button>
                            </div>
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
