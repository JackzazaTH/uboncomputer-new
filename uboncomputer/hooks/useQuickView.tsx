
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { Product } from '../types';

interface QuickViewContextType {
  selectedProduct: Product | null;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
}

const QuickViewContext = createContext<QuickViewContextType | undefined>(undefined);

export const useQuickView = () => {
  const context = useContext(QuickViewContext);
  if (!context) {
    throw new Error('useQuickView must be used within a QuickViewProvider');
  }
  return context;
};

export const QuickViewProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const openQuickView = (product: Product) => {
    setSelectedProduct(product);
  };

  const closeQuickView = () => {
    setSelectedProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ selectedProduct, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
};
