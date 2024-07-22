import { useState, useEffect } from 'react';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { formatDate } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { ScrollBar } from 'src/components/ScrollBar';

const columns: GridColDef[] = [
  {
    field: 'issuedAt',
    flex: 1,
    headerName: 'Date',
    filterable: false,
    renderCell: (params) => formatDate(params.row.issuedAt),
  },
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
  {
    field: 'txcCold',
    width: 400,
    headerName: 'TXC Cold',
    filterable: false,
    renderCell: (params) => params.row.wallet,
  },
  {
    field: 'status',
    flex: 1,
    headerName: 'Status',
    filterable: false,
    renderCell: (params) =>
      params.row.status ? (
        <Label variant="soft" color="success">
          Active
        </Label>
      ) : (
        <Label variant="soft" color="error">
          Inactive
        </Label>
      ),
  },
];

interface Props {
  data: any[];
  blocks: number;
  memberStatistics: any[];
  getMemberStatistics: Function;
}

interface TXCSharedProps {
  memberId: string;
  txcShared: number;
}

export default function MemberStatisticsTable({
  data,
  blocks,
  memberStatistics,
  getMemberStatistics,
}: Props) {
  const [totalTXC, setTotalTXC] = useState<number>(0);

  const estimated = blocks * 254;
  const diff = (estimated - totalTXC).toFixed(8);

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
      setTotalTXC(data?.reduce((prev, { txcShared }) => prev + txcShared, 0));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );

  return (
    <Card sx={{ pt: 2 }}>
      <Typography variant="subtitle1" sx={{ ml: 2, mb: 2 }}>
        Reward
      </Typography>
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
          <Stack direction="row" display="flex" justifyContent="flex-end" spacing={2} sx={{ p: 2 }}>
            <Typography color="grey">Mined Blocks:</Typography>
            <Typography sx={{ mr: 5 }}>{blocks}</Typography>

            <Typography color="grey">Total TXC:</Typography>
            <Typography sx={{ mr: 5 }}>{estimated}</Typography>

            <Typography color="grey">TXC to reward:</Typography>
            <Typography sx={{ mr: 5 }}>{totalTXC}</Typography>

            <Typography color="grey">Diff:</Typography>
            <Typography sx={{ mr: 20 }} color={Number(diff) > 0 ? 'blue' : 'red'}>
              {diff}
            </Typography>
          </Stack>
        </ScrollBar>
      </TableContainer>
    </Card>
  );
}
