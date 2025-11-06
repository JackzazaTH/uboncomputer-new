import { ReactNode } from 'react';

export type ProductAvailability = 'inStock' | 'outOfStock' | 'preOrder' | 'byOrder';

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  costPrice: number;
  stock: number;
  availability: ProductAvailability;
  imageUrls: string[];
  rating: number;
  reviewCount: number;
  brand: string;
  description?: string;
  specs?: {
    socket?: string;
    ramType?: string;
    formFactor?: string;
    wattage?: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface ComputerSetSpecs {
  cpu: string;
  vga: string;
  ram: string;
  storage: string;
  motherboard: string;
  psu: string;
  case: string;
  cooling: string;
  notes?: string;
}

export interface ComputerSetProduct {
  id: number;
  name: string;
  specs: ComputerSetSpecs;
  price: number;
  oldPrice?: number;
  imageUrls: string[];
  badge?: 'NEW' | 'HOT';
}

export interface ComputerSetGroup {
  id: number;
  bannerUrl: string;
  products: ComputerSetProduct[];
}

export interface Article {
  id: number; // Added for easier management
  date: string;
  title: string;
  excerpt: string;
  imageUrl: string;
  link: string;
  content: string;
}

export interface HeroSlide {
  id: number;
  image: string;
  titleLine1: string;
  titleLine2: string;
  titleLine3: string;
  cta: string;
}

export type ProductCategory = 'cpu' | 'gpu' | 'ram' | 'motherboard' | 'storage' | 'case' | 'cooling' | 'powerSupply' | 'network' | 'software' | 'server' | 'gamingGear';

export type Page = 'home' | 'pcBuilder' | 'computerSet' | 'articles' | 'contact' | 'about' | 'admin' | 'cart' | 'promotions' | 'articleDetail' | 'productDetail' | 'corporate' | 'faq' | 'orderStatus' | 'searchResults' | 'privacy' | 'terms' | 'cookies' | 'shipping' | 'returns' | 'careers' | 'checkout' | 'compare' | 'computerSetDetail' | 'allProducts' | ProductCategory;

export type SeoEditablePage = Exclude<Page, 'admin' | 'articleDetail' | 'productDetail' | 'computerSetDetail'>;

export interface SeoSettings {
  title: string;
  description: string;
}

export type SeoData = Record<SeoEditablePage, SeoSettings>;

export interface CategoryPageData {
  bannerUrl: string;
}

export type AllCategoryPageData = Record<ProductCategory, CategoryPageData>;


export interface DisplayProduct {
  id: number;
  name:string;
  specs: string;
  price: number;
  oldPrice?: number;
  imageUrls: string[];
  brand: string;
  discountPercentage?: number;
}

export interface Brand {
  id: number;
  name: string;
  logoUrl: string;
}

// Homepage Content Management Types
export interface IntroSectionContent {
  title: string;
  paragraph: string;
  buttonText: string;
  buttonLink: string;
}

export interface PromoBanner {
  id: number;
  src: string;
  alt: string;
  link: string;
}

export interface DualCarouselContent {
  id: 1 | 2;
  slides: { id: number; src: string; alt: string }[];
}

export interface StoreBranch {
  id: number;
  name: string;
  phone: string;
}

export interface StoreInfoContent {
  mainImage: string;
  branches: StoreBranch[];
}

export interface MainPromo {
  src: string;
  alt: string;
  link: string;
}

export interface YoutubeVideo {
  id: number;
  imageUrl: string;
  link: string;
  alt: string;
}

export type IconName = 'Truck' | 'RefreshCw' | 'Clock' | 'ShieldCheck';

export interface InfoBarItem {
  id: number;
  icon: IconName;
  title: string;
  subtitle: string;
}

export type SocialPlatform = 'Facebook' | 'Youtube' | 'Tiktok';

export interface SocialLink {
  id: number;
  platform: SocialPlatform;
  url: string;
}


export interface SectionTitles {
  notebooks: string;
  computers: string;
  printers: string;
  newProducts: string;
  preBuiltPCs: string;
  youtube: string;
  articles: string;
}

export interface HomepageContent {
  headerTopBarText: string;
  introSection: IntroSectionContent;
  promoBanners: PromoBanner[];
  dualCarousels: DualCarouselContent[];
  storeInfo: StoreInfoContent;
  sectionTitles: SectionTitles;
  mainPromoBanner: MainPromo;
  youtube: {
    videos: YoutubeVideo[];
  };
  infoBar: {
    items: InfoBarItem[];
  };
  socialLinks: SocialLink[];
  // Product sections
  newProducts: DisplayProduct[];
  notebooks: DisplayProduct[];
  computers: DisplayProduct[];
  printers: DisplayProduct[];
  preBuiltPCs: DisplayProduct[];
  // Brand sections
  notebookBrands: Brand[];
  computerBrands: Brand[];
  printerBrands: Brand[];
  preBuiltPCBrands: Brand[];
}

// Order Status Types
export type OrderStatusLabel = 'ได้รับคำสั่งซื้อ' | 'กำลังจัดเตรียมสินค้า' | 'จัดส่งแล้ว' | 'จัดส่งสำเร็จ';

export interface OrderStatusStep {
  status: OrderStatusLabel;
  date: string;
  completed: boolean;
}

export interface Order {
  id: string; // Order ID like 'UBON-12345'
  phoneNumber: string;
  trackingNumber: string;
  carrier: string;
  steps: OrderStatusStep[];
  customerName: string;
}

export interface DiscountCode {
  id: number;
  code: string;
  type: 'percentage' | 'fixed';
  value: number;
  isActive: boolean;
}

// Admin Order Management Types
export type AdminOrderStatus = 'Pending' | 'Processing' | 'Shipped' | 'Completed' | 'Cancelled';

export interface OrderItem extends CartItem {}

export interface CustomerInfo {
    name: string;
    address: string;
    district: string;
    province: string;
    zipcode: string;
    phone: string;
    email: string;
}

export interface AdminOrder {
    id: number;
    orderNumber: string;
    date: string;
    customer: CustomerInfo;
    items: OrderItem[];
    total: number;
    shipping: number;
    discount: number;
    grandTotal: number;
    status: AdminOrderStatus;
    trackingNumber?: string;
    carrier?: string;
}

// Careers Page Content Type
export interface CareersFeatureCard {
  id: number;
  icon: 'Users' | 'TrendingUp' | 'Coffee';
  title: string;
  description: string;
}

export interface JobOpening {
  id: number;
  title: string;
  location: string;
  type: 'Full-time' | 'Part-time';
  description: string;
  salary?: string;
  isActive: boolean;
}

export interface CareersPageContent {
  hero: {
    title: string;
    subtitle: string;
  };
  whyUs: {
    title: string;
    subtitle: string;
    features: CareersFeatureCard[];
  };
  openings: {
    title: string;
    subtitle: string;
    jobs: JobOpening[];
  };
  cta: {
    title: string;
    subtitle: string;
    email: string;
  };
}