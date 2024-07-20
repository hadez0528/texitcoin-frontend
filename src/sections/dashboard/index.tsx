import Container from '@mui/material/Container';

import { paths } from 'src/routes/paths';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import StatisticsTable from 'src/sections/Statistics/Statistics';

import Summary from './Summary';

export default function Dashboard() {
  return (
    <Container maxWidth="xl">
      <Breadcrumbs
        heading="Dashboard"
        links={[{ name: 'Dashboard', href: paths.dashboard.history.root }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Summary />
      <StatisticsTable />
    </Container>
  );
}
