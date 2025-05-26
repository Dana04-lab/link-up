'use client';

import React, { useState, useEffect } from 'react';
import {
  FolderPlus,
  Trash2,
  ArrowLeft,
  Image as ImageIcon,
  UploadCloud,
  FolderOpen,
} from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  type: string;
  url?: string;
}

interface FolderItem {
  id: string;
  name: string;
  files: FileItem[];
  createdAt: string;
}

interface FoldersToolProps {
  setActiveTool: (val: string | null) => void;
}

const FoldersTool: React.FC<FoldersToolProps> = ({ setActiveTool }) => {
  const [folders, setFolders] = useState<FolderItem[]>([]);
  const [folderName, setFolderName] = useState('');
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('folders');
    if (stored) {
      try {
        setFolders(JSON.parse(stored));
      } catch (err) {
        console.error('Жүктеу қатесі:', err);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('folders', JSON.stringify(folders));
  }, [folders]);

  const handleCreateFolder = () => {
    if (!folderName.trim()) return;
    const newFolder: FolderItem = {
      id: crypto.randomUUID(),
      name: folderName,
      files: [],
      createdAt: new Date().toISOString(),
    };
    setFolders((prev) => [...prev, newFolder]);
    setFolderName('');
  };

  const handleDeleteFolder = (id: string) => {
    setFolders((prev) => prev.filter((f) => f.id !== id));
    if (selectedFolderId === id) setSelectedFolderId(null);
  };

  const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !selectedFolderId) return;

    const uploadedFiles: FileItem[] = Array.from(e.target.files).map((file) => ({
      id: crypto.randomUUID(),
      name: file.name,
      type: file.type.startsWith('image') ? 'image' : 'file',
      url: URL.createObjectURL(file),
    }));

    setFolders((prev) =>
      prev.map((folder) =>
        folder.id === selectedFolderId
          ? { ...folder, files: [...folder.files, ...uploadedFiles] }
          : folder
      )
    );
  };

  const selectedFolder = folders.find((f) => f.id === selectedFolderId);

  if (selectedFolderId && !selectedFolder) {
    return (
      <div className="p-6 text-red-400">Қате: Папка табылмады.</div>
    );
  }

  return (
    <div className="p-6 min-h-screen bg-[#1C1F2E] text-white">
      <button
        onClick={() => {
          if (selectedFolderId) {
            setSelectedFolderId(null);
          } else {
            setActiveTool(null);
          }
        }}
        className="text-blue-400 hover:underline mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={18} /> Артқа
      </button>

      {!selectedFolderId ? (
        <>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <FolderOpen className="text-yellow-400" /> Папкалар
          </h2>

          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              placeholder="Жаңа папка атауы"
              className="p-2 border border-gray-500 rounded w-full bg-white text-black placeholder-gray-500"
            />
            <button
              onClick={handleCreateFolder}
              className="bg-gradient-to-r from-purple-600 to-pink-500 text-white px-4 rounded shadow hover:scale-105 transition"
            >
              <FolderPlus size={18} />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="bg-zinc-900 rounded-xl p-4 shadow-lg hover:shadow-xl transition cursor-pointer"
                onClick={() => setSelectedFolderId(folder.id)}
              >
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-lg font-semibold text-white">📁 {folder.name}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteFolder(folder.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                <p className="text-sm text-gray-400">
                  🗓️ {new Date(folder.createdAt).toLocaleDateString('kk-KZ')}
                </p>
                <p className="text-sm text-gray-400">
                  📄 {folder.files.length} файл
                </p>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h2 className="text-xl font-bold mb-4">
            📂 {selectedFolder?.name}
          </h2>

          <div className="mb-4">
            <label className="flex items-center gap-2 text-white mb-1">
              <UploadCloud size={18} /> Файл жүктеу:
            </label>
            <input
              type="file"
              multiple
              onChange={handleUploadFile}
              className="bg-white text-black p-2 rounded"
            />
          </div>

          {selectedFolder && selectedFolder.files.length === 0 ? (
            <p className="text-gray-400">Файлдар жоқ.</p>
          ) : (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {selectedFolder?.files.map((file) => (
                <li
                  key={file.id}
                  className="p-3 border rounded bg-zinc-900 text-white flex flex-col items-center text-center hover:scale-105 transition"
                >
                  {file.type === 'image' ? (
                    <img
                      src={file.url}
                      alt={file.name}
                      className="w-full h-32 object-cover mb-2 rounded"
                    />
                  ) : (
                    <ImageIcon size={48} className="text-gray-400 mb-2" />
                  )}
                  <p className="text-sm truncate">{file.name}</p>
                </li>
              ))}
            </ul>
          )}
        </>
      )}
    </div>
  );
};

export default FoldersTool;
