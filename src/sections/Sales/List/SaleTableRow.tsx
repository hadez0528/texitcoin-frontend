import type { Sale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';

// ----------------------------------------------------------------------

type Props = {
  row: Sale;
};

export default function SaleTableRow({ row }: Props) {
  const router = useRouter();

  const { id, invoiceNo, member, package: product, payment, orderedAt, status } = row;

  return (
    <TableRow hover>
      <TableCell>{invoiceNo}</TableCell>
      <TableCell
        align="left"
        sx={{
          px: 1,
          whiteSpace: 'nowrap',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(member?.id ?? ''));
        }}
      >
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
        {payment?.name}
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
      <TableCell>
        <IconButton
          onClick={() => {
            router.push(`${paths.dashboard.sales.edit(id)}`);
          }}
        >
          <Iconify icon="solar:pen-2-bold" />
        </IconButton>
      </TableCell>
    </TableRow>
  );
}
