// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  SALES: '/sales',
  MEMBERS: '/members',
  REWARD: '/reward',
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
    members: {
      root: ROOTS.MEMBERS,
      edit: (id: string) => `${ROOTS.MEMBERS}/${id}`,
      new: `${ROOTS.MEMBERS}/new`,
    },
    sales: {
      root: ROOTS.SALES,
      edit: (id: string) => `${ROOTS.SALES}/${id}`,
      new: `${ROOTS.SALES}/new`,
    },
    reward: {
      root: ROOTS.REWARD,
      new: `${ROOTS.REWARD}/new`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
    },
  },
  notFound: '/404',
};
