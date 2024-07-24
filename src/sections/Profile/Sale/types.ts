// ----------------------------------------------------------------------

export type SaleRole = 'all' | 'inactive';

export type ISaleTableFilters = {
  search: string;
  status: SaleRole;
  memberId: string;
};

export type ISalePrismaFilter = {
  OR?: any;
  status?: any;
  memberId?: string;
};
