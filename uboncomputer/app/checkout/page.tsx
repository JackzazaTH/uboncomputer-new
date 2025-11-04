'use client';
import React from 'react';
import CheckoutPage from '../../components/CheckoutPage';
import { useAppContext } from '../../context/AppContext';

export default function Checkout() {
  const { discountCodes, onNavigate } = useAppContext();
  return <CheckoutPage discountCodes={discountCodes} onNavigate={onNavigate} />;
}