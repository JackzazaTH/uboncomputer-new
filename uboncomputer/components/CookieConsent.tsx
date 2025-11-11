
import React, { useState, useEffect } from 'react';
import { Cookie } from 'lucide-react';
import { Page } from '../types';

interface CookieConsentProps {
    onNavigate: (page: Page) => void;
}

const CookieConsent: React.FC<CookieConsentProps> = ({ onNavigate }) => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        try {
            const consent = localStorage.getItem('cookie_consent');
            if (!consent) {
                setIsVisible(true);
            }
        } catch (error) {
            console.error("Could not access localStorage: ", error);
            // If localStorage is not available, we can't store consent, so don't show the banner.
            setIsVisible(false);
        }
    }, []);

    const handleAccept = () => {
        try {
            localStorage.setItem('cookie_consent', 'true');
            setIsVisible(false);
        } catch (error) {
            console.error("Could not write to localStorage: ", error);
            // Hide the banner even if we can't save the consent
            setIsVisible(false);
        }
    };

    if (!isVisible) {
        return null;
    }

    return (
        <div className="fixed bottom-0 left-0 right-0 z-[100] bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4 animate-slide-in-up">
            <div className="container mx-auto">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-start text-sm text-gray-700">
                        <Cookie className="w-8 h-8 mr-3 text-orange-500 flex-shrink-0" />
                        <p>
                            เราใช้คุกกี้เพื่อปรับปรุงประสบการณ์การใช้งานของคุณบนเว็บไซต์ของเรา การเข้าชมเว็บไซต์นี้ต่อถือว่าคุณยอมรับการใช้คุกกี้ของเรา 
                            <button onClick={() => onNavigate('cookies')} className="font-semibold text-orange-600 hover:underline ml-1">
                                เรียนรู้เพิ่มเติมเกี่ยวกับนโยบายคุกกี้
                            </button>
                        </p>
                    </div>
                    <div className="flex-shrink-0 w-full sm:w-auto">
                        <button 
                            onClick={handleAccept}
                            className="w-full sm:w-auto bg-orange-600 text-white font-bold py-2 px-6 rounded-md hover:bg-orange-700 transition-colors"
                        >
                            ยอมรับ
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CookieConsent;
