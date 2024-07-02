import type { MemberStatistics } from 'src/__generated__/graphql';

import { useState } from 'react';

import { useMutation } from '@apollo/client';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/useBoolean';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { ConfirmDialog } from 'src/components/custom-dialog';

import SalesList from './SaleList';
import SelectedSales from './SelectedSales';

import { CREATE_MEMBER_STATISTICS } from '../query';

// ----------------------------------------------------------------------
const stepTitles = ['Sales', 'Selected Sales', 'Reward'];

export default function RewardCreateView() {
  const confirm = useBoolean();

  const [activeStep, setActiveStep] = useState(0);
  const [ids, setIds] = useState<string[]>([]);
  const [date, setDate] = useState<any>(new Date());
  // const [memberStatistics, setMemberStatistics] = useState<any[]>([]);

  let memberStatistics: MemberStatistics[] = [];

  const [skipped, setSkipped] = useState(new Set<number>());

  const isStepSkipped = (step: number) => skipped.has(step);

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const selectIds = (salesIds: string[]) => {
    setIds(salesIds);
  };

  const getMemberStatistics = (data: MemberStatistics[]) => {
    memberStatistics = data;
  };

  const steps = [
    <SalesList date={date} setDate={setDate} selectIds={selectIds} />,
    <SelectedSales ids={ids} date={date} getMemberStatistics={getMemberStatistics} />,
  ];

  const [createMemberStatistics, { loading }] = useMutation(CREATE_MEMBER_STATISTICS);

  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new Reward"
        links={[
          {
            name: 'Reward',
            href: paths.dashboard.reward.root,
          },
          { name: 'New Reward' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <Stepper activeStep={activeStep} alternativeLabel>
        {stepTitles.map((label, index) => {
          const stepProps: {
            completed?: boolean;
          } = {};
          const labelProps: {
            optional?: React.ReactNode;
          } = {};

          if (isStepSkipped(index)) {
            stepProps.completed = false;
          }
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>

      {activeStep === stepTitles.length ? (
        <>
          <Paper
            sx={{
              p: 3,
              my: 3,
              minHeight: 120,
              bgcolor: (theme) => varAlpha(theme.vars.palette.grey['500Channel'], 0.12),
            }}
          >
            <Typography sx={{ my: 1 }}>All steps completed - you&apos;re finished</Typography>
          </Paper>

          <Box sx={{ display: 'flex' }}>
            <Box sx={{ flexGrow: 1 }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </>
      ) : (
        <>
          <Paper
            sx={{
              my: 3,
              minHeight: 120,
            }}
          >
            {steps[activeStep]}
          </Paper>

          <Stack direction="row">
            <Button color="inherit" disabled={activeStep === 0} onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
            <Box sx={{ flexGrow: 1 }} />
            {activeStep === 0 ? (
              <Button variant="contained" onClick={handleNext} disabled={!ids.length}>
                Next
              </Button>
            ) : (
              <>
                {activeStep === stepTitles.length - 1 ? (
                  <Button variant="contained" onClick={handleNext}>
                    Send
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={() => {
                      confirm.onTrue();
                    }}
                  >
                    Confirm
                  </Button>
                )}
              </>
            )}
          </Stack>
        </>
      )}

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
              // createMemberStatistics({variables: {data: memberStatistics}});
              handleNext();
            }}
          >
            Confirm
          </Button>
        }
      />
    </DashboardContent>
  );
}
