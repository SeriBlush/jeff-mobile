# Jeff AI Mobile App - Setup Guide

## Getting Started with Google Gemini API Integration

This guide explains how to set up your Jeff Mobile App with the Google Gemini API.

### Prerequisites

- Node.js 18+ or later
- Expo CLI (`npm install -g expo-cli`)
- Google account (for API key generation)
- Your Google Gemini API Key: `AIzaSyBYk_kJPp64KJHao2RKAS0hguuAPTJUXoQ`

### Installation Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/SeriBlush/jeff-mobile.git
   cd jeff-mobile
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Install required packages for Google Gemini API**
   ```bash
   npm install @google/generative-ai
   ```

4. **Set up environment variables**
   - Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
   - Update `.env.local` with your actual API key:
   ```env
   EXPO_PUBLIC_GOOGLE_API_KEY=AIzaSyBYk_kJPp64KJHao2RKAS0hguuAPTJUXoQ
   EXPO_PUBLIC_API_BASE_URL=https://generativelanguage.googleapis.com/v1beta/models
   ```

### Usage

#### Using the Chat Service

```typescript
import ChatService from './services/chatService';

const chatService = new ChatService({
  apiKey: process.env.EXPO_PUBLIC_GOOGLE_API_KEY,
  modelName: 'gemini-pro',
});

// Send a message
const response = await chatService.sendMessage(
  'Hello, how are you?',
  'happy' // optional mood parameter
);

console.log(response.content);
```

#### Using the Hook

```typescript
import { useChatAPI } from './hooks/useChatAPI';

const MyComponent = () => {
  const { sendMessage, isLoading, error } = useChatAPI(
    process.env.EXPO_PUBLIC_GOOGLE_API_KEY
  );

  const handleSendMessage = async () => {
    const response = await sendMessage('Hello!', 'happy');
    if (response.success) {
      console.log('Response:', response.message);
    } else {
      console.error('Error:', error);
    }
  };

  return (
    <button onPress={handleSendMessage} disabled={isLoading}>
      {isLoading ? 'Sending...' : 'Send Message'}
    </button>
  );
};
```

### Project Structure

```
jeff-mobile/
├── app/                    # App screens and navigation
│   ├── (tabs)/            # Tab-based screens
│   ├── _layout.tsx        # Root layout
│   └── splash.tsx         # Splash screen
├── components/            # Reusable UI components
│   ├── ChatMessage.tsx    # Message display
│   ├── HeaderBar.tsx      # App header
│   ├── InputBar.tsx       # Chat input
│   ├── MoodSelector.tsx   # Mood selection
│   └── VoiceButton.tsx    # Voice recording
├── contexts/              # React Context providers
│   └── ChatContext.tsx    # Chat state management
├── hooks/                 # Custom hooks
│   ├── useChatAPI.ts      # Chat API hook
│   └── useVoiceRecording.ts # Voice recording hook
├── services/              # Business logic
│   └── chatService.ts     # Gemini API service
└── .env.example           # Environment variables template
```

### Features

✅ **Google Gemini Integration**: Uses the latest Google Generative AI API
✅ **Multi-turn Conversations**: Maintains conversation history
✅ **Mood-aware Responses**: Considers user's mood for empathetic replies
✅ **Voice Support**: Voice recording functionality (ready for integration)
✅ **TypeScript**: Full type safety
✅ **Expo/React Native**: Cross-platform mobile app

### API Key Security

⚠️ **IMPORTANT**: Never commit your `.env.local` file to Git. It's already in `.gitignore`.

### Running the App

```bash
# Start Expo development server
npm start

# Or for iOS
npm run ios

# Or for Android
npm run android
```

### Troubleshooting

**API Key Not Found Error**
- Ensure `.env.local` exists and contains your API key
- Verify `EXPO_PUBLIC_GOOGLE_API_KEY` is set correctly

**Network Errors**
- Check your internet connection
- Verify the API endpoint is accessible

**Module Not Found**
- Run `npm install @google/generative-ai` again
- Clear node_modules: `rm -rf node_modules && npm install`

### Resources

- [Google Generative AI Documentation](https://ai.google.dev/)
- [Expo Documentation](https://docs.expo.dev/)
- [React Native Documentation](https://reactnative.dev/)

---

**Created**: December 11, 2025
**API Key**: `AIzaSyBYk_kJPp64KJHao2RKAS0hguuAPTJUXoQ`
