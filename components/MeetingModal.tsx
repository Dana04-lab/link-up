'use client';

import React, { ReactNode } from 'react';
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from '@/components/ui/dialog';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  handleClick?: () => void;
  buttonText?: string;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  onClose,
  title,
  className,
  children,
  handleClick,
  buttonText = 'Кездесу кестесі',
  image,
  buttonIcon,
}: MeetingModalProps) => {
  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) onClose();
      }}
    >
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 bg-[#161925] px-6 py-9 text-white border-none">
        <div className="flex flex-col gap-6">
          {image && (
            <div className="flex justify-center">
              <Image
                src={image}
                alt="modal image"
                width={72}
                height={72}
                unoptimized
              />
            </div>
          )}

          <DialogTitle asChild>
            <h1 className={cn('text-3xl font-bold text-center', className)}>
              {title}
            </h1>
          </DialogTitle>

          {children}

          {handleClick && (
            <Button
              type="button"
              onClick={() => {
                try {
                  console.log('✅ Modal Button Clicked');
                  handleClick();
                } catch (err) {
                  console.error('❌ handleClick error:', err);
                }
              }}
              className="bg-blue-500 hover:bg-blue-600"
            >
              {buttonIcon && (
                <Image
                  src={buttonIcon}
                  alt="button icon"
                  width={13}
                  height={13}
                  className="mr-2"
                  unoptimized
                />
              )}
              {buttonText}
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
