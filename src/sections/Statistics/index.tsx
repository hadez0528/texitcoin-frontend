import Container from '@mui/material/Container';

import Chart from './Chart';
import Summary from './Summary';
import StatisticsTable from './Statistics';

export default function StatisticsSection() {
  return (
    <Container maxWidth="xl">
      <Summary />
      <Chart />
      <StatisticsTable status />
    </Container>
  );
}
