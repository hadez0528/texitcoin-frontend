import dayjs, { type Dayjs } from 'dayjs';

import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

import { formatDate } from 'src/utils/format-time';

import SalesTable from './SalesTable';

interface Props {
  id?: string;
  date: Date;
  // Todo: Update type to Statistics[]
  statistics: any[];
  setDate: Function;
  selectIds: Function;
}

export default function SalesList({ id, date, setDate, statistics, selectIds }: Props) {
  const statisticsData = statistics.reduce(
    (prev, item) => ({
      ...prev,
      [item.id]: item.issuedAt,
      [formatDate(item.issuedAt)]: item.status,
    }),
    {}
  );

  const disabledDates = statistics.map((item) => item.issuedAt);

  const shouldDisableDate = (current: Dayjs) =>
    disabledDates.some((disabledDate) => current.isSame(disabledDate, 'day'));

  return (
    <Card>
      <Grid container sx={{ p: 2 }}>
        <Grid xl={6} sx={{ pt: 2 }}>
          <Typography variant="h5">Sales</Typography>
        </Grid>
        <Grid xl={3} xlOffset={3} display="flex" justifyContent="right">
          <DesktopDatePicker
            label="Date"
            value={id ? dayjs(statisticsData[id] ?? new Date(), 'YYYY-MM-DD') : dayjs(date)}
            minDate={dayjs('2024-04-01')}
            onChange={(newValue) => setDate(newValue)}
            format="YYYY-MM-DD"
            disabled={!!id}
            slotProps={{ textField: { fullWidth: true } }}
            shouldDisableDate={shouldDisableDate}
          />
        </Grid>
      </Grid>
      <Stack>
        <SalesTable date={date} selectIds={selectIds} />
      </Stack>
    </Card>
  );
}
