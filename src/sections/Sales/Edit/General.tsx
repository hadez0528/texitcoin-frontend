import type { Sale } from 'src/__generated__/graphql';

import { z as zod } from 'zod';
import isEqual from 'lodash/isEqual';
import { useMemo, useState } from 'react';
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

import { FETCH_MEMBERS_QUERY } from 'src/sections/Members/query';

import { UPDATE_SALE, FETCH_PACKAGES_QUERY } from '../query';

// ----------------------------------------------------------------------

type Props = {
  currentSale: Sale;
};

// ----------------------------------------------------------------------
export type SaleGeneralSchemaType = zod.infer<typeof SaleGeneralSchema>;

const SaleGeneralSchema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.boolean({ required_error: 'Status is required' }).default(true),
  packageId: zod.string({ required_error: 'Package is required' }),
  memberId: zod.string({ required_error: 'Member is required' }),
});

export default function SaleGeneral({ currentSale }: Props) {
  const { status: currentStatus } = currentSale;

  const [status, setStatus] = useState(currentStatus);

  const { data: membersData } = useGraphQuery(FETCH_MEMBERS_QUERY);
  const { data: packagesData } = useGraphQuery(FETCH_PACKAGES_QUERY);

  const packages = packagesData?.packages.packages ?? [];
  const members = membersData?.members.members ?? [];

  const [submit, { loading }] = useMutation(UPDATE_SALE);

  const defaultValues = useMemo(() => {
    const { data } = SaleGeneralSchema.safeParse(currentSale);

    return data ?? ({} as SaleGeneralSchemaType);
  }, [currentSale]);

  const methods = useForm<SaleGeneralSchemaType>({
    resolver: zodResolver(SaleGeneralSchema),
    defaultValues,
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (newData) => {
    try {
      const { status: newStatus, ...newSale } = newData;

      console.log('new status => ', newStatus);

      if (isEqual(newSale, defaultValues)) {
        toast.warning('No changes to save');
        return;
      }

      await submit({
        variables: {
          data: {
            id: currentSale.id,
            status,
            ...newSale,
          },
        },
      });

      toast.success('Update success!');
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;

        console.log('error => ', error);
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
              <Typography variant="subtitle2">Sale</Typography>
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
              <Field.Select name="memberId" label="Member">
                {members.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.username}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.Select name="packageId" label="Package">
                {packages.map((option) => (
                  <MenuItem key={option?.id} value={option?.id}>
                    {option?.productName}
                  </MenuItem>
                ))}
              </Field.Select>
              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />
              <Field.Text name="paymentMethod" label="Payment Method" />
              <Field.Select
                name="status"
                label="Status"
                value={status ? 1 : 0}
                onChange={(e) =>
                  Number(e.target.value) === 1 ? setStatus(true) : setStatus(false)
                }
              >
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>
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
