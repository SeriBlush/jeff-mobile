import { useState, useCallback } from 'react';
import ChatService from '../services/chatService';

export interface ChatResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const useChatAPI = (apiKey: string) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chatService, setChatService] = useState<ChatService | null>(null);

  // Initialize chat service on mount or when API key changes
  const initializeChatService = useCallback(() => {
    if (!apiKey) {
      setError('API key is required');
      return false;
    }
    try {
      const service = new ChatService({
        apiKey: apiKey,
        modelName: 'gemini-pro',
      });
      setChatService(service);
      setError(null);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to initialize chat service';
      setError(errorMessage);
      return false;
    }
  }, [apiKey]);

  const sendMessage = useCallback(
    async (userMessage: string, mood?: string): Promise<ChatResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Initialize service if not already done
        let service = chatService;
        if (!service) {
          const initialized = initializeChatService();
          if (!initialized) {
            throw new Error('Failed to initialize chat service');
          }
          // Get the newly initialized service
          service = new ChatService({
            apiKey: apiKey,
            modelName: 'gemini-pro',
          });
        }

        // Send message using the chat service
        const response = await service.sendMessage(userMessage, mood);

        return {
          message: response.content,
          success: true,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to send message';
        setError(errorMessage);
        return {
          message: errorMessage,
          success: false,
          error: errorMessage,
        };
      } finally {
        setIsLoading(false);
      }
    },
    [apiKey, chatService, initializeChatService]
  );

  return {
    sendMessage,
    isLoading,
    error,
    initializeChatService,
  };
};
