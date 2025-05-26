'use client';

import React, { useState, useEffect } from 'react';
import {
  Bell,
  CalendarClock,
  Trash2,
  CheckCircle,
  Clock,
  ArrowLeft,
} from 'lucide-react';

interface Reminder {
  id: string;
  text: string;
  date: string;
  done: boolean;
}

interface RemindersToolProps {
  setActiveTool: (val: string | null) => void;
}

const RemindersTool: React.FC<RemindersToolProps> = ({ setActiveTool }) => {
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [text, setText] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('reminders');
    if (stored) {
      setReminders(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('reminders', JSON.stringify(reminders));
  }, [reminders]);

  useEffect(() => {
    const now = new Date().getTime();
    const recentReminders = reminders.filter((rem) => {
      const diff = now - new Date(rem.date).getTime();
      return diff < 1000 * 60 * 60 * 24 * 30;
    });
    if (recentReminders.length !== reminders.length) {
      setReminders(recentReminders);
    }
  }, []);

  const handleAdd = () => {
    if (!text.trim() || !date) return;
    const newReminder: Reminder = {
      id: crypto.randomUUID(),
      text,
      date,
      done: false,
    };
    setReminders((prev) => [...prev, newReminder]);
    setText('');
    setDate('');
  };

  const toggleDone = (id: string) => {
    setReminders((prev) =>
      prev.map((rem) =>
        rem.id === id ? { ...rem, done: !rem.done } : rem
      )
    );
  };

  const handleRemove = (id: string) => {
    setReminders((prev) => prev.filter((rem) => rem.id !== id));
  };

  return (
    <div className="p-6 min-h-screen bg-[#1C1F2E] text-white">
      <button
        onClick={() => setActiveTool(null)}
        className="mb-4 flex items-center gap-2 text-blue-400 hover:underline"
      >
        <ArrowLeft size={18} /> Артқа
      </button>

      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <Bell className="text-yellow-400" />
        Еске салулар
      </h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-6">
        <input
          type="text"
          placeholder="Мәтін..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="flex-1 border border-gray-600 p-2 rounded bg-transparent text-white placeholder-gray-400"
        />
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border border-gray-600 p-2 rounded text-white bg-transparent"
        />
        <button
          onClick={handleAdd}
          className="bg-gradient-to-r from-blue-600 to-purple-500 px-4 rounded text-white hover:scale-105 transition"
        >
          Қосу
        </button>
      </div>

      {reminders.length === 0 ? (
        <p className="text-gray-400">Еске салулар жоқ.</p>
      ) : (
        <ul className="space-y-4">
          {reminders.map((rem) => (
            <li
              key={rem.id}
              className={`border border-gray-600 p-4 rounded-xl shadow-md flex justify-between items-center transition-all hover:shadow-lg ${
                rem.done ? 'bg-green-900' : 'bg-zinc-900'
              }`}
            >
              <div>
                <p
                  className={`font-medium text-lg ${
                    rem.done ? 'line-through text-gray-400' : 'text-white'
                  }`}
                >
                  {rem.text}
                </p>
                <p className="text-sm text-gray-400 flex items-center gap-1 mt-1">
                  <CalendarClock size={14} />{' '}
                  {new Date(rem.date).toLocaleString('kk-KZ', {
                    day: '2-digit',
                    month: 'long',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <button onClick={() => toggleDone(rem.id)} title="Аяқталды">
                  {rem.done ? (
                    <CheckCircle className="text-green-400" />
                  ) : (
                    <Clock className="text-yellow-400" />
                  )}
                </button>
                <button onClick={() => handleRemove(rem.id)} title="Жою">
                  <Trash2 className="text-red-500" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RemindersTool;
