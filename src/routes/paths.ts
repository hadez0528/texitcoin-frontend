// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  USERS: '/users',
};

// ----------------------------------------------------------------------

export const paths = {
  // AUTH
  signIn: ROOTS.SIGN_IN,

  // STATISTICS
  statistics: { root: ROOTS.STATISTICS },

  // DASHBOARD
  dashboard: {
    root: '/',
    user: {
      root: ROOTS.USERS,
      edit: (id: string) => `${ROOTS.USERS}/${id}`,
      new: `${ROOTS.USERS}/new`,
    },
    history: {
      root: ROOTS.DASHBOARD,
    },
  },
  notFound: '/404',
};
