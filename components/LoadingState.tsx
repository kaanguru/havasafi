import { Spinner } from './ui/spinner';
import { Text } from './ui/text';
import { VStack } from './ui/vstack';

export default function LoadingState() {
  return (
    <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
      <Spinner size="large" />
      <Text>Yükleniyor...</Text>
    </VStack>
  );
}
