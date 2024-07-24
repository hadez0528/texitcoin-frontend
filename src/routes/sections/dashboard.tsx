import { lazy, Suspense } from 'react';
import { Outlet, Navigate } from 'react-router-dom';

import { DashboardLayout } from 'src/layouts/dashboard';

import { LoadingScreen } from 'src/components/loading-screen';

import { AuthGuard } from 'src/auth/guard';

import { paths } from '../paths';

// ----------------------------------------------------------------------
const SaleListPage = lazy(() => import('src/pages/Sale/List'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const DashboardPage = lazy(() => import('src/pages/Dashboard'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const ProfilePage = lazy(() => import('src/pages/Profile'));
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const RewardPage = lazy(() => import('src/pages/Reward/List'));
const RewardCreatePage = lazy(() => import('src/pages/Reward/Create'));
const RewardEditPage = lazy(() => import('src/pages/Reward/Edit'));
const StatisticsDetailPage = lazy(() => import('src/pages/Reward/Statistics/Detail'));
// ----------------------------------------------------------------------

export const dashboardRoutes = [
  {
    path: '',
    element: (
      <AuthGuard>
        <DashboardLayout>
          <Suspense fallback={<LoadingScreen />}>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      </AuthGuard>
    ),
    children: [
      { element: <Navigate to={paths.dashboard.history.root} replace />, index: true },
      {
        path: 'dashboard',
        children: [{ index: true, element: <DashboardPage /> }],
      },
      {
        path: 'sales',
        children: [{ index: true, element: <SaleListPage /> }],
      },
      {
        path: 'reward',
        children: [
          { index: true, element: <RewardPage /> },
          {
            path: 'new',
            children: [
              { index: true, element: <RewardCreatePage /> },
              { path: ':id', element: <RewardEditPage /> },
            ],
          },
          {
            path: 'statistics',
            children: [{ path: ':id', element: <StatisticsDetailPage /> }],
          },
        ],
      },
      { path: 'profile', element: <ProfilePage /> },
    ],
  },
];
