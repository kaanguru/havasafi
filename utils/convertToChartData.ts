import { format } from 'date-fns';

import { InputData, ChartData } from '~/types';

export function convertToChartData(inputData: InputData): ChartData {
  const timestamps = Object.keys(inputData).sort();

  const getTemperature = (timestamp: string) => {
    return inputData[timestamp]?.data?.Temperature;
  };

  const isValidDataPoint = (timestamp: string) => {
    const temperature = getTemperature(timestamp);
    return temperature !== undefined;
  };

  const filteredTimestamps = timestamps.filter(isValidDataPoint);

  const temperatureData = filteredTimestamps.map(
    (timestamp: string) => getTemperature(timestamp) as number
  );

  const labels = filteredTimestamps.map((timestamp: string) => {
    const date = new Date(parseFloat(timestamp) * 1000);
    return format(date, 'yyyy-MM-dd-HH:mm:ss');
  });

  return {
    labels,
    datasets: [
      {
        data: temperatureData,
      },
    ],
  };
}
