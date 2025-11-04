import React, { useState, useEffect, useMemo } from 'react';
import { Product, Category, Article, ComputerSetGroup, HeroSlide, ComputerSetProduct, SeoData, SeoEditablePage, HomepageContent, AllCategoryPageData, ProductCategory, CategoryPageData, Page, DiscountCode } from '../types';
import { LogOut, ShoppingCart, Tv, Newspaper, Image as ImageIcon, PlusCircle, Edit, Trash2, X, ChevronDown, ChevronUp, Globe, Home, Search, LayoutGrid, Percent, Menu } from 'lucide-react';
import ProductForm from './ProductForm';
import ImageUpload from './ImageUpload';
import HomepageManagement from './HomepageManagement';
import { useToast } from '../hooks/useToast';
import { categoryConfigurations } from '../categoryConfig';

// Generic Modal Component
export const Modal: React.FC<{ children: React.ReactNode, title: string, onClose: () => void, size?: 'lg' | '2xl' | '4xl' }> = ({ children, title, onClose, size = '2xl' }) => {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    const sizeClasses = {
        'lg': 'max-w-lg',
        '2xl': 'max-w-2xl',
        '4xl': 'max-w-4xl'
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 z-[100] flex justify-center items-center p-4 animate-fade-in" onClick={onClose}>
        <div className={`bg-white rounded-lg shadow-xl w-full ${sizeClasses[size]} max-h-[90vh] flex flex-col animate-slide-in-up`} onClick={e => e.stopPropagation()}>
          <div className="flex justify-between items-center p-4 border-b">
            <h3 className="text-xl font-bold text-gray-800">{title}</h3>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200 transition-colors"><X size={20} /></button>
          </div>
          <div className="overflow-y-auto p-6">
            {children}
          </div>
        </div>
      </div>
    );
};

// Generic Form Input
export const FormInput: React.FC<{label: string, name: string, value: string | number, onChange: (e: React.ChangeEvent<any>) => void, type?: string, required?: boolean, as?: 'textarea'}> = 
({ label, name, value, onChange, type = 'text', required = true, as }) => (
    <div>
        <label htmlFor={name} className="block text-sm font-medium text-gray-700">{label}</label>
        {as === 'textarea' ? (
             <textarea name={name} id={name} value={value} onChange={onChange} required={required} rows={as === 'textarea' && name === 'content' ? 10 : 3} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
        ) : (
             <input type={type} name={name} id={name} value={value} onChange={onChange} required={required} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500 bg-white text-gray-900" />
        )}
    </div>
);


// Interfaces for props
interface AdminPageProps {
  products: Product[];
  categories: Category[];
  articles: Article[];
  computerSetGroups: ComputerSetGroup[];
  heroSlides: HeroSlide[];
  seoData: SeoData;
  homepageContent: HomepageContent;
  categoryPageData: AllCategoryPageData;
  discountCodes: DiscountCode[];
  onSaveProduct: (product: Product) => void;
  onDeleteProduct: (productId: number) => void;
  onSaveArticle: (article: Article) => void;
  onDeleteArticle: (articleId: number) => void;
  onSaveHeroSlide: (slide: HeroSlide) => void;
  onDeleteHeroSlide: (slideId: number) => void;
  onSaveComputerSetGroup: (group: ComputerSetGroup) => void;
  onDeleteComputerSetGroup: (groupId: number) => void;
  onSaveSeoData: (seoData: SeoData) => void;
  onSaveHomepageContent: (content: HomepageContent) => void;
  onSaveCategoryPageData: (data: AllCategoryPageData) => void;
  onSaveDiscountCode: (code: DiscountCode) => void;
  onDeleteDiscountCode: (codeId: number) => void;
  onLogout: () => void;
}

type AdminSection = 'homepage' | 'products' | 'computerSets' | 'articles' | 'hero' | 'seo' | 'categoryPages' | 'discounts';

const ManagementPanel: React.FC<{title: string, onAddNew?: () => void, children: React.ReactNode}> = ({ title, onAddNew, children }) => (
    <div className="p-4 sm:p-6 lg:p-8">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 mb-6">
            <h2 className="text-2xl font-bold text-gray-800 shrink-0">{title}</h2>
            {onAddNew && (
                <button
                    onClick={onAddNew}
                    className="flex items-center justify-center w-full sm:w-auto bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors"
                >
                    <PlusCircle className="w-5 h-5 mr-2" />
                    เพิ่มใหม่
                </button>
            )}
        </div>
        <div className="bg-white rounded-lg shadow overflow-hidden">
            {children}
        </div>
    </div>
);

// Generic Form with Save/Cancel buttons
export const FormWrapper: React.FC<{onSave: () => void, onCancel: () => void, children: React.ReactNode}> = ({ onSave, onCancel, children }) => (
    <form onSubmit={(e) => { e.preventDefault(); onSave(); }}>
        <div className="space-y-4">{children}</div>
        <div className="mt-6 flex justify-end space-x-3">
            <button type="button" onClick={onCancel} className="bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded-lg hover:bg-gray-300">ยกเลิก</button>
            <button type="submit" className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg hover:bg-orange-600">บันทึก</button>
        </div>
    </form>
);


