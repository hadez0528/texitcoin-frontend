import type { Statistics } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';

import { fDate, fTime, formatDate } from 'src/utils/format-time';

import { Label } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  row: Statistics;
};

export default function StatisticsTableRow({ row }: Props) {
  const {
    id,
    issuedAt,
    newBlocks,
    totalBlocks,
    totalHashPower,
    totalMembers,
    txcShared,
    from,
    to,
    status,
  } = row;

  return (
    <TableRow
      hover
      onClick={() => window.open(paths.dashboard.reward.detail(id))}
      sx={{ cursor: 'pointer' }}
    >
      <TableCell>{formatDate(issuedAt)}</TableCell>
      <TableCell>{newBlocks}</TableCell>
      <TableCell>{totalBlocks}</TableCell>
      <TableCell>{totalHashPower}</TableCell>
      <TableCell>{totalMembers}</TableCell>
      <TableCell>{txcShared}</TableCell>
      <TableCell>{newBlocks * 254 - txcShared}</TableCell>

      <TableCell>
        <ListItemText
          primary={fDate(from)}
          secondary={fTime(from)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell>
        <ListItemText
          primary={fDate(to)}
          secondary={fTime(to)}
          primaryTypographyProps={{ typography: 'body2', noWrap: true }}
          secondaryTypographyProps={{
            mt: 0.5,
            component: 'span',
            typography: 'caption',
          }}
        />
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {status ? (
          <Label variant="soft" color="success">
            Confirmed
          </Label>
        ) : (
          <Label variant="soft" color="error">
            Pending
          </Label>
        )}
      </TableCell>
    </TableRow>
  );
}
