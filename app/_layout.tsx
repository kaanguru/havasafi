import '@/global.css';

import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Teko_400Regular } from '@expo-google-fonts/teko';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

import { ColorModeProvider } from '~/state/ColorModeProvider';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [loaded, error] = useFonts({
    Inter_900Black,
    Teko_400Regular,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }
  return (
    <>
      <ColorModeProvider>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </ColorModeProvider>
    </>
  );
}
