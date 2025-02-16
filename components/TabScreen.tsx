// app/(tabs)/TabScreen.tsx
import { Stack } from 'expo-router';
import React from 'react';

import AskFeedID from '~/components/AskFeedID';
import ErrorState from '~/components/ErrorState';
import GraphScreen from '~/components/Graph';
import LoadingState from '~/components/LoadingState';
import Logo from '~/components/Logo';
import { Box } from '~/components/ui/box';
import { VStack } from '~/components/ui/vstack';
import { useFeedID } from '~/context/FeedIDContext';

export default function TabScreen({
  screenName,
  graphType,
}: {
  screenName: string;
  graphType: 'temperature' | 'humidity';
}) {
  const { feedIDExists, isLoading, error, handleFeedIDSubmit } = useFeedID();

  if (isLoading) return <LoadingState />;
  if (error) return <ErrorState error={error} />;

  return (
    <>
      <Stack.Screen name={screenName} />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        {!feedIDExists ? (
          <>
            <Box className="h-1/3 w-full items-center justify-center">
              <Logo />
            </Box>
            <AskFeedID onSubmit={handleFeedIDSubmit} onError={(message) => message} />
          </>
        ) : (
          <GraphScreen graphType={graphType} />
        )}
      </VStack>
    </>
  );
}
