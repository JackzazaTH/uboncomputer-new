'use client';
import React from 'react';
import Link from 'next/link';
import { 
    Cpu, Cog, HardDrive, MemoryStick, Power, Wind, CircuitBoard, 
    Laptop, Monitor, Keyboard, Mouse, Gamepad2, Server, Wrench, LayoutGrid,
    Router, FileCode, Box
} from 'lucide-react';

const CategoryGrid: React.FC = () => {
    const categories = [
        { name: 'ซีพียู', icon: <Cpu className="w-6 h-6 text-gray-600" />, href: '/cpu' },
        { name: 'เมนบอร์ด', icon: <Cog className="w-6 h-6 text-gray-600" />, href: '/motherboard' },
        { name: 'การ์ดจอ', icon: <CircuitBoard className="w-6 h-6 text-gray-600" />, href: '/gpu' },
        { name: 'แรม', icon: <MemoryStick className="w-6 h-6 text-gray-600" />, href: '/ram' },
        { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive className="w-6 h-6 text-gray-600" />, href: '/storage' },
        { name: 'พาวเวอร์ซัพพลาย', icon: <Power className="w-6 h-6 text-gray-600" />, href: '/powerSupply' },
        { name: 'ชุดระบายความร้อน', icon: <Wind className="w-6 h-6 text-gray-600" />, href: '/cooling' },
        { name: 'เคส', icon: <Box className="w-6 h-6 text-gray-600" />, href: '/case' },
        { name: 'จัดสเปคคอม', icon: <Wrench className="w-6 h-6 text-gray-600" />, href: '/pc-builder' },
        { name: 'เน็ตเวิร์ค', icon: <Router className="w-6 h-6 text-gray-600" />, href: '/network' },
        { name: 'ซอฟต์แวร์', icon: <FileCode className="w-6 h-6 text-gray-600" />, href: '/software' },
        { name: 'เซิร์ฟเวอร์', icon: <Server className="w-6 h-6 text-gray-600" />, href: '/server' },
    ];

    return (
        <section className="bg-slate-100 py-12">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center mb-6">
                    <LayoutGrid className="w-7 h-7 text-red-500 mr-3" />
                    <h2 className="text-xl font-bold text-gray-800">หมวดหมู่สินค้า</h2>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {categories.map((category) => {
                        const commonClasses = "bg-white rounded-lg p-4 flex items-center space-x-3 shadow-sm hover:shadow-md hover:border-orange-400 border border-transparent transition-all duration-300 w-full text-left";
                        
                         return (
                            <Link 
                                key={category.name}
                                href={category.href}
                                className={commonClasses}
                            >
                                {category.icon}
                                <span className="text-sm font-medium text-gray-700">{category.name}</span>
                            </Link>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default CategoryGrid;
