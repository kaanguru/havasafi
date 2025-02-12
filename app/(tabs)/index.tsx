import { Stack } from 'expo-router';
import { View } from 'react-native';

import Logo from '~/components/Logo';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab One' }} />
      <View className="flex-1 items-center justify-center">
        <Logo />
      </View>
    </>
  );
}
