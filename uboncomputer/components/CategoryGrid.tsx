


import React from 'react';
import { 
    Cpu, Cog, HardDrive, MemoryStick, Power, Wind, CircuitBoard, 
    Laptop, Monitor, Keyboard, Mouse, Gamepad2, Server, Wrench, LayoutGrid,
    Router, FileCode, Box, Printer, Computer
} from 'lucide-react';
import { Page, ProductCategory } from '../types';

interface CategoryGridProps {
    onNavigate: (page: Page) => void;
}

const CategoryGrid: React.FC<CategoryGridProps> = ({ onNavigate }) => {
    const categories = [
        { name: 'จัดสเปคคอม', icon: <Wrench />, page: 'pcBuilder' as Page, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
        { name: 'คอมพิวเตอร์เซต', icon: <Computer />, page: 'computerSet' as Page, color: 'text-orange-600', bg: 'bg-orange-50', border: 'border-orange-100' },
        { name: 'Desktop PC', icon: <Computer />, page: 'desktopComputer' as Page, color: 'text-purple-600', bg: 'bg-purple-50', border: 'border-purple-100' },
        { name: 'AIO PC', icon: <Monitor />, page: 'aioComputer' as Page, color: 'text-teal-600', bg: 'bg-teal-50', border: 'border-teal-100' },
        { name: 'Printer', icon: <Printer />, page: 'printer' as Page, color: 'text-indigo-600', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        { name: 'CPU', icon: <Cpu />, page: 'cpu' as Page, color: 'text-sky-600', bg: 'bg-sky-50', border: 'border-sky-100' },
        { name: 'Mainboard', icon: <Cog />, page: 'motherboard' as Page, color: 'text-slate-700', bg: 'bg-slate-100', border: 'border-slate-200' },
        { name: 'VGA', icon: <CircuitBoard />, page: 'gpu' as Page, color: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
        { name: 'RAM', icon: <MemoryStick />, page: 'ram' as Page, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' },
        { name: 'Storage', icon: <HardDrive />, page: 'storage' as Page, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { name: 'PSU', icon: <Power />, page: 'powerSupply' as Page, color: 'text-yellow-600', bg: 'bg-yellow-50', border: 'border-yellow-100' },
        { name: 'Cooling', icon: <Wind />, page: 'cooling' as Page, color: 'text-cyan-600', bg: 'bg-cyan-50', border: 'border-cyan-100' },
        { name: 'Case', icon: <Box />, page: 'case' as Page, color: 'text-gray-700', bg: 'bg-gray-100', border: 'border-gray-200' },
        { name: 'Gaming Gear', icon: <Gamepad2 />, page: 'gamingGear' as Page, color: 'text-pink-600', bg: 'bg-pink-50', border: 'border-pink-100' },
        { name: 'Monitor', icon: <Monitor />, page: 'home' as Page, color: 'text-indigo-500', bg: 'bg-indigo-50', border: 'border-indigo-100' },
        { name: 'Network', icon: <Router />, page: 'network' as Page, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { name: 'Software', icon: <FileCode />, page: 'software' as Page, color: 'text-blue-500', bg: 'bg-blue-50', border: 'border-blue-100' },
        { name: 'Server', icon: <Server />, page: 'server' as Page, color: 'text-slate-800', bg: 'bg-slate-200', border: 'border-slate-300' },
    ];

    return (
        <section className="bg-white py-10 border-b border-gray-100 shadow-sm relative z-20 -mt-6 rounded-t-[2.5rem] mx-4 sm:mx-6 2xl:mx-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-4 sm:gap-6">
                    {categories.map((category) => {
                        return (
                            <button 
                                key={category.name}
                                onClick={() => onNavigate(category.page)}
                                className={`flex flex-col items-center justify-center p-4 rounded-2xl hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full border border-transparent hover:border-gray-100 bg-white hover:bg-gray-50 relative overflow-hidden`}
                            >
                                <div className={`w-14 h-14 rounded-2xl ${category.bg} flex items-center justify-center shadow-sm mb-3 group-hover:scale-110 transition-transform duration-300 z-10 ring-1 ring-black/5`}>
                                    {React.isValidElement(category.icon) ? React.cloneElement(category.icon as React.ReactElement<any>, { size: 28, className: category.color, strokeWidth: 2 }) : null}
                                </div>
                                <span className="text-xs font-bold text-gray-600 group-hover:text-gray-900 text-center transition-colors line-clamp-1 w-full z-10">{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
