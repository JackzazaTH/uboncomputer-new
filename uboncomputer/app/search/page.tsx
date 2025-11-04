'use client';
import React, { Suspense } from 'react';
import SearchResultsPage from '../../components/SearchResultsPage';
import { useAppContext } from '../../context/AppContext';
import { useSearchParams } from 'next/navigation';

function Search() {
  const { products, onNavigate } = useAppContext();
  const searchParams = useSearchParams();
  const query = searchParams.get('q') || '';

  return <SearchResultsPage query={query} allProducts={products} onNavigate={onNavigate} />;
}

export default function SearchPage() {
    return (
        <Suspense fallback={<div>Loading search results...</div>}>
            <Search />
        </Suspense>
    )
}