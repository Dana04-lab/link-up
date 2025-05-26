'use client';

import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useEffect, useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';

export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const client = useStreamVideoClient();
  const { user } = useAuth();

  useEffect(() => {
    const loadCalls = async () => {
      if (!client || !user?.uid) {
        console.warn('⚠️ Client немесе user дайын емес');
        setIsLoading(false);
        return;
      }

      try {
        const result = await client.queryCalls({
          sort: [{ field: 'starts_at', direction: -1 }],
          filter_conditions: {
            'created_by.id': user.uid, // ✅ тек өзінің құрғандары
          },
        });

        console.log('✅ Барлық қоңыраулар:', result.calls);
        setCalls(result.calls);
      } catch (error) {
        console.error('❌ Қоңырауларды жүктеу қатесі:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadCalls();
  }, [client, user?.uid]);

  const now = new Date();

  const endedCalls = calls.filter((call) => {
    const endedAt = call.state?.endedAt;
    const startsAt = call.state?.startsAt;
    return (
      (startsAt && new Date(startsAt) < now && endedAt !== undefined) ||
      (!!endedAt && new Date(endedAt) < now)
    );
  });

  const upcomingCalls = calls.filter((call) => {
    const startsAt = call.state?.startsAt;
    return startsAt ? new Date(startsAt) > now : false;
  });

  const callRecordings = calls.filter((call) => {
    return !!call.state?.endedAt;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings,
    isLoading,
  };
};
