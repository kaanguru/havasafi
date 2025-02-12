import '@/global.css';

import { Stack } from 'expo-router';
import { useState, useEffect } from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Teko_400Regular } from '@expo-google-fonts/teko';
import { Roboto_400Regular } from '@expo-google-fonts/roboto';
import * as SplashScreen from 'expo-splash-screen';
import { MoonIcon, SunIcon } from '~/components/ui/icon';

SplashScreen.preventAutoHideAsync();
export default function RootLayout() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  const [loaded, error] = useFonts({
    Inter_900Black,
    Teko_400Regular,
    Roboto_400Regular,
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
      <Box className="absolute right-1 top-1 z-20 m-0 h-6 w-6 ">
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
