import type { Statistics } from 'src/__generated__/graphql';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import { fDate } from 'src/utils/format-time';
import { fNumber } from 'src/utils/formatNumber';

interface Props {
  data: Statistics;
}

export default function Overview({ data }: Props) {
  return (
    <Card sx={{ py: 3, textAlign: 'center', typography: 'h4' }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem sx={{ borderStyle: 'dashed' }} />}
      >
        <Stack width={1}>
          {fNumber(data?.newBlocks ?? 0)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            New Blocks
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(data?.totalBlocks ?? 0)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Total Blocks
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(data?.totalMembers ?? 0)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Total Members
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(data?.txcShared ?? 0)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Rewarded TXC
          </Box>
        </Stack>

        <Stack width={1}>
          {fNumber(data?.totalHashPower ?? 0)}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Hash Power
          </Box>
        </Stack>

        <Stack width={1}>
          {fDate(data?.issuedAt ?? new Date())}
          <Box component="span" sx={{ color: 'text.secondary', typography: 'body2' }}>
            Issued At
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
}
