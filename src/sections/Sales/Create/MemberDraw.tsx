import type { SortOrder } from 'src/routes/hooks/useQuery';

import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Drawer from '@mui/material/Drawer';
import TableBody from '@mui/material/TableBody';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import TableContainer from '@mui/material/TableContainer';

import { useQuery } from 'src/routes/hooks';

import { ScrollBar } from 'src/components/ScrollBar';
import { LoadingScreen } from 'src/components/loading-screen';
import {
  useTable,
  TableNoData,
  TableHeadCustom,
  TablePaginationCustom,
} from 'src/components/Table';

import { FETCH_MEMBERS_QUERY } from '../../Members/query';
import MemberTableRow from '../../Members/List/MemberTableRow';
// import MemberTableFiltersResult from '../../Members/List/MemberTableFiltersResult';

import type { IMemberPrismaFilter, IMemberTableFilters } from '../../Members/List/types';

interface Props {
  isOpen: boolean;
  changeStatus: Function;
  selectedMembers: Function;
}

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
];

const defaultFilter: IMemberTableFilters = {
  search: '',
  status: 'inactive',
};

export default function MemberListDraw({ isOpen, changeStatus, selectedMembers }: Props) {
  const table = useTable();

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IMemberTableFilters>();

  const {
    page = { page: 1, pageSize: 10 },
    sort = { createdAt: 'asc' },
    filter = defaultFilter,
  } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IMemberPrismaFilter = {};
    if (filter.search) {
      filterObj.OR = [
        { name: { contains: filter.search } },
        { email: { contains: filter.search } },
        { status: 'active' },
      ];
    }

    return filterObj;
  }, [filter]);

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { loading, data } = useGraphQuery(FETCH_MEMBERS_QUERY, {
    variables: {
      page: page && `${page.page},${page.pageSize}`,
      filter: graphQueryFilter,
      sort: graphQuerySort,
    },
  });

  const canReset = !!filter.search;

  const tableData = data?.members;

  const notFound = (canReset && !tableData?.members?.length) || !tableData?.members?.length;

  return (
    <Drawer
      open={isOpen}
      anchor="right"
      slotProps={{ backdrop: { invisible: true } }}
      PaperProps={{
        sx: {
          width: 1300,
          p: 1,
        },
      }}
    >
      <Card>
        <Stack sx={{ p: 2, pl: 1 }}>
          <Typography variant="subtitle1">Member List</Typography>
        </Stack>
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                      action={false}
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
      <Stack sx={{ pt: 2 }} alignItems="flex-end">
        <LoadingButton
          variant="contained"
          onClick={() => {
            selectedMembers(table.selected);
            changeStatus(false);
          }}
        >
          Select
        </LoadingButton>
      </Stack>
    </Drawer>
  );
}
