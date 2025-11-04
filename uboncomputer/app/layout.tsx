'use client';
import React from 'react';
import './globals.css';
import { ToastProvider } from '../hooks/useToast';
import ToastContainer from '../components/ToastContainer';
import { CartProvider } from '../hooks/useCart';
import { AppProvider, useAppContext } from '../context/AppContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MobileNavBar from '../components/MobileNavBar';
import AuthModal from '../components/AuthModal';
import LoginModal from '../components/LoginModal';
import { useRouter, usePathname } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

// This component contains the client-side logic that was previously in App.tsx's root
const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { 
    isAuthModalOpen, setIsAuthModalOpen, 
    isLoginModalOpen, setIsLoginModalOpen, 
    handleAdminLogin, 
    homepageContent,
    products,
    isAdminLoggedIn,
  } = useAppContext();
  
  // NOTE: These are not used here anymore as navigation is handled in the non-next.js setup.
  // const router = useRouter();
  // const pathname = usePathname();

  const handleLogin = (user: string, pass: string) => {
    // We are not using Next.js router here, AppContext handles navigation
    return handleAdminLogin(user, pass);
  };

  // This prevents the main layout from showing on the admin page
  // The logic is now in App.tsx, but keeping a similar check here might be useful if transitioning
  // We'll rely on App.tsx's logic for now. This file is part of the unused 'app' directory.

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col pb-16 lg:pb-0">
      {/* 
        This is part of the Next.js structure that is currently unused.
        The actual Header/Footer are rendered in App.tsx.
        If this were a real Next.js app, the props would be passed here.
      */}
      <main className="flex-grow relative z-0 overflow-x-hidden">
        {children}
      </main>
      {isAuthModalOpen && <AuthModal onClose={() => setIsAuthModalOpen(false)} />}
      {isLoginModalOpen && <LoginModal onClose={() => setIsLoginModalOpen(false)} onLogin={handleLogin} />}
    </div>
  );
}

// The Root Layout is a Server Component, but it wraps client components
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const title = "Uboncomputer - ร้านค้าอุปกรณ์ไอทีครบวงจร";
  const description = "Uboncomputer ร้านค้าอุปกรณ์ไอทีครบวงจร จัดสเปคคอม ประกอบคอม ราคาถูก สินค้าคุณภาพ ซีพียู การ์ดจอ แรม พร้อมบริการหลังการขายดีเยี่ยม";
  const imageUrl = "https://www.img.in.th/images/9920d317075c7423013280048e426210.png";

  return (
    <html lang="th" className="scroll-smooth">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title}</title>
        
        <meta name="description" content={description} />
        <meta name="keywords" content="ประกอบคอม, จัดสเปค, คอมพิวเตอร์, uboncomputer, อุบลคอมพิวเตอร์, การ์ดจอ, ซีพียู, อุปกรณ์ไอที, gaming gear, computer set" />
        <link rel="canonical" href="https://www.uboncomputer.com/" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.uboncomputer.com/" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={imageUrl} />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://www.uboncomputer.com/" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
        <meta property="twitter:image" content={imageUrl} />

        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-gray-50 text-gray-800">
        <ToastProvider>
          <CartProvider>
            <AppProvider>
                {/* 
                  In a real Next.js app, <MainLayout> would be here.
                  However, the entry point is index.tsx which renders App.tsx, so this is unused.
                  The children will be the page content.
                */}
                {children}
                <ToastContainer />
            </AppProvider>
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  )
}