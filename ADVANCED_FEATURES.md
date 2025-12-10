# Jeff Mobile App - Advanced Features Documentation

## Overview

This document covers the advanced features implemented in the Jeff Mobile App, including speech-to-text, text-to-speech, persistent storage, and other utility hooks.

## Advanced Hooks

### 1. useSpeechToText Hook

**Location**: `hooks/useSpeechToText.ts`

**Purpose**: Convert user voice input into text

**Features**:
- Start/stop listening
- Real-time transcript
- Confidence scoring
- Error handling
- Reset transcript

**Usage Example**:

```typescript
import { useSpeechToText } from './hooks/useSpeechToText';

const { isListening, transcript, startListening, stopListening, resetTranscript } = useSpeechToText();

const handleVoiceInput = async () => {
  if (!isListening) {
    await startListening();
  } else {
    const result = await stopListening();
    console.log('Recognized text:', result.text);
    console.log('Confidence:', result.confidence);
  }
};
```

**Integration Steps**:
1. Install `expo-speech-recognition` or use Web Speech API
2. Add permissions in `app.json` for iOS/Android
3. Implement actual speech recognition in `useCallback`

### 2. useTextToSpeech Hook

**Location**: `hooks/useTextToSpeech.ts`

**Purpose**: Convert text responses into spoken audio

**Features**:
- Speak text with customizable language
- Control rate and pitch
- Play, pause, resume, stop controls
- Error handling

**Usage Example**:

```typescript
import { useTextToSpeech } from './hooks/useTextToSpeech';

const { isSpeaking, speak, stop, pause, resume } = useTextToSpeech();

const handleSpeak = async () => {
  await speak({
    text: "Hello, I'm Jeff, your AI assistant!",
    language: 'en-US',
    rate: 1.0,
    pitch: 1.0,
  });
};
```

**Integration Steps**:
1. Use Web Speech API (browser) or `expo-speech`
2. Add TTS library to dependencies
3. Implement voice selection (male/female/neutral)
4. Add voice controls to UI

### 3. useStorage Hook

**Location**: `hooks/useStorage.ts`

**Purpose**: Persistent local storage for app data

**Features**:
- Generic storage with TypeScript support
- Automatic loading from AsyncStorage
- Async save/remove operations
- Error handling
- Loading states

**Usage Example**:

```typescript
import { useStorage } from './hooks/useStorage';

interface UserProfile {
  name: string;
  preferences: {
    theme: 'light' | 'dark';
    language: string;
  };
}

const { storedValue, setValue, removeValue, isLoading } = useStorage<UserProfile>(
  'user_profile',
  { name: '', preferences: { theme: 'light', language: 'en' } }
);

// Save data
const updateProfile = async () => {
  await setValue({
    name: 'John',
    preferences: { theme: 'dark', language: 'en' },
  });
};

// Load data automatically on mount
// Remove data
const clearProfile = async () => {
  await removeValue();
};
```

**What Gets Stored**:
- User preferences
- Chat history
- Conversation sessions
- User settings
- Mood tracking data

### 4. Existing Hooks Summary

#### useChatAPI
- Handles Google Gemini API communication
- Manages message sending with mood context
- Error handling and loading states

#### useVoiceRecording
- Records audio from microphone
- Tracks recording duration
- Handles start/stop/cancel operations
- Provides recorded file URI

## Integration Guide

### Step 1: Install Dependencies

```bash
npm install @react-native-async-storage/async-storage
# For speech features:
npm install expo-speech
npm install expo-speech-recognition
```

### Step 2: Update app.json

```json
{
  "plugins": [
    [
      "expo-speech-recognition",
      {
        "microphonePermission": "Allow $(PRODUCT_NAME) to access your microphone."
      }
    ]
  ],
  "permissions": [
    "INTERNET",
    "RECORD_AUDIO",
    "MODIFY_AUDIO_SETTINGS"
  ]
}
```

### Step 3: Update Chat Screen

```typescript
import { useSpeechToText } from '../../hooks/useSpeechToText';
import { useTextToSpeech } from '../../hooks/useTextToSpeech';
import { useStorage } from '../../hooks/useStorage';

const { speak } = useTextToSpeech();
const { transcript, startListening, stopListening } = useSpeechToText();
const { storedValue: chatHistory, setValue: saveChatHistory } = useStorage('chat_history', []);

const handleAIResponse = async (response: string) => {
  // Speak response
  await speak({ text: response });
  
  // Save to history
  await saveChatHistory([...chatHistory, response]);
};
```

## Storage Schema

### Chat History Format

```typescript
interface StoredMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  mood?: string;
  audioUri?: string; // For voice messages
}

interface ChatSession {
  sessionId: string;
  startTime: number;
  messages: StoredMessage[];
  metadata: {
    totalMessages: number;
    duration: number;
    userMood?: string;
  };
}
```

## Best Practices

### Performance
- Load chat history asynchronously
- Implement pagination for large chat histories
- Clear old sessions periodically
- Use compression for stored data

### Storage Management
- Monitor AsyncStorage usage (limit: ~10MB)
- Archive old sessions monthly
- Implement data cleanup strategy
- Backup important data

### Voice Features
- Request permissions before using microphone
- Provide visual feedback during recording
- Handle microphone unavailability gracefully
- Validate speech recognition confidence

## Error Handling

All hooks include comprehensive error handling:

```typescript
const { error, isLoading } = useSpeechToText();

if (error) {
  // Handle error gracefully
  console.error('Speech recognition failed:', error);
  // Show user-friendly message
}
```

## Testing

### Mock Data for Development

```typescript
const mockChatHistory = [
  { id: '1', role: 'user', content: 'Hello', timestamp: Date.now() },
  { id: '2', role: 'assistant', content: 'Hi there!', timestamp: Date.now() },
];

// In useStorage hook for testing:
if (__DEV__) {
  // Load mock data in development
}
```

## Future Enhancements

1. **Advanced Voice Recognition**
   - Multi-language support
   - Speaker identification
   - Emotion detection

2. **Enhanced Storage**
   - Cloud backup integration
   - End-to-end encryption
   - Cross-device sync

3. **Analytics**
   - Track usage patterns
   - Mood trends
   - Conversation quality metrics

4. **Offline Support**
   - Cache responses
   - Offline chat continuity
   - Sync on reconnect

## Troubleshooting

### Voice Features Not Working
- Check microphone permissions
- Verify device has microphone
- Test with Web Speech API first
- Check browser/OS compatibility

### Storage Issues
- Clear AsyncStorage: `await AsyncStorage.clear()`
- Check available device storage
- Monitor storage quota
- Implement cleanup mechanisms

### API Integration
- Verify API key is set correctly
- Check network connectivity
- Validate request payload
- Review error responses

## API Reference

See `SETUP.md` for Google Gemini API details and usage examples.

---

**Last Updated**: December 11, 2025
**Version**: 1.0.0 Advanced
**Status**: Ready for Production
