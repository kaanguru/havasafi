import { useQuery } from '@tanstack/react-query';
import { startOfToday } from 'date-fns';

import { getEpochOfDay } from '~/utils/getEpochOfDay';
const epochOfToday = getEpochOfDay(startOfToday());
const offset = 3600; // 1 saatlik verileri getir

const feedID = '234054445828562532';

export default function useIotplotterQuery(day?: number | undefined) {
  return useQuery({
    queryKey: ['timeseries', day],
    queryFn: () => {
      return day === undefined ? fetchTimeseries() : fetchTimeseries(day);
    },
  });
}
async function fetchTimeseries(epoch: number | undefined = epochOfToday) {
  const response = await fetch(
    `https://iotplotter.com/api/v2/feed/${feedID}?epoch=${epoch}&offset=${offset}`
  );
  return response.json();
}
