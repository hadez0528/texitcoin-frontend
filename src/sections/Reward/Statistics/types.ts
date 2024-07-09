// ----------------------------------------------------------------------

export type MemberStatisticsRole = 'all' | 'inactive';

export type IMemberStatisticsTableFilters = {
  search: string;
  status: MemberStatisticsRole;
};

export type IMemberStatisticsPrismaFilter = {
  OR?: any;
};
