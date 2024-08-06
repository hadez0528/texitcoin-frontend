import { useEffect } from 'react';
import { useLazyQuery } from '@apollo/client';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useTabs } from 'src/hooks/use-tabs';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';

import { FETCH_ME_QUERY } from 'src/sections/Profile/query';

import Wallets from './Wallets';
import StatisticsTable from './Daily';

const TABS = [
  {
    value: 'daily',
    label: 'Daily',
    icon: <Iconify icon="carbon:analytics" width={24} />,
  },
  { value: 'wallets', label: 'Wallets', icon: <Iconify icon="bxs:wallet" width={24} /> },
];

export default function RewardListView() {
  const tabs = useTabs('daily');

  const [fetchMe, { data }] = useLazyQuery(FETCH_ME_QUERY);

  useEffect(() => {
    fetchMe();
  }, [fetchMe]);

  const me = data?.memberMe;

  return (
    <DashboardContent>
      <Breadcrumbs
        heading="Reward"
        links={[{ name: 'Reward', href: '#' }, { name: 'List' }]}
        sx={{
          mb: { xs: 1, md: 2 },
        }}
      />

      <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 2, md: 3 } }}>
        {TABS.map((tab) => (
          <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
        ))}
      </Tabs>

      {tabs.value === 'daily' && <StatisticsTable me={me!} />}

      {tabs.value === 'wallets' && <Wallets />}
    </DashboardContent>
  );
}
