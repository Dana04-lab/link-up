'use client';

import { useRouter } from 'next/navigation';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useState } from 'react';
import { toast } from 'sonner';

interface MeetingValues {
  dateTime: Date;
  description: string;
}

const useCreateMeeting = (userId: string, values: MeetingValues) => {
  const router = useRouter();
  const client = useStreamVideoClient();
  const [callDetails, setCallDetails] = useState<Call | null>(null);

  const createMeeting = async () => {
    if (!client || !userId) {
      toast.error('Клиент немесе қолданушы ID жоқ');
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);

      if (!call) throw new Error('Кездесу құру сәтсіз аяқталды');

      const startsAt = values.dateTime?.toISOString() || new Date().toISOString();
      const description = values.description || 'Жедел кездесу';

      await call.getOrCreate({
        data: {
          starts_at: startsAt,
          custom: {
            description,
          },
        },
      });

      setCallDetails(call);
      toast.success('✅ Кездесу сәтті құрылды');

      if (!values.description) {
        setTimeout(() => {
          router.push(`/meeting/${call.id}`);
        }, 500);
      }
    } catch (error) {
      console.error('❌ createMeeting қатесі:', error);
      toast.error('Кездесуді құру сәтсіз аяқталды');
    }
  };

  return { createMeeting, callDetails };
};

export default useCreateMeeting;
