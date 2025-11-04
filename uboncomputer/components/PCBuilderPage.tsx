import React, { useState, useMemo, useEffect } from 'react';
import { Product } from '../types';
import ProductSelectionModal from './ProductSelectionModal';
import { Cpu, Cog, MemoryStick, CircuitBoard, HardDrive, Power, Fan, Server, ShoppingCart, CheckCircle, XCircle, AlertCircle, Trash2 } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';

interface PCBuilderPageProps {
  products: Product[];
}

const componentConfig = [
  { name: 'CPU', icon: <Cpu className="w-8 h-8 text-gray-500" />, displayName: 'ซีพียู (CPU)' },
  { name: 'Motherboard', icon: <Cog className="w-8 h-8 text-gray-500" />, displayName: 'เมนบอร์ด (Motherboard)' },
  { name: 'RAM', icon: <MemoryStick className="w-8 h-8 text-gray-500" />, displayName: 'แรม (RAM)' },
  { name: 'GPU', icon: <CircuitBoard className="w-8 h-8 text-gray-500" />, displayName: 'การ์ดจอ (VGA)' },
  { name: 'Storage', icon: <HardDrive className="w-8 h-8 text-gray-500" />, displayName: 'อุปกรณ์จัดเก็บข้อมูล (SSD/HDD)' },
  { name: 'Power Supply', icon: <Power className="w-8 h-8 text-gray-500" />, displayName: 'พาวเวอร์ซัพพลาย (PSU)' },
  { name: 'Case', icon: <Server className="w-8 h-8 text-gray-500" />, displayName: 'เคส (Case)' },
  { name: 'Cooling', icon: <Fan className="w-8 h-8 text-gray-500" />, displayName: 'ชุดระบายความร้อน (Cooling)' },
];

type CompatibilityStatus = Record<string, { compatible: boolean; message: string } | null>;

