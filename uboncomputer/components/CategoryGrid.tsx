
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
        <section className="bg-white py-6 border-b border-gray-100 relative z-10 -mt-6 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
            <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
                {/* Desktop Grid / Mobile Scroll */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4">
                    {categories.map((category) => {
                        return (
                            <button 
                                key={category.name}
                                onClick={() => onNavigate(category.page)}
                                className={`flex flex-col items-center justify-center p-3 rounded-2xl hover:shadow-md hover:-translate-y-1 transition-all duration-300 group h-full border ${category.border} ${category.bg} hover:bg-white`}
                            >
                                <div className={`w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm mb-2 group-hover:scale-110 transition-transform duration-300`}>
                                    {React.isValidElement(category.icon) ? React.cloneElement(category.icon as React.ReactElement<any>, { size: 20, className: category.color, strokeWidth: 2.5 }) : null}
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-gray-700 group-hover:text-gray-900 text-center transition-colors line-clamp-1 w-full">{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
