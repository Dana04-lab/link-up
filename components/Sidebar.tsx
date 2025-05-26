'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils';
import { sidebarLinks } from '@/constants';
import { useAuth } from '@/app/context/AuthContext';

const Sidebar = () => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <section className="sticky left-0 top-0 flex h-screen w-fit flex-col justify-between bg-[#1C1F2E] p-6 pt-28 text-white max-sm:hidden lg:w-[264px] shadow-xl">
      {/* 🔹 Навигация элементтері */}
      <div className="flex flex-1 flex-col gap-3">
      {sidebarLinks.map((item) => {
  const isActive = pathname === item.route || pathname.startsWith(`${item.route}/`);
  
  return (
    <Link
      href={item.route}
      key={item.label}
      className={cn(
        'flex items-center gap-4 rounded-xl px-4 py-3 transition-all duration-200 hover:bg-[#2A2E3F] group',
        {
          'bg-gradient-to-r from-blue-600 to-blue-400 shadow-md': isActive,
        }
      )}
    >
      <Image
        src={item.imgUrl}
        alt={item.label}
        width={24}
        height={24}
        className={cn('transition-transform duration-300 group-hover:scale-110', {
          'brightness-150': isActive,
        })}
      />
      <p className={cn('text-base font-medium max-lg:hidden transition-all duration-200', {
        'text-white': isActive,
        'text-gray-300 group-hover:text-white': !isActive,
      })}>
        {item.label}
      </p>
    </Link>
  );
})}
      </div>

      {/* 🔻 Қолданушы ақпараты төменде */}
      {user && (
        <div className="mt-10 border-t border-gray-700 pt-4">
          <div className="flex items-center gap-3">
            {user.photoURL && (
              <Image
                src={user.photoURL}
                alt="User Avatar"
                width={32}
                height={32}
                className="rounded-full"
              />
            )}
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-white">
                {user.displayName || 'Қолданушы'}
              </span>
              <span className="text-xs text-gray-400">{user.email}</span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Sidebar;
