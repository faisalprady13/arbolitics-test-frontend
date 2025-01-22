'use client';

import { useAuth } from './context/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import DataViewer from '@/components/dataViewer';

export default function Home() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) {
    return null; // Prevent content flicker during redirection
  }

  return (
    <div className="flex items-center justify-center min-h-screen p-12 font-[family-name:var(--font-geist-sans)] bg-neutral-900">
      <DataViewer />
    </div>
  );
}
