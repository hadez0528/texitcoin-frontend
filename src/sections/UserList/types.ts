// ----------------------------------------------------------------------

export type UserRole = 'all' | 'admin' | 'ap' | 'inactive';

export type IUserTableFilters = {
  search: string;
  status: UserRole;
};

export type IUserPrismaFilter = {
  OR?: any;
  isAdmin?: boolean;
  deletedAt?: any;
};
