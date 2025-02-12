import { Stack } from 'expo-router';
import { Text, View } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Tab Two' }} />
      <View className="flex-1 items-center justify-center bg-green-950 ">
        <Text className="text-white">test</Text>
      </View>
    </>
  );
}
