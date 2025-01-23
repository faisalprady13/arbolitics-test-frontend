import { AreaDataWithDate, AreaDataWithTimestamp } from '@/types/areaDataTypes';
import { Interval } from '@/types/intervalTypes';

const getSimplifiedTimestamp = (date: Date, interval: Interval): string => {
  switch (interval) {
    case Interval.Daily:
      return date.toISOString().split('T')[0];
    case Interval.Weekly:
      return date.toISOString().slice(0, 7);
    case Interval.Monthly:
      return date.toISOString().slice(0, 7);
    default:
      return date.toISOString().split('T')[0];
  }
};

const formatTimestamp = (date: Date, interval: Interval) => {
  switch (interval) {
    case Interval.Hourly: {
      return date.toLocaleString('en-GB');
    }
    case Interval.Daily: {
      const timestamp = new Date(date.getTime() - 1000);
      return timestamp.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    }
    case Interval.Weekly: {
      const timestamp = new Date(date.getTime() - 1000);
      return timestamp.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
      });
    }
    case Interval.Monthly: {
      const timestamp = new Date(date.getTime() - 1000);
      return timestamp.toLocaleDateString('en-GB', {
        year: 'numeric',
        month: '2-digit',
      });
    }
    default:
      return date.toLocaleString('en-GB');
  }
};

export const formatData = (
  data: AreaDataWithDate[],
  interval: Interval
): AreaDataWithTimestamp[] => {
  if (interval === Interval.Hourly) {
    return data.map((item) => {
      const { date, ...newItem } = item;
      return {
        ...newItem,
        timestamp: formatTimestamp(date, interval),
      };
    });
  } else {
    return simplifyData(data, interval);
  }
};

const simplifyData = (data: AreaDataWithDate[], interval: Interval) => {
  return Object.values(
    data.reduce(
      (
        result: { [key: string]: AreaDataWithDate & { count: number } },
        currentData: AreaDataWithDate
      ) => {
        const date = getSimplifiedTimestamp(currentData?.date, interval);

        if (!result[date]) {
          result[date] = {
            ...currentData,
            FMW: 0,
            TMS: 0,
            bvol: 0,
            tem1: 0,
            hum1: 0,
            solr: 0,
            prec: 0,
            wind: 0,
            wins: 0,
            lwet: 0,
            count: 0,
          };
        }

        result[date].count += 1;
        result[date].FMW += currentData.FMW;
        result[date].TMS += currentData.TMS;
        result[date].bvol += currentData.bvol;
        result[date].tem1 += currentData.tem1;
        result[date].hum1 += currentData.hum1;
        result[date].solr += currentData.solr;
        result[date].prec += currentData.prec;
        result[date].wind += currentData.wind;
        result[date].wins += currentData.wins;
        result[date].lwet += currentData.lwet;

        return result;
      },
      {}
    )
  ).map((data) => ({
    DID: data.DID,
    FMW: roundToTwoDecimals(data.FMW / data.count),
    TMS: roundToTwoDecimals(data.TMS / data.count),
    bvol: roundToTwoDecimals(data.bvol / data.count),
    tem1: roundToTwoDecimals(data.tem1 / data.count),
    hum1: roundToTwoDecimals(data.hum1 / data.count),
    solr: roundToTwoDecimals(data.solr / data.count),
    prec: roundToTwoDecimals(data.prec / data.count),
    wind: roundToTwoDecimals(data.wind / data.count),
    wins: roundToTwoDecimals(data.wins / data.count),
    lwet: roundToTwoDecimals(data.lwet / data.count),
    timestamp: formatTimestamp(data.date, interval),
  }));
};

function roundToTwoDecimals(value: number) {
  if (Number.isInteger(value)) {
    return value;
  }

  return Math.round(value * 100) / 100;
}
