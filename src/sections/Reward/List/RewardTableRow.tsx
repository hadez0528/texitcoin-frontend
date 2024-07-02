import type { Statistics } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { fDate, fDateTime } from 'src/utils/format-time';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Statistics;
  action?: boolean;
  onSelectRow: VoidFunction;
};

export default function RewardTableRow({ row, selected, action = true, onSelectRow }: Props) {
  const router = useRouter();

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
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>{fDate(issuedAt)}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{newBlocks}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{totalBlocks}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{totalHashPower}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{totalMembers}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{txcShared}</TableCell>

      <TableCell>{fDateTime(from)}</TableCell>

      <TableCell>{fDateTime(to)}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{status ? 'Confirmed' : 'Pending'}</TableCell>

      {action && (
        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          <Tooltip title="View" placement="top" arrow>
            <IconButton
              color="default"
              onClick={() => {
                router.push(`${paths.dashboard.reward.detail(id)}`);
              }}
            >
              <Iconify icon="solar:eye-bold" />
            </IconButton>
          </Tooltip>
        </TableCell>
      )}
    </TableRow>
  );
}
