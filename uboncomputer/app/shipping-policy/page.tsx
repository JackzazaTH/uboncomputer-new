'use client';
import React from 'react';
import ShippingPolicyPage from '../../components/ShippingPolicyPage';
import { useAppContext } from '../../context/AppContext';

export default function ShippingPolicy() {
  const { onNavigate } = useAppContext();
  return <ShippingPolicyPage onNavigate={onNavigate} />;
}