// Type definitions for Jeff AI Mobile App

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  mood?: string;
}

export interface ChatServiceConfig {
  apiKey: string;
  modelName?: string;
}

export interface ConversationPart {
  role: string;
  parts: string;
}

export interface ChatContextType {
  messages: ChatMessage[];
  sendMessage: (message: string, mood?: string) => Promise<ChatMessage>;
  clearHistory: () => void;
  currentMood?: string;
  setMood: (mood: string) => void;
}

export interface HookResponse<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}
