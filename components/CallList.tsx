// @ts-nocheck

'use client';

import { useGetCalls } from '@/hooks/useGetCalls';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import MeetingCard from './MeetingCard';
import { Call } from '@stream-io/video-react-sdk';
import Loader from './Loader';

type CallRecordings = {
  id: string;
  title: string;
  url: string;
  createdAt: string;
};

interface CallListProps {
  type: 'ended' | 'upcoming' | 'recordings';
}

function isCall(meeting: Call | CallRecordings): meeting is Call {
  return (meeting as Call).state !== undefined;
}

const CallList = ({ type }: CallListProps) => {
  const { endedCalls, upcomingCalls, callRecordings, isLoading } = useGetCalls();
  const router = useRouter();

  const [recordings, setRecordings] = useState<CallRecordings[]>([]);

  const getCalls = () => {
    switch (type) {
      case 'ended':
        return endedCalls;
      case 'recordings':
        return recordings;
      case 'upcoming':
        return upcomingCalls;
      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case 'ended':
        return 'Алдыңғы Қоңыраулар Жоқ';
      case 'recordings':
        return 'Жазбалар Жоқ';
      case 'upcoming':
        return 'Алдағы Қоңыраулар Жоқ';
      default:
        return '';
    }
  };

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(
          callRecordings.map((meeting) => meeting.queryRecordings())
        );

        const recordings = callData
          .filter((call) => call.recordings.length > 0)
          .map((call) => call.recordings)
          .flat();

        setRecordings(recordings);
      } catch (error) {
        console.error('❌ Қатені жазу кезінде:', error);
        toast.error('Жазбаларды жүктеу қатесі');
      }
    };

    if (type === 'recordings') {
      fetchRecordings();
    }
  }, [type, callRecordings]);

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if (isLoading) return <Loader />;

  const icon = type === 'ended'
    ? '/icons/previous.svg'
    : type === 'upcoming'
    ? '/icons/upcoming.svg'
    : '/icons/recordings.svg';

  const buttonText = type === 'recordings' ? 'Қосу' : 'Бастау';
  const buttonIcon1 = type === 'recordings' ? '/icons/play.svg' : undefined;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting, index) => {
          const id = isCall(meeting) ? meeting.id : meeting.id;
          const title = isCall(meeting)
            ? meeting.state?.custom?.description?.substring(0, 26) || 'Жеке Кездесу'
            : meeting.title?.substring(0, 26) || 'No description';
          const date = isCall(meeting)
            ? new Date(meeting.state?.startsAt).toLocaleString()
            : new Date(meeting.createdAt).toLocaleString();
          const link = isCall(meeting)
            ? `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`
            : meeting.url;

          return (
            <MeetingCard
              key={id || index}
              icon={icon}
              title={title}
              date={date}
              isPreviousMeeting={type === 'ended'}
              buttonIcon1={buttonIcon1}
              buttonText={buttonText}
              handleClick={() => router.push(link)}
              link={link}
            />
          );
        })
      ) : (
        <h1 className="text-white text-lg">{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
