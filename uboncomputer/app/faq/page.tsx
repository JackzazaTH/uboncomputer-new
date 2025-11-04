'use client';
import React from 'react';
import FAQPage from '../../components/FAQPage';
import { useAppContext } from '../../context/AppContext';

export default function FAQ() {
  const { onNavigate } = useAppContext();
  return <FAQPage onNavigate={onNavigate} />;
}