import { Helmet } from 'react-helmet-async';

import Profile from 'src/sections/Profile';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title>Profile</title>
      </Helmet>

      <Profile />
    </>
  );
}
