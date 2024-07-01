import type { Sale } from 'src/__generated__/graphql';

import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Sale;
  onSelectRow: VoidFunction;
};

export default function SaleTableRow({
  row,
  selected,

  onSelectRow,
}: Props) {
  const router = useRouter();

  const {
    id,
    invoiceNo,
    member,
    package: product,
    paymentMethod,
    hashPower,
    orderedAt,
    status,
  } = row;
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
        {hashPower}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {orderedAt}
      </TableCell>
      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        {status}
      </TableCell>

      <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
        <Tooltip title="View" placement="top" arrow>
          <IconButton
            color="default"
            onClick={() => {
              router.push(paths.dashboard.sales.edit(id));
            }}
          >
            <Iconify icon="solar:eye-bold" />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
}
