import React from 'react';
import { ComputerSetProduct, Page, Product } from '../types';
import { ShoppingCart, CheckCircle, ShieldCheck, Truck, Cpu, MemoryStick, HardDrive, CircuitBoard, Power, Box } from 'lucide-react';
import { useCart } from '../hooks/useCart';
import { useToast } from '../hooks/useToast';
import ComputerSetCard from './ComputerSetCard';

interface ComputerSetDetailPageProps {
  product: ComputerSetProduct;
  relatedProducts: ComputerSetProduct[];
  onNavigate: (page: Page, data?: { computerSetId?: number }) => void;
}

const specIcons: { [key: string]: React.ReactNode } = {
  cpu: <Cpu className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  ram: <MemoryStick className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  vga: <CircuitBoard className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  m2: <HardDrive className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  ssd: <HardDrive className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  hdd: <HardDrive className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  psu: <Power className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
  case: <Box className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />,
};

const parseSpecs = (specString: string) => {
  return specString.split(' / ').map(part => {
    const lowerPart = part.toLowerCase();
    let icon = null;
    if (lowerPart.includes('ryzen') || lowerPart.includes('intel') || lowerPart.includes('cpu')) icon = specIcons.cpu;
    else if (lowerPart.includes('ram')) icon = specIcons.ram;
    else if (lowerPart.includes('rtx') || lowerPart.includes('rx') || lowerPart.includes('vga') || lowerPart.includes('radeon')) icon = specIcons.vga;
    else if (lowerPart.includes('m.2') || lowerPart.includes('ssd') || lowerPart.includes('hdd')) icon = specIcons.m2;
    else if (lowerPart.includes('psu')) icon = specIcons.psu;
    else if (lowerPart.includes('case')) icon = specIcons.case;
    return { spec: part.trim(), icon };
  });
};

const ComputerSetDetailPage: React.FC<ComputerSetDetailPageProps> = ({ product, relatedProducts, onNavigate }) => {
    const { addToCart } = useCart();
    const { addToast } = useToast();

    // FIX: Convert specs object to a string to be used in multiple places.
    const specItems = Object.entries(product.specs)
      .filter(([key, value]) => key !== 'notes' && value)
      .map(([, value]) => value as string);

    const specString = specItems.join(' / ');


    const handleAddToCart = () => {
        const specStringForDesc = specItems.join(', ');
        const notesString = product.specs.notes ? `\nหมายเหตุ: ${product.specs.notes}` : '';
        const fullDescription = specStringForDesc + notesString;

        const productForCart: Product = {
            id: product.id,
            name: product.name,
            category: 'Computer Set',
            price: product.price,
            oldPrice: product.oldPrice,
            // FIX: Changed imageUrl to imageUrls to match the Product type.
            imageUrls: product.imageUrls,
            costPrice: 0, // Placeholder
            stock: 1, // Placeholder
            availability: 'inStock', // Placeholder
            rating: 0, // Placeholder
            reviewCount: 0, // Placeholder
            brand: 'UBONCOM SET',
            // FIX: Assign the generated spec string to the description, fixing the type mismatch.
            description: fullDescription,
            notes: '',
            // FIX: Added 'reviews: []' to satisfy the Product type which requires a reviews array.
            reviews: [],
        };
        addToCart(productForCart, 1);
        addToast(`เพิ่ม '${product.name}' ลงตะกร้าแล้ว`, 'success');
    };

    // FIX: Pass the generated spec string to parseSpecs, which expects a string argument.
    const parsedSpecs = parseSpecs(specString);

    const hasDiscount = product.oldPrice && product.oldPrice > product.price;

    const formatCurrency = (amount: number) => 
        new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB', minimumFractionDigits: 0 }).format(amount);

    return (
        <div className="bg-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <nav className="text-sm mb-6" aria-label="Breadcrumb">
                    <ol className="list-none p-0 inline-flex">
                        <li className="flex items-center">
                            <button onClick={() => onNavigate('home')} className="text-gray-500 hover:text-orange-600">หน้าแรก</button>
                            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                        </li>
                        <li className="flex items-center">
                            <button onClick={() => onNavigate('computerSet')} className="text-gray-500 hover:text-orange-600">คอมพิวเตอร์เซต</button>
                            <svg className="fill-current w-3 h-3 mx-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"/></svg>
                        </li>
                        <li className="flex items-center">
                            <span className="text-gray-800 font-semibold">{product.name}</span>
                        </li>
                    </ol>
                </nav>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    <div className="bg-gray-100 rounded-lg p-4 flex justify-center items-center">
                        {/* FIX: Changed product.imageUrl to product.imageUrls[0] to match the ComputerSetProduct type. */}
                        <img src={product.imageUrls[0]} alt={product.name} className="max-w-full h-auto max-h-[500px] object-contain" />
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
                        <div className="flex items-baseline mb-6">
                            <p className="text-4xl font-bold text-red-600">{formatCurrency(product.price)}</p>
                            {hasDiscount && <p className="ml-4 text-xl text-gray-400 line-through">{formatCurrency(product.oldPrice!)}</p>}
                        </div>
                        <div className="mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-3">สเปคเครื่อง</h2>
                            <div className="space-y-3">
                                {parsedSpecs.map((item, index) => (
                                    <div key={index} className="flex items-center bg-gray-50 p-3 rounded-md">
                                        {item.icon}
                                        <span className="text-gray-700">{item.spec}</span>
                                    </div>
                                ))}
                            </div>
                             {product.specs.notes && (
                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <h3 className="font-semibold text-gray-800">หมายเหตุ:</h3>
                                    <p className="text-sm text-gray-600 whitespace-pre-wrap">{product.specs.notes}</p>
                                </div>
                            )}
                        </div>

                        <button onClick={handleAddToCart} className="w-full sm:w-auto flex items-center justify-center bg-orange-600 text-white font-bold py-3 px-10 rounded-lg hover:bg-orange-700 transition-colors">
                            <ShoppingCart className="mr-2"/>
                            เพิ่มลงตะกร้า
                        </button>
                        
                        <div className="mt-8 border-t pt-6 space-y-3 text-sm text-gray-600">
                            <div className="flex items-center"><CheckCircle className="w-5 h-5 text-green-500 mr-2"/><span>มีสินค้าพร้อมจัดส่ง</span></div>
                            <div className="flex items-center"><ShieldCheck className="w-5 h-5 text-blue-500 mr-2"/><span>รับประกันสินค้าของแท้ 100%</span></div>
                            <div className="flex items-center"><Truck className="w-5 h-5 text-purple-500 mr-2"/><span>จัดส่งฟรีทั่วประเทศ</span></div>
                        </div>
                    </div>
                </div>

                {relatedProducts.length > 0 && (
                    <div className="mt-20">
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">คอมเซ็ตอื่นๆ ที่น่าสนใจ</h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                            {relatedProducts.map(p => (
                                <div key={p.id} className="w-full">
                                    <ComputerSetCard product={p} onNavigate={onNavigate} />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ComputerSetDetailPage;