import type { IStatisticsTableFilters } from 'src/sections/Reward/List/types';

import { useMemo, useState, useEffect } from 'react';
import { useMutation, useLazyQuery, useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid, type GridColDef } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { useQuery, useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

import { UPDATE_STATISTICS, FETCH_STATISTICS_QUERY, FETCH_MEMBERSTATISTICS_QUERY } from '../query';

interface Props {
  status?: boolean;
}

export default function StatisticsTable({ status = false }: Props) {
  const router = useRouter();

  const confirm = useBoolean();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [statisticsId, setStatisticsId] = useState<string>('');

  const [query, { setPage, setPageSize }] = useQuery<IStatisticsTableFilters>();

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
    {
      field: 'action',
      width: 150,
      headerName: 'Action',
      filterable: false,
      renderCell: (params) => (
        <>
          {params.row.status ? (
            <Tooltip title="View" placement="top" arrow>
              <IconButton color="success">
                <Iconify icon="solar:eye-bold" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Edit" placement="top" arrow>
              <IconButton
                color="default"
                onClick={() => router.push(paths.dashboard.reward.edit(params.row.id))}
              >
                <Iconify icon="solar:pen-2-bold" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Confirm" placement="top" arrow>
            <IconButton
              color="success"
              disabled={params.row.status}
              onClick={() => {
                setStatisticsId(params.row.id);
                setIsOpen(true);
              }}
            >
              <Iconify icon="bxs:check-circle" />
            </IconButton>
          </Tooltip>
        </>
      ),
    },
  ];

  const { page = { page: 1, pageSize: 10 }, sort = { issuedAt: 'asc' } } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const [updateStatistics] = useMutation(UPDATE_STATISTICS);

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: { ...(status && { status: true }) },
      sort: graphQuerySort,
    },
  });

  const [fetchMemberStatistics, { data: sendmanyData }] = useLazyQuery(
    FETCH_MEMBERSTATISTICS_QUERY,
    {
      variables: { filter: { statisticsId } },
    }
  );

  useEffect(() => {
    fetchMemberStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statisticsId]);

  const statistics = data?.statistics.statistics ?? [];

  const memberStatistics = sendmanyData?.memberStatistics.memberStatistics ?? [];

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...memberStatistics!.map(
      (item, index) =>
        `\\"${item?.member?.wallet}\\": ${item?.txcShared}${index === memberStatistics.length - 1 ? '}"' : ','}`
    ),
  ];

  return (
    <>
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
            />
          </Paper>
        </Card>
      </Grid>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: { xs: 1, sm: 700 } } }}
      >
        <Paper sx={{ p: 3 }}>
          <ComponentBlock
            sx={{
              display: 'block',
              alignItems: 'unset',
              overflow: 'auto',
              maxHeight: 800,
              backgroundColor: '#f2f2f2',
            }}
          >
            {sendmany.length === 1 ? (
              <LoadingScreen />
            ) : (
              sendmany.map((item) => <Typography variant="body1">{item}</Typography>)
            )}
          </ComponentBlock>
          <Paper sx={{ textAlign: 'right' }}>
            <ButtonGroup sx={{ mt: 2 }} variant="contained" color="success">
              <Button onClick={() => confirm.onTrue()}>Confirm</Button>
            </ButtonGroup>
          </Paper>
        </Paper>
      </Drawer>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse();

              updateStatistics({
                variables: { data: { id: statisticsId, status: true } },
              });

              router.refresh();
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
