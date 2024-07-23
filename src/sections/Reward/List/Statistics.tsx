import type {
  IStatisticsTableFilters,
  IStatisticsPrismaFilter,
} from 'src/sections/Reward/List/types';

import { useMemo, useState, useEffect } from 'react';
import { useMutation, useLazyQuery, useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';

import { useQuery, type SortOrder } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { toast } from 'src/components/SnackBar';
import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import StatisticsTableRow from './StatisticsTableRow';
import {
  UPDATE_STATISTICS,
  REMOVE_STATISTICS,
  FETCH_STATISTICS_QUERY,
  FETCH_MEMBERSTATISTICS_QUERY,
} from '../query';

const TABLE_HEAD = [
  { id: 'issuedAt', label: 'Date', sortable: true },
  { id: 'newBlocks', label: 'New Blocks', sortable: true },
  { id: 'totalBlocks', label: 'Total Blocks', sortable: true },
  { id: 'totalHashPower', label: 'Total Hash Power', sortable: true },
  { id: 'totalMembers', label: 'Total Members', sortable: true },
  { id: 'txcShared', label: 'TXC Shared', sortable: true },
  { id: 'diff', label: 'Diff', sortable: true },
  { id: 'from', label: 'From', sortable: true },
  { id: 'to', label: 'To', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
  { id: 'action', label: 'Action', sortable: true, align: 'center' },
];

const defaultFilter: IStatisticsTableFilters = {
  search: '',
};

export default function StatisticsTable() {
  const [selected, setSelected] = useState<string[]>([]);
  const [statisticsId, setStatisticsId] = useState<string>('');

  const confirm = useBoolean();

  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IStatisticsTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { issuedAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IStatisticsPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [];
    }

    return filterObj;
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { loading, data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const [fetchMemberStatistics, { data: sendmanyData }] = useLazyQuery(
    FETCH_MEMBERSTATISTICS_QUERY,
    {
      variables: { filter: { statisticsId } },
    }
  );

  const [updateStatistics] = useMutation(UPDATE_STATISTICS);

  const [removeStatistics] = useMutation(REMOVE_STATISTICS, {
    awaitRefetchQueries: true,
    refetchQueries: ['Reward'],
  });

  const statistics = data?.statistics.statistics ?? [];

  useEffect(() => {
    fetchMemberStatistics();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statisticsId]);

  useEffect(() => {
    setSelected(table.selected);
  }, [table.selected]);

  const memberStatistics = sendmanyData?.memberStatistics.memberStatistics ?? [];

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
          <CardHeader title="Reward" sx={{ mb: 3 }} />
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={loading ? 0 : memberStatistics!.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  memberStatistics!.map((row) => row!.id)
                )
              }
              action={
                <Tooltip title="Delete">
                  <IconButton color="primary" onClick={confirm.onTrue}>
                    <Iconify icon="solar:trash-bin-trash-bold" />
                  </IconButton>
                </Tooltip>
              }
            />

            <ScrollBar>
              <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
                {loading ? (
                  <LoadingScreen />
                ) : (
                  <>
                    <TableHeadCustom
                      order={sort && sort[Object.keys(sort)[0]]}
                      orderBy={sort && Object.keys(sort)[0]}
                      headLabel={TABLE_HEAD}
                      rowCount={loading ? 0 : statistics!.length}
                      numSelected={table.selected.length}
                      onSort={(id) => {
                        const isAsc = sort && sort[id] === 'asc';
                        const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                        setQuery({ ...query, sort: newSort });
                      }}
                      onSelectAllRows={(checked) =>
                        table.onSelectAllRows(
                          checked,
                          memberStatistics!.map((row) => row!.id)
                        )
                      }
                    />
                    <TableBody>
                      {statistics!.map((row) => (
                        <StatisticsTableRow
                          key={row!.id}
                          row={row!}
                          confirm={confirm}
                          selected={table.selected.includes(row!.id)}
                          setSelected={setSelected}
                          statisticsId={statisticsId}
                          setStatisticsId={setStatisticsId}
                          onSelectRow={() => table.onSelectRow(row!.id)}
                          memberStatistics={memberStatistics!}
                          updateStatistics={updateStatistics}
                        />
                      ))}
                    </TableBody>
                  </>
                )}
              </Table>
            </ScrollBar>
          </TableContainer>

          <TablePaginationCustom
            count={loading ? 0 : data?.statistics!.total!}
            page={loading ? 0 : page!.page - 1}
            rowsPerPage={page?.pageSize}
            onPageChange={(_, curPage) => {
              setPage(curPage + 1);
            }}
            onRowsPerPageChange={(event) => {
              setPageSize(parseInt(event.target.value, 10));
            }}
            //
            dense={table.dense}
            onChangeDense={table.onChangeDense}
          />
        </Card>
      </Grid>

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
              removeStatistics({ variables: { data: { ids: selected } } });
              toast.success('Reward removed successfully');

              table.setSelected(() => []);

              confirm.onFalse();
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
