// ----------------------------------------------------------------------

export type SaleRole = 'all' | 'inactive';

export type ISaleTableFilters = {
  search: string;
  status: SaleRole;
};

export type ISalePrismaFilter = {
  OR?: any;
  deletedAt?: any;
};
