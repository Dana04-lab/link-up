'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/app/firebase';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <nav className="fixed w-full bg-[#1C1F2E] px-6 py-4 lg:px-10 shadow-lg z-50 flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin" />
      </nav>
    );
  }

  const displayName = user?.displayName || user?.email?.split('@')[0] || 'Қолданушы';

  const handleLogout = async () => {
    await signOut(auth);
    window.location.href = '/sign-in';
  };

  return (
    <nav className="fixed top-0 z-50 w-full flex justify-between items-center bg-[#1C1F2E] px-6 py-4 lg:px-10 shadow-lg">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/icons/logo.svg"
          width={32}
          height={32}
          alt="LinkUp logo"
          className="rounded-full"
        />
        <span className="text-2xl font-extrabold text-white max-sm:hidden">LinkUp</span>
      </Link>

      {/* Right side */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
              {user.photoURL ? (
                <Image
                  src={user.photoURL}
                  width={36}
                  height={36}
                  alt="User avatar"
                  className="rounded-full"
                />
              ) : (
                <div className="w-9 h-9 rounded-full bg-blue-500 text-white flex items-center justify-center text-sm font-bold">
                  {displayName.charAt(0).toUpperCase()}
                </div>
              )}
            </button>

            {/* Dropdown menu */}
            {menuOpen && (
              <div className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-lg p-4 z-50 text-black border border-gray-200">
                <p className="text-sm font-bold truncate">{displayName}</p>
                <p className="text-xs text-gray-500 mb-4 truncate">{user.email}</p>
                <hr className="border-gray-300 my-2" />
                <Link href="/account" className="block text-sm hover:underline">
                  Профиль
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left text-red-500 hover:text-red-600 mt-2 text-sm"
                >
                  Шығу
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link
            href="/sign-in"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-600 transition"
          >
            Кіру
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
