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

import { FETCH_BLOCKS_QUERY } from 'src/sections/Statistics/query';

import BlocksTableRow from './BlocksRowTable';
import { FETCH_STATISTICS_QUERY } from '../query';

import type { IBlockTableFilters } from './types';

const TABLE_HEAD = [
  { id: 'blockNo', label: 'Block', sortable: true },
  { id: 'hashRate', label: 'Hash Rate', sortable: true },
  { id: 'difficulty', label: 'Difficulty', sortable: true },
  { id: 'issuedAt', label: 'Issued At', sortable: true },
];

interface Props {
  id: string;
}

export default function BlocksTable({ id }: Props) {
  const table = useTable({ defaultDense: true });

  const [query, { setQueryParams: setQuery, setPage, setPageSize }] =
    useQuery<IBlockTableFilters>();

  const { page = { page: 1, pageSize: 5 }, sort = { issuedAt: 'asc' } } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, { variables: { filter: { id } } });

  const statistics = data?.statistics.statistics ?? [];

  const { loading, data: blocksData } = useGraphQuery(FETCH_BLOCKS_QUERY, {
    variables: {
      filter: { period: [statistics[0]?.from, statistics[0]?.to] },
      sort: graphQuerySort,
    },
  });

  const blocks = blocksData?.blocks.blocks ?? [];

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
        <CardHeader title="Reward" sx={{ mb: 3 }} />
        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
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
                    rowCount={loading ? 0 : blocksData?.blocks.blocks!.length}
                    onSort={(currentId) => {
                      const isAsc = sort && sort[currentId] === 'asc';
                      const newSort = { [id]: isAsc ? 'desc' : ('asc' as SortOrder) };
                      setQuery({ ...query, sort: newSort });
                    }}
                  />
                  <TableBody>
                    {blocks!.map((row) => (
                      <BlocksTableRow key={row!.id} row={row!} />
                    ))}
                  </TableBody>
                </>
              )}
            </Table>
          </ScrollBar>
        </TableContainer>

        <TablePaginationCustom
          count={loading ? 0 : blocksData?.blocks!.total!}
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
