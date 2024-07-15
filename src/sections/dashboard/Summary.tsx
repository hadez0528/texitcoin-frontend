import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';
import { alpha, useTheme } from '@mui/material/styles';

import ChartWidget from 'src/components/ChartWidget';

import { FETCH_STATISTICS_QUERY } from './query';

export default function Summary() {
  const theme = useTheme();

  const { data: statisticsData } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: '1,30',
      sort: 'issuedAt',
    },
  });

  const statistics = statisticsData?.statistics ?? { statistics: [], total: 0 };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={6}>
        <ChartWidget
          title="Daily"
          chart={{
            categories: statistics
              ?.statistics!.map((item) => new Date(item!.issuedAt).toISOString().split('T')[0])
              .reverse(),
            series: [
              {
                name: 'New Blocks',
                data: statistics!.statistics!.map((item) => item!.newBlocks).reverse(),
              },
            ],
            options: {
              plotOptions: {
                bar: {
                  columnWidth: '80%',
                },
              },
            },
            colors: [alpha(theme.palette.primary.dark, 0.8)],
          }}
          type="bar"
        />
      </Grid>
      <Grid xs={12} md={6}>
        <ChartWidget
          title="TXC Shared"
          chart={{
            series: [
              {
                name: 'Daily Reward',
                data: statistics!.statistics!.map((item) => item!.txcShared).reverse(),
              },
            ],
            options: {
              xaxis: {
                tooltip: { enabled: false },
                tickAmount: 30,
                categories: statistics
                  ?.statistics!.map((item) => new Date(item!.issuedAt).toISOString().split('T')[0])
                  .reverse(),
              },
            },
            colors: [theme.palette.warning.main],
          }}
        />
      </Grid>
    </Grid>
  );
}
