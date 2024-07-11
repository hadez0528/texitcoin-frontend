import { useState } from 'react';

import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ButtonGroup from '@mui/material/ButtonGroup';
import ListItemText from '@mui/material/ListItemText';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import { fDate, fTime, formatDate } from 'src/utils/format-time';

import { Label } from 'src/components/Label';
import { Iconify } from 'src/components/Iconify';
import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------

type Props = {
  // Todo: Update type to Statistics
  row: any;
  memberStatistics: any[];
  statisticsId: string;
  setStatisticsId: Function;
  updateStatistics: Function;
};

export default function StatisticsTableRow({
  row,
  statisticsId,
  setStatisticsId,
  memberStatistics,
  updateStatistics,
}: Props) {
  const {
    id,
    issuedAt,
    newBlocks,
    totalBlocks,
    totalHashPower,
    totalMembers,
    txcShared,
    from,
    to,
    status,
  } = row;

  const confirm = useBoolean();

  const router = useRouter();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...memberStatistics!.map(
      (item, index) =>
        `\\"${item?.member?.wallet}\\": ${item?.txcShared}${index === memberStatistics.length - 1 ? '}"' : ','}`
    ),
  ];

  return (
    <>
      <TableRow hover sx={{ cursor: 'pointer' }}>
        <TableCell>{formatDate(issuedAt)}</TableCell>
        <TableCell>{newBlocks}</TableCell>
        <TableCell>{totalBlocks}</TableCell>
        <TableCell>{totalHashPower}</TableCell>
        <TableCell>{totalMembers}</TableCell>
        <TableCell>{txcShared}</TableCell>
        <TableCell>{newBlocks * 254 - txcShared}</TableCell>

        <TableCell>
          <ListItemText
            primary={fDate(from)}
            secondary={fTime(from)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell>
          <ListItemText
            primary={fDate(to)}
            secondary={fTime(to)}
            primaryTypographyProps={{ typography: 'body2', noWrap: true }}
            secondaryTypographyProps={{
              mt: 0.5,
              component: 'span',
              typography: 'caption',
            }}
          />
        </TableCell>
        <TableCell align="left" sx={{ px: 1, whiteSpace: 'nowrap' }}>
          {status ? (
            <Label variant="soft" color="success">
              Confirmed
            </Label>
          ) : (
            <Label variant="soft" color="error">
              Pending
            </Label>
          )}
        </TableCell>
        <TableCell>
          {status ? (
            <Tooltip title="View" placement="top" arrow>
              <IconButton
                color="success"
                onClick={() => router.push(paths.dashboard.reward.view(id))}
              >
                <Iconify icon="solar:eye-bold" />
              </IconButton>
            </Tooltip>
          ) : (
            <Tooltip title="Edit" placement="top" arrow>
              <IconButton
                color="default"
                onClick={() => router.push(paths.dashboard.reward.edit(id))}
              >
                <Iconify icon="solar:pen-2-bold" />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Confirm" placement="top" arrow>
            <IconButton
              color="success"
              disabled={status}
              onClick={() => {
                setStatisticsId(id);
                setIsOpen(true);
              }}
            >
              <Iconify icon="bxs:check-circle" />
            </IconButton>
          </Tooltip>
        </TableCell>
      </TableRow>

      <Drawer
        open={isOpen}
        onClose={() => setIsOpen(false)}
        anchor="right"
        slotProps={{ backdrop: { invisible: true } }}
        PaperProps={{ sx: { width: { xs: 1, sm: 700 } } }}
      >
        <Paper sx={{ p: 3 }}>
          <ComponentBlock
            sx={{
              display: 'block',
              alignItems: 'unset',
              overflow: 'auto',
              maxHeight: 800,
              backgroundColor: '#f2f2f2',
            }}
          >
            {sendmany.length === 1 ? (
              <LoadingScreen />
            ) : (
              sendmany.map((item) => <Typography variant="body1">{item}</Typography>)
            )}
          </ComponentBlock>
          <Paper sx={{ textAlign: 'right' }}>
            <ButtonGroup sx={{ mt: 2 }} variant="contained" color="success">
              <Button onClick={() => confirm.onTrue()}>Confirm</Button>
            </ButtonGroup>
          </Paper>
        </Paper>
      </Drawer>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={() => {
              confirm.onFalse();

              updateStatistics({
                variables: { data: { id: statisticsId, status: true } },
              });

              router.refresh();
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
