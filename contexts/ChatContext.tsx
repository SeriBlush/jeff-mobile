import React, { createContext, useState, useContext, ReactNode } from 'react';
import { ChatMessageProps } from '../components/ChatMessage';

export interface ChatContextType {
  messages: ChatMessageProps[];
  addMessage: (message: Omit<ChatMessageProps, 'timestamp'>) => void;
  clearMessages: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
  selectedMood: string | null;
  setSelectedMood: (mood: string | null) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ChatMessageProps[]>([
    {
      role: 'assistant',
      content: 'Hello! I\'m Jeff, your AI companion. How can I help you today?',
      timestamp: new Date(),
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMood, setSelectedMood] = useState<string | null>(null);

  const addMessage = (message: Omit<ChatMessageProps, 'timestamp'>) => {
    setMessages((prev) => [
      ...prev,
      {
        ...message,
        timestamp: new Date(),
      },
    ]);
  };

  const clearMessages = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Conversation cleared. How can I help you?',
        timestamp: new Date(),
      },
    ]);
  };

  const value: ChatContextType = {
    messages,
    addMessage,
    clearMessages,
    isLoading,
    setIsLoading,
    selectedMood,
    setSelectedMood,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = (): ChatContextType => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
