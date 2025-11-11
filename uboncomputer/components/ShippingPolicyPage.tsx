import React from 'react';
import { Page } from '../types';

interface ShippingPolicyPageProps {
  onNavigate: (page: Page) => void;
}

const ShippingPolicyPage: React.FC<ShippingPolicyPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-2">นโยบายการจัดส่งสินค้า (Shipping Policy)</h1>
        <p className="text-gray-500 mb-8">อัปเดตล่าสุด: 25 กรกฎาคม 2567</p>

        <div className="prose lg:prose-lg max-w-none text-gray-800 leading-relaxed">
          <p>
            Uboncomputer มุ่งมั่นที่จะจัดส่งสินค้าให้ถึงมือท่านอย่างรวดเร็วและปลอดภัยที่สุด เรามีรายละเอียดนโยบายการจัดส่งดังนี้:
          </p>
          
          <h2>พื้นที่ให้บริการจัดส่ง</h2>
          <p>
            เราให้บริการจัดส่งสินค้าทั่วประเทศไทย
          </p>

          <h2>ระยะเวลาในการจัดส่ง</h2>
          <ul>
            <li><strong>กรุงเทพฯ และปริมณฑล:</strong> 1-2 วันทำการ</li>
            <li><strong>ต่างจังหวัด:</strong> 2-4 วันทำการ</li>
          </ul>
           <p>
            ระยะเวลาการจัดส่งอาจมีการเปลี่ยนแปลงขึ้นอยู่กับสถานการณ์และพื้นที่จัดส่ง โดยไม่นับรวมวันหยุดเสาร์-อาทิตย์ และวันหยุดนักขัตฤกษ์
          </p>

          <h2>ค่าบริการจัดส่ง</h2>
          <ul>
            <li><strong>จัดส่งฟรี</strong> เมื่อมียอดสั่งซื้อตั้งแต่ 5,000 บาทขึ้นไป</li>
            <li>สำหรับยอดสั่งซื้อที่ต่ำกว่า 5,000 บาท จะมีค่าบริการจัดส่งมาตรฐาน <strong>150 บาท</strong> ทั่วประเทศ</li>
          </ul>

          <h2>บริษัทขนส่ง</h2>
          <p>
            เราเลือกใช้บริการจากบริษัทขนส่งชั้นนำที่เชื่อถือได้ เช่น Kerry Express, Flash Express, J&T Express และไปรษณีย์ไทย เพื่อให้มั่นใจว่าสินค้าจะถึงมือท่านในสภาพที่สมบูรณ์
          </p>

          <h2>การตรวจสอบสถานะการจัดส่ง</h2>
          <p>
            หลังจากที่คำสั่งซื้อของท่านได้รับการจัดส่งแล้ว ท่านจะได้รับอีเมลยืนยันพร้อมหมายเลขพัสดุ (Tracking Number) ซึ่งท่านสามารถนำไปตรวจสอบสถานะได้ที่หน้า <button onClick={() => onNavigate('orderStatus')} className="text-orange-600 hover:underline font-semibold">"ตรวจสอบสถานะคำสั่งซื้อ"</button> หรือผ่านทางเว็บไซต์ของบริษัทขนส่งโดยตรง
          </p>
          
          <h2>การติดต่อ</h2>
           <p>
            หากท่านมีคำถามเพิ่มเติมเกี่ยวกับนโยบายการจัดส่ง, กรุณาติดต่อเราได้ที่:
          </p>
           <p>
            อีเมล: contact@uboncomputer.com<br />
            โทรศัพท์: 045-240-838
          </p>
        </div>
      </div>
    </div>
  );
};

export default ShippingPolicyPage;