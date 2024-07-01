import { Helmet } from 'react-helmet-async';
import { useLazyQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import MemberGeneral from './General';
import { FETCH_MEMBER } from '../query';

// ----------------------------------------------------------------------
export default function MemberEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

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
            mb: { xs: 3, md: 5 },
          }}
        />
        <MemberGeneral currentMember={member} refetchMember={fetchMember} />
      </DashboardContent>
    </>
  );
}
