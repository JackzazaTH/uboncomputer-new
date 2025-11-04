'use client';
import React from 'react';
import Link from 'next/link';
import { 
  X, ChevronRight,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode
} from 'lucide-react';
import { Page } from '../types';

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose }) => {

  const categories = [
    { name: 'จัดสเปคคอม', icon: <Wrench size={22} className="text-gray-500"/>, href: '/pc-builder' },
    { name: 'คอมพิวเตอร์เซตโปรโมชั่น', icon: <Computer size={22} className="text-gray-500"/>, href: '/computer-set' },
    { name: 'ซีพียู', icon: <Cpu size={22} className="text-gray-500"/>, href: '/cpu' },
    { name: 'การ์ดจอ', icon: <CircuitBoard size={22} className="text-gray-500"/>, href: '/gpu' },
    { name: 'เมนบอร์ด', icon: <Cog size={22} className="text-gray-500"/>, href: '/motherboard' },
    { name: 'แรม', icon: <MemoryStick size={22} className="text-gray-500"/>, href: '/ram' },
    { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive size={22} className="text-gray-500"/>, href: '/storage' },
    { name: 'พาวเวอร์ซัพพลาย', icon: <Power size={22} className="text-gray-500"/>, href: '/powerSupply' },
    { name: 'เคส', icon: <Box size={22} className="text-gray-500"/>, href: '/case' },
    { name: 'ชุดระบายความร้อน', icon: <Fan size={22} className="text-gray-500"/>, href: '/cooling' },
    { name: 'เน็ตเวิร์ค', icon: <Router size={22} className="text-gray-500"/>, href: '/network' },
    { name: 'ซอฟต์แวร์', icon: <FileCode size={22} className="text-gray-500"/>, href: '/software' },
    { name: 'เซิร์ฟเวอร์', icon: <Server size={22} className="text-gray-500"/>, href: '/server' },
  ];

  if (!isOpen) return null;

  return (
    <div 
        className="fixed inset-0 bg-white z-[60] lg:hidden animate-fade-in" 
        role="dialog" 
        aria-modal="true"
    >
      <div className="container mx-auto px-4 sm:px-6 h-full">
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center h-20">
             <div className="w-10"></div> {/* Spacer */}
             <h2 className="text-lg font-bold text-gray-900">หมวดหมู่สินค้า</h2>
             <button onClick={onClose} className="p-2 -mr-2 rounded-full hover:bg-gray-100 transition-colors">
               <X className="w-6 h-6 text-gray-700" />
             </button>
          </div>
          <div className="flex-grow overflow-y-auto -mt-2">
            <ul className="py-4">
              {categories.map((category) => (
                <li key={category.name}>
                 <Link href={category.href} onClick={onClose} className="w-full flex items-center justify-between px-2 py-4 text-md text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-4 font-medium">{category.name}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                 </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
