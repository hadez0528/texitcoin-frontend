import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useCallback } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import TableContainer from '@mui/material/TableContainer';

import { paths } from 'src/routes/paths';
import { useQuery } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { useBoolean } from 'src/hooks/useBoolean';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
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

import MemberTableRow from './MemberTableRow';
import MemberTableFiltersResult from './MemberTableFiltersResult';
import { FETCH_MEMBERS_QUERY, FETCH_MEMBER_STATS_QUERY } from '../query';

import type { MemberRole, IMemberPrismaFilter, IMemberTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: MemberRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'name', label: 'Name', sortable: true },
  { id: 'fullName', label: 'Full Name', width: 130, sortable: true },
  { id: 'mobile', label: 'Mobile', width: 130, sortable: true },
  { id: 'address', label: 'Address', width: 130, sortable: true },
  { id: 'assetId', label: 'AssetID', width: 130, sortable: true },
  { id: 'txcPayout', label: 'TXC Payout', width: 200, sortable: true },
  { id: 'txcCold', label: 'TXC Cold', width: 130, sortable: true },
  { id: 'createdAt', label: 'Created At', width: 140, sortable: true },
  { id: 'deletedAt', label: 'Status', width: 95, sortable: true },
  { id: 'action', label: 'Action', width: 50 },
];

const defaultFilter: IMemberTableFilters = {
  search: '',
  status: 'all',
};

export default function MemberListView() {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IMemberTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'desc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IMemberPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { username: { contains: filter.search } },
        { email: { contains: filter.search } },
      ];
    }

    if (filter.status === 'inactive') {
      filterObj.deletedAt = { not: null };
    }

    return filterObj;
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const confirm = useBoolean();

  const canReset = !!filter.search;

  const { data: statsData } = useGraphQuery(FETCH_MEMBER_STATS_QUERY, {
    variables: {
      inactiveFilter: { deletedAt: { not: null } },
    },
  });

  const { loading, data } = useGraphQuery(FETCH_MEMBERS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const tableData = data?.members;

  const notFound = (canReset && !tableData?.members?.length) || !tableData?.members?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: MemberRole) => {
    setQuery({
      ...query,
      filter: { ...filter, status: newValue },
      page: { page: 1, pageSize: query.page?.pageSize ?? 10 },
    });
  };

  const handleSearchChange = useCallback(
    (value: string) => {
      setQuery({ ...query, filter: { ...filter, search: value } });
    },
    [setQuery, query, filter]
  );

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Member"
        links={[{ name: 'Member', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.members.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Member
          </Button>
        }
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <Card>
        <Tabs
          value={filter.status}
          onChange={handleTabChange}
          sx={{
            px: 2.5,
            boxShadow: (theme) => `inset 0 -2px 0 0 ${alpha(theme.palette.grey[500], 0.08)}`,
          }}
        >
          {STATUS_OPTIONS.map((tab) => (
            <Tab
              key={tab.value}
              iconPosition="end"
              value={tab.value}
              label={tab.label}
              icon={
                <Label
                  variant={(tab.value === filter.status && 'filled') || 'soft'}
                  color={tab.color}
                >
                  {statsData ? statsData[tab.value].total! : 0}
                </Label>
              }
            />
          ))}
        </Tabs>

        <SearchInput search={filter.search} onSearchChange={handleSearchChange} />

        {canReset && !loading && (
          <MemberTableFiltersResult results={tableData!.total!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={loading ? 0 : tableData!.members!.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData!.members!.map((row) => row!.id)
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
              <TableHeadCustom
                order={sort && sort[Object.keys(sort)[0]]}
                orderBy={sort && Object.keys(sort)[0]}
                headLabel={TABLE_HEAD}
                rowCount={loading ? 0 : tableData!.members!.length}
                numSelected={table.selected.length}
                onSort={(id) => {
                  const isAsc = sort && sort[id] === 'asc';
                  const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                  setQuery({ ...query, sort: newSort });
                }}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData!.members!.map((row) => row!.id)
                  )
                }
              />

              {loading ? (
                <LoadingScreen />
              ) : (
                <TableBody>
                  {tableData!.members!.map((row) => (
                    <MemberTableRow
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
          count={loading ? 0 : tableData!.total!}
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
