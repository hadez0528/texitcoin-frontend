// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  signIn: ROOTS.SIGN_IN,

  // STATISTICS
  statistics: { root: ROOTS.STATISTICS },

  // DASHBOARD
  dashboard: {
    root: ROOTS.DASHBOARD,
    user: {
      root: `${ROOTS.DASHBOARD}/users`,
      edit: (id: string) => `${ROOTS.DASHBOARD}/users/${id}`,
      new: `${ROOTS.DASHBOARD}/users/new`,
    },
  },
  notFound: '/404',
};
