import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { AreaDataWithTimestamp } from '@/types/areaDataTypes';
import { Button } from './ui/button';

enum Property {
  Temperature = 'tem1',
  Humidity = 'hum1',
  FMW = 'FMW',
  TMS = 'TMS',
  Bvol = 'bvol',
  Solr = 'solr',
  Wind = 'wind',
  Wins = 'wins',
  Lwet = 'lwet',
}

const Chart = ({ data }: { data: AreaDataWithTimestamp[] }) => {
  const [activeProperty, setActiveProperty] = useState<Property>(
    Property.Temperature
  );
  const [xAxisData, setXAxisData] = useState<string[]>([]);
  const [chartData, setChartData] = useState<number[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setXAxisData(
        data
          .map((item) => {
            return item.timestamp;
          })
          .reverse()
      );
      setChartData(
        data
          .map((item) => {
            return item[activeProperty];
          })
          .reverse()
      );
    }
  }, [data, activeProperty]);

  const options = {
    title: {
      text: `Chart for ${activeProperty}`,
    },
    xAxis: {
      data: xAxisData,
    },
    yAxis: {},
    legend: {
      data: [activeProperty],
    },
    toolbox: {
      feature: {
        dataZoom: {},
        restore: {},
      },
    },
    tooltip: {},
    series: [
      {
        name: activeProperty,
        type: 'line',
        data: chartData,
      },
    ],
  };

  return (
    <div className="w-full flex flex-wrap">
      <div className="flex flex-wrap gap-4 mb-12">
        <span>Choose Property</span>
        {Object.values(Property).map((item) => (
          <Button
            variant={activeProperty === item ? 'default' : 'outline'}
            key={item}
            value={item}
            onClick={() => setActiveProperty(item)}
          >
            {item}
          </Button>
        ))}
      </div>
      <ReactECharts
        option={options}
        notMerge={true}
        lazyUpdate={true}
        className="w-full h-[400px]"
      />
    </div>
  );
};

export default Chart;
