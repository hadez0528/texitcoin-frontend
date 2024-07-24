import type { LabelColor } from 'src/components/Label';
import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo, useCallback } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import { alpha } from '@mui/material/styles';
import Skeleton from '@mui/material/Skeleton';
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
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/Table';

import SaleTableRow from './SaleTableRow';
import SaleTableFiltersResult from './SaleTableFiltersResult';
import { FETCH_SALES_QUERY, FETCH_SALES_STATS_QUERY } from '../query';

import type { SaleRole, ISalePrismaFilter, ISaleTableFilters } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: SaleRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

const TABLE_HEAD = [
  { id: 'invoiceNo', label: 'Invoice No', width: 130, sortable: true },
  { id: 'mobile', label: 'Mobile', width: 130, sortable: true },
  { id: 'assetId', label: 'Asset ID', width: 130, sortable: true },
  { id: 'productName', label: 'Product Name', sortable: true },
  { id: 'paymentMethod', label: 'Payment Method', sortable: true },
  { id: 'amount', label: 'Amount', width: 140, sortable: true },
  { id: 'hashPower', label: 'Hash Power', width: 130, sortable: true },
  { id: 'orderedAt', label: 'Ordered At', width: 130, sortable: true },
];

const defaultFilter: ISaleTableFilters = {
  search: '',
  status: 'all',
};

export default function SaleListView() {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] = useQuery<ISaleTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { invoiceNo: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: ISalePrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { paymentMethod: { contains: filter.search, mode: 'insensitive' } },
        { member: { username: { contains: filter.search, mode: 'insensitive' } } },
        { member: { email: { contains: filter.search, mode: 'insensitive' } } },
        { member: { mobile: { contains: filter.search, mode: 'insensitive' } } },
        { package: { productName: { contains: filter.search, mode: 'insensitive' } } },
      ];
    }

    if (filter.status === 'inactive') {
      filterObj.status = false;
    } else {
      filterObj.status = true;
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

  const { data: statsData } = useGraphQuery(FETCH_SALES_STATS_QUERY, {
    variables: {
      inactiveFilter: { status: false },
    },
  });

  const { loading, data } = useGraphQuery(FETCH_SALES_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });
  const tableData = data?.sales;

  const notFound = (canReset && !tableData?.sales?.length) || !tableData?.sales?.length;

  const handleTabChange = (event: React.SyntheticEvent, newValue: SaleRole) => {
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
        heading="Sale"
        links={[{ name: 'Sale', href: paths.dashboard.sales.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.sales.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Sale
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
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
          <SaleTableFiltersResult results={tableData!.total!} sx={{ p: 2.5, pt: 0 }} />
        )}

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={loading ? 0 : tableData!.sales!.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData!.sales!.map((row) => row!.id)
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
                <Paper sx={{ display: 'block', width: '95%', margin: 'auto' }}>
                  <Skeleton variant="text" sx={{ width: '100%', height: 60 }} />
                  <Skeleton variant="text" sx={{ width: '100%', height: 60 }} />
                  <Skeleton variant="text" sx={{ width: '100%', height: 60 }} />
                  <Skeleton variant="text" sx={{ width: '100%', height: 60 }} />
                  <Skeleton variant="text" sx={{ width: '100%', height: 60 }} />
                </Paper>
              ) : (
                <>
                  <TableHeadCustom
                    order={sort && sort[Object.keys(sort)[0]]}
                    orderBy={sort && Object.keys(sort)[0]}
                    headLabel={TABLE_HEAD}
                    rowCount={loading ? 0 : tableData!.sales!.length}
                    onSort={(id) => {
                      const isAsc = sort && sort[id] === 'asc';
                      const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                      setQuery({ ...query, sort: newSort });
                    }}
                  />
                  <TableBody>
                    {tableData!.sales!.map((row) => (
                      <SaleTableRow key={row!.id} row={row!} />
                    ))}

                    <TableNoData notFound={notFound} />
                  </TableBody>
                </>
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
