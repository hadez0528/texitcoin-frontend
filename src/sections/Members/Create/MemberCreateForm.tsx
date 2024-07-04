import { z as zod } from 'zod';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { CREATE_MEMBER } from '../query';

// ----------------------------------------------------------------------
export type NewMemberSchemaType = zod.infer<typeof NewMemberSchema>;

const NewMemberSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  firstName: zod.string({ required_error: 'First Name is required' }),
  lastName: zod.string({ required_error: 'Last Name is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  address: zod.string({ required_error: 'Address is required' }),
  txcPayout: zod.string({ required_error: 'TXC Payout is required' }),
  txcCold: zod.string({ required_error: 'TXC Cold is required' }),
});

const payouts = [
  {
    id: '0c05c356-39eb-11ef-91ee-00155d4f3548',
    method: '$TXC-Cold',
    status: 'active',
    name: 'blockio',
    display: '$TXC-Cold',
  },
  {
    id: '0cd6f20a-39eb-11ef-bee4-00155d4f3548',
    method: '$TXC-Hot',
    status: 'active',
    name: 'coin_payments',
    display: '$TXC-Hot',
  },
  {
    id: '0d536fba-39eb-11ef-a034-00155d4f3548',
    method: '$BTC',
    status: 'active',
    name: 'paypal',
    display: '$BTC Wallet Address',
  },
  {
    id: '0d97d11e-39eb-11ef-bb9e-00155d4f3548',
    method: '$USDT',
    status: 'active',
    name: 'advcache',
    display: '$USDT Wallet Address',
  },
  {
    id: '0dbc3d24-39eb-11ef-b6a6-00155d4f3548',
    method: '$ETH',
    status: 'active',
    name: 'bitgo',
    display: '$ETH Wallet Address',
  },
  {
    id: '0dd7422c-39eb-11ef-a1db-00155d4f3548',
    method: '$Other',
    status: 'active',
    name: 'authorizenet',
    display: '$Other',
  },
];

export default function MemberCreateForm() {
  const [payout, setPayout] = useState<string>(payouts[0].display);

  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      username: '',
      fullName: '',
      email: '',
      mobile: '',
      address: '',
      txcPayout: '',
      txcCold: '',
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_MEMBER);

  const methods = useForm<NewMemberSchemaType>({
    resolver: zodResolver(NewMemberSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ firstName, lastName, txcCold, ...data }) => {
    try {
      await submit({
        variables: {
          data: {
            ...data,
            assetId: txcCold.substring(1, 7),
            fullName: `${firstName} ${lastName}`,
            txcCold,
          },
        },
      });
      reset();
      toast.success('Create success!');
      router.push(paths.dashboard.members.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('email', { type: 'manual', message: error?.message || '' });
        }
      } else {
        toast.error(err.message);
      }
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xl={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Typography variant="subtitle2">Personal Information</Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                Personal information here.
              </Typography>
            </Stack>
            <Box
              rowGap={3}
              columnGap={2}
              display="grid"
              gridTemplateColumns={{
                xs: 'repeat(1, 1fr)',
                sm: 'repeat(2, 1fr)',
              }}
            >
              <Field.Text name="username" label="Username" />
              <Field.Text name="email" label="Email" />
              <Field.Text name="firstName" label="First Name" />
              <Field.Text name="lastName" label="Last Name" />
              <Field.Phone name="mobile" label="Mobile" />
              <Field.Text name="address" label="Address" />
              {/* <Field.Text name="txcPayout" label="TXC Payout" /> */}
              <Autocomplete
                fullWidth
                options={payouts}
                getOptionLabel={(option) => option!.method}
                renderInput={(params) => <TextField {...params} label="TXC Payout" margin="none" />}
                renderOption={(props, option) => (
                  <li {...props} key={option!.method}>
                    {option!.method}
                  </li>
                )}
                onChange={(_, value) => setPayout(value?.display ?? '')}
              />
              <Field.Text name="wallet" label={payout} />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create Member
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
