import type { Block } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

type Props = {
  row: Block;
};

export default function BlocksTableRow({ row }: Props) {
  const { blockNo, hashRate, difficulty, createdAt } = row;

  return (
    <TableRow hover sx={{ cursor: 'pointer' }}>
      <TableCell>{blockNo}</TableCell>
      <TableCell>{hashRate}</TableCell>
      <TableCell>{difficulty}</TableCell>
      <TableCell>{createdAt}</TableCell>
    </TableRow>
  );
}
