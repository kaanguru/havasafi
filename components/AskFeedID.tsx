import { useState } from 'react';

import { Button, ButtonText } from '~/components/ui/button';
import { Input, InputField } from '~/components/ui/input';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';

interface AskFeedIDProps {
  onSubmit: (feedID: string) => Promise<void>;
  onError: (message: string) => void;
}

export default function AskFeedID({ onSubmit, onError }: AskFeedIDProps) {
  const [inputValue, setInputValue] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const handleSubmit = async () => {
    try {
      if (!inputValue.trim()) {
        throw new Error('Feed ID cannot be empty');
      }

      await onSubmit(inputValue.trim());
      setValidationError(null);
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : 'hatalı numara';
      setValidationError(errorMessage);
      onError(errorMessage);
    }
  };

  return (
    <VStack className="w-full p-4" space="md">
      <Text className="text-lg text-typography-500">Lütfen cihaz numaranızı girin:</Text>
      <Input variant="outline" size="md">
        <InputField
          placeholder="cihaz no girin..."
          value={inputValue}
          onChangeText={setInputValue}
        />
      </Input>

      {validationError && <Text className="text-red-500">{validationError}</Text>}

      <Button onPress={handleSubmit}>
        <ButtonText>Gönder</ButtonText>
      </Button>
    </VStack>
  );
}
