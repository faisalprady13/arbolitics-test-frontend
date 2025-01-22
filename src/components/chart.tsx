import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import { AreaData } from '@/types/areaDataTypes';

const Chart = ({ data }: { data: AreaData[] }) => {
  const [yAxisData, setYAxisData] = useState<number[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
    }
  }, [data]);
  return (
    <div>
      {/* <ReactECharts
        option={this.getOption()}
        notMerge={true}
        lazyUpdate={true}
        theme={'theme_name'}
        onChartReady={this.onChartReadyCallback}
        onEvents={EventsDict}
        opts={}
      /> */}
    </div>
  );
};

export default Chart;
