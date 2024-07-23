import type { Sale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { fDate, fTime } from 'src/utils/format-time';

import { Label } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
};

export default function SaleTableRow({ row }: Props) {
  const { invoiceNo, member, package: product, paymentMethod, orderedAt, status } = row;

  return (
    <TableRow hover>
      <TableCell>{invoiceNo}</TableCell>
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
        <ListItemText
          primary={fDate(orderedAt)}
          secondary={fTime(orderedAt)}
          primaryTypographyProps={{ typography: 'caption', noWrap: true }}
          secondaryTypographyProps={{
            component: 'span',
            typography: 'caption',
          }}
        />
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
