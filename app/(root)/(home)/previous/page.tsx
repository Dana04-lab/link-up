'use client';

import React from 'react';
import CallList from '@/components/CallList';

const Previous = () => {
  return (
    <section className="flex size-full flex-col gap-10 text-white p-6">
      <h1 className="text-3xl font-bold">Алдыңғы кездесулер</h1>
      <CallList type="ended" />
    </section>
  );
};

export default Previous;
