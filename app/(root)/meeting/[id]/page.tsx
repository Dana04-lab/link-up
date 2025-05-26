// app/(meeting)/meeting/[id]/page.tsx

'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import { StreamCall, StreamTheme } from '@stream-io/video-react-sdk';

import Loader from '@/components/Loader';
import MeetingSetup from '@/components/MeetingSetup';
import MeetingRoom from '@/components/MeetingRoom';
import useGetCallById from '@/hooks/useGetCallByid';

const Meeting = () => {
  const params = useParams();
  const id = params?.id as string;
  const { user, isLoaded } = useAuth();
  const [isSetupComplete, setIsSetupComplete] = useState(false);
  const { call, isLoading } = useGetCallById(id);

  if (!isLoaded || isLoading) return <Loader />;
  if (!user || !call) return <p className="text-white text-center mt-10">Кездесу табылмады</p>;

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {!isSetupComplete ? (
            <MeetingSetup setIsSetupComplete={setIsSetupComplete} />
          ) : (
            <MeetingRoom />
          )}
        </StreamTheme>
      </StreamCall>
    </main>
  );
};

export default Meeting;
