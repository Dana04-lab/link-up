'use client';

import { cn } from '@/lib/utils';
import Image from 'next/image';
import React from 'react';

interface HomeCardProps {
  className?: string;
  img: string;
  title: string;
  description: string;
  handleClick: () => void;
}

const HomeCard = ({
  className = '',
  img,
  title,
  description,
  handleClick,
}: HomeCardProps) => {
  return (
    <button
      onClick={handleClick}
      className={cn(
        'px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-[14px] cursor-pointer transition duration-300 hover:shadow-lg hover:scale-[1.02] bg-[#1c1c24] text-left focus:outline-none',
        className
      )}
    >
      <div className="flex justify-center items-center bg-white/10 backdrop-blur-md size-12 rounded-[10px]">
        <Image src={img} alt={`${title} icon`} width={27} height={27} />
      </div>
      <div className="flex flex-col gap-2 mt-4 text-white">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-base font-normal">{description}</p>
      </div>
    </button>
  );
};

export default HomeCard;
