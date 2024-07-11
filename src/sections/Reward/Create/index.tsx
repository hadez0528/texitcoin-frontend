import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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

import { fDate } from 'src/utils/format-time';

import { varAlpha } from 'src/theme/styles';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import SendMany from './Send';
import SalesList from './SaleList';
import SelectedSales from './SelectedSales';
import { FETCH_STATISTICS_QUERY } from '../query';

// ----------------------------------------------------------------------
const stepTitles = ['Sales', 'Reward', 'Confirm'];

export default function RewardCreateView() {
  const params = useParams();
  const [activeStep, setActiveStep] = useState(0);
  const [ids, setIds] = useState<string[]>([]);

  const { id } = params;

  const { data } = useGraphQuery(FETCH_STATISTICS_QUERY, {
    variables: { sort: 'createdAt' },
  });

  const statistics = data?.statistics?.statistics ?? [];

  const [date, setDate] = useState(new Date());
  const [blocks, setBlocks] = useState<number>(0);

  useEffect(() => {
    if (id && statistics.length) {
      const current = statistics.filter((item) => item?.id === id);

      setDate(current[0]?.issuedAt);
      setBlocks(current[0]?.newBlocks ?? 0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statistics]);

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
    <SalesList
      id={id}
      date={date}
      setDate={setDate}
      statistics={statistics}
      selectIds={selectIds}
    />,
    <SelectedSales
      id={id!}
      ids={ids}
      blocks={blocks}
      date={date}
      handleBack={handleBack}
      handleNext={handleNext}
    />,
    <SendMany handleBack={handleBack} date={date} />,
  ];

  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading={id ? 'Edit' : 'New Reward'}
        links={[
          {
            name: 'Reward',
            href: paths.dashboard.reward.root,
          },
          { name: id ? `${fDate(date)}` : 'New Reward' },
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
