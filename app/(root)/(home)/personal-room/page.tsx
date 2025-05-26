'use client';

import { Button } from '@/components/ui/button';

import { useAuth } from '@/app/context/AuthContext';
import { useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from "sonner";
import useGetCallById from '@/hooks/useGetCallByid';


const InfoCard = ({ title, value }: { title: string; value: string }) => (
  <div className="rounded-2xl bg-[#1C1F2E] p-4 shadow-md border border-[#2A2E3F] w-full">
    <p className="text-sm text-gray-400">{title}</p>
    <p className="text-lg font-semibold text-white truncate">{value}</p>
  </div>
);

const PersonalRoom = () => {
  const { user } = useAuth();
  const meetingId = user?.uid;
  const client = useStreamVideoClient();
  const router = useRouter();

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meetingId}?personal=true`;
  const { call } = useGetCallById(meetingId!);

  const startRoom = async () => {
    if (!client || !user) return;

    if (!call) {
      const newCall = client.call('default', meetingId!);
      await newCall.getOrCreate({
        data: {
          starts_at: new Date().toISOString(),
        },
      });
    }

    router.push(`/meeting/${meetingId}?personal=true`);
  };

  return (
    <section className="flex flex-col gap-10 p-6 text-white max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold">Жеке бөлме</h1>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <InfoCard title="Тақырып" value={`${user?.displayName || user?.email}'s Конференц-зал`} />
        <InfoCard title="Кездесу ID" value={meetingId!} />
        <InfoCard title="Шақыру Сілтемесі" value={meetingLink} />
      </div>

      <div className="flex flex-wrap gap-4 pt-4">
        <Button className="bg-blue-600 text-white hover:bg-blue-700" onClick={startRoom}>
          Кездесуді Бастау
        </Button>
        <Button
          className="bg-[#2A2E3F] text-white hover:bg-[#374151]"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('Сілтеме көшірілді!');
          }}
        >
          Шақыру Сілтемесін Көшіру
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
