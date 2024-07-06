import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import { useQuery } from 'src/routes/hooks';

import { useTable } from 'src/components/Table';

import { FETCH_BLOCKS_QUERY } from 'src/sections/Statistics/query';

import { FETCH_STATISTICS_QUERY } from '../query';

import type { IBlockTableFilters } from './types';

// const TABLE_HEAD = [
//   { id: 'blockNo', label: 'Block', sortable: true },
//   { id: 'hashRate', label: 'Hash Rate', sortable: true },
//   { id: 'difficulty', label: 'Difficulty', sortable: true },
//   { id: 'issuedAt', label: 'Issued At', sortable: true },
// ];

interface Props {
  id: string;
}

export default function BlocksTable({ id }: Props) {
  const table = useTable({ defaultDense: true });

  const [
    query,
    // { setQueryParams: setQuery, setPage, setPageSize }
  ] = useQuery<IBlockTableFilters>();

  const { page = { page: 1, pageSize: 5 }, sort = { issuedAt: 'asc' } } = query;

  const graphQuerySort = useMemo(() => {
    if (!sort) return undefined;

    return Object.entries(sort)
      .map(([key, value]) => `${value === 'asc' ? '' : '-'}${key}`)
      .join(',');
  }, [sort]);

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, { variables: { filter: { id } } });

  const statistics = data?.statistics.statistics ?? [];

  const { data: blocksData } = useGraphQuery(FETCH_BLOCKS_QUERY, {
    variables: { filter: { period: [statistics[0]?.from, statistics[0]?.to] } },
  });

  console.log('table => ', table);
  console.log(page, graphQuerySort);
  console.log('data => ', blocksData);

  return <>Blocks Table</>;
}
