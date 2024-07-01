import { useParams } from 'react-router-dom';
import { useQuery as useGraphQuery } from '@apollo/client';

import { today } from 'src/utils/format-time';

import ChartWidget from 'src/components/ChartWidget';

import { FETCH_MEMBER_REWARD } from '../query';

export const Reward = () => {
  const { id } = useParams();

  const { data } = useGraphQuery(FETCH_MEMBER_REWARD, {
    variables: { data: { id: id ?? '', startDate: '2024-06-30T00:00:00.000Z', endDate: today() } },
  });

  return (
    <>{/* <ChartWidget title="Reward" chart={{categories: data?.memberDailyReward?}} /> */}asdasd</>
  );
};
