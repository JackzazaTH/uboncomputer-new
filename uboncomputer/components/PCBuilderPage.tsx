

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { Product } from '../types';
// FIX: Import 'X' icon from 'lucide-react' to resolve 'Cannot find name 'X'' error.
import { Cpu, Cog, MemoryStick, CircuitBoard, HardDrive, Power, Fan, Server as CaseIcon, ShoppingCart, CheckCircle, XCircle, AlertCircle, Trash2, Search, SlidersHorizontal, ArrowLeft, X, Camera, FileText } from 'lucide-react';
import { useToast } from '../hooks/useToast';
import { useCart } from '../hooks/useCart';

declare var html2canvas: any;
declare var jspdf: any;

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
  { name: 'Case', icon: <CaseIcon className="w-8 h-8 text-gray-500" />, displayName: 'เคส (Case)' },
  { name: 'Cooling', icon: <Fan className="w-8 h-8 text-gray-500" />, displayName: 'ชุดระบายความร้อน (Cooling)' },
];

type CompatibilityStatus = Record<string, { compatible: boolean; message: string } | null>;

export const PCBuilderPage: React.FC<PCBuilderPageProps> = ({ products }) => {
  const [selectedComponents, setSelectedComponents] = useState<Record<string, Product | null>>({});
  const [activeSelectionCategory, setActiveSelectionCategory] = useState<string | null>(componentConfig[0].name);
  const [compatibilityStatus, setCompatibilityStatus] = useState<CompatibilityStatus>({});
  const { addToast } = useToast();
  const { addToCart } = useCart();
  
  // States for filtering/sorting, moved from modal
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('price_asc');

  useEffect(() => {
    // Reset filters when category changes
    setSearchTerm('');
    setSortOption('price_asc');
  }, [activeSelectionCategory]);

  useEffect(() => {
    const newStatus: CompatibilityStatus = {};
    const cpu = selectedComponents['CPU'];
    const motherboard = selectedComponents['Motherboard'];
    const ram = selectedComponents['RAM'];

    if (cpu && motherboard && cpu.specs?.socket && motherboard.specs?.socket) {
        if (cpu.specs.socket === motherboard.specs.socket) {
            newStatus['CPU'] = { compatible: true, message: `Socket (${cpu.specs.socket}) ตรงกับเมนบอร์ด` };
            newStatus['Motherboard'] = { compatible: true, message: `Socket (${motherboard.specs.socket}) ตรงกับ CPU` };
        } else {
            newStatus['CPU'] = { compatible: false, message: `Socket (${cpu.specs.socket}) ไม่ตรงกับเมนบอร์ด (${motherboard.specs.socket})` };
            newStatus['Motherboard'] = { compatible: false, message: `Socket (${motherboard.specs.socket}) ไม่ตรงกับ CPU (${cpu.specs.socket})` };
        }
    }

    if (ram && motherboard && ram.specs?.ramType && motherboard.specs?.ramType) {
        if (ram.specs.ramType === motherboard.specs.ramType) {
            newStatus['RAM'] = { compatible: true, message: `ชนิด (${ram.specs.ramType}) ตรงกับเมนบอร์ด` };
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

  const handleSelectProduct = (product: Product) => {
    const updatedSelected = { ...selectedComponents, [product.category]: product };
    setSelectedComponents(updatedSelected);

    const currentIndex = componentConfig.findIndex(c => c.name === product.category);
    let nextCategory: string | null = null;
    
    for (let i = currentIndex + 1; i < componentConfig.length; i++) {
        if (!updatedSelected[componentConfig[i].name]) {
            nextCategory = componentConfig[i].name;
            break;
        }
    }
    if (!nextCategory) {
         for (let i = 0; i < currentIndex; i++) {
            if (!updatedSelected[componentConfig[i].name]) {
                nextCategory = componentConfig[i].name;
                break;
            }
        }
    }
    setActiveSelectionCategory(nextCategory);
  };
  
  const handleRemoveComponent = (categoryName: string) => {
    setSelectedComponents(prev => {
        const newState = {...prev};
        delete newState[categoryName];
        return newState;
    });
    // If we remove the currently active selection, move to the next empty one or show summary
    if (activeSelectionCategory === categoryName) {
        setActiveSelectionCategory(categoryName);
    }
  }
  
  const continueBuilding = () => {
    const firstEmpty = componentConfig.find(c => !selectedComponents[c.name]);
    setActiveSelectionCategory(firstEmpty ? firstEmpty.name : componentConfig[0].name);
  }

  const totalPrice = useMemo(() => {
    return Object.values(selectedComponents).reduce((sum, product) => sum + (product?.price || 0), 0);
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
  
  const formatNumber = (amount: number) =>
    new Intl.NumberFormat('th-TH', { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(amount);


  const CompatibilityIcon: React.FC<{ status: { compatible: boolean; message: string } | null }> = ({ status }) => {
      if (!status) return <span title="ยังไม่ได้ตรวจสอบ"><AlertCircle className="w-5 h-5 text-gray-400" /></span>;
      if (status.compatible) return <span title={status.message}><CheckCircle className="w-5 h-5 text-green-500" /></span>;
      return <span title={status.message}><XCircle className="w-5 h-5 text-red-500" /></span>;
  };

  // Logic for the right pane (selector)
  const categoryProducts = useMemo(() => {
    if (!activeSelectionCategory) return [];
    return products.filter(p => p.category === activeSelectionCategory);
  }, [products, activeSelectionCategory]);

  const compatibilityFilterMessage = useMemo(() => {
    const selectedCPU = selectedComponents['CPU'];
    const selectedMotherboard = selectedComponents['Motherboard'];

    if (activeSelectionCategory === 'Motherboard' && selectedCPU?.name) {
        return `แสดงเฉพาะเมนบอร์ดที่เข้ากันได้กับ CPU: ${selectedCPU.name}`;
    }
    if (activeSelectionCategory === 'CPU' && selectedMotherboard?.name) {
        return `แสดงเฉพาะ CPU ที่เข้ากันได้กับเมนบอร์ด: ${selectedMotherboard.name}`;
    }
    if (activeSelectionCategory === 'RAM' && selectedMotherboard?.name) {
        return `แสดงเฉพาะ RAM ที่เข้ากันได้กับเมนบอร์ด: ${selectedMotherboard.name}`;
    }
    return null;
  }, [activeSelectionCategory, selectedComponents]);

  const processedProducts = useMemo(() => {
    let compatibleProducts = [...categoryProducts];
    const selectedCPU = selectedComponents['CPU'];
    const selectedMotherboard = selectedComponents['Motherboard'];

    if (activeSelectionCategory === 'Motherboard' && selectedCPU?.specs?.socket) {
        compatibleProducts = compatibleProducts.filter(p => p.specs?.socket === selectedCPU.specs?.socket);
    }
    if (activeSelectionCategory === 'CPU' && selectedMotherboard?.specs?.socket) {
        compatibleProducts = compatibleProducts.filter(p => p.specs?.socket === selectedMotherboard.specs?.socket);
    }
    if (activeSelectionCategory === 'RAM' && selectedMotherboard?.specs?.ramType) {
        compatibleProducts = compatibleProducts.filter(p => p.specs?.ramType === selectedMotherboard.specs?.ramType);
    }

    if (searchTerm) {
      compatibleProducts = compatibleProducts.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    switch (sortOption) {
      case 'price_asc': compatibleProducts.sort((a, b) => a.price - b.price); break;
      case 'price_desc': compatibleProducts.sort((a, b) => b.price - a.price); break;
      case 'name_asc': compatibleProducts.sort((a, b) => a.name.localeCompare(b.name)); break;
    }
    return compatibleProducts;
  }, [categoryProducts, searchTerm, sortOption, activeSelectionCategory, selectedComponents]);

  const SelectorPane = () => (
     <div className="bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-[calc(100vh-8rem-2rem)]">
        <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-gray-800">เลือก {componentConfig.find(c => c.name === activeSelectionCategory)?.displayName}</h3>
                <button onClick={() => setActiveSelectionCategory(null)} className="p-1 rounded-full hover:bg-gray-200">
                    <X size={20} className="text-gray-600"/>
                </button>
            </div>
            {compatibilityFilterMessage && (
                <div className="bg-blue-50 text-blue-700 text-xs p-2 rounded-md mb-3 flex items-start gap-2">
                    <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                    <span>{compatibilityFilterMessage}</span>
                </div>
            )}
            <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400"/></div>
                <input type="text" placeholder="ค้นหา..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-3 py-2 border rounded-md text-sm bg-white text-gray-900 border-gray-300 focus:ring-orange-500" />
            </div>
            <div className="mt-3">
                <label className="text-sm font-medium text-gray-700">เรียงตาม: </label>
                <select value={sortOption} onChange={e => setSortOption(e.target.value)} className="w-full mt-1 rounded-md border-gray-300 shadow-sm text-sm bg-white text-gray-900 focus:ring-orange-500">
                    <option value="price_asc">ราคา: น้อยไปมาก</option>
                    <option value="price_desc">ราคา: มากไปน้อย</option>
                    <option value="name_asc">ชื่อ: A-Z</option>
                </select>
            </div>
        </div>
        <div className="flex-grow overflow-y-auto">
            {processedProducts.length > 0 ? (
                <div className="divide-y">
                    {processedProducts.map(product => (
                        <div key={product.id} className="p-3 flex items-center gap-3 hover:bg-gray-50">
                            {/* FIX: Changed product.imageUrl to product.imageUrls[0] to match the Product type. */}
                            <img src={product.imageUrls[0]} alt={product.name} className="w-16 h-16 object-contain flex-shrink-0" />
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-medium text-gray-800 line-clamp-2">{product.name}</p>
                                <p className="text-sm font-bold text-orange-600">{formatCurrency(product.price)}</p>
                            </div>
                            <button onClick={() => handleSelectProduct(product)} className="bg-blue-600 text-white font-bold py-1.5 px-4 rounded-md text-sm hover:bg-blue-700">เลือก</button>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center p-8 text-gray-500">
                    {categoryProducts.length > 0 ? 'ไม่พบสินค้าที่เข้ากันได้ หรือตรงกับคำค้นหาของคุณ' : 'ไม่พบสินค้า'}
                </div>
            )}
        </div>
    </div>
  );

  const BuildSummaryPane = () => {
    const quotationRef = useRef<HTMLDivElement>(null);
    const [isSaving, setIsSaving] = useState(false);

    const priceBeforeVat = totalPrice / 1.07;
    const vatAmount = totalPrice - priceBeforeVat;
    const currentDate = new Date().toLocaleDateString('th-TH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
    });
    const dateForFilename = new Date().toISOString().slice(0,10);


    const handleSaveAsImage = () => {
        if (quotationRef.current && !isSaving) {
            setIsSaving(true);
            addToast('กำลังสร้างรูปภาพ...', 'info');
            html2canvas(quotationRef.current, { useCORS: true, scale: 2 }).then((canvas: any) => {
                const a4Ratio = 297 / 210; // A4 portrait ratio
                const a4Canvas = document.createElement('canvas');
                const a4Context = a4Canvas.getContext('2d');
                
                const outputWidth = 1240; // A4 at ~150DPI
                const outputHeight = outputWidth * a4Ratio;

                a4Canvas.width = outputWidth;
                a4Canvas.height = outputHeight;

                if (a4Context) {
                    a4Context.fillStyle = 'white';
                    a4Context.fillRect(0, 0, a4Canvas.width, a4Canvas.height);

                    const padding = 80;
                    const maxWidth = a4Canvas.width - (padding * 2);
                    const maxHeight = a4Canvas.height - (padding * 2);
                    
                    const canvasRatio = canvas.width / canvas.height;
                    
                    let drawWidth = canvas.width;
                    let drawHeight = canvas.height;

                    if (drawWidth > maxWidth || drawHeight > maxHeight) {
                        if (canvasRatio > (maxWidth / maxHeight)) {
                           drawWidth = maxWidth;
                           drawHeight = drawWidth / canvasRatio;
                        } else {
                           drawHeight = maxHeight;
                           drawWidth = drawHeight * canvasRatio;
                        }
                    }
                    
                    const x = (a4Canvas.width - drawWidth) / 2;
                    const y = (a4Canvas.height - drawHeight) / 2;

                    a4Context.drawImage(canvas, x, y, drawWidth, drawHeight);

                    const link = document.createElement('a');
                    link.download = `สเปคคอมพิวเตอร์ประกอบ-Uboncom-${dateForFilename}.png`;
                    link.href = a4Canvas.toDataURL('image/png');
                    link.click();
                }
                setIsSaving(false);
            }).catch((err: any) => {
                console.error(err);
                addToast('เกิดข้อผิดพลาดในการสร้างรูปภาพ', 'error');
                setIsSaving(false)
            });
        }
    };

    const handleSaveAsPDF = () => {
        if (quotationRef.current && !isSaving) {
            setIsSaving(true);
            addToast('กำลังสร้างไฟล์ PDF...', 'info');
            const { jsPDF } = jspdf;
            html2canvas(quotationRef.current, { useCORS: true, scale: 2 }).then((canvas: any) => {
                const imgData = canvas.toDataURL('image/png');
                const pdf = new jsPDF('p', 'mm', 'a4');
                const pdfWidth = pdf.internal.pageSize.getWidth();
                const pdfHeight = pdf.internal.pageSize.getHeight();
                
                const canvasWidth = canvas.width;
                const canvasHeight = canvas.height;
                const canvasRatio = canvasWidth / canvasHeight;

                const margin = 10;
                const usableWidth = pdfWidth - (margin * 2);
                const usableHeight = pdfHeight - (margin * 2);

                let imgOnPdfWidth = usableWidth;
                let imgOnPdfHeight = imgOnPdfWidth / canvasRatio;

                if (imgOnPdfHeight > usableHeight) {
                    imgOnPdfHeight = usableHeight;
                    imgOnPdfWidth = imgOnPdfHeight * canvasRatio;
                }

                const x = (pdfWidth - imgOnPdfWidth) / 2;
                const y = margin;
                
                pdf.addImage(imgData, 'PNG', x, y, imgOnPdfWidth, imgOnPdfHeight);
                pdf.save(`สเปคคอมพิวเตอร์ประกอบ-Uboncom-${dateForFilename}.pdf`);
                setIsSaving(false);
            }).catch((err: any) => {
                console.error(err);
                addToast('เกิดข้อผิดพลาดในการสร้าง PDF', 'error');
                setIsSaving(false);
            });
        }
    };

    const selectedItems = Object.values(selectedComponents).filter(Boolean);

    return (
      <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
        <div ref={quotationRef} className="bg-white p-6 text-gray-800 font-sans">
            <div className="flex justify-between items-start mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">UBON<span className="text-orange-500">COMPUTER</span></h1>
                </div>
                <div className="text-right">
                    <h2 className="text-xl font-bold uppercase text-gray-700">สเปคคอมพิวเตอร์ประกอบ</h2>
                    <p className="text-sm">วันที่: {currentDate}</p>
                </div>
            </div>

            <table className="w-full text-sm mb-6">
                <thead>
                    <tr className="bg-gray-100 text-left font-semibold uppercase">
                        <th className="p-2 w-10 text-center">#</th>
                        <th className="p-2">รายการ</th>
                        <th className="p-2 w-16 text-center">จำนวน</th>
                        <th className="p-2 w-28 text-right">ราคา/หน่วย</th>
                        <th className="p-2 w-28 text-right">จำนวนเงิน</th>
                    </tr>
                </thead>
                <tbody>
                    {selectedItems.length > 0 ? selectedItems.map((product, index) => (
                        <tr key={product!.id} className="border-b">
                            <td className="p-2 text-center">{index + 1}</td>
                            <td className="p-2 font-medium">{product!.name}</td>
                            <td className="p-2 text-center">1</td>
                            <td className="p-2 text-right">{formatNumber(product!.price)}</td>
                            <td className="p-2 text-right">{formatNumber(product!.price)}</td>
                        </tr>
                    )) : (
                        <tr>
                            <td colSpan={5} className="text-center text-gray-500 py-10 border-b">ยังไม่มีสินค้าในรายการ</td>
                        </tr>
                    )}
                </tbody>
            </table>
            
            <div className="flex justify-end">
                <div className="w-full max-w-sm space-y-2 text-sm">
                    <div className="flex justify-between">
                        <span className="font-semibold">รวมเป็นเงิน</span>
                        <span>{formatNumber(priceBeforeVat)} บาท</span>
                    </div>
                    <div className="flex justify-between">
                        <span className="font-semibold">ภาษีมูลค่าเพิ่ม 7%</span>
                        <span>{formatNumber(vatAmount)} บาท</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t-2 border-gray-800 pt-2 mt-2">
                        <span>ยอดรวมสุทธิ</span>
                        <span className="text-orange-600">{formatNumber(totalPrice)} บาท</span>
                    </div>
                </div>
            </div>
            
            <div className="mt-8 border-t pt-4 text-xs text-gray-500">
                <p><strong>หมายเหตุ:</strong></p>
                <ul className="list-disc list-inside">
                    <li>ราคานี้รวมภาษีมูลค่าเพิ่มแล้ว (Price is inclusive of VAT)</li>
                </ul>
            </div>
        </div>

        <div className="mt-4 pt-4 border-t space-y-3">
          <button onClick={continueBuilding} className="w-full text-orange-600 font-bold py-2.5 rounded-lg border border-orange-500 hover:bg-orange-50 transition-colors">
            {Object.keys(selectedComponents).length > 0 ? 'แก้ไข / เลือกชิ้นส่วนต่อ' : 'เริ่มจัดสเปค'}
          </button>
          <div className="grid grid-cols-2 gap-3">
            <button onClick={handleSaveAsImage} disabled={isSaving || totalPrice === 0} className="w-full flex items-center justify-center gap-2 bg-slate-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-slate-700 transition-colors disabled:bg-slate-400 disabled:cursor-not-allowed">
                <Camera size={18} />
                บันทึกเป็นรูปภาพ
            </button>
            <button onClick={handleSaveAsPDF} disabled={isSaving || totalPrice === 0} className="w-full flex items-center justify-center gap-2 bg-red-600 text-white font-semibold py-2.5 px-4 rounded-lg hover:bg-red-700 transition-colors disabled:bg-red-400 disabled:cursor-not-allowed">
                <FileText size={18} />
                บันทึกเป็น PDF
            </button>
          </div>
          <button onClick={handleAddToCart} className="w-full bg-green-600 text-white font-bold py-2.5 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2 disabled:bg-gray-400" disabled={totalPrice === 0}>
            <ShoppingCart size={20} />
            เพิ่มทั้งหมดลงตะกร้า
          </button>
        </div>
      </div>
    );
  };


  return (
    <div className="bg-gray-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">จัดสเปคคอมพิวเตอร์ (DIY)</h1>
              <p className="mt-2 text-gray-600">เลือกส่วนประกอบเพื่อสร้างคอมพิวเตอร์ในฝันของคุณ</p>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Component Selection */}
            <div className="w-full lg:w-2/3 space-y-4">
                {componentConfig.map(config => {
                  const selected = selectedComponents[config.name];
                  const status = compatibilityStatus[config.name];
                  const isActive = activeSelectionCategory === config.name;

                  return (
                      <div key={config.name} className={`bg-white p-4 rounded-lg shadow-sm border-2 transition-all ${isActive ? 'border-orange-500' : 'border-gray-200'}`}>
                          <div className="flex flex-col md:flex-row md:items-center gap-4">
                              <div className="md:w-1/5 flex-shrink-0 flex flex-row md:flex-col items-center justify-between md:justify-center text-center gap-2">
                                  <div className="flex items-center gap-4">
                                      {config.icon}
                                      <h3 className="font-bold text-gray-800 text-left md:text-center">{config.displayName}</h3>
                                  </div>
                                  <div className="md:mt-2">
                                      <CompatibilityIcon status={status} />
                                  </div>
                              </div>
                              
                              <div className="hidden md:block w-px bg-gray-200 self-stretch"></div>

                              <div className="flex-grow min-w-0">
                                  {selected ? (
                                      <div className="flex items-center gap-4 w-full bg-gray-50/80 border p-2 rounded-md min-h-[92px]">
                                          {/* FIX: Changed selected.imageUrl to selected.imageUrls[0] to match the Product type. */}
                                          <img src={selected.imageUrls[0]} alt={selected.name} className="w-16 h-16 object-contain flex-shrink-0" />
                                          <div className="flex-grow min-w-0">
                                              <p className="font-semibold text-gray-800 text-sm line-clamp-2" title={selected.name}>{selected.name}</p>
                                              <p className="text-orange-600 font-bold mt-1">{formatCurrency(selected.price)}</p>
                                          </div>
                                      </div>
                                  ) : (
                                      <div className="text-center text-gray-500 p-4 border-2 border-dashed rounded-md h-full flex items-center justify-center min-h-[92px]">
                                          <p>ยังไม่ได้เลือกส่วนประกอบ</p>
                                      </div>
                                  )}
                              </div>

                              <div className="md:w-1/6 flex-shrink-0 flex flex-row md:flex-col items-stretch justify-center gap-2">
                                  <button onClick={() => setActiveSelectionCategory(config.name)} className="flex-1 px-4 py-2 text-sm font-bold text-white bg-orange-500 rounded-md hover:bg-orange-600 transition-colors">
                                      {selected ? 'เปลี่ยน' : 'เลือก'}
                                  </button>
                                  {selected && (
                                      <button onClick={() => handleRemoveComponent(config.name)} className="flex-1 px-4 py-2 text-sm font-bold text-red-700 bg-red-100 rounded-md hover:bg-red-200 transition-colors flex items-center justify-center gap-1">
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

            {/* Right Pane (Selector or Summary) */}
            <div className="w-full lg:w-1/3">
                <div className="sticky top-28">
                    {activeSelectionCategory ? <SelectorPane /> : <BuildSummaryPane />}
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};