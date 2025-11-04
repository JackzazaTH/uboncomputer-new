'use client';
import React from 'react';
import PromotionsPage from '../../components/PromotionsPage';
import { useAppContext } from '../../context/AppContext';

export default function Promotions() {
  const { products, onNavigate } = useAppContext();
  return <PromotionsPage allProducts={products} onNavigate={onNavigate} />;
}