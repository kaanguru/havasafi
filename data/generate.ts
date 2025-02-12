import { faker } from '@faker-js/faker';

interface DataItem {
  value: number;
  epoch?: number;
}

interface GeneratedData {
  data: {
    KALITE: DataItem[];
    ISI: DataItem[];
  };
}
const fakeTimeStamp = Math.floor(faker.date.recent().getTime() / 1000);
function generateData(): GeneratedData {
  return {
    data: {
      KALITE: [
        {
          value: faker.number.float({
            min: 0,
            max: 100,
            fractionDigits: 1,
          }),
          epoch: fakeTimeStamp,
        },
      ],
      ISI: [
        {
          value: faker.number.int({
            min: 1,
            max: 33,
          }),
          epoch: fakeTimeStamp,
        },
      ],
    },
  };
}

// Example usage:
const data = generateData();
console.log(JSON.stringify(data, null, 2));
