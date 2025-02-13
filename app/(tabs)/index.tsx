import { Stack } from 'expo-router';

import Logo from '~/components/Logo';
import { Box } from '~/components/ui/box';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Kalite' }} />
      <Box className="items-center justify-center ">
        <Logo />
      </Box>
    </>
  );
}
