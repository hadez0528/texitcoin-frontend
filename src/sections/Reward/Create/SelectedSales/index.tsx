import { isEmpty } from 'lodash';
import { useQuery as useGraphQuery } from '@apollo/client';

import { fDate, formatDate } from 'src/utils/format-time';

import { FETCH_SALES_QUERY } from 'src/sections/Sales/query';

import MemberStatisticsTable from './table';
import { FETCH_STATISTICS_QUERY } from '../../query';

interface Props {
  ids: string[];
  date: Date;
  getMemberStatistics: Function;
}

export default function SelectedSales({ ids, date, getMemberStatistics }: Props) {
  const { data: salesData } = useGraphQuery(FETCH_SALES_QUERY, {
    variables: { filter: { orderedAt: date } },
  });

  const { data: statisticsData } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: { filter: { issuedAt: new Date(formatDate(date)) } },
  });

  const statistics = statisticsData?.statistics?.statistics ?? [];

  const data = salesData?.sales?.sales ?? [];

  const sales = data?.reduce((prev: any, item: any) => ({ ...prev, [item.id]: item }), {});

  const selected = !isEmpty(sales) && ids.map((id) => sales[id]);

  const totalHashPower = selected && selected?.reduce((prev, item) => prev + item.package.token, 0);

  const tableData = selected
    ? selected?.reduce(
        (prev, { member: { id, username, email, txcCold }, package: product, status }) => {
          const hashPower = (prev[id]?.hashPower || 0) + product.token;
          const percent = hashPower / totalHashPower;

          const blocks = statistics[0]?.newBlocks || 0;
          const statisticsId = statistics[0]?.id;

          return {
            ...prev,
            [id]: {
              id,
              username,
              email,
              hashPower,
              percent,
              txcShared: Number((blocks * 254 * percent).toFixed(3)),
              txcCold,
              status,
              statisticsId,
              memberId: id,
              issuedAt: fDate(date),
            },
          };
        },
        {}
      )
    : [];

  return (
    <MemberStatisticsTable
      data={Object.values(tableData)}
      getMemberStatistics={getMemberStatistics}
    />
  );
}
