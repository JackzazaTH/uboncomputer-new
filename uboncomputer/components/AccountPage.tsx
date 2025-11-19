import React, { useState } from 'react';
import { User, AdminOrder, Page, AdminOrderStatus } from '../types';
import { Package, User as UserIcon, LogOut, Save, Lock, RefreshCw, XCircle, HelpCircle, Truck, Undo2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';


interface AccountPageProps {
  currentUser: User;
  userOrders: AdminOrder[];
  onNavigate: (page: Page) => void;
  onLogout: () => void;
  onSaveAdminOrder: (order: AdminOrder) => void;
}

const statusColors: Record<AdminOrderStatus, string> = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Processing: 'bg-blue-100 text-blue-800',
    Shipped: 'bg-purple-100 text-purple-800',
    Completed: 'bg-green-100 text-green-800',
    Cancelled: 'bg-red-100 text-red-800',
};

const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

const OrderHistory: React.FC<{ orders: AdminOrder[], onSaveAdminOrder: (order: AdminOrder) => void, onNavigate: (page: Page) => void }> = ({ orders, onSaveAdminOrder, onNavigate }) => {
    const { addToast } = useToast();
    const { addToCart } = useCart();

    const handleCancelOrder = (order: AdminOrder) => {
        if (window.confirm(`คุณแน่ใจหรือไม่ว่าต้องการยกเลิกคำสั่งซื้อ #${order.orderNumber}?`)) {
            onSaveAdminOrder({ ...order, status: 'Cancelled' });
            addToast(`ยกเลิกคำสั่งซื้อ #${order.orderNumber} แล้ว`, 'info');
        }
    };

    const handleOrderAgain = (order: AdminOrder) => {
        order.items.forEach(item => {
            addToCart(item, item.quantity);
        });
        addToast(`เพิ่มสินค้าจากคำสั่งซื้อ #${order.orderNumber} ลงในตะกร้าแล้ว`, 'success');
        onNavigate('cart');
    };
    
    if (orders.length === 0) {
        return (
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">ประวัติการสั่งซื้อ</h2>
                <div className="text-center py-10 bg-gray-50 rounded-lg">
                    <p className="text-gray-500">คุณยังไม่มีประวัติการสั่งซื้อ</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-gray-800">ประวัติการสั่งซื้อ</h2>
            <div className="space-y-4">
                {orders.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map(order => (
                    <div key={order.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                        <div className="flex flex-col sm:flex-row justify-between sm:items-center border-b pb-3 mb-3">
                            <div>
                                <p className="font-bold text-gray-900">หมายเลขคำสั่งซื้อ: {order.orderNumber}</p>
                                <p className="text-sm text-gray-500">วันที่สั่งซื้อ: {new Date(order.date).toLocaleDateString('th-TH', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                            </div>
                            <span className={`mt-2 sm:mt-0 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[order.status]}`}>
                                {order.status}
                            </span>
                        </div>
                        <div className="space-y-2">
                           {order.items.map(item => (
                               <div key={item.id} className="flex items-center gap-3 text-sm">
                                   <img src={item.imageUrls[0]} alt={item.name} className="w-10 h-10 object-contain rounded border flex-shrink-0" />
                                   <p className="flex-grow">{item.name} <span className="text-gray-500">x{item.quantity}</span></p>
                                   <p className="font-semibold">{formatCurrency(item.price * item.quantity)}</p>
                               </div>
                           ))}
                        </div>
                        <div className="flex flex-col sm:flex-row justify-between items-center mt-3 pt-3 border-t">
                            <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto mb-3 sm:mb-0">
                                <button
                                    onClick={() => handleOrderAgain(order)}
                                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-blue-100 text-blue-700 py-1.5 px-3 rounded-md hover:bg-blue-200 transition-colors"
                                >
                                    <RefreshCw size={14} />
                                    สั่งซื้ออีกครั้ง
                                </button>
                                {(order.status === 'Pending' || order.status === 'Processing') && (
                                     <button
                                        onClick={() => handleCancelOrder(order)}
                                        className="inline-flex items-center justify-center gap-2 text-sm font-semibold bg-red-100 text-red-700 py-1.5 px-3 rounded-md hover:bg-red-200 transition-colors"
                                     >
                                         <XCircle size={14} />
                                         ยกเลิกคำสั่งซื้อ
                                     </button>
                                )}
                            </div>
                            <p className="font-bold text-lg text-gray-800 self-end sm:self-center">ยอดรวม: <span className="text-orange-600">{formatCurrency(order.grandTotal)}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

const AccountDetails: React.FC<{ user: User }> = ({ user }) => {
    const { addToast } = useToast();
    const [formData, setFormData] = useState({
        name: user.name,
        email: user.email,
        phone: '0812345678', // Mock data
    });
     const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
    };

    const handleInfoSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Here you would typically call an API to update user info
        addToast('อัปเดตข้อมูลส่วนตัวสำเร็จ (จำลอง)', 'success');
    };

    const handlePasswordSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            addToast('รหัสผ่านใหม่และยืนยันรหัสผ่านไม่ตรงกัน', 'error');
            return;
        }
        if (passwordData.newPassword.length < 6) {
             addToast('รหัสผ่านใหม่ต้องมีความยาวอย่างน้อย 6 ตัวอักษร', 'error');
            return;
        }
        // Here you would call an API to change the password
        addToast('เปลี่ยนรหัสผ่านสำเร็จ (จำลอง)', 'success');
        setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    };

    return (
        <div className="space-y-10">
            <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">ข้อมูลส่วนตัว</h2>
                <form onSubmit={handleInfoSubmit} className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">อีเมล</label>
                        <input type="email" name="email" value={formData.email} disabled className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-gray-100 text-gray-500 cursor-not-allowed" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 bg-orange-600 text-white font-bold py-2 px-4 rounded-md hover:bg-orange-700 transition-colors">
                        <Save size={18} /> บันทึกข้อมูล
                    </button>
                </form>
            </div>
             <div>
                <h2 className="text-xl font-bold mb-4 text-gray-800">เปลี่ยนรหัสผ่าน</h2>
                <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-lg">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">รหัสผ่านปัจจุบัน</label>
                        <input type="password" name="currentPassword" value={passwordData.currentPassword} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700">รหัสผ่านใหม่</label>
                        <input type="password" name="newPassword" value={passwordData.newPassword} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-gray-700">ยืนยันรหัสผ่านใหม่</label>
                        <input type="password" name="confirmPassword" value={passwordData.confirmPassword} onChange={handlePasswordChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 bg-white text-gray-900 focus:outline-none focus:ring-orange-500 focus:border-orange-500" />
                    </div>
                    <button type="submit" className="inline-flex items-center gap-2 bg-gray-700 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-800 transition-colors">
                        <Lock size={18} /> เปลี่ยนรหัสผ่าน
                    </button>
                </form>
            </div>
        </div>
    );
};


const AccountPage: React.FC<AccountPageProps> = ({ currentUser, userOrders, onNavigate, onLogout, onSaveAdminOrder }) => {
  const [activeTab, setActiveTab] = useState<'orders' | 'details'>('orders');

  const menuItems = [
    { id: 'orders' as const, label: 'ประวัติการสั่งซื้อ', icon: <Package size={20} /> },
    { id: 'details' as const, label: 'ข้อมูลบัญชี', icon: <UserIcon size={20} /> },
  ];
  
  const helpMenuItems = [
    { id: 'faq', label: 'คำถามที่พบบ่อย', icon: <HelpCircle size={20} />, page: 'faq' as Page },
    { id: 'shipping', label: 'นโยบายการจัดส่ง', icon: <Truck size={20} />, page: 'shipping' as Page },
    { id: 'returns', label: 'นโยบายการคืนสินค้า', icon: <Undo2 size={20} />, page: 'returns' as Page },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'orders':
        return <OrderHistory orders={userOrders} onSaveAdminOrder={onSaveAdminOrder} onNavigate={onNavigate} />;
      case 'details':
        return <AccountDetails user={currentUser} />;
      default:
        return <OrderHistory orders={userOrders} onSaveAdminOrder={onSaveAdminOrder} onNavigate={onNavigate} />;
    }
  };

  return (
    <div className="bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">บัญชีของฉัน</h1>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="bg-white p-4 rounded-lg shadow-sm border sticky top-28">
              <div className="text-center mb-4 border-b pb-4">
                  <h2 className="font-bold text-xl text-gray-800">{currentUser.name}</h2>
                  <p className="text-sm text-gray-500">{currentUser.email}</p>
              </div>
              <nav className="space-y-1">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium transition-colors ${
                      activeTab === item.id
                        ? 'bg-orange-100 text-orange-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>

              <div className="pt-3 mt-3 border-t">
                <h3 className="px-3 mb-1 text-xs font-semibold tracking-wider text-gray-400 uppercase">
                    ช่วยเหลือ
                </h3>
                <div className="space-y-1">
                    {helpMenuItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => onNavigate(item.page)}
                            className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-100"
                        >
                            {item.icon}
                            <span>{item.label}</span>
                        </button>
                    ))}
                </div>
              </div>

              <div className="mt-3 pt-3 border-t">
                <button
                  onClick={onLogout}
                  className="w-full flex items-center gap-3 p-3 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                >
                  <LogOut size={20}/>
                  <span>ออกจากระบบ</span>
                </button>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
