
import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '../types';
import { 
  Cpu, Cog, MemoryStick, CircuitBoard, HardDrive, Power, Fan, Server as CaseIcon, 
  ShoppingCart, CheckCircle, AlertCircle, Trash2, RefreshCw, Save, Printer, 
  Monitor, Plus, XCircle, ArrowRight, PackageOpen, FileDown
} from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';
import ProductSelectionModal from './ProductSelectionModal';

declare var html2canvas: any;
declare var jspdf: any;

interface PCBuilderPageProps {
  products: Product[];
}

// Config including which components are 'core' vs 'optional'
const componentConfig = [
  { name: 'CPU', icon: <Cpu className="w-6 h-6" />, displayName: 'ซีพียู (CPU)', required: true },
  { name: 'Motherboard', icon: <Cog className="w-6 h-6" />, displayName: 'เมนบอร์ด', required: true },
  { name: 'GPU', icon: <CircuitBoard className="w-6 h-6" />, displayName: 'การ์ดจอ (VGA)', required: true },
  { name: 'RAM', icon: <MemoryStick className="w-6 h-6" />, displayName: 'แรม (RAM)', required: true },
  { name: 'Storage', icon: <HardDrive className="w-6 h-6" />, displayName: 'SSD / HDD', required: true },
  { name: 'Power Supply', icon: <Power className="w-6 h-6" />, displayName: 'พาวเวอร์ซัพพลาย', required: true },
  { name: 'Case', icon: <CaseIcon className="w-6 h-6" />, displayName: 'เคส (Case)', required: true },
  { name: 'Cooling', icon: <Fan className="w-6 h-6" />, displayName: 'ชุดระบายความร้อน', required: false },
  { name: 'Monitor', icon: <Monitor className="w-6 h-6" />, displayName: 'จอมอนิเตอร์', required: false },
];

type CompatibilityStatus = { compatible: boolean; messages: string[] };

