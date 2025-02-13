import { Stack } from 'expo-router';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

import Logo from '~/components/Logo';
import { Box } from '~/components/ui/box';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import useIotplotterQuery from '~/hooks/useIotplotterQuery';
import { convertToChartData } from '~/utils/convertToChartData';

export default function Home() {
  const { isPending, isError, data, error } = useIotplotterQuery();

  return (
    <>
      <Stack.Screen options={{ title: 'Kalite' }} />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        <Box className="h-10 w-10 ">
          <Logo />
        </Box>

        {isPending && <Text>Loading...</Text>}
        {isError && <Text>Error: {error.message}</Text>}
        {data && <Text className="text-typography-500">Temprature</Text>}
        {data && (
          <LineChart
            data={{
              labels: data.labels,
              legend: ['Temprature'],
              datasets: [
                {
                  data: convertToChartData(data).datasets[0].data,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={220}
            chartConfig={{
              backgroundGradientFrom: '#017CEE',
              backgroundGradientTo: '#017CEE',
              decimalPlaces: 2,
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: '6',
                strokeWidth: '2',
                stroke: '#ffa726',
              },
            }}
            bezier
          />
        )}
      </VStack>
    </>
  );
}
