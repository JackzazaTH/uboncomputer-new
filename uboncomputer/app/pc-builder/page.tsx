'use client';
import React from 'react';
import { PCBuilderPage } from '../../components/PCBuilderPage';
import { useAppContext } from '../../context/AppContext';

export default function PCBuilder() {
  const { products } = useAppContext();
  return <PCBuilderPage products={products} />;
}
