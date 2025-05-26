'use client';

import { useEffect, useState } from 'react';
import { useStreamVideoClient, Call } from '@stream-io/video-react-sdk';

const useGetCallById = (id: string) => {
  const client = useStreamVideoClient();
  const [call, setCall] = useState<Call | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!client || !id || typeof id !== 'string') {
      console.warn('❗ client немесе id дұрыс емес');
      return;
    }

    const fetchCall = async () => {
      setIsLoading(true);
      try {
        const callInstance = client.call('default', id);
        await callInstance.get(); // Бұл жерде call серверден нақты тартылады
        setCall(callInstance);
      } catch (error) {
        console.error('❌ callInstance.get() қатесі:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCall();
  }, [client, id]);

  return { call, isLoading };
};

export default useGetCallById;
