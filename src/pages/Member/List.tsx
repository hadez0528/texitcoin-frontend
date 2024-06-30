import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import MemberList from 'src/sections/Members/List';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{`${CONFIG.site.name} - Members`}</title>
      </Helmet>

      <MemberList />
    </>
  );
}
