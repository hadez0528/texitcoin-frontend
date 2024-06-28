import { useMemo } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import { useTheme } from '@mui/material/styles';

import { useQuery } from 'src/routes/hooks';

import ChartWidget from 'src/components/ChartWidget';
import WidgetSummary from 'src/components/WidgetSummary';
import CollapsibleTable from 'src/components/CollapsibleTable';

import { IStatisticsFilters, IStatisticsPrismaFilter } from 'src/types/statistics';

import { GENERAL_QUERY, FETCH_BLOCKS_QUERY } from './query';

const defaultFilter: IStatisticsFilters = {
  search: '',
  newBlocks: 0,
  totalBlocks: 0,
  newHashPower: 0,
  totalHashPower: 0,
  members: 0,
};

export default function StatisticsSection() {
  const theme = useTheme();

  const [query] = useQuery<IStatisticsFilters>();

  const { filter = defaultFilter } = query;

  const graphQueryFilter = useMemo(() => {
    const filterObj: IStatisticsPrismaFilter = {};

    if (filter.search) {
      filterObj.OR = [{}];
    }

    return filterObj;
  }, [filter]);

  const { data } = useGraphQuery(GENERAL_QUERY, {
    variables: { data: { pastDays: 7 } },
  });

  const { data: blocksData } = useGraphQuery(FETCH_BLOCKS_QUERY, {
    variables: {
      page: '1,100',
      filter: graphQueryFilter,
      sort: 'blockNo',
    },
  });

  const liveBlockStats = data?.liveBlockStats ?? { dailyData: [], meta: 0, total: 0 };
  const liveMiningStats = data?.liveMiningStats ?? { dailyData: [], meta: 0, total: 0 };
  const liveUserStats = data?.liveUserStats ?? { dailyData: [], meta: 0, total: 0 };

  const blocks = blocksData?.blocks ?? { blocks: [], total: 0 };

  return (
    <Container maxWidth="xl">
      <Grid container spacing={3}>
        <Grid xs={12} md={4}>
          <WidgetSummary
            title="Total blocks"
            meta={liveBlockStats.meta ?? 0}
            metaText="blocks than yesterday"
            total={liveBlockStats.total}
            chart={{
              colors: [theme.palette.primary.light, theme.palette.primary.main],
              series: liveBlockStats.dailyData.map((item) => item!.count),
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <WidgetSummary
            title="New blocks since last reward"
            meta={
              liveMiningStats.dailyData.length
                ? liveBlockStats.dailyData[0].count - liveBlockStats.dailyData[1].count
                : 0
            }
            metaText="seconds took than previous block"
            total={liveMiningStats.total}
            chart={{
              colors: [theme.palette.info.light, theme.palette.info.main],
              series: liveMiningStats.dailyData.map((item) => item!.count),
            }}
          />
        </Grid>
        <Grid xs={12} md={4}>
          <WidgetSummary
            title="Members"
            meta={liveUserStats.meta ?? 0}
            metaText="users this month"
            total={liveUserStats.total}
            chart={{
              colors: [theme.palette.secondary.light, theme.palette.secondary.main],
              series: liveUserStats.dailyData.map((item) => item!.count),
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <ChartWidget
            key="hashRate"
            title="Hashrate"
            chart={{
              categories: blocks!.blocks!.map((item) => item?.blockNo).reverse(),
              series: [
                {
                  data: [
                    {
                      name: 'Hashrate',
                      data: blocks!
                        .blocks!.map((item) => Math.floor((item?.hashRate! || 1) / 1000000))
                        .reverse(),
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
        <Grid xs={12} md={6}>
          <ChartWidget
            key="difficulty"
            title="Network Difficulty"
            chart={{
              colors: ['#ffb136'],
              categories: blocks!.blocks!.map((item) => item?.blockNo).reverse(),
              series: [
                {
                  data: [
                    {
                      name: 'Pos Difficulty',
                      data: blocks!.blocks!.map((item) => Math.floor(item?.difficulty!)).reverse(),
                    },
                  ],
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <Grid container spacing={1}>
        <CollapsibleTable />
      </Grid>
    </Container>
  );
}
