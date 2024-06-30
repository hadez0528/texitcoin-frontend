import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import MemberCreateForm from './MemberCreateForm';

// ----------------------------------------------------------------------

export default function MemberCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new member"
        links={[
          {
            name: 'Member',
            href: paths.dashboard.members.root,
          },
          { name: 'New member' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <MemberCreateForm />
    </DashboardContent>
  );
}
