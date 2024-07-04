import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';
import { RouterLink } from 'src/routes/components';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import StatisticsTable from 'src/sections/Statistics/Statistics';

export default function RewardListView() {
  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Reward"
        links={[{ name: 'Reward', href: paths.dashboard.members.root }, { name: 'List' }]}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.reward.new}
            variant="contained"
            startIcon={<Iconify icon="mingcute:add-line" />}
          >
            New Reward
          </Button>
        }
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <StatisticsTable />
    </DashboardContent>
  );
}
