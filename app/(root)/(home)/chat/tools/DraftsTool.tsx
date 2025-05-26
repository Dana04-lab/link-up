'use client';

import React, { useState, useEffect } from 'react';
import { PencilLine, Trash, ImagePlus, Pencil } from 'lucide-react';

interface InProgressItem {
  id: string;
  type: 'text' | 'image';
  content: string;
}

interface InProgressToolProps {
  setActiveTool: (val: string | null) => void;
}

const InProgressTool: React.FC<InProgressToolProps> = ({ setActiveTool }) => {
  const [items, setItems] = useState<InProgressItem[]>([]);
  const [newText, setNewText] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedText, setEditedText] = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('inProgressItems');
    if (stored) {
      setItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('inProgressItems', JSON.stringify(items));
  }, [items]);

  const handleAddText = () => {
    if (!newText.trim()) return;
    const newItem: InProgressItem = {
      id: crypto.randomUUID(),
      type: 'text',
      content: newText,
    };
    setItems((prev) => [...prev, newItem]);
    setNewText('');
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = URL.createObjectURL(file);
    const newItem: InProgressItem = {
      id: crypto.randomUUID(),
      type: 'image',
      content: url,
    };
    setItems((prev) => [...prev, newItem]);
  };

  const handleDelete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartEdit = (id: string, currentText: string) => {
    setEditingId(id);
    setEditedText(currentText);
  };

  const handleSaveEdit = () => {
    if (!editedText.trim()) return;
    setItems((prev) =>
      prev.map((item) =>
        item.id === editingId ? { ...item, content: editedText } : item
      )
    );
    setEditingId(null);
    setEditedText('');
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setEditedText('');
  };

  return (
    <div className="p-6 text-white bg-[#0f172a] min-h-screen">
      <button
        onClick={() => setActiveTool(null)}
        className="text-blue-400 hover:underline mb-4"
      >
        ← Артқа
      </button>

      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <PencilLine className="text-orange-500" />
        Қаралып жатқандар
      </h2>

      <div className="flex gap-2 mb-6 items-center">
        <input
          type="text"
          value={newText}
          onChange={(e) => setNewText(e.target.value)}
          placeholder="Жаңа жазба..."
          className="flex-1 p-3 rounded bg-slate-800 border border-slate-600 text-white placeholder-gray-400"
        />
        <button
          onClick={handleAddText}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded"
        >
          Қосу
        </button>
        <label className="cursor-pointer">
          <ImagePlus className="text-blue-400" />
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {items.length === 0 ? (
        <p className="text-slate-400">Қаралып жатқан ештеңе жоқ.</p>
      ) : (
        <ul className="space-y-4">
          {items.map((item) => (
            <li
              key={item.id}
              className="bg-white text-black rounded shadow p-4"
            >
              {item.type === 'text' ? (
                editingId === item.id ? (
                  <div className="flex flex-col gap-2">
                    <input
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      className="w-full px-3 py-2 rounded border border-gray-400"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleSaveEdit}
                        className="text-green-600 font-semibold"
                      >
                        Сақтау
                      </button>
                      <button
                        onClick={handleCancelEdit}
                        className="text-gray-500"
                      >
                        Бас тарту
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-between items-center">
                    <span className="text-black text-base font-medium">
                      {item.content}
                    </span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleStartEdit(item.id, item.content)}
                        title="Өңдеу"
                        className="text-blue-600"
                      >
                        <Pencil size={18} />
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-red-600"
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </div>
                )
              ) : (
                <div className="flex justify-between items-center">
                  <img
                    src={item.content}
                    alt="Сақталған сурет"
                    className="w-32 h-auto rounded shadow border border-gray-300"
                  />
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600"
                  >
                    <Trash size={18} />
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default InProgressTool;
