import '@/global.css';

import { Stack } from 'expo-router';
import { useState } from 'react';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: '(tabs)',
};
const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

export default function RootLayout() {
  return (
    <GluestackUIProvider mode={colorMode}>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </GluestackUIProvider>
  );
}
