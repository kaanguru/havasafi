import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useContext, useEffect, useState } from 'react';

const FEED_ID_REGEX = /^\d{5,}$/;

type FeedIDContextType = {
  feedIDExists: boolean;
  isLoading: boolean;
  error: string | null;
  handleFeedIDSubmit: (feedID: string) => Promise<void>;
};

const FeedIDContext = createContext<FeedIDContextType>({
  feedIDExists: false,
  isLoading: true,
  error: null,
  handleFeedIDSubmit: async () => {},
});

export function FeedIDProvider({ children }: { children: React.ReactNode }) {
  const [feedIDExists, setFeedIDExists] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkFeedID = async () => {
      try {
        const feedID = await AsyncStorage.getItem('feedID');
        setFeedIDExists(!!feedID && FEED_ID_REGEX.test(feedID));
      } catch (e) {
        setError('Cihaz verilerinin yüklenmesinde hata oluştu' + e);
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
      setError(e instanceof Error ? e.message : 'Besleme kimliği kaydedilirken bir hata oluştu');
    }
  };

  return (
    <FeedIDContext.Provider value={{ feedIDExists, isLoading, error, handleFeedIDSubmit }}>
      {children}
    </FeedIDContext.Provider>
  );
}

export const useFeedID = () => useContext(FeedIDContext);
