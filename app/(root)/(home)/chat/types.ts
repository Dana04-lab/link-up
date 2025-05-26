// components/types.ts

export type Message = {
  id: number;
  sender: string;
  content: string;
  timestamp: string;
  file: string | null;
};

export type Chat = {
  id: string;
  name: string;
  messages: Message[];
};
