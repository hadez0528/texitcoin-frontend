import type { Sale } from './sale';

export type Statistics = {
  newBlocks: number;
  totalBlocks: number;
  newHashPower: number;
  totalHashPower: number;
  members: number;
  issuedAt: Date;
  sales?: Sale[];
};

export type IStatisticsFilters = {
  search: string;
  newBlocks: number;
  totalBlocks: number;
  newHashPower: number;
  totalHashPower: number;
  members: number;
};

export type IStatisticsPrismaFilter = {
  OR?: any;
};
