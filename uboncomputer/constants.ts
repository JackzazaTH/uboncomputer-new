import { Product, Category, ComputerSetGroup, Article, HeroSlide, SeoData, Brand, DisplayProduct, HomepageContent, AllCategoryPageData, Order, DiscountCode, AdminOrder, CareersPageContent } from './types';

export const mockCategories: Category[] = [
  { id: 1, name: 'CPU' },
  { id: 2, name: 'GPU' },
  { id: 3, name: 'RAM' },
  { id: 4, name: 'Motherboard' },
  { id: 5, name: 'Storage' },
  { id: 6, name: 'Case' },
  { id: 7, name: 'Cooling' },
  { id: 8, name: 'Power Supply' },
  { id: 9, name: 'Network' },
  { id: 10, name: 'Software' },
  { id: 11, name: 'Server' },
  { id: 12, name: 'Notebook' },
  { id: 13, name: 'Printer' },
  { id: 14, name: 'All-in-one PC' },
  { id: 15, name: 'Pre-built PC' },
  { id: 16, name: 'Monitor' },
  { id: 17, name: 'Gaming Gear' },
];

export const mockProducts: Product[] = [
  { id: 1, name: 'CPU INTEL CORE I9-14900KS 6.2GHz', category: 'CPU', price: 28900, costPrice: 27000, stock: 30, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/796b42b937072a392b21c608f654b42b.png', rating: 5, reviewCount: 150, brand: 'Intel', specs: { socket: 'LGA1700' }, description: 'The flagship processor from Intel, offering unparalleled performance for gaming and content creation with its innovative hybrid architecture. Specs: Socket LGA 1700 / 24 Cores / 32 Threads / 3.2 GHz' },
  { id: 2, name: 'AMD Ryzen 9 7950X', category: 'CPU', price: 21000, costPrice: 19000, stock: 45, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/cpu2/400/400', rating: 4.8, reviewCount: 98, brand: 'AMD', specs: { socket: 'AM5' }, description: 'AMD\'s top-tier Zen 4 processor, delivering exceptional multi-core performance for demanding applications and high-end gaming.' },
  { id: 3, name: 'VGA ASUS GEFORCE RTX 4090', category: 'GPU', price: 38900, costPrice: 35000, stock: 0, availability: 'preOrder', imageUrl: 'https://www.img.in.th/images/05ffb7074465c197992984534a70ed69.png', rating: 5, reviewCount: 280, brand: 'ASUS', description: 'The ultimate GeForce GPU from ASUS. It brings an enormous leap in performance, efficiency, and AI-powered graphics. Specs: 16GB GDDR6X 256-bit / Boost Clock 2640 MHz' },
  { id: 4, name: 'AMD Radeon RX 7900 XTX', category: 'GPU', price: 42000, costPrice: 38500, stock: 0, availability: 'byOrder', imageUrl: 'https://picsum.photos/seed/gpu2/400/400', rating: 4.7, reviewCount: 150, brand: 'AMD', description: 'Built on the groundbreaking AMD RDNA™ 3 architecture with chiplet technology, the Radeon™ RX 7900 XTX graphics delivers next-generation performance, visuals, and efficiency at 4K and beyond.' },
  { id: 5, name: 'Corsair Vengeance RGB 32GB DDR5', category: 'RAM', price: 4990, oldPrice: 5500, costPrice: 4800, stock: 150, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ram1/400/400', rating: 4.9, reviewCount: 180, brand: 'Corsair', specs: { ramType: 'DDR5' }, description: 'Push the limits of your system like never before with DDR5 memory, unlocking even faster frequencies, greater capacities, and better performance, illuminated by dynamic ten-zone RGB lighting.' },
  { id: 6, name: 'G.Skill Trident Z5 RGB 32GB DDR5', category: 'RAM', price: 5800, costPrice: 5100, stock: 120, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ram2/400/400', rating: 4.9, reviewCount: 165, brand: 'G.Skill', specs: { ramType: 'DDR5' }, description: 'Trident Z5 RGB series DDR5 memory is the latest G.SKILL flagship series designed for ultra-high extreme performance on next-gen DDR5 platforms.' },
  { id: 7, name: 'ASUS ROG MAXIMUS Z790 HERO', category: 'Motherboard', price: 25000, costPrice: 22500, stock: 40, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/mobo1/400/400', rating: 5, reviewCount: 88, brand: 'ASUS', specs: { socket: 'LGA1700', ramType: 'DDR5' }, description: 'A motherboard built for enthusiasts, offering robust power delivery, comprehensive cooling, and cutting-edge connectivity for the latest Intel processors.' },
  { id: 8, name: 'MSI MPG X670E CARBON WIFI', category: 'Motherboard', price: 17990, oldPrice: 18500, costPrice: 16800, stock: 35, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/mobo2/400/400', rating: 4.8, reviewCount: 75, brand: 'MSI', specs: { socket: 'AM5', ramType: 'DDR5' }, description: 'A premium motherboard for AMD Ryzen 7000 series processors, featuring a stylish carbon-black design, powerful VRM, and extensive connectivity options including Wi-Fi 6E.' },
  { id: 9, name: 'Samsung 980 Pro 2TB NVMe SSD', category: 'Storage', price: 7200, costPrice: 6500, stock: 200, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ssd1/400/400', rating: 5, reviewCount: 300, brand: 'Samsung', description: 'Unleash the power of the Samsung PCIe 4.0 NVMe SSD 980 PRO for your next-level computing. Leveraging the PCIe 4.0 interface, the 980 PRO delivers double the data transfer rate of PCIe 3.0.' },
  { id: 10, name: 'Western Digital Black SN850X 2TB', category: 'Storage', price: 6500, oldPrice: 6900, costPrice: 6200, stock: 180, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ssd2/400/400', rating: 4.9, reviewCount: 250, brand: 'WD', description: 'The WD_BLACK™ SN850X NVMe™ SSD enables you to amp up your game with ludicrously fast read and write speeds. Get the ultimate gaming edge.' },
  { id: 11, name: 'Lian Li PC-O11 Dynamic EVO', category: 'Case', price: 5600, costPrice: 4900, stock: 0, availability: 'outOfStock', imageUrl: 'https://picsum.photos/seed/case1/400/400', rating: 5, reviewCount: 210, brand: 'Lian Li', description: 'A highly modular case that offers multiple configurations, stunning aesthetics with dual tempered glass panels, and exceptional cooling potential.' },
  { id: 12, name: 'NZXT H5 Flow', category: 'Case', price: 3200, costPrice: 2800, stock: 100, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/case2/400/400', rating: 4.7, reviewCount: 140, brand: 'NZXT', description: 'A compact mid-tower case with a focus on optimal airflow. Its perforated front panel provides excellent cooling for high-performance components.' },
  { id: 13, name: 'Noctua NH-D15 chromax.black', category: 'Cooling', price: 3990, oldPrice: 4200, costPrice: 3700, stock: 90, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/cooler1/400/400', rating: 5, reviewCount: 450, brand: 'Noctua', description: 'The legendary NH-D15, now in an all-black design. A dual-tower CPU cooler renowned for its quiet operation and cooling performance that rivals many all-in-one liquid coolers.' },
  { id: 14, name: 'Corsair iCUE H150i ELITE CAPELLIX XT', category: 'Cooling', price: 7800, costPrice: 7000, stock: 60, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/cooler2/400/400', rating: 4.8, reviewCount: 190, brand: 'Corsair', description: 'A high-performance 360mm all-in-one liquid CPU cooler, featuring ultra-bright CAPELLIX LEDs, powerful AF RGB ELITE fans, and iCUE software control.' },
  { id: 15, name: 'Intel Core i5-13600K', category: 'CPU', price: 12500, costPrice: 11000, stock: 75, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/cpu3/400/400', rating: 4.9, reviewCount: 215, brand: 'Intel', specs: { socket: 'LGA1700' }, description: 'The sweet spot for high-performance gaming. The Core i5-13600K offers an excellent balance of core count, clock speed, and price for gamers and mainstream users.' },
  { id: 16, name: 'NVIDIA GeForce RTX 4070 Ti', category: 'GPU', price: 35000, costPrice: 31500, stock: 25, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/gpu3/400/400', rating: 4.8, reviewCount: 180, brand: 'NVIDIA', description: 'Get equipped for stellar gaming and creating with the NVIDIA® GeForce RTX™ 4070 Ti. It’s built with the ultra-efficient NVIDIA Ada Lovelace architecture.' },
  { id: 17, name: 'Crucial P5 Plus 1TB NVMe SSD', category: 'Storage', price: 3590, oldPrice: 3800, costPrice: 3400, stock: 250, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ssd3/400/400', rating: 4.8, reviewCount: 200, brand: 'Crucial', description: 'With lightning-fast speeds and a 1TB capacity, the Crucial P5 Plus provides the performance needed for hardcore gamers and professionals.' },
  { id: 18, name: 'Gigabyte B650 AORUS ELITE AX', category: 'Motherboard', price: 9200, costPrice: 8300, stock: 55, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/mobo3/400/400', rating: 4.7, reviewCount: 95, brand: 'Gigabyte', specs: { socket: 'AM5', ramType: 'DDR5' }, description: 'A well-rounded motherboard for AMD Ryzen CPUs, offering a strong feature set including PCIe 5.0 support, Wi-Fi 6E, and an advanced thermal design.' },
  { id: 19, name: 'Kingston FURY Beast 16GB DDR4', category: 'RAM', price: 1990, oldPrice: 2100, costPrice: 1800, stock: 300, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/ram3/400/400', rating: 4.7, reviewCount: 350, brand: 'Kingston', specs: { ramType: 'DDR4' }, description: 'Kingston FURY™ Beast DDR4 provides a powerful performance boost for gaming, video editing, and rendering with speeds up to 3733MHz.' },
  { id: 20, name: 'Cooler Master MasterBox TD500 Mesh', category: 'Case', price: 3500, costPrice: 3000, stock: 95, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/case3/400/400', rating: 4.8, reviewCount: 190, brand: 'Cooler Master', description: 'A high-airflow case featuring a polygonal mesh front panel, crystalline tempered glass side panel, and three pre-installed ARGB fans for stunning aesthetics and performance.' },
  { id: 21, name: 'Corsair RM850x 850W Gold', category: 'Power Supply', price: 5200, costPrice: 4600, stock: 110, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/psu1/400/400', rating: 4.9, reviewCount: 320, brand: 'Corsair', specs: { wattage: 850 }, description: 'CORSAIR RMX Series fully modular power supplies are built with the highest quality components to deliver 80 PLUS Gold efficient power to your PC with virtually silent operation.' },
  { id: 22, name: 'ASUS RT-AX86U Pro Router', category: 'Network', price: 8900, costPrice: 8000, stock: 60, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/net1/400/400', rating: 4.8, reviewCount: 150, brand: 'ASUS', description: 'A high-performance Wi-Fi 6 router designed for gamers, featuring a dedicated gaming port, mobile game mode, and ASUS AiProtection Pro for network security.' },
  { id: 23, name: 'TP-Link Archer AX55 Router', category: 'Network', price: 2500, costPrice: 2100, stock: 120, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/net2/400/400', rating: 4.6, reviewCount: 220, brand: 'TP-Link', description: 'Next-Gen Wi-Fi 6 Gigabit Dual-Band Router. The Archer AX55 provides faster speeds, greater capacity, and reduced network congestion.' },
  { id: 24, name: 'Microsoft Windows 11 Pro FPP', category: 'Software', price: 5500, costPrice: 4800, stock: 200, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/sw1/400/400', rating: 4.9, reviewCount: 300, brand: 'Microsoft', description: 'Windows 11 Pro provides a modern workspace where you can creatively pursue your passions in a new experience. With a rejuvenated Start menu and new ways to connect to your favorite people, news, games, and content.' },
  { id: 25, name: 'Microsoft Office Home & Student 2021', category: 'Software', price: 3800, costPrice: 3400, stock: 250, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/sw2/400/400', rating: 4.7, reviewCount: 180, brand: 'Microsoft', description: 'The essential tools you need to capture, analyze, and organize your ideas. Includes classic versions of Word, Excel, and PowerPoint for one PC or Mac.' },
  { id: 26, name: 'Intel Xeon E-2386G', category: 'Server', price: 18500, costPrice: 17000, stock: 30, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/serv1/400/400', rating: 4.8, reviewCount: 45, brand: 'Intel', description: 'An entry-level server processor designed for small businesses and cloud services, offering reliable performance and security features.' },
  { id: 27, name: 'Kingston Server Premier 32GB DDR4 ECC', category: 'Server', price: 6200, costPrice: 5500, stock: 80, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/serv2/400/400', rating: 4.9, reviewCount: 60, brand: 'Kingston', description: 'Kingston Server Premier has been developed for mission-critical server systems that require maximum uptime and stability. This module features Error-Correcting Code (ECC) to detect and correct single-bit memory errors.' },

  // Added Products from Homepage
  { id: 401, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN 15 B13VE-1608TH (COSMOS GRAY)', category: 'Notebook', price: 25490, oldPrice: 32990, costPrice: 23000, stock: 20, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/b0b5d09f7b03666b6e4d0257e0e7a2b2.png', rating: 4.5, reviewCount: 15, brand: 'MSI', description: 'CPU: i5-13420H VGA: RTX 4050 6 GB GDDR6 RAM: 16GB (8GBx2) DDR4 3200MHz...', specs: {} },
  { id: 402, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 X1504GA-NJ322W (MIXED BLACK)', category: 'Notebook', price: 11490, oldPrice: 13990, costPrice: 10000, stock: 35, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/8a39e8027a0544259b15b3c3c788296a.png', rating: 4.3, reviewCount: 22, brand: 'ASUS', description: 'CPU: i3-N305 VGA: INTEL UHD GRAPHICS RAM: 8GB DDR4 (ON BOARD) STORAGE:...', specs: {} },
  { id: 403, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI KATANA 17 B13VEK-1266TH (BLACK) (2Y)', category: 'Notebook', price: 34990, oldPrice: 42990, costPrice: 32000, stock: 18, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/e2d08a541315e9854cd79b8a361e68c9.png', rating: 4.7, reviewCount: 30, brand: 'MSI', description: 'CPU: i7-13620H VGA: RTX 4050 6GB GDDR6 RAM: 16GB (8GBx2) DDR5 STORAGE: 512G...', specs: {} },
  { id: 404, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN A15 B7VE-045TH (COSMOS GRAY) (2Y)', category: 'Notebook', price: 24990, oldPrice: 31990, costPrice: 22500, stock: 25, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/c2f8215907409c9547d28c310c85c3b1.png', rating: 4.6, reviewCount: 19, brand: 'MSI', description: 'CPU: AMD Ryzen 5 7535HS VGA: RTX 4050 6 GB GDDR6 RAM: 16GB (8GBx2) DDR5...', specs: {} },
  { id: 405, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS TUF DASH A15 FA506NCR-HN005W (GRAPHITE BLACK) (2Y)', category: 'Notebook', price: 24990, oldPrice: 30990, costPrice: 22500, stock: 28, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/6df15102572b0ab57e2995c63d91970f.png', rating: 4.5, reviewCount: 25, brand: 'ASUS', description: 'CPU: AMD Ryzen 7 7435HS VGA: RTX 3050 4GB GDDR6 RAM: 16GB DDR5 5600MHz...', specs: {} },
  { id: 406, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 M1504FA-NJ516W (MIXED BLACK) (2Y)', category: 'Notebook', price: 12990, oldPrice: 14990, costPrice: 11500, stock: 40, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/8a39e8027a0544259b15b3c3c788296a.png', rating: 4.4, reviewCount: 18, brand: 'ASUS', description: 'CPU: AMD Ryzen 5 7520U VGA: AMD Radeon Graphics (integrated) RAM: 8GB LPDDR5...', specs: {} },
  { id: 407, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI KATANA 17 B13VFK-1064TH (BLACK) (2Y)', category: 'Notebook', price: 36990, oldPrice: 46990, costPrice: 34000, stock: 12, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/e2d08a541315e9854cd79b8a361e68c9.png', rating: 4.8, reviewCount: 35, brand: 'MSI', description: 'CPU: Intel Core i7-13620H VGA: Geforce 4060 8GB GDDR6 RAM: 16GB DDR5...', specs: {} },
  { id: 408, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN 15 B13UC-2415TH (COSMOS GRAY) (2Y)', category: 'Notebook', price: 23990, oldPrice: 30490, costPrice: 21500, stock: 22, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/b0b5d09f7b03666b6e4d0257e0e7a2b2.png', rating: 4.5, reviewCount: 20, brand: 'MSI', description: 'CPU: i7-13620H VGA: RTX 3050 4GB GDDR6 RAM: 16GB DDR4 3200 STORAGE: 512GB...', specs: {} },
  { id: 501, name: 'PRINTER HP INK TANK 315', category: 'Printer', price: 4390, oldPrice: 4890, costPrice: 4000, stock: 50, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/94639c4d9ca27f4d2f831952f447660c.png', rating: 4.6, reviewCount: 55, brand: 'HP', description: 'Print, Scan, Copy / ความละเอียด 4800 x 1200 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', specs: {} },
  { id: 502, name: 'PRINTER BROTHER DCP-T220', category: 'Printer', price: 4590, costPrice: 4200, stock: 45, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/3a2333b2e3f533a1e2f9d7890f5b497b.png', rating: 4.7, reviewCount: 60, brand: 'BROTHER', description: 'Print, Scan, Copy / ความละเอียด 1200 x 6000 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', specs: {} },
  { id: 503, name: 'PRINTER CANON PIXMA G2010', category: 'Printer', price: 4290, oldPrice: 4590, costPrice: 3900, stock: 60, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/154101e18b456d957f006886e8da4d82.png', rating: 4.5, reviewCount: 50, brand: 'CANON', description: 'Print, Scan, Copy / ความละเอียด 4800 x 1200 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', specs: {} },
  { id: 504, name: 'PRINTER EPSON L3210', category: 'Printer', price: 4790, costPrice: 4400, stock: 55, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/c081e640285fc5f7259114d56d78fa1b.png', rating: 4.8, reviewCount: 70, brand: 'EPSON', description: 'Print, Scan, Copy / ความละเอียด 5760 x 1440 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', specs: {} },
  { id: 601, name: 'ALL IN ONE DELL INSPIRON 5410-W26631102TH', category: 'All-in-one PC', price: 27990, costPrice: 25000, stock: 15, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/c79f90f23b3061cdd8d975a5c68b6b0c.png', rating: 4.7, reviewCount: 25, brand: 'DELL', description: 'CPU : Intel Core i5-1235U / RAM : 8GB DDR4 / SSD : 512GB', specs: {} },
  { id: 602, name: 'ALL IN ONE HP 24-CB1025D', category: 'All-in-one PC', price: 18490, oldPrice: 19990, costPrice: 16500, stock: 20, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/84dfbb607623315a6fd20d6ab629739c.png', rating: 4.5, reviewCount: 30, brand: 'HP', description: 'CPU : Intel Core i3-1215U / RAM : 8GB DDR4 / SSD : 256GB', specs: {} },
  { id: 603, name: 'ALL IN ONE LENOVO IDEACENTRE 3 24IAP7', category: 'All-in-one PC', price: 24990, costPrice: 22000, stock: 18, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/42b32f913e1687f8770c3065a04ba3c6.png', rating: 4.6, reviewCount: 22, brand: 'LENOVO', description: 'CPU : Intel Core i5-13420H / RAM : 16GB DDR4 / SSD : 512GB', specs: {} },
  { id: 703, name: 'MONITOR DELL ALIENWARE AW2725DF 27" OLED', category: 'Monitor', price: 35900, oldPrice: 38900, costPrice: 33000, stock: 15, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/f326302e1c7f9999a466d13bd3b25f9c.png', rating: 4.9, reviewCount: 45, brand: 'DELL', description: 'สัมผัสประสบการณ์การเล่นเกมที่เหนือกว่าด้วยจอภาพ OLED 360Hz ขนาด 27 นิ้ว ให้สีสันที่สมจริงและการตอบสนองที่รวดเร็วเป็นพิเศษด้วยเทคโนโลยี AMD FreeSync Premium Pro. Specs: 2560x1440 @ 360Hz / 0.03ms / AMD FreeSync Premium Pro', specs: {} },
  { id: 801, name: 'ASUS ROG Strix G16CH', category: 'Pre-built PC', price: 79990, costPrice: 72000, stock: 10, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/9c1ed367d3e18a09b43c68383a17e082.png', rating: 4.9, reviewCount: 40, brand: 'ASUS', description: 'Intel Core i7-13700F / GeForce RTX 4070 / 16GB DDR4 / 1TB SSD', specs: {} },
  { id: 802, name: 'MSI MPG Trident AS 13th', category: 'Pre-built PC', price: 65900, oldPrice: 69900, costPrice: 60000, stock: 12, availability: 'inStock', imageUrl: 'https://www.img.in.th/images/ca6d910f5e1f021e1d0981e4b85c1569.png', rating: 4.8, reviewCount: 35, brand: 'MSI', description: 'Intel Core i7-13700F / GeForce RTX 4060 Ti / 16GB DDR5 / 1TB SSD', specs: {} },

  // Gaming Gear
  { id: 901, name: 'RAZER KEYBOARD BLACKWIDOW V4', category: 'Gaming Gear', price: 6490, costPrice: 5800, stock: 50, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/keyboard1/400/400', rating: 4.8, reviewCount: 120, brand: 'Razer', description: 'Mechanical gaming keyboard with Razer Green switches, customizable Chroma RGB lighting, and a multi-function roller.' },
  { id: 902, name: 'LOGITECH MOUSE G502 X PLUS', category: 'Gaming Gear', price: 4990, costPrice: 4500, stock: 70, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/mouse1/400/400', rating: 4.9, reviewCount: 200, brand: 'Logitech', description: 'LIGHTSPEED wireless gaming mouse with LIGHTFORCE hybrid switches, HERO 25K sensor, and POWERPLAY compatibility.' },
  { id: 903, name: 'STEELSERIES HEADSET ARCTIS NOVA 7', category: 'Gaming Gear', price: 7390, costPrice: 6600, stock: 40, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/headset1/400/400', rating: 4.7, reviewCount: 95, brand: 'SteelSeries', description: 'Wireless gaming headset with simultaneous 2.4GHz and Bluetooth, AI-powered noise-cancelling mic, and 38-hour battery life.' },
  { id: 904, name: 'CORSAIR MOUSEPAD MM700 RGB EXTENDED', category: 'Gaming Gear', price: 2190, costPrice: 1900, stock: 100, availability: 'inStock', imageUrl: 'https://picsum.photos/seed/mousepad1/400/400', rating: 4.6, reviewCount: 80, brand: 'Corsair', description: 'Extended cloth gaming mousepad with dynamic three-zone RGB lighting and a built-in two-port USB hub.' },
];

export const mockComputerSetGroups: ComputerSetGroup[] = [
  {
    id: 1,
    bannerUrl: 'https://www.img.in.th/images/9920d317075c7423013280048e426210.png',
    products: [
      { id: 101, name: 'OCTA-007 AMD RYZEN 5 5600GT', specs: 'RAM 16GB DDR4 / M.2 500GB / CPU RADEON VEGA 7', price: 10490, oldPrice: 10990, imageUrl: 'https://www.img.in.th/images/94a8d46a81b376269b2d3527a00f2e82.png', badge: 'NEW' },
      { id: 102, name: 'OCTA-009 AMD RYZEN 5 5600', specs: 'RAM 16GB DDR4 / RX 6600 8GB / M.2 500GB', price: 13390, oldPrice: 13990, imageUrl: 'https://www.img.in.th/images/b63c46b5a34e029c299c8cb08e33732c.png' },
      { id: 103, name: 'OCTA-010 AMD RYZEN 5 5600', specs: 'RAM 16GB DDR4 / RTX 2060 SUPER / M.2 500GB', price: 14490, oldPrice: 15990, imageUrl: 'https://www.img.in.th/images/b412b1d6e771a3574880ce6c3614144e.png' },
      { id: 104, name: 'OCTA-011 INTEL I3-12100F', specs: 'RAM 16GB DDR4 / RTX 2060 SUPER / M.2 500GB', price: 15490, oldPrice: 16990, imageUrl: 'https://www.img.in.th/images/b2ff0b3c678a6358117ac5e533b63294.png' },
    ]
  },
  {
    id: 2,
    bannerUrl: 'https://www.img.in.th/images/7a0f78082a9db362095d10a9058b88ce.png',
    products: [
      { id: 201, name: 'OCTA-012 INTEL I5-12400F', specs: 'RAM 16GB DDR4 / RTX 3060 / M.2 500GB', price: 18990, oldPrice: 19990, imageUrl: 'https://www.img.in.th/images/5f79599d19a0a03d09a067ed0f75e29f.png' },
      { id: 202, name: 'OCTA-013 INTEL I5-12400F', specs: 'RAM 16GB DDR4 / RTX 4060 / M.2 500GB', price: 21990, oldPrice: 22990, imageUrl: 'https://www.img.in.th/images/a50b44585a0655513d6a6669f4b32525.png', badge: 'NEW' },
      { id: 203, name: 'OCTA-014 INTEL I5-12400F', specs: 'RAM 32GB DDR4 / RTX 4060 TI / M.2 500GB', price: 25990, oldPrice: 27990, imageUrl: 'https://www.img.in.th/images/5081aa1a3df3f05b1c93717c0c1b033d.png' },
      { id: 204, name: 'OCTA-015 INTEL I5-13400F', specs: 'RAM 16GB DDR5 / RTX 4060 / M.2 500GB', price: 21490, oldPrice: 22490, imageUrl: 'https://www.img.in.th/images/d89e5e7146e29ac750949d21c3b7a1ce.png' },
    ]
  },
  {
    id: 3,
    bannerUrl: 'https://www.img.in.th/images/3f5509c2a688a252c42c382f14659b8a.png',
    products: [
      { id: 301, name: 'OCTA-016 AMD RYZEN 5 7500F', specs: 'RAM 16GB DDR5 / RTX 4060 / M.2 500GB', price: 19990, oldPrice: 21990, imageUrl: 'https://www.img.in.th/images/f90f2095f61ba33945e412a85324b12c.png' },
      { id: 302, name: 'OCTA-017 AMD RYZEN 5 7500F', specs: 'RAM 32GB DDR5 / RTX 4060 TI / M.2 500GB', price: 20990, oldPrice: 22990, imageUrl: 'https://www.img.in.th/images/4223ca270d47348982a7f05b4e7236d6.png' },
      { id: 303, name: 'OCTA-018 AMD RYZEN 5 7500F', specs: 'RAM 32GB DDR5 / RTX 4070 SUPER / M.2 1TB', price: 21990, oldPrice: 24990, imageUrl: 'https://www.img.in.th/images/a52467d5e49f538e4a778e7f805a9645.png' },
      { id: 304, name: 'OCTA-019 AMD RYZEN 7 7800X3D', specs: 'RAM 32GB DDR5 / RTX 4070 SUPER / M.2 1TB', price: 23990, oldPrice: 26990, imageUrl: 'https://www.img.in.th/images/45d58045a1f6a1005a818c4c70034a78.png', badge: 'NEW' },
    ]
  },
];


export const mockArticles: Article[] = [
  {
    id: 1,
    date: '07 ส.ค. 2568',
    title: 'วิธีเลือกหน้าจอคอมให้ตรงใจ ทั้งขนาด พาเนล และพอร์ตเชื่อมต่อ',
    excerpt: 'แนะนำวิธีเลือกหน้าจอคอมให้ตรงใจ ทั้งขนาดหน้าจอ และพาเนล พร้อมเทคนิคเช็ควิธีวัดขนาดจอคอม เลือกความละเอียดที่เหมาะกับการใช้งาน ไม่ว่าจะทํางาน เล่นเกม หรือดูหนัง',
    imageUrl: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'การเลือกหน้าจอคอมพิวเตอร์ที่เหมาะสมกับการใช้งานเป็นสิ่งสำคัญอย่างยิ่ง เพราะส่งผลโดยตรงต่อประสบการณ์การทำงานและความบันเทิงของคุณ ไม่ว่าคุณจะเป็นเกมเมอร์, กราฟิกดีไซเนอร์, หรือผู้ใช้งานทั่วไป บทความนี้จะแนะนำวิธีเลือกหน้าจอคอมให้ตรงใจคุณที่สุด\n\nขนาดหน้าจอ (Screen Size) และความละเอียด (Resolution): ขนาดหน้าจอที่นิยมในปัจจุบันมีตั้งแต่ 24 นิ้ว, 27 นิ้ว, ไปจนถึง 32 นิ้วหรือใหญ่กว่า ควรเลือกขนาดที่เหมาะสมกับระยะการมองเห็นและพื้นที่บนโต๊ะทำงานของคุณ ส่วนความละเอียด ยิ่งสูงภาพยิ่งคมชัด โดย Full HD (1920x1080) เป็นมาตรฐาน, 2K/QHD (2560x1440) เหมาะสำหรับเล่นเกมและทำงาน, และ 4K/UHD (3840x2160) ให้ความคมชัดสูงสุด เหมาะสำหรับงานกราฟิกและชมภาพยนตร์ความละเอียดสูง\n\nชนิดของพาเนล (Panel Type): พาเนลแต่ละชนิดมีจุดเด่นต่างกันไป TN (Twisted Nematic) มีอัตราการตอบสนองเร็วที่สุด เหมาะกับเกมเมอร์สายแข่งขัน, IPS (In-Plane Switching) ให้สีสันที่แม่นยำและมุมมองกว้างที่สุด เหมาะกับงานกราฟิก, และ VA (Vertical Alignment) มีคอนทราสต์สูง ให้สีดำที่ดำสนิท เหมาะกับการชมภาพยนตร์\n\nพอร์ตเชื่อมต่อ (Connectivity): ตรวจสอบให้แน่ใจว่าหน้าจอมีพอร์ตที่เข้ากันได้กับคอมพิวเตอร์ของคุณ พอร์ตที่นิยมใช้ในปัจจุบันคือ HDMI และ DisplayPort ซึ่งรองรับความละเอียดและรีเฟรชเรทสูงๆ บางรุ่นอาจมีพอร์ต USB-C ที่สามารถส่งสัญญาณภาพและชาร์จไฟได้ในเส้นเดียว เพิ่มความสะดวกสบายในการใช้งาน',
  },
  {
    id: 2,
    date: '08 ต.ค. 2568',
    title: '5 วิธีเพิ่มความเร็วเน็ต เร่งสปีดเน็ตไม่จํากัดใน 5 นาที',
    excerpt: 'เน็ตช้าไม่ทันใจ ลอง 5 วิธีเพิ่มความเร็วเน็ตบ้านและเพิ่มความแรงเน็ต Wi-Fi แบบไม่ต้องเสียเวลาจ้างช่าง หรือซื้อแพ็คเกจเสริมเน็ตโดยไม่จำเป็น เร่งสปีดเน็ตติดจรวด เสถียร',
    imageUrl: 'https://images.unsplash.com/photo-1526628953301-3e589a6a8b74?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'อินเทอร์เน็ตที่ช้าและไม่เสถียรอาจเป็นฝันร้ายสำหรับทุกคน ไม่ว่าจะทำงาน, เรียน, หรือเล่นเกม แต่ก่อนที่คุณจะตัดสินใจเปลี่ยนผู้ให้บริการหรือซื้อแพ็คเกจที่แพงขึ้น ลองทำตาม 5 วิธีง่ายๆ นี้เพื่อเพิ่มความเร็วเน็ตของคุณได้ในเวลาไม่กี่นาที\n\n1. รีสตาร์ทเราเตอร์: วิธีที่ง่ายและได้ผลที่สุดคือการปิดเราเตอร์ทิ้งไว้ประมาณ 30 วินาทีแล้วเปิดใหม่ การทำเช่นนี้จะช่วยล้างแคชและแก้ไขปัญหาเล็กๆ น้อยๆ ที่อาจทำให้เน็ตช้าลง\n\n2. ย้ายตำแหน่งเราเตอร์: ตำแหน่งของเราเตอร์มีผลอย่างมากต่อความแรงของสัญญาณ Wi-Fi ควรวางเราเตอร์ไว้ในที่โล่ง, กลางบ้าน, และห่างจากกำแพงหนาหรืออุปกรณ์อิเล็กทรอนิกส์อื่นๆ ที่อาจรบกวนสัญญาณ\n\n3. เปลี่ยนช่องสัญญาณ (Channel) Wi-Fi: ในบริเวณที่มีเครือข่าย Wi-Fi หนาแน่น ช่องสัญญาณอาจถูกใช้งานจนแออัด ลองเปลี่ยนไปใช้ช่องสัญญาณที่ว่างกว่าผ่านหน้าตั้งค่าของเราเตอร์ (ส่วนใหญ่มักเป็นช่อง 1, 6, หรือ 11 สำหรับ 2.4GHz)\n\n4. อัปเดตเฟิร์มแวร์ของเราเตอร์: ผู้ผลิตมักจะปล่อยอัปเดตเฟิร์มแวร์เพื่อปรับปรุงประสิทธิภาพและความปลอดภัย การอัปเดตเฟิร์มแวร์ให้เป็นเวอร์ชันล่าสุดจะช่วยให้เราเตอร์ทำงานได้เต็มศักยภาพ\n\n5. ใช้สาย LAN: สำหรับอุปกรณ์ที่ต้องการความเร็วและความเสถียรสูงสุด เช่น คอมพิวเตอร์สำหรับเล่นเกมหรือสมาร์ททีวี การเชื่อมต่อผ่านสาย LAN โดยตรงจะให้ประสิทธิภาพที่ดีกว่า Wi-Fi เสมอ',
  },
  {
    id: 3,
    date: '08 ต.ค. 2568',
    title: 'คอมไฟเข้าแต่เปิดไม่ติด แก้เองได้ ลองทำ 3 ขั้นตอนก่อนจ้างช่าง',
    excerpt: 'คอมไฟเข้าแต่เปิดไม่ติด เกิดจากอะไร? เปิดคอมไม่ติด ไฟเข้า ไม่ต้องรีบหาช่าง แจก 3 ขั้นตอนเช็กปัญหาคอมพิวเตอร์เปิดไม่ติด ทำเองได้ง่าย ๆ ประหยัดทั้งเวลาและค่าใช้จ่าย',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3dce9?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'อาการคอมพิวเตอร์ไฟเข้าแต่เปิดไม่ติดเป็นปัญหาที่พบบ่อยและอาจทำให้หลายคนตกใจ แต่ส่วนใหญ่มักเกิดจากสาเหตุที่ไม่ซับซ้อนและสามารถตรวจสอบได้ด้วยตัวเอง ก่อนจะยกเครื่องไปหาช่าง ลองทำตาม 3 ขั้นตอนพื้นฐานนี้ดูก่อน\n\nขั้นตอนที่ 1: ตรวจสอบการเชื่อมต่อและสายไฟทั้งหมด: เริ่มจากสิ่งที่ง่ายที่สุด คือตรวจสอบว่าสายไฟทุกเส้นเสียบแน่นดีหรือไม่ ทั้งสาย Power ที่เสียบเข้ากับ Power Supply, สายที่ต่อไปยังปลั๊กพ่วง, และสายสัญญาณจอภาพ ตรวจสอบให้แน่ใจว่าปลั๊กพ่วงหรือเต้ารับมีไฟจ่ายปกติ ลองเปลี่ยนสาย Power หรือเปลี่ยนช่องเสียบเพื่อตัดปัญหาเรื่องสายไฟ\n\nขั้นตอนที่ 2: ตรวจสอบอุปกรณ์ภายในเคส (RAM และการ์ดจอ): ปัญหาอาจเกิดจากอุปกรณ์ภายในหลวมหรือเสียบไม่แน่น ให้ปิดเครื่องและถอดปลั๊กไฟออก จากนั้นเปิดฝาเคสแล้วลองถอด RAM ออกมาทำความสะอาดหน้าสัมผัสสีทองด้วยยางลบ แล้วใส่กลับเข้าไปให้แน่นจนตัวล็อกดีดกลับเข้าที่ ทำเช่นเดียวกันกับการ์ดจอ หากมี RAM หลายแถว ลองใส่ทีละแถวเพื่อทดสอบว่ามีแถวไหนเสียหรือไม่\n\nขั้นตอนที่ 3: รีเซ็ต BIOS/UEFI (Clear CMOS): บางครั้งการตั้งค่าใน BIOS ที่ผิดพลาดอาจทำให้เครื่องเปิดไม่ติด การรีเซ็ตค่ากลับไปเป็นค่าเริ่มต้นจากโรงงานสามารถช่วยได้ วิธีที่ง่ายที่สุดคือการหาจัมเปอร์ที่เขียนว่า "Clear CMOS" หรือ "CLR_CMOS" บนเมนบอร์ดแล้วทำการสับเปลี่ยนตำแหน่งตามคู่มือ หรือถอดถ่านเมนบอร์ด (ถ่านกระดุมกลมๆ) ออกทิ้งไว้ประมาณ 5-10 นาทีแล้วใส่กลับเข้าไปใหม่ การทำเช่นนี้จะล้างการตั้งค่าทั้งหมดและอาจช่วยให้คอมพิวเตอร์ของคุณกลับมาเปิดติดได้อีกครั้ง',
  },
   {
    id: 4,
    date: '15 พ.ย. 2568',
    title: 'คู่มือเลือกซื้อ Gaming Mouse ปี 2025: DPI, Polling Rate และ Sensor',
    excerpt: 'เจาะลึกทุกรายละเอียดของเมาส์เกมมิ่ง ตั้งแต่ค่า DPI, Polling Rate ไปจนถึงประเภทของเซ็นเซอร์ เพื่อให้คุณเลือกเมาส์ที่ใช่และคว้าชัยชนะในทุกสมรภูมิ',
    imageUrl: 'https://images.unsplash.com/photo-1615663249893-41cd1ae499a3?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'การเลือกเมาส์เกมมิ่งที่เหมาะสมสามารถสร้างความแตกต่างระหว่างชัยชนะและความพ่ายแพ้ได้ แต่ด้วยตัวเลือกและศัพท์เทคนิคมากมายในตลาด อาจทำให้ตัดสินใจได้ยาก บทความนี้จะเจาะลึก 3 ปัจจัยสำคัญที่จะช่วยให้คุณเลือกเมาส์คู่ใจได้ง่ายขึ้น\n\nDPI (Dots Per Inch): ค่า DPI คือความไวของเมาส์ ยิ่ง DPI สูง เคอร์เซอร์ก็จะเคลื่อนที่ได้ไกลขึ้นบนหน้าจอด้วยการขยับเมาส์เพียงเล็กน้อย เกมเมอร์ที่เล่นเกมแนว FPS มักนิยมใช้ DPI ต่ำ (400-800) เพื่อความแม่นยำในการเล็ง ในขณะที่เกมแนว MOBA หรือ RTS อาจต้องการ DPI ที่สูงกว่าเพื่อความรวดเร็วในการควบคุม เมาส์เกมมิ่งที่ดีควรสามารถปรับค่า DPI ได้หลากหลาย\n\nPolling Rate: ค่านี้วัดเป็นหน่วย Hertz (Hz) และหมายถึงความถี่ที่เมาส์ส่งข้อมูลตำแหน่งไปยังคอมพิวเตอร์ Polling Rate ที่สูงขึ้น (เช่น 1000Hz) หมายถึงการตอบสนองที่รวดเร็วและลื่นไหลกว่า ลดอาการกระตุกของเคอร์เซอร์ ซึ่งมีความสำคัญอย่างยิ่งในเกมที่ต้องการความเร็วและความแม่นยำสูง ปัจจุบันเมาส์เกมมิ่งส่วนใหญ่มี Polling Rate มาตรฐานที่ 1000Hz\n\nSensor: เซ็นเซอร์คือหัวใจของเมาส์ มีสองประเภทหลักคือ Optical และ Laser เซ็นเซอร์แบบ Optical มักจะให้ความแม่นยำสูงกว่าบนพื้นผิวส่วนใหญ่ (โดยเฉพาะแผ่นรองเมาส์) และไม่มีปัญหาเรื่อง "acceleration" ที่ไม่พึงประสงค์ ส่วนเซ็นเซอร์แบบ Laser สามารถทำงานได้บนพื้นผิวที่หลากหลายกว่า รวมถึงพื้นผิวมันวาวอย่างกระจก แต่สำหรับเกมเมอร์ส่วนใหญ่แล้ว เซ็นเซอร์แบบ Optical ถือเป็นตัวเลือกที่ดีที่สุด',
  },
  {
    id: 5,
    date: '21 พ.ย. 2568',
    title: 'ทำความสะอาดคอมพิวเตอร์อย่างไรให้เหมือนใหม่และปลอดภัย',
    excerpt: 'ฝุ่นคือศัตรูตัวร้ายของคอมพิวเตอร์! เรียนรู้วิธีทำความสะอาดส่วนประกอบต่างๆ อย่างถูกวิธี ตั้งแต่เคส, พัดลม, ไปจนถึงการ์ดจอ เพื่อยืดอายุการใช้งานและประสิทธิภาพ',
    imageUrl: 'https://images.unsplash.com/photo-1627885793934-a788a149c1b3?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'ฝุ่นและสิ่งสกปรกคือศัตรูตัวฉกาจของคอมพิวเตอร์ ไม่เพียงแต่ทำให้ดูไม่สวยงาม แต่ยังส่งผลต่อประสิทธิภาพการระบายความร้อนและอาจทำให้อายุการใช้งานของอุปกรณ์สั้นลง การทำความสะอาดคอมพิวเตอร์อย่างสม่ำเสมอจึงเป็นสิ่งจำเป็น บทความนี้จะแนะนำวิธีทำความสะอาดอย่างปลอดภัยและถูกวิธี\n\nอุปกรณ์ที่ต้องเตรียม: สเปรย์ลม, แปรงขนนุ่ม, ผ้าไมโครไฟเบอร์, และไขควง (หากจำเป็นต้องถอดชิ้นส่วน) หลีกเลี่ยงการใช้เครื่องดูดฝุ่นโดยตรงกับชิ้นส่วนอิเล็กทรอนิกส์เพราะอาจเกิดไฟฟ้าสถิตที่สร้างความเสียหายได้\n\nขั้นตอนการทำความสะอาด:\n1. ปิดเครื่องและถอดปลั๊ก: ความปลอดภัยต้องมาก่อนเสมอ ถอดสายไฟและสายเชื่อมต่อทุกเส้นออกจากคอมพิวเตอร์\n2. ทำความสะอาดภายนอกเคส: ใช้ผ้าไมโครไฟเบอร์ชุบน้ำหมาดๆ เช็ดทำความสะอาดภายนอกเคส\n3. เปิดฝาเคสและเป่าฝุ่น: นำเคสไปไว้ในที่โล่ง จากนั้นใช้สเปรย์ลมเป่าฝุ่นออกจากส่วนประกอบต่างๆ โดยเฉพาะพัดลม, ฮีทซิงค์ CPU, การ์ดจอ, และ Power Supply ควรใช้แปรงขนนุ่มช่วยปัดฝุ่นที่เกาะแน่นออก\n4. ทำความสะอาดพัดลม: ใช้คอตตอนบัดหรือแปรงค่อยๆ เช็ดทำความสะอาดใบพัดแต่ละใบ อาจใช้มือจับใบพัดไว้ไม่ให้หมุนขณะเป่าลมเพื่อป้องกันความเสียหาย\n5. จัดการสายไฟ: ถือโอกาสนี้จัดระเบียบสายไฟภายในเคสเพื่อให้อากาศไหลเวียนได้ดีขึ้น\n\nการทำความสะอาดคอมพิวเตอร์เป็นประจำทุก 3-6 เดือน จะช่วยรักษาประสิทธิภาพและยืดอายุการใช้งานอุปกรณ์ของคุณได้อย่างมาก',
  },
  {
    id: 6,
    date: '02 ธ.ค. 2568',
    title: 'DDR5 vs DDR4: อัปเกรด RAM ใหม่ คุ้มค่าหรือไม่?',
    excerpt: 'เปรียบเทียบประสิทธิภาพระหว่าง RAM DDR5 และ DDR4 อย่างละเอียด ทั้งในด้านการเล่นเกมและการทำงาน เพื่อช่วยให้คุณตัดสินใจได้ว่าถึงเวลาอัปเกรดแล้วหรือยัง',
    imageUrl: 'https://images.unsplash.com/photo-1591799264318-7e6e74e3dce9?q=80&w=800&h=600&auto=format&fit=crop',
    link: '#',
// FIX: Added missing 'content' property to match the Article type.
    content: 'เทคโนโลยี RAM ได้ก้าวเข้าสู่ยุค DDR5 อย่างเต็มตัว ทำให้หลายคนเกิดคำถามว่าถึงเวลาแล้วหรือยังที่จะต้องอัปเกรดจาก DDR4 ที่ใช้งานกันมาอย่างยาวนาน บทความนี้จะเปรียบเทียบประสิทธิภาพระหว่าง RAM ทั้งสองเจเนอเรชันเพื่อช่วยให้คุณตัดสินใจได้ง่ายขึ้น\n\nความเร็วและแบนด์วิดท์: จุดเด่นที่สุดของ DDR5 คือความเร็วเริ่มต้นที่สูงกว่า DDR4 มาก (DDR5 เริ่มต้นที่ 4800MHz ในขณะที่ DDR4 ทั่วไปอยู่ที่ 2133-3200MHz) และมีแบนด์วิดท์ที่กว้างกว่าถึงสองเท่า ซึ่งหมายความว่ามันสามารถส่งข้อมูลได้ในปริมาณที่มากกว่าในเวลาเท่ากัน ในทางทฤษฎี สิ่งนี้ควรจะส่งผลให้ประสิทธิภาพโดยรวมของระบบดีขึ้นอย่างเห็นได้ชัด\n\nประสิทธิภาพในการเล่นเกม: จากการทดสอบของสื่อหลายสำนัก ในปัจจุบันความแตกต่างของเฟรมเรตในการเล่นเกมระหว่าง DDR5 และ DDR5 คุณภาพสูง (เช่น 3600MHz CL16) ยังไม่มากนัก อาจต่างกันเพียงไม่กี่เปอร์เซ็นต์ อย่างไรก็ตาม เกมในอนาคตที่ถูกพัฒนามาเพื่อใช้ประโยชน์จากแบนด์วิดท์ของ DDR5 โดยตรง อาจจะเห็นความแตกต่างที่ชัดเจนกว่านี้\n\nประสิทธิภาพในการทำงาน: สำหรับโปรแกรมที่ต้องการแบนด์วิดท์หน่วยความจำสูง เช่น การตัดต่อวิดีโอความละเอียดสูง, การเรนเดอร์ 3D, หรือการบีบอัดไฟล์ขนาดใหญ่ DDR5 จะแสดงประสิทธิภาพที่เหนือกว่า DDR4 อย่างชัดเจน หากคุณเป็นมืออาชีพที่ทำงานเหล่านี้เป็นประจำ การอัปเกรดไปใช้ DDR5 ถือว่าคุ้มค่า\n\nสรุป: หากคุณกำลังจัดสเปคคอมพิวเตอร์เครื่องใหม่ทั้งหมด การเลือกใช้แพลตฟอร์มที่รองรับ DDR5 ถือเป็นการลงทุนเพื่ออนาคตที่ดี แต่ถ้าคุณมีระบบที่ใช้ DDR4 ประสิทธิภาพสูงอยู่แล้ว และใช้งานหลักคือการเล่นเกม การอัปเกรดอาจจะยังไม่คุ้มค่านักในตอนนี้ แต่ควรจับตามองราคาและประสิทธิภาพของ DDR5 ที่จะดีขึ้นเรื่อยๆ ในอนาคต',
  },
];


export const mockHeroSlides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1593640428d84-a5495a37426d?q=80&w=2662&auto=format&fit=crop',
    titleLine1: 'Restocked and Reloaded',
    titleLine2: 'GeForce RTX 5070',
    titleLine3: 'and 5060 Family',
    cta: 'Shop All',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1555618422-AC4b5458248d?q=80&w=2670&auto=format&fit=crop',
    titleLine1: 'Ultimate Gaming Rigs',
    titleLine2: 'Pre-built & Ready',
    titleLine3: 'to Dominate',
    cta: 'Explore Builds',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=2670&auto=format&fit=crop',
    titleLine1: 'Upgrade Your Workflow',
    titleLine2: 'Powerful Workstations',
    titleLine3: 'for Professionals',
    cta: 'See Workstations',
  },
];

export const mockSeoData: SeoData = {
  home: {
    title: "Uboncomputer - ร้านค้าอุปกรณ์ไอทีครบวงจร",
    description: "Uboncomputer ร้านค้าอุปกรณ์ไอทีครบวงจร จัดสเปคคอม ประกอบคอม ราคาถูก สินค้าคุณภาพ ซีพียู การ์ดจอ แรม พร้อมบริการหลังการขายดีเยี่ยม"
  },
  pcBuilder: {
    title: "จัดสเปคคอม | Uboncomputer",
    description: "จัดสเปคคอมพิวเตอร์ของคุณเอง เลือกส่วนประกอบที่ดีที่สุดในราคาที่คุ้มค่ากับ Uboncomputer พร้อมคำแนะนำจากผู้เชี่ยวชาญ"
  },
  computerSet: {
    title: "คอมพิวเตอร์เซต | Uboncomputer",
    description: "เลือกซื้อคอมพิวเตอร์เซตประกอบสำเร็จรูปสำหรับเล่นเกมและทำงาน โปรโมชั่นสุดคุ้ม อัปเดตล่าสุด พร้อมประกันและบริการหลังการขาย"
  },
  articles: {
    title: "บทความและข่าวสารไอที | Uboncomputer",
    description: "ติดตามข่าวสารล่าสุดและบทความน่ารู้เกี่ยวกับวงการไอที วิธีเลือกซื้ออุปกรณ์ และเทคนิคต่างๆ จากทีมงาน Uboncomputer"
  },
  promotions: {
    title: "โปรโมชั่นสินค้าราคาพิเศษ | Uboncomputer",
    description: "พบกับโปรโมชั่นสุดร้อนแรง สินค้าไอทีและอุปกรณ์คอมพิวเตอร์ลดราคาพิเศษมากมาย ช้อปเลยที่ Uboncomputer"
  },
  contact: {
    title: "ติดต่อเรา | Uboncomputer",
    description: "ติดต่อสอบถามข้อมูลเพิ่มเติมเกี่ยวกับสินค้าและบริการได้ที่ Uboncomputer เราพร้อมให้บริการและให้คำปรึกษา"
  },
  about: {
    title: "เกี่ยวกับเรา | Uboncomputer",
    description: "เรื่องราวความเป็นมาของ Uboncomputer ศูนย์รวมอุปกรณ์คอมพิวเตอร์ที่ได้รับความไวางใจกว่า 10 ปี"
  },
  cart: {
    title: "ตะกร้าสินค้า | Uboncomputer",
    description: "ตรวจสอบรายการสินค้าในตะกร้าของคุณ แก้ไขจำนวน และเตรียมพร้อมสำหรับการสั่งซื้อสินค้าไอทีจาก Uboncomputer"
  },
  checkout: {
    title: "ชำระเงิน | Uboncomputer",
    description: "ดำเนินการชำระเงินสำหรับคำสั่งซื้อของคุณ กรอกข้อมูลการจัดส่งและเลือกวิธีการชำระเงินที่สะดวกที่สุด"
  },
  corporate: {
    title: "บริการสำหรับองค์กร | Uboncomputer",
    description: "Uboncomputer ให้บริการจัดหาสินค้าไอทีสำหรับลูกค้าองค์กร, หน่วยงานราชการ, และสถานศึกษา พร้อมเสนอราคา, ให้คำปรึกษา, และบริการหลังการขายครบวงจร"
  },
  faq: {
    title: "คำถามที่พบบ่อย (FAQ) | Uboncomputer",
    description: "ค้นหาคำตอบสำหรับคำถามที่พบบ่อยเกี่ยวกับการสั่งซื้อ, การจัดส่ง, การรับประกันสินค้า และบริการอื่นๆ จาก Uboncomputer"
  },
  orderStatus: {
    title: "ตรวจสอบสถานะคำสั่งซื้อ | Uboncomputer",
    description: "ตรวจสอบสถานะการจัดส่งสินค้าของคุณได้ง่ายๆ เพียงกรอกหมายเลขคำสั่งซื้อ, หมายเลขพัสดุ, หรือเบอร์โทรศัพท์"
  },
  searchResults: {
      title: "ผลการค้นหา | Uboncomputer",
      description: "ผลการค้นหาสินค้าไอทีและอุปกรณ์คอมพิวเตอร์จาก Uboncomputer"
  },
  compare: {
    title: "เปรียบเทียบสินค้า | Uboncomputer",
    description: "เปรียบเทียบสเปคและราคาสินค้าไอทีที่คุณสนใจ เพื่อการตัดสินใจที่ดีที่สุด"
  },
  privacy: {
    title: "นโยบายความเป็นส่วนตัว | Uboncomputer",
    description: "นโยบายความเป็นส่วนตัวของ Uboncomputer อธิบายวิธีที่เรารวบรวม, ใช้งาน, และปกป้องข้อมูลส่วนบุคคลของท่าน"
  },
  terms: {
    title: "ข้อกำหนดและเงื่อนไขการใช้งาน | Uboncomputer",
    description: "ข้อกำหนดและเงื่อนไขการใช้งานเว็บไซต์และบริการของ Uboncomputer"
  },
  cookies: {
    title: "นโยบายคุกกี้ | Uboncomputer",
    description: "นโยบายการใช้คุกกี้ของ Uboncomputer เพื่อมอบประสบการณ์การใช้งานเว็บไซต์ที่ดีที่สุด"
  },
  shipping: {
    title: "นโยบายการจัดส่งสินค้า | Uboncomputer",
    description: "รายละเอียดเกี่ยวกับนโยบายการจัดส่งสินค้า, ค่าบริการ, และระยะเวลาในการจัดส่งของ Uboncomputer"
  },
  returns: {
    title: "นโยบายการคืนสินค้า | Uboncomputer",
    description: "เงื่อนไขและขั้นตอนในการขอคืนสินค้าหรือเปลี่ยนสินค้ากับ Uboncomputer"
  },
  careers: {
    title: "ร่วมงานกับเรา | Uboncomputer",
    description: "ค้นหาโอกาสในการร่วมงานกับ Uboncomputer และเป็นส่วนหนึ่งของทีมงานมืออาชีพด้านไอทีของเรา ดูตำแหน่งงานที่เปิดรับสมัครล่าสุด"
  },
  cpu: {
    title: "ซีพียู CPU ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ CPU Intel และ AMD รุ่นล่าสุด ราคาพิเศษ โปรโมชั่นสุดคุ้ม พร้อมประกันและบริการหลังการขายจาก Uboncomputer"
  },
  gpu: {
    title: "การ์ดจอ VGA ราคาถูก | Uboncomputer",
    description: "เลือกซื้อการ์ดจอ NVIDIA GeForce, AMD Radeon สำหรับเล่นเกมและทำงาน ราคาพิเศษ"
  },
  ram: {
    title: "แรม RAM ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ RAM DDR4, DDR5 สำหรับคอมพิวเตอร์และโน้ตบุ๊คจากแบรนด์ชั้นนำ"
  },
  motherboard: {
    title: "เมนบอร์ด Mainboard ราคาถูก | Uboncomputer",
    description: "เลือกซื้อเมนบอร์ดสำหรับ Intel และ AMD ทุกซ็อกเก็ต รองรับรับ CPU รุ่นใหม่ล่าสุด"
  },
  storage: {
    title: "อุปกรณ์จัดเก็บข้อมูล SSD, HDD ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ SSD M.2, SATA และ Harddisk ความจุสูงสำหรับคอมพิวเตอร์ของคุณ"
  },
  case: {
    title: "เคสคอมพิวเตอร์ Case ราคาถูก | Uboncomputer",
    description: "เลือกซื้อเคสคอมพิวเตอร์หลากหลายดีไซน์ ระบายความร้อนเยี่ยม"
  },
  cooling: {
    title: "ชุดระบายความร้อน CPU Cooler ราคาถูก | Uboncomputer",
    description: "เลือกซื้อชุดระบายความร้อน CPU ทั้งแบบลมและแบบน้ำ"
  },
  powerSupply: {
    title: "พาวเวอร์ซัพพลาย Power Supply ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ Power Supply (PSU) วัตต์เต็ม มาตรฐาน 80+ Bronze, Gold, Platinum"
  },
  network: {
    title: "อุปกรณ์เน็ตเวิร์ค Network ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ Router, Access Point, Switch คุณภาพสูงจากแบรนด์ชั้นนำ เพื่อการเชื่อมต่อที่เสถียร"
  },
  software: {
    title: "ซอฟต์แวร์ Software ลิขสิทธิ์แท้ | Uboncomputer",
    description: "เลือกซื้อ Software ลิขสิทธิ์แท้ Windows, Microsoft Office และโปรแกรมอื่นๆ"
  },
  server: {
    title: "อุปกรณ์เซิร์ฟเวอร์ Server ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ CPU Server, RAM ECC และอุปกรณ์เซิร์ฟเวอร์อื่นๆ สำหรับองค์กร"
  },
  gamingGear: {
    title: "เกมมิ่งเกียร์ Gaming Gear ราคาถูก | Uboncomputer",
    description: "เลือกซื้อ Gaming Gear คุณภาพสูง เมาส์, คีย์บอร์ด, หูฟัง, แผ่นรองเมาส์ สำหรับเกมเมอร์ ราคาพิเศษจาก Uboncomputer"
  }
};

export const mockCategoryPageData: AllCategoryPageData = {
  cpu: { bannerUrl: 'https://www.img.in.th/images/2237d4037562479f972b9a714777a83d.png' },
  gpu: { bannerUrl: 'https://www.img.in.th/images/0a2824b0714b14a273f523c06385d341.png' },
  ram: { bannerUrl: 'https://www.img.in.th/images/5f04b2a8848f88e14620a23330b62123.png' },
  motherboard: { bannerUrl: 'https://www.img.in.th/images/9d2b1f8b8830b5e28a556d10c149d5c4.png' },
  storage: { bannerUrl: 'https://www.img.in.th/images/c2d7e5e3c7b8e5c85117f7b3b3a6d1a9.png' },
  case: { bannerUrl: 'https://www.img.in.th/images/a0a1a1a1a1a1a1a1a1a1a1a1a1a1a1a1.png' },
  cooling: { bannerUrl: 'https://www.img.in.th/images/b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1b1.png' },
  powerSupply: { bannerUrl: 'https://www.img.in.th/images/b4a4c688849b388b394f1b8a1c97f1f9.png' },
  network: { bannerUrl: 'https://www.img.in.th/images/c3d8e6e3c8b9e6c85218f8b4b4a7d2a0.png' },
  software: { bannerUrl: 'https://www.img.in.th/images/d4e9f7f4d9c0f7d95319f9c5c5b8e3b1.png' },
  server: { bannerUrl: 'https://www.img.in.th/images/e5f0g8g5e0d1g8e05420g0d6d6c9f4c2.png' },
  gamingGear: { bannerUrl: 'https://images.unsplash.com/photo-1586182987320-4f276d39e4e3?q=80&w=1200&auto=format&fit=crop' },
};


const mockNotebookBrands: Brand[] = [
  { id: 1, name: 'ACER', logoUrl: 'https://www.img.in.th/images/b2a74c43336423985160b8eb4a1796d8.png' },
  { id: 2, name: 'ASUS', logoUrl: 'https://www.img.in.th/images/7374b3a4a982928ed028a306c5f73c43.png' },
  { id: 3, name: 'GIGABYTE', logoUrl: 'https://www.img.in.th/images/43c5bf4f358b5435946c125637256e18.png' },
  { id: 4, name: 'LENOVO', logoUrl: 'https://www.img.in.th/images/c29759d57a2c6762c417937477f10b78.png' },
  { id: 5, name: 'MSI', logoUrl: 'https://www.img.in.th/images/79c93717208d0f1b25a97576f620f5c1.png' },
  { id: 6, name: 'HP', logoUrl: 'https://www.img.in.th/images/6044fa12411e3b5a7966952843472097.png' },
];

const mockNotebooks: DisplayProduct[] = [
    { id: 401, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN 15 B13VE-1608TH (COSMOS GRAY)', specs: 'CPU: i5-13420H VGA: RTX 4050 6 GB GDDR6 RAM: 16GB (8GBx2) DDR4 3200MHz...', price: 25490, oldPrice: 32990, imageUrl: 'https://www.img.in.th/images/b0b5d09f7b03666b6e4d0257e0e7a2b2.png', brand: 'MSI', discountPercentage: 23 },
    { id: 402, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 X1504GA-NJ322W (MIXED BLACK)', specs: 'CPU: i3-N305 VGA: INTEL UHD GRAPHICS RAM: 8GB DDR4 (ON BOARD) STORAGE:...', price: 11490, oldPrice: 13990, imageUrl: 'https://www.img.in.th/images/8a39e8027a0544259b15b3c3c788296a.png', brand: 'ASUS', discountPercentage: 18 },
    { id: 403, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI KATANA 17 B13VEK-1266TH (BLACK) (2Y)', specs: 'CPU: i7-13620H VGA: RTX 4050 6GB GDDR6 RAM: 16GB (8GBx2) DDR5 STORAGE: 512G...', price: 34990, oldPrice: 42990, imageUrl: 'https://www.img.in.th/images/e2d08a541315e9854cd79b8a361e68c9.png', brand: 'MSI', discountPercentage: 19 },
    { id: 404, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN A15 B7VE-045TH (COSMOS GRAY) (2Y)', specs: 'CPU: AMD Ryzen 5 7535HS VGA: RTX 4050 6 GB GDDR6 RAM: 16GB (8GBx2) DDR5...', price: 24990, oldPrice: 31990, imageUrl: 'https://www.img.in.th/images/c2f8215907409c9547d28c310c85c3b1.png', brand: 'MSI', discountPercentage: 22 },
    { id: 405, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS TUF DASH A15 FA506NCR-HN005W (GRAPHITE BLACK) (2Y)', specs: 'CPU: AMD Ryzen 7 7435HS VGA: RTX 3050 4GB GDDR6 RAM: 16GB DDR5 5600MHz...', price: 24990, oldPrice: 30990, imageUrl: 'https://www.img.in.th/images/6df15102572b0ab57e2995c63d91970f.png', brand: 'ASUS', discountPercentage: 19 },
    { id: 406, name: 'NOTEBOOK (โน้ตบุ๊ค) ASUS VIVOBOOK GO 15 M1504FA-NJ516W (MIXED BLACK) (2Y)', specs: 'CPU: AMD Ryzen 5 7520U VGA: AMD Radeon Graphics (integrated) RAM: 8GB LPDDR5...', price: 12990, oldPrice: 14990, imageUrl: 'https://www.img.in.th/images/8a39e8027a0544259b15b3c3c788296a.png', brand: 'ASUS', discountPercentage: 13 },
    { id: 407, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI KATANA 17 B13VFK-1064TH (BLACK) (2Y)', specs: 'CPU: Intel Core i7-13620H VGA: Geforce 4060 8GB GDDR6 RAM: 16GB DDR5...', price: 36990, oldPrice: 46990, imageUrl: 'https://www.img.in.th/images/e2d08a541315e9854cd79b8a361e68c9.png', brand: 'MSI', discountPercentage: 21 },
    { id: 408, name: 'NOTEBOOK (โน้ตบุ๊ค) MSI THIN 15 B13UC-2415TH (COSMOS GRAY) (2Y)', specs: 'CPU: i7-13620H VGA: RTX 3050 4GB GDDR6 RAM: 16GB DDR4 3200 STORAGE: 512GB...', price: 23990, oldPrice: 30490, imageUrl: 'https://www.img.in.th/images/b0b5d09f7b03666b6e4d0257e0e7a2b2.png', brand: 'MSI', discountPercentage: 21 },
];

const mockPrinterBrands: Brand[] = [
  { id: 7, name: 'HP', logoUrl: 'https://www.img.in.th/images/6044fa12411e3b5a7966952843472097.png' },
  { id: 8, name: 'BROTHER', logoUrl: 'https://i.ibb.co/L5r038S/brother-logo.png' },
  { id: 9, name: 'CANON', logoUrl: 'https://i.ibb.co/gR2x7w4/canon-logo.png' },
  { id: 10, name: 'EPSON', logoUrl: 'https://i.ibb.co/3WqVfbf/epson-logo.png' },
];

const mockPrinters: DisplayProduct[] = [
  { id: 501, name: 'PRINTER HP INK TANK 315', specs: 'Print, Scan, Copy / ความละเอียด 4800 x 1200 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', price: 4390, oldPrice: 4890, imageUrl: 'https://www.img.in.th/images/94639c4d9ca27f4d2f831952f447660c.png', brand: 'HP', discountPercentage: 10 },
  { id: 502, name: 'PRINTER BROTHER DCP-T220', specs: 'Print, Scan, Copy / ความละเอียด 1200 x 6000 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', price: 4590, imageUrl: 'https://www.img.in.th/images/3a2333b2e3f533a1e2f9d7890f5b497b.png', brand: 'BROTHER' },
  { id: 503, name: 'PRINTER CANON PIXMA G2010', specs: 'Print, Scan, Copy / ความละเอียด 4800 x 1200 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', price: 4290, oldPrice: 4590, imageUrl: 'https://www.img.in.th/images/154101e18b456d957f006886e8da4d82.png', brand: 'CANON', discountPercentage: 7 },
  { id: 504, name: 'PRINTER EPSON L3210', specs: 'Print, Scan, Copy / ความละเอียด 5760 x 1440 dpi / การเชื่อมต่อ Hi-Speed USB 2.0', price: 4790, imageUrl: 'https://www.img.in.th/images/c081e640285fc5f7259114d56d78fa1b.png', brand: 'EPSON' },
];

const mockComputerBrands: Brand[] = [
  { id: 11, name: 'DELL', logoUrl: 'https://i.ibb.co/Qk4c2WC/dell-logo.png' },
  { id: 12, name: 'HP', logoUrl: 'https://www.img.in.th/images/6044fa12411e3b5a7966952843472097.png' },
  { id: 13, name: 'LENOVO', logoUrl: 'https://www.img.in.th/images/c29759d57a2c6762c417937477f10b78.png' },
];

const mockComputers: DisplayProduct[] = [
    { id: 601, name: 'ALL IN ONE DELL INSPIRON 5410-W26631102TH', specs: 'CPU : Intel Core i5-1235U / RAM : 8GB DDR4 / SSD : 512GB', price: 27990, imageUrl: 'https://www.img.in.th/images/c79f90f23b3061cdd8d975a5c68b6b0c.png', brand: 'DELL' },
    { id: 602, name: 'ALL IN ONE HP 24-CB1025D', specs: 'CPU : Intel Core i3-1215U / RAM : 8GB DDR4 / SSD : 256GB', price: 18490, oldPrice: 19990, imageUrl: 'https://www.img.in.th/images/84dfbb607623315a6fd20d6ab629739c.png', brand: 'HP', discountPercentage: 8 },
    { id: 603, name: 'ALL IN ONE LENOVO IDEACENTRE 3 24IAP7', specs: 'CPU : Intel Core i5-13420H / RAM : 16GB DDR4 / SSD : 512GB', price: 24990, imageUrl: 'https://www.img.in.th/images/42b32f913e1687f8770c3065a04ba3c6.png', brand: 'LENOVO' },
];

const mockNewProducts: DisplayProduct[] = [
    { id: 1, name: 'CPU INTEL CORE I9-14900KS 6.2GHz', specs: 'Socket LGA 1700 / 24 Cores / 32 Threads / 3.2 GHz', price: 28900, imageUrl: 'https://www.img.in.th/images/796b42b937072a392b21c608f654b42b.png', brand: 'Intel' },
    { id: 3, name: 'VGA ASUS GEFORCE RTX 4090', specs: '16GB GDDR6X 256-bit / Boost Clock 2640 MHz', price: 38900, imageUrl: 'https://www.img.in.th/images/05ffb7074465c197992984534a70ed69.png', brand: 'ASUS' },
    { id: 703, name: 'MONITOR DELL ALIENWARE AW2725DF 27" OLED', specs: '2560x1440 @ 360Hz / 0.03ms / AMD FreeSync Premium Pro', price: 35900, oldPrice: 38900, imageUrl: 'https://www.img.in.th/images/f326302e1c7f9999a466d13bd3b25f9c.png', brand: 'DELL', discountPercentage: 8 },
];

const mockPreBuiltPCBrands: Brand[] = [
  { id: 14, name: 'ASUS', logoUrl: 'https://www.img.in.th/images/7374b3a4a982928ed028a306c5f73c43.png' },
  { id: 15, name: 'MSI', logoUrl: 'https://www.img.in.th/images/79c93717208d0f1b25a97576f620f5c1.png' },
];

const mockPreBuiltPCs: DisplayProduct[] = [
    { id: 801, name: 'ASUS ROG Strix G16CH', specs: 'Intel Core i7-13700F / GeForce RTX 4070 / 16GB DDR4 / 1TB SSD', price: 79990, imageUrl: 'https://www.img.in.th/images/9c1ed367d3e18a09b43c68383a17e082.png', brand: 'ASUS' },
    { id: 802, name: 'MSI MPG Trident AS 13th', specs: 'Intel Core i7-13700F / GeForce RTX 4060 Ti / 16GB DDR5 / 1TB SSD', price: 65900, oldPrice: 69900, imageUrl: 'https://www.img.in.th/images/ca6d910f5e1f021e1d0981e4b85c1569.png', brand: 'MSI', discountPercentage: 6 },
];

export const mockHomepageContent: HomepageContent = {
  headerTopBarText: 'Uboncomputer | อุบลคอมพิวเตอร์',
  introSection: {
    title: `Uboncomputer ร้านคอมพิวเตอร์ครบวงจร ประกอบคอม ราคาถูก อัปเดตล่าสุด ${new Date().getFullYear()}`,
    paragraph: 'เพื่อตอบโจทย์สายเกมเมอร์ จำหน่ายคอมพิวเตอร์ประกอบสำเร็จรูป อุปกรณ์คอมพิวเตอร์สำหรับเล่นเกม บริการหลังการขายดีเยี่ยม ผ่อนชำระได้ 24 ชั่วโมง หรือผ่อนผ่านบัตรเครดิต 13 สาขาทั่วประเทศไทย พร้อมให้คำปรึกษาจากผู้เชี่ยวชาญกว่า 10 ปี',
    buttonText: 'แชทกับเรา Uboncomputer',
    buttonLink: '#'
  },
  promoBanners: [
    { id: 1, src: 'https://picsum.photos/seed/promo1/600/300', alt: 'Promotion 1', link: '#' },
    { id: 2, src: 'https://picsum.photos/seed/promo2/600/300', alt: 'Promotion 2', link: '#' },
    { id: 3, src: 'https://picsum.photos/seed/promo3/600/300', alt: 'Promotion 3', link: '#' },
  ],
  dualCarousels: [
    {
      id: 1,
      slides: [
        { id: 1, src: 'https://picsum.photos/seed/halloween1/800/400', alt: 'Promo slide 1' },
        { id: 2, src: 'https://picsum.photos/seed/halloween2/800/400', alt: 'Promo slide 2' },
        { id: 3, src: 'https://picsum.photos/seed/halloween3/800/400', alt: 'Promo slide 3' },
      ]
    },
    {
      id: 2,
      slides: [
        { id: 1, src: 'https://picsum.photos/seed/monster1/800/400', alt: 'Promo slide 1' },
        { id: 2, src: 'https://picsum.photos/seed/monster2/800/400', alt: 'Promo slide 2' },
      ]
    }
  ],
  storeInfo: {
    mainImage: 'https://picsum.photos/seed/storefront/1200/600',
    branches: [
      { id: 1, name: 'สาขา Central Ubon', phone: '045-240-838' },
      { id: 2, name: 'สาขา Sunee Tower', phone: '045-240-838' },
      { id: 3, name: 'สาขา สำนักงานใหญ่', phone: '045-240-838' },
      { id: 4, name: 'สาขา โชว์รูม', phone: '045-240-838' },
    ]
  },
  sectionTitles: {
    notebooks: 'Notebook',
    computers: 'คอมพิวเตอร์',
    printers: 'ปริ้นเตอร์',
    newProducts: 'สินค้าใหม่',
    preBuiltPCs: 'คอมประกอบ',
    youtube: 'ยูทูป',
    articles: 'บทความ',
  },
  mainPromoBanner: {
    src: 'https://www.img.in.th/images/b2049d115e8c156644400e2343a41113.png',
    alt: 'AMD Ryzen Promotion Banner',
    link: '#'
  },
  youtube: {
    videos: [
      { id: 1, imageUrl: 'https://www.img.in.th/images/a243a0e69a91060f6430342ab8400492.png', link: 'https://www.youtube.com', alt: 'RTX 5070 Ti vs RTX 5070' },
      { id: 2, imageUrl: 'https://www.img.in.th/images/6b579a4c8a2b1f8e1c6e1e69d91f2a3c.png', link: 'https://www.youtube.com', alt: 'RX 9070 XT vs RTX 5070' },
      { id: 3, imageUrl: 'https://www.img.in.th/images/9c3367123616a1b2e817c1a2d5930e1d.png', link: 'https://www.youtube.com', alt: 'VRAM and FPS analysis' }
    ]
  },
  infoBar: {
    items: [
      { id: 1, icon: 'Truck', title: 'ส่งฟรีทั่วไทย', subtitle: 'เมื่อซื้อครบ 5,000 ขึ้นไป' },
      { id: 2, icon: 'RefreshCw', title: 'เปลี่ยนคืนสินค้าง่าย', subtitle: 'เปลี่ยนใหม่ภายใน 7 วัน' },
      { id: 3, icon: 'Clock', title: 'รวดเร็วในการให้บริการ', subtitle: 'ตอบด่วน ตอบไว' },
      { id: 4, icon: 'ShieldCheck', title: 'ชำระเงินปลอดภัย', subtitle: 'ด้วยระบบออนไลน์' },
    ]
  },
  socialLinks: [
    { id: 1, platform: 'Facebook', url: '#' },
    { id: 2, platform: 'Youtube', url: '#' },
    { id: 3, platform: 'Tiktok', url: '#' },
  ],
  newProducts: mockNewProducts,
  notebooks: mockNotebooks,
  computers: mockComputers,
  printers: mockPrinters,
  preBuiltPCs: mockPreBuiltPCs,
  notebookBrands: mockNotebookBrands,
  computerBrands: mockComputerBrands,
  printerBrands: mockPrinterBrands,
  preBuiltPCBrands: mockPreBuiltPCBrands,
};

export const mockOrders: Order[] = [
  {
    id: 'UBON-12345',
    phoneNumber: '0812345678',
    trackingNumber: 'TH123456789KEX',
    carrier: 'Kerry Express',
    customerName: 'สมชาย ใจดี',
    steps: [
      { status: 'ได้รับคำสั่งซื้อ', date: '10 ต.ค. 2568, 14:30น.', completed: true },
      { status: 'กำลังจัดเตรียมสินค้า', date: '10 ต.ค. 2568, 16:00น.', completed: true },
      { status: 'จัดส่งแล้ว', date: '11 ต.ค. 2568, 09:15น.', completed: true },
      { status: 'จัดส่งสำเร็จ', date: '', completed: false },
    ],
  },
  {
    id: 'UBON-67890',
    phoneNumber: '0898765432',
    trackingNumber: 'TH987654321FTH',
    carrier: 'Flash Express',
    customerName: 'สมหญิง รักไทย',
    steps: [
      { status: 'ได้รับคำสั่งซื้อ', date: '12 ต.ค. 2568, 10:10น.', completed: true },
      { status: 'กำลังจัดเตรียมสินค้า', date: '12 ต.ค. 2568, 11:30น.', completed: true },
      { status: 'จัดส่งแล้ว', date: '12 ต.ค. 2568, 17:00น.', completed: true },
      { status: 'จัดส่งสำเร็จ', date: '13 ต.ค. 2568, 13:00น.', completed: true },
    ],
  },
  {
    id: 'UBON-11223',
    phoneNumber: '0855556666',
    trackingNumber: 'TH112233445JNT',
    carrier: 'J&T Express',
    customerName: 'มานะ อดทน',
    steps: [
      { status: 'ได้รับคำสั่งซื้อ', date: '13 ต.ค. 2568, 18:00น.', completed: true },
      { status: 'กำลังจัดเตรียมสินค้า', date: '', completed: false },
      { status: 'จัดส่งแล้ว', date: '', completed: false },
      { status: 'จัดส่งสำเร็จ', date: '', completed: false },
    ],
  },
];

export const mockDiscountCodes: DiscountCode[] = [
  { id: 1, code: 'SALE10', type: 'percentage', value: 10, isActive: true },
  { id: 2, code: 'WELCOME50', type: 'fixed', value: 50, isActive: true },
  { id: 3, code: 'EXPIRED', type: 'percentage', value: 20, isActive: false },
  { id: 4, code: 'FREESHIP', type: 'fixed', value: 150, isActive: true },
];

export const mockAdminOrders: AdminOrder[] = [
  {
    id: 1,
    orderNumber: 'UBON-202401',
    date: '2024-07-26T10:30:00Z',
    customer: {
      name: 'สมชาย ใจดี',
      address: '123/45 หมู่ 6 ถนนชยางกูร',
      district: 'ในเมือง',
      province: 'อุบลราชธานี',
      zipcode: '34000',
      phone: '0812345678',
      email: 'somchai.j@example.com',
    },
    items: [
      { ...(mockProducts.find(p => p.id === 1)!), quantity: 1 }, // I9-14900KS
      { ...(mockProducts.find(p => p.id === 5)!), quantity: 1 }, // Corsair Vengeance RAM
    ],
    total: 33890,
    shipping: 150,
    discount: 0,
    grandTotal: 34040,
    status: 'Pending',
  },
  {
    id: 2,
    orderNumber: 'UBON-202402',
    date: '2024-07-25T14:00:00Z',
    customer: {
      name: 'สมหญิง รักไทย',
      address: '99/9 หมู่ 1 ถนนแจ้งสนิท',
      district: 'วารินชำราบ',
      province: 'อุบลราชธานี',
      zipcode: '34190',
      phone: '0898765432',
      email: 'somying.r@example.com',
    },
    items: [
      { ...(mockProducts.find(p => p.id === 3)!), quantity: 1 }, // RTX 4090
    ],
    total: 38900,
    shipping: 150,
    discount: 1000,
    grandTotal: 38050,
    status: 'Processing',
  },
  {
    id: 3,
    orderNumber: 'UBON-202403',
    date: '2024-07-24T09:15:00Z',
    customer: {
      name: 'มานะ อดทน',
      address: '555 หมู่ 10 ถนนอุปลีสาน',
      district: 'ในเมือง',
      province: 'อุบลราชธานี',
      zipcode: '34000',
      phone: '0855556666',
      email: 'mana.o@example.com',
    },
    items: [
      { ...(mockProducts.find(p => p.id === 15)!), quantity: 1 }, // i5-13600K
      { ...(mockProducts.find(p => p.id === 18)!), quantity: 1 }, // Gigabyte B650
      { ...(mockProducts.find(p => p.id === 19)!), quantity: 2 }, // Kingston FURY Beast
    ],
    total: 25680,
    shipping: 0,
    discount: 0,
    grandTotal: 25680,
    status: 'Shipped',
    trackingNumber: 'TH-ADMIN-SHIP-001',
    carrier: 'J&T Express',
  },
  {
    id: 4,
    orderNumber: 'UBON-202404',
    date: '2024-07-22T18:45:00Z',
    customer: {
      name: 'ปรีดา สุขใจ',
      address: '789/1 หมู่ 3 ถนนสรรพสิทธิ์',
      district: 'ในเมือง',
      province: 'อุบลราชธานี',
      zipcode: '34000',
      phone: '0867891234',
      email: 'preeda.s@example.com',
    },
    items: [
      { ...(mockProducts.find(p => p.id === 401)!), quantity: 1 }, // MSI Thin 15 notebook
    ],
    total: 25490,
    shipping: 150,
    discount: 0,
    grandTotal: 25640,
    status: 'Completed',
    trackingNumber: 'TH-ADMIN-COMP-002',
    carrier: 'Kerry Express',
  },
    {
    id: 5,
    orderNumber: 'UBON-202405',
    date: '2024-07-21T11:20:00Z',
    customer: {
      name: 'กานดา มีชัย',
      address: '11/22 หมู่ 4 ถนนเลี่ยงเมือง',
      district: 'เมือง',
      province: 'อุบลราชธานี',
      zipcode: '34000',
      phone: '0843219876',
      email: 'kanda.m@example.com',
    },
    items: [
      { ...(mockProducts.find(p => p.id === 501)!), quantity: 1 }, // HP Ink Tank 315 printer
    ],
    total: 4390,
    shipping: 150,
    discount: 0,
    grandTotal: 4540,
    status: 'Cancelled',
  }
];

export const mockCareersPageContent: CareersPageContent = {
  hero: {
    title: "ร่วมเป็นส่วนหนึ่งกับเรา",
    subtitle: "เติบโตไปพร้อมกับทีมงานที่หลงใหลในเทคโนโลยีและพร้อมที่จะสร้างสรรค์สิ่งใหม่ๆ ที่ Uboncomputer"
  },
  whyUs: {
    title: "ทำไมต้องร่วมงานกับ Uboncomputer?",
    subtitle: "เราเชื่อในการสร้างสภาพแวดล้อมการทำงานที่ส่งเสริมการเติบโตและนวัตกรรม",
    features: [
      { id: 1, icon: 'Users', title: "วัฒนธรรมองค์กรที่ยอดเยี่ยม", description: "ทำงานเป็นทีมเหมือนครอบครัว เปิดรับความคิดเห็นและพร้อมช่วยเหลือซึ่งกันและกัน" },
      { id: 2, icon: 'TrendingUp', title: "โอกาสในการเติบโต", description: "เราสนับสนุนการเรียนรู้และพัฒนาทักษะใหม่ๆ พร้อมโอกาสก้าวหน้าในสายอาชีพ" },
      { id: 3, icon: 'Coffee', title: "สวัสดิการและสภาพแวดล้อม", description: "ประกันสังคม, วันหยุดพักผ่อน, และสภาพแวดล้อมการทำงานที่เป็นมิตรและทันสมัย" }
    ]
  },
  openings: {
    title: "ตำแหน่งงานที่เปิดรับ",
    subtitle: "ค้นหาตำแหน่งที่ใช่และมาร่วมสร้างอนาคตกับเรา",
    jobs: [
      { id: 1, title: 'ช่างเทคนิคคอมพิวเตอร์ (Computer Technician)', location: 'สาขาสำนักงานใหญ่, อุบลราชธานี', type: 'Full-time', description: 'รับผิดชอบการประกอบ, ซ่อม, และอัปเกรดคอมพิวเตอร์. วินิจฉัยและแก้ไขปัญหาฮาร์ดแวร์และซอฟต์แวร์ให้กับลูกค้า.', salary: '18,000 - 25,000 บาท', isActive: true },
      { id: 2, title: 'พนักงานขายหน้าร้าน (Sales Associate)', location: 'สาขา Central Ubon', type: 'Full-time', description: 'ให้คำแนะนำและบริการลูกค้าเกี่ยวกับสินค้าไอที. ดูแลสต็อกสินค้าและความเรียบร้อยภายในร้าน.', salary: 'ตามโครงสร้างบริษัท', isActive: true },
      { id: 3, title: 'เจ้าหน้าที่การตลาดออนไลน์ (Digital Marketer)', location: 'สำนักงานใหญ่ (Work from Home available)', type: 'Full-time', description: 'วางแผนและดำเนินกิจกรรมการตลาดผ่านช่องทางออนไลน์ เช่น Social Media, SEO/SEM, และ Email Marketing.', salary: '25,000 - 35,000 บาท', isActive: false },
      { id: 4, title: 'พนักงานคลังสินค้า (Warehouse Staff)', location: 'คลังสินค้า, อุบลราชธานี', type: 'Part-time', description: 'รับผิดชอบการจัดเก็บ, จัดเตรียม, และแพ็คสินค้าเพื่อจัดส่ง. ตรวจสอบความถูกต้องของสต็อกสินค้า.', salary: 'ตามตกลง', isActive: true }
    ]
  },
  cta: {
    title: "ไม่พบตำแหน่งงานที่เหมาะสม?",
    subtitle: "เรามองหาคนเก่งมาร่วมทีมอยู่เสมอ ส่งประวัติ (CV) ของคุณมาให้เราพิจารณาได้ที่",
    email: "hr@uboncomputer.com"
  }
};