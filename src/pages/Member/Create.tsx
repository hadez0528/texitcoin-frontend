import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import MemberCreate from 'src/sections/Members/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} - New member` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <MemberCreate />
    </>
  );
}