export const PCBuilderPage: React.FC<PCBuilderPageProps> = ({ products }) => {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Product | null>>({});
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [compatibility, setCompatibility] = useState<CompatibilityStatus>({ compatible: true, messages: [] });
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const quotationRef = useRef<HTMLDivElement>(null);
  
  const { addToast } = useToast();
  const { addToCart } = useCart();

  // --- Compatibility Logic ---
  useEffect(() => {
    const messages: string[] = [];
    let isCompatible = true;
    
    const cpu = selectedComponents['CPU'];
    const motherboard = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];

    // Check CPU & Motherboard Socket
    if (cpu && motherboard && cpu.specs?.socket && motherboard.specs?.socket) {
        if (cpu.specs.socket !== motherboard.specs.socket) {
            isCompatible = false;
            messages.push(`Socket ไม่ตรงกัน: CPU (${cpu.specs.socket}) vs MB (${motherboard.specs.socket})`);
        }
    }

    // Check RAM & Motherboard Type
    if (ram && motherboard && ram.specs?.ramType && motherboard.specs?.ramType) {
        // Simple check (starts with) to handle DDR4 vs DDR4-3200 mismatch nuances if strings differ slightly
        if (!motherboard.specs.ramType.includes(ram.specs.ramType) && !ram.specs.ramType.includes(motherboard.specs.ramType)) {
            isCompatible = false;
            messages.push(`ชนิด RAM ไม่ตรงกัน: MB รองรับ ${motherboard.specs.ramType} แต่เลือก ${ram.specs.ramType}`);
        }
    }

    setCompatibility({ compatible: isCompatible, messages });
  }, [selectedComponents]);

  // --- Actions ---
  const handleSelectProduct = (product: Product) => {
    setSelectedComponents(prev => ({ ...prev, [product.category]: product }));
    // Optional: Auto-advance logic could go here
  };

  const handleRemoveComponent = (category: string) => {
    setSelectedComponents(prev => {
        const newState = { ...prev };
        delete newState[category];
        return newState;
    });
  };

  const handleClearAll = () => {
      if(window.confirm('ต้องการล้างรายการจัดสเปคทั้งหมดหรือไม่?')) {
          setSelectedComponents({});
      }
  }

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, product) => sum + (product?.price || 0), 0);
  }, [selectedComponents]);

  const formatCurrency = (amount: number) => 
    new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

  const handleAddToCart = () => {
    const items = Object.values(selectedComponents).filter(Boolean) as Product[];
    if (items.length === 0) {
        addToast('กรุณาเลือกอุปกรณ์อย่างน้อย 1 ชิ้น', 'error');
        return;
    }
    items.forEach(item => addToCart(item));
    addToast(`เพิ่มสินค้า ${items.length} รายการลงตะกร้าแล้ว`, 'success');
  };

  // --- Helper for Modal Filtering ---
  const getCompatibilityFilterMessage = (category: string): string | null => {
    const cpu = selectedComponents['CPU'];
    const motherboard = selectedComponents['Motherboard'];

    if (category === 'Motherboard' && cpu?.specs?.socket) return `แสดงเมนบอร์ด Socket ${cpu.specs.socket}`;
    if (category === 'CPU' && motherboard?.specs?.socket) return `แสดง CPU Socket ${motherboard.specs.socket}`;
    if (category === 'RAM' && motherboard?.specs?.ramType) return `แสดง RAM ชนิด ${motherboard.specs.ramType}`;
    return null;
  };

  const getFilteredProductsForModal = (category: string) => {
    let filtered = products.filter(p => p.category === category);
    const cpu = selectedComponents['CPU'];
    const motherboard = selectedComponents['Motherboard'];

    // Apply strict filtering for compatibility
    if (category === 'Motherboard' && cpu?.specs?.socket) {
        filtered = filtered.filter(p => p.specs?.socket === cpu.specs.socket);
    }
    if (category === 'CPU' && motherboard?.specs?.socket) {
        filtered = filtered.filter(p => p.specs?.socket === motherboard.specs.socket);
    }
    if (category === 'RAM' && motherboard?.specs?.ramType) {
         // Loose match for DDR4/DDR5 strings
         filtered = filtered.filter(p => p.specs?.ramType && motherboard.specs?.ramType && (p.specs.ramType.includes(motherboard.specs.ramType) || motherboard.specs.ramType.includes(p.specs.ramType)));
    }
    return filtered;
  };


  // --- Printing / Saving ---
  const handleSaveAsImage = async () => {
     if (!quotationRef.current) return;
     try {
         const canvas = await html2canvas(quotationRef.current, { scale: 2, useCORS: true });
         const link = document.createElement('a');
         link.download = `SPEC-UBONCOM-${Date.now()}.png`;
         link.href = canvas.toDataURL('image/png');
         link.click();
     } catch (err) { console.error(err); addToast('เกิดข้อผิดพลาดในการบันทึกภาพ', 'error'); }
  };

  const QuotationPreview = () => {
      const items = Object.values(selectedComponents).filter(Boolean) as Product[];
      const date = new Date().toLocaleDateString('th-TH', { year: 'numeric', month: 'long', day: 'numeric' });

      return (
        <div className="fixed inset-0 bg-black/70 z-[100] flex justify-center items-center p-4 overflow-y-auto backdrop-blur-sm">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl flex flex-col max-h-[90vh] animate-slide-in-up">
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-xl font-bold text-gray-800 flex items-center gap-2"><Printer size={20}/> ใบเสนอราคา / สรุปสเปค</h3>
                    <button onClick={() => setShowPreviewModal(false)} className="p-2 hover:bg-gray-100 rounded-full"><XCircle size={24} className="text-gray-500"/></button>
                </div>
                
                <div className="flex-grow overflow-y-auto p-6 bg-gray-50">
                    <div ref={quotationRef} className="bg-white p-8 shadow-sm mx-auto max-w-2xl text-gray-800 border border-gray-200">
                         <div className="flex justify-between items-start mb-8 border-b pb-6">
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">UBON<span className="text-orange-500">COMPUTER</span></h1>
                                <p className="text-sm text-gray-500 mt-1">Technology Store</p>
                            </div>
                            <div className="text-right">
                                <div className="text-lg font-bold text-gray-800">ใบเสนอราคา</div>
                                <div className="text-sm text-gray-500">{date}</div>
                            </div>
                        </div>
                        <table className="w-full text-sm mb-6">
                            <thead>
                                <tr className="border-b-2 border-gray-100">
                                    <th className="text-left py-2 font-bold text-gray-600">รายการสินค้า</th>
                                    <th className="text-right py-2 font-bold text-gray-600 w-32">ราคา</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {items.map((item, idx) => (
                                    <tr key={idx}>
                                        <td className="py-3 pr-4">
                                            <div className="font-semibold text-gray-800">{item.category}</div>
                                            <div className="text-gray-600 text-xs mt-0.5">{item.name}</div>
                                        </td>
                                        <td className="py-3 text-right font-medium text-gray-900">{formatCurrency(item.price)}</td>
                                    </tr>
                                ))}
                            </tbody>
                            <tfoot>
                                <tr className="border-t-2 border-gray-800">
                                    <td className="py-4 font-bold text-lg text-right pr-4">ยอดรวมสุทธิ</td>
                                    <td className="py-4 font-bold text-lg text-right text-orange-600">{formatCurrency(totalPrice)}</td>
                                </tr>
                            </tfoot>
                        </table>
                        <div className="text-xs text-center text-gray-400 mt-10">
                            เอกสารนี้สร้างขึ้นอัตโนมัติจากเว็บไซต์ Uboncomputer.com
                        </div>
                    </div>
                </div>

                <div className="p-4 border-t bg-white flex justify-end gap-3">
                    <button onClick={handleSaveAsImage} className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900 font-medium">
                        <FileDown size={18} /> บันทึกรูปภาพ
                    </button>
                    <button onClick={handleAddToCart} className="flex items-center gap-2 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-bold">
                        <ShoppingCart size={18} /> สั่งซื้อเลย
                    </button>
                </div>
            </div>
        </div>
      )
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32">
       {/* Header / Toolbar */}
       <div className="bg-white shadow-sm border-b sticky top-[120px] 2xl:top-[160px] z-30">
           <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
               <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                   <div>
                       <h1 className="text-2xl font-extrabold text-gray-900 flex items-center gap-2">
                           <PackageOpen className="text-orange-500"/> จัดสเปคคอมพิวเตอร์
                       </h1>
                       <p className="text-sm text-gray-500 hidden md:block">เลือกอุปกรณ์ที่ต้องการ ทางเรามีบริการประกอบและจัดส่งฟรี</p>
                   </div>
                   
                   {/* Compatibility Indicator */}
                   <div className={`px-4 py-2 rounded-lg border flex items-center gap-3 text-sm font-medium ${compatibility.compatible ? 'bg-green-50 border-green-200 text-green-700' : 'bg-red-50 border-red-200 text-red-700'}`}>
                       {compatibility.compatible ? (
                           <><CheckCircle className="w-5 h-5"/> ระบบเข้ากันได้สมบูรณ์</>
                       ) : (
                           <><AlertCircle className="w-5 h-5"/> {compatibility.messages[0] || 'พบปัญหาความเข้ากันไม่ได้'}</>
                       )}
                   </div>
                   
                   <div className="flex gap-2">
                       <button onClick={handleClearAll} className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors" title="ล้างทั้งหมด"><Trash2 size={20}/></button>
                       <button onClick={() => setShowPreviewModal(true)} className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 shadow-sm">
                           <Printer size={18}/> <span className="hidden sm:inline">ใบเสนอราคา</span>
                       </button>
                   </div>
               </div>
           </div>
       </div>

       {/* Main Grid */}
       <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
           <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
               {componentConfig.map((comp) => {
                   const product = selectedComponents[comp.name];
                   return (
                       <div 
                           key={comp.name} 
                           className={`relative rounded-2xl p-4 transition-all duration-300 border-2 group
                               ${product 
                                   ? 'bg-white border-orange-200 shadow-md hover:border-orange-400' 
                                   : 'bg-white border-gray-200 hover:border-gray-300 border-dashed hover:bg-gray-50'
                               }
                           `}
                       >
                           <div className="flex items-start justify-between mb-3">
                               <div className="flex items-center gap-3">
                                   <div className={`p-2.5 rounded-xl ${product ? 'bg-orange-100 text-orange-600' : 'bg-gray-100 text-gray-400'}`}>
                                       {React.cloneElement(comp.icon as React.ReactElement<any>, { size: 24 })}
                                   </div>
                                   <div>
                                       <h3 className={`font-bold text-base ${product ? 'text-gray-900' : 'text-gray-500'}`}>{comp.displayName}</h3>
                                       {comp.required && !product && <span className="text-[10px] text-red-500 font-medium px-1.5 py-0.5 bg-red-50 rounded">จำเป็น</span>}
                                   </div>
                               </div>
                               {product && (
                                   <button onClick={() => handleRemoveComponent(comp.name)} className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-50 transition-colors">
                                       <Trash2 size={18} />
                                   </button>
                               )}
                           </div>

                           {product ? (
                               <div className="flex gap-4 mt-2">
                                   <div className="w-20 h-20 bg-white rounded-lg border border-gray-100 p-1 flex-shrink-0">
                                       <img src={product.imageUrls[0]} alt={product.name} className="w-full h-full object-contain" />
                                   </div>
                                   <div className="flex-grow min-w-0 flex flex-col justify-between">
                                       <p className="text-sm text-gray-800 font-medium line-clamp-2 leading-snug" title={product.name}>{product.name}</p>
                                       <div className="flex justify-between items-end mt-1">
                                            <div className="text-orange-600 font-extrabold text-lg">{formatCurrency(product.price)}</div>
                                            <button onClick={() => setActiveCategory(comp.name)} className="text-xs font-bold text-blue-600 hover:underline flex items-center">เปลี่ยน <RefreshCw size={10} className="ml-1"/></button>
                                       </div>
                                   </div>
                               </div>
                           ) : (
                               <div className="flex flex-col items-center justify-center py-6 text-center">
                                   <button 
                                       onClick={() => setActiveCategory(comp.name)}
                                       className="flex items-center gap-2 bg-gray-900 text-white px-5 py-2.5 rounded-full font-bold shadow-sm hover:shadow-md hover:scale-105 transition-all active:scale-95"
                                   >
                                       <Plus size={18} strokeWidth={3} /> เลือกอุปกรณ์
                                   </button>
                               </div>
                           )}
                       </div>
                   );
               })}
           </div>
       </div>

       {/* Sticky Bottom Bar (Total) */}
       <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-[0_-4px_20px_rgba(0,0,0,0.1)] z-40 p-4 pb-6 md:pb-4 animate-slide-in-up">
            <div className="container mx-auto px-4 flex flex-col sm:flex-row justify-between items-center gap-4">
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-start">
                     <div className="text-gray-500 text-sm font-medium hidden sm:block">รวมทั้งหมด {Object.keys(selectedComponents).length} ชิ้น</div>
                     <div className="text-right sm:text-left">
                         <p className="text-xs text-gray-500 font-medium">ราคารวมสุทธิ</p>
                         <p className="text-3xl font-black text-orange-600 leading-none">{formatCurrency(totalPrice)}</p>
                     </div>
                </div>
                <button 
                    onClick={handleAddToCart}
                    className="w-full sm:w-auto flex items-center justify-center gap-3 bg-gradient-to-r from-orange-600 to-red-600 text-white font-bold text-lg py-3 px-8 rounded-xl shadow-lg hover:shadow-orange-500/30 transition-all transform hover:-translate-y-1 active:scale-95"
                >
                    <ShoppingCart size={24} />
                    สั่งซื้อชุดนี้
                </button>
            </div>
       </div>
       
       {/* Selection Modal */}
       <ProductSelectionModal 
            isOpen={!!activeCategory}
            onClose={() => setActiveCategory(null)}
            category={activeCategory}
            products={products}
            onSelectProduct={handleSelectProduct}
            currentSelection={activeCategory ? selectedComponents[activeCategory] : null}
            compatibilityMessage={activeCategory ? getCompatibilityFilterMessage(activeCategory) : null}
       />

       {/* Preview/Print Modal */}
       {showPreviewModal && <QuotationPreview />}
    </div>
  );
};
