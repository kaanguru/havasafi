import '@/global.css';
import { Inter_900Black, useFonts } from '@expo-google-fonts/inter';
import { Roboto_400Regular, Roboto_700Bold } from '@expo-google-fonts/roboto';
import { Teko_400Regular } from '@expo-google-fonts/teko';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { Moon, Sun } from 'lucide-react-native';
import { useEffect, useState } from 'react';

import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { Box } from '~/components/ui/box';
import { Button, ButtonIcon } from '~/components/ui/button';

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
    <GluestackUIProvider mode={colorMode}>
      <Box className="absolute right-5 top-1 z-10 h-4 w-5 bg-background-light dark:bg-background-dark">
        <Button
          onPress={() => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}>
          <ButtonIcon as={colorMode === 'light' ? Moon : Sun} />
        </Button>
      </Box>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colorMode === 'light' ? '#F7F5FB' : '#5B150B',
            },
          }}
        />
      </Stack>
    </GluestackUIProvider>
  );
}
