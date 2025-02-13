import { format } from 'date-fns';

function unixTimestampToDateString(timestamp: number): string {
  // UNIX zaman damgası saniyedeğerindeyse (biriminiz bu şekildeyse):
  const date = new Date(timestamp * 1000);
  return format(date, 'yyyy-MM-DD');
}

function unixTimestampToDateStringMS(timestamp: number): string {
  const date = new Date(timestamp);
  return format(date, 'yyyy-MM-DD');
}
export { unixTimestampToDateString, unixTimestampToDateStringMS };
// Usage:
/* const timestampSeconds = 1739318442; // 1739318442 saniye
const formattedDateSeconds = unixTimestampToDateString(timestampSeconds);
console.log(formattedDateSeconds);

const timestampMs = 1739318442.3962228; // 1739318442.3962228 milisaniye
const formattedDateMs = unixTimestampToDateStringMS(timestampMs);
console.log(formattedDateMs); */
