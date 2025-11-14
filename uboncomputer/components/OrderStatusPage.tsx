import React, { useState } from 'react';
import { Search, PackageSearch, ClipboardList, Package, Truck, CheckCircle, AlertTriangle, XCircle } from 'lucide-react';
import { Order, OrderStatusStep, OrderStatusLabel, AdminOrder, AdminOrderStatus } from '../types';

interface OrderStatusPageProps {
    adminOrders: AdminOrder[];
}

const transformAdminOrderToOrder = (adminOrder: AdminOrder): Order => {
    const allSteps: OrderStatusLabel[] = ['ได้รับคำสั่งซื้อ', 'กำลังจัดเตรียมสินค้า', 'จัดส่งแล้ว', 'จัดส่งสำเร็จ'];
    const statusMap: Record<AdminOrderStatus, number> = {
        'Pending': 1,
        'Processing': 2,
        'Shipped': 3,
        'Completed': 4,
        'Cancelled': 1, // Will be handled separately, but set to 1 for timeline consistency
    };
    const completedStepsCount = statusMap[adminOrder.status];
    
    const orderDate = new Date(adminOrder.date);

    const steps: OrderStatusStep[] = allSteps.map((label, index) => {
        const isCompleted = index < completedStepsCount;
        let stepDate = '';
        if (isCompleted) {
            const date = new Date(orderDate);
            // Add plausible time delays for each step
            if (index === 0) date.setHours(date.getHours() + 0); // Order date
            if (index === 1) date.setHours(date.getHours() + 2); // 2 hours later
            if (index === 2) date.setDate(date.getDate() + 1);   // 1 day later
            if (index === 3) date.setDate(date.getDate() + 2);   // 2 days later
            stepDate = date.toLocaleString('th-TH', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }) + 'น.';
        }
        return {
            status: label,
            date: stepDate,
            completed: isCompleted,
        };
    });

    return {
        id: adminOrder.orderNumber,
        phoneNumber: adminOrder.customer.phone,
        trackingNumber: adminOrder.trackingNumber || 'N/A',
        carrier: adminOrder.carrier || 'N/A',
        customerName: adminOrder.customer.name,
        steps: steps,
    };
};