// Sub-components for each management section
const ProductManagement: React.FC<{ products: Product[], categories: Category[], onEdit: (p: Product) => void, onDelete: (id: number) => void }> = ({ products, categories, onEdit, onDelete }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [sortOption, setSortOption] = useState('default');

    const processedProducts = useMemo(() => {
        let filtered = [...products];
        if (selectedCategory !== 'all') {
            filtered = filtered.filter(p => p.category === selectedCategory);
        }
        if (searchTerm) {
            filtered = filtered.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
        }
        switch (sortOption) {
            case 'price_asc': filtered.sort((a, b) => a.price - b.price); break;
            case 'price_desc': filtered.sort((a, b) => b.price - a.price); break;
            case 'stock_asc': filtered.sort((a, b) => a.stock - b.stock); break;
            case 'stock_desc': filtered.sort((a, b) => b.stock - a.stock); break;
            default: break;
        }
        return filtered;
    }, [products, searchTerm, selectedCategory, sortOption]);

    const formatCurrency = (amount: number) => new Intl.NumberFormat('th-TH', { style: 'currency', currency: 'THB' }).format(amount);

    return (
        <>
            <div className="p-4 bg-gray-50/80 border-b border-gray-200">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><Search className="h-5 w-5 text-gray-400" /></div>
                        <input type="text" placeholder="ค้นหาสินค้า..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                     <div>
                        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                            <option value="all">ทุกหมวดหมู่</option>
                            {categories.map(cat => <option key={cat.id} value={cat.name}>{cat.name}</option>)}
                        </select>
                    </div>
                    <div>
                         <select value={sortOption} onChange={(e) => setSortOption(e.target.value)} className="block w-full pl-3 pr-10 py-2 border border-gray-300 rounded-md leading-5 bg-white focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500 sm:text-sm">
                            <option value="default">เรียงลำดับเริ่มต้น</option>
                            <option value="price_asc">ราคา: น้อยไปมาก</option>
                            <option value="price_desc">ราคา: มากไปน้อย</option>
                            <option value="stock_asc">สต็อก: น้อยไปมาก</option>
                            <option value="stock_desc">สต็อก: มากไปน้อย</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Mobile Card List */}
            <div className="md:hidden divide-y divide-gray-200">
                {processedProducts.map(p => (
                    <div key={p.id} className="p-4">
                        <div className="flex items-start gap-4">
                            <img className="h-16 w-16 rounded-md object-cover flex-shrink-0" src={p.imageUrl} alt={p.name} />
                            <div className="flex-grow min-w-0">
                                <p className="text-sm font-bold text-gray-900 line-clamp-2">{p.name}</p>
                                <p className="text-xs text-gray-500">{p.category}</p>
                                <p className="text-sm font-semibold text-orange-600 mt-1">{formatCurrency(p.price)}</p>
                            </div>
                            <div className="flex flex-col items-center gap-2">
                                <button onClick={() => onEdit(p)} className="p-2 text-indigo-600 hover:bg-gray-100 rounded-full"><Edit className="w-5 h-5" /></button>
                                <button onClick={() => onDelete(p.id)} className="p-2 text-red-600 hover:bg-gray-100 rounded-full"><Trash2 className="w-5 h-5" /></button>
                            </div>
                        </div>
                        <div className="mt-3 grid grid-cols-2 gap-2 text-xs">
                            <div className="bg-gray-100 p-2 rounded">
                                <p className="font-semibold text-gray-500">ต้นทุน</p>
                                <p className="font-medium text-gray-800">{formatCurrency(p.costPrice)}</p>
                            </div>
                            <div className="bg-gray-100 p-2 rounded">
                                <p className="font-semibold text-gray-500">สต็อก</p>
                                <p className="font-medium text-gray-800">{p.stock}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Desktop Table */}
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สินค้า</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาต้นทุน</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ราคาขาย</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สต็อก</th>
                            <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {processedProducts.map(p => (
                            <tr key={p.id}>
                                <td className="px-6 py-4 whitespace-nowrap"><div className="flex items-center"><div className="flex-shrink-0 h-10 w-10"><img className="h-10 w-10 rounded-md object-cover" src={p.imageUrl} alt={p.name} /></div><div className="ml-4"><div className="text-sm font-medium text-gray-900">{p.name}</div><div className="text-sm text-gray-500">{p.category}</div></div></div></td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatCurrency(p.costPrice)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{formatCurrency(p.price)}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{p.stock}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => onEdit(p)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="w-5 h-5" /></button><button onClick={() => onDelete(p.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button></td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            
            {processedProducts.length === 0 && <div className="text-center p-8 text-gray-500">ไม่พบสินค้าที่ตรงกับเกณฑ์การค้นหา</div>}
        </>
    );
};

const ArticleManagement: React.FC<{ articles: Article[], onSave: (a: Article) => void, onDelete: (id: number) => void }> = ({ articles, onSave, onDelete }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingArticle, setEditingArticle] = useState<Article | null>(null);

    const handleEdit = (article: Article) => { setEditingArticle(article); setModalOpen(true); };
    const handleAdd = () => { setEditingArticle(null); setModalOpen(true); };
    const handleClose = () => setModalOpen(false);
    const handleSave = (article: Article) => { onSave(article); handleClose(); };
    
    return (
        <ManagementPanel title="บทความทั้งหมด" onAddNew={handleAdd}>
            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-200">
                {articles.map(a => (
                    <div key={a.id} className="p-4 flex justify-between items-center gap-4">
                        <div className="min-w-0">
                            <p className="font-medium text-gray-900 truncate">{a.title}</p>
                            <p className="text-sm text-gray-500">{a.date}</p>
                        </div>
                        <div className="flex items-center flex-shrink-0">
                            <button onClick={() => handleEdit(a)} className="p-2 text-indigo-600 hover:bg-gray-100 rounded-full"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => onDelete(a.id)} className="p-2 text-red-600 hover:bg-gray-100 rounded-full"><Trash2 className="w-5 h-5" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">หัวข้อ</th><th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">วันที่</th><th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th></tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">{articles.map(a => (<tr key={a.id}>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-medium text-gray-900">{a.title}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{a.date}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => handleEdit(a)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="w-5 h-5" /></button><button onClick={() => onDelete(a.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button></td></tr>))}
                    </tbody>
                </table>
            </div>
            {modalOpen && <ArticleForm article={editingArticle} onSave={handleSave} onClose={handleClose} />}
        </ManagementPanel>
    );
};

const ArticleForm: React.FC<{ article: Article | null, onSave: (a: Article) => void, onClose: () => void }> = ({ article, onSave, onClose }) => {
    const [formState, setFormState] = useState<Omit<Article, 'id' | 'link'>>({ date: '', title: '', excerpt: '', imageUrl: '', content: '', ...article });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormState({ ...formState, [e.target.name]: e.target.value });
    const handleImageChange = (base64: string) => setFormState({ ...formState, imageUrl: base64 });
    const handleSave = () => onSave({ ...formState, id: article?.id || 0, link: '#' });

    return <Modal title={article ? 'แก้ไขบทความ' : 'เพิ่มบทความใหม่'} onClose={onClose}>
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <FormInput label="หัวข้อ" name="title" value={formState.title} onChange={handleChange} />
            <FormInput label="วันที่ (เช่น 01 ม.ค. 2568)" name="date" value={formState.date} onChange={handleChange} />
            <FormInput label="เนื้อหาย่อ" name="excerpt" value={formState.excerpt} onChange={handleChange} as="textarea" />
            <FormInput label="เนื้อหาเต็ม" name="content" value={formState.content} onChange={handleChange} as="textarea" />
            <ImageUpload label="รูปภาพประกอบ" currentImage={formState.imageUrl} onImageChange={handleImageChange} />
        </FormWrapper>
    </Modal>;
};

const HeroSlideManagement: React.FC<{ slides: HeroSlide[], onSave: (s: HeroSlide) => void, onDelete: (id: number) => void }> = ({ slides, onSave, onDelete }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingSlide, setEditingSlide] = useState<HeroSlide | null>(null);

    const handleEdit = (slide: HeroSlide) => { setEditingSlide(slide); setModalOpen(true); };
    const handleAdd = () => { setEditingSlide(null); setModalOpen(true); };
    const handleClose = () => setModalOpen(false);
    const handleSave = (slide: HeroSlide) => { onSave(slide); handleClose(); };

    return (
        <ManagementPanel title="Hero Banner ทั้งหมด" onAddNew={handleAdd}>
            <div className="divide-y divide-gray-200">{slides.map(s => (<div key={s.id} className="p-4 flex items-center justify-between">
                <div className="flex items-center"><img src={s.image} className="w-24 h-12 object-cover rounded-md mr-4" /><div className="text-sm font-medium">{s.titleLine1} {s.titleLine2}</div></div>
                <div className="flex items-center"><button onClick={() => handleEdit(s)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="w-5 h-5" /></button><button onClick={() => onDelete(s.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button></div></div>))}
            </div>
             {modalOpen && <HeroSlideForm slide={editingSlide} onSave={handleSave} onClose={handleClose} />}
        </ManagementPanel>
    );
};

const HeroSlideForm: React.FC<{ slide: HeroSlide | null, onSave: (s: HeroSlide) => void, onClose: () => void }> = ({ slide, onSave, onClose }) => {
    const [formState, setFormState] = useState<Omit<HeroSlide, 'id'>>({ image: '', titleLine1: '', titleLine2: '', titleLine3: '', cta: '', ...slide });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormState({ ...formState, [e.target.name]: e.target.value });
    const handleImageChange = (base64: string) => setFormState({ ...formState, image: base64 });
    const handleSave = () => onSave({ ...formState, id: slide?.id || 0 });

    return <Modal title={slide ? 'แก้ไขสไลด์' : 'เพิ่มสไลด์ใหม่'} onClose={onClose}>
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <ImageUpload label="ภาพพื้นหลัง" currentImage={formState.image} onImageChange={handleImageChange} />
            <FormInput label="ข้อความบรรทัดที่ 1" name="titleLine1" value={formState.titleLine1} onChange={handleChange} />
            <FormInput label="ข้อความบรรทัดที่ 2" name="titleLine2" value={formState.titleLine2} onChange={handleChange} />
            <FormInput label="ข้อความบรรทัดที่ 3" name="titleLine3" value={formState.titleLine3} onChange={handleChange} />
            <FormInput label="ข้อความบนปุ่ม (CTA)" name="cta" value={formState.cta} onChange={handleChange} />
        </FormWrapper>
    </Modal>;
};

const ComputerSetManagement: React.FC<{ groups: ComputerSetGroup[], onSave: (g: ComputerSetGroup) => void, onDelete: (id: number) => void }> = ({ groups, onSave, onDelete }) => {
    const [openGroupId, setOpenGroupId] = useState<number | null>(null);
    const [editingGroup, setEditingGroup] = useState<ComputerSetGroup | null>(null);
    const [editingProduct, setEditingProduct] = useState<{group: ComputerSetGroup, product: ComputerSetProduct | null} | null>(null);
    
    const handleGroupSave = (group: ComputerSetGroup) => { onSave(group); setEditingGroup(null); };
    const handleProductSave = (product: ComputerSetProduct) => {
        if (!editingProduct) return;
        const { group } = editingProduct;
        const exists = group.products.some(p => p.id === product.id);
        const newProducts = exists
            ? group.products.map(p => p.id === product.id ? product : p)
            : [...group.products, { ...product, id: Date.now() }];
        onSave({ ...group, products: newProducts });
        setEditingProduct(null);
    };

    return (
        <ManagementPanel title="คอมเซ็ตทั้งหมด" onAddNew={() => setEditingGroup({id: 0, bannerUrl: '', products: []})}>
            <div className="space-y-2 p-2">{groups.map(g => (<div key={g.id} className="border rounded-lg overflow-hidden">
                <button onClick={() => setOpenGroupId(openGroupId === g.id ? null : g.id)} className="w-full p-3 bg-gray-50 flex justify-between items-center hover:bg-gray-100">
                    <img src={g.bannerUrl} alt="banner" className="h-12 object-contain rounded"/>
                    <div className="flex items-center gap-4">
                        <button onClick={(e) => { e.stopPropagation(); setEditingGroup(g); }} className="text-indigo-600"><Edit size={18}/></button>
                        <button onClick={(e) => { e.stopPropagation(); onDelete(g.id); }} className="text-red-600"><Trash2 size={18}/></button>
                        {openGroupId === g.id ? <ChevronUp /> : <ChevronDown />}
                    </div>
                </button>
                {openGroupId === g.id && (<div className="p-4 border-t">
                    <button onClick={() => setEditingProduct({ group: g, product: null })} className="mb-4 flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มสินค้าในเซ็ต</button>
                    <div className="space-y-3">
                        {g.products.map(p => (
                            <div key={p.id} className="flex flex-col sm:flex-row justify-between sm:items-center bg-white p-3 border rounded-md gap-2">
                                <div className="flex items-center gap-3">
                                    <img src={p.imageUrl} alt={p.name} className="w-12 h-12 object-contain rounded flex-shrink-0"/>
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">{p.name}</p>
                                        <p className="text-sm font-bold text-orange-600">{p.price.toLocaleString()} บาท</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 self-end sm:self-center">
                                    <button onClick={() => setEditingProduct({ group: g, product: p })} className="p-2 text-indigo-600 hover:bg-gray-100 rounded-full"><Edit size={16}/></button>
                                    <button onClick={() => onSave({...g, products: g.products.filter(prod => prod.id !== p.id)})} className="p-2 text-red-600 hover:bg-gray-100 rounded-full"><Trash2 size={16}/></button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>)}
            </div>))}</div>
            {editingGroup && <ComputerSetGroupForm group={editingGroup} onSave={handleGroupSave} onClose={() => setEditingGroup(null)} />}
            {editingProduct && <ComputerSetProductForm product={editingProduct.product} onSave={handleProductSave} onClose={() => setEditingProduct(null)} />}
        </ManagementPanel>
    );
};

const ComputerSetGroupForm: React.FC<{ group: ComputerSetGroup | null, onSave: (g: ComputerSetGroup) => void, onClose: () => void }> = ({ group, onSave, onClose }) => {
    const [formState, setFormState] = useState(group);
    const handleImageChange = (base64: string) => formState && setFormState({ ...formState, bannerUrl: base64 });
    const handleSave = () => formState && onSave(formState);
    if (!formState) return null;

    return <Modal title={group?.id ? 'แก้ไขกลุ่มคอมเซ็ต' : 'เพิ่มกลุ่มคอมเซ็ตใหม่'} onClose={onClose}>
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <ImageUpload label="Banner" currentImage={formState.bannerUrl} onImageChange={handleImageChange} />
        </FormWrapper>
    </Modal>
};

const ComputerSetProductForm: React.FC<{ product: ComputerSetProduct | null, onSave: (p: ComputerSetProduct) => void, onClose: () => void }> = ({ product, onSave, onClose }) => {
    const [formState, setFormState] = useState<Omit<ComputerSetProduct, 'id'>>({name: '', specs: '', price: 0, oldPrice: 0, imageUrl: '', ...product });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormState({ ...formState, [name]: (name === 'price' || name === 'oldPrice') ? parseFloat(value) : value });
    };
    const handleImageChange = (base64: string) => setFormState({ ...formState, imageUrl: base64 });
    const handleSave = () => onSave({ ...formState, id: product?.id || 0 });

    return <Modal title={product ? 'แก้ไขสินค้าในเซ็ต' : 'เพิ่มสินค้าในเซ็ต'} onClose={onClose}>
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <FormInput label="ชื่อสินค้า" name="name" value={formState.name} onChange={handleChange} />
            <FormInput label="สเปค" name="specs" value={formState.specs} onChange={handleChange} as="textarea" />
            <FormInput label="ราคาปัจจุบัน" name="price" type="number" value={formState.price} onChange={handleChange} />
            <FormInput label="ราคาเดิม (ไม่จำเป็น)" name="oldPrice" type="number" value={formState.oldPrice || ''} onChange={handleChange} required={false} />
            <ImageUpload label="รูปสินค้า" currentImage={formState.imageUrl} onImageChange={handleImageChange} />
        </FormWrapper>
    </Modal>
};

const pageNames: Record<SeoEditablePage, string> = {
    home: 'หน้าแรก',
    pcBuilder: 'จัดสเปคคอม',
    computerSet: 'คอมพิวเตอร์เซต',
    articles: 'บทความ',
    promotions: 'โปรโมชั่น',
    contact: 'ติดต่อเรา',
    about: 'เกี่ยวกับเรา',
    cart: 'ตะกร้าสินค้า',
    checkout: 'ชำระเงิน',
    corporate: 'บริการสำหรับองค์กร',
    faq: 'คำถามที่พบบ่อย (FAQ)',
    orderStatus: 'สถานะคำสั่งซื้อ',
    searchResults: 'ผลการค้นหา',
    privacy: 'นโยบายความเป็นส่วนตัว',
    terms: 'ข้อกำหนดการใช้งาน',
    cookies: 'นโยบายคุกกี้',
    shipping: 'นโยบายการจัดส่ง',
    returns: 'นโยบายการคืนสินค้า',
    careers: 'ร่วมงานกับเรา (Careers)',
    cpu: 'ซีพียู (CPU)',
    gpu: 'การ์ดจอ (GPU)',
    ram: 'แรม (RAM)',
    motherboard: 'เมนบอร์ด (Motherboard)',
    storage: 'อุปกรณ์จัดเก็บข้อมูล (Storage)',
    case: 'เคส (Case)',
    cooling: 'ชุดระบายความร้อน (Cooling)',
    powerSupply: 'พาวเวอร์ซัพพลาย (PSU)',
    network: 'อุปกรณ์เน็ตเวิร์ค (Network)',
    software: 'ซอฟต์แวร์ (Software)',
    server: 'เซิร์ฟเวอร์ (Server)',
};

const SeoManagement: React.FC<{ seoData: SeoData, onSave: (data: SeoData) => void }> = ({ seoData, onSave }) => {
    const [localData, setLocalData] = useState<SeoData>(seoData);
    const { addToast } = useToast();

    useEffect(() => { setLocalData(seoData); }, [seoData]);

    const handleChange = (page: SeoEditablePage, field: 'title' | 'description', value: string) => {
        setLocalData(prev => ({ ...prev, [page]: { ...prev[page], [field]: value } }));
    };
    
    const handleSave = () => { onSave(localData); addToast('บันทึกข้อมูล SEO เรียบร้อยแล้ว', 'success'); };

    return (
        <ManagementPanel title="จัดการ SEO & META">
          <div className="flex flex-col">
            <div className="p-4 sm:p-6 lg:p-8 space-y-8 flex-grow">
                {(Object.keys(pageNames) as (keyof typeof pageNames)[]).map(pageKey => (
                    <div key={pageKey} className="p-4 border rounded-lg bg-gray-50/80 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b">{pageNames[pageKey]}</h3>
                        <div className="space-y-4">
                            <FormInput label="Meta Title" name={`${pageKey}-title`} value={localData[pageKey]?.title || ''} onChange={(e) => handleChange(pageKey, 'title', e.target.value)} />
                            <FormInput label="Meta Description" name={`${pageKey}-description`} value={localData[pageKey]?.description || ''} onChange={(e) => handleChange(pageKey, 'description', e.target.value)} as="textarea" />
                        </div>
                    </div>
                ))}
            </div>
            <div className="p-4 sm:p-6 lg:p-8 border-t bg-white/80 backdrop-blur-sm sticky bottom-0 flex justify-end items-center gap-4">
                <button onClick={handleSave} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">บันทึกการเปลี่ยนแปลงทั้งหมด</button>
            </div>
          </div>
        </ManagementPanel>
    );
};

const CategoryPageManagement: React.FC<{ data: AllCategoryPageData, onSave: (data: AllCategoryPageData) => void }> = ({ data, onSave }) => {
    const [localData, setLocalData] = useState<AllCategoryPageData>(data);
    const { addToast } = useToast();

    useEffect(() => { setLocalData(data); }, [data]);

    const handleBannerChange = (page: ProductCategory, url: string) => {
        setLocalData(prev => ({ ...prev, [page]: { ...prev[page], bannerUrl: url } }));
    };
    
    const handleSave = () => { onSave(localData); addToast('บันทึกแบนเนอร์หน้าหมวดหมู่เรียบร้อยแล้ว', 'success'); };

    return (
        <ManagementPanel title="จัดการแบนเนอร์หน้าหมวดหมู่">
          <div className="flex flex-col">
            <div className="p-4 sm:p-6 lg:p-8 space-y-8 flex-grow">
                {(Object.keys(categoryConfigurations) as ProductCategory[]).map(pageKey => (
                    <div key={pageKey} className="p-4 border rounded-lg bg-gray-50/80 shadow-sm">
                        <h3 className="text-lg font-bold text-gray-800 mb-4">{categoryConfigurations[pageKey].title}</h3>
                        <ImageUpload label="แบนเนอร์โปรโมชั่น" currentImage={localData[pageKey]?.bannerUrl || ''} onImageChange={(base64) => handleBannerChange(pageKey, base64)} />
                    </div>
                ))}
            </div>
            <div className="p-4 sm:p-6 lg:p-8 border-t bg-white/80 backdrop-blur-sm sticky bottom-0 flex justify-end">
                <button onClick={handleSave} className="bg-green-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-green-700 transition-colors">บันทึกการเปลี่ยนแปลงทั้งหมด</button>
            </div>
          </div>
        </ManagementPanel>
    );
};

const DiscountManagement: React.FC<{ codes: DiscountCode[], onSave: (code: DiscountCode) => void, onDelete: (id: number) => void }> = ({ codes, onSave, onDelete }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingCode, setEditingCode] = useState<DiscountCode | null>(null);

    const handleEdit = (code: DiscountCode) => { setEditingCode(code); setModalOpen(true); };
    const handleAdd = () => { setEditingCode(null); setModalOpen(true); };
    const handleClose = () => setModalOpen(false);
    const handleSave = (code: DiscountCode) => { onSave(code); handleClose(); };
    
    return (
        <ManagementPanel title="โค้ดส่วนลดทั้งหมด" onAddNew={handleAdd}>
            {/* Mobile View */}
            <div className="md:hidden divide-y divide-gray-200">
                {codes.map(c => (
                    <div key={c.id} className="p-4 flex justify-between items-start gap-4">
                        <div className="flex-grow">
                            <p className="font-bold text-gray-900">{c.code}</p>
                            <p className="text-sm text-gray-600">{c.type === 'percentage' ? `ลด ${c.value}%` : `ลด ${c.value} บาท`}</p>
                            <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                                {c.isActive ? 'ใช้งานได้' : 'ไม่ใช้งาน'}
                            </span>
                        </div>
                        <div className="flex items-center flex-shrink-0 ml-2">
                            <button onClick={() => handleEdit(c)} className="p-2 text-indigo-600 hover:bg-gray-100 rounded-full"><Edit className="w-5 h-5" /></button>
                            <button onClick={() => onDelete(c.id)} className="p-2 text-red-600 hover:bg-gray-100 rounded-full"><Trash2 className="w-5 h-5" /></button>
                        </div>
                    </div>
                ))}
            </div>
            {/* Desktop View */}
            <div className="overflow-x-auto hidden md:block">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50"><tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">โค้ด</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ประเภท</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">มูลค่า</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">สถานะ</th>
                        <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase">จัดการ</th>
                    </tr></thead>
                    <tbody className="bg-white divide-y divide-gray-200">{codes.map(c => (<tr key={c.id}>
                        <td className="px-6 py-4 whitespace-nowrap"><div className="text-sm font-bold text-gray-900">{c.code}</div></td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{c.type === 'percentage' ? 'เปอร์เซ็นต์' : 'จำนวนเต็ม'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{c.type === 'percentage' ? `${c.value}%` : `${c.value} บาท`}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm"><span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${c.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{c.isActive ? 'ใช้งานได้' : 'ไม่ใช้งาน'}</span></td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium"><button onClick={() => handleEdit(c)} className="text-indigo-600 hover:text-indigo-900 mr-4"><Edit className="w-5 h-5" /></button><button onClick={() => onDelete(c.id)} className="text-red-600 hover:text-red-900"><Trash2 className="w-5 h-5" /></button></td></tr>))}
                    </tbody>
                </table>
            </div>
            {modalOpen && <DiscountForm code={editingCode} onSave={handleSave} onClose={handleClose} />}
        </ManagementPanel>
    );
};

const DiscountForm: React.FC<{ code: DiscountCode | null, onSave: (d: DiscountCode) => void, onClose: () => void }> = ({ code, onSave, onClose }) => {
    const [formState, setFormState] = useState<Omit<DiscountCode, 'id'>>({ code: '', type: 'percentage', value: 0, isActive: true, ...code });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
            const { checked } = e.target as HTMLInputElement;
            setFormState({ ...formState, [name]: checked });
        } else {
            setFormState({ ...formState, [name]: (name === 'value') ? parseFloat(value) : value });
        }
    };
    const handleSave = () => onSave({ ...formState, id: code?.id || 0 });

    return <Modal title={code ? 'แก้ไขโค้ดส่วนลด' : 'เพิ่มโค้ดส่วนลดใหม่'} onClose={onClose}>
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <FormInput label="โค้ด" name="code" value={formState.code} onChange={handleChange} />
            <div>
                <label htmlFor="type" className="block text-sm font-medium text-gray-700">ประเภท</label>
                <select name="type" id="type" value={formState.type} onChange={handleChange} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                    <option value="percentage">เปอร์เซ็นต์</option>
                    <option value="fixed">จำนวนเต็ม (บาท)</option>
                </select>
            </div>
            <FormInput label="มูลค่า" name="value" type="number" value={formState.value} onChange={handleChange} />
            <div className="flex items-center">
                <input id="isActive" name="isActive" type="checkbox" checked={formState.isActive} onChange={handleChange} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded" />
                <label htmlFor="isActive" className="ml-2 block text-sm text-gray-900">เปิดใช้งาน</label>
            </div>
        </FormWrapper>
    </Modal>;
};

// Main Admin Page Component
const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { products, categories, onSaveProduct, onDeleteProduct, onLogout } = props;
  const [activeSection, setActiveSection] = useState<AdminSection>('homepage');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { addToast } = useToast();

  const handleOpenProductModal = (product?: Product) => { setEditingProduct(product || null); setIsProductModalOpen(true); };
  const handleCloseProductModal = () => { setIsProductModalOpen(false); setEditingProduct(null); };
  
  const handleSaveProductWithToast = (product: Product) => {
    onSaveProduct(product);
    addToast('บันทึกสินค้าเรียบร้อยแล้ว', 'success');
    handleCloseProductModal();
  };

  const handleDeleteProductWithToast = (id: number) => {
    if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) {
        onDeleteProduct(id);
        addToast('ลบสินค้าเรียบร้อยแล้ว', 'success');
    }
  };

  const handleSaveArticleWithToast = (article: Article) => { props.onSaveArticle(article); addToast('บันทึกบทความเรียบร้อยแล้ว', 'success'); };
  const handleDeleteArticleWithToast = (articleId: number) => { if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) { props.onDeleteArticle(articleId); addToast('ลบบทความเรียบร้อยแล้ว', 'success'); } };
  const handleSaveHeroSlideWithToast = (slide: HeroSlide) => { props.onSaveHeroSlide(slide); addToast('บันทึก Hero Banner เรียบร้อยแล้ว', 'success'); };
  const handleDeleteHeroSlideWithToast = (slideId: number) => { if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) { props.onDeleteHeroSlide(slideId); addToast('ลบ Hero Banner เรียบร้อยแล้ว', 'success'); } };
  const handleSaveComputerSetGroupWithToast = (group: ComputerSetGroup) => { props.onSaveComputerSetGroup(group); addToast('บันทึกข้อมูลคอมเซ็ตเรียบร้อยแล้ว', 'success'); };
  const handleDeleteComputerSetGroupWithToast = (groupId: number) => { if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?')) { props.onDeleteComputerSetGroup(groupId); addToast('ลบกลุ่มคอมเซ็ตเรียบร้อยแล้ว', 'success'); } };
  const handleSaveDiscountCodeWithToast = (code: DiscountCode) => { props.onSaveDiscountCode(code); addToast('บันทึกโค้ดส่วนลดเรียบร้อยแล้ว', 'success'); };
  const handleDeleteDiscountCodeWithToast = (codeId: number) => { if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบโค้ดนี้?')) { props.onDeleteDiscountCode(codeId); addToast('ลบโค้ดส่วนลดเรียบร้อยแล้ว', 'success'); } };

  const navItems = [
    { id: 'homepage', name: 'จัดการหน้าแรก', icon: <Home /> },
    { id: 'products', name: 'จัดการสินค้า', icon: <ShoppingCart /> },
    { id: 'computerSets', name: 'จัดการคอมเซ็ต', icon: <Tv /> },
    { id: 'articles', name: 'จัดการบทความ', icon: <Newspaper /> },
    { id: 'hero', name: 'จัดการ Hero Banner', icon: <ImageIcon /> },
    { id: 'discounts', name: 'จัดการโค้ดส่วนลด', icon: <Percent /> },
    { id: 'categoryPages', name: 'แบนเนอร์หมวดหมู่', icon: <LayoutGrid /> },
    { id: 'seo', name: 'จัดการ SEO & META', icon: <Globe /> },
  ] as const;

  const renderContent = () => {
    switch (activeSection) {
      case 'homepage': return <HomepageManagement content={props.homepageContent} onSave={props.onSaveHomepageContent} />;
      case 'products': return <ManagementPanel title="สินค้าทั้งหมด" onAddNew={() => handleOpenProductModal()}><ProductManagement products={products} categories={categories} onEdit={handleOpenProductModal} onDelete={handleDeleteProductWithToast} /></ManagementPanel>;
      case 'computerSets': return <ComputerSetManagement groups={props.computerSetGroups} onSave={handleSaveComputerSetGroupWithToast} onDelete={handleDeleteComputerSetGroupWithToast} />;
      case 'articles': return <ArticleManagement articles={props.articles} onSave={handleSaveArticleWithToast} onDelete={handleDeleteArticleWithToast} />;
      case 'hero': return <HeroSlideManagement slides={props.heroSlides} onSave={handleSaveHeroSlideWithToast} onDelete={handleDeleteHeroSlideWithToast} />;
      case 'seo': return <SeoManagement seoData={props.seoData} onSave={props.onSaveSeoData} />;
      case 'categoryPages': return <CategoryPageManagement data={props.categoryPageData} onSave={props.onSaveCategoryPageData} />;
      case 'discounts': return <DiscountManagement codes={props.discountCodes} onSave={handleSaveDiscountCodeWithToast} onDelete={handleDeleteDiscountCodeWithToast} />;
      default: return <div className="p-8"><p>ยินดีต้อนรับสู่แผงควบคุมผู้ดูแลระบบ</p></div>;
    }
  };
  
  const MobileMenu = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden" onClick={() => setIsMobileMenuOpen(false)}>
        <aside className="fixed inset-y-0 left-0 w-72 bg-gray-800 text-white flex flex-col animate-slide-in-right" onClick={e => e.stopPropagation()}>
            <div className="h-20 flex items-center justify-between px-6 border-b border-gray-700">
                <h2 className="text-xl font-bold">Admin Menu</h2>
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-700"><X size={20} /></button>
            </div>
            <nav className="flex-grow overflow-y-auto"><ul>
                {navItems.map(item => (<li key={item.id}><button onClick={() => { setActiveSection(item.id); setIsMobileMenuOpen(false); }} className={`w-full flex items-center px-6 py-4 text-left transition-colors duration-200 ${ activeSection === item.id ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }`}>
                    <div className="w-6 h-6 mr-3">{item.icon}</div><span className="font-medium">{item.name}</span></button></li>
                ))}
            </ul></nav>
            <div className="p-4 border-t border-gray-700"><button onClick={onLogout} className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"><LogOut className="w-5 h-5 mr-2" />ออกจากระบบ</button></div>
        </aside>
    </div>
  );

  return (
    <div className="flex h-screen bg-white font-sans">
      <aside className="w-64 bg-gray-800 text-white flex-shrink-0 flex-col hidden lg:flex">
        <div className="h-20 flex items-center justify-center text-2xl font-bold border-b border-gray-700">Admin Panel</div>
        <nav className="flex-grow"><ul>
            {navItems.map(item => (<li key={item.id}><button onClick={() => setActiveSection(item.id)} className={`w-full flex items-center px-6 py-4 text-left transition-colors duration-200 ${ activeSection === item.id ? 'bg-orange-500 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white' }`}>
                <div className="w-6 h-6 mr-3">{item.icon}</div><span className="font-medium">{item.name}</span></button></li>))}
        </ul></nav>
        <div className="p-4 border-t border-gray-700"><button onClick={onLogout} className="w-full flex items-center justify-center bg-red-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-red-700 transition-colors"><LogOut className="w-5 h-5 mr-2" />ออกจากระบบ</button></div>
      </aside>

      {isMobileMenuOpen && <MobileMenu />}

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="h-20 bg-white shadow-md flex items-center justify-between px-4 sm:px-8 flex-shrink-0 z-10">
            <div className="flex items-center">
                <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden p-2 mr-2 -ml-2 text-gray-600"><Menu className="w-6 h-6" /></button>
                <h1 className="text-xl font-bold text-gray-800 hidden sm:block">แผงควบคุม - {navItems.find(item => item.id === activeSection)?.name}</h1>
                <h1 className="text-lg font-bold text-gray-800 sm:hidden truncate">{navItems.find(item => item.id === activeSection)?.name}</h1>
            </div>
        </header>
        <div className="flex-1 overflow-y-auto bg-gray-100">{renderContent()}</div>
      </main>
      
      <ProductForm isOpen={isProductModalOpen} onClose={handleCloseProductModal} onSave={handleSaveProductWithToast} product={editingProduct} categories={categories}/>
    </div>
  );
};

export default AdminPage;