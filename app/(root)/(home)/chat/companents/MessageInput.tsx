// components/MessageInput.tsx
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface MessageInputProps {
  input: string;
  setInput: (val: string) => void;
  file: File | null;
  setFile: (val: File | null) => void;
  sendMessage: () => void;
  emojiList: string[];
}

export const MessageInput: React.FC<MessageInputProps> = ({
  input,
  setInput,
  file,
  setFile,
  sendMessage,
  emojiList,
}) => {
  return (
    <footer className="p-3 bg-[#1F2233] flex flex-col gap-2">
      <div className="flex items-center gap-2">
        <Input
          type="file"
          className="bg-[#2C2F3F] text-white max-w-xs"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />
        {file && <span className="text-sm text-blue-400">📎 {file.name}</span>}
      </div>
      <div className="flex items-center gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Хабарлама жазыңыз..."
          className="flex-1 bg-[#2C2F3F] text-white h-10"
        />
        <Button onClick={sendMessage} className="bg-blue-600 hover:bg-blue-500">
          Жіберу
        </Button>
      </div>
      <div className="flex gap-1 flex-wrap">
        {emojiList.map((emoji) => (
          <button
            key={emoji}
            onClick={() => setInput(input + emoji)} // Дұрыс қолдану
            className="text-2xl hover:scale-110"
            type="button"
          >
            {emoji}
          </button>
        ))}
      </div>
    </footer>
  );
};
