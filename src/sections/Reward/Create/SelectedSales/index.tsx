import type { MemberStatistics } from 'src/__generated__/graphql';

import { isEmpty } from 'lodash';
import { useRef, useMemo } from 'react';
import { useMutation, useQuery as useGraphQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

import { useBoolean } from 'src/hooks/useBoolean';

import { customizeDate } from 'src/utils/format-time';
import { fLimitDigits } from 'src/utils/formatNumber';

import { ConfirmDialog } from 'src/components/custom-dialog';

import { FETCH_SALES_QUERY } from 'src/sections/Sales/query';

import MemberStatisticsTable from './table';
import { CREATE_STATISTICS } from '../../query';

interface Props {
  id: string;
  ids: string[];
  blocks: number;
  date: Date;
  handleBack: Function;
  handleNext: Function;
}

export default function SelectedSales({
  id: currentId,
  ids,
  blocks,
  date,
  handleBack,
  handleNext,
}: Props) {
  const confirm = useBoolean();
  const memberStatisticsRef = useRef<any[]>([]);

  const { data: salesData } = useGraphQuery(FETCH_SALES_QUERY);

  const [createStatistics, { loading }] = useMutation(CREATE_STATISTICS);

  const data = salesData?.sales?.sales ?? [];

  const sales = data?.reduce((prev: any, item: any) => ({ ...prev, [item.id]: item }), {});

  const selected = !isEmpty(sales) && ids.map((id) => sales[id]);

  const totalHashPower = selected && selected?.reduce((prev, item) => prev + item.package.token, 0);

  const tableData = useMemo(
    () =>
      selected
        ? selected?.reduce(
            (prev, { member: { id, username, email, wallet }, package: product, status }) => {
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
                  txcShared: fLimitDigits(blocks * 254 * percent, 8),
                  wallet,
                  status,
                  memberId: id,
                  issuedAt: customizeDate(date),
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

      await createStatistics({
        variables: {
          data: {
            id: currentId,
            memberStatistics: mutation,
            saleIds: ids,
            totalMembers: mutation.length,
            totalHashPower,
            txcShared,
            issuedAt: customizeDate(date),
          },
        },
      });
    } catch (err) {
      console.log('error => ', err.message);
    }
  };

  return (
    <>
      <MemberStatisticsTable
        blocks={blocks}
        data={Object.values(tableData)}
        getMemberStatistics={getMemberStatistics}
        memberStatistics={memberStatisticsRef.current}
      />

      <Stack direction="row" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => handleBack()} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button
          variant="contained"
          onClick={() => {
            const memberStatistics =
              memberStatisticsRef.current.length === 0
                ? Object.values(tableData)
                : memberStatisticsRef.current;

            const mutation = memberStatistics?.map(
              ({ username, email, wallet, status, id, issuedAt, ...rest }) => rest
            );

            handleCreate(mutation);

            if (!loading) {
              handleNext();
            }
          }}
        >
          Next
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
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
