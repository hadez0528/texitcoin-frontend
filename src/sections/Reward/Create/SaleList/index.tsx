import { useQuery as useGraphQuery } from '@apollo/client';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { formatDate } from 'src/utils/format-time';

import SalesTable from './SalesTable';
import { FETCH_STATISTICS_QUERY } from '../../query';

interface Props {
  date: Date;
  setDate: Function;
  selectIds: Function;
}

export default function SalesList({ date, setDate, selectIds }: Props) {
  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: { sort: 'createdAt' },
  });

  const statistics = data?.statistics.statistics ?? [];

  return (
    <Card sx={{ p: 2 }}>
      <Grid container>
        <Grid xl={6}>
          <Typography variant="h5">Sales</Typography>
        </Grid>
        <Grid xl={6} display="flex" justifyContent="right">
          <TextField
            name="Date"
            label="Date"
            select
            size="small"
            sx={{ width: 300 }}
            value={`${formatDate(date)}`}
            onChange={(e) => {
              setDate(formatDate(e.target.value));
            }}
          >
            {statistics?.map((item) => (
              <MenuItem key={item?.id} value={`${formatDate(item?.issuedAt)}`}>
                {formatDate(item?.issuedAt)}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
      </Grid>
      <Stack>
        <SalesTable date={date} selectIds={selectIds} />
      </Stack>
    </Card>
  );
}
