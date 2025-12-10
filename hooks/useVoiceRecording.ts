import { useState, useCallback } from 'react';

export interface VoiceRecordingResult {
  uri: string;
  duration: number;
  success: boolean;
  error?: string;
}

export const useVoiceRecording = () => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingDuration, setRecordingDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const startRecording = useCallback(async (): Promise<boolean> => {
    try {
      setError(null);
      setIsRecording(true);
      setRecordingDuration(0);
      // Simulated recording start
      return true;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start recording';
      setError(errorMessage);
      setIsRecording(false);
      return false;
    }
  }, []);

  const stopRecording = useCallback(async (): Promise<VoiceRecordingResult> => {
    try {
      setIsRecording(false);
      // Simulated recording stop
      return {
        uri: 'file:///path/to/recording.m4a',
        duration: recordingDuration,
        success: true,
      };
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to stop recording';
      setError(errorMessage);
      return {
        uri: '',
        duration: 0,
        success: false,
        error: errorMessage,
      };
    }
  }, [recordingDuration]);

  const cancelRecording = useCallback(() => {
    setIsRecording(false);
    setRecordingDuration(0);
  }, []);

  return {
    isRecording,
    recordingDuration,
    error,
    startRecording,
    stopRecording,
    cancelRecording,
  };
};
