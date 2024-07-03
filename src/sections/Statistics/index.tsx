import Container from '@mui/material/Container';

import CollapsibleTable from 'src/components/CollapsibleTable';

import Chart from './Chart';
import { Summary } from './Summary';

export default function StatisticsSection() {
  return (
    <Container maxWidth="xl">
      <Summary />
      <Chart />
      <CollapsibleTable />
    </Container>
  );
}
