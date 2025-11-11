import React, { useState } from 'react';
import { HomepageContent, PromoBanner, YoutubeVideo, StoreBranch, InfoBarItem, DualCarouselContent, DisplayProduct, Brand, SocialPlatform, ComputerSetPageContent, ComputerSetPageBanner, Page } from '../types';
import ImageUpload from './ImageUpload';
import { FormInput, Modal, FormWrapper } from './AdminPage';
import { PlusCircle, Trash2, ChevronDown, ChevronUp, Save, Edit } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface HomepageManagementProps {
  content: HomepageContent;
  onSave: (newContent: HomepageContent) => void;
  computerSetPageContent: ComputerSetPageContent;
  onSaveComputerSetPageContent: (newContent: ComputerSetPageContent) => void;
}

const SectionEditor: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
            <button
                className="w-full flex justify-between items-center p-4 bg-gray-50 hover:bg-gray-100"
                onClick={() => setIsOpen(!isOpen)}
            >
                <h3 className="text-lg font-bold text-gray-800">{title}</h3>
                {isOpen ? <ChevronUp /> : <ChevronDown />}
            </button>
            {isOpen && <div className="p-4 md:p-6 space-y-6">{children}</div>}
        </div>
    );
};

// Form for DisplayProduct
const DisplayProductForm: React.FC<{ product: DisplayProduct | null, onSave: (p: DisplayProduct) => void, onClose: () => void }> = ({ product, onSave, onClose }) => {
    const [formState, setFormState] = useState<Omit<DisplayProduct, 'id'>>({ name: '', specs: '', price: 0, oldPrice: 0, imageUrls: [], brand: '', discountPercentage: 0, ...product });
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        const numValue = ['price', 'oldPrice', 'discountPercentage'].includes(name) ? parseFloat(value) || 0 : value;
        setFormState({ ...formState, [name]: numValue });
    };
    const handleImagesChange = (images: string[]) => setFormState(prev => ({ ...prev, imageUrls: images }));
    const handleSave = () => onSave({ ...formState, id: product?.id || Date.now() });

    return <Modal title={product ? 'แก้ไขสินค้า' : 'เพิ่มสินค้าใหม่'} onClose={onClose} size="2xl">
        <FormWrapper onSave={handleSave} onCancel={onClose}>
            <FormInput label="ชื่อสินค้า" name="name" value={formState.name} onChange={handleChange} />
            <FormInput label="สเปค" name="specs" value={formState.specs} onChange={handleChange} as="textarea" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="แบรนด์" name="brand" value={formState.brand} onChange={handleChange} />
              <FormInput label="เปอร์เซ็นต์ส่วนลด (ใส่แค่ตัวเลข)" name="discountPercentage" type="number" value={formState.discountPercentage || ''} onChange={handleChange} required={false} />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormInput label="ราคาปัจจุบัน" name="price" type="number" value={formState.price} onChange={handleChange} />
              <FormInput label="ราคาเดิม (ไม่จำเป็น)" name="oldPrice" type="number" value={formState.oldPrice || ''} onChange={handleChange} required={false} />
            </div>
            <ImageUpload label="รูปสินค้า" currentImages={formState.imageUrls} onImagesChange={handleImagesChange} />
        </FormWrapper>
    </Modal>
};

