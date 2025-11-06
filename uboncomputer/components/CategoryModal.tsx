
import React from 'react';
import { 
  X, ChevronRight,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Gamepad2
} from 'lucide-react';
import { Page } from '../types';


interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (page: Page) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({ isOpen, onClose, onNavigate }) => {

  const categories = [
    { name: 'จัดสเปคคอม', icon: <Wrench size={22} className="text-gray-500"/>, page: 'pcBuilder' as Page },
    { name: 'คอมพิวเตอร์เซตโปรโมชั่น', icon: <Computer size={22} className="text-gray-500"/>, page: 'computerSet' as Page },
    { name: 'ซีพียู', icon: <Cpu size={22} className="text-gray-500"/>, page: 'cpu' as Page },
    { name: 'การ์ดจอ', icon: <CircuitBoard size={22} className="text-gray-500"/>, page: 'gpu' as Page },
    { name: 'เมนบอร์ด', icon: <Cog size={22} className="text-gray-500"/>, page: 'motherboard' as Page },
    { name: 'แรม', icon: <MemoryStick size={22} className="text-gray-500"/>, page: 'ram' as Page },
    { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive size={22} className="text-gray-500"/>, page: 'storage' as Page },
    { name: 'พาวเวอร์ซัพพลาย', icon: <Power size={22} className="text-gray-500"/>, page: 'powerSupply' as Page },
    { name: 'เคส', icon: <Box size={22} className="text-gray-500"/>, page: 'case' as Page },
    { name: 'ชุดระบายความร้อน', icon: <Fan size={22} className="text-gray-500"/>, page: 'cooling' as Page },
    { name: 'เกมมิ่งเกียร์', icon: <Gamepad2 size={22} className="text-gray-500"/>, page: 'gamingGear' as Page },
    // Placeholders
    { name: 'โน้ตบุ๊ค', icon: <Laptop size={22} className="text-gray-500"/>, page: 'home' as Page },
    { name: 'คอมพิวเตอร์ตั้งโต๊ะ', icon: <Monitor size={22} className="text-gray-500"/>, page: 'home' as Page },
    { name: 'เน็ตเวิร์ค', icon: <Router size={22} className="text-gray-500"/>, page: 'network' as Page },
    { name: 'ซอฟต์แวร์', icon: <FileCode size={22} className="text-gray-500"/>, page: 'software' as Page },
    { name: 'เซิร์ฟเวอร์', icon: <Server size={22} className="text-gray-500"/>, page: 'server' as Page },
  ];

  if (!isOpen) return null;

  const handleAction = (page: Page) => {
    onNavigate(page);
    onClose();
  };

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
             <button onClick={onClose} className="p-2 -mr-2 rounded-full text-gray-700 hover:bg-gray-100 transition-colors">
               <X className="w-6 h-6" />
             </button>
          </div>
          <div className="flex-grow overflow-y-auto -mt-2">
            <ul className="py-4">
              {categories.map((category) => (
                <li key={category.name}>
                 <button onClick={() => handleAction(category.page)} className="w-full flex items-center justify-between px-2 py-4 text-md text-gray-700 hover:bg-gray-100 rounded-lg transition-colors duration-150">
                    <div className="flex items-center">
                      {category.icon}
                      <span className="ml-4 font-medium">{category.name}</span>
                    </div>
                    <ChevronRight size={20} className="text-gray-400" />
                 </button>
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