const OrderStatusPage: React.FC<OrderStatusPageProps> = ({ adminOrders }) => {
    const [query, setQuery] = useState('');
    const [foundAdminOrder, setFoundAdminOrder] = useState<AdminOrder | null>(null);
    const [searched, setSearched] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        const searchTerm = query.trim().toLowerCase();
        if (!searchTerm) return;

        const order = adminOrders.find(o => 
            o.orderNumber.toLowerCase() === searchTerm ||
            (o.trackingNumber && o.trackingNumber.toLowerCase() === searchTerm) ||
            o.customer.phone === searchTerm
        );

        setFoundAdminOrder(order || null);
        setSearched(true);
    };

    const statusIcons: Record<OrderStatusLabel, React.ReactNode> = {
        'ได้รับคำสั่งซื้อ': <ClipboardList className="w-6 h-6" />,
        'กำลังจัดเตรียมสินค้า': <Package className="w-6 h-6" />,
        'จัดส่งแล้ว': <Truck className="w-6 h-6" />,
        'จัดส่งสำเร็จ': <CheckCircle className="w-6 h-6" />,
    };

    const renderTimeline = (steps: OrderStatusStep[]) => {
        return (
            <div className="relative pl-8">
                {steps.map((step, index) => (
                    <div key={index} className="relative pb-12">
                        {/* Connecting line */}
                        {index < steps.length - 1 && (
                            <div className={`absolute top-5 left-[19px] w-0.5 h-full ${step.completed && steps[index + 1]?.completed ? 'bg-orange-500' : 'bg-gray-200'}`}></div>
                        )}
                        <div className="flex items-start">
                            <div className={`z-10 flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${step.completed ? 'bg-orange-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                                {statusIcons[step.status]}
                            </div>
                            <div className="ml-4">
                                <h4 className={`font-bold ${step.completed ? 'text-gray-800' : 'text-gray-500'}`}>{step.status}</h4>
                                <p className="text-sm text-gray-500">{step.date || '...'}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    

    const renderResult = () => {
        if (!searched) {
            return (
                <div className="text-center text-gray-500 p-8">
                    <PackageSearch size={48} className="mx-auto mb-4" />
                    <p>กรุณากรอกข้อมูลเพื่อค้นหาสถานะคำสั่งซื้อของคุณ</p>
                </div>
            );
        }

        if (!foundAdminOrder) {
            return (
                <div className="text-center text-orange-600 p-8 bg-orange-50 rounded-lg">
                    <AlertTriangle size={48} className="mx-auto mb-4" />
                    <p className="font-bold">ไม่พบข้อมูลคำสั่งซื้อ</p>
                    <p className="text-sm">กรุณาตรวจสอบข้อมูลที่กรอกอีกครั้ง หรือติดต่อฝ่ายบริการลูกค้า</p>
                </div>
            );
        }
        
        if (foundAdminOrder.status === 'Cancelled') {
             return (
                <div className="bg-red-50 p-6 rounded-lg shadow-md border border-red-200 text-center animate-fade-in">
                    <XCircle size={48} className="mx-auto mb-4 text-red-500" />
                    <h2 className="text-2xl font-bold mb-2 text-red-800">คำสั่งซื้อ #{foundAdminOrder.orderNumber} ถูกยกเลิก</h2>
                    <p className="text-red-700">หากคุณมีข้อสงสัย กรุณาติดต่อฝ่ายบริการลูกค้า</p>
                </div>
            );
        }

        const displayOrder = transformAdminOrderToOrder(foundAdminOrder);

        return (
            <div className="bg-white p-6 rounded-lg shadow-md border animate-fade-in">
                <h2 className="text-2xl font-bold mb-4">สถานะคำสั่งซื้อ #{displayOrder.id}</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6 text-sm">
                    <p><strong>ชื่อลูกค้า:</strong> {displayOrder.customerName}</p>
                    <p><strong>เบอร์โทรศัพท์:</strong> {displayOrder.phoneNumber}</p>
                    <p><strong>บริษัทขนส่ง:</strong> {displayOrder.carrier}</p>
                    <p><strong>หมายเลขพัสดุ:</strong> {displayOrder.trackingNumber}</p>
                </div>
                {renderTimeline(displayOrder.steps)}
            </div>
        );
    };

    return (
        <div className="bg-gray-50 min-h-[calc(100vh-200px)]">
            <section className="bg-orange-700 py-16 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute -bottom-16 -right-16 text-orange-900/30">
                    <PackageSearch size={256} strokeWidth={1}/>
                </div>
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        เช็คสถานะการจัดส่ง
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-orange-100">
                        กรอกหมายเลขพัสดุ | หมายเลขคำสั่งซื้อ | เบอร์โทรศัพท์เพื่อดูสถานะการจัดส่งของคุณ
                    </p>
                    <form onSubmit={handleSearch} className="mt-8 max-w-2xl mx-auto">
                        <div className="flex items-center bg-white rounded-full shadow-lg p-2">
                            <div className="pl-4 pr-2">
                                <Search className="w-6 h-6 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="กรอกข้อมูลที่นี่..."
                                className="w-full bg-transparent text-gray-800 text-lg border-none focus:outline-none focus:ring-0"
                            />
                            <button
                                type="submit"
                                className="bg-orange-600 text-white font-bold py-3 px-8 rounded-full hover:bg-orange-700 transition-colors"
                            >
                                ค้นหา
                            </button>
                        </div>
                        <p className="text-xs text-orange-200 mt-2">เฉพาะออเดอร์ที่สั่งสินค้ากับ UBONCOMPUTER</p>
                    </form>
                </div>
            </section>

            <section className="py-12">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-3xl">
                    {renderResult()}
                </div>
            </section>
        </div>
    );
};

export default OrderStatusPage;