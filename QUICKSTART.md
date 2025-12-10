# Jeff Mobile App - Quick Start Guide

## What You've Built

You now have a complete **Expo React Native mobile app** with:
- ✅ Google Gemini AI Chat Integration
- ✅ Voice Recording & Speech-to-Text
- ✅ Text-to-Speech Audio Output
- ✅ Persistent Data Storage
- ✅ Beautiful Material Design UI

## Setup Instructions (5 Minutes)

### Step 1: Clone the Repository
```bash
git clone https://github.com/SeriBlush/jeff-mobile.git
cd jeff-mobile
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Set Up Environment Variables
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local and add your Google Gemini API key:
# EXPO_PUBLIC_GEMINI_API_KEY=YOUR_API_KEY_HERE
```

**Where to get your API key:**
1. Go to https://aistudio.google.com/api-keys
2. Sign in with your Google account
3. Click "Create API key"
4. Copy the key and paste it in .env.local

### Step 4: Start the Development Server
```bash
npm start
```

This will show a QR code in your terminal.

### Step 5: Run on Your Phone
1. Download **Expo Go** app (iOS/Android)
2. Open Expo Go
3. Scan the QR code from your terminal
4. The app will load and you can start chatting!

## Features Explained

### Chat with AI
- Type messages to chat with Google Gemini AI
- Get smart, contextual responses
- Chat history is saved locally

### Voice Features
- **Record Voice**: Tap the mic button to record your message
- **Listen to Responses**: Tap the speaker icon to hear AI responses

### Storage
- All messages are saved on your phone
- Nothing is sent to external servers except to Google Gemini API

## Troubleshooting

**App won't load?**
- Make sure you have Node.js installed
- Delete `node_modules` folder and run `npm install` again

**API Key Error?**
- Check that your API key is correctly set in `.env.local`
- Make sure there are no extra spaces before/after the key

**No Audio?**
- Check phone sound settings
- Make sure microphone permission is granted

## Next Steps

- Check `ADVANCED_FEATURES.md` for detailed feature documentation
- Check `SETUP.md` for development guide
- Customize the app theme in `app/(tabs)/index.tsx`
- Add more AI features in `services/chatService.ts`

## Need Help?

All source code is documented and ready to customize. Start with:
1. `app/(tabs)/index.tsx` - Main chat screen
2. `services/chatService.ts` - AI integration
3. `hooks/` folder - Custom logic for audio, storage, etc.
