import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { GridToolbarExport, GridToolbarContainer } from '@mui/x-data-grid';

interface AccountTableToolBarProps {
  setFilterButtonEl: React.Dispatch<React.SetStateAction<HTMLButtonElement | null>>;
}

export function TableToolBar({ setFilterButtonEl }: AccountTableToolBarProps) {
  return (
    <GridToolbarContainer>
      <Typography variant="subtitle1">Reward</Typography>
      <Stack spacing={1} flexGrow={1} direction="row" alignItems="center" justifyContent="flex-end">
        <GridToolbarExport />
      </Stack>
    </GridToolbarContainer>
  );
}
