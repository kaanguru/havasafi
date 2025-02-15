import AsyncStorage from '@react-native-async-storage/async-storage';
import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import AskFeedID from '~/components/AskFeedID';
import GraphScreen from '~/components/Graph';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import { translations } from '~/utils/translations';

const FEED_ID_REGEX = /^\d{5,}$/;

export default function HumidityScreen() {
  const [feedIDExists, setFeedIDExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkFeedID = async () => {
      try {
        const feedID = await AsyncStorage.getItem('feedID');
        setFeedIDExists(!!feedID && FEED_ID_REGEX.test(feedID));
      } catch (e) {
        setError(translations.feedIdError + e);
      } finally {
        setIsLoading(false);
      }
    };

    checkFeedID();
  }, []);

  const handleFeedIDSubmit = async (feedID: string) => {
    try {
      if (!FEED_ID_REGEX.test(feedID)) {
        throw new Error('Besleme Kimliği en az 5 basamaklı bir numerik değer olmalıdır');
      }

      await AsyncStorage.setItem('feedID', feedID);
      setFeedIDExists(true);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : translations.feedIdError);
    }
  };

  if (isLoading) {
    return (
      <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Text>{translations.loading}</Text>
      </VStack>
    );
  }

  if (error) {
    return (
      <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Text className="text-red-500">{error}</Text>
      </VStack>
    );
  }

  return (
    <>
      <Stack.Screen name="Isı" />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        {!feedIDExists ? (
          <AskFeedID onSubmit={handleFeedIDSubmit} onError={(message) => setError(message)} />
        ) : (
          <>
            <Text className="text-typography-500">{translations.humidityGraph}</Text>
            <GraphScreen graphType="humidity" />
          </>
        )}
      </VStack>
    </>
  );
}
