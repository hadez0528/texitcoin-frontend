import type { IStatisticsTableFilters } from 'src/sections/Reward/List/types';

import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/Label';

import { FETCH_STATISTICS_QUERY } from './query';

const columns: GridColDef[] = [
  {
    field: 'issuedAt',
    flex: 1,
    headerName: 'Date',
    filterable: true,
    renderCell: (params) => fDate(params.row.issuedAt),
  },
  { field: 'newBlocks', flex: 1, headerName: 'New Blocks', filterable: true },
  { field: 'totalBlocks', flex: 1, headerName: 'Total Blocks', filterable: true },
  { field: 'totalHashPower', flex: 1, headerName: 'Total Hash Power', filterable: true },
  { field: 'totalMembers', flex: 1, headerName: 'Total Members', filterable: true },
  { field: 'txcShared', flex: 1, headerName: 'TXC Shared', filterable: true },
  {
    field: 'diff',
    flex: 1,
    headerName: 'Diff',
    filterable: true,
    renderCell: (params) => params.row.newBlocks * 254 - params.row.txcShared,
  },
  {
    field: 'from',
    flex: 1,
    headerName: 'From',
    filterable: true,
    renderCell: (params) => (
      <ListItemText
        primary={fDate(params.row.from)}
        secondary={fTime(params.row.from)}
        primaryTypographyProps={{ typography: 'body2' }}
        secondaryTypographyProps={{
          component: 'span',
          color: 'text.disabled',
        }}
      />
    ),
  },
  {
    field: 'to',
    flex: 1,
    headerName: 'To',
    filterable: true,
    renderCell: (params) => (
      <ListItemText
        primary={fDate(params.row.to)}
        secondary={fTime(params.row.to)}
        primaryTypographyProps={{ typography: 'body2' }}
        secondaryTypographyProps={{
          component: 'span',
          color: 'text.disabled',
        }}
      />
    ),
  },
  {
    field: 'status',
    flex: 1,
    headerName: 'Status',
    filterable: true,
    renderCell: (params) =>
      params.row.status ? (
        <Label variant="soft" color="success">
          Confirmed
        </Label>
      ) : (
        <Label variant="soft" color="warning">
          Pending
        </Label>
      ),
  },
];

interface Props {
  status?: boolean;
}

export default function StatisticsTable({ status = false }: Props) {
  const [query, { setPage, setPageSize }] = useQuery<IStatisticsTableFilters>();

  const { page = { page: 1, pageSize: 10 }, sort = { issuedAt: 'asc' } } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: { ...(status && { status: true }) },
      sort: graphQuerySort,
    },
  });

  const statistics = data?.statistics.statistics ?? [];

  return (
    <Grid container spacing={1}>
      <Card
        sx={{
          width: '100%',
          m: 0.5,
          mt: 2,
          borderRadius: 1.5,
        }}
      >
        <Typography variant="h6" sx={{ m: 1 }}>
          Reward
        </Typography>
        <Paper>
          <DataGrid
            rows={statistics}
            columns={columns}
            loading={!statistics.length}
            pageSizeOptions={[5, 10, 25, 50, 100]}
            initialState={{ pagination: { paginationModel: { pageSize: 10 } } }}
            onPaginationModelChange={({ page: currentPage, pageSize }) => {
              setPage(currentPage);
              setPageSize(pageSize);
            }}
            onRowClick={(params) => window.open(paths.dashboard.reward.detail(params.row.id))}
            sx={{ mt: 1, cursor: 'pointer' }}
          />
        </Paper>
      </Card>
    </Grid>
  );
}
