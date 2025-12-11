# Jeff AI Mobile App

A React Native mobile application powered by Google Gemini AI, providing an intelligent chat assistant with voice input/output and mood tracking capabilities.

## Features

- **AI Chat**: Powered by Google Generative AI (Gemini)
- **Voice Input**: Convert speech to text using device microphone
- **Voice Output**: Text-to-speech responses
- **Mood Tracking**: Select user mood to contextualize AI responses
- **Chat History**: Persistent message storage and retrieval
- **Multi-platform**: iOS and Android support via Expo
- **TypeScript**: Full type safety throughout the codebase

## Project Structure

```
jeff-mobile/
├── app/                 # Expo Router app screens
│   ├── (tabs)/         # Tab-based navigation
│   ├── _layout.tsx     # Root layout
│   └── splash.tsx      # Splash screen
├── components/         # Reusable React components
├── hooks/              # Custom React hooks
├── services/           # API and utility services
├── contexts/           # React contexts
├── types/              # TypeScript type definitions
└── [config files]      # app.json, package.json, etc.
```

## Setup & Installation

### Prerequisites
- Node.js 16+
- npm or yarn
- Expo CLI
- Google Gemini API key

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file from `.env.example`:
   ```bash
   cp .env.example .env
   ```

4. Add your Google Gemini API key to `.env`

## Running the App

### Development
```bash
npm start          # Start Expo development server
npm run ios        # Run on iOS simulator
npm run android    # Run on Android emulator
npm run web        # Run on web
```

### Building
```bash
eas build --platform ios      # Build for iOS
eas build --platform android  # Build for Android
```

## Technologies Used

- **React Native**: Cross-platform mobile framework
- **Expo**: React Native development platform
- **TypeScript**: Type-safe JavaScript
- **Google Generative AI**: AI chat functionality
- **Expo Router**: File-based routing
- **React Context**: State management

## Key Dependencies

- `expo`: ^50.0.0
- `expo-router`: ^2.0.0
- `react`: ^18.2.0
- `react-native`: ^0.73.0
- `@google/generative-ai`: ^0.1.3
- `expo-av`: ^13.8.0 (for voice)

## Configuration

### API Configuration
The app uses Google Gemini API. Configure your API key in:
- `.env` file for local development
- Environment variables for deployment

### Build Configuration
EAS build settings are in `eas.json`. Modify platform-specific settings as needed.

## Documentation

For detailed implementation guides, see:
- `QUICKSTART.md` - Quick start guide
- `SETUP.md` - Detailed setup instructions
- `ADVANCED_FEATURES.md` - Advanced features documentation

## License

MIT License - feel free to use this project as a template for your own React Native apps.

## Support

For issues, questions, or contributions, please open an issue on GitHub.
