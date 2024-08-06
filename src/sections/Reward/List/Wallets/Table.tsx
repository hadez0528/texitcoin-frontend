import type { GridColDef, GridColumnVisibilityModel } from '@mui/x-data-grid';

import { useMemo, useState } from 'react';

import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { EmptyContent } from 'src/components/EmptyContent';
import { DataGridSkeleton } from 'src/components/DataGrid';

interface Props {
  loading: boolean;
  data: any[];
}

export default function Table({ loading, data }: Props) {
  const columns: GridColDef[] = useMemo(
    () => [
      {
        field: 'method',
        headerName: 'Method',
        width: 300,
        renderCell: (params) => params.row.wallet.payout.method,
      },
      {
        field: 'address',
        headerName: 'Address',
        flex: 1,
        renderCell: (params) => params.row.wallet.address,
      },
      {
        field: 'txc',
        headerName: 'TXC Shared',
        width: 500,
        renderCell: (params) => params.row.txc / 10 ** 8,
      },
    ],
    []
  );

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  return (
    <DataGrid
      loading={loading}
      rows={data}
      columns={columns}
      density="compact"
      filterMode="client"
      getRowId={(params) => params.wallet.id}
      columnVisibilityModel={columnVisibilityModel}
      onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
      rowSelection={false}
      hideFooterPagination
      slots={{
        noRowsOverlay: () => <EmptyContent />,
        noResultsOverlay: () => <EmptyContent title="No statistics found" />,
        loadingOverlay: DataGridSkeleton,
      }}
      sx={{
        [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' },
      }}
    />
  );
}
