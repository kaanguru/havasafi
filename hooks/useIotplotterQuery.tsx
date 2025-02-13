import { useQuery } from '@tanstack/react-query';
export default function useIotplotterQuery() {
  return useQuery({
    queryKey: ['timeseries'],
    queryFn: fetchTimeseries,
  });
}
async function fetchTimeseries() {
  const response = await fetch('https://iotplotter.com/api/v2/feed/234054445828562532');
  return response.json();
}
