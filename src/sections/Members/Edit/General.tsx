import type { Member } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation, useQuery as useGraphQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { UPDATE_MEMBER, FETCH_PAYOUTS_QUERY } from '../query';

// ----------------------------------------------------------------------

type Props = {
  currentMember: Member;
};

// ----------------------------------------------------------------------
export type MemberGeneralSchemaType = zod.infer<typeof MemberGeneralSchema>;

const MemberGeneralSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  fullName: zod.string(),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  address: zod.string({ required_error: 'Address is required' }),
  payoutId: zod.string({ required_error: 'TXC Payout is required' }),
  wallet: zod.string({ required_error: 'TXC Cold is required' }),
});

export default function MemberGeneral({ currentMember }: Props) {
  const { data: payoutsData } = useGraphQuery(FETCH_PAYOUTS_QUERY, {
    variables: {},
  });

  const payouts = payoutsData?.payouts.payouts ?? [];

  const [submit, { loading }] = useMutation(UPDATE_MEMBER);

  const defaultValues = useMemo(() => {
    const { fullName } = currentMember;
    const { data } = MemberGeneralSchema.safeParse(currentMember);

    return data
      ? { ...data, firstName: fullName.split(' ')[0], lastName: fullName.split(' ')[1] }
      : ({} as MemberGeneralSchemaType);
  }, [currentMember]);

  const methods = useForm<MemberGeneralSchemaType>({
    resolver: zodResolver(MemberGeneralSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newMember) => {
    try {
      if (isEqual(newMember, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      await submit({
        variables: {
          data: {
            id: currentMember.id,
            mobile: newMember.mobile,
            address: newMember.address,
            payoutId: newMember.payoutId,
            wallet: newMember.wallet,
            assetId: newMember.wallet.substring(1, 7),
          },
        },
      });
      toast.success('Update success!');
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('email', { type: 'manual', message: error?.message || '' });
        }
      }
      toast.error(err.message);
    }
  });

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid md={12}>
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
              <Field.Text name="username" label="Username" disabled />
              <Field.Text name="email" label="Email" defaultValue={currentMember.email} disabled />
              <Field.Text name="firstName" label="First Name" disabled />
              <Field.Text name="lastName" label="Last Name" disabled />
              <Field.Phone name="mobile" label="Mobile" />
              <Field.Text name="address" label="Address" />
              <Field.Select name="payoutId" label="TXC Payout">
                {payouts.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.method}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Text name="wallet" />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
