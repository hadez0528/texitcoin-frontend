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
    "\n  query FetchMe {\n    me {\n      id\n      avatar\n      username\n      email\n      isAdmin\n    }\n  }\n": types.FetchMeDocument,
    "\n  query FetchMemberStats($inactiveFilter: JSONObject) {\n    all: members {\n      total\n    }\n    inactive: members(filter: $inactiveFilter) {\n      total\n    }\n  }\n": types.FetchMemberStatsDocument,
    "\n  query FetchMembers($page: String, $filter: JSONObject, $sort: String) {\n    members(page: $page, filter: $filter, sort: $sort) {\n      members {\n        id\n        username\n        fullName\n        email\n        address\n        assetId\n        mobile\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        wallet\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.FetchMembersDocument,
    "\n  mutation CreateMember($data: CreateMemberInput!) {\n    createMember(data: $data) {\n      username\n      fullName\n      email\n      mobile\n      address\n      assetId\n      wallet\n      payoutId\n    }\n  }\n": types.CreateMemberDocument,
    "\n  query FetchMember($filter: JSONObject) {\n    members(filter: $filter) {\n      members {\n        id\n        username\n        fullName\n        email\n        mobile\n        address\n        assetId\n        wallet\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        deletedAt\n      }\n    }\n  }\n": types.FetchMemberDocument,
    "\n  mutation UpdateMember($data: UpdateMemberInput!) {\n    updateMember(data: $data) {\n      id\n      mobile\n      address\n      payout {\n        method\n        display\n      }\n      wallet\n      assetId\n    }\n  }\n": types.UpdateMemberDocument,
    "\n  query MemberOverview($data: MemberOverviewInput!) {\n    memberOverview(data: $data) {\n      lastHashPower\n      totalTXCShared\n      joinDate\n    }\n  }\n": types.MemberOverviewDocument,
    "\n  query MemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        issuedAt\n        hashPower\n        txcShared\n      }\n      total\n    }\n  }\n": types.MemberStatisticsDocument,
    "\n  query Payouts($filter: JSONObject, $page: String, $sort: String) {\n    payouts(filter: $filter, page: $page, sort: $sort) {\n      payouts {\n        id\n        method\n        display\n        name\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.PayoutsDocument,
    "\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n      }\n      total\n    }\n  }\n": types.RewardDocument,
    "\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          address\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n": types.FetchMemberStatisticsDocument,
    "\n  mutation CreateStatistics($data: CreateStatisticsInput!) {\n    createStatistics(data: $data) {\n      id\n      newBlocks\n    }\n  }\n": types.CreateStatisticsDocument,
    "\n  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {\n    createManyMemberStatistics(data: $data) {\n      count\n    }\n  }\n": types.CreateManyMemberStatisticsDocument,
    "\n  mutation UpdateStatistics($data: UpdateStatisticsInput!) {\n    updateStatistics(data: $data) {\n      status\n      txcShared\n    }\n  }\n": types.UpdateStatisticsDocument,
    "\n  mutation RemoveMemberStatisticsByStaitisId($data: StatisticIDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n": types.RemoveMemberStatisticsByStaitisIdDocument,
    "\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          address\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentMethod\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n": types.FetchSalesDocument,
    "\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n": types.FetchSaleStatsDocument,
    "\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentMethod\n      packageId\n      status\n    }\n  }\n": types.CreateSaleDocument,
    "\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        id\n        productName\n      }\n    }\n  }\n": types.PackagesDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n": types.QueryDocument,
    "\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.BlocksDocument,
    "\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        txcShared\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.StatisticsDocument,
    "\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          wallet\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n": types.TxcMemberStatisticsDocument,
    "\n  mutation CreateUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n": types.FetchUserDocument,
    "\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n": types.FetchUserStatsDocument,
    "\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.FetchUsersDocument,
    "\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n        memberStatistics {\n          id\n          hashPower\n          txcShared\n          issuedAt\n          percent\n          createdAt\n          updatedAt\n          deletedAt\n          member {\n            id\n            username\n            wallet\n            email\n            mobile\n          }\n        }\n      }\n      total\n    }\n  }\n": types.HistoryStatisticsDocument,
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
export function gql(source: "\n  query FetchMe {\n    me {\n      id\n      avatar\n      username\n      email\n      isAdmin\n    }\n  }\n"): (typeof documents)["\n  query FetchMe {\n    me {\n      id\n      avatar\n      username\n      email\n      isAdmin\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMemberStats($inactiveFilter: JSONObject) {\n    all: members {\n      total\n    }\n    inactive: members(filter: $inactiveFilter) {\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchMemberStats($inactiveFilter: JSONObject) {\n    all: members {\n      total\n    }\n    inactive: members(filter: $inactiveFilter) {\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMembers($page: String, $filter: JSONObject, $sort: String) {\n    members(page: $page, filter: $filter, sort: $sort) {\n      members {\n        id\n        username\n        fullName\n        email\n        address\n        assetId\n        mobile\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        wallet\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchMembers($page: String, $filter: JSONObject, $sort: String) {\n    members(page: $page, filter: $filter, sort: $sort) {\n      members {\n        id\n        username\n        fullName\n        email\n        address\n        assetId\n        mobile\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        wallet\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateMember($data: CreateMemberInput!) {\n    createMember(data: $data) {\n      username\n      fullName\n      email\n      mobile\n      address\n      assetId\n      wallet\n      payoutId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateMember($data: CreateMemberInput!) {\n    createMember(data: $data) {\n      username\n      fullName\n      email\n      mobile\n      address\n      assetId\n      wallet\n      payoutId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMember($filter: JSONObject) {\n    members(filter: $filter) {\n      members {\n        id\n        username\n        fullName\n        email\n        mobile\n        address\n        assetId\n        wallet\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        deletedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchMember($filter: JSONObject) {\n    members(filter: $filter) {\n      members {\n        id\n        username\n        fullName\n        email\n        mobile\n        address\n        assetId\n        wallet\n        payoutId\n        payout {\n          id\n          name\n          status\n          method\n          display\n        }\n        deletedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateMember($data: UpdateMemberInput!) {\n    updateMember(data: $data) {\n      id\n      mobile\n      address\n      payout {\n        method\n        display\n      }\n      wallet\n      assetId\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateMember($data: UpdateMemberInput!) {\n    updateMember(data: $data) {\n      id\n      mobile\n      address\n      payout {\n        method\n        display\n      }\n      wallet\n      assetId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MemberOverview($data: MemberOverviewInput!) {\n    memberOverview(data: $data) {\n      lastHashPower\n      totalTXCShared\n      joinDate\n    }\n  }\n"): (typeof documents)["\n  query MemberOverview($data: MemberOverviewInput!) {\n    memberOverview(data: $data) {\n      lastHashPower\n      totalTXCShared\n      joinDate\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query MemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        issuedAt\n        hashPower\n        txcShared\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query MemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        issuedAt\n        hashPower\n        txcShared\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Payouts($filter: JSONObject, $page: String, $sort: String) {\n    payouts(filter: $filter, page: $page, sort: $sort) {\n      payouts {\n        id\n        method\n        display\n        name\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Payouts($filter: JSONObject, $page: String, $sort: String) {\n    payouts(filter: $filter, page: $page, sort: $sort) {\n      payouts {\n        id\n        method\n        display\n        name\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Reward($sort: String, $page: String, $filter: JSONObject) {\n    statistics(sort: $sort, page: $page, filter: $filter) {\n      statistics {\n        id\n        issuedAt\n        newBlocks\n        totalBlocks\n        totalHashPower\n        totalMembers\n        txcShared\n        from\n        to\n        status\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          address\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {\n    memberStatistics(sort: $sort, page: $page, filter: $filter) {\n      memberStatistics {\n        createdAt\n        updatedAt\n        deletedAt\n        id\n        memberId\n        statisticsId\n        txcShared\n        hashPower\n        percent\n        issuedAt\n        member {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n          address\n        }\n        statistics {\n          createdAt\n          updatedAt\n          deletedAt\n          id\n          newBlocks\n          totalBlocks\n          totalHashPower\n          totalMembers\n          status\n          txcShared\n          issuedAt\n          from\n          to\n        }\n      }\n      total\n    }\n  }\n"];
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
export function gql(source: "\n  mutation RemoveMemberStatisticsByStaitisId($data: StatisticIDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n"): (typeof documents)["\n  mutation RemoveMemberStatisticsByStaitisId($data: StatisticIDInput!) {\n    removeMemberStatisticsByStaitisId(data: $data) {\n      count\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          address\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentMethod\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchSales($sort: String, $page: String, $filter: JSONObject) {\n    sales(sort: $sort, page: $page, filter: $filter) {\n      sales {\n        id\n        invoiceNo\n        memberId\n        packageId\n        member {\n          id\n          username\n          fullName\n          email\n          mobile\n          assetId\n          address\n          payoutId\n          payout {\n            id\n            name\n            status\n            method\n            display\n          }\n          wallet\n        }\n        package {\n          id\n          productName\n          amount\n          date\n          token\n          status\n        }\n        paymentMethod\n        orderedAt\n        status\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchSaleStats($inactiveFilter: JSONObject) {\n    all: sales {\n      total\n    }\n    inactive: sales(filter: $inactiveFilter) {\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentMethod\n      packageId\n      status\n    }\n  }\n"): (typeof documents)["\n  mutation CreateSale($data: CreateSaleInput!) {\n    createSale(data: $data) {\n      invoiceNo\n      orderedAt\n      memberId\n      paymentMethod\n      packageId\n      status\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        id\n        productName\n      }\n    }\n  }\n"): (typeof documents)["\n  query Packages($sort: String, $page: String, $filter: JSONObject) {\n    packages(sort: $sort, page: $page, filter: $filter) {\n      packages {\n        id\n        productName\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n    }\n  }\n"): (typeof documents)["\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n"): (typeof documents)["\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
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
export function gql(source: "\n  mutation CreateUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation CreateUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n"): (typeof documents)["\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        avatar\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n        memberStatistics {\n          id\n          hashPower\n          txcShared\n          issuedAt\n          percent\n          createdAt\n          updatedAt\n          deletedAt\n          member {\n            id\n            username\n            wallet\n            email\n            mobile\n          }\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query HistoryStatistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n        memberStatistics {\n          id\n          hashPower\n          txcShared\n          issuedAt\n          percent\n          createdAt\n          updatedAt\n          deletedAt\n          member {\n            id\n            username\n            wallet\n            email\n            mobile\n          }\n        }\n      }\n      total\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;