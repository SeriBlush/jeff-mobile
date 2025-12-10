import { Stack } from 'expo-router';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { ChatProvider } from '../contexts/ChatContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <ChatProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
          }}
        />
        {/* Splash screen route */}
        <Stack.Screen
          name="splash"
          options={{
            headerShown: false,
          }}
        />
      </Stack>
    </ChatProvider>
  );
}
