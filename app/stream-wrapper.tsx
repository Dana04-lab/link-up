'use client';

import { useAuth } from './context/AuthContext';
import { Toaster } from 'sonner';
import dynamic from 'next/dynamic';

// 👇 StreamClientProvider-ді dynamic түрде жүктеу
const StreamClientProvider = dynamic(() => import('../providers/StreamClientProvider'), {
  ssr: false,
});

export default function StreamWrapper({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) return null;

  return user ? (
    <StreamClientProvider>
      {children}
      <Toaster position="top-center" richColors />
    </StreamClientProvider>
  ) : (
    <>
      {children}
      <Toaster position="top-center" richColors />
    </>
  );
}
