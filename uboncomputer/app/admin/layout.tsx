
'use client';
// FIX: Imported useState and useEffect to resolve 'Cannot find name' errors.
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useRouter } from 'next/navigation';
import LoadingScreen from '@/components/LoadingScreen';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { isAdminLoggedIn } = useAppContext();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // This check runs on the client side.
    // If not logged in, redirect to home.
    if (!isAdminLoggedIn) {
      router.replace('/');
    } else {
      setIsLoading(false);
    }
  }, [isAdminLoggedIn, router]);

  if (isLoading || !isAdminLoggedIn) {
    return <LoadingScreen isHiding={false} />;
  }

  return <>{children}</>;
}
