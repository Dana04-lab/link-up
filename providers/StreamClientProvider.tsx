'use client';

import React, { useEffect, useState } from 'react';
import { StreamVideoClient, StreamVideoProvider } from '@stream-io/video-react-sdk';

import { useAuth } from '@/app/context/AuthContext';
import { tokenProvider } from '@/utils/tokenProvider';


const StreamClientProvider = ({ children }: { children: React.ReactNode }) => {
  const { user, isLoaded } = useAuth();
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const init = async () => {
      if (!user || !isLoaded) return;

      try {
        console.log('👤 user.uid:', user.uid);

        const token = await tokenProvider(user.uid);
        console.log('🔐 Токен алынды:', token);

        const newClient = new StreamVideoClient({
          apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY!,
          user: {
            id: user.uid,
            name: user.displayName || 'Қатысушы',
          },
          token,
        });

        console.log('📡 Stream клиент дайын');
        setClient(newClient);
        setIsReady(true);
      } catch (error) {
        console.error('❌ Stream client құрылмады:', error);
      }
    };

    init();
  }, [user, isLoaded]);

  // Егер client дайын болмаса, children көрсетуге болмайды
  if (!isReady || !client) return null;

  return <StreamVideoProvider client={client}>{children}</StreamVideoProvider>;
};

export default StreamClientProvider;
