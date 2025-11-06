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
    { name: 'จัดสเปคคอม', icon: <Wrench />, page: 'pcBuilder' as Page },
    { name: 'คอมพิวเตอร์เซต', icon: <Computer />, page: 'computerSet' as Page },
    { name: 'ซีพียู', icon: <Cpu />, page: 'cpu' as Page },
    { name: 'การ์ดจอ', icon: <CircuitBoard />, page: 'gpu' as Page },
    { name: 'เมนบอร์ด', icon: <Cog />, page: 'motherboard' as Page },
    { name: 'แรม', icon: <MemoryStick />, page: 'ram' as Page },
    { name: 'อุปกรณ์จัดเก็บข้อมูล', icon: <HardDrive />, page: 'storage' as Page },
    { name: 'พาวเวอร์ซัพพลาย', icon: <Power />, page: 'powerSupply' as Page },
    { name: 'เคส', icon: <Box />, page: 'case' as Page },
    { name: 'ชุดระบายความร้อน', icon: <Fan />, page: 'cooling' as Page },
    { name: 'เกมมิ่งเกียร์', icon: <Gamepad2 />, page: 'gamingGear' as Page },
    { name: 'โน้ตบุ๊ค', icon: <Laptop />, page: 'home' as Page },
    { name: 'เน็ตเวิร์ค', icon: <Router />, page: 'network' as Page },
    { name: 'ซอฟต์แวร์', icon: <FileCode />, page: 'software' as Page },
    { name: 'เซิร์ฟเวอร์', icon: <Server />, page: 'server' as Page },
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
          <div className="flex-grow overflow-y-auto -mt-2 p-4">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button 
                  key={category.name} 
                  onClick={() => handleAction(category.page)} 
                  className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-lg p-2 flex flex-col items-center justify-center aspect-square transition-all duration-200 group"
                >
                  {React.cloneElement(category.icon, { size: 32, className: "text-gray-500 group-hover:text-orange-600 transition-colors" })}
                  <span className="text-xs sm:text-sm font-medium text-center mt-2 text-gray-700 group-hover:text-orange-600 transition-colors">{category.name}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;