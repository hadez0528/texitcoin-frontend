import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import ChartWidget from 'src/components/ChartWidget';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import CollapsibleTable from 'src/components/CollapsibleTable';

import { FETCH_STATISTICS_QUERY } from './query';

export default function Dashboard() {
  const { loading: statisticsLoading, data: statisticsData } = useGraphQuery(
    FETCH_STATISTICS_QUERY,
    {
      variables: {
        page: '1,20',
      },
    }
  );

  const statistics = statisticsLoading ? { statistics: [], total: 0 } : statisticsData?.statistics;
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
              categories: statistics?.statistics!.map(
                (item) => new Date(item!.issuedAt).toISOString().split('T')[0]
              ),
              series: [
                {
                  name: 'New Blocks',
                  data: statistics!.statistics!.map((item) => item!.newBlocks),
                },
                {
                  name: 'New Hash Power',
                  data: statistics!.statistics!.map((item) => item!.totalHashPower),
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
              categories: statistics?.statistics!.map(
                (item) => new Date(item!.issuedAt).toISOString().split('T')[0]
              ),
              series: [
                {
                  name: 'Daily Reward',
                  data: statistics!.statistics!.map((item) => item!.newBlocks * 254),
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
