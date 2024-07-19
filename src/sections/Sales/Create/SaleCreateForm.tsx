import { z as zod } from 'zod';
import { useForm } from 'react-hook-form';
import { useMemo, useState, useEffect } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { ApolloError, useMutation, useLazyQuery, useQuery as useGraphQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import Grid from '@mui/material/Unstable_Grid2';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import Autocomplete from '@mui/material/Autocomplete';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { today } from 'src/utils/format-time';

import { toast } from 'src/components/SnackBar';
import { Form, Field } from 'src/components/Form';

import { FETCH_MEMBERS_QUERY } from 'src/sections/Members/query';

import { CREATE_SALE, FETCH_SALES_QUERY, FETCH_PACKAGES_QUERY } from '../query';

// ----------------------------------------------------------------------
export type NewSaleSchemaType = zod.infer<typeof NewSaleSchema>;

const NewSaleSchema = zod.object({
  orderedAt: zod.string({ required_error: 'Ordered At is required' }),
  paymentMethod: zod.string({ required_error: 'Payment Method is required' }),
  status: zod.number({ required_error: 'Status is required' }).default(1),
});

export default function SaleCreateForm() {
  const router = useRouter();

  const [memberId, setMemberId] = useState<string>('');
  const [packageId, setPackageId] = useState<string>('');

  const defaultValues = useMemo(
    () => ({
      packageId: '',
      orderedAt: `${new Date(today())}`,
      paymentMethod: '',
      status: 1,
    }),
    []
  );

  const [submit, { loading }] = useMutation(CREATE_SALE);

  const methods = useForm<NewSaleSchemaType>({
    resolver: zodResolver(NewSaleSchema),
    defaultValues,
  });

  const { data: salesData } = useGraphQuery(FETCH_SALES_QUERY, {
    variables: { sort: 'invoiceNo' },
  });

  const sales = salesData?.sales.sales ?? [{ invoiceNo: 0 }];

  const [fetchMembers, { data: membersData }] = useLazyQuery(FETCH_MEMBERS_QUERY, {
    variables: { filter: {} },
  });

  const [fetchPackages, { data: packageData }] = useLazyQuery(FETCH_PACKAGES_QUERY, {
    variables: { filter: {} },
  });

  const { reset, setError, handleSubmit } = methods;

  const onSubmit = handleSubmit(async ({ status, ...data }) => {
    try {
      console.log('data => ', data);
      await submit({
        variables: {
          data: {
            ...data,
            status: !!status,
            invoiceNo: (sales[0]?.invoiceNo ?? 0) + 1,
            memberId,
            packageId,
          },
        },
      });

      reset();

      toast.success('Create success!');

      router.push(paths.dashboard.sales.root);
    } catch (err) {
      if (err instanceof ApolloError) {
        const [error] = err.graphQLErrors;
        if (error.path?.includes('email')) {
          setError('paymentMethod', { type: 'manual', message: error?.message || '' });
        }
      } else {
        toast.error(err.message);
      }
    }
  });

  // const selectedMembers = (ids: string[]) => {};

  const members = membersData?.members.members ?? [];
  const packages = packageData?.packages.packages ?? [];

  useEffect(() => {
    fetchMembers();
    fetchPackages();
  }, [fetchMembers, fetchPackages]);

  return (
    <Form methods={methods} onSubmit={onSubmit}>
      <Grid container spacing={3}>
        <Grid xl={12}>
          <Card sx={{ p: 3 }}>
            <Stack spacing={1} sx={{ mb: 3 }}>
              <Grid container xl={12}>
                <Grid xl={6}>
                  <Typography variant="subtitle1">Sale</Typography>
                </Grid>
                <Grid xl={6} justifyContent="flex-end" display="flex" gap={2}>
                  <Typography variant="subtitle1">Invoice No:</Typography>
                  <Typography>{(sales[0]?.invoiceNo ?? 0) + 1}</Typography>
                </Grid>
              </Grid>
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
              <Autocomplete
                fullWidth
                options={members}
                getOptionLabel={(option) => option!.username}
                renderInput={(params) => <TextField {...params} label="Member" margin="none" />}
                renderOption={(props, option) => (
                  <li {...props} key={option!.username}>
                    {option!.username}
                  </li>
                )}
                onChange={(_, newValue) => setMemberId(newValue?.id!)}
              />
              <Autocomplete
                fullWidth
                options={packages}
                getOptionLabel={(option) => option!.productName}
                renderInput={(params) => <TextField {...params} label="Package" margin="none" />}
                renderOption={(props, option) => (
                  <li {...props} key={option!.productName}>
                    {option!.productName}
                  </li>
                )}
                onChange={(_, newValue) => setPackageId(newValue?.id!)}
              />
              <Field.DatePicker name="orderedAt" label="Ordered At" format="YYYY-MM-DD" />
              <Field.Text name="paymentMethod" label="Payment Method" />
              <Field.Select name="status" label="Status">
                <MenuItem value={1}>Active</MenuItem>
                <MenuItem value={0}>Inactive</MenuItem>
              </Field.Select>
            </Box>

            <Stack alignItems="flex-end" sx={{ mt: 3 }}>
              <LoadingButton type="submit" variant="contained" loading={loading}>
                Create Sale
              </LoadingButton>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Form>
  );
}
