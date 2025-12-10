import { useState, useCallback } from 'react';

export interface ChatResponse {
  message: string;
  success: boolean;
  error?: string;
}

export const useChatAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendMessage = useCallback(
    async (userMessage: string, mood?: string): Promise<ChatResponse> => {
      setIsLoading(true);
      setError(null);

      try {
        // Simulated API call - replace with actual API endpoint
        const response = await fetch('https://api.example.com/chat', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            message: userMessage,
            mood: mood || 'neutral',
            timestamp: new Date().toISOString(),
          }),
        });

        if (!response.ok) {
          throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();

        return {
          message: data.reply || 'No response',
          success: true,
        };
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Unknown error';
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
    []
  );

  return {
    sendMessage,
    isLoading,
    error,
  };
};
