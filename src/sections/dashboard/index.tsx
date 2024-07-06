import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import ChartWidget from 'src/components/ChartWidget';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import StatisticsTable from './StatisticsTable';
import { FETCH_STATISTICS_QUERY } from './query';

export default function Dashboard() {
  const { data: statisticsData } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: {
      page: '1,30',
      sort: 'issuedAt',
    },
  });

  const statistics = statisticsData?.statistics ?? { statistics: [], total: 0 };

  return (
    <Container maxWidth="xl">
      <Breadcrumbs
        heading="Dashboard"
        links={[{ name: 'Dashboard', href: paths.dashboard.history.root }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

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
                {
                  name: 'New Hash Power',
                  data: statistics!.statistics!.map((item) => item!.totalHashPower).reverse(),
                },
              ],
              options: {
                plotOptions: {
                  bar: {
                    columnWidth: '16%',
                  },
                },
              },
            }}
            type="bar"
          />
        </Grid>
        <Grid xs={12} md={6}>
          <ChartWidget
            title="TXC Shared"
            chart={{
              categories: statistics
                ?.statistics!.map((item) => new Date(item!.issuedAt).toISOString().split('T')[0])
                .reverse(),
              series: [
                {
                  name: 'Daily Reward',
                  data: statistics!.statistics!.map((item) => item!.newBlocks * 254).reverse(),
                },
              ],
            }}
          />
        </Grid>
      </Grid>
      <StatisticsTable />
    </Container>
  );
}
