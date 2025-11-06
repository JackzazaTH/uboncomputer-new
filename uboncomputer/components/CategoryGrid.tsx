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
    // FIX: Removed explicit type annotation to allow TypeScript to infer it, resolving JSX namespace issues.
    const categories = [
        { name: 'จัดสเปคคอม', icon: <Wrench className="w-6 h-6 text-gray-600" />, page: 'pcBuilder' as Page },
        { name: 'คอมพิวเตอร์ตั้งโต๊ะ', icon: <Computer className="w-6 h-6 text-gray-600" />, page: 'desktopComputer' as Page },
        { name: 'คอมพิวเตอร์ AIO', icon: <Monitor className="w-6 h-6 text-gray-600" />, page: 'aioComputer' as Page },
        { name: 'ปริ้นเตอร์', icon: <Printer className="w-6 h-6 text-gray-600" />, page: 'printer' as Page },
        { name: 'ซีพียู', icon: <Cpu className="w-6 h-6 text-gray-600" />, page: 'cpu' as Page },
        { name: 'เมนบอร์ด', icon: <Cog className="w-6 h-6 text-gray-600" />, page: 'motherboard' as Page },
        { name: 'การ์ดจอ', icon: <CircuitBoard className="w-6 h-6 text-gray-600" />, page: 'gpu' as Page },
        { name: 'แรม', icon: <MemoryStick className="w-6 h-6 text-gray-600" />, page: 'ram' as Page },
        { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive className="w-6 h-6 text-gray-600" />, page: 'storage' as Page },
        { name: 'พาวเวอร์ซัพพลาย', icon: <Power className="w-6 h-6 text-gray-600" />, page: 'powerSupply' as Page },
        { name: 'ชุดระบายความร้อน', icon: <Wind className="w-6 h-6 text-gray-600" />, page: 'cooling' as Page },
        { name: 'เคส', icon: <Box className="w-6 h-6 text-gray-600" />, page: 'case' as Page },
        { name: 'เกมมิ่งเกียร์', icon: <Gamepad2 className="w-6 h-6 text-gray-600" />, page: 'gamingGear' as Page },
        { name: 'โน้ตบุ๊ค', icon: <Laptop className="w-6 h-6 text-gray-600" />, page: 'home' as Page },
        { name: 'จอมอนิเตอร์', icon: <Monitor className="w-6 h-6 text-gray-600" />, page: 'home' as Page },
        { name: 'คีย์บอร์ด', icon: <Keyboard className="w-6 h-6 text-gray-600" />, page: 'home' as Page },
        { name: 'เมาส์', icon: <Mouse className="w-6 h-6 text-gray-600" />, page: 'home' as Page },
        { name: 'เน็ตเวิร์ค', icon: <Router className="w-6 h-6 text-gray-600" />, page: 'network' as Page },
        { name: 'ซอฟต์แวร์', icon: <FileCode className="w-6 h-6 text-gray-600" />, page: 'software' as Page },
        { name: 'เซิร์ฟเวอร์', icon: <Server className="w-6 h-6 text-gray-600" />, page: 'server' as Page },
    ];

    return (
        <section className="bg-slate-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <LayoutGrid className="w-7 h-7 text-red-500 mr-3" />
                    <h2 className="text-xl font-bold text-gray-800">หมวดหมู่สินค้า</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
                    {categories.map((category) => {
                        const commonClasses = "bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:border-orange-400 border border-transparent transition-all duration-300 w-full text-left";
                        
                         return (
                            <button 
                                key={category.name}
                                onClick={() => onNavigate(category.page)}
                                className={commonClasses}
                            >
                                {category.icon}
                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;