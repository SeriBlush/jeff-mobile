import { useState, useCallback } from 'react';

export interface SpeechRecognitionResult {
  text: string;
  isFinal: boolean;
  confidence: number;
}

export const useSpeechToText = () => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [confidence, setConfidence] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startListening = useCallback(async () => {
    try {
      setError(null);
      setTranscript('');
      setIsListening(true);
      // Implementation: Use expo-speech-recognition or Web Speech API
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start listening';
      setError(errorMessage);
      setIsListening(false);
    }
  }, []);

  const stopListening = useCallback(async (): Promise<SpeechRecognitionResult> => {
    try {
      setIsListening(false);
      return {
        text: transcript,
        isFinal: true,
        confidence: confidence,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to stop listening';
      setError(errorMessage);
      return {
        text: '',
        isFinal: false,
        confidence: 0,
      };
    }
  }, [transcript, confidence]);

  const resetTranscript = useCallback(() => {
    setTranscript('');
    setConfidence(0);
    setError(null);
  }, []);

  return {
    isListening,
    transcript,
    confidence,
    error,
    startListening,
    stopListening,
    resetTranscript,
  };
};
