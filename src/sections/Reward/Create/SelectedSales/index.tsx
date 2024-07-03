import type { MemberStatistics } from 'src/__generated__/graphql';

import { isEmpty } from 'lodash';
import { useRef, useMemo } from 'react';
import { useMutation, useQuery as useGraphQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDate, formatDate } from 'src/utils/format-time';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { FETCH_SALES_QUERY } from 'src/sections/Sales/query';

import MemberStatisticsTable from './table';
import { UPDATE_MEMBER_STATISTICS, CREATE_MANY_MEMBER_STATISTICS } from '../../query';

interface Props {
  ids: string[];
  date: Date;
  statistics: any[];
  handleBack: Function;
  handleNext: Function;
}

export default function SelectedSales({ ids, date, statistics, handleBack, handleNext }: Props) {
  const confirm = useBoolean();
  const memberStatisticsRef = useRef<any[]>([]);

  const { data: salesData } = useGraphQuery(FETCH_SALES_QUERY, {
    variables: { filter: { orderedAt: formatDate(date) } },
  });

  const [createMemberStatistics, { loading }] = useMutation(CREATE_MANY_MEMBER_STATISTICS);

  const [updateMemberStatistics] = useMutation(UPDATE_MEMBER_STATISTICS);

  const blocks = statistics[0]?.newBlocks ?? 0;
  const statisticsId = statistics[0]?.id ?? '';

  const data = salesData?.sales?.sales ?? [];

  const sales = data?.reduce((prev: any, item: any) => ({ ...prev, [item.id]: item }), {});

  const selected = !isEmpty(sales) && ids.map((id) => sales[id]);

  const totalHashPower = selected && selected?.reduce((prev, item) => prev + item.package.token, 0);

  const tableData = useMemo(
    () =>
      selected
        ? selected?.reduce(
            (prev, { member: { id, username, email, txcCold }, package: product, status }) => {
              const hashPower = (prev[id]?.hashPower || 0) + product.token;
              const percent = hashPower / totalHashPower;

              return {
                ...prev,
                [id]: {
                  id,
                  username,
                  email,
                  hashPower,
                  percent: Number((percent * 100).toFixed(2)),
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
        : [],
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selected]
  );

  const getMemberStatistics = (result: MemberStatistics[]) => {
    memberStatisticsRef.current = result;
  };

  const handleCreate = async (mutation: MemberStatistics[]) => {
    try {
      const txcShared = mutation?.reduce((prev, item) => prev + item.txcShared, 0);

      await createMemberStatistics({
        variables: { data: { memberStatistics: mutation } },
      });

      if (statisticsId) {
        await updateMemberStatistics({
          variables: { data: { id: statisticsId, txcShared } },
        });
      }
    } catch (err) {
      console.log('error => ', err.message);
    }
  };

  return (
    <>
      <MemberStatisticsTable
        data={Object.values(tableData)}
        memberStatistics={memberStatisticsRef.current}
        getMemberStatistics={getMemberStatistics}
      />

      <Stack direction="row" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => handleBack()} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={() => confirm.onTrue()}>
          Confirm
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse();

              const memberStatistics =
                memberStatisticsRef.current.length === 0
                  ? Object.values(tableData)
                  : memberStatisticsRef.current;

              const mutation = memberStatistics?.map(
                ({ username, email, txcCold, status, id, issuedAt, ...rest }) => ({
                  issuedAt: new Date(issuedAt),
                  ...rest,
                })
              );

              handleCreate(mutation);

              if (!loading) {
                handleNext();
              }
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
