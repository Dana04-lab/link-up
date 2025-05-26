'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from '@/components/ui/sheet';
import { sidebarLinks } from '@/constants';
import { cn } from '@/lib/utils';

const MobileNav = () => {
  const pathname = usePathname();

  return (
    <section className="w-full max-w-[264px] sm:hidden">
      <Sheet>
        <SheetTrigger asChild>
          <Image
            src="/icons/hamburger.svg"
            width={36}
            height={36}
            alt="Мәзір ашу"
            className="cursor-pointer"
          />
        </SheetTrigger>

        <SheetContent side="left" className="border-none bg-[#161925] text-white">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 pt-4">
            <Image src="/icons/logo.svg" width={32} height={32} alt="yoom logo" />
            <span className="text-2xl font-extrabold">Link-up</span>
          </Link>

          {/* Навигация */}
          <nav className="flex flex-col gap-4 mt-10">
            {sidebarLinks.map((link) => {
              const isActive = pathname === link.route;

              return (
                <SheetClose asChild key={link.route}>
                  <Link
                    href={link.route}
                    className={cn(
                      'flex items-center gap-3 p-3 rounded-lg transition-colors',
                      isActive
                        ? 'bg-blue-500 text-white'
                        : 'hover:bg-blue-900/30'
                    )}
                  >
                    <Image
                      src={link.imgUrl}
                      alt={link.label}
                      width={20}
                      height={20}
                    />
                    <span className="font-medium">{link.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </nav>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
