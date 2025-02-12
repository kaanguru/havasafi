import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Isı' }} />
      <View className="flex-1 items-center justify-center bg-green-100 dark:bg-green-950 ">
        <Text className="text-typography-black  dark:text-typography-white">test</Text>
      </View>
    </>
  );
}
