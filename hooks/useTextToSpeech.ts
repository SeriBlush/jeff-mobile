import { useState, useCallback } from 'react';

export interface TextToSpeechOptions {
  text: string;
  language?: string;
  rate?: number;
  pitch?: number;
}

export const useTextToSpeech = () => {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const speak = useCallback(async (options: TextToSpeechOptions): Promise<boolean> => {
    const { text, language = 'en-US', rate = 1.0, pitch = 1.0 } = options;

    try {
      setError(null);
      setIsSpeaking(true);

      // Implementation: Use expo-speech or react-native-tts
      // Example with Web Speech API (browser)
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = language;
        utterance.rate = rate;
        utterance.pitch = pitch;
        
        return new Promise((resolve) => {
          utterance.onend = () => {
            setIsSpeaking(false);
            resolve(true);
          };
          utterance.onerror = (event) => {
            setError(event.error);
            setIsSpeaking(false);
            resolve(false);
          };
          window.speechSynthesis.speak(utterance);
        });
      }

      setIsSpeaking(false);
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to speak';
      setError(errorMessage);
      setIsSpeaking(false);
      return false;
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setIsSpeaking(false);
  }, []);

  const pause = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.pause();
    }
  }, []);

  const resume = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.resume();
    }
  }, []);

  return {
    isSpeaking,
    error,
    speak,
    stop,
    pause,
    resume,
  };
};
