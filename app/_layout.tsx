import '@/global.css';

import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Teko_400Regular } from '@expo-google-fonts/teko';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useState, useEffect } from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonIcon } from '@/components/ui/button';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { MoonIcon, SunIcon } from '~/components/ui/icon';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
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
      <Box className="absolute right-4 top-4 z-20 m-0 h-8 w-8 ">
        <Button
          size="sm"
          variant="solid"
          action="primary"
          onPress={() => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}>
          <ButtonIcon
            size="md"
            as={colorMode === 'light' ? MoonIcon : SunIcon}
            className="text-typography-black dark:text-typography-black"
          />
        </Button>
      </Box>
      <GluestackUIProvider mode={colorMode}>
        <Stack>
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </GluestackUIProvider>
    </>
  );
}
