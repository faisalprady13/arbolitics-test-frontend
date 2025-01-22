import { AreaData, Device } from '@/types/areaDataTypes';
import React, { useEffect, useState } from 'react';
import TableGrid from './tableGrid';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader } from './ui/card';
import Chart from './chart';

const DataViewer = () => {
  const [data, setData] = useState<AreaData[]>([]);
  const [selectedData, setSelectedData] = useState<AreaData[]>([]);
  const [device, setDevice] = useState<Device | null>(Device.type1);

  useEffect(() => {
    const fetchData = async () => {
      console.log('fetch here');
      const res = await fetch('/api/getArboliticsDataset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          location_id: 10,
          limit: 1000,
          newEndpoint: true,
        }),
      });
      const data = await res?.json();

      if (data) {
        setData(data);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    setSelectedData(data.filter((item) => item.DID === device));
  }, [data, device]);

  return (
    <Card className="w-full max-w-screen-lg m-auto">
      <CardHeader>
        <p className="font-semibold text-xl">Data Viewer</p>
      </CardHeader>

      <CardContent>
        <div className="flex gap-4 mb-4">
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
        <div className="w-full flex flex-wrap">
          <div className="w-full">
            <p> Table </p>
            <TableGrid data={selectedData} />
          </div>
          <div>
            <p>chart</p>
            <Chart data={selectedData} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DataViewer;
