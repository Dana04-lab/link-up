// components/ChatHeader.tsx
import React, { useState } from "react";
import { FaEnvelope, FaUserPlus } from "react-icons/fa"; // Иконкаларды қосу үшін

interface ChatHeaderProps {
  currentUser: string;
  setCurrentUser: React.Dispatch<React.SetStateAction<string>>;
  showToolPage: boolean;
  setShowToolPage: React.Dispatch<React.SetStateAction<boolean>>;
}

const ChatHeader: React.FC<ChatHeaderProps> = ({
  currentUser,
  setCurrentUser,
  showToolPage,
  setShowToolPage,
}) => {
  // "+" батырмасын басқанда ашылатын мәзірдің күйі
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="p-4 bg-[#1F2233] flex justify-between items-center">
      <h1 className="text-xl font-bold">Коллективтік чат</h1>
      <div className="flex items-center gap-4">
        <input
          placeholder="Атыңызды енгізіңіз..."
          value={currentUser}
          onChange={(e) => setCurrentUser(e.target.value)}
          className="max-w-xs bg-[#2C2F3F] text-white"
        />
        <button
          onClick={() => setShowToolPage(!showToolPage)}
          className="bg-[#2C2F3F] px-3 py-1 text-white"
        >
          ☰ Мәзір
        </button>
        <button
          className="bg-[#2C2F3F] px-3 py-1 text-white flex items-center gap-1"
          onClick={() => setShowMenu(!showMenu)} // "+" басқанда меню ашылады
        >
          <span className="text-xl">{showMenu ? "×" : "+"}</span> {/* "+" немесе "x" таңбасы */}
        </button>
        {showMenu && ( // Мәзір ашылғанда ғана көрсетіледі
          <div className="absolute bg-white text-black p-3 rounded shadow-lg mt-2 flex flex-col gap-2">
            <button
              className="flex items-center gap-2 px-3 py-1 hover:bg-[#3A4151]"
              onClick={() => {/* Логика для нового сообщения */}}
            >
              <FaEnvelope className="text-lg" /> {/* Иконка для "Новые сообщения" */}
              Жаңа хабарлама
            </button>
            <button
              className="flex items-center gap-2 px-3 py-1 hover:bg-[#3A4151]"
              onClick={() => {/* Логика для прикрепления нового контакта */}}
            >
              <FaUserPlus className="text-lg" /> {/* Иконка для "Прикрепить новый контакт" */}
              Жаңа байланыс қосу
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default ChatHeader;

