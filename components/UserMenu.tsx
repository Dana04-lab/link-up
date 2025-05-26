'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { signOut } from 'firebase/auth';
import Image from 'next/image';
import { useAuth } from '@/app/context/AuthContext';
import { auth } from '@/app/firebase';

const UserMenu = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const router = useRouter();

  if (!user) return null;

  const displayName = user.displayName || user.email?.split('@')[0] || 'Қолданушы';
  const email = user.email || '';

  const handleSignOut = async () => {
    await signOut(auth);
    router.push('/sign-in');
  };

  return (
    <div className="relative">
      {/* Аватар немесе инициал */}
      <button onClick={() => setOpen(!open)} className="flex items-center gap-2">
        {user.photoURL ? (
          <Image
            src={user.photoURL}
            width={36}
            height={36}
            alt="avatar"
            className="rounded-full"
          />
        ) : (
          <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm font-bold">
            {displayName.charAt(0).toUpperCase()}
          </div>
        )}
      </button>

      {/* Ашылған мәзір */}
      {open && (
        <div className="absolute right-0 mt-3 w-64 bg-white text-black rounded-xl shadow-lg z-50 border border-gray-300">
          <div className="px-4 py-3">
            <p className="text-sm font-bold truncate">{displayName}</p>
            <p className="text-xs text-gray-500 truncate">{email}</p>
          </div>
          <hr className="border-gray-300" />
          <div className="flex flex-col px-4 py-2 gap-2">
            <button
              onClick={() => {
                setOpen(false);
                router.push('/account');
              }}
              className="text-sm hover:underline text-left"
            >
              Профиль
            </button>
            <button
              onClick={handleSignOut}
              className="text-sm text-red-500 hover:text-red-600 text-left"
            >
              Шығу
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
