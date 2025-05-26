'use client';

import Image from 'next/image';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { avatarImages } from '@/constants';

interface MeetingCardProps {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon1?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;
}

const MeetingCard = ({
  icon,
  title,
  date,
  isPreviousMeeting = false,
  buttonIcon1,
  handleClick,
  link,
  buttonText = 'Бастау',
}: MeetingCardProps) => {
  const maxAvatars = 3;
  const extraCount = avatarImages.length - maxAvatars;

  return (
    <section className="flex min-h-[240px] w-full flex-col justify-between rounded-xl bg-[#1C1F2E] px-6 py-6 text-white shadow-md xl:max-w-[568px]">
      
      {/* Top: Icon + Title + Date */}
      <div className="flex flex-col gap-4">
        <Image src={icon} alt="Кездесу иконкасы" width={28} height={28} />
        <div className="flex flex-col gap-2">
          <h1 className="text-xl font-bold">{title}</h1>
          <p className="text-sm text-gray-400">{date}</p>
        </div>
      </div>

      {/* Middle: Avatars */}
      <div className="mt-4 flex items-center">
        <div className="relative flex items-center">
          {avatarImages.slice(0, maxAvatars).map((img, index) => (
            <Image
              key={index}
              src={img}
              alt={`Қатысушы ${index + 1}`}
              width={36}
              height={36}
              className="rounded-full border-2 border-[#1C1F2E] -ml-2 first:ml-0 z-10"
            />
          ))}
          {extraCount > 0 && (
            <div className="flex items-center justify-center w-9 h-9 rounded-full bg-[#2F374E] text-sm border-2 border-[#1C1F2E] -ml-2 z-0">
              +{extraCount}
            </div>
          )}
        </div>
      </div>

      {/* Bottom: Buttons */}
      {!isPreviousMeeting && (
        <div className="mt-5 flex gap-3">
          <Button
            onClick={handleClick}
            className="flex items-center gap-2 rounded-md bg-blue-600 hover:bg-blue-700 px-5 py-2 text-sm text-white transition"
          >
            {buttonIcon1 && (
              <Image src={buttonIcon1} alt="Батырма иконкасы" width={18} height={18} />
            )}
            {buttonText}
          </Button>

          <Button
            onClick={async () => {
              try {
                await navigator.clipboard.writeText(link);
                toast.success('📋 Сілтеме көшірілді!');
              } catch {
                toast.error('❌ Сілтемені көшіру сәтсіз аяқталды');
              }
            }}
            className="flex items-center gap-2 rounded-md bg-[#2F374E] hover:bg-[#3B4363] px-5 py-2 text-sm text-white transition"
          >
            <Image src="/icons/copy.svg" alt="Көшіру иконкасы" width={18} height={18} />
            Сілтемені Көшіру
          </Button>
        </div>
      )}
    </section>
  );
};

export default MeetingCard;
