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

import { gql } from 'src/__generated__/gql';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

// ----------------------------------------------------------------------

const CREATE_USER = gql(/* GraphQL */ `
  mutation CreateUser($data: CreateUserInput!) {
    createUser(data: $data) {
      id
      username
      email
      isAdmin
      createdAt
    }
  }
`);

// ----------------------------------------------------------------------
export type NewUserSchemaType = zod.infer<typeof NewUserSchema>;

const NewUserSchema = zod.object({
  username: zod.string({ required_error: 'Name is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  avatar: zod.custom<File | string>().nullable(),
  isAdmin: zod.boolean().default(false),
});

export default function UserCreateForm() {
  const router = useRouter();

  const defaultValues = useMemo(
    () => ({
      name: '',
      email: '',
      avatar: null,
      isAdmin: false,
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_USER);

  const methods = useForm<NewUserSchemaType>({
    resolver: zodResolver(NewUserSchema),
    defaultValues,
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ avatar, ...data }) => {
    try {
      await submit({
        variables: {
          data: {
            ...data,
            password: '',
          },
        },
      });
      reset();
      toast.success('Create success!');
      router.push(paths.dashboard.user.root);
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
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            <Box sx={{ mb: 5 }}>
              <Field.UploadAvatar
                name="avatar"
                helperText={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 3,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.disabled',
                    }}
                  >
                    Select your favorite avatar
                  </Typography>
                }
              />
            </Box>
          </Card>
        </Grid>

        <Grid xs={12} md={8}>
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
              <Field.Text name="email" label="Email Address" />

              <Field.Switch
                name="isAdmin"
                labelPlacement="start"
                label={
                  <Typography variant="subtitle1" sx={{ mb: 0.5 }}>
                    Admin
                  </Typography>
                }
                sx={{ mx: 0, px: 1, width: 1, justifyContent: 'space-between' }}
              />
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create User
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
