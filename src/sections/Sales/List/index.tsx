import type { LabelColor } from 'src/components/Label';
import type {
  GridColDef,
  GridSortModel,
  GridFilterModel,
  GridColumnVisibilityModel,
} from '@mui/x-data-grid';

import { useMemo, useState, useCallback } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { alpha } from '@mui/material/styles';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import { DataGrid, gridClasses } from '@mui/x-data-grid';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';
import { useRouter, useDataGridQuery } from 'src/routes/hooks';

import { debounce } from 'src/utils/debounce';
import { parseFilter } from 'src/utils/parseFilter';
import { fDate, fTime } from 'src/utils/format-time';

import { DashboardContent } from 'src/layouts/dashboard';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { EmptyContent } from 'src/components/EmptyContent';
import { DataGridSkeleton, DataGridPagination } from 'src/components/DataGrid';

import { FETCH_SALES_QUERY, FETCH_SALES_STATS_QUERY } from '../query';

import type { SaleRole } from './types';

// ----------------------------------------------------------------------

const STATUS_OPTIONS: { value: SaleRole; label: string; color: LabelColor }[] = [
  { value: 'all', label: 'All', color: 'info' },
  { value: 'inactive', label: 'Inactive', color: 'error' },
];

// const defaultFilter: ISaleTableFilters = {
//   search: '',
//   status: 'all',
// };

export default function SaleListView() {
  const router = useRouter();
  const [status, setStatus] = useState('all');

  const columns: GridColDef[] = useMemo(
    () => [
      { field: 'invoiceNo', headerName: 'No', width: 100 },
      {
        field: 'username',
        headerName: 'Username',
        flex: 1,
        renderCell: (params) => (
          <ListItemText
            primary={params.row.member?.username}
            secondary={params.row.member?.email}
            primaryTypographyProps={{ typography: 'body2' }}
            secondaryTypographyProps={{
              component: 'span',
              color: 'text.disabled',
            }}
          />
        ),
      },
      {
        field: 'mobile',
        headerName: 'Mobile',
        width: 130,
        renderCell: (params) => params.row.member?.mobile,
      },
      {
        field: 'assetId',
        headerName: 'Asset ID',
        width: 130,
        renderCell: (params) => params.row.member?.assetId,
      },
      {
        field: 'productName',
        headerName: 'Product Name',
        width: 200,
        renderCell: (params) => params.row.package?.productName,
      },
      { field: 'paymentMethod', headerName: 'Payment Method', flex: 1 },
      {
        field: 'amount',
        headerName: 'Amount',
        width: 140,
        renderCell: (params) => params.row.package?.amount,
      },
      {
        field: 'hashPower',
        headerName: 'Hash Power',
        width: 95,
        renderCell: (params) => params.row.package?.token,
      },
      {
        field: 'orderedAt',
        headerName: 'Ordered At',
        width: 95,
        renderCell: (params) => (
          <ListItemText
            primary={fDate(params.row.orderedAt)}
            secondary={fTime(params.row.orderedAt)}
            primaryTypographyProps={{ typography: 'caption', noWrap: true }}
            secondaryTypographyProps={{
              component: 'span',
              typography: 'caption',
            }}
          />
        ),
      },
      {
        field: 'status',
        headerName: 'Status',
        width: 95,
        renderCell: (params) => (
          <>
            {params.row.status ? (
              <Label variant="soft" color="success">
                active
              </Label>
            ) : (
              <Label variant="soft" color="error">
                inactive
              </Label>
            )}
          </>
        ),
      },
      {
        field: 'action',
        headerName: 'Action',
        width: 70,
        renderCell: (params) => (
          <IconButton
            onClick={() => {
              router.push(`${paths.dashboard.sales.edit(params.row.id)}`);
            }}
          >
            <Iconify icon="solar:pen-2-bold" />
          </IconButton>
        ),
      },
    ],
    [router]
  );

  const [columnVisibilityModel, setColumnVisibilityModel] = useState<GridColumnVisibilityModel>();

  const [query, { setPage, setPageSize, setSort, setFilter }] = useDataGridQuery<GridFilterModel>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = [{ field: 'invoiceNo', sort: 'asc' }],
    filter,
  } = query;

  const graphQueryFilter = useMemo(
    // () => parseFilter({ paymentMethod: { contains: filter.search, mode: 'insensitive' } }, filter),
    () =>
      parseFilter(
        {
          status: status === 'all',
          OR: filter?.items.map((item) => ({
            [item.field]: { [item.operator]: item.value, mode: 'insensitive' },
          })),
        },
        filter
      ),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [status, filter]
  );

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return sort.map(({ field, sort: order }) => `${order === 'asc' ? '' : '-'}${field}`).join(',');
  }, [sort]);

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
  const tableData = data?.sales.sales ?? [];

  const handleTabChange = (event: React.SyntheticEvent, newValue: SaleRole) => {
    // setQuery({
    //   ...query,
    //   filter: { ...filter, status: newValue },
    //   page: { page: 1, pageSize: query.page?.pageSize ?? 10 },
    // });
    setStatus(newValue);
    setPage(1);
    setPageSize(query.page?.pageSize ?? 10);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedFilterChange = useCallback(
    debounce((value) => {
      setFilter(value);
    }, 500),
    [setFilter]
  );

  const onFilterChange = useCallback(
    (filterModel: GridFilterModel) => {
      debouncedFilterChange(
        ['isEmpty', 'isNotEmpty'].includes(filterModel.items?.[0]?.operator) ||
          filterModel.items?.[0]?.value !== undefined
          ? filterModel
          : {}
      );
    },
    [debouncedFilterChange]
  );

  const onSortChange = useCallback(
    (newSortModel: GridSortModel) => {
      setSort(newSortModel);
    },
    [setSort]
  );

  const paginationModel = useMemo(() => ({ page: page.page - 1, pageSize: page.pageSize }), [page]);

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
          value={status}
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
                <Label variant={(tab.value === 'all' && 'filled') || 'soft'} color={tab.color}>
                  {statsData ? statsData[tab.value].total! : 0}
                </Label>
              }
            />
          ))}
        </Tabs>
        <DataGrid
          loading={loading}
          rows={tableData}
          columns={columns}
          density="standard"
          filterMode="server"
          onFilterModelChange={onFilterChange}
          initialState={{ filter: { filterModel: filter } }}
          sortModel={sort.map((item) => ({ ...item, sort: item.sort === 'asc' ? 'desc' : 'asc' }))}
          onSortModelChange={onSortChange}
          rowCount={data?.sales.total!}
          paginationMode="server"
          pageSizeOptions={[10, 25, 50, 100]}
          paginationModel={paginationModel}
          onRowClick={(params) => window.open(paths.dashboard.reward.detail(params.row.id))}
          onPaginationModelChange={({ page: newPage, pageSize }) => {
            if (newPage + 1 !== page.page) {
              setPage(newPage + 1);
            }
            if (pageSize !== page.pageSize) {
              setPageSize(pageSize);
            }
          }}
          columnVisibilityModel={columnVisibilityModel}
          onColumnVisibilityModelChange={(newModel) => setColumnVisibilityModel(newModel)}
          slots={{
            noRowsOverlay: () => <EmptyContent />,
            noResultsOverlay: () => <EmptyContent title="No statistics found" />,
            loadingOverlay: DataGridSkeleton,
            pagination: DataGridPagination,
          }}
          sx={{
            [`& .${gridClasses.cell}`]: { alignItems: 'center', display: 'inline-flex' },
            cursor: 'pointer',
          }}
        />
      </Card>
    </DashboardContent>
  );
}
