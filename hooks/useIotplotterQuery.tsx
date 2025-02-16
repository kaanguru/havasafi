import { useQuery } from '@tanstack/react-query';
import { startOfToday } from 'date-fns';

import { getEpochOfDay } from '~/utils/getEpochOfDay';
import getFeedID from '~/utils/getFeedID';
const epochOfToday = getEpochOfDay(startOfToday());
const offset = 3600; // 1 saatlik verileri getir

export default function useIotplotterQuery(day?: number | undefined) {
  return useQuery({
    queryKey: ['timeseries', day],
    queryFn: () => {
      return day === undefined ? fetchTimeseries() : fetchTimeseries(day);
    },
  });
}
async function fetchTimeseries(epoch: number | undefined = epochOfToday) {
  const feedID = await getFeedID();
  const url = `https://iotplotter.com/api/v2/feed/${feedID}?epoch=${epoch}&offset=${offset}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  const responseData = await response.text();

  if (responseData.includes('Nothing for that time')) {
    throw new Error('Nothing for that time');
  }

  try {
    return JSON.parse(responseData);
  } catch (error) {
    throw new Error('Invalid data format received' + error);
  }
}
