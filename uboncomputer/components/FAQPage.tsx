'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ChevronDown, HelpCircle, MessageSquare } from 'lucide-react';

const faqData = [
    {
        category: 'การสั่งซื้อและการชำระเงิน',
        questions: [
            {
                q: 'มีช่องทางการชำระเงินอะไรบ้าง?',
                a: 'เรารับชำระเงินผ่านบัตรเครดิต/เดบิต, การโอนเงินผ่านธนาคาร, PromptPay, และบริการผ่อนชำระผ่านบัตรเครดิตที่ร่วมรายการครับ',
            },
            {
                q: 'สามารถออกใบกำกับภาษีเต็มรูปแบบได้หรือไม่?',
                a: 'ได้ครับ ลูกค้าสามารถขอใบกำกับภาษีเต็มรูปแบบได้โดยการกรอกข้อมูลในขั้นตอนการสั่งซื้อ หรือติดต่อเจ้าหน้าที่ฝ่ายขายของเราครับ',
            },
            {
                q: 'จะตรวจสอบสถานะการสั่งซื้อได้อย่างไร?',
                a: 'คุณสามารถตรวจสอบสถานะการสั่งซื้อได้ผ่านทางหน้า "บัญชีของฉัน" หลังจากเข้าสู่ระบบ หรือใช้หมายเลขคำสั่งซื้อเพื่อตรวจสอบผ่านหน้า "ติดตามสถานะ" บนเว็บไซต์ของเราครับ',
            },
        ],
    },
    {
        category: 'การจัดส่งสินค้า',
        questions: [
            {
                q: 'ใช้เวลาจัดส่งกี่วัน?',
                a: 'สำหรับพื้นที่กรุงเทพฯ และปริมณฑล ใช้เวลาจัดส่ง 1-2 วันทำการ สำหรับต่างจังหวัดใช้เวลา 2-4 วันทำการ (ไม่รวมวันหยุดเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์) ครับ',
            },
            {
                q: 'มีค่าจัดส่งเท่าไหร่?',
                a: 'เรามีบริการจัดส่งฟรีทั่วประเทศเมื่อมียอดสั่งซื้อตั้งแต่ 5,000 บาทขึ้นไป หากยอดสั่งซื้อไม่ถึง จะมีค่าบริการจัดส่งมาตรฐาน 150 บาทครับ',
            },
            {
                q: 'สามารถนัดรับสินค้าที่หน้าร้านได้หรือไม่?',
                a: 'ได้ครับ ท่านสามารถเลือกตัวเลือก "รับสินค้าที่หน้าร้าน" ในขั้นตอนการจัดส่ง และเข้ามารับสินค้าได้ที่สาขาที่ท่านเลือกหลังจากได้รับการยืนยันจากเจ้าหน้าที่ครับ',
            },
        ],
    },
    {
        category: 'การรับประกันและการคืนสินค้า',
        questions: [
            {
                q: 'สินค้ามีประกันหรือไม่?',
                a: 'สินค้าทุกชิ้นเป็นของแท้และมีการรับประกันจากผู้ผลิตโดยตรง ระยะเวลาการรับประกันจะแตกต่างกันไปในแต่ละสินค้า สามารถตรวจสอบได้ที่หน้ารายละเอียดสินค้าครับ',
            },
            {
                q: 'หากสินค้ามีปัญหาภายใน 7 วัน สามารถทำอย่างไรได้บ้าง?',
                a: 'หากสินค้าที่ได้รับมีปัญหาการใช้งานภายใน 7 วันนับจากวันที่ได้รับสินค้า ท่านสามารถติดต่อเราเพื่อขอเปลี่ยนสินค้าใหม่ได้ โดยสินค้าต้องอยู่ในสภาพสมบูรณ์และครบถ้วนครับ',
            },
            {
                q: 'ขั้นตอนการเคลมสินค้าทำอย่างไร?',
                a: 'ท่านสามารถนำสินค้าที่มีปัญหาพร้อมใบเสร็จมาติดต่อที่หน้าร้าน Uboncomputer ทุกสาขา หรือส่งสินค้ากลับมาที่เราพร้อมแจ้งรายละเอียดปัญหา เจ้าหน้าที่จะดำเนินการส่งเคลมกับผู้ผลิตให้ครับ',
            },
        ],
    },
    {
        category: 'บริการและการช่วยเหลือด้านเทคนิค',
        questions: [
            {
                q: 'มีบริการประกอบคอมพิวเตอร์หรือไม่?',
                a: 'เรามีบริการประกอบคอมพิวเตอร์โดยทีมช่างผู้ชำนาญ พร้อมลงโปรแกรมพื้นฐานและจัดเก็บสายไฟให้สวยงาม เมื่อท่านสั่งซื้อชิ้นส่วนครบชุดจากเราครับ',
            },
            {
                q: 'หากต้องการจัดสเปคคอม สามารถขอคำแนะนำได้ที่ไหน?',
                a: 'ท่านสามารถใช้โปรแกรม "จัดสเปคคอม (DIY)" บนหน้าเว็บไซต์ของเรา หรือติดต่อทีมงานผ่านทาง Facebook, Line, หรือโทรศัพท์เพื่อขอคำปรึกษาจากผู้เชี่ยวชาญได้โดยตรงครับ',
            },
        ],
    },
];

