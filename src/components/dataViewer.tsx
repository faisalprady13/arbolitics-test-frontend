import {
  AreaDataWithDate,
  AreaDataWithTimestamp,
  Device,
} from '@/types/areaDataTypes';
import React, { useEffect, useState } from 'react';
import TableGrid from './tableGrid';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import Chart from './chart';
import { addTimestamp } from '@/utils/addTimestamp';
import { Interval } from '@/types/intervalTypes';
import { formatData } from '@/utils/formatData';

const DataViewer = () => {
  const [data, setData] = useState<AreaDataWithDate[]>([]);
  const [filteredData, setFilteredData] = useState<AreaDataWithTimestamp[]>([]);
  const [device, setDevice] = useState<Device>(Device.Type1);
  const [dataInterval, setDataInterval] = useState<Interval>(Interval.Hourly);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/getArboliticsDataset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_id: 10,
          limit: 10000,
          newEndpoint: true,
        }),
      });
      const data = await res?.json();

      if (data) {
        const dataWithDate = addTimestamp(data);
        setData(dataWithDate);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredByDevice = data.filter((item) => item.DID === device);

    const simplifiedData = formatData(filteredByDevice, dataInterval);

    setFilteredData(simplifiedData);
  }, [data, dataInterval, device]);

  return (
    <Card className="w-full max-w-screen-lg m-auto md:px-2 md:py-4">
      <CardHeader>
        <p className="font-semibold text-xl">Data Viewer</p>
      </CardHeader>

      <CardContent>
        <div className="flex flex-wrap gap-4 mb-4">
          <span>Choose Device</span>
          {Object.values(Device).map((item) => (
            <Button
              variant={device === item ? 'default' : 'outline'}
              key={item}
              value={item}
              onClick={() => setDevice(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="flex flex-wrap gap-4 mb-4">
          <span>Choose Interval</span>
          {Object.values(Interval).map((item) => (
            <Button
              variant={dataInterval === item ? 'default' : 'outline'}
              key={item}
              value={item}
              onClick={() => setDataInterval(item)}
            >
              {item}
            </Button>
          ))}
        </div>
        <div className="w-full flex flex-wrap">
          <div className="w-full">
            <Chart data={filteredData} />
          </div>
          <div className="w-full">
            <TableGrid data={filteredData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataViewer;
