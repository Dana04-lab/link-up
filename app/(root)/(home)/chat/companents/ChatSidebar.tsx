// components/Sidebar.tsx
import React from "react";
import { Chat } from "../types";

interface SidebarProps {
  currentUser: string;
  chats: Chat[];
  setChats: React.Dispatch<React.SetStateAction<Chat[]>>;
  setActiveChatId: React.Dispatch<React.SetStateAction<string | null>>;
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

const Sidebar: React.FC<SidebarProps> = ({
  currentUser,
  chats,
  setChats,
  setActiveChatId,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <div className="w-64  p-4">
      {/* Sidebar content */}
    </div>
  );
};

export default Sidebar;
