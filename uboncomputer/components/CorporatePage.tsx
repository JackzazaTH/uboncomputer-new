import React from 'react';
import { Building, Award, Headset, FileText, Send, Users, ShieldCheck, Truck } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const ServiceItem: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="flex items-start">
        <div className="flex-shrink-0">
            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-white text-orange-600 shadow">
                {icon}
            </div>
        </div>
        <div className="ml-4">
            <h4 className="text-lg font-bold text-gray-800">{title}</h4>
            <p className="mt-1 text-gray-600">{description}</p>
        </div>
    </div>
);

const CorporatePage: React.FC = () => {
    const { addToast } = useToast();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addToast('ส่งคำขอของท่านเรียบร้อยแล้ว เจ้าหน้าที่จะติดต่อกลับโดยเร็วที่สุด', 'success');
        e.currentTarget.reset();
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gray-800 text-white py-24 sm:py-32">
                <img 
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=2000&auto=format&fit=crop" 
                    alt="Professional team meeting in an office" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                        บริการสำหรับ<span className="text-orange-400">องค์กรและหน่วยงาน</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                        Uboncomputer พร้อมให้บริการจัดหาสินค้าไอทีและคอมพิวเตอร์สำหรับลูกค้าองค์กร, หน่วยงานราชการ, และสถานศึกษา ด้วยบริการที่ครบวงจรและราคาพิเศษ
                    </p>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900 tracking-tight">ทำไมต้องเลือก Uboncomputer สำหรับองค์กรของคุณ?</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            เราเข้าใจความต้องการของลูกค้าองค์กรและมุ่งมั่นที่จะมอบโซลูชันที่ดีที่สุด
                         </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon={<FileText size={24} />} 
                            title="เสนอราคาและวางบิล"
                            description="บริการใบเสนอราคาสำหรับองค์กร พร้อมเงื่อนไขการชำระเงิน (Credit Term) ที่ยืดหยุ่น"
                        />
                        <FeatureCard 
                            icon={<Users size={24} />} 
                            title="ทีมงานดูแลโดยเฉพาะ"
                            description="เรามีทีมขายและที่ปรึกษาที่พร้อมดูแลลูกค้าองค์กรโดยเฉพาะ เพื่อความรวดเร็วและแม่นยำ"
                        />
                        <FeatureCard 
                            icon={<Award size={24} />} 
                            title="สินค้าหลากหลาย"
                            description="ครบครันทุกความต้องการด้านไอที ตั้งแต่อุปกรณ์สำนักงานไปจนถึง Server และ Workstation"
                        />
                         <FeatureCard 
                            icon={<ShieldCheck size={24} />} 
                            title="ประสบการณ์และความน่าเชื่อถือ"
                            description="มีประสบการณ์ในการทำงานร่วมกับหน่วยงานราชการและเอกชน สามารถเข้าร่วมประมูล e-Bidding"
                        />
                    </div>
                </div>
            </section>
            
            {/* Services & Contact Form Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        {/* Services List */}
                        <div className="space-y-8">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight">บริการของเรา</h2>
                            <ServiceItem 
                                icon={<Headset size={20} />}
                                title="ให้คำปรึกษาและจัดสเปค"
                                description="ทีมงานผู้เชี่ยวชาญพร้อมให้คำปรึกษาเพื่อจัดสเปคคอมพิวเตอร์และอุปกรณ์ให้ตรงตามความต้องการและงบประมาณขององค์กร"
                            />
                             <ServiceItem 
                                icon={<FileText size={20} />}
                                title="การจัดทำใบเสนอราคา"
                                description="บริการรวดเร็วในการจัดทำใบเสนอราคา (Quotation) สำหรับการสั่งซื้อจำนวนมากและโปรเจกต์ต่างๆ"
                            />
                             <ServiceItem 
                                icon={<Truck size={20} />}
                                title="บริการจัดส่งและติดตั้ง"
                                description="มีบริการจัดส่งทั่วประเทศ พร้อมทีมงานติดตั้ง (On-site service) สำหรับลูกค้าในพื้นที่และจังหวัดใกล้เคียง"
                            />
                        </div>

                        {/* Contact Form */}
                        <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
                            <h3 className="text-2xl font-bold text-gray-800 mb-6">ติดต่อฝ่ายขายองค์กร</h3>
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700">ชื่อบริษัท / หน่วยงาน</label>
                                    <input type="text" name="companyName" id="companyName" required className="mt-1 py-2 px-3 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="contactName" className="block text-sm font-medium text-gray-700">ชื่อผู้ติดต่อ</label>
                                    <input type="text" name="contactName" id="contactName" required className="mt-1 py-2 px-3 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">เบอร์โทรศัพท์</label>
                                    <input type="tel" name="phone" id="phone" required className="mt-1 py-2 px-3 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
                                    <input type="email" name="email" id="email" required className="mt-1 py-2 px-3 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                                </div>
                                <div>
                                    <label htmlFor="details" className="block text-sm font-medium text-gray-700">รายละเอียด / สินค้าที่สนใจ</label>
                                    <textarea id="details" name="details" rows={4} required className="mt-1 py-2 px-3 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900"></textarea>
                                </div>
                                <div>
                                    <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                                        <Send className="w-5 h-5 mr-2" />
                                        ส่งคำขอ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CorporatePage;