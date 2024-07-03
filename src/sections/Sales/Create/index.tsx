import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';

import SaleCreateForm from './SaleCreateForm';

// ----------------------------------------------------------------------

export default function SaleCreateView() {
  return (
    // TODO: Consider moving this Container to dashboard route definition as every page will have same layout
    <DashboardContent>
      <Breadcrumbs
        heading="Create a new sale"
        links={[
          {
            name: 'Sale',
            href: paths.dashboard.sales.root,
          },
          { name: 'New sale' },
        ]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <SaleCreateForm />
    </DashboardContent>
  );
}
