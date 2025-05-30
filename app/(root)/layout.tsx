'use client';

import { useAuth } from '@/app/context/AuthContext';
import Navbar from '@/components/Navbar';
import Sidebar from '@/components/Sidebar';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoaded } = useAuth();

  if (!isLoaded) return null; // Тексеріп жатқанда ештеңе көрсетпе
  if (!user) return null; // Логин жасалмаған болса, Navbar, Sidebar көрсетпе

  return (
    <main className="relative">
      <Navbar />
      <div className="flex">
        <Sidebar />
        <section className="flex min-h-screen flex-1 flex-col px-6 pb-6 pt-28 max-md:pb-14 sm:px-14">
          <div className="w-full">{children}</div>
        </section>
      </div>
    </main>
  );
}
