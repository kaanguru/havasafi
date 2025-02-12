import { Stack } from 'expo-router';
import { View } from 'react-native';

import Logo from '~/components/Logo';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Kalite' }} />
      <View className="flex-1 items-center justify-center bg-primary-0 dark:bg-primary-500">
        <Logo />
      </View>
    </>
  );
}
