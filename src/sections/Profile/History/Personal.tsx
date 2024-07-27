import type { Member } from 'src/__generated__/graphql';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

interface Props {
  me: Member;
}

export default function Personal({ me }: Props) {
  return (
    <Grid xl={12}>
      <Card sx={{ mr: 2, mt: 2, p: 3 }}>
        <Typography variant="h6" sx={{ pb: 2 }}>
          About
        </Typography>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Full Name:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.fullName}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Username:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.username}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Address:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.primaryAddress}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Email:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Mobile:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.mobile}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Asset ID:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.assetId}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            TXC Payout:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.payout?.method}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            TXC Cold:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{me?.wallet}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
}
