'use client';

import React, { useState, useEffect } from 'react';
import { FileText, UploadCloud, Trash2, ArrowLeft } from 'lucide-react';
import { uploadFile } from '@/utils/uploadFile';

interface DocumentItem {
  id: string;
  name: string;
  url: string;
}

interface DocumentsToolProps {
  setActiveTool: (val: string | null) => void;
}

const DocumentsTool: React.FC<DocumentsToolProps> = ({ setActiveTool }) => {
  const [documents, setDocuments] = useState<DocumentItem[]>([]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('documents');
      if (stored) {
        setDocuments(JSON.parse(stored));
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('documents', JSON.stringify(documents));
    }
  }, [documents]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const result = await uploadFile(file, 'documents');
      const newDoc: DocumentItem = {
        id: crypto.randomUUID(),
        name: result.name,
        url: result.url,
      };
      setDocuments((prev) => [...prev, newDoc]);
    } catch (error) {
      console.error('Құжатты жүктеу қатесі:', error);
    }
  };

  const handleRemove = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <div className="p-6 min-h-screen text-white">
      {/* Артқа батырмасы */}
      <button
        onClick={() => setActiveTool(null)}
        className="text-blue-400 hover:underline mb-4 flex items-center gap-2"
      >
        <ArrowLeft size={18} />
        Артқа
      </button>

      {/* Тақырып */}
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        <FileText className="text-blue-400" />
        Құжаттар
      </h2>

      {/* Құжат жүктеу */}
      <div className="mb-6">
        <label className="cursor-pointer flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded w-fit">
          <UploadCloud size={18} />
          Құжат жүктеу
          <input
            type="file"
            accept=".pdf,.doc,.docx,.ppt,.pptx,.txt"
            hidden
            onChange={handleUpload}
          />
        </label>
      </div>

      {/* Құжаттар тізімі немесе бос күйі */}
      {documents.length === 0 ? (
        <p className="text-gray-400">Құжаттар жоқ.</p>
      ) : (
        <ul className="space-y-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="border border-gray-600 p-4 rounded flex justify-between items-center bg-zinc-900"
            >
              <a
                href={doc.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:underline"
              >
                📄 {doc.name}
              </a>
              <button
                onClick={() => handleRemove(doc.id)}
                className="text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DocumentsTool;
