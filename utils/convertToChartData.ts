import * as R from 'ramda';

interface DataPoint {
  data: {
    Temperature?: number;
  };
}

interface InputData {
  [timestamp: string]: DataPoint;
}

interface ChartData {
  labels: string[];
  datasets: {
    data: number[];
  }[];
}

export function convertToChartData(inputData: InputData): ChartData {
  const timestamps = Object.keys(inputData).sort();

  const getTemperature = R.pipe(
    (timestamp: string) => inputData[timestamp],
    R.path(['data', 'Temperature']),
    R.defaultTo(undefined)
  );

  const isValidDataPoint = (timestamp: string) => {
    const temperature = getTemperature(timestamp);
    return temperature !== undefined;
  };

  const filteredTimestamps = R.filter(isValidDataPoint, timestamps);

  const temperatureData = R.map(
    (timestamp: string) => getTemperature(timestamp) as number,
    filteredTimestamps
  );

  const labels = R.map((timestamp: string) => {
    const date = new Date(parseFloat(timestamp) * 1000);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    return `${date.toLocaleDateString()}-${hours}:${minutes}:${seconds}`;
  }, filteredTimestamps);

  return {
    labels,
    datasets: [
      {
        data: temperatureData,
      },
    ],
  };
}
