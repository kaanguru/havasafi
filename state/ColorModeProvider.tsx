import { MoonIcon, SunIcon } from 'lucide-react-native';
import React, { createContext, useContext, useState, ReactNode } from 'react';

import { Box } from '~/components/ui/box';
import { Button, ButtonIcon } from '~/components/ui/button';
import { GluestackUIProvider } from '~/components/ui/gluestack-ui-provider';

type ColorModeContextType = {
  colorMode: 'light' | 'dark';
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType | undefined>(undefined);

export const ColorModeProvider = ({ children }: { children: ReactNode }) => {
  const [colorMode, setColorMode] = useState<'light' | 'dark'>('light');

  const toggleColorMode = () => {
    setColorMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      <Box className="absolute right-4 top-4 z-30  h-8 w-8 ">
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
      <GluestackUIProvider mode={colorMode}>{children}</GluestackUIProvider>
    </ColorModeContext.Provider>
  );
};

export const useColorMode = () => {
  const context = useContext(ColorModeContext);
  if (!context) {
    throw new Error('useColorMode must be used within a ColorModeProvider');
  }
  return context;
};
