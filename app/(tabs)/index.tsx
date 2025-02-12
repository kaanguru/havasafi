import { Stack } from 'expo-router';
import { View } from 'react-native';

import Logo from '~/components/Logo';
import { Box } from '~/components/ui/box';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Kalite' }} />
      <View className="m-4 flex-1 items-center bg-background-light dark:bg-background-dark">
        <Logo />
      </View>
    </>
  );
}
