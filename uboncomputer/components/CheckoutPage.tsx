'use client';
import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '../hooks/useCart';
import { DiscountCode } from '../types';
import { useToast } from '../hooks/useToast';
import { ShoppingCart, ArrowLeft, Tag, X } from 'lucide-react';

interface CheckoutPageProps {
  discountCodes: DiscountCode[];
}

const CheckoutPage: React.FC<CheckoutPageProps> = ({ discountCodes }) => {
    const { cartItems, totalItems, totalPrice, clearCart } = useCart();
    const { addToast } = useToast();
    const router = useRouter();
    
    const [couponCode, setCouponCode] = useState('');
    const [appliedCoupon, setAppliedCoupon] = useState<DiscountCode | null>(null);

    const shippingCost = totalItems > 0 ? 150 : 0;

    const discountAmount = useMemo(() => {
        if (!appliedCoupon) return 0;
        if (appliedCoupon.type === 'fixed') {
            return appliedCoupon.value;
        }
        if (appliedCoupon.type === 'percentage') {
            return (totalPrice * appliedCoupon.value) / 100;
        }
        return 0;
    }, [appliedCoupon, totalPrice]);

    const subtotalAfterDiscount = totalPrice - discountAmount;
    const vatAmount = subtotalAfterDiscount * 0.07;
    const grandTotal = subtotalAfterDiscount + shippingCost + vatAmount;

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

    const handleApplyCoupon = () => {
        const foundCode = discountCodes.find(c => c.code.toUpperCase() === couponCode.toUpperCase());
        if (foundCode && foundCode.isActive) {
            setAppliedCoupon(foundCode);
            addToast(`ใช้โค้ดส่วนลด "${foundCode.code}" สำเร็จ`, 'success');
        } else {
            addToast('โค้ดส่วนลดไม่ถูกต้องหรือไม่สามารถใช้งานได้', 'error');
        }
    };
    
    const handleRemoveCoupon = () => {
        setAppliedCoupon(null);
        setCouponCode('');
        addToast('ยกเลิกโค้ดส่วนลดแล้ว', 'info');
    };

    const handlePlaceOrder = () => {
        addToast('สั่งซื้อสำเร็จ! ขอบคุณที่ใช้บริการ', 'success');
        clearCart();
        router.push('/');
    };

    if (totalItems === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-300" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">ไม่มีสินค้าสำหรับชำระเงิน</h1>
                <p className="mt-2 text-gray-500">กรุณาเพิ่มสินค้าลงในตะกร้าก่อน</p>
                <button 
                    onClick={() => router.push('/')}
                    className="mt-6 inline-flex items-center bg-orange-600 text-white font-bold py-3 px-6 rounded-md hover:bg-orange-700 transition-colors"
                >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    กลับไปเลือกซื้อสินค้า
                </button>
            </div>
        );
    }

    return (
        <div className="bg-gray-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <h1 className="text-3xl font-bold text-gray-900 mb-8">ชำระเงิน</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    {/* Billing & Payment */}
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200 space-y-8">
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">ข้อมูลการจัดส่ง</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input placeholder="ชื่อ*" className="p-2 border rounded-md" />
                                <input placeholder="นามสกุล*" className="p-2 border rounded-md" />
                                <input placeholder="ที่อยู่*" className="sm:col-span-2 p-2 border rounded-md" />
                                <input placeholder="อำเภอ/เขต*" className="p-2 border rounded-md" />
                                <input placeholder="จังหวัด*" className="p-2 border rounded-md" />
                                <input placeholder="รหัสไปรษณีย์*" className="p-2 border rounded-md" />
                                <input placeholder="เบอร์โทรศัพท์*" className="p-2 border rounded-md" />
                                <input placeholder="อีเมล*" className="sm:col-span-2 p-2 border rounded-md" />
                            </div>
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-gray-800 mb-4">วิธีการชำระเงิน</h2>
                            <div className="space-y-3">
                                <label className="flex items-center p-4 border rounded-md cursor-pointer"><input type="radio" name="payment" className="h-4 w-4 text-orange-600"/> <span className="ml-3">บัตรเครดิต / เดบิต</span></label>
                                <label className="flex items-center p-4 border rounded-md cursor-pointer"><input type="radio" name="payment" className="h-4 w-4 text-orange-600"/> <span className="ml-3">โอนเงินผ่านธนาคาร</span></label>
                                <label className="flex items-center p-4 border rounded-md cursor-pointer"><input type="radio" name="payment" className="h-4 w-4 text-orange-600"/> <span className="ml-3">ชำระเงินปลายทาง</span></label>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">สรุปรายการสั่งซื้อ</h2>
                            <div className="space-y-3 text-sm text-gray-700">
                                {cartItems.map(item => (
                                    <div key={item.id} className="flex justify-between items-center">
                                        <span className="truncate w-3/5">{item.name} <span className="text-gray-500">x{item.quantity}</span></span>
                                        <span>{formatCurrency(item.price * item.quantity)}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t my-4 pt-4">
                                {!appliedCoupon ? (
                                    <div className="flex gap-2">
                                        <input 
                                            type="text"
                                            value={couponCode}
                                            onChange={(e) => setCouponCode(e.target.value)}
                                            placeholder="กรอกโค้ดส่วนลด"
                                            className="w-full p-2 border rounded-md text-sm"
                                        />
                                        <button onClick={handleApplyCoupon} className="bg-gray-700 text-white px-4 rounded-md text-sm font-semibold hover:bg-gray-800">ใช้โค้ด</button>
                                    </div>
                                ) : (
                                    <div className="flex justify-between items-center bg-green-50 text-green-700 p-2 rounded-md">
                                        <div className="flex items-center gap-2 font-semibold">
                                           <Tag size={16} />
                                           <span>โค้ด: {appliedCoupon.code}</span>
                                        </div>
                                        <button onClick={handleRemoveCoupon} className="p-1 rounded-full hover:bg-green-100"><X size={16} /></button>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-3 text-gray-700 border-t pt-4">
                                <div className="flex justify-between">
                                    <span>ราคาสินค้า</span>
                                    <span>{formatCurrency(totalPrice)}</span>
                                </div>
                                {discountAmount > 0 && (
                                    <div className="flex justify-between text-green-600">
                                        <span>ส่วนลด</span>
                                        <span>- {formatCurrency(discountAmount)}</span>
                                    </div>
                                )}
                                <div className="flex justify-between">
                                    <span>ค่าจัดส่ง</span>
                                    <span>{formatCurrency(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ภาษีมูลค่าเพิ่ม (7%)</span>
                                    <span>{formatCurrency(vatAmount)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-4 mt-2">
                                    <span>ยอดสุทธิ</span>
                                    <span className="text-orange-600">{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                            <button onClick={handlePlaceOrder} className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CheckoutPage;
