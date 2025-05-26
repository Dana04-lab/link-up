"use client";
import React, { useState, useEffect } from "react";
import { Toaster } from "sonner";
import ChatHeader from "./companents/ChatHeader";
import { ToolPanel } from "./companents/ToolPanel";
import { Chat } from "./types";
import Sidebar from "./companents/ChatSidebar";
import ChatWindow from "./companents/ChatWindow";
import ToolContent from "./companents/ToolContent";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

const ChatPage = () => {
  const { user, isLoaded } = useAuth();
  const router = useRouter();

  const [currentUser, setCurrentUser] = useState<string>("");
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);
  const [showToolPage, setShowToolPage] = useState(false);
  const [activeTool, setActiveTool] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) setCurrentUser(user.displayName || user.email || "Аноним");
  }, [user]);

  useEffect(() => {
    if (isLoaded && !user) {
      router.push("/login");
    }
  }, [isLoaded, user]);

  if (!isLoaded) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#1C1F2E] text-white">
        <div className="animate-spin h-10 w-10 border-4 border-white border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user) return null;

  const activeChat = chats.find((c) => c.id === activeChatId);

  return (
    <div className="h-screen bg-[#1C1F2E] text-white flex flex-col">
      <Toaster position="top-center" />

      <ChatHeader
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        showToolPage={showToolPage}
        setShowToolPage={setShowToolPage}
      />

      {showToolPage ? (
        activeTool ? (
          <ToolContent activeTool={activeTool} setActiveTool={setActiveTool} />
        ) : (
          <ToolPanel
            activeTool={activeTool}
            setActiveTool={setActiveTool}
            setShowToolPage={setShowToolPage}
          />
        )
      ) : (
        <div className="flex flex-1">
          <Sidebar
            currentUser={currentUser}
            chats={chats}
            setChats={setChats}
            setActiveChatId={setActiveChatId}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
          />
          <ChatWindow
            currentUser={currentUser}
            activeChat={activeChat}
            setChats={setChats}
            chats={chats}
          />
        </div>
      )}
    </div>
  );
};

export default ChatPage;
