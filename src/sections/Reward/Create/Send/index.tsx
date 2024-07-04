import { useEffect } from 'react';
import { useMutation, useLazyQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { useBoolean } from 'src/hooks/useBoolean';

import ComponentBlock from 'src/components/Component-Block';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { LoadingScreen } from 'src/components/loading-screen';

import { UPDATE_MEMBER_STATISTICS, FETCH_MEMBERSTATISTICS_QUERY } from '../../query';

interface Props {
  date: Date;
  handleBack: Function;
}

export default function SendMany({ date, handleBack }: Props) {
  const router = useRouter();
  const confirm = useBoolean();

  const [fetchMemberStatistics, { data }] = useLazyQuery(FETCH_MEMBERSTATISTICS_QUERY, {
    variables: { filter: { issuedAt: date } },
  });

  const [updateMemberStatistics] = useMutation(UPDATE_MEMBER_STATISTICS);

  const memberStatistics = data?.memberStatistics.memberStatistics ?? [];

  const initial = ['sendmany "" "{'];
  const sendmany = [
    ...initial,
    ...memberStatistics!.map(
      (item, index) =>
        `\\"${item?.member?.txcCold}\\": ${item?.txcShared}${index === memberStatistics.length - 1 ? '}"' : ','}`
    ),
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchMemberStatistics();
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <Paper>
        <ComponentBlock
          sx={{
            display: 'block',
            alignItems: 'unset',
            overflow: 'auto',
            maxHeight: 550,
            backgroundColor: '#f2f2f2',
          }}
        >
          {sendmany.length === 1 ? (
            <LoadingScreen />
          ) : (
            sendmany.map((item) => <Typography variant="body1">{item}</Typography>)
          )}
        </ComponentBlock>
      </Paper>

      <Stack direction="row" sx={{ mt: 3 }}>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" onClick={() => handleBack()} sx={{ mr: 1 }}>
          Back
        </Button>
        <Button variant="contained" onClick={() => confirm.onTrue()}>
          Confirm
        </Button>
      </Stack>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Confirm"
        content="Are you sure?"
        action={
          <Button
            variant="contained"
            color="error"
            onClick={async () => {
              confirm.onFalse();

              if (memberStatistics.length) {
                await updateMemberStatistics({
                  variables: { data: { id: memberStatistics[0]!.statisticsId, status: true } },
                });
              }

              router.push(paths.dashboard.reward.root);
            }}
          >
            Confirm
          </Button>
        }
      />
    </>
  );
}
