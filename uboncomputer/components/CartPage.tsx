'use client';
import React from 'react';
import { useCart } from '../hooks/useCart';
import { ShoppingCart, Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { NavigateFunction } from '../types';

interface CartPageProps {
    onNavigate: NavigateFunction;
}

const CartPage: React.FC<CartPageProps> = ({ onNavigate }) => {
    const { cartItems, removeFromCart, updateQuantity, clearCart, totalItems, totalPrice } = useCart();
    const shippingCost = totalItems > 0 ? 150 : 0;
    const grandTotal = totalPrice + shippingCost;

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

    if (totalItems === 0) {
        return (
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
                <ShoppingCart size={64} className="mx-auto text-gray-300" />
                <h1 className="mt-4 text-3xl font-bold text-gray-800">ตะกร้าสินค้าของคุณว่างเปล่า</h1>
                <p className="mt-2 text-gray-500">ดูเหมือนว่าคุณยังไม่ได้เพิ่มสินค้าใดๆ ลงในตะกร้า</p>
                <button 
                    onClick={() => onNavigate('home')}
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
                <h1 className="text-3xl font-bold text-gray-900 mb-8">ตะกร้าสินค้า ({totalItems} ชิ้น)</h1>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
                    
                    <div className="lg:col-span-2 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <div className="flex justify-between items-center border-b pb-4 mb-4">
                            <h2 className="text-xl font-semibold">รายการสินค้า</h2>
                            <button onClick={clearCart} className="text-sm font-medium text-red-600 hover:text-red-500 flex items-center gap-1">
                                <Trash2 size={16} /> ลบทั้งหมด
                            </button>
                        </div>
                        <div className="space-y-6">
                            {cartItems.map(item => (
                                <div key={item.id} className="flex flex-col sm:flex-row items-center gap-4">
                                    <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-contain rounded-md border p-1 flex-shrink-0" />
                                    <div className="flex-grow text-center sm:text-left">
                                        <p className="font-semibold text-gray-800">{item.name}</p>
                                        <p className="text-sm text-gray-500">{formatCurrency(item.price)}</p>
                                    </div>
                                    <div className="flex items-center gap-2 flex-shrink-0">
                                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1.5 border rounded-full hover:bg-gray-100"><Minus size={16} /></button>
                                        <input 
                                            type="number" 
                                            value={item.quantity}
                                            onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                            className="w-12 text-center border-gray-300 rounded-md shadow-sm bg-white"
                                            min="1"
                                        />
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1.5 border rounded-full hover:bg-gray-100"><Plus size={16} /></button>
                                    </div>
                                    <p className="font-bold w-24 text-center">{formatCurrency(item.price * item.quantity)}</p>
                                    <button onClick={() => removeFromCart(item.id)} className="text-gray-400 hover:text-red-600 p-2"><Trash2 size={18} /></button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky top-28">
                            <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">สรุปรายการสั่งซื้อ</h2>
                            <div className="space-y-3 text-gray-700">
                                <div className="flex justify-between">
                                    <span>ราคาสินค้า ({totalItems} ชิ้น)</span>
                                    <span>{formatCurrency(totalPrice)}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>ค่าจัดส่ง</span>
                                    <span>{formatCurrency(shippingCost)}</span>
                                </div>
                                <div className="flex justify-between font-bold text-lg text-gray-900 border-t pt-4 mt-2">
                                    <span>ยอดรวม</span>
                                    <span className="text-orange-600">{formatCurrency(grandTotal)}</span>
                                </div>
                            </div>
                            <button onClick={() => onNavigate('checkout')} className="mt-6 w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition-colors">
                                ดำเนินการชำระเงิน
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartPage;