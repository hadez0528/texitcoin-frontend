import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useCallback } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { ScrollBar } from 'src/components/ScrollBar';
import { SearchInput } from 'src/components/SearchInput';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import RewardTableRow from './RewardTableRow';
import { FETCH_STATISTICS_QUERY } from '../query';
import RewardTableFiltersResult from './RewardTableFiltersResult';

import type { IStatisticsPrismaFilter, IStatisticsTableFilters } from './types';

const TABLE_HEAD = [
  { id: 'issuedAt', label: 'Date', sortable: true },
  { id: 'newBlocks', label: 'New Blocks', width: 130, sortable: true },
  { id: 'totalBlocks', label: 'Total Blocks', width: 130, sortable: true },
  { id: 'totalHashPower', label: 'Total HashPower', width: 130, sortable: true },
  { id: 'totalMembers', label: 'Total Members', width: 130, sortable: true },
  { id: 'txcShared', label: 'TXC Shared', width: 130, sortable: true },
  { id: 'from', label: 'From', width: 200, sortable: true },
  { id: 'to', label: 'To', width: 200, sortable: true },
  { id: 'deletedAt', label: 'Status', width: 95, sortable: true },
  { id: 'action', label: 'Action', width: 50 },
];

const defaultFilter: IStatisticsTableFilters = {
  search: '',
};

export default function RewardListView() {
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

  const canReset = !!filter.search;

  const { loading, data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const tableData = data?.statistics ?? { statistics: [], total: 0 };

  const notFound = (canReset && !tableData?.statistics?.length) || !tableData?.statistics?.length;

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Reward"
        links={[{ name: 'Reward', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.reward.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Reward
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />
        {canReset && !loading && (
          <RewardTableFiltersResult results={tableData.total!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={loading ? 0 : tableData.statistics!.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.statistics!.map((row) => row!.id)
              )
            }
          />

          <ScrollBar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 960 }}>
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : tableData?.statistics?.length}
                numSelected={table.selected.length}
                onSort={(id) => {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.statistics!.map((row) => row!.id)
                  )
                }
              />

              {loading ? (
                <LoadingScreen />
              ) : (
                <TableBody>
                  {tableData.statistics!.map((row) => (
                    <RewardTableRow
                      key={row!.id}
                      row={row!}
                      selected={table.selected.includes(row!.id)}
                      onSelectRow={() => table.onSelectRow(row!.id)}
                      // onDeleteRow={() => handleDeleteRow(row.id)}
                      // onEditRow={() => handleEditRow(row.id)}
                    />
                  ))}

                  <TableNoData notFound={notFound} />
                </TableBody>
              )}
            </Table>
          </ScrollBar>
        </TableContainer>

        <TablePaginationCustom
          count={loading ? 0 : tableData.total!}
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
    </DashboardContent>
  );
}
