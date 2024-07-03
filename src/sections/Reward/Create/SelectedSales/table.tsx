// import type { MemberStatistics } from 'src/__generated__/graphql';

import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { ScrollBar } from 'src/components/ScrollBar';

const columns: GridColDef[] = [
  { field: 'issuedAt', flex: 1, headerName: 'Date', filterable: false },
  { field: 'username', flex: 1, headerName: 'Username', filterable: false },
  { field: 'hashPower', flex: 1, headerName: 'Hash Power', filterable: false },
  {
    field: 'percent',
    flex: 1,
    headerName: 'Percent',
    filterable: false,
    renderCell: (params) => `${params.row.percent} %`,
  },
  {
    field: 'txcShared',
    flex: 1,
    headerName: 'TXC Shared',
    editable: true,
    filterable: false,
    renderCell: (params) => Number(params.row.txcShared),
  },
  { field: 'txcCold', width: 400, headerName: 'TXC Cold', filterable: false },
  {
    field: 'status',
    flex: 1,
    headerName: 'Status',
    filterable: false,
    renderCell: (params) => (params.row.status ? 'active' : 'inactive'),
  },
];

interface Props {
  data: any[];
  memberStatistics: any[];
  getMemberStatistics: Function;
}

interface TXCSharedProps {
  memberId: string;
  txcShared: number;
}

export default function MemberStatisticsTable({
  data,
  memberStatistics,
  getMemberStatistics,
}: Props) {
  const [totalTXC, setTotalTXC] = useState<number>(0);
  const [estimated, setEstimated] = useState<number>(0);

  const memberStatisticsData = data?.reduce(
    (prev, { memberId, ...rest }) => ({ ...prev, [memberId]: { memberId, ...rest } }),
    {}
  );

  const changeData = ({ memberId, txcShared }: TXCSharedProps) => {
    const oldValue = memberStatisticsData[memberId].txcShared;
    const newData: any[] = Object.values(memberStatisticsData);
    if (oldValue !== Number(txcShared)) {
      memberStatisticsData[memberId].txcShared = Number(txcShared);
      getMemberStatistics(newData);
    }

    setTotalTXC(newData.reduce((prev, item) => prev + item.txcShared, 0));
  };

  useEffect(
    () => {
      setEstimated(data?.reduce((prev, { txcShared }) => prev + txcShared, 0));
      setTotalTXC(data?.reduce((prev, { txcShared }) => prev + txcShared, 0));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <Card sx={{ pt: 2 }}>
      <Grid container>
        <Grid xl={6}>
          <Typography variant="subtitle1" sx={{ ml: 2, mb: 2 }}>
            Selected Sales
          </Typography>
        </Grid>
        <Grid xl={6}>
          <Stack direction="row" gap={2}>
            <Typography variant="subtitle1">Estimated TXC Shared:</Typography>
            <Typography>{estimated}</Typography>
            <Typography variant="subtitle1">Diff:</Typography>
            <Typography>{estimated - totalTXC}</Typography>
          </Stack>
        </Grid>
      </Grid>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <ScrollBar>
          <DataGrid
            rows={memberStatistics.length ? memberStatistics : data}
            columns={columns}
            loading={!data.length}
            hideFooterPagination
            onStateChange={(params) =>
              params.rowSelection.length &&
              changeData({
                memberId: params.rowSelection,
                txcShared: params.rows.dataRowIdToModelLookup[params.rowSelection]?.txcShared,
              })
            }
          />
        </ScrollBar>
      </TableContainer>
    </Card>
  );
}
