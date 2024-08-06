import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { fDateTime } from 'src/utils/format-time';

import Table from './Table';
import { REWARED_BY_WALLETS } from '../../query';

export default function Wallets() {
  const [from, setFrom] = useState<any>(dayjs('2024-04-01'));
  const [to, setTo] = useState<any>(dayjs());

  const [fetchReward, { loading, data }] = useLazyQuery(REWARED_BY_WALLETS);

  useEffect(() => {
    fetchReward({ variables: { from, to } });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [from, to]);

  const renderHeader = (
    <Stack direction="row" justifyContent="flex-end">
      <Stack direction="row" gap={2}>
        <DesktopDatePicker
          label="Start Date"
          minDate={dayjs('2024-04-01')}
          format="YYYY-MM-DD"
          slotProps={{ textField: { fullWidth: true } }}
          defaultValue={dayjs('2024-04-01')}
          onChange={(newValue) => setFrom(fDateTime(newValue))}
        />
        <DesktopDatePicker
          label="End Date"
          minDate={dayjs('2024-04-01')}
          format="YYYY-MM-DD"
          slotProps={{ textField: { fullWidth: true } }}
          defaultValue={dayjs()}
          onChange={(newValue) => setTo(fDateTime(newValue))}
        />
      </Stack>
    </Stack>
  );

  return (
    <Card
      sx={{
        width: '100%',
        m: 0.5,
        mt: 2,
        borderRadius: 1.5,
      }}
    >
      <Stack sx={{ p: 1 }}>{renderHeader}</Stack>
      <Table loading={loading} data={data?.rewardsByWallets.rewards ?? []} />
    </Card>
  );
}
