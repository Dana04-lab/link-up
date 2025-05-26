'use client';

import React, { useState, useEffect, useRef } from 'react';
import { BsEmojiSmile, BsImage, BsThreeDotsVertical } from 'react-icons/bs';
import dynamic from 'next/dynamic';
import {
  sendTextMessage,
  uploadFile,
  listenToSavedItems,
  deleteSavedItem,
} from '@/lib/upload';
import { useAuth } from '@/app/context/AuthContext';

const Picker = dynamic(() => import('emoji-picker-react'), { ssr: false });

interface MessageItem {
  id: string;
  text: string;
}

interface SavedToolsProps {
  setActiveTool: (val: string | null) => void;
}

const SavedTools: React.FC<SavedToolsProps> = ({ setActiveTool }) => {
  const { user } = useAuth();
  const userId = user?.uid;

  const [message, setMessage] = useState('');
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState<MessageItem[]>([]);
  const [dropdownOpenId, setDropdownOpenId] = useState<string | null>(null);
  const [replyTo, setReplyTo] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!userId) return;

    const unsubscribe = listenToSavedItems(userId, (items) => {
      const formatted = items.map((item) => ({
        id: item.id,
        text: item.content || item.name || 'Файл',
      }));
      setMessages(formatted);
    });

    return () => unsubscribe();
  }, [userId]);

  const handleEmojiClick = (emojiData: any) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  const handleSendText = async () => {
    if (!userId || !message.trim()) return;
    const finalMessage = replyTo ? `↩️ ${replyTo}\n${message}` : message;

    try {
      await sendTextMessage(finalMessage, userId);
      setMessage('');
      setReplyTo(null);
    } catch (error) {
      console.error('Хабарлама жіберу қатесі:', error);
    }
  };

  const handlePhotoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;

    try {
      const result = await uploadFile(file, userId, 'image');
      const formatted = `🖼️ [${result.name}](${result.url})`;
      await sendTextMessage(formatted, userId);
    } catch (err) {
      console.error('Сурет жүктеу қатесі:', err);
    }
  };

  const handleDropdownAction = async (action: string, item: MessageItem) => {
    setDropdownOpenId(null);
    switch (action.trim()) {
      case 'reply':
        setReplyTo(item.text);
        break;
      case 'edit':
        setMessage(item.text);
        await deleteSavedItem(item.id);
        break;
      case 'copy':
        await navigator.clipboard.writeText(item.text);
        break;
      case 'delete':
        await deleteSavedItem(item.id);
        break;
    }
  };

  if (!userId) {
    return (
      <div className="p-6 text-red-500">
        ⚠️ Бұл бетті пайдалану үшін алдымен жүйеге кіруіңіз керек.
      </div>
    );
  }

  return (
    <div className="p-6 border rounded-md bg-white shadow w-full max-w-3xl mx-auto min-h-[500px]">
      <button
        onClick={() => setActiveTool(null)}
        className="mb-4 text-blue-600 hover:underline"
      >
        ← Артқа
      </button>

      <h3 className="text-2xl font-bold mb-4 text-black">Сақталғандар</h3>

      <p className="text-sm text-gray-600 mb-2">
        Сіз →{' '}
        <span className="font-medium text-gray-900">
          {user?.displayName || 'Қолданушы'}
        </span>
      </p>

      {replyTo && (
        <div className="text-sm text-blue-600 mb-2">
          Жауап беру: <span className="font-semibold">{replyTo}</span>
        </div>
      )}

      <div className="flex items-center gap-3 mb-2">
        <button onClick={() => setShowEmoji(!showEmoji)} title="Эмодзи">
          <BsEmojiSmile className="text-xl text-gray-700" />
        </button>

        <label>
          <BsImage className="text-xl text-gray-700 cursor-pointer" />
          <input
            type="file"
            accept="image/*"
            hidden
            ref={imageInputRef}
            onChange={handlePhotoChange}
          />
        </label>
      </div>

      {showEmoji && (
        <div className="mb-2">
          <Picker onEmojiClick={handleEmojiClick} />
        </div>
      )}

      <div className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Хабарлама жазу..."
          className="flex-1 p-3 border rounded-md text-black"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={handleSendText}
          className="px-5 py-3 bg-blue-600 text-white rounded-md"
        >
          Жіберу
        </button>
      </div>

      <div className="space-y-4">
        {messages.map((item) => (
          <div
            key={item.id}
            className="relative group border p-3 rounded-md bg-gray-100 hover:bg-gray-50"
          >
            <p className="text-black whitespace-pre-line">{item.text}</p>
            <button
              onClick={() =>
                setDropdownOpenId(dropdownOpenId === item.id ? null : item.id)
              }
              className="absolute right-3 top-3 text-gray-500 hover:text-black"
            >
              <BsThreeDotsVertical />
            </button>
            {dropdownOpenId === item.id && (
              <div className="absolute right-3 top-9 z-10 w-48 bg-white border rounded-md shadow-md">
                {[
                  ['reply', 'Жауап беру'],
                  ['copy', 'Көшіру'],
                  ['delete', 'Өшіру'],
                ].map(([action, label]) => (
                  <button
                    key={action}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDropdownAction(action, item);
                    }}
                    className="block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 text-black"
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SavedTools;
