import { Text } from './ui/text';
import { VStack } from './ui/vstack';

export default function ErrorState({ error }: { error: string }) {
  return (
    <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
      <Text className="text-red-500">{error}</Text>
    </VStack>
  );
}
