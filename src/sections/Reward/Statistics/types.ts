// ----------------------------------------------------------------------

export type BlockRole = 'all' | 'inactive';

export type IBlockTableFilters = {
  search: string;
  status: BlockRole;
};

export type IBlockPrismaFilter = {
  OR?: any;
};
