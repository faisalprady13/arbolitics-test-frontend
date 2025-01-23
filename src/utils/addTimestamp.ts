import { AreaData, AreaDataWithDate } from '@/types/areaDataTypes';

const beginDate = new Date('2025-01-01T00:00:00');

export const addTimestamp = (data: AreaData[]): AreaDataWithDate[] => {
  let currentDate = beginDate;

  let count = 2; //for 2 device
  return data.map((item) => {
    const newData = { ...item, date: new Date(currentDate) };
    count -= 1;

    if (count === 0) {
      currentDate = reduceHour(currentDate);
      count = 2;
    }
    return newData;
  });
};

const reduceHour = (date: Date): Date => {
  date.setHours(date.getHours() - 1);
  return date;
};
