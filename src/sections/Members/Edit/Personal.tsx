import { useParams } from 'react-router-dom';
import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { FETCH_MEMBER } from '../query';

export const Personal = () => {
  const params = useParams();

  const { id } = params;

  const { data } = useGraphQuery(FETCH_MEMBER, {
    variables: {
      filter: { id: id ?? '' },
    },
  });

  const member = data?.members?.members?.[0];
  return (
    <Grid xl={12}>
      <Card sx={{ mr: 2, mt: 2, p: 2 }}>
        <Typography variant="h5" sx={{ pb: 2 }}>
          About
        </Typography>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Full Name:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.fullName}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Username:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.username}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Address:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.address}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Email:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.email}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Mobile:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.mobile}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            Asset ID:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.assetId}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            TXC Payout:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.payout.method}</Typography>
          </Stack>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
          <Stack width={0.3} sx={{ fontWeight: 'bold' }}>
            TXC Cold:
          </Stack>
          <Stack width={1}>
            <Typography variant="body2">{member?.wallet}</Typography>
          </Stack>
        </Stack>
      </Card>
    </Grid>
  );
};
