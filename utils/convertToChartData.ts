import { format } from 'date-fns';

import { InputData, ChartData } from '~/types';

export function convertToChartData(
  inputData: InputData,
  type: 'temperature' | 'humidity' = 'temperature'
): ChartData {
  const timestamps = Object.keys(inputData).sort();

  const getValue = (timestamp: string) => {
    return type === 'temperature'
      ? inputData[timestamp]?.data?.Temperature
      : inputData[timestamp]?.data?.Humidity;
  };

  const isValidDataPoint = (timestamp: string) => {
    const value = getValue(timestamp);
    return value !== undefined;
  };

  const filteredTimestamps = timestamps.filter(isValidDataPoint);

  const valueData = filteredTimestamps.map((timestamp: string) => getValue(timestamp) as number);

  const labels = filteredTimestamps.map((timestamp: string) => {
    const date = new Date(parseFloat(timestamp) * 1000);
    return format(date, 'yyyy-MM-dd-HH:mm:ss');
  });

  return {
    labels,
    datasets: [
      {
        data: valueData,
      },
    ],
  };
}
