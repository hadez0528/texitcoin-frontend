import type { TableRowProps } from '@mui/material/TableRow';

import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

// ----------------------------------------------------------------------

interface Props extends TableRowProps {
  height?: number;
}

export function TableSkeleton({ height = 21, ...other }: Props) {
  return (
    <TableRow {...other}>
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center" sx={{ my: 1 }}>
          <Skeleton
            sx={{
              borderRadius: 1.5,
              width: 70,
              height,
            }}
          />
          <Skeleton sx={{ width: 1, height }} />
          <Skeleton sx={{ width: 180, height }} />
          <Skeleton sx={{ width: 160, height }} />
          <Skeleton sx={{ width: 140, height }} />
          <Skeleton sx={{ width: 120, height }} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
