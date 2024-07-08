import type { User } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
import { useMemo } from 'react';
import isEqual from 'lodash/isEqual';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDateTime } from 'src/utils/format-time';

import { gql } from 'src/__generated__/gql';

import { Label } from 'src/components/Label';
import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

// ----------------------------------------------------------------------

type Props = {
  currentUser: User;
};

// ----------------------------------------------------------------------

const UPDATE_USER = gql(/* GraphQL */ `
  mutation UpdateUser($data: UpdateUserInput!) {
    updateUser(data: $data) {
      id
      username
      email
      isAdmin
      createdAt
    }
  }
`);

// ----------------------------------------------------------------------
export type UserGeneralSchemaType = zod.infer<typeof UserGeneralSchema>;

const UserGeneralSchema = zod.object({
  username: zod.string({ required_error: 'Username is required' }),
  email: zod
    .string({ required_error: 'Email is required' })
    .email({ message: 'Invalid email address is provided' }),
  avatar: zod.custom<File | string>().nullable().optional(),
  isAdmin: zod.boolean().default(false),
});

export default function UserGeneral({ currentUser }: Props) {
  const router = useRouter();

  const [submit, { loading }] = useMutation(UPDATE_USER);

  const defaultValues = useMemo(() => {
    const { data } = UserGeneralSchema.safeParse(currentUser);
    return data ? { ...data } : ({} as UserGeneralSchemaType);
  }, [currentUser]);

  const methods = useForm<UserGeneralSchemaType>({
    resolver: zodResolver(UserGeneralSchema),
    defaultValues,
  });

  const { setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newUser) => {
    try {
      if (isEqual(newUser, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      await submit({
        variables: {
          data: {
            ...newUser,
            id: currentUser.id,
            avatar: currentUser.avatar,
          },
        },
      });

      toast.success('Update success!');

      router.push(paths.dashboard.user.root);
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
        <Grid xs={12} md={4}>
          <Card sx={{ pt: 10, pb: 5, px: 3 }}>
            {currentUser.deletedAt && (
              <Tooltip
                title={`Deactivated at ${fDateTime(currentUser.deletedAt)}`}
                placement="top"
                arrow
              >
                <Label color="warning" sx={{ position: 'absolute', top: 24, right: 24 }}>
                  Inactive
                </Label>
              </Tooltip>
            )}
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
                Save Changes
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
