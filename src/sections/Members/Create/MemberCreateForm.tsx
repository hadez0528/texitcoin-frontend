import { z as zod } from 'zod';
import { useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { CREATE_MEMBER } from '../query';

// ----------------------------------------------------------------------
export type NewMemberSchemaType = zod.infer<typeof NewMemberSchema>;

const NewMemberSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  // fullName: zod.string({ required_error: 'Full Name is required' }),
  firstName: zod.string({ required_error: 'First Name is required' }),
  lastName: zod.string({ required_error: 'Last Name is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  mobile: zod.string({ required_error: 'Mobile is required' }),
  address: zod.string({ required_error: 'Address is required' }),
  txcPayout: zod.string({ required_error: 'TXC Payout is required' }),
  txcCold: zod.string({ required_error: 'TXC Cold is required' }),
  // joinDate: zod.string({ required_error: 'Join Date is required' }),
});

export default function MemberCreateForm() {
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
              {/* <Field.Text name="fullName" label="Full Name" /> */}
              <Field.Text name="firstName" label="First Name" />
              <Field.Text name="lastName" label="Last Name" />
              <Field.Phone name="mobile" label="Mobile" />
              <Field.Text name="address" label="Address" />
              <Field.Text name="txcPayout" label="TXC Payout" />
              <Field.Text name="txcCold" label="TXC Cold" />
              {/* <Field.Text name="joinDate" label="Join Date" /> */}
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
