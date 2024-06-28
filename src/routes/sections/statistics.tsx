import type { RouteObject } from 'react-router';

import { lazy, Suspense } from 'react';

import { MainLayout } from 'src/layouts/main';

import { LoadingScreen } from 'src/components/loading-screen';

// ----------------------------------------------------------------------
const StatisticsPage = lazy(() => import('src/pages/Statistics'));
// ----------------------------------------------------------------------

export const statisticsRoutes: RouteObject[] = [
  {
    path: 'statistics',
    element: (
      <Suspense fallback={<LoadingScreen />}>
        <MainLayout>
          <StatisticsPage />
        </MainLayout>
      </Suspense>
    ),
  },
];
