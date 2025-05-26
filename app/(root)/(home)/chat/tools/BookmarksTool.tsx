'use client';

import React, { useState, useEffect } from 'react';
import {
  Star,
  StickyNote,
  Trash2,
  ArrowLeft,
} from 'lucide-react';

interface Bookmark {
  id: string;
  content: string;
  note?: string;
  color?: string;
  createdAt: string;
}

interface BookmarksToolProps {
  setActiveTool: (val: string | null) => void;
}

const BookmarksTool: React.FC<BookmarksToolProps> = ({ setActiveTool }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [newBookmark, setNewBookmark] = useState('');
  const [note, setNote] = useState('');
  const [color, setColor] = useState('blue');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('bookmarks');
    if (stored) {
      setBookmarks(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

  const handleAddBookmark = () => {
    if (!newBookmark.trim()) return;
    const newItem: Bookmark = {
      id: crypto.randomUUID(),
      content: newBookmark,
      note: note.trim() ? note : undefined,
      color,
      createdAt: new Date().toISOString(),
    };
    setBookmarks((prev) => [...prev, newItem]);
    setNewBookmark('');
    setNote('');
    setColor('blue');
  };

  const handleRemove = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const getColorClass = (color: string = 'gray') => {
    switch (color) {
      case 'blue': return 'border-blue-500';
      case 'green': return 'border-green-500';
      case 'red': return 'border-red-500';
      case 'purple': return 'border-purple-500';
      case 'gray': return 'border-gray-500';
      default: return 'border-gray-500';
    }
  };

  const filteredBookmarks = bookmarks.filter((b) =>
    b.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.note?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="p-6 text-white">
      {/* 🔙 Артқа батырмасы */}
      <button
        onClick={() => setActiveTool(null)}
        className="text-blue-400 hover:underline mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Артқа
      </button>

      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <Star className="text-yellow-400" />
        Бетбелгілер
      </h2>

      {/* 🔍 Іздеу */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Іздеу..."
        className="w-full mb-4 p-2 rounded border border-gray-600 bg-transparent text-white placeholder-gray-400"
      />

      {/* ➕ Жаңа бетбелгі қосу */}
      <div className="flex flex-col sm:flex-row gap-2 mb-4">
        <input
          type="text"
          value={newBookmark}
          onChange={(e) => setNewBookmark(e.target.value)}
          placeholder="Мәтін немесе сілтеме"
          className="flex-1 p-2 rounded border border-gray-600 bg-transparent text-white placeholder-gray-400"
        />
        <input
          type="text"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Түсініктеме (қалауыңызша)"
          className="flex-1 p-2 rounded border border-gray-600 bg-transparent text-white placeholder-gray-400"
        />
        <select
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="p-2 rounded border border-gray-600 bg-transparent text-white"
        >
          <option value="blue">Көк</option>
          <option value="green">Жасыл</option>
          <option value="red">Қызыл</option>
          <option value="purple">Күлгін</option>
          <option value="gray">Сұр</option>
        </select>
        <button
          onClick={handleAddBookmark}
          className="bg-blue-600 text-white px-4 rounded"
        >
          Қосу
        </button>
      </div>

      {/* 📄 Бетбелгілер тізімі */}
      {filteredBookmarks.length === 0 ? (
        <p className="text-gray-400">Бетбелгілер жоқ.</p>
      ) : (
        <ul className="space-y-4">
          {filteredBookmarks.map((bm) => (
            <li
              key={bm.id}
              className={`border-l-4 p-4 rounded bg-zinc-800 ${getColorClass(bm.color)}`}
            >
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{bm.content}</p>
                  {bm.note && (
                    <p className="text-sm text-gray-400 mt-1 flex items-center gap-1">
                      <StickyNote size={14} />
                      {bm.note}
                    </p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Қосылған уақыты: {new Date(bm.createdAt).toLocaleString('kk-KZ')}
                  </p>
                </div>
                <button
                  onClick={() => handleRemove(bm.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookmarksTool;
