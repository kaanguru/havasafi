import AsyncStorage from '@react-native-async-storage/async-storage';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import { format, startOfToday } from 'date-fns';
import { AlertCircle, Calendar } from 'lucide-react-native';
import { useState } from 'react';
import { Alert, Dimensions, SafeAreaView } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import colors from 'tailwindcss/colors';

import ErrorState from './ErrorState';

import { Button, ButtonIcon, ButtonText } from '~/components/ui/button';
import { Spinner } from '~/components/ui/spinner';
import { Text } from '~/components/ui/text';
import { VStack } from '~/components/ui/vstack';
import useIotplotterQuery from '~/hooks/useIotplotterQuery';
import { convertToChartData } from '~/utils/convertToChartData';
import { getEpochOfDay } from '~/utils/getEpochOfDay';

export default function GraphScreen({ graphType }: { graphType: 'temperature' | 'humidity' }) {
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
  const resetFeedID = async () => {
    try {
      await AsyncStorage.removeItem('feedID');
      Alert.alert('ID sıfırlama başarılı');
    } catch (error) {
      console.error('Error resetting feedID:', error);
    }
  };
  const chartConfig = {
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    style: {
      borderRadius: 16,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 10,
      paddingRight: 10,
    },
    propsForDots: {
      r: '1',
      strokeWidth: '1',
      stroke: '#aaff26',
    },
  };
  const chartTitle = graphType === 'temperature' ? 'Isı Grafiği' : 'Nem Grafiği';
  if (isPending) {
    return (
      <VStack className=" mt-6 flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <Spinner size="large" color={colors.gray[500]} />
      </VStack>
    );
  }

  if (isError || !data) {
    return (
      <VStack className="mt-4 flex-1 items-center justify-center bg-background-light dark:bg-background-dark">
        <ErrorState
          error={
            error?.message?.includes('Nothing for that time')
              ? 'Veri bulunamadı. Lütfen daha sonra tekrar deneyiniz.'
              : 'Veri yüklenemedi. Lütfen daha sonra tekrar deneyiniz.'
          }
        />
        <Button
          onPress={resetFeedID}
          variant="outline"
          className="mt-20 bg-background-light dark:bg-background-dark">
          <ButtonIcon as={AlertCircle} size="md" />
          <ButtonText> ID'yi sıfırla ve yeniden gir</ButtonText>
        </Button>
      </VStack>
    );
  }

  return (
    <>
      <VStack className="h-full items-center justify-start bg-background-light dark:bg-background-dark">
        <SafeAreaView className="my-4 flex-row items-center justify-center">
          <Button onPress={showDatePicker}>
            <ButtonText>Tarih </ButtonText>
            <ButtonIcon as={Calendar} size="md" />
          </Button>
          <Text className="mx-2 text-typography-500">{format(selectedDate, 'dd. MM. yyyy')}</Text>
        </SafeAreaView>
        <Text bold size="lg" className=" mb-4 text-typography-500">
          {chartTitle}
        </Text>

        {data ? (
          <LineChart
            data={{
              labels: data.labels,
              datasets: [
                {
                  data: convertToChartData(data, graphType).datasets[0].data,
                },
              ],
            }}
            width={Dimensions.get('window').width}
            height={Dimensions.get('window').height}
            chartConfig={chartConfig}
            withHorizontalLabels
            bezier
          />
        ) : (
          <ErrorState error="Veri bulunamadı. Lütfen daha sonra tekrar deneyiniz." />
        )}
      </VStack>
    </>
  );
}
