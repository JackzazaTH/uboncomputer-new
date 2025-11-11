import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Product } from '../types';
import { useToast } from './useToast';

interface ComparisonContextType {
  compareItems: Product[];
  addToCompare: (product: Product) => void;
  removeFromCompare: (productId: number) => void;
  clearCompare: () => void;
  isInCompare: (productId: number) => boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export const useComparison = () => {
  const context = useContext(ComparisonContext);
  if (!context) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
};

const MAX_COMPARE_ITEMS = 4;

export const ComparisonProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [compareItems, setCompareItems] = useState<Product[]>([]);
  const { addToast } = useToast();

  const isInCompare = useCallback((productId: number) => {
    return compareItems.some(item => item.id === productId);
  }, [compareItems]);

  const addToCompare = useCallback((product: Product) => {
    setCompareItems(prevItems => {
      const isAlreadyIn = prevItems.some(item => item.id === product.id);
      if (isAlreadyIn) {
        addToast(`'${product.name}' อยู่ในรายการเปรียบเทียบแล้ว`, 'info');
        return prevItems;
      }
      if (prevItems.length >= MAX_COMPARE_ITEMS) {
        addToast(`เปรียบเทียบได้สูงสุด ${MAX_COMPARE_ITEMS} ชิ้น`, 'error');
        return prevItems;
      }
      addToast(`เพิ่ม '${product.name}' ในรายการเปรียบเทียบ`, 'success');
      return [...prevItems, product];
    });
  }, [addToast]);

  const removeFromCompare = useCallback((productId: number) => {
    setCompareItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);
  
  const clearCompare = useCallback(() => {
    setCompareItems([]);
  }, []);

  const value = {
      compareItems,
      addToCompare,
      removeFromCompare,
      clearCompare,
      isInCompare,
  };

  return React.createElement(
    ComparisonContext.Provider,
    { value: value },
    children
  );
};
