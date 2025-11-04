import React from 'react';
import { Page } from '../types';
import { Briefcase, MapPin, Clock, Users, TrendingUp, Coffee, ArrowRight } from 'lucide-react';
import { useToast } from '../hooks/useToast';

interface CareersPageProps {
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

const jobOpenings = [
    {
        title: 'ช่างเทคนิคคอมพิวเตอร์ (Computer Technician)',
        location: 'สาขาสำนักงานใหญ่, อุบลราชธานี',
        type: 'Full-time',
        description: 'รับผิดชอบการประกอบ, ซ่อม, และอัปเกรดคอมพิวเตอร์. วินิจฉัยและแก้ไขปัญหาฮาร์ดแวร์และซอฟต์แวร์ให้กับลูกค้า.',
    },
    {
        title: 'พนักงานขายหน้าร้าน (Sales Associate)',
        location: 'สาขา Central Ubon',
        type: 'Full-time',
        description: 'ให้คำแนะนำและบริการลูกค้าเกี่ยวกับสินค้าไอที. ดูแลสต็อกสินค้าและความเรียบร้อยภายในร้าน.',
    },
    {
        title: 'เจ้าหน้าที่การตลาดออนไลน์ (Digital Marketer)',
        location: 'สำนักงานใหญ่ (Work from Home available)',
        type: 'Full-time',
        description: 'วางแผนและดำเนินกิจกรรมการตลาดผ่านช่องทางออนไลน์ เช่น Social Media, SEO/SEM, และ Email Marketing.',
    },
    {
        title: 'พนักงานคลังสินค้า (Warehouse Staff)',
        location: 'คลังสินค้า, อุบลราชธานี',
        type: 'Part-time',
        description: 'รับผิดชอบการจัดเก็บ, จัดเตรียม, และแพ็คสินค้าเพื่อจัดส่ง. ตรวจสอบความถูกต้องของสต็อกสินค้า.',
    }
];

const CareersPage: React.FC<CareersPageProps> = ({ onNavigate }) => {
    const { addToast } = useToast();

    const handleApplyClick = (jobTitle: string) => {
        addToast(`ฟีเจอร์สมัครงานสำหรับตำแหน่ง "${jobTitle}" ยังไม่เปิดใช้งาน`, 'info');
    };

    return (
        <div className="bg-gray-50">
            {/* Hero Section */}
            <section className="relative bg-gray-800 text-white py-24 sm:py-32">
                <img 
                    src="https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=2400&auto=format&fit=crop" 
                    alt="Team collaboration" 
                    className="absolute inset-0 w-full h-full object-cover opacity-20"
                />
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight">
                        ร่วมเป็นส่วนหนึ่งกับเรา
                    </h1>
                    <p className="mt-6 max-w-3xl mx-auto text-lg sm:text-xl text-gray-300">
                        เติบโตไปพร้อมกับทีมงานที่หลงใหลในเทคโนโลยีและพร้อมที่จะสร้างสรรค์สิ่งใหม่ๆ ที่ Uboncomputer
                    </p>
                </div>
            </section>

            {/* Why Work With Us Section */}
            <section className="py-16 sm:py-24">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900 tracking-tight">ทำไมต้องร่วมงานกับ Uboncomputer?</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            เราเชื่อในการสร้างสภาพแวดล้อมการทำงานที่ส่งเสริมการเติบโตและนวัตกรรม
                         </p>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        <FeatureCard 
                            icon={<Users size={24} />} 
                            title="วัฒนธรรมองค์กรที่ยอดเยี่ยม"
                            description="ทำงานเป็นทีมเหมือนครอบครัว เปิดรับความคิดเห็นและพร้อมช่วยเหลือซึ่งกันและกัน"
                        />
                        <FeatureCard 
                            icon={<TrendingUp size={24} />} 
                            title="โอกาสในการเติบโต"
                            description="เราสนับสนุนการเรียนรู้และพัฒนาทักษะใหม่ๆ พร้อมโอกาสก้าวหน้าในสายอาชีพ"
                        />
                        <FeatureCard 
                            icon={<Coffee size={24} />} 
                            title="สวัสดิการและสภาพแวดล้อม"
                            description="ประกันสังคม, วันหยุดพักผ่อน, และสภาพแวดล้อมการทำงานที่เป็นมิตรและทันสมัย"
                        />
                    </div>
                </div>
            </section>

            {/* Job Openings Section */}
            <section className="py-16 sm:py-24 bg-white">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                         <h2 className="text-3xl font-bold text-gray-900 tracking-tight">ตำแหน่งงานที่เปิดรับ</h2>
                         <p className="mt-4 max-w-2xl mx-auto text-gray-600">
                            ค้นหาตำแหน่งที่ใช่และมาร่วมสร้างอนาคตกับเรา
                         </p>
                    </div>
                    <div className="max-w-4xl mx-auto space-y-6">
                        {jobOpenings.map((job, index) => (
                            <div key={index} className="bg-gray-50 border border-gray-200 rounded-lg p-6 hover:border-orange-400 hover:shadow-md transition-all">
                                <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                                    <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
                                    <span className={`mt-2 sm:mt-0 text-sm font-semibold px-3 py-1 rounded-full ${job.type === 'Full-time' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'}`}>
                                        {job.type}
                                    </span>
                                </div>
                                <div className="flex items-center text-gray-500 text-sm mt-2 mb-4">
                                    <MapPin size={16} className="mr-2"/>
                                    <span>{job.location}</span>
                                </div>
                                <p className="text-gray-600 mb-4">{job.description}</p>
                                <button onClick={() => handleApplyClick(job.title)} className="inline-flex items-center bg-orange-600 text-white font-bold py-2 px-5 rounded-md hover:bg-orange-700 transition-colors">
                                    ดูรายละเอียดและสมัคร
                                    <ArrowRight size={16} className="ml-2"/>
                                </button>
                            </div>
                        ))}
                    </div>

                     <div className="mt-16 text-center border-t pt-12">
                        <h3 className="text-2xl font-bold text-gray-900">ไม่พบตำแหน่งงานที่เหมาะสม?</h3>
                        <p className="mt-2 text-gray-600 max-w-xl mx-auto">
                            เรามองหาคนเก่งมาร่วมทีมอยู่เสมอ ส่งประวัติ (CV) ของคุณมาให้เราพิจารณาได้ที่
                            <a href="mailto:hr@uboncomputer.com" className="font-semibold text-orange-600 hover:underline"> hr@uboncomputer.com</a>
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CareersPage;
