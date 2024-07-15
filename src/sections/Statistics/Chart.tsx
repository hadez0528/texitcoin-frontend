import type { IStatisticsFilters, IStatisticsPrismaFilter } from 'src/types/statistics';

import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';

import { useQuery } from 'src/routes/hooks';

import ChartWidget from 'src/components/ChartWidget';

import { FETCH_BLOCKS_QUERY } from './query';

const defaultFilter: IStatisticsFilters = {
  search: '',
  newBlocks: 0,
  totalBlocks: 0,
  newHashPower: 0,
  totalHashPower: 0,
  members: 0,
};

export default function Chart() {
  const [query] = useQuery<IStatisticsFilters>();

  const { filter = defaultFilter } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IStatisticsPrismaFilter = {};

    if (filter.search) {
      filterObj.OR = [{}];
    }

    return filterObj;
  }, [filter]);

  const { data: blocksData } = useGraphQuery(FETCH_BLOCKS_QUERY, {
    variables: {
      page: '1,200',
      filter: graphQueryFilter,
      sort: 'blockNo',
    },
  });

  const blocks = blocksData?.blocks ?? { blocks: [], total: 0 };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <ChartWidget
          key="hashRate"
          title="Hashrate"
          chart={{
            series: [
              {
                name: 'Hashrate',
                data: blocks!
                  .blocks!.map((item) => Math.floor((item?.hashRate! || 1) / 1000000))
                  .reverse(),
              },
            ],
            options: {
              xaxis: {
                tooltip: { enabled: false },
                tickAmount: 30,
                categories: blocks!.blocks!.map((item) => `${item?.blockNo}`).reverse(),
              },
            },
          }}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <ChartWidget
          key="difficulty"
          title="Network Difficulty"
          chart={{
            colors: ['#ffb136'],
            categories: blocks!.blocks!.map((item) => `${item?.blockNo}`).reverse(),
            series: [
              {
                name: 'Pos Difficulty',
                data: blocks!.blocks!.map((item) => Math.floor(item?.difficulty!)).reverse(),
              },
            ],
            options: {
              xaxis: {
                tooltip: { enabled: false },
                tickAmount: 30,
                categories: blocks!.blocks!.map((item) => `${item?.blockNo}`).reverse(),
              },
            },
          }}
        />
      </Grid>
    </Grid>
  );
}
