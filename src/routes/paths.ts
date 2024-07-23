// ----------------------------------------------------------------------

const ROOTS = {
  SIGN_IN: '/sign-in',
  DASHBOARD: '/dashboard',
  STATISTICS: '/statistics',
  SALES: '/sales',
  MEMBERS: '/members',
  REWARD: '/reward',
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
      edit: (id: string) => `${ROOTS.REWARD}/new/${id}`,
      detail: (id: string) => `${ROOTS.REWARD}/${id}`,
      view: (id: string) => `${ROOTS.REWARD}/statistics/${id}`,
    },
  },
  notFound: '/404',
};
