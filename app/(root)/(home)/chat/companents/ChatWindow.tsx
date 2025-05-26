// components/ChatWindow.tsx
import React from "react";
import { Chat } from "../types";

interface ChatWindowProps {
  currentUser: string;
  activeChat: Chat | undefined;
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  chats: Chat[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({
  currentUser,
  activeChat,
  setChats,
  chats,
}) => {
  return (
    <div className="flex-1 bg-[#1C1F2E] p-4">
      {/* Chat window content */}
    </div>
  );
};

export default ChatWindow;
