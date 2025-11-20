
import React from 'react';

interface LoadingScreenProps {
  isHiding: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isHiding }) => {
  return (
    <div 
      className={`fixed inset-0 bg-gray-900 z-[9999] flex flex-col items-center justify-center transition-opacity duration-500 ease-in-out ${isHiding ? 'opacity-0' : 'opacity-100'}`}
      aria-hidden={isHiding}
    >
      <div className="relative flex items-center justify-center mb-6">
          {/* Spinner Ring */}
          <div className="w-20 h-20 border-4 border-gray-700 rounded-full"></div>
          <div className="absolute w-20 h-20 border-4 border-orange-500 rounded-full border-t-transparent animate-spin"></div>
          
          {/* Logo in Center */}
          <div className="absolute text-white font-bold text-xl animate-pulse">U</div>
      </div>
      
      <div className="text-center">
        <h1 className="text-3xl font-bold text-white tracking-wider mb-2">
          UBON<span className="text-orange-500">COMPUTER</span>
        </h1>
        <p className="text-gray-400 text-sm font-medium animate-pulse">กำลังเตรียมความพร้อม...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
