import type {
  IStatisticsTableFilters,
  IStatisticsPrismaFilter,
} from 'src/sections/Reward/List/types';

import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Grid from '@mui/material/Unstable_Grid2';
import TableBody from '@mui/material/TableBody';
import CardHeader from '@mui/material/CardHeader';
import TableContainer from '@mui/material/TableContainer';

import { useQuery, type SortOrder } from 'src/routes/hooks';

import { ScrollBar } from 'src/components/ScrollBar';
import { LoadingScreen } from 'src/components/loading-screen';
import { useTable, TableHeadCustom, TablePaginationCustom } from 'src/components/Table';

import { FETCH_STATISTICS_QUERY } from '../query';
import StatisticsTableRow from './StatisticsTableRow';

const TABLE_HEAD = [
  { id: 'issuedAt', label: 'Date', sortable: true },
  { id: 'newBlocks', label: 'New Blocks', sortable: true },
  { id: 'totalBlocks', label: 'Total Blocks', sortable: true },
  { id: 'totalHashPower', label: 'Total Hash Power', sortable: true },
  { id: 'totalMembers', label: 'Total Members', sortable: true },
  { id: 'txcShared', label: 'TXC Shared', sortable: true },
  { id: 'diff', label: 'Doff', sortable: true },
  { id: 'from', label: 'From', sortable: true },
  { id: 'to', label: 'To', sortable: true },
  { id: 'status', label: 'Status', sortable: true },
];

const defaultFilter: IStatisticsTableFilters = {
  search: '',
};

export default function StatisticsTable() {
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
        <CardHeader title="Reward" />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : statistics!.length}
                onSort={(id) => {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }}
              />

              {loading ? (
                <LoadingScreen />
              ) : (
                <TableBody>
                  {statistics!.map((row) => (
                    <StatisticsTableRow key={row!.id} row={row!} />
                  ))}
                </TableBody>
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
  );
}
