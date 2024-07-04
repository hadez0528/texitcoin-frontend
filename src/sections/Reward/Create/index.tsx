import { useState } from 'react';
import { useQuery as useGraphQuery } from '@apollo/client';

import Box from '@mui/material/Box';
import Step from '@mui/material/Step';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Stepper from '@mui/material/Stepper';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';

import { paths } from 'src/routes/paths';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import SendMany from './Send';
import SalesList from './SaleList';
import SelectedSales from './SelectedSales';
import { FETCH_STATISTICS_QUERY } from '../query';

// ----------------------------------------------------------------------
const stepTitles = ['Sales', 'Selected Sales', 'Send'];

export default function RewardCreateView() {
  const [activeStep, setActiveStep] = useState(0);
  const [ids, setIds] = useState<string[]>([]);

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: { sort: 'createdAt', filter: { status: false } },
  });

  const statistics = data?.statistics?.statistics ?? [];

  const date = statistics[0]?.issuedAt ?? new Date();

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

  const steps = [
    <SalesList date={date} statistics={statistics} selectIds={selectIds} />,
    <SelectedSales
      ids={ids}
      date={date}
      statistics={statistics}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <SendMany handleBack={handleBack} date={date} />,
  ];

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
          mb: { xs: 1, md: 2 },
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
            <Box sx={{ flexGrow: 1 }} />
            {activeStep === 0 && (
              <>
                <Button color="inherit" disabled onClick={handleBack} sx={{ mr: 1 }}>
                  Back
                </Button>
                <Button variant="contained" onClick={handleNext} disabled={!ids.length}>
                  Next
                </Button>
              </>
            )}
          </Stack>
        </>
      )}
    </DashboardContent>
  );
}
