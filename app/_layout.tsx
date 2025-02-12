import '@/global.css';

import { Stack } from 'expo-router';
import { useState } from 'react';

import { Box } from '@/components/ui/box';
import { Button, ButtonText } from '@/components/ui/button';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';

export default function RootLayout() {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');
  return (
    <>
      <Box className="bg-primary m-0 h-6 p-0 dark:bg-slate-300">
        <Button
          size="sm"
          variant="solid"
          action="primary"
          onPress={() => {
            setColorMode(colorMode === 'light' ? 'dark' : 'light');
          }}>
          <ButtonText>Toggle color mode</ButtonText>
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
