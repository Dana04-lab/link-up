'use client';

import { useCall, useCallStateHooks } from '@stream-io/video-react-sdk';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Button } from './ui/button';
import { toast } from 'sonner';

const EndCallButton = () => {
  const call = useCall();
  const router = useRouter();
  const { useLocalParticipant } = useCallStateHooks();
  const localParticipant = useLocalParticipant();

  const [loading, setLoading] = useState(false);

  const isMeetingOwner = Boolean(
    localParticipant?.userId &&
    call?.state.createdBy?.id &&
    localParticipant.userId === call.state.createdBy.id
  );

  if (!isMeetingOwner) return <></>;

  const handleEndCall = async () => {
    try {
      if (!call) {
        toast.error('Қоңырау анықталмады');
        return;
      }

      setLoading(true);
      await call.endCall();
      toast.success('Қоңырау аяқталды');
      router.push('/');
    } catch (err) {
      console.error('❌ Қоңырауды аяқтау қатесі:', err);
      toast.error('Қоңырауды аяқтау сәтсіз аяқталды');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      onClick={handleEndCall}
      aria-label="Кездесуді аяқтау"
      title="Кездесуді толық аяқтау"
      className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded"
      disabled={loading}
    >
      {loading ? 'Аяқталуда...' : 'Аяқтау'}
    </Button>
  );
};

export default EndCallButton;
