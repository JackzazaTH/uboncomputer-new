
import React from 'react';
import { 
  X, ChevronRight,
  Wrench, Computer, Laptop, Monitor, Tablet, Cpu, CircuitBoard, Cog, MemoryStick,
  HardDrive, Power, Fan, Server, Box, Router, FileCode, Gamepad2, Printer
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
    { name: 'คอมพิวเตอร์ตั้งโต๊ะ', icon: <Computer />, page: 'desktopComputer' as Page },
    { name: 'คอมพิวเตอร์ AIO', icon: <Monitor />, page: 'aioComputer' as Page },
    { name: 'ปริ้นเตอร์', icon: <Printer />, page: 'printer' as Page },
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
        className="fixed inset-0 bg-white z-[1000] 2xl:hidden animate-fade-in" 
        role="dialog" 
        aria-modal="true"
    >
      <div className="container mx-auto px-4 sm:px-6 h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center py-4 border-b border-gray-100 flex-shrink-0">
             <h2 className="text-xl font-bold text-gray-900">หมวดหมู่สินค้า</h2>
             <button onClick={onClose} className="p-2 -mr-2 rounded-full text-gray-500 hover:bg-gray-100 transition-colors">
               <X className="w-7 h-7" />
             </button>
        </div>

        {/* Content */}
        <div className="flex-grow overflow-y-auto py-6">
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
              {categories.map((category) => (
                <button 
                  key={category.name} 
                  onClick={() => handleAction(category.page)} 
                  className="bg-gray-50 hover:bg-orange-50 border border-gray-200 hover:border-orange-300 rounded-xl p-3 flex flex-col items-center justify-center aspect-square transition-all duration-200 group shadow-sm"
                >
                  <div className="mb-2 p-2 bg-white rounded-full shadow-sm group-hover:scale-110 transition-transform">
                    {React.cloneElement(category.icon, { size: 28, className: "text-gray-500 group-hover:text-orange-600 transition-colors" })}
                  </div>
                  <span className="text-xs sm:text-sm font-bold text-center text-gray-700 group-hover:text-orange-700 transition-colors line-clamp-2 leading-tight">{category.name}</span>
                </button>
              ))}
            </div>
            
            <div className="mt-8 p-4 bg-orange-50 rounded-xl border border-orange-100 text-center">
                <p className="text-sm text-orange-800 font-medium mb-3">ไม่พบสินค้าที่ต้องการ?</p>
                <button 
                    onClick={() => handleAction('allProducts' as Page)}
                    className="w-full py-3 bg-orange-600 text-white rounded-lg font-bold shadow-md active:scale-95 transition-transform"
                >
                    ดูสินค้าทั้งหมด
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
