import { Stack } from 'expo-router';
import { Dimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import colors from 'tailwindcss/colors';

import { Spinner } from '@/components/ui/spinner';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import useIotplotterQuery from '~/hooks/useIotplotterQuery';
import { convertToChartData } from '~/utils/convertToChartData';

export default function Home() {
  const { isPending, isError, data, error } = useIotplotterQuery();
  const chartConf = {
    backgroundGradientFrom: '#5B150B',
    backgroundGradientTo: '#E43921',
    decimalPlaces: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,

    style: {
      borderRadius: 16,
    },
    propsForDots: {
      r: '1',
      strokeWidth: '1',
      stroke: '#aaff26',
    },
  };
  return (
    <>
      <Stack.Screen
        options={{ title: 'Isı', headerTitleStyle: { fontFamily: 'Teko_400Regular' } }}
      />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        {isPending && <Spinner size="large" color={colors.gray[500]} />}
        {isError && <Text>Error: {error.message}</Text>}
        {data && (
          <LineChart
            data={{
              labels: data.labels,
              legend: ['derece'],
              datasets: [
                {
                  data: convertToChartData(data).datasets[0].data,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height - 200}
            chartConfig={chartConf}
            withHorizontalLabels
            bezier
          />
        )}
      </VStack>
    </>
  );
}
