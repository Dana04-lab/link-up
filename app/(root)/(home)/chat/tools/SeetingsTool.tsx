'use client';

import React, { useEffect, useState } from 'react';
import { ArrowLeft } from 'lucide-react';

interface Props {
  setActiveTool: (val: string | null) => void;
}

const SettingsTool: React.FC<Props> = ({ setActiveTool }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [language, setLanguage] = useState('kz');
  const [remindersEnabled, setRemindersEnabled] = useState(true);
  const [reminderTime, setReminderTime] = useState('09:00');
  const [themeColor, setThemeColor] = useState('purple');
  const [streakCount, setStreakCount] = useState(0);
  const [saveMessage, setSaveMessage] = useState('');

  useEffect(() => {
    setDarkMode(localStorage.getItem('darkMode') === 'true');
    setLanguage(localStorage.getItem('language') || 'kz');
    setRemindersEnabled(localStorage.getItem('reminders') !== 'false');
    setReminderTime(localStorage.getItem('reminderTime') || '09:00');
    setThemeColor(localStorage.getItem('themeColor') || 'purple');
    setStreakCount(Number(localStorage.getItem('streak') || '0'));
  }, []);

  const handleSaveChanges = () => {
    localStorage.setItem('darkMode', darkMode.toString());
    localStorage.setItem('language', language);
    localStorage.setItem('reminders', remindersEnabled.toString());
    localStorage.setItem('reminderTime', reminderTime);
    localStorage.setItem('themeColor', themeColor);

    document.documentElement.classList.toggle('dark', darkMode);
    document.documentElement.style.setProperty('--theme-color', themeColor);

    setSaveMessage('✅ Өзгерістер сақталды!');
    setTimeout(() => setSaveMessage(''), 3000);
  };

  const handleClearData = () => {
    if (confirm('Барлық сақталған деректерді өшіргіңіз келе ме?')) {
      localStorage.clear();
      location.reload();
    }
  };

  return (
    <div className="p-6 text-white min-h-screen">
      {/* 🔙 Артқа батырмасы */}
      <button
        onClick={() => setActiveTool(null)}
        className="text-blue-400 hover:underline mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Артқа
      </button>

      <h2 className="text-3xl font-bold mb-6">⚙️ Баптаулар</h2>

      <div className="space-y-6">

        {/* Dark Mode */}
        <div className="flex items-center justify-between">
          <label htmlFor="darkMode" className="flex items-center gap-2">
            🌙 Қара тақырып (Dark mode)
          </label>
          <input
            id="darkMode"
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Theme Color */}
        <div>
          <label htmlFor="themeColor" className="block mb-1">🎨 Тақырып түсі</label>
          <select
            id="themeColor"
            value={themeColor}
            onChange={(e) => setThemeColor(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white border border-gray-500"
          >
            <option value="purple">🟣 Күлгін</option>
            <option value="blue">🔵 Көк</option>
            <option value="green">🟢 Жасыл</option>
            <option value="pink">🌸 Қызғылт</option>
          </select>
        </div>

        {/* Language */}
        <div>
          <label htmlFor="language" className="block mb-1">
            🌐 Интерфейс тілі
          </label>
          <select
            id="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white border border-gray-500"
          >
            <option value="kz">🇰🇿 Қазақша</option>
            <option value="ru">🇷🇺 Русский</option>
            <option value="en">🇬🇧 English</option>
          </select>
        </div>

        {/* Reminders */}
        <div className="flex items-center justify-between">
          <label htmlFor="reminders" className="flex items-center gap-2">
            🔔 Еске салулар белсенді ме?
          </label>
          <input
            id="reminders"
            type="checkbox"
            checked={remindersEnabled}
            onChange={() => setRemindersEnabled(!remindersEnabled)}
            className="w-5 h-5 cursor-pointer"
          />
        </div>

        {/* Reminder Time */}
        <div>
          <label htmlFor="reminderTime" className="block mb-1">
            ⏰ Еске салу уақыты
          </label>
          <input
            id="reminderTime"
            type="time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="p-2 rounded bg-zinc-800 text-white border border-gray-500"
          />
        </div>

        {/* Streak Count */}
        <div className="text-sm text-gray-300">
          🔥 Сіздің қатарынан күндер саны: <span className="text-white font-bold">{streakCount}</span>
        </div>

        <hr className="border-gray-600 my-4" />

        {/* Save Button */}
        <button
          onClick={handleSaveChanges}
          className="bg-green-600 px-4 py-2 rounded text-white hover:bg-green-700"
        >
          ✅ Өзгерістерді сақтау
        </button>

        {saveMessage && <p className="text-sm text-green-400 mt-2">{saveMessage}</p>}

        {/* Clear button */}
        <button
          onClick={handleClearData}
          className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 mt-4"
        >
          🗑️ Барлық деректерді тазарту
        </button>
      </div>
    </div>
  );
};

export default SettingsTool;
