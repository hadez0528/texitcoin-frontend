import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Navigate } from 'react-router-dom';
import { useLazyQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import Sale from './Sale';
import General from './General';
import History from './History';
import { FETCH_ME_QUERY } from './query';

const TABS = [
  {
    value: 'history',
    label: 'History',
    icon: <Iconify icon="carbon:analytics" width={24} />,
  },
  { value: 'edit', label: 'Edit', icon: <Iconify icon="solar:pen-2-bold" width={24} /> },
  { value: 'sale', label: 'Sale', icon: <Iconify icon="bi:currency-exchange" /> },
];

// ----------------------------------------------------------------------
export default function Profile() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const tabs = useTabs('history');

  const [fetchMe, { loading, data, called }] = useLazyQuery(FETCH_ME_QUERY);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!data) {
    return <Navigate to={paths.notFound} replace />;
  }

  const me = data.memberMe;

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${me.username}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={me.username}
          links={[{ name: 'Member', href: '#' }, { name: me.username }]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'edit' && <General me={me} />}

        {tabs.value === 'history' && <History me={me} />}

        {tabs.value === 'sale' && <Sale me={me} />}
      </DashboardContent>
    </>
  );
}
