/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  query FetchMe {\n    memberMe {\n      id\n      username\n      fullName\n      email\n      mobile\n      assetId\n      payoutId\n      wallet\n      primaryAddress\n      secondaryAddress\n      city\n      state\n      zipCode\n      payout {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        method\n        status\n        name\n        display\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n": types.FetchMeDocument,
    "\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n        statisticsSales {\n          id\n          saleId\n          issuedAt\n        }\n      }\n      total\n    }\n  }\n": types.RewardDocument,
    "\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          primaryAddress\n          secondaryAddress\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n": types.FetchMemberStatisticsDocument,
    "\n  mutation CreateStatistics($data: CreateStatisticsInput!) {\n    createStatistics(data: $data) {\n      id\n      newBlocks\n    }\n  }\n": types.CreateStatisticsDocument,
    "\n  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {\n    createManyMemberStatistics(data: $data) {\n      count\n    }\n  }\n": types.CreateManyMemberStatisticsDocument,
    "\n  mutation UpdateStatistics($data: UpdateStatisticsInput!) {\n    updateStatistics(data: $data) {\n      status\n      txcShared\n    }\n  }\n": types.UpdateStatisticsDocument,
    "\n  mutation RemoveMemberStatisticsByStaitisId($data: IDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n": types.RemoveMemberStatisticsByStaitisIdDocument,
    "\n  mutation RemoveManyStatistics($data: IDsInput!) {\n    removeManyStatistics(data: $data) {\n      count\n    }\n  }\n": types.RemoveManyStatisticsDocument,
    "\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          primaryAddress\n          secondaryAddress\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentId\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n": types.FetchSalesDocument,
    "\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n": types.FetchSaleStatsDocument,
    "\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentId\n      packageId\n      status\n    }\n  }\n": types.CreateSaleDocument,
    "\n  mutation UpdateSale($data: UpdateSaleInput!) {\n    updateSale(data: $data) {\n      id\n      status\n    }\n  }\n": types.UpdateSaleDocument,
    "\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        productName\n        amount\n        status\n        date\n        token\n      }\n      total\n    }\n  }\n": types.PackagesDocument,
    "\n  mutation Login($data: MemberLoginInput!) {\n    memberLogin(data: $data) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n": types.QueryDocument,
    "\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        issuedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.BlocksDocument,
    "\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.StatisticsDocument,
    "\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          wallet\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n": types.TxcMemberStatisticsDocument,
    "\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.HistoryStatisticsDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMe {\n    memberMe {\n      id\n      username\n      fullName\n      email\n      mobile\n      assetId\n      payoutId\n      wallet\n      primaryAddress\n      secondaryAddress\n      city\n      state\n      zipCode\n      payout {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        method\n        status\n        name\n        display\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"): (typeof documents)["\n  query FetchMe {\n    memberMe {\n      id\n      username\n      fullName\n      email\n      mobile\n      assetId\n      payoutId\n      wallet\n      primaryAddress\n      secondaryAddress\n      city\n      state\n      zipCode\n      payout {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        method\n        status\n        name\n        display\n      }\n      createdAt\n      updatedAt\n      deletedAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n        statisticsSales {\n          id\n          saleId\n          issuedAt\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n        statisticsSales {\n          id\n          saleId\n          issuedAt\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          primaryAddress\n          secondaryAddress\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          primaryAddress\n          secondaryAddress\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateStatistics($data: CreateStatisticsInput!) {\n    createStatistics(data: $data) {\n      id\n      newBlocks\n    }\n  }\n"): (typeof documents)["\n  mutation CreateStatistics($data: CreateStatisticsInput!) {\n    createStatistics(data: $data) {\n      id\n      newBlocks\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {\n    createManyMemberStatistics(data: $data) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {\n    createManyMemberStatistics(data: $data) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateStatistics($data: UpdateStatisticsInput!) {\n    updateStatistics(data: $data) {\n      status\n      txcShared\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateStatistics($data: UpdateStatisticsInput!) {\n    updateStatistics(data: $data) {\n      status\n      txcShared\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveMemberStatisticsByStaitisId($data: IDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveMemberStatisticsByStaitisId($data: IDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation RemoveManyStatistics($data: IDsInput!) {\n    removeManyStatistics(data: $data) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveManyStatistics($data: IDsInput!) {\n    removeManyStatistics(data: $data) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          primaryAddress\n          secondaryAddress\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentId\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          primaryAddress\n          secondaryAddress\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentId\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentId\n      packageId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentId\n      packageId\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateSale($data: UpdateSaleInput!) {\n    updateSale(data: $data) {\n      id\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateSale($data: UpdateSaleInput!) {\n    updateSale(data: $data) {\n      id\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        productName\n        amount\n        status\n        date\n        token\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        productName\n        amount\n        status\n        date\n        token\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: MemberLoginInput!) {\n    memberLogin(data: $data) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: MemberLoginInput!) {\n    memberLogin(data: $data) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n"): (typeof documents)["\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        issuedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        issuedAt\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          wallet\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          wallet\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;