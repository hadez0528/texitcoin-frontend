import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';

import { formatDate } from 'src/utils/format-time';

import SalesTable from './SalesTable';

interface Props {
  date: Date;
  // Todo: Update type to Statistics[]
  statistics: any[];
  setDate: Function;
  selectIds: Function;
}

const sales = [
  { orderedAt: '2024-07-04' },
  { orderedAt: '2024-07-03' },
  { orderedAt: '2024-07-02' },
  { orderedAt: '2024-07-01' },
  { orderedAt: '2024-06-30' },
  { orderedAt: '2024-06-29' },
  { orderedAt: '2024-06-28' },
  { orderedAt: '2024-06-27' },
  { orderedAt: '2024-06-26' },
  { orderedAt: '2024-06-25' },
  { orderedAt: '2024-06-24' },
  { orderedAt: '2024-06-23' },
  { orderedAt: '2024-06-22' },
  { orderedAt: '2024-06-21' },
  { orderedAt: '2024-06-20' },
  { orderedAt: '2024-06-19' },
  { orderedAt: '2024-06-18' },
  { orderedAt: '2024-06-17' },
  { orderedAt: '2024-06-16' },
  { orderedAt: '2024-06-15' },
  { orderedAt: '2024-06-14' },
  { orderedAt: '2024-06-13' },
  { orderedAt: '2024-06-12' },
  { orderedAt: '2024-06-11' },
  { orderedAt: '2024-06-10' },
];

export default function SalesList({ date, setDate, statistics, selectIds }: Props) {
  const statisticsData = statistics.reduce(
    (prev, item) => ({ ...prev, [formatDate(item.issuedAt)]: item.status }),
    {}
  );

  return (
    <Card>
      <Grid container sx={{ p: 2 }}>
        <Grid xl={6} sx={{ pt: 1 }}>
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
            {sales?.map((item) => (
              <MenuItem
                key={item?.orderedAt}
                value={`${formatDate(item?.orderedAt)}`}
                disabled={statisticsData[item.orderedAt]}
              >
                {formatDate(item?.orderedAt)}
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
