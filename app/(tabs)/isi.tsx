import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, startOfToday } from 'date-fns';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Dimensions, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import colors from 'tailwindcss/colors';

import { Spinner } from '@/components/ui/spinner';
import { Button, ButtonText } from '~/components/ui/button';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import useIotplotterQuery from '~/hooks/useIotplotterQuery';
import { convertToChartData } from '~/utils/convertToChartData';
import { getEpochOfDay } from '~/utils/getEpochOfDay';

export default function IsiScreen() {
  const [selectedDate, setSelectedDate] = useState(startOfToday());

  const { isPending, isError, data, error } = useIotplotterQuery(getEpochOfDay(selectedDate));

  const handleDateChange = (event: any, newDate: Date | undefined) => {
    if (newDate) {
      setSelectedDate(newDate);
    }
  };

  const showDatePicker = () => {
    DateTimePickerAndroid.open({
      value: selectedDate,
      onChange: handleDateChange,
      mode: 'date',
      is24Hour: true,
    });
  };

  const chartConfig = {
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

  if (isPending) {
    return (
      <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Spinner size="large" color={colors.gray[500]} />
      </VStack>
    );
  }

  if (isError) {
    return (
      <VStack className="flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Text>Error: {error.message}</Text>
      </VStack>
    );
  }

  // Render the main content
  return (
    <>
      <Stack.Screen
        options={{ title: 'Isı', headerTitleStyle: { fontFamily: 'Teko_400Regular' } }}
      />
      <VStack className="items-center justify-start bg-background-light dark:bg-background-dark">
        <SafeAreaView className="my-4 flex-row items-center justify-center">
          <Button onPress={showDatePicker}>
            <ButtonText>Tarih Seçiniz</ButtonText>
          </Button>
          <Text className="mx-2 text-typography-500">
            Seçili Tarih: {format(selectedDate, 'dd. MM. yyyy')}
          </Text>
        </SafeAreaView>
        {data && (
          <LineChart
            data={{
              labels: data.labels,
              legend: ['Derece'],
              datasets: [
                {
                  data: convertToChartData(data).datasets[0].data,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height - 300}
            chartConfig={chartConfig}
            withHorizontalLabels
            bezier
          />
        )}
      </VStack>
    </>
  );
}
