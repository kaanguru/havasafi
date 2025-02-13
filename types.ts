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
export { DataPoint, InputData, ChartData };
