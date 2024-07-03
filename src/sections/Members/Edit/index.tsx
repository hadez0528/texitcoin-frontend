import { Helmet } from 'react-helmet-async';
import { useLazyQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { paths } from 'src/routes/paths';

import { useTabs } from 'src/hooks/use-tabs';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from 'src/components/Iconify';
import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import History from './History';
import MemberGeneral from './General';
import { FETCH_MEMBER } from '../query';

const TABS = [
  { value: 'edit', label: 'Edit', icon: <Iconify icon="solar:pen-2-bold" width={24} /> },
  {
    value: 'history',
    label: 'History',
    icon: <Iconify icon="carbon:analytics" width={24} />,
  },
];

// ----------------------------------------------------------------------
export default function MemberEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const tabs = useTabs('edit');

  const params = useParams();

  const [fetchMemberQuery, { loading, data, called }] = useLazyQuery(FETCH_MEMBER);

  const { id: memberId } = params;

  const fetchMember = useCallback(() => {
    fetchMemberQuery({ variables: { filter: { id: memberId } } });
  }, [fetchMemberQuery, memberId]);

  useEffect(() => {
    fetchMember();
  }, [fetchMember]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const member = data?.members?.members?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!member) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${member.username}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={member.username}
          links={[
            { name: 'Member', href: paths.dashboard.members.root },
            { name: member.username },
          ]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <Tabs value={tabs.value} onChange={tabs.onChange} sx={{ mb: { xs: 2, md: 3 } }}>
          {TABS.map((tab) => (
            <Tab key={tab.value} label={tab.label} icon={tab.icon} value={tab.value} />
          ))}
        </Tabs>

        {tabs.value === 'edit' && (
          <MemberGeneral currentMember={member} refetchMember={fetchMember} />
        )}

        {tabs.value === 'history' && <History />}
      </DashboardContent>
    </>
  );
}
