import { Helmet } from 'react-helmet-async';

import { CONFIG } from 'src/config';

import RewardCreate from 'src/sections/Reward/Create';

// ----------------------------------------------------------------------
const metadata = { title: `${CONFIG.site.name} - Edit` };

export default function Page() {
  return (
    <>
      <Helmet>
        <title>{metadata.title}</title>
      </Helmet>

      <RewardCreate />
    </>
  );
}
