import React from 'react';

interface LoadingScreenProps {
  isHiding: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isHiding }) => {
  return (
    <div 
      className={`fixed inset-0 bg-gray-900 z-[9999] flex items-center justify-center transition-opacity duration-500 ease-in-out ${isHiding ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={isHiding}
    >
      <div className="text-center text-white">
        <h1 className="text-5xl font-bold text-white tracking-wider animate-pulse">
          UBON<span className="text-orange-500">COMPUTER</span>
        </h1>
        <p className="mt-4 text-gray-400 text-lg">กำลังโหลดข้อมูล...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
