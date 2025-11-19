
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
        { name: 'จัดสเปคคอม', icon: <Wrench />, page: 'pcBuilder' as Page, color: 'text-blue-600 bg-blue-50' },
        { name: 'คอมพิวเตอร์เซต', icon: <Computer />, page: 'computerSet' as Page, color: 'text-orange-600 bg-orange-50' },
        { name: 'Desktop PC', icon: <Computer />, page: 'desktopComputer' as Page, color: 'text-gray-700 bg-gray-100' },
        { name: 'AIO PC', icon: <Monitor />, page: 'aioComputer' as Page, color: 'text-teal-600 bg-teal-50' },
        { name: 'Printer', icon: <Printer />, page: 'printer' as Page, color: 'text-indigo-600 bg-indigo-50' },
        { name: 'CPU', icon: <Cpu />, page: 'cpu' as Page, color: 'text-blue-600 bg-blue-50' },
        { name: 'Mainboard', icon: <Cog />, page: 'motherboard' as Page, color: 'text-slate-700 bg-slate-100' },
        { name: 'VGA', icon: <CircuitBoard />, page: 'gpu' as Page, color: 'text-green-600 bg-green-50' },
        { name: 'RAM', icon: <MemoryStick />, page: 'ram' as Page, color: 'text-red-600 bg-red-50' },
        { name: 'Storage', icon: <HardDrive />, page: 'storage' as Page, color: 'text-purple-600 bg-purple-50' },
        { name: 'PSU', icon: <Power />, page: 'powerSupply' as Page, color: 'text-yellow-600 bg-yellow-50' },
        { name: 'Cooling', icon: <Wind />, page: 'cooling' as Page, color: 'text-cyan-600 bg-cyan-50' },
        { name: 'Case', icon: <Box />, page: 'case' as Page, color: 'text-gray-700 bg-gray-50' },
        { name: 'Gaming Gear', icon: <Gamepad2 />, page: 'gamingGear' as Page, color: 'text-pink-600 bg-pink-50' },
        { name: 'Monitor', icon: <Monitor />, page: 'home' as Page, color: 'text-sky-600 bg-sky-50' },
        { name: 'Network', icon: <Router />, page: 'network' as Page, color: 'text-emerald-600 bg-emerald-50' },
        { name: 'Software', icon: <FileCode />, page: 'software' as Page, color: 'text-blue-500 bg-blue-50' },
        { name: 'Server', icon: <Server />, page: 'server' as Page, color: 'text-slate-800 bg-slate-100' },
    ];

    return (
        <section className="bg-white py-8 border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
                <div className="flex items-center mb-6">
                    <div className="p-2 bg-orange-100 rounded-xl mr-3 shadow-sm">
                        <LayoutGrid className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">หมวดหมู่สินค้า</h2>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-9 gap-3 sm:gap-4">
                    {categories.map((category) => {
                        return (
                            <button 
                                key={category.name}
                                onClick={() => onNavigate(category.page)}
                                className="flex flex-col items-center justify-center p-3 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 group h-full"
                            >
                                <div className={`p-2.5 rounded-xl transition-colors mb-2 ${category.color} group-hover:scale-110 duration-300`}>
                                    {React.isValidElement(category.icon) ? React.cloneElement(category.icon as React.ReactElement<any>, { size: 24, strokeWidth: 1.5 }) : null}
                                </div>
                                <span className="text-[10px] sm:text-xs font-bold text-gray-700 group-hover:text-orange-600 text-center transition-colors line-clamp-1">{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
