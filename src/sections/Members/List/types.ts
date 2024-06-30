// ----------------------------------------------------------------------

export type MemberRole = 'all' | 'inactive';

export type IMemberTableFilters = {
  search: string;
  status: MemberRole;
};

export type IMemberPrismaFilter = {
  OR?: any;
  deletedAt?: any;
};
