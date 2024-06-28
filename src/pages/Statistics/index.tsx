import { Helmet } from 'react-helmet-async';

import StatisticsSection from 'src/sections/Statistics';

export default function StatisticsPage() {
  return (
    <>
      <Helmet>
        <title>TexitCoin - Statistics</title>
      </Helmet>

      <StatisticsSection />
    </>
  );
}
