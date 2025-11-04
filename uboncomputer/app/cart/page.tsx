'use client';
import React from 'react';
import CartPage from '../../components/CartPage';
import { useAppContext } from '../../context/AppContext';

export default function Cart() {
  const { onNavigate } = useAppContext();
  return <CartPage onNavigate={onNavigate} />;
}