
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
  Wrench, Monitor, Printer, Laptop, Cpu, CircuitBoard, Cog, MemoryStick, HardDrive, Power, Box, Fan, Gamepad2, Router, FileCode, Server,
  TrendingUp, DollarSign, Clock
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
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4 animate-fade-in backdrop-blur-sm">
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

// FormWrapper component for Modal footers
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

const Accordion: React.FC<{ title: string; children: React.ReactNode, startsOpen?: boolean }> = ({ title, children, startsOpen = false }) => {
    const [isOpen, setIsOpen] = useState(startsOpen);
    return (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all duration-200 hover:shadow-md">
            <button
                className={`w-full flex justify-between items-center p-4 bg-white hover:bg-gray-50 transition-colors ${isOpen ? 'border-b' : ''}`}
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp className="text-gray-500"/> : <ChevronDown className="text-gray-500"/>}
            </button>
            {isOpen && <div className="p-5 space-y-6 bg-gray-50/30">{children}</div>}
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
                    <div className="bg-white p-4 rounded-lg border shadow-sm