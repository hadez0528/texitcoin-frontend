import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { OverView } from './OverView';
import { Personal } from './Personal';
import { Reward } from './Reward';

export default function HistoryView() {
  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Member"
        links={[{ name: 'Member', href: paths.dashboard.members.root }, { name: 'History' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <OverView />
      <Personal />
      <Reward />
    </DashboardContent>
  );
}
