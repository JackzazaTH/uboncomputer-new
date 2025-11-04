'use client';
import React, { useEffect } from 'react';
import ProductPage from '../../../components/ProductPage';
import { useAppContext } from '../../../context/AppContext';
import { notFound } from 'next/navigation';

export default function ProductDetailPage({ params }: { params: { productId: string } }) {
  const { products } = useAppContext();
  const product = products.find(p => p.id === parseInt(params.productId));

  useEffect(() => {
    if (product) {
        const title = `${product.name} | Uboncomputer`;
        document.title = title;
    }
  }, [product]);

  if (!product) {
    return <div>Product not found</div>;
  }

  return <ProductPage product={product} allProducts={products} />;
}
