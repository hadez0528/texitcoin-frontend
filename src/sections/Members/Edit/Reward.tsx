import { useParams } from 'react-router-dom';
import { useQuery as useGraphQuery } from '@apollo/client';

import Grid from '@mui/material/Unstable_Grid2';

import { formatDate } from 'src/utils/format-time';

import ChartWidget from 'src/components/ChartWidget';

import { FETCH_MEMBER_STATISTICS } from '../query';

export const Reward = () => {
  const { id } = useParams();

  const { data } = useGraphQuery(FETCH_MEMBER_STATISTICS, {
    variables: { filter: { memberId: id } },
  });

  const memberStatistics = data?.memberStatistics.memberStatistics ?? [];

  return (
    <Grid sx={{ mt: 2 }}>
      <ChartWidget
        title="Daily Reward"
        chart={{
          categories: memberStatistics.map((item) => `${formatDate(item?.issuedAt!)}`),
          series: [
            {
              name: 'TXC Shared',
              data: memberStatistics.map((item) => Number(item?.txcShared.toFixed(3))),
            },
            {
              name: 'Hash Power',
              data: memberStatistics.map((item) => Number(item?.hashPower.toFixed(3))),
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
        height={404}
        type="bar"
      />
    </Grid>
  );
};
