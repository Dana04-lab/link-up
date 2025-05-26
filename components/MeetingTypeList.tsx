'use client';

import React, { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk';
import { useAuth } from '@/app/context/AuthContext';
import { toast } from 'sonner';

import HomeCard from './HomeCard';
import MeetingModal from './MeetingModal';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import ReactDatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

type MeetingState = 'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined;

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useAuth();
  const client = useStreamVideoClient();

  const [meetingState, setMeetingState] = useState<MeetingState>();
  const [callDetails, setCallDetails] = useState<Call>();
  const [values, setValues] = useState({
    dateTime: new Date(),
    description: '',
    link: '',
  });

  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  const handleChange = (field: string, value: string | Date) => {
    setValues((prev) => ({ ...prev, [field]: value }));
  };

  const createMeeting = useCallback(async () => {
    if (!client || !user) return;

    if (!values.dateTime) {
      toast('📅 Күн мен уақытты таңдаңыз', {
        description: 'Кездесуді бастау үшін уақыт пен күн қажет.',
      });
      return;
    }

    try {
      const id = crypto.randomUUID();
      const call = client.call('default', id);
      if (!call) throw new Error('Кездесуді құру сәтсіз аяқталды');

      await call.getOrCreate({
        data: {
          starts_at: values.dateTime.toISOString(),
          custom: { description: values.description || 'Жедел кездесуді бастаңыз' },
        },
      });

      setCallDetails(call);

      toast.success('✅ Кездесу құрылды', {
        description: values.description ? 'Сілтемені бөлісіңіз.' : 'Сіз бірден қосыласыз.',
      });

      if (!values.description && meetingState === 'isInstantMeeting') {
        setTimeout(() => router.push(`/meeting/${call.id}`), 500);
      }
    } catch (error) {
      console.error('❌ Қате:', error);
      toast.error('Қате орын алды', { description: 'Кездесуді бастау сәтсіз аяқталды.' });
    }
  }, [client, user, values, meetingState, router]);

  const renderModals = () => (
    <>
      {/* Schedule Meeting */}
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Жиналыс Құру"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-5">
            {/* Description */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-white">Сипаттама қосыңыз</label>
              <Textarea
                className="min-h-[90px] bg-[#1C1F2E] text-white border border-gray-700 rounded-md focus-visible:ring-0 focus-visible:ring-offset-0"
                placeholder="Кездесу сипаттамасы..."
                onChange={(e) => handleChange('description', e.target.value)}
              />
            </div>

            {/* DateTime Picker */}
            <div className="flex flex-col gap-2">
              <label className="text-base text-sky-300">Күн мен Уақытты таңдаңыз</label>
              <ReactDatePicker
                selected={values.dateTime}
                onChange={(date) => handleChange('dateTime', date!)}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="w-full px-4 py-2 bg-[#1C1F2E] text-white border border-gray-600 rounded-md focus:outline-none"
                calendarClassName="react-datepicker" // ✅ classic style
                popperClassName="z-[9999]"
              />
            </div>
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === 'isScheduleMeeting'}
          onClose={() => setMeetingState(undefined)}
          title="Кездесу жоспарланды"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success('📎 Сілтеме көшірілді', {
              description: 'Сілтеме буферге сақталды.',
            });
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Сілтемені көшіру"
        />
      )}

      {/* Instant Meeting */}
      <MeetingModal
        isOpen={meetingState === 'isInstantMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Жедел кездесуді бастаңыз"
        className="text-center"
        buttonText="Бастау"
        handleClick={createMeeting}
      />

      {/* Join via Link */}
      <MeetingModal
        isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Сілтемені енгізіңіз"
        className="text-center"
        buttonText="Қосылу"
        handleClick={() => router.push(values.link)}
      >
        <Input
          placeholder="https://..."
          className="border-none bg-[#252A41] text-white focus-visible:ring-0 focus-visible:ring-offset-0"
          onChange={(e) => handleChange('link', e.target.value)}
        />
      </MeetingModal>
    </>
  );

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="Жаңа Кездесу"
        description="Жедел кездесуді бастаңыз"
        handleClick={() => setMeetingState('isInstantMeeting')}
        className="bg-pink-300"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="Кездесу Кестесі"
        description="Кездесуді жоспарлаңыз"
        handleClick={() => setMeetingState('isScheduleMeeting')}
        className="bg-purple-400"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="Жазбаларды Қарау"
        description="Жазбаларыңызды қарап шығыңыз"
        handleClick={() => router.push('/recordings')}
        className="bg-amber-200"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="Бірлескен Отырыс"
        description="Шақыру сілтемесі арқылы"
        handleClick={() => setMeetingState('isJoiningMeeting')}
        className="bg-blue-300"
      />

      {renderModals()}
    </section>
  );
};

export default MeetingTypeList;
