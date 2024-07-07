import { Helmet } from 'react-helmet-async';
import { useLazyQuery } from '@apollo/client';
import { Navigate, useParams } from 'react-router-dom';
import { useState, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';

import { CONFIG } from 'src/config';
import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumbs } from 'src/components/Breadcrumbs';
import { LoadingScreen } from 'src/components/loading-screen';

import SaleGeneral from './General';
import { FETCH_SALES_QUERY } from '../query';

// ----------------------------------------------------------------------
export default function SaleEditView() {
  // Loading state including first initial render
  const [isLoading, setIsLoading] = useState(true);

  const params = useParams();

  const [fetchSaleQuery, { loading, data, called }] = useLazyQuery(FETCH_SALES_QUERY);

  const { id: saleId } = params;

  const fetchSale = useCallback(() => {
    fetchSaleQuery({ variables: { filter: { id: saleId } } });
  }, [fetchSaleQuery, saleId]);

  useEffect(() => {
    fetchSale();
  }, [fetchSale]);

  useEffect(() => {
    setIsLoading(!called || loading);
  }, [loading, called]);

  const sale = data?.sales?.sales?.[0];

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (!sale) {
    return <Navigate to={paths.notFound} replace />;
  }

  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name}: ${`${sale.invoiceNo}`}`}</title>
      </Helmet>
      <DashboardContent>
        <Breadcrumbs
          heading={`${sale.invoiceNo}`}
          links={[
            { name: 'Sale', href: paths.dashboard.sales.root },
            { name: `${sale.invoiceNo}` },
          ]}
          sx={{
            mb: { xs: 2, md: 3 },
          }}
        />

        <SaleGeneral currentSale={sale} />
      </DashboardContent>
    </>
  );
}
