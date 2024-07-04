import type { Sale } from 'src/__generated__/graphql';

import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { Label } from 'src/components/Label';

// ----------------------------------------------------------------------

type Props = {
  selected: boolean;
  row: Sale;
  onSelectRow: VoidFunction;
};

export default function SalesTableRow({ row, selected, onSelectRow }: Props) {
  const router = useRouter();

  const { id, invoiceNo, member, package: product, paymentMethod, status } = row;
  return (
    <TableRow hover selected={selected}>
      <TableCell padding="checkbox">
        <Checkbox checked={selected} onClick={onSelectRow} />
      </TableCell>

      <TableCell>{invoiceNo}</TableCell>

      <TableCell
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          '&:hover': { bgcolor: (theme) => theme.vars.palette.action.hover },
        }}
        onClick={() => {
          router.push(paths.dashboard.members.edit(id));
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

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{product?.productName}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{paymentMethod}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{product?.amount}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{product?.token}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>{member?.assetId}</TableCell>

      <TableCell sx={{ whiteSpace: 'nowrap' }}>
        {status ? (
          <Label variant="soft" color="success">
            Active
          </Label>
        ) : (
          <Label variant="soft" color="error">
            Inactive
          </Label>
        )}
      </TableCell>
    </TableRow>
  );
}