// Component to manage a list of DisplayProducts
const ProductListEditor: React.FC<{ title: string, products: DisplayProduct[], onUpdate: (products: DisplayProduct[]) => void }> = ({ title, products, onUpdate }) => {
    const [editingProduct, setEditingProduct] = useState<DisplayProduct | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleSave = (productToSave: DisplayProduct) => {
        const exists = products.some(p => p.id === productToSave.id);
        const newProducts = exists
            ? products.map(p => p.id === productToSave.id ? productToSave : p)
            : [...products, productToSave];
        onUpdate(newProducts);
        setIsModalOpen(false);
        setEditingProduct(null);
    };
    const handleDelete = (productId: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบสินค้านี้?')) {
            onUpdate(products.filter(p => p.id !== productId));
        }
    };
    const handleEdit = (product: DisplayProduct) => {
        setEditingProduct(product);
        setIsModalOpen(true);
    }
    const handleAdd = () => {
        setEditingProduct(null);
        setIsModalOpen(true);
    }
    
    return (
        <div className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
            <h4 className="font-semibold text-lg">{title}</h4>
            <div className="space-y-2">
                {products.map(p => (
                    <div key={p.id} className="flex items-center justify-between p-2 bg-white border rounded-md">
                        <div className="flex items-center gap-3">
                            <img src={p.imageUrls[0]} alt={p.name} className="w-12 h-12 object-contain rounded"/>
                            <span className="text-sm font-medium text-gray-800">{p.name}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button onClick={() => handleEdit(p)} className="p-1.5 text-indigo-600 hover:bg-indigo-100 rounded"><Edit size={16}/></button>
                            <button onClick={() => handleDelete(p.id)} className="p-1.5 text-red-600 hover:bg-red-100 rounded"><Trash2 size={16}/></button>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={handleAdd} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มสินค้า</button>
            {isModalOpen && <DisplayProductForm product={editingProduct} onSave={handleSave} onClose={() => setIsModalOpen(false)}/>}
        </div>
    )
}

// Component to manage a list of Brands
const BrandListEditor: React.FC<{ title: string, brands: Brand[], onUpdate: (brands: Brand[]) => void }> = ({ title, brands, onUpdate }) => {
    const handleAdd = () => {
        onUpdate([...brands, { id: Date.now(), name: '', logoUrl: '' }]);
    };
    const handleUpdate = (index: number, field: 'name' | 'logoUrl', value: string) => {
        const newBrands = [...brands];
        newBrands[index] = { ...newBrands[index], [field]: value };
        onUpdate(newBrands);
    };
    const handleDelete = (id: number) => {
        if (window.confirm('คุณแน่ใจหรือไม่ว่าต้องการลบแบรนด์นี้?')) {
            onUpdate(brands.filter(b => b.id !== id));
        }
    };
    
    return (
        <div className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
            <h4 className="font-semibold text-lg">{title}</h4>
             {brands.map((brand, index) => (
                 <div key={brand.id} className="flex items-end gap-3 p-3 border rounded-md bg-white">
                     <div className="flex-grow grid grid-cols-1 md:grid-cols-2 gap-3 items-center">
                         <ImageUpload label={`โลโก้ ${index+1}`} currentImages={brand.logoUrl ? [brand.logoUrl] : []} onImagesChange={imgs => handleUpdate(index, 'logoUrl', imgs[0] || '')} maxImages={1} />
                         <FormInput label="ชื่อแบรนด์" name={`brand-name-${index}`} value={brand.name} onChange={e => handleUpdate(index, 'name', e.target.value)} />
                     </div>
                     <button onClick={() => handleDelete(brand.id)} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><Trash2 size={18}/></button>
                 </div>
             ))}
            <button onClick={handleAdd} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มแบรนด์</button>
        </div>
    )
}

const HomepageManagement: React.FC<HomepageManagementProps> = ({ content, onSave, computerSetPageContent, onSaveComputerSetPageContent }) => {
  const [localContent, setLocalContent] = useState<HomepageContent>(content);
  const [localComputerSetContent, setLocalComputerSetContent] = useState<ComputerSetPageContent>(computerSetPageContent);
  const { addToast } = useToast();

  const handleSave = () => {
    onSave(localContent);
    onSaveComputerSetPageContent(localComputerSetContent);
    addToast('บันทึกข้อมูลหน้าเว็บเรียบร้อยแล้ว', 'success');
  };

  const handleSimpleChange = (section: keyof HomepageContent | 'sectionTitles', field: string, value: any) => {
    setLocalContent(prev => {
      if (section === 'sectionTitles') {
        return { ...prev, sectionTitles: { ...prev.sectionTitles, [field]: value } };
      }
      return {
        ...prev,
        [section]: {
            // @ts-ignore
            ...prev[section],
            [field]: value
        }
      };
    });
  };
  
  const handleListChange = (section: 'promoBanners' | 'youtube' | 'storeInfo' | 'infoBar' | 'socialLinks', listName: 'videos' | 'branches' | 'items' | null, index: number, field: string, value: any) => {
      setLocalContent(prev => {
          const listKey = listName ? listName : section;
          // @ts-ignore
          const currentList = listName ? prev[section][listKey] : prev[section];
          const newList = [...currentList];
          newList[index] = { ...newList[index], [field]: value };

          if (listName) {
            return {...prev, [section]: { ...prev[section], [listKey]: newList }};
          }
          // @ts-ignore
          return {...prev, [section]: newList};
      });
  };

  const addListItem = (section: 'promoBanners' | 'youtube' | 'storeInfo' | 'infoBar' | 'socialLinks', listName: 'videos' | 'branches' | 'items' | null) => {
    setLocalContent(prev => {
        const listKey = listName ? listName : section;
        // @ts-ignore
        const currentList = listName ? prev[section][listKey] : prev[section];
        
        let newItem;
        switch(section) {
            case 'promoBanners': newItem = { id: Date.now(), src: '', alt: '', link: '' }; break;
            case 'youtube': newItem = { id: Date.now(), imageUrl: '', link: '', alt: '' }; break;
            case 'storeInfo': newItem = { id: Date.now(), name: '', phone: '' }; break;
            case 'infoBar': newItem = { id: Date.now(), icon: 'Truck', title: '', subtitle: '' }; break;
            case 'socialLinks': newItem = { id: Date.now(), platform: 'Facebook', url: '#' }; break;
            default: newItem = {};
        }

        const newList = [...currentList, newItem];
        if (listName) {
            return {...prev, [section]: { ...prev[section], [listKey]: newList }};
        }
        // @ts-ignore
        return {...prev, [section]: newList};
    });
  }

  const removeListItem = (section: 'promoBanners' | 'youtube' | 'storeInfo' | 'infoBar' | 'socialLinks', listName: 'videos' | 'branches' | 'items' | null, index: number) => {
    if (!window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบรายการนี้?")) return;
    setLocalContent(prev => {
        const listKey = listName ? listName : section;
        // @ts-ignore
        const currentList = listName ? prev[section][listKey] : prev[section];
        const newList = currentList.filter((_:any, i:number) => i !== index);

        if (listName) {
            return {...prev, [section]: { ...prev[section], [listKey]: newList }};
        }
        // @ts-ignore
        return {...prev, [section]: newList};
    });
  }
  
  const handleProductListUpdate = (section: 'newProducts' | 'notebooks' | 'computers' | 'printers' | 'preBuiltPCs', newProducts: DisplayProduct[]) => {
      setLocalContent(prev => ({...prev, [section]: newProducts}));
  }
  
  const handleBrandListUpdate = (section: 'notebookBrands' | 'computerBrands' | 'printerBrands' | 'preBuiltPCBrands', newBrands: Brand[]) => {
      setLocalContent(prev => ({...prev, [section]: newBrands}));
  }

  const handleCarouselChange = (carouselId: 1 | 2, action: 'add' | 'remove' | 'update', slideIndex?: number, field?: 'src' | 'alt', value?: string) => {
    setLocalContent(prev => {
        const newCarousels = prev.dualCarousels.map(carousel => {
            if (carousel.id === carouselId) {
                let newSlides = [...carousel.slides];
                if (action === 'add') {
                    newSlides.push({ id: Date.now(), src: '', alt: '' });
                } else if (action === 'remove' && slideIndex !== undefined) {
                    newSlides.splice(slideIndex, 1);
                } else if (action === 'update' && slideIndex !== undefined && field && value !== undefined) {
                    newSlides[slideIndex] = { ...newSlides[slideIndex], [field]: value };
                }
                return { ...carousel, slides: newSlides };
            }
            return carousel;
        });
        return { ...prev, dualCarousels: newCarousels };
    });
  };

  const handleComputerSetContentChange = (section: 'mainBanner' | 'secondaryBanners' | 'intro', index: number | null, field: string, value: string) => {
    setLocalComputerSetContent(prev => {
      if (section === 'mainBanner') {
        return { ...prev, mainBanner: { ...prev.mainBanner, [field]: value } };
      }
      if (section === 'secondaryBanners' && index !== null) {
        const newBanners = [...prev.secondaryBanners];
        // @ts-ignore
        newBanners[index] = { ...newBanners[index], [field]: value };
        return { ...prev, secondaryBanners: newBanners as [ComputerSetPageBanner, ComputerSetPageBanner] };
      }
       if (section === 'intro') {
        return { ...prev, intro: { ...prev.intro, [field]: value } };
      }
      return prev;
    });
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex justify-between items-center mb-6 sticky top-0 bg-gray-100/80 backdrop-blur-sm py-4 z-10 -mx-8 px-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">จัดการหน้าเว็บ</h2>
            <div className="flex items-center gap-4">
                <button
                    onClick={handleSave}
                    className="flex items-center bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors"
                >
                    <Save className="w-5 h-5 mr-2" />
                    บันทึกการเปลี่ยนแปลงทั้งหมด
                </button>
            </div>
        </div>
      
      <SectionEditor title="แถบข้อความบนสุด (Top Bar)">
        <FormInput 
          label="ข้อความ" 
          name="headerTopBarText" 
          value={localContent.headerTopBarText || ''} 
          onChange={e => setLocalContent(prev => ({ ...prev, headerTopBarText: e.target.value }))} 
        />
      </SectionEditor>
      
      <SectionEditor title="ข้อความแนะนำร้าน (หน้าแรก)">
        <FormInput label="หัวข้อ" name="title" value={localContent.introSection.title} onChange={e => handleSimpleChange('introSection', 'title', e.target.value)} />
        <FormInput label="เนื้อหา" name="paragraph" value={localContent.introSection.paragraph} onChange={e => handleSimpleChange('introSection', 'paragraph', e.target.value)} as="textarea" />
        <FormInput label="ข้อความบนปุ่ม" name="buttonText" value={localContent.introSection.buttonText} onChange={e => handleSimpleChange('introSection', 'buttonText', e.target.value)} />
        <FormInput label="ลิงก์ของปุ่ม" name="buttonLink" value={localContent.introSection.buttonLink} onChange={e => handleSimpleChange('introSection', 'buttonLink', e.target.value)} />
      </SectionEditor>

      <SectionEditor title="จัดการหน้าคอมพิวเตอร์เซ็ต (Computer Set Page)">
        <div className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
          <h4 className="font-semibold text-lg">Intro Section</h4>
          <FormInput label="Title" name="cs-intro-title" value={localComputerSetContent.intro.title} onChange={e => handleComputerSetContentChange('intro', null, 'title', e.target.value)} />
          <FormInput label="Description" name="cs-intro-desc" value={localComputerSetContent.intro.description} as="textarea" onChange={e => handleComputerSetContentChange('intro', null, 'description', e.target.value)} />
          <FormInput label="Button Text" name="cs-intro-btn-text" value={localComputerSetContent.intro.buttonText} onChange={e => handleComputerSetContentChange('intro', null, 'buttonText', e.target.value)} />
        </div>
        <div className="p-4 border rounded-lg space-y-4 bg-gray-50/50">
          <h4 className="font-semibold text-lg">Banners</h4>
          <div className="p-4 border rounded-lg space-y-3 relative bg-white">
            <h5 className="font-semibold">แบนเนอร์หลัก (Main Banner)</h5>
            <ImageUpload
              label="รูปภาพ"
              currentImages={localComputerSetContent.mainBanner.src ? [localComputerSetContent.mainBanner.src] : []}
              onImagesChange={imgs => handleComputerSetContentChange('mainBanner', null, 'src', imgs[0] || '')}
              maxImages={1}
            />
            <FormInput label="Alt Text" name="cs-main-alt" value={localComputerSetContent.mainBanner.alt} onChange={e => handleComputerSetContentChange('mainBanner', null, 'alt', e.target.value)} />
            <FormInput label="Link" name="cs-main-link" value={localComputerSetContent.mainBanner.link} onChange={e => handleComputerSetContentChange('mainBanner', null, 'link', e.target.value)} />
          </div>
          <div className="p-4 border rounded-lg space-y-3 relative bg-white">
            <h5 className="font-semibold">แบนเนอร์รอง (Secondary Banners)</h5>
            {localComputerSetContent.secondaryBanners.map((banner, index) => (
              <div key={banner.id || index} className="p-4 border rounded-lg space-y-3 relative bg-gray-50/50">
                <h6 className="font-semibold">แบนเนอร์ {index + 1}</h6>
                <ImageUpload
                  label="รูปภาพ"
                  currentImages={banner.src ? [banner.src] : []}
                  onImagesChange={imgs => handleComputerSetContentChange('secondaryBanners', index, 'src', imgs[0] || '')}
                  maxImages={1}
                />
                <FormInput label="Alt Text" name={`cs-sec-${index}-alt`} value={banner.alt} onChange={e => handleComputerSetContentChange('secondaryBanners', index, 'alt', e.target.value)} />
                <FormInput label="Link" name={`cs-sec-${index}-link`} value={banner.link} onChange={e => handleComputerSetContentChange('secondaryBanners', index, 'link', e.target.value)} />
              </div>
            ))}
          </div>
        </div>
      </SectionEditor>

      <SectionEditor title="จัดการสินค้าหน้าแรก">
        <ProductListEditor title="สินค้าใหม่" products={localContent.newProducts} onUpdate={(p) => handleProductListUpdate('newProducts', p)} />
        <ProductListEditor title="Notebooks" products={localContent.notebooks} onUpdate={(p) => handleProductListUpdate('notebooks', p)} />
        <ProductListEditor title="คอมพิวเตอร์" products={localContent.computers} onUpdate={(p) => handleProductListUpdate('computers', p)} />
        <ProductListEditor title="ปริ้นเตอร์" products={localContent.printers} onUpdate={(p) => handleProductListUpdate('printers', p)} />
        <ProductListEditor title="คอมประกอบ" products={localContent.preBuiltPCs} onUpdate={(p) => handleProductListUpdate('preBuiltPCs', p)} />
      </SectionEditor>

      <SectionEditor title="จัดการแบรนด์ (สำหรับ Sidebar)">
          <BrandListEditor title="แบรนด์ Notebook" brands={localContent.notebookBrands} onUpdate={(b) => handleBrandListUpdate('notebookBrands', b)} />
          <BrandListEditor title="แบรนด์ คอมพิวเตอร์" brands={localContent.computerBrands} onUpdate={(b) => handleBrandListUpdate('computerBrands', b)} />
          <BrandListEditor title="แบรนด์ ปริ้นเตอร์" brands={localContent.printerBrands} onUpdate={(b) => handleBrandListUpdate('printerBrands', b)} />
          <BrandListEditor title="แบรนด์ คอมประกอบ" brands={localContent.preBuiltPCBrands} onUpdate={(b) => handleBrandListUpdate('preBuiltPCBrands', b)} />
      </SectionEditor>

      <SectionEditor title="แบนเนอร์โปรโมชั่น (3 ส่วน)">
          {localContent.promoBanners.map((banner, index) => (
              <div key={banner.id} className="p-4 border rounded-lg space-y-3 relative">
                  <h4 className="font-semibold">แบนเนอร์ {index + 1}</h4>
                   <ImageUpload label="รูปภาพ" currentImages={banner.src ? [banner.src] : []} onImagesChange={imgs => handleListChange('promoBanners', null, index, 'src', imgs[0] || '')} maxImages={1} />
                   <FormInput label="Alt Text" name={`alt-${index}`} value={banner.alt} onChange={e => handleListChange('promoBanners', null, index, 'alt', e.target.value)} />
                   <FormInput label="Link" name={`link-${index}`} value={banner.link} onChange={e => handleListChange('promoBanners', null, index, 'link', e.target.value)} />
                   <button onClick={() => removeListItem('promoBanners', null, index)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><Trash2 size={16}/></button>
              </div>
          ))}
          <button onClick={() => addListItem('promoBanners', null)} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มแบนเนอร์</button>
      </SectionEditor>

      <SectionEditor title="ภาพสไลด์คู่ (Dual Carousels)">
        {localContent.dualCarousels.map(carousel => (
            <div key={carousel.id} className="p-4 border rounded-lg space-y-4">
                <h4 className="font-semibold text-lg">Carousel {carousel.id}</h4>
                {carousel.slides.map((slide, slideIndex) => (
                    <div key={slide.id} className="p-3 border rounded-md relative bg-gray-50/50">
                        <h5 className="font-medium mb-2">สไลด์ {slideIndex + 1}</h5>
                        <div className="space-y-3">
                            <ImageUpload
                                label="รูปภาพ"
                                currentImages={slide.src ? [slide.src] : []}
                                onImagesChange={imgs => handleCarouselChange(carousel.id, 'update', slideIndex, 'src', imgs[0] || '')}
                                maxImages={1}
                            />
                            <FormInput
                                label="Alt Text"
                                name={`carousel-${carousel.id}-slide-${slideIndex}-alt`}
                                value={slide.alt}
                                onChange={e => handleCarouselChange(carousel.id, 'update', slideIndex, 'alt', e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => {
                                if (window.confirm("คุณแน่ใจหรือไม่ว่าต้องการลบสไลด์นี้?")) {
                                    handleCarouselChange(carousel.id, 'remove', slideIndex);
                                }
                            }}
                            className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ))}
                 <button onClick={() => handleCarouselChange(carousel.id, 'add')} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600">
                    <PlusCircle size={16} className="mr-2"/>เพิ่มสไลด์
                </button>
            </div>
        ))}
      </SectionEditor>

      <SectionEditor title="ข้อมูลร้านและสาขา">
        <ImageUpload label="รูปภาพหลักของร้าน" currentImages={localContent.storeInfo.mainImage ? [localContent.storeInfo.mainImage] : []} onImagesChange={imgs => handleSimpleChange('storeInfo', 'mainImage', imgs[0] || '')} maxImages={1} />
        <h4 className="font-semibold mt-6 border-t pt-4">สาขาทั้งหมด</h4>
        {localContent.storeInfo.branches.map((branch, index) => (
          <div key={branch.id} className="flex items-end gap-3 p-3 border rounded-md">
            <div className="flex-grow grid grid-cols-2 gap-3">
              <FormInput label={`ชื่อสาขา ${index+1}`} name={`branch-name-${index}`} value={branch.name} onChange={e => handleListChange('storeInfo', 'branches', index, 'name', e.target.value)} />
              <FormInput label="เบอร์โทรศัพท์" name={`branch-phone-${index}`} value={branch.phone} onChange={e => handleListChange('storeInfo', 'branches', index, 'phone', e.target.value)} />
            </div>
            <button onClick={() => removeListItem('storeInfo', 'branches', index)} className="p-2 bg-red-100 text-red-600 rounded-md hover:bg-red-200"><Trash2 size={18}/></button>
          </div>
        ))}
        <button onClick={() => addListItem('storeInfo', 'branches')} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600 mt-2"><PlusCircle size={16} className="mr-2"/>เพิ่มสาขา</button>
      </SectionEditor>

      <SectionEditor title="แบนเนอร์โปรโมชั่นหลัก (เต็มความกว้าง)">
          <ImageUpload label="รูปภาพ" currentImages={localContent.mainPromoBanner.src ? [localContent.mainPromoBanner.src] : []} onImagesChange={imgs => handleSimpleChange('mainPromoBanner', 'src', imgs[0] || '')} maxImages={1} />
          <FormInput label="Alt Text" name="main-promo-alt" value={localContent.mainPromoBanner.alt} onChange={e => handleSimpleChange('mainPromoBanner', 'alt', e.target.value)} />
          <FormInput label="Link" name="main-promo-link" value={localContent.mainPromoBanner.link} onChange={e => handleSimpleChange('mainPromoBanner', 'link', e.target.value)} />
      </SectionEditor>

       <SectionEditor title="วิดีโอ YouTube">
          {localContent.youtube.videos.map((video, index) => (
              <div key={video.id} className="p-4 border rounded-lg space-y-3 relative">
                  <h4 className="font-semibold">วิดีโอ {index + 1}</h4>
                   <FormInput label="URL ภาพ Thumbnail" name={`yt-image-${index}`} value={video.imageUrl} onChange={e => handleListChange('youtube', 'videos', index, 'imageUrl', e.target.value)} />
                   <FormInput label="ลิงก์วิดีโอ (YouTube)" name={`yt-link-${index}`} value={video.link} onChange={e => handleListChange('youtube', 'videos', index, 'link', e.target.value)} />
                   <FormInput label="Alt Text" name={`yt-alt-${index}`} value={video.alt} onChange={e => handleListChange('youtube', 'videos', index, 'alt', e.target.value)} />
                   <button onClick={() => removeListItem('youtube', 'videos', index)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><Trash2 size={16}/></button>
              </div>
          ))}
          <button onClick={() => addListItem('youtube', 'videos')} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600"><PlusCircle size={16} className="mr-2"/>เพิ่มวิดีโอ</button>
      </SectionEditor>

      <SectionEditor title="แถบข้อมูลบริการ (Info Bar)">
        {localContent.infoBar.items.map((item, index) => (
          <div key={item.id} className="p-3 border rounded-md relative">
             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">ไอคอน</label>
                    <select value={item.icon} onChange={e => handleListChange('infoBar', 'items', index, 'icon', e.target.value)} className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                        <option value="Truck">Truck</option>
                        <option value="RefreshCw">Refresh</option>
                        <option value="Clock">Clock</option>
                        <option value="ShieldCheck">Shield</option>
                    </select>
                </div>
                <FormInput label="หัวข้อ" name={`info-title-${index}`} value={item.title} onChange={e => handleListChange('infoBar', 'items', index, 'title', e.target.value)} />
                <FormInput label="คำอธิบาย" name={`info-subtitle-${index}`} value={item.subtitle} onChange={e => handleListChange('infoBar', 'items', index, 'subtitle', e.target.value)} />
             </div>
              <button onClick={() => removeListItem('infoBar', 'items', index)} className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"><Trash2 size={16}/></button>
          </div>
        ))}
         <button onClick={() => addListItem('infoBar', 'items')} className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600 mt-2"><PlusCircle size={16} className="mr-2"/>เพิ่มรายการ</button>
      </SectionEditor>
      
      <SectionEditor title="ลิงก์โซเชียลมีเดีย">
          {localContent.socialLinks.map((link, index) => (
              <div key={link.id} className="p-3 border rounded-md relative bg-white">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                          <label className="block text-sm font-medium text-gray-700">แพลตฟอร์ม</label>
                          <select
                              value={link.platform}
                              onChange={e => handleListChange('socialLinks', null, index, 'platform', e.target.value)}
                              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-orange-500 focus:border-orange-500"
                          >
                              <option value="Facebook">Facebook</option>
                              <option value="Youtube">Youtube</option>
                              <option value="Tiktok">Tiktok</option>
                          </select>
                      </div>
                      <FormInput
                          label="URL Link"
                          name={`social-url-${index}`}
                          value={link.url}
                          onChange={e => handleListChange('socialLinks', null, index, 'url', e.target.value)}
                      />
                  </div>
                  <button
                      onClick={() => removeListItem('socialLinks', null, index)}
                      className="absolute top-2 right-2 p-1 bg-red-100 text-red-600 rounded-full hover:bg-red-200"
                  >
                      <Trash2 size={16}/>
                  </button>
              </div>
          ))}
          <button
              onClick={() => addListItem('socialLinks', null)}
              className="flex items-center bg-blue-500 text-white text-sm font-bold py-1.5 px-3 rounded-md hover:bg-blue-600 mt-2"
          >
              <PlusCircle size={16} className="mr-2"/>เพิ่มลิงก์
          </button>
      </SectionEditor>


      <SectionEditor title="ชื่อหัวข้อ Section ต่างๆ">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormInput label="หัวข้อโน้ตบุ๊ค" name="title-notebooks" value={localContent.sectionTitles.notebooks} onChange={e => handleSimpleChange('sectionTitles', 'notebooks', e.target.value)} />
            <FormInput label="หัวข้อคอมพิวเตอร์" name="title-computers" value={localContent.sectionTitles.computers} onChange={e => handleSimpleChange('sectionTitles', 'computers', e.target.value)} />
            <FormInput label="หัวข้อปริ้นเตอร์" name="title-printers" value={localContent.sectionTitles.printers} onChange={e => handleSimpleChange('sectionTitles', 'printers', e.target.value)} />
            <FormInput label="หัวข้อสินค้าใหม่" name="title-newProducts" value={localContent.sectionTitles.newProducts} onChange={e => handleSimpleChange('sectionTitles', 'newProducts', e.target.value)} />
            <FormInput label="หัวข้อคอมประกอบ" name="title-preBuiltPCs" value={localContent.sectionTitles.preBuiltPCs} onChange={e => handleSimpleChange('sectionTitles', 'preBuiltPCs', e.target.value)} />
            <FormInput label="หัวข้อยูทูป" name="title-youtube" value={localContent.sectionTitles.youtube} onChange={e => handleSimpleChange('sectionTitles', 'youtube', e.target.value)} />
            <FormInput label="หัวข้อบทความ" name="title-articles" value={localContent.sectionTitles.articles} onChange={e => handleSimpleChange('sectionTitles', 'articles', e.target.value)} />
        </div>
      </SectionEditor>
    </div>
  );
};

export default HomepageManagement;