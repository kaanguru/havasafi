import { Stack } from 'expo-router';

import GraphScreen from '~/components/Graph';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';

export default function IsiScreen() {
  return (
    <>
      <Stack.Screen name="Isı" />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        <Text className="text-typography-500">Isı Grafiği</Text>
        <GraphScreen graphType="temperature" />
      </VStack>
    </>
  );
}
