import React from 'react';
import { Target, Award, Users, Wrench, ChevronRight } from 'lucide-react';
import { Page } from '../types';

interface AboutPageProps {
    onNavigate: (page: Page) => void;
}

const FeatureCard: React.FC<{ icon: React.ReactNode; title: string; description: string }> = ({ icon, title, description }) => (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-200">
        <div className="flex items-center justify-center h-12 w-12 rounded-full bg-orange-100 text-orange-600 mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
    </div>
);

const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gray-800 text-white py-24 sm:py-32">
                <img 
                    src="https://images.unsplash.com/photo-1550009158-94ae76552485?q=80&w=2400&auto=format&fit=crop" 
                    alt="Workshop with computer parts" 
                    className="absolute inset-0 w-full h-full object-cover opacity-30"
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                        เกี่ยวกับ <span className="text-orange-400">Uboncomputer</span>
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                        ศูนย์รวมอุปกรณ์คอมพิวเตอร์ครบวงจร ที่ซึ่งความหลงใหลในเทคโนโลยีมาพบกับบริการระดับมืออาชีพ
                    </p>
                </div>
            </section>

            {/* Our Story Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className="order-2 lg:order-1">
                            <h2 className="text-3xl font-bold text-gray-900 tracking-tight mb-4">เรื่องราวของเรา</h2>
                            <p className="text-gray-600 mb-4">
                                Uboncomputer ก่อตั้งขึ้นจากกลุ่มคนที่มีความรักในเทคโนโลยีและคอมพิวเตอร์ เราเริ่มต้นจากร้านเล็กๆ ในจังหวัดอุบลราชธานี ด้วยความมุ่งมั่นที่จะนำเสนอสินค้าไอทีคุณภาพสูงและบริการที่น่าประทับใจให้กับลูกค้าทุกคน
                            </p>
                            <p className="text-gray-600">
                                ตลอดระยะเวลากว่า 10 ปี เราได้เติบโตและเรียนรู้ไปพร้อมกับเทคโนโลยีที่เปลี่ยนแปลงอย่างรวดเร็ว ภารกิจของเราคือการเป็นมากกว่าร้านค้า แต่เป็นที่ปรึกษาที่เชื่อถือได้สำหรับทุกคน ตั้งแต่เกมเมอร์ระดับโปร, นักสร้างสรรค์คอนเทนต์, ไปจนถึงผู้ใช้งานทั่วไป เราเชื่อว่าคอมพิวเตอร์ที่ดีคือเครื่องมือที่ทรงพลังในการสร้างสรรค์และเชื่อมต่อผู้คน
                            </p>
                        </div>
                        <div className="order-1 lg:order-2 rounded-lg overflow-hidden shadow-lg">
                            <img 
                                src="https://images.unsplash.com/photo-1614332287897-cdc485fa562d?q=80&w=1200&auto=format&fit=crop" 
                                alt="Founders working on a computer"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900 tracking-tight">ทำไมต้องเลือก Uboncomputer?</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            เรามุ่งมั่นที่จะมอบประสบการณ์ที่ดีที่สุดให้กับลูกค้าในทุกๆ ด้าน
                         </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        <FeatureCard 
                            icon={<Wrench size={24} />} 
                            title="คำแนะนำจากผู้เชี่ยวชาญ"
                            description="ทีมงานของเราพร้อมให้คำปรึกษาและจัดสเปคคอมพิวเตอร์ที่เหมาะสมกับการใช้งานและงบประมาณของคุณที่สุด"
                        />
                        <FeatureCard 
                            icon={<Award size={24} />} 
                            title="สินค้าคุณภาพและของแท้"
                            description="เราคัดสรรเฉพาะสินค้าจากแบรนด์ชั้นนำที่เชื่อถือได้ รับประกันคุณภาพและประสิทธิภาพเต็มร้อย"
                        />
                        <FeatureCard 
                            icon={<Users size={24} />} 
                            title="บริการหลังการขายดีเยี่ยม"
                            description="เราดูแลลูกค้าเสมอแม้จะซื้อสินค้าไปแล้ว พร้อมให้ความช่วยเหลือ แก้ไขปัญหา และบริการอัปเกรด"
                        />
                         <FeatureCard 
                            icon={<Target size={24} />} 
                            title="ศูนย์กลางของ Gamer"
                            description="เราเข้าใจชาวเกมเมอร์ และเป็นส่วนหนึ่งของคอมมูนิตี้ พร้อมอัปเดตเทรนด์และอุปกรณ์ใหม่ๆ อยู่เสมอ"
                        />
                    </div>
                </div>
            </section>
            
            {/* Store Gallery */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900 tracking-tight">บรรยากาศร้านของเรา</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            แวะมาทักทายและสัมผัสสินค้าจริงได้ที่หน้าร้านของเรา
                         </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        <img src="https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b?q=80&w=800&auto=format&fit=crop" alt="Store interior 1" className="rounded-lg shadow-md aspect-video object-cover w-full"/>
                        <img src="https://images.unsplash.com/photo-1627993453836-e89a4a4f?q=80&w=800&auto=format&fit=crop" alt="Store interior 2" className="rounded-lg shadow-md aspect-video object-cover w-full"/>
                        <img src="https://images.unsplash.com/photo-1598792842436-5a3964491717?q=80&w=800&auto=format&fit=crop" alt="Store interior 3" className="rounded-lg shadow-md aspect-video object-cover w-full"/>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-gray-800 text-white rounded-lg p-12 text-center">
                        <h2 className="text-3xl font-bold mb-4">ให้ทีมงานมืออาชีพของเราช่วยคุณเลือกสิ่งที่ดีที่สุด</h2>
                        <p className="max-w-xl mx-auto mb-8">พร้อมให้คำปรึกษา</p>
                        <div className="flex flex-col sm:flex-row justify-center gap-4">
                            <button onClick={() => onNavigate('contact')} className="inline-flex items-center justify-center bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors">
                                ติดต่อเรา
                                <ChevronRight className="w-5 h-5 ml-2" />
                            </button>
                            <button onClick={() => onNavigate('home')} className="inline-flex items-center justify-center bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-8 rounded-md transition-colors">
                                กลับไปหน้าแรก
                            </button>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    );
};

export default AboutPage;