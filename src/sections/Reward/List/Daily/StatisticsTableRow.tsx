import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, fTime, formatDate } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  // Todo: Update type to Statistics
  row: any;
  selected: boolean;
};

export default function StatisticsTableRow({ row, selected }: Props) {
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

  const router = useRouter();

  return (
    <TableRow
      hover
      selected={selected}
      sx={{ cursor: 'pointer' }}
      onClick={() => window.open(paths.dashboard.reward.detail(id))}
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
          primaryTypographyProps={{ typography: 'caption', noWrap: true }}
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
          primaryTypographyProps={{ typography: 'caption', noWrap: true }}
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
      <TableCell align="center">
        {status && (
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              color="success"
              onClick={() => router.push(paths.dashboard.reward.view(id))}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
