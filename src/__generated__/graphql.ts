/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.This scalar is serialized to a string in ISO 8601 format and parsed from a string in ISO 8601 format. */
  DateTimeISO: { input: any; output: any; }
  /** The `JSONObject` scalar type represents JSON objects as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSONObject: { input: any; output: any; }
};

export type Admin = {
  __typename?: 'Admin';
  avatar: Scalars['String']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
};

export type AdminLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type AdminLoginResponse = {
  __typename?: 'AdminLoginResponse';
  accessToken: Scalars['String']['output'];
};

export type AdminsResponse = {
  __typename?: 'AdminsResponse';
  admins?: Maybe<Array<Maybe<Admin>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Block = {
  __typename?: 'Block';
  blockNo: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  difficulty: Scalars['Float']['output'];
  hashRate: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type BlocksResponse = {
  __typename?: 'BlocksResponse';
  blocks?: Maybe<Array<Maybe<Block>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type CreateAdminInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type CreateBlockInput = {
  blockNo: Scalars['Float']['input'];
  difficulty: Scalars['Float']['input'];
  hashRate: Scalars['Float']['input'];
  issuedAt: Scalars['DateTimeISO']['input'];
};

export type CreateManyMemberStatisticsInput = {
  memberStatistics: Array<CreateMemberStatisticsInput>;
};

export type CreateManyStatisticsSaleInput = {
  statisticsSales: Array<CreateStatisticsSaleInput>;
};

export type CreateMemberInput = {
  assetId: Scalars['String']['input'];
  city?: InputMaybe<Scalars['String']['input']>;
  email: Scalars['String']['input'];
  fullName: Scalars['String']['input'];
  mobile: Scalars['String']['input'];
  payoutId: Scalars['String']['input'];
  primaryAddress: Scalars['String']['input'];
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  username: Scalars['String']['input'];
  wallet: Scalars['String']['input'];
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type CreateMemberStatisticsInput = {
  hashPower: Scalars['Float']['input'];
  issuedAt: Scalars['DateTimeISO']['input'];
  memberId: Scalars['String']['input'];
  percent: Scalars['Float']['input'];
  statisticsId: Scalars['String']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreatePackageInput = {
  amount: Scalars['Float']['input'];
  date: Scalars['DateTimeISO']['input'];
  productName: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
  token: Scalars['Float']['input'];
};

export type CreatePaymentInput = {
  name: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
};

export type CreatePayoutInput = {
  display: Scalars['String']['input'];
  method: Scalars['String']['input'];
  name: Scalars['String']['input'];
  status: Scalars['Boolean']['input'];
};

export type CreateSaleInput = {
  invoiceNo: Scalars['Float']['input'];
  memberId: Scalars['ID']['input'];
  orderedAt: Scalars['DateTimeISO']['input'];
  packageId: Scalars['ID']['input'];
  paymentId: Scalars['ID']['input'];
  status: Scalars['Boolean']['input'];
};

export type CreateStatisticsInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  issuedAt: Scalars['DateTimeISO']['input'];
  memberStatistics: Array<CreateStatisticsMemberStatisticsInput>;
  saleIds: Array<Scalars['ID']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
  totalHashPower: Scalars['Float']['input'];
  totalMembers: Scalars['Float']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreateStatisticsMemberStatisticsInput = {
  hashPower: Scalars['Float']['input'];
  memberId: Scalars['ID']['input'];
  percent: Scalars['Float']['input'];
  txcShared: Scalars['Float']['input'];
};

export type CreateStatisticsSaleInput = {
  issuedAt: Scalars['DateTimeISO']['input'];
  saleId: Scalars['ID']['input'];
  statisticsId: Scalars['ID']['input'];
};

export type DailyStats = {
  __typename?: 'DailyStats';
  count: Scalars['Int']['output'];
  field: Scalars['String']['output'];
};

export type EntityStats = {
  __typename?: 'EntityStats';
  dailyData: Array<DailyStats>;
  meta?: Maybe<Scalars['Float']['output']>;
  total: Scalars['Float']['output'];
};

export type IdInput = {
  id: Scalars['ID']['input'];
};

export type IDsInput = {
  ids: Array<Scalars['ID']['input']>;
};

export type LiveStatsArgs = {
  pastDays: Scalars['Float']['input'];
};

export type ManySuccessResponse = {
  __typename?: 'ManySuccessResponse';
  count: Scalars['Float']['output'];
};

export type Member = {
  __typename?: 'Member';
  assetId: Scalars['String']['output'];
  city?: Maybe<Scalars['String']['output']>;
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  email: Scalars['String']['output'];
  fullName: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  mobile: Scalars['String']['output'];
  payout: Payout;
  payoutId: Scalars['ID']['output'];
  primaryAddress: Scalars['String']['output'];
  sales?: Maybe<Array<Maybe<Sale>>>;
  secondaryAddress?: Maybe<Scalars['String']['output']>;
  state?: Maybe<Scalars['String']['output']>;
  statistics?: Maybe<Array<Maybe<MemberStatistics>>>;
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  username: Scalars['String']['output'];
  wallet: Scalars['String']['output'];
  zipCode?: Maybe<Scalars['String']['output']>;
};

export type MemberLoginInput = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};

export type MemberLoginResponse = {
  __typename?: 'MemberLoginResponse';
  accessToken: Scalars['String']['output'];
};

export type MemberOverview = {
  __typename?: 'MemberOverview';
  joinDate: Scalars['DateTimeISO']['output'];
  lastHashPower: Scalars['Float']['output'];
  totalTXCShared: Scalars['Float']['output'];
};

export type MemberOverviewInput = {
  id: Scalars['ID']['input'];
};

export type MemberStatistics = {
  __typename?: 'MemberStatistics';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  hashPower: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['String']['output'];
  percent: Scalars['Float']['output'];
  statistics?: Maybe<Statistics>;
  statisticsId: Scalars['String']['output'];
  txcShared: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type MemberStatisticsResponse = {
  __typename?: 'MemberStatisticsResponse';
  memberStatistics?: Maybe<Array<Maybe<MemberStatistics>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type MembersResponse = {
  __typename?: 'MembersResponse';
  members?: Maybe<Array<Maybe<Member>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  adminLogin: AdminLoginResponse;
  createAdmin: Admin;
  createBlock: Block;
  createManyMemberStatistics: ManySuccessResponse;
  createManyStatisticsSales: ManySuccessResponse;
  createMember: Member;
  createMemberStatistics: MemberStatistics;
  createPackage: Package;
  createPayment: Payment;
  createPayout: Payout;
  createSale: Sale;
  createStatistics: Statistics;
  createStatisticsSale: StatisticsSale;
  memberLogin: MemberLoginResponse;
  removeAdmins: ManySuccessResponse;
  removeManyMemberStatistics: ManySuccessResponse;
  removeManyStatistics: ManySuccessResponse;
  removeManyStatisticsSales: ManySuccessResponse;
  removeMemberStatisticsByStaitisId: ManySuccessResponse;
  removeStatisticsSalesByStaitisId: ManySuccessResponse;
  updateAdmin: Admin;
  updateMember: Member;
  updatePassword: Admin;
  updatePasswordById: Member;
  updateSale: Sale;
  updateStatistics: Statistics;
};


export type MutationAdminLoginArgs = {
  data: AdminLoginInput;
};


export type MutationCreateAdminArgs = {
  data: CreateAdminInput;
};


export type MutationCreateBlockArgs = {
  data: CreateBlockInput;
};


export type MutationCreateManyMemberStatisticsArgs = {
  data: CreateManyMemberStatisticsInput;
};


export type MutationCreateManyStatisticsSalesArgs = {
  data: CreateManyStatisticsSaleInput;
};


export type MutationCreateMemberArgs = {
  data: CreateMemberInput;
};


export type MutationCreateMemberStatisticsArgs = {
  data: CreateMemberStatisticsInput;
};


export type MutationCreatePackageArgs = {
  data: CreatePackageInput;
};


export type MutationCreatePaymentArgs = {
  data: CreatePaymentInput;
};


export type MutationCreatePayoutArgs = {
  data: CreatePayoutInput;
};


export type MutationCreateSaleArgs = {
  data: CreateSaleInput;
};


export type MutationCreateStatisticsArgs = {
  data: CreateStatisticsInput;
};


export type MutationCreateStatisticsSaleArgs = {
  data: CreateStatisticsSaleInput;
};


export type MutationMemberLoginArgs = {
  data: MemberLoginInput;
};


export type MutationRemoveAdminsArgs = {
  data: IDsInput;
};


export type MutationRemoveManyMemberStatisticsArgs = {
  data: IDsInput;
};


export type MutationRemoveManyStatisticsArgs = {
  data: IDsInput;
};


export type MutationRemoveManyStatisticsSalesArgs = {
  data: IDsInput;
};


export type MutationRemoveMemberStatisticsByStaitisIdArgs = {
  data: IdInput;
};


export type MutationRemoveStatisticsSalesByStaitisIdArgs = {
  data: IdInput;
};


export type MutationUpdateAdminArgs = {
  data: UpdateAdminInput;
};


export type MutationUpdateMemberArgs = {
  data: UpdateMemberInput;
};


export type MutationUpdatePasswordArgs = {
  data: UpdateAdminPasswordInput;
};


export type MutationUpdatePasswordByIdArgs = {
  data: UpdateMemberPasswordInputById;
};


export type MutationUpdateSaleArgs = {
  data: UpdateSaleInput;
};


export type MutationUpdateStatisticsArgs = {
  data: UpdateStatisticsInput;
};

export type Package = {
  __typename?: 'Package';
  amount: Scalars['Float']['output'];
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  date: Scalars['DateTimeISO']['output'];
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  productName: Scalars['String']['output'];
  sales?: Maybe<Array<Maybe<Sale>>>;
  status: Scalars['Boolean']['output'];
  token: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PackageResponse = {
  __typename?: 'PackageResponse';
  packages?: Maybe<Array<Maybe<Package>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Payment = {
  __typename?: 'Payment';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  sales?: Maybe<Array<Maybe<Sale>>>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PaymentResponse = {
  __typename?: 'PaymentResponse';
  payments?: Maybe<Array<Maybe<Payment>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Payout = {
  __typename?: 'Payout';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  display: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  members?: Maybe<Array<Maybe<Member>>>;
  method: Scalars['String']['output'];
  name: Scalars['String']['output'];
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type PayoutResponse = {
  __typename?: 'PayoutResponse';
  payouts?: Maybe<Array<Maybe<Payout>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type PendingStatistics = {
  __typename?: 'PendingStatistics';
  txcShared: Scalars['Float']['output'];
  wallet: Scalars['String']['output'];
};

export type PendingStatisticsResponse = {
  __typename?: 'PendingStatisticsResponse';
  results: Array<PendingStatistics>;
};

export type Query = {
  __typename?: 'Query';
  adminMe: Admin;
  admins: AdminsResponse;
  blocks: BlocksResponse;
  liveBlockStats: EntityStats;
  liveMiningStats: EntityStats;
  liveUserStats: EntityStats;
  memberMe: Member;
  memberOverview: MemberOverview;
  memberStatistics: MemberStatisticsResponse;
  members: MembersResponse;
  packages: PackageResponse;
  payments: PaymentResponse;
  payouts: PayoutResponse;
  pendingStatistics: PendingStatisticsResponse;
  sales: SalesResponse;
  statistics: StatisticsResponse;
  statisticsSales: StatisticsSaleResponse;
};


export type QueryAdminsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryBlocksArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryLiveBlockStatsArgs = {
  data: LiveStatsArgs;
};


export type QueryLiveUserStatsArgs = {
  data: LiveStatsArgs;
};


export type QueryMemberOverviewArgs = {
  data: MemberOverviewInput;
};


export type QueryMemberStatisticsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryMembersArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPackagesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPaymentsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPayoutsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryPendingStatisticsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QuerySalesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatisticsArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};


export type QueryStatisticsSalesArgs = {
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
};

export type Sale = {
  __typename?: 'Sale';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  invoiceNo: Scalars['Float']['output'];
  member?: Maybe<Member>;
  memberId: Scalars['ID']['output'];
  orderedAt: Scalars['DateTimeISO']['output'];
  package?: Maybe<Package>;
  packageId: Scalars['ID']['output'];
  payment?: Maybe<Payment>;
  paymentId: Scalars['String']['output'];
  statisticsSales?: Maybe<Array<Maybe<StatisticsSale>>>;
  status: Scalars['Boolean']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type SalesResponse = {
  __typename?: 'SalesResponse';
  sales?: Maybe<Array<Maybe<Sale>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type Statistics = {
  __typename?: 'Statistics';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  from: Scalars['DateTimeISO']['output'];
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  memberStatistics?: Maybe<Array<Maybe<MemberStatistics>>>;
  newBlocks: Scalars['Float']['output'];
  statisticsSales?: Maybe<Array<Maybe<StatisticsSale>>>;
  status: Scalars['Boolean']['output'];
  to: Scalars['DateTimeISO']['output'];
  totalBlocks: Scalars['Float']['output'];
  totalHashPower: Scalars['Float']['output'];
  totalMembers: Scalars['Float']['output'];
  txcShared: Scalars['Float']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type StatisticsResponse = {
  __typename?: 'StatisticsResponse';
  statistics?: Maybe<Array<Maybe<Statistics>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type StatisticsSale = {
  __typename?: 'StatisticsSale';
  createdAt?: Maybe<Scalars['DateTimeISO']['output']>;
  deletedAt?: Maybe<Scalars['DateTimeISO']['output']>;
  id: Scalars['ID']['output'];
  issuedAt: Scalars['DateTimeISO']['output'];
  sale?: Maybe<Sale>;
  saleId: Scalars['ID']['output'];
  statistics?: Maybe<Statistics>;
  statisticsId: Scalars['ID']['output'];
  updatedAt?: Maybe<Scalars['DateTimeISO']['output']>;
};

export type StatisticsSaleResponse = {
  __typename?: 'StatisticsSaleResponse';
  statisticsSales?: Maybe<Array<Maybe<StatisticsSale>>>;
  total?: Maybe<Scalars['Int']['output']>;
};

export type UpdateAdminInput = {
  avatar?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateAdminPasswordInput = {
  id?: InputMaybe<Scalars['ID']['input']>;
  newPassword: Scalars['String']['input'];
  oldPassword?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMemberInput = {
  assetId?: InputMaybe<Scalars['String']['input']>;
  city?: InputMaybe<Scalars['String']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  fullName?: InputMaybe<Scalars['String']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  mobile?: InputMaybe<Scalars['String']['input']>;
  payoutId?: InputMaybe<Scalars['String']['input']>;
  primaryAddress?: InputMaybe<Scalars['String']['input']>;
  secondaryAddress?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  username?: InputMaybe<Scalars['String']['input']>;
  wallet?: InputMaybe<Scalars['String']['input']>;
  zipCode?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateMemberPasswordInputById = {
  id: Scalars['ID']['input'];
  newPassword: Scalars['String']['input'];
};

export type UpdateSaleInput = {
  id: Scalars['ID']['input'];
  invoiceNo?: InputMaybe<Scalars['Float']['input']>;
  memberId?: InputMaybe<Scalars['ID']['input']>;
  orderedAt?: InputMaybe<Scalars['DateTimeISO']['input']>;
  packageId?: InputMaybe<Scalars['ID']['input']>;
  paymentId?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<Scalars['Boolean']['input']>;
};

export type UpdateStatisticsInput = {
  id: Scalars['ID']['input'];
  status?: InputMaybe<Scalars['Boolean']['input']>;
  txcShared?: InputMaybe<Scalars['Float']['input']>;
};

export type FetchMeQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchMeQuery = { __typename?: 'Query', memberMe: { __typename?: 'Member', id: string, username: string, fullName: string, email: string, mobile: string, assetId: string, payoutId: string, wallet: string, primaryAddress: string, secondaryAddress?: string | null, city?: string | null, state?: string | null, zipCode?: string | null, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, payout: { __typename?: 'Payout', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, method: string, status: boolean, name: string, display: string } } };

export type RewardQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type RewardQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, issuedAt: any, newBlocks: number, totalBlocks: number, totalHashPower: number, totalMembers: number, txcShared: number, from: any, to: any, status: boolean, statisticsSales?: Array<{ __typename?: 'StatisticsSale', id: string, saleId: string, issuedAt: any } | null> | null } | null> | null } };

export type FetchMemberStatisticsQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchMemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, memberId: string, statisticsId: string, txcShared: number, hashPower: number, percent: number, issuedAt: any, member?: { __typename?: 'Member', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, username: string, fullName: string, email: string, mobile: string, assetId: string, payoutId: string, wallet: string, primaryAddress: string, secondaryAddress?: string | null, payout: { __typename?: 'Payout', id: string, name: string, status: boolean, method: string, display: string } } | null, statistics?: { __typename?: 'Statistics', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, newBlocks: number, totalBlocks: number, totalHashPower: number, totalMembers: number, status: boolean, txcShared: number, issuedAt: any, from: any, to: any } | null } | null> | null } };

export type CreateStatisticsMutationVariables = Exact<{
  data: CreateStatisticsInput;
}>;


export type CreateStatisticsMutation = { __typename?: 'Mutation', createStatistics: { __typename?: 'Statistics', id: string, newBlocks: number } };

export type CreateManyMemberStatisticsMutationVariables = Exact<{
  data: CreateManyMemberStatisticsInput;
}>;


export type CreateManyMemberStatisticsMutation = { __typename?: 'Mutation', createManyMemberStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type UpdateStatisticsMutationVariables = Exact<{
  data: UpdateStatisticsInput;
}>;


export type UpdateStatisticsMutation = { __typename?: 'Mutation', updateStatistics: { __typename?: 'Statistics', status: boolean, txcShared: number } };

export type RemoveMemberStatisticsByStaitisIdMutationVariables = Exact<{
  data: IdInput;
}>;


export type RemoveMemberStatisticsByStaitisIdMutation = { __typename?: 'Mutation', removeMemberStatisticsByStaitisId: { __typename?: 'ManySuccessResponse', count: number } };

export type RemoveManyStatisticsMutationVariables = Exact<{
  data: IDsInput;
}>;


export type RemoveManyStatisticsMutation = { __typename?: 'Mutation', removeManyStatistics: { __typename?: 'ManySuccessResponse', count: number } };

export type FetchSalesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchSalesQuery = { __typename?: 'Query', sales: { __typename?: 'SalesResponse', total?: number | null, sales?: Array<{ __typename?: 'Sale', id: string, invoiceNo: number, memberId: string, packageId: string, paymentId: string, orderedAt: any, status: boolean, member?: { __typename?: 'Member', id: string, username: string, fullName: string, email: string, mobile: string, assetId: string, primaryAddress: string, secondaryAddress?: string | null, payoutId: string, wallet: string, payout: { __typename?: 'Payout', id: string, name: string, status: boolean, method: string, display: string } } | null, package?: { __typename?: 'Package', id: string, productName: string, amount: number, date: any, token: number, status: boolean } | null } | null> | null } };

export type FetchSaleStatsQueryVariables = Exact<{
  inactiveFilter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type FetchSaleStatsQuery = { __typename?: 'Query', all: { __typename?: 'SalesResponse', total?: number | null }, inactive: { __typename?: 'SalesResponse', total?: number | null } };

export type CreateSaleMutationVariables = Exact<{
  data: CreateSaleInput;
}>;


export type CreateSaleMutation = { __typename?: 'Mutation', createSale: { __typename?: 'Sale', invoiceNo: number, orderedAt: any, memberId: string, paymentId: string, packageId: string, status: boolean } };

export type UpdateSaleMutationVariables = Exact<{
  data: UpdateSaleInput;
}>;


export type UpdateSaleMutation = { __typename?: 'Mutation', updateSale: { __typename?: 'Sale', id: string, status: boolean } };

export type PackagesQueryVariables = Exact<{
  sort?: InputMaybe<Scalars['String']['input']>;
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
}>;


export type PackagesQuery = { __typename?: 'Query', packages: { __typename?: 'PackageResponse', total?: number | null, packages?: Array<{ __typename?: 'Package', createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, id: string, productName: string, amount: number, status: boolean, date: any, token: number } | null> | null } };

export type LoginMutationVariables = Exact<{
  data: MemberLoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', memberLogin: { __typename?: 'MemberLoginResponse', accessToken: string } };

export type QueryQueryVariables = Exact<{
  data: LiveStatsArgs;
}>;


export type QueryQuery = { __typename?: 'Query', liveBlockStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> }, liveMiningStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> }, liveUserStats: { __typename?: 'EntityStats', meta?: number | null, total: number, dailyData: Array<{ __typename?: 'DailyStats', count: number, field: string }> } };

export type BlocksQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type BlocksQuery = { __typename?: 'Query', blocks: { __typename?: 'BlocksResponse', total?: number | null, blocks?: Array<{ __typename?: 'Block', id: string, blockNo: number, hashRate: number, difficulty: number, issuedAt: any, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null } };

export type StatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type StatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, totalHashPower: number, newBlocks: number, totalBlocks: number, totalMembers: number, txcShared: number, issuedAt: any, from: any, to: any, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null } };

export type TxcMemberStatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type TxcMemberStatisticsQuery = { __typename?: 'Query', memberStatistics: { __typename?: 'MemberStatisticsResponse', total?: number | null, memberStatistics?: Array<{ __typename?: 'MemberStatistics', id: string, hashPower: number, txcShared: number, issuedAt: any, percent: number, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null, member?: { __typename?: 'Member', username: string, wallet: string, email: string, assetId: string } | null, statistics?: { __typename?: 'Statistics', newBlocks: number, status: boolean } | null } | null> | null } };

export type HistoryStatisticsQueryVariables = Exact<{
  page?: InputMaybe<Scalars['String']['input']>;
  filter?: InputMaybe<Scalars['JSONObject']['input']>;
  sort?: InputMaybe<Scalars['String']['input']>;
}>;


export type HistoryStatisticsQuery = { __typename?: 'Query', statistics: { __typename?: 'StatisticsResponse', total?: number | null, statistics?: Array<{ __typename?: 'Statistics', id: string, totalHashPower: number, newBlocks: number, totalBlocks: number, totalMembers: number, txcShared: number, issuedAt: any, from: any, to: any, status: boolean, createdAt?: any | null, updatedAt?: any | null, deletedAt?: any | null } | null> | null } };


export const FetchMeDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberMe"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"city"}},{"kind":"Field","name":{"kind":"Name","value":"state"}},{"kind":"Field","name":{"kind":"Name","value":"zipCode"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}}]}}]} as unknown as DocumentNode<FetchMeQuery, FetchMeQueryVariables>;
export const RewardDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Reward"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsSales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"saleId"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<RewardQuery, RewardQueryVariables>;
export const FetchMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"statisticsId"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchMemberStatisticsQuery, FetchMemberStatisticsQueryVariables>;
export const CreateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}}]}}]}}]} as unknown as DocumentNode<CreateStatisticsMutation, CreateStatisticsMutationVariables>;
export const CreateManyMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateManyMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateManyMemberStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createManyMemberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<CreateManyMemberStatisticsMutation, CreateManyMemberStatisticsMutationVariables>;
export const UpdateStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateStatisticsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}}]}}]}}]} as unknown as DocumentNode<UpdateStatisticsMutation, UpdateStatisticsMutationVariables>;
export const RemoveMemberStatisticsByStaitisIdDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveMemberStatisticsByStaitisId"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeMemberStatisticsByStaitisId"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveMemberStatisticsByStaitisIdMutation, RemoveMemberStatisticsByStaitisIdMutationVariables>;
export const RemoveManyStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"RemoveManyStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"IDsInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"removeManyStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}}]}}]}}]} as unknown as DocumentNode<RemoveManyStatisticsMutation, RemoveManyStatisticsMutationVariables>;
export const FetchSalesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSales"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"invoiceNo"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"fullName"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"mobile"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}},{"kind":"Field","name":{"kind":"Name","value":"primaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"secondaryAddress"}},{"kind":"Field","name":{"kind":"Name","value":"payoutId"}},{"kind":"Field","name":{"kind":"Name","value":"payout"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"method"}},{"kind":"Field","name":{"kind":"Name","value":"display"}}]}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}}]}},{"kind":"Field","name":{"kind":"Name","value":"package"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchSalesQuery, FetchSalesQueryVariables>;
export const FetchSaleStatsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"FetchSaleStats"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","alias":{"kind":"Name","value":"all"},"name":{"kind":"Name","value":"sales"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","alias":{"kind":"Name","value":"inactive"},"name":{"kind":"Name","value":"sales"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"inactiveFilter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<FetchSaleStatsQuery, FetchSaleStatsQueryVariables>;
export const CreateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"CreateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"CreateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"invoiceNo"}},{"kind":"Field","name":{"kind":"Name","value":"orderedAt"}},{"kind":"Field","name":{"kind":"Name","value":"memberId"}},{"kind":"Field","name":{"kind":"Name","value":"paymentId"}},{"kind":"Field","name":{"kind":"Name","value":"packageId"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<CreateSaleMutation, CreateSaleMutationVariables>;
export const UpdateSaleDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"UpdateSale"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"UpdateSaleInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateSale"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateSaleMutation, UpdateSaleMutationVariables>;
export const PackagesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Packages"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}},{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"packages"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"productName"}},{"kind":"Field","name":{"kind":"Name","value":"amount"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"date"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<PackagesQuery, PackagesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"Login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"MemberLoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberLogin"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"accessToken"}}]}}]}}]} as unknown as DocumentNode<LoginMutation, LoginMutationVariables>;
export const QueryDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Query"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"data"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LiveStatsArgs"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"liveBlockStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveMiningStats"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}},{"kind":"Field","name":{"kind":"Name","value":"liveUserStats"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"data"},"value":{"kind":"Variable","name":{"kind":"Name","value":"data"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"dailyData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"count"}},{"kind":"Field","name":{"kind":"Name","value":"field"}}]}},{"kind":"Field","name":{"kind":"Name","value":"meta"}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<QueryQuery, QueryQueryVariables>;
export const BlocksDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Blocks"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"blocks"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"blockNo"}},{"kind":"Field","name":{"kind":"Name","value":"hashRate"}},{"kind":"Field","name":{"kind":"Name","value":"difficulty"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<BlocksQuery, BlocksQueryVariables>;
export const StatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Statistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<StatisticsQuery, StatisticsQueryVariables>;
export const TxcMemberStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"TXCMemberStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"memberStatistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"hashPower"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"percent"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}},{"kind":"Field","name":{"kind":"Name","value":"member"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"wallet"}},{"kind":"Field","name":{"kind":"Name","value":"email"}},{"kind":"Field","name":{"kind":"Name","value":"assetId"}}]}},{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<TxcMemberStatisticsQuery, TxcMemberStatisticsQueryVariables>;
export const HistoryStatisticsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"HistoryStatistics"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"page"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"filter"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"JSONObject"}}},{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"sort"}},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"page"},"value":{"kind":"Variable","name":{"kind":"Name","value":"page"}}},{"kind":"Argument","name":{"kind":"Name","value":"filter"},"value":{"kind":"Variable","name":{"kind":"Name","value":"filter"}}},{"kind":"Argument","name":{"kind":"Name","value":"sort"},"value":{"kind":"Variable","name":{"kind":"Name","value":"sort"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"statistics"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"totalHashPower"}},{"kind":"Field","name":{"kind":"Name","value":"newBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalBlocks"}},{"kind":"Field","name":{"kind":"Name","value":"totalMembers"}},{"kind":"Field","name":{"kind":"Name","value":"txcShared"}},{"kind":"Field","name":{"kind":"Name","value":"issuedAt"}},{"kind":"Field","name":{"kind":"Name","value":"from"}},{"kind":"Field","name":{"kind":"Name","value":"to"}},{"kind":"Field","name":{"kind":"Name","value":"status"}},{"kind":"Field","name":{"kind":"Name","value":"createdAt"}},{"kind":"Field","name":{"kind":"Name","value":"updatedAt"}},{"kind":"Field","name":{"kind":"Name","value":"deletedAt"}}]}},{"kind":"Field","name":{"kind":"Name","value":"total"}}]}}]}}]} as unknown as DocumentNode<HistoryStatisticsQuery, HistoryStatisticsQueryVariables>;