'use client';

import Image from 'next/image';
import React from 'react';

const Loader = () => {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-[#161925]">
      <div className="relative flex flex-col items-center gap-2">
        <div className="animate-spin duration-1000">
          <Image 
            src="/icons/loading-circle.svg"
            alt="Loading spinner"
            width={50}
            height={50}
            unoptimized
            aria-hidden="true"
          />
        </div>
        <span className="sr-only">Жүктелуде...</span>
      </div>
    </div>
  );
};

export default Loader;
