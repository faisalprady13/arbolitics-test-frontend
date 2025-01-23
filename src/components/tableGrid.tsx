'use client';

import React, { useEffect, useState } from 'react';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import {
  ColDef,
  ModuleRegistry,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
  PaginationModule,
} from 'ag-grid-community';
import { AreaDataWithTimestamp } from '@/types/areaDataTypes';

ModuleRegistry.registerModules([
  PaginationModule,
  ClientSideRowModelModule,
  ColumnAutoSizeModule,
]);

const TableGrid = ({ data }: { data: AreaDataWithTimestamp[] }) => {
  const [colDefs, setColDefs] = useState<ColDef[]>([]);

  useEffect(() => {
    if (data && data.length > 0) {
      const columnNames: ColDef[] = [];
      Object.keys(data[0])
        .filter((key) => key !== 'DID')
        .map((key) => {
          columnNames.push({ field: key });
        });
      setColDefs(columnNames);
    }
  }, [data]);

  return (
    <div className="m-auto w-full h-[500px] px-4">
      <AgGridReact
        defaultColDef={{ resizable: true, cellDataType: false }}
        rowData={data}
        columnDefs={colDefs}
        pagination={true}
        paginationPageSize={10}
        paginationPageSizeSelector={[10, 20, 50]}
        rowSelection={{
          mode: 'singleRow',
        }}
        autoSizeStrategy={{ type: 'fitCellContents' }}
        onFirstDataRendered={(event) => event.api.autoSizeAllColumns()}
      />
    </div>
  );
};

export default TableGrid;