// FIX: Changed to a named export to resolve module resolution error in App.tsx.
export const PCBuilderPage: React.FC<PCBuilderPageProps> = ({ products }) => {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Product | null>>({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectingCategory, setSelectingCategory] = useState<string | null>(null);
  const [compatibilityStatus, setCompatibilityStatus] = useState<CompatibilityStatus>({});
  const { addToast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const newStatus: CompatibilityStatus = {};
    const cpu = selectedComponents['CPU'];
    const motherboard = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];

    // CPU <-> Motherboard Socket Check
    if (cpu && motherboard && cpu.specs?.socket && motherboard.specs?.socket) {
        if (cpu.specs.socket === motherboard.specs.socket) {
            newStatus['CPU'] = { compatible: true, message: `Socket (${cpu.specs.socket}) ตรงกับเมนบอร์ด` };
            newStatus['Motherboard'] = { compatible: true, message: `Socket (${motherboard.specs.socket}) ตรงกับ CPU` };
        } else {
            newStatus['CPU'] = { compatible: false, message: `Socket (${cpu.specs.socket}) ไม่ตรงกับเมนบอร์ด (${motherboard.specs.socket})` };
            newStatus['Motherboard'] = { compatible: false, message: `Socket (${motherboard.specs.socket}) ไม่ตรงกับ CPU (${cpu.specs.socket})` };
        }
    }

    // RAM <-> Motherboard Type Check
    if (ram && motherboard && ram.specs?.ramType && motherboard.specs?.ramType) {
        if (ram.specs.ramType === motherboard.specs.ramType) {
            newStatus['RAM'] = { compatible: true, message: `ชนิด (${ram.specs.ramType}) ตรงกับเมนบอร์ด` };
            // Preserve existing motherboard status if it's an error
            if (!newStatus['Motherboard'] || newStatus['Motherboard']?.compatible) {
                newStatus['Motherboard'] = { ...newStatus['Motherboard'], compatible: true, message: (newStatus['Motherboard']?.message || '') + ' และเข้ากันได้กับ RAM' };
            }
        } else {
            newStatus['RAM'] = { compatible: false, message: `ชนิด (${ram.specs.ramType}) ไม่ตรงกับเมนบอร์ด (${motherboard.specs.ramType})` };
            newStatus['Motherboard'] = { compatible: false, message: `เมนบอร์ดรองรับ ${motherboard.specs.ramType} แต่ RAM เป็น ${ram.specs.ramType}` };
        }
    }
    
    setCompatibilityStatus(newStatus);
  }, [selectedComponents]);

  const handleChooseComponent = (category: string) => {
    setSelectingCategory(category);
    setIsModalOpen(true);
  };

  const handleSelectProduct = (product: Product) => {
    setSelectedComponents(prev => ({ ...prev, [product.category]: product }));
    setIsModalOpen(false);
    setSelectingCategory(null);
  };
  
  const handleRemoveComponent = (categoryName: string) => {
    setSelectedComponents(prev => {
        const newState = {...prev};
        delete newState[categoryName];
        return newState;
    });
  }

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, product) => {
      return sum + (product?.price || 0);
    }, 0);
  }, [selectedComponents]);

  const handleAddToCart = () => {
    const items = Object.values(selectedComponents).filter(Boolean) as Product[];
    if (items.length > 0) {
        items.forEach(item => addToCart(item));
        addToast(`เพิ่ม ${items.length} ชิ้น ลงตะกร้าแล้ว`, 'success');
    } else {
        addToast('กรุณาเลือกส่วนประกอบอย่างน้อย 1 ชิ้น', 'error');
    }
  };

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  const CompatibilityIcon: React.FC<{ status: { compatible: boolean; message: string } | null }> = ({ status }) => {
      // FIX: The `title` prop is not a valid property for lucide-react icons. To provide a tooltip, the icon is wrapped in a `span` with a `title` attribute.
      if (!status) return <span title="ยังไม่ได้ตรวจสอบ"><AlertCircle className="w-5 h-5 text-gray-400" /></span>;
      if (status.compatible) return <span title={status.message}><CheckCircle className="w-5 h-5 text-green-500" /></span>;
      return <span title={status.message}><XCircle className="w-5 h-5 text-red-500" /></span>;
  };

  return (
    <>
      <div className="bg-gray-100">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-8">
                <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">จัดสเปคคอมพิวเตอร์ (DIY)</h1>
                <p className="mt-2 text-gray-600">เลือกส่วนประกอบเพื่อสร้างคอมพิวเตอร์ในฝันของคุณ</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
            
            {/* Component Selection */}
            <div className="lg:col-span-2 space-y-4">
                {componentConfig.map(config => {
                const selected = selectedComponents[config.name];
                const status = compatibilityStatus[config.name];

                return (
                    <div key={config.name} className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center">
                            {/* Part 1: Category Info */}
                            <div className="md:col-span-3 flex flex-row md:flex-col items-center text-center gap-4 md:gap-2 w-full">
                                <div className="flex-shrink-0">{config.icon}</div>
                                <div className="flex-grow text-left md:text-center">
                                    <h3 className="font-bold text-gray-800">{config.displayName}</h3>
                                </div>
                                <div className="md:mt-1 ml-auto md:ml-0 flex-shrink-0">
                                    <CompatibilityIcon status={status} />
                                </div>
                            </div>
                            
                            {/* Part 2: Selected Product */}
                            <div className="md:col-span-6 w-full">
                                {selected ? (
                                    <div className="flex items-center gap-4 w-full bg-gray-50/80 border p-2 rounded-md h-full">
                                        <img src={selected.imageUrl} alt={selected.name} className="w-16 h-16 object-contain flex-shrink-0" />
                                        <div className="flex-grow min-w-0">
                                            <p className="font-semibold text-gray-800 text-sm truncate" title={selected.name}>{selected.name}</p>
                                            <p className="text-orange-600 font-bold">{formatCurrency(selected.price)}</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="text-center text-gray-500 p-6 border-2 border-dashed rounded-md h-full flex items-center justify-center">
                                        <p>ยังไม่ได้เลือกส่วนประกอบ</p>
                                    </div>
                                )}
                            </div>
                    
                            {/* Part 3: Buttons */}
                            <div className="md:col-span-3 w-full flex flex-row md:flex-col items-stretch gap-2">
                                <button 
                                    onClick={() => handleChooseComponent(config.name)}
                                    className="flex-1 px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors"
                                >
                                    {selected ? 'เปลี่ยน' : 'เลือก'}
                                </button>
                                {selected && (
                                    <button 
                                        onClick={() => handleRemoveComponent(config.name)}
                                        className="flex-1 px-4 py-2 text-sm font-bold text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center gap-1"
                                    >
                                        <Trash2 size={16} />
                                        ลบ
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                );
                })}
            </div>

            {/* Desktop Summary */}
            <div className="lg:col-span-1">
                <div className="sticky top-28">
                    <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                        <h2 className="text-xl font-bold text-gray-900 mb-4 border-b pb-4">สรุปรายการ</h2>
                        <div className="space-y-2 mb-4 max-h-80 overflow-y-auto pr-2">
                            {componentConfig.map(config => {
                                const product = selectedComponents[config.name];
                                if (!product) return null;
                                return (
                                    <div key={config.name} className="flex justify-between items-center text-sm">
                                        <span className="font-semibold text-gray-700 w-2/5 truncate">{config.displayName}:</span>
                                        <span className="text-gray-600 w-3/5 text-right truncate" title={product.name}>{product.name}</span>
                                    </div>
                                );
                            })}
                             {Object.keys(selectedComponents).length === 0 && (
                                <p className="text-center text-gray-500 py-4">ยังไม่มีสินค้าในรายการ</p>
                            )}
                        </div>
                        <div className="border-t pt-4">
                            <div className="flex justify-between items-center text-xl font-bold mb-4">
                                <span>ราคารวม:</span>
                                <span className="text-orange-600">{formatCurrency(totalPrice)}</span>
                            </div>
                            <button onClick={handleAddToCart} className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400" disabled={totalPrice === 0}>
                                <ShoppingCart size={20} />
                                เพิ่มลงตะกร้า
                            </button>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
      </div>
      <ProductSelectionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        category={selectingCategory}
        products={products}
        onSelectProduct={handleSelectProduct}
      />
    </>
  );
};
