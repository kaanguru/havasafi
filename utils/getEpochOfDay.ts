export function getEpochOfDay(day: any): number {
  return Math.floor(day.getTime() / 1000);
}
