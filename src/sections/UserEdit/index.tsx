import { Helmet } from 'react-helmet-async';
import { useLazyQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import Button from '@mui/material/Button';

import { paths } from 'src/routes/paths';

import { useBoolean } from 'src/hooks/useBoolean';

import { CONFIG } from 'src/config';
import { gql } from 'src/__generated__/gql';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import UserGeneral from './General';

// ----------------------------------------------------------------------
const FETCH_USER = gql(/* GraphQL */ `
  query FetchUser($filter: JSONObject) {
    users(filter: $filter) {
      users {
        id
        avatar
        username
        email
        isAdmin
        deletedAt
      }
    }
  }
`);

// ----------------------------------------------------------------------
export default function OrganizationEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const drawerState = useBoolean();

  const [fetchUserQuery, { loading, data, called }] = useLazyQuery(FETCH_USER);

  const { id: userId, tab: tabParam } = params;

  const fetchUser = useCallback(() => {
    fetchUserQuery({ variables: { filter: { id: userId } } });
  }, [fetchUserQuery, userId]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const user = data?.users?.users?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${user.username}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={user.username}
          links={[{ name: 'User', href: paths.dashboard.user.root }, { name: user.username }]}
          sx={{
            mb: { xs: 1, md: 2 },
          }}
          action={
            <Button variant="contained" onClick={drawerState.onTrue}>
              Manage organizations
            </Button>
          }
        />

        {tabParam === 'general' && <UserGeneral currentUser={user} refetchUser={fetchUser} />}
      </DashboardContent>
    </>
  );
}
