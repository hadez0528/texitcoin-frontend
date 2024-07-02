import type { MemberStatistics } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: MemberStatistics;
  onSelectRow: VoidFunction;
};

export default function MemberStatisticsTableRow({ row, selected, onSelectRow }: Props) {
  const { issuedAt, member, hashPower, txcShared, percent } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>{fDate(issuedAt)}</TableCell>
      <TableCell>{member?.username}</TableCell>
      <TableCell>{member?.txcCold}</TableCell>
      <TableCell>{hashPower}</TableCell>
      <TableCell>{txcShared}</TableCell>
      <TableCell>{percent}</TableCell>
    </TableRow>
  );
}
