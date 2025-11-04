import React from 'react';
import { Phone, Mail, MapPin, Clock, Send } from 'lucide-react';
import { useToast } from '../hooks/useToast';

const ContactPage: React.FC = () => {
  const { addToast } = useToast();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // In a real app, you would handle form submission logic here
    addToast('ส่งข้อความของคุณเรียบร้อยแล้ว เราจะติดต่อกลับโดยเร็วที่สุด', 'success');
    e.currentTarget.reset(); // Clear the form
  };

  return (
    <div className="bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
            ติดต่อเรา
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
            เราพร้อมให้ความช่วยเหลือเสมอ! ไม่ว่าคุณจะมีคำถามเกี่ยวกับสินค้า, การจัดสเปค, หรือต้องการติดตามสถานะการสั่งซื้อ
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Info & Map */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">ข้อมูลการติดต่อ</h2>
              <div className="space-y-4 text-gray-600">
                <div className="flex items-start">
                  <MapPin className="w-6 h-6 text-orange-500 mr-4 mt-1 flex-shrink-0" />
                  <span>123 ถนนชยางกูร, ตำบลในเมือง, อำเภอเมืองอุบลราชธานี, อุบลราชธานี 34000</span>
                </div>
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />
                  <span>045-240-838</span>
                </div>
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />
                  <span>contact@uboncomputer.com</span>
                </div>
              </div>
            </div>
            
            <div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">เวลาทำการ</h2>
              <div className="flex items-center text-gray-600">
                  <Clock className="w-6 h-6 text-orange-500 mr-4 flex-shrink-0" />
                  <span>
                    จันทร์ - เสาร์: 10:00 - 20:00 น.<br/>
                    อาทิตย์: 11:00 - 18:00 น.
                  </span>
              </div>
            </div>
            
            <div className="rounded-lg overflow-hidden shadow-lg h-80">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d123282.90119159958!2d104.79373952136952!3d15.23999974246965!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3116443c71b61c73%3A0x86747a51d45c4793!2sCentral%20Ubon!5e0!3m2!1sen!2sth!4v1691500000000!5m2!1sen!2sth"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Uboncomputer Location"
                ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gray-50 p-8 rounded-lg shadow-lg border border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">ส่งข้อความถึงเรา</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">ชื่อ-นามสกุล</label>
                <div className="mt-1">
                  <input type="text" name="name" id="name" autoComplete="name" required className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">อีเมล</label>
                <div className="mt-1">
                  <input id="email" name="email" type="email" autoComplete="email" required className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700">หัวข้อ</label>
                <div className="mt-1">
                  <input type="text" name="subject" id="subject" required className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900" />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700">ข้อความ</label>
                <div className="mt-1">
                  <textarea id="message" name="message" rows={4} required className="py-3 px-4 block w-full shadow-sm focus:ring-orange-500 focus:border-orange-500 border-gray-300 rounded-md bg-white text-gray-900"></textarea>
                </div>
              </div>
              <div>
                <button type="submit" className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 transition-colors">
                  <Send className="w-5 h-5 mr-2" />
                  ส่งข้อความ
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
