
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
        { name: 'จัดสเปคคอม', icon: <Wrench />, page: 'pcBuilder' as Page, color: 'text-blue-500' },
        { name: 'คอมพิวเตอร์เซต', icon: <Computer />, page: 'computerSet' as Page, color: 'text-orange-500' },
        { name: 'Desktop PC', icon: <Computer />, page: 'desktopComputer' as Page, color: 'text-gray-600' },
        { name: 'AIO PC', icon: <Monitor />, page: 'aioComputer' as Page, color: 'text-teal-500' },
        { name: 'Printer', icon: <Printer />, page: 'printer' as Page, color: 'text-indigo-500' },
        { name: 'CPU', icon: <Cpu />, page: 'cpu' as Page, color: 'text-blue-600' },
        { name: 'Mainboard', icon: <Cog />, page: 'motherboard' as Page, color: 'text-slate-600' },
        { name: 'VGA', icon: <CircuitBoard />, page: 'gpu' as Page, color: 'text-green-500' },
        { name: 'RAM', icon: <MemoryStick />, page: 'ram' as Page, color: 'text-red-500' },
        { name: 'Storage', icon: <HardDrive />, page: 'storage' as Page, color: 'text-purple-500' },
        { name: 'PSU', icon: <Power />, page: 'powerSupply' as Page, color: 'text-yellow-500' },
        { name: 'Cooling', icon: <Wind />, page: 'cooling' as Page, color: 'text-cyan-500' },
        { name: 'Case', icon: <Box />, page: 'case' as Page, color: 'text-gray-700' },
        { name: 'Gaming Gear', icon: <Gamepad2 />, page: 'gamingGear' as Page, color: 'text-pink-500' },
        { name: 'Monitor', icon: <Monitor />, page: 'home' as Page, color: 'text-sky-500' },
        { name: 'Network', icon: <Router />, page: 'network' as Page, color: 'text-emerald-500' },
        { name: 'Software', icon: <FileCode />, page: 'software' as Page, color: 'text-blue-400' },
        { name: 'Server', icon: <Server />, page: 'server' as Page, color: 'text-slate-800' },
    ];

    return (
        <section className="bg-gray-50/50 py-12 border-b border-gray-100">
            <div className="container mx-auto px-4 sm:px-6 2xl:px-8">
                <div className="flex items-center mb-8">
                    <div className="p-2 bg-orange-100 rounded-lg mr-3">
                        <LayoutGrid className="w-6 h-6 text-orange-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 tracking-tight">หมวดหมู่สินค้า</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 2xl:grid-cols-9 gap-4">
                    {categories.map((category) => {
                        return (
                            <button 
                                key={category.name}
                                onClick={() => onNavigate(category.page)}
                                className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-orange-200 hover:-translate-y-1 transition-all duration-300 group h-full"
                            >
                                <div className={`p-3 rounded-full bg-gray-50 group-hover:bg-orange-50 transition-colors mb-3 ${category.color} group-hover:text-orange-600`}>
                                    {React.cloneElement(category.icon as React.ReactElement<any>, { size: 28, strokeWidth: 1.5 })}
                                </div>
                                <span className="text-xs font-semibold text-gray-700 group-hover:text-orange-700 text-center">{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