const AccordionItem: React.FC<{
    item: { q: string; a: string };
    isOpen: boolean;
    onClick: () => void;
}> = ({ item, isOpen, onClick }) => {
    return (
        <div className="border-b">
            <button
                onClick={onClick}
                className="w-full flex justify-between items-center text-left py-4 px-2"
                aria-expanded={isOpen}
            >
                <span className={`font-semibold ${isOpen ? 'text-orange-600' : 'text-gray-800'}`}>
                    {item.q}
                </span>
                <ChevronDown
                    className={`w-5 h-5 text-gray-500 transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>
            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96' : 'max-h-0'}`}
            >
                <div className="p-4 pt-0 text-gray-600">
                    <p>{item.a}</p>
                </div>
            </div>
        </div>
    );
};

const FAQPage: React.FC = () => {
    const [openIndices, setOpenIndices] = useState<Record<string, number | null>>({});
    const router = useRouter();

    const handleAccordionClick = (category: string, index: number) => {
        setOpenIndices(prev => ({
            ...prev,
            [category]: prev[category] === index ? null : index,
        }));
    };

    return (
        <div className="bg-white">
            <section className="bg-gray-100 py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <HelpCircle className="mx-auto h-12 w-12 text-orange-500" />
                    <h1 className="mt-4 text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                        คำถามที่พบบ่อย
                    </h1>
                    <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                        ค้นหาคำตอบสำหรับข้อสงสัยของคุณได้ที่นี่
                    </p>
                </div>
            </section>
            
            <section className="py-16 sm:py-20">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                    <div className="space-y-12">
                        {faqData.map((categoryData) => (
                            <div key={categoryData.category}>
                                <h2 className="text-2xl font-bold text-gray-900 mb-6 pb-2 border-b-2 border-orange-200">
                                    {categoryData.category}
                                </h2>
                                <div className="space-y-2">
                                    {categoryData.questions.map((item, index) => (
                                        <AccordionItem
                                            key={index}
                                            item={item}
                                            isOpen={openIndices[categoryData.category] === index}
                                            onClick={() => handleAccordionClick(categoryData.category, index)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="mt-20 text-center bg-gray-50 p-8 rounded-lg">
                        <MessageSquare className="mx-auto h-10 w-10 text-orange-500" />
                        <h3 className="mt-4 text-2xl font-bold text-gray-900">ยังมีคำถามเพิ่มเติม?</h3>
                        <p className="mt-2 text-gray-600">
                            หากคุณไม่พบคำตอบที่ต้องการ ทีมงานของเราพร้อมให้ความช่วยเหลือ
                        </p>
                        <button
                            onClick={() => router.push('/contact')}
                            className="mt-6 inline-block bg-orange-600 text-white font-bold py-3 px-8 rounded-md hover:bg-orange-700 transition-colors"
                        >
                            ติดต่อเรา
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FAQPage;
