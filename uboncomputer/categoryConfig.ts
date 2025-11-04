import { ProductCategory, Product } from './types';

export interface FilterConfig {
    key: keyof Product | `specs.${keyof NonNullable<Product['specs']>}`;
    label: string;
}

export interface CategoryConfig {
    name: string;
    title: string;
    internalCat: string; // The value in product.category
    filters: FilterConfig[];
}

export const categoryConfigurations: Record<ProductCategory, CategoryConfig> = {
    cpu: {
        name: 'CPU',
        title: 'CPU / ซีพียู',
        internalCat: 'CPU',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
            { key: 'specs.socket', label: 'Socket' },
        ],
    },
    gpu: {
        name: 'GPU',
        title: 'GPU / การ์ดจอ',
        internalCat: 'GPU',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    ram: {
        name: 'RAM',
        title: 'RAM / แรม',
        internalCat: 'RAM',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
            { key: 'specs.ramType', label: 'ชนิด RAM' },
        ],
    },
    motherboard: {
        name: 'Motherboard',
        title: 'Motherboard / เมนบอร์ด',
        internalCat: 'Motherboard',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
            { key: 'specs.socket', label: 'Socket' },
            { key: 'specs.ramType', label: 'ชนิด RAM' },
        ],
    },
    storage: {
        name: 'Storage',
        title: 'Storage / อุปกรณ์จัดเก็บข้อมูล',
        internalCat: 'Storage',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    powerSupply: {
        name: 'Power Supply',
        title: 'Power Supply / พาวเวอร์ซัพพลาย',
        internalCat: 'Power Supply',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
            { key: 'specs.wattage', label: 'กำลังไฟ (วัตต์)' },
        ],
    },
    case: {
        name: 'Case',
        title: 'Case / เคส',
        internalCat: 'Case',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    cooling: {
        name: 'Cooling',
        title: 'Cooling / ชุดระบายความร้อน',
        internalCat: 'Cooling',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    network: {
        name: 'Network',
        title: 'Network / อุปกรณ์เครือข่าย',
        internalCat: 'Network',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    software: {
        name: 'Software',
        title: 'Software / ซอฟต์แวร์',
        internalCat: 'Software',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
    server: {
        name: 'Server',
        title: 'Server / อุปกรณ์เซิร์ฟเวอร์',
        internalCat: 'Server',
        filters: [
            { key: 'brand', label: 'แบรนด์' },
        ],
    },
};