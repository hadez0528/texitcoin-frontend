import type { Sale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { Label } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Sale;
  onSelectRow: VoidFunction;
};

export default function SaleTableRow({ row, selected, onSelectRow }: Props) {
  const { invoiceNo, member, package: product, paymentMethod, orderedAt, status } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>
      <TableCell>{invoiceNo}</TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <ListItemText
          primary={member?.username}
          secondary={member?.email}
          primaryTypographyProps={{ typography: 'body2' }}
          secondaryTypographyProps={{
            component: 'span',
            color: 'text.disabled',
          }}
        />
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {member?.mobile}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {member?.assetId}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {product?.productName}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {paymentMethod}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {product?.amount}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {product?.token}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {orderedAt}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {status ? (
          <Label variant="soft" color="success">
            active
          </Label>
        ) : (
          <Label variant="soft" color="error">
            inactive
          </Label>
        )}
      </TableCell>
    </TableRow>
  );
}
