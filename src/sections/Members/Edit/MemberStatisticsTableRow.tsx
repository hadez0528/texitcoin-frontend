import type { MemberStatistics } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

import { fDate } from 'src/utils/format-time';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: MemberStatistics;
};

export default function MemberStatisticsTableRow({ row, selected }: Props) {
  const { issuedAt, member, hashPower, txcShared, percent } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell>{fDate(issuedAt)}</TableCell>
      <TableCell>{member?.username}</TableCell>
      <TableCell>{member?.wallet}</TableCell>
      <TableCell>{hashPower}</TableCell>
      <TableCell>{txcShared}</TableCell>
      <TableCell>{percent.toFixed(2)} %</TableCell>
    </TableRow>
  );
}
