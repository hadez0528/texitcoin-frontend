import { useQuery as useGraphQuery } from '@apollo/client';

import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Unstable_Grid2';

import WidgetSummary from 'src/components/WidgetSummary';

import { GENERAL_QUERY } from './query';

export const Summary = () => {
  const theme = useTheme();

  const { data } = useGraphQuery(GENERAL_QUERY, {
    variables: { data: { pastDays: 7 } },
  });

  const liveBlockStats = data?.liveBlockStats ?? { dailyData: [], meta: 0, total: 0 };
  const liveMiningStats = data?.liveMiningStats ?? { dailyData: [], meta: 0, total: 0 };
  const liveUserStats = data?.liveUserStats ?? { dailyData: [], meta: 0, total: 0 };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={4}>
        <WidgetSummary
          title="Total blocks"
          meta={liveBlockStats.meta ?? 0}
          metaText="blocks than yesterday"
          total={liveBlockStats.total}
          chart={{
            colors: [theme.palette.primary.light, theme.palette.primary.main],
            categories: liveBlockStats.dailyData.map((item) => item!.field),
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
            categories: liveMiningStats.dailyData.map((item) => item!.field),
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
            categories: liveUserStats.dailyData.map((item) => item!.field),
            series: liveUserStats.dailyData.map((item) => item!.count),
          }}
        />
      </Grid>
    </Grid>
  );
};
