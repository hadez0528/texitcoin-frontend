import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import SaleCreate from 'src/sections/Sales/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} - New sale` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <SaleCreate />
    </>
  );
}
