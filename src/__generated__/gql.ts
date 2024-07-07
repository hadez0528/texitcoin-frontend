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
    "\n  query FetchMe {\n    me {\n      id\n      username\n      email\n      isAdmin\n    }\n  }\n": types.FetchMeDocument,
    "\n  mutation Login($data: LoginInput!) {\n    login(data: $data) {\n      accessToken\n    }\n  }\n": types.LoginDocument,
    "\n  query Query($data: LiveStatsArgs!) {\n    liveBlockStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveMiningStats {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n    liveUserStats(data: $data) {\n      dailyData {\n        count\n        field\n      }\n      meta\n      total\n    }\n  }\n": types.QueryDocument,
    "\n  query Blocks($page: String, $filter: JSONObject, $sort: String) {\n    blocks(page: $page, filter: $filter, sort: $sort) {\n      blocks {\n        id\n        blockNo\n        hashRate\n        difficulty\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.BlocksDocument,
    "\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.StatisticsDocument,
    "\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          txcCold\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n": types.TxcMemberStatisticsDocument,
    "\n  mutation CreateUser($data: CreateUserInput!) {\n    createUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n": types.CreateUserDocument,
    "\n  mutation UpdateUser($data: UpdateUserInput!) {\n    updateUser(data: $data) {\n      id\n      username\n      email\n      isAdmin\n      createdAt\n    }\n  }\n": types.UpdateUserDocument,
    "\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n": types.FetchUserDocument,
    "\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n": types.FetchUserStatsDocument,
    "\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n": types.FetchUsersDocument,
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
export function gql(source: "\n  query FetchMe {\n    me {\n      id\n      username\n      email\n      isAdmin\n    }\n  }\n"): (typeof documents)["\n  query FetchMe {\n    me {\n      id\n      username\n      email\n      isAdmin\n    }\n  }\n"];
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
export function gql(source: "\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query Statistics($page: String, $filter: JSONObject, $sort: String) {\n    statistics(page: $page, filter: $filter, sort: $sort) {\n      statistics {\n        id\n        totalHashPower\n        newBlocks\n        totalBlocks\n        totalMembers\n        issuedAt\n        from\n        to\n        status\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          txcCold\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query TXCMemberStatistics($page: String, $filter: JSONObject, $sort: String) {\n    memberStatistics(page: $page, filter: $filter, sort: $sort) {\n      memberStatistics {\n        id\n        hashPower\n        txcShared\n        issuedAt\n        percent\n        createdAt\n        updatedAt\n        deletedAt\n        member {\n          username\n          txcCold\n          email\n          assetId\n        }\n        statistics {\n          newBlocks\n          status\n        }\n      }\n      total\n    }\n  }\n"];
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
export function gql(source: "\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n"): (typeof documents)["\n  query FetchUser($filter: JSONObject) {\n    users(filter: $filter) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        deletedAt\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchUserStats(\n    $adminFilter: JSONObject\n    $apFilter: JSONObject\n    $inactiveFilter: JSONObject\n  ) {\n    all: users {\n      total\n    }\n    admin: users(filter: $adminFilter) {\n      total\n    }\n    ap: users(filter: $apFilter) {\n      total\n    }\n    inactive: users(filter: $inactiveFilter) {\n      total\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"): (typeof documents)["\n  query FetchUsers($page: String, $filter: JSONObject, $sort: String) {\n    users(page: $page, filter: $filter, sort: $sort) {\n      users {\n        id\n        username\n        email\n        isAdmin\n        createdAt\n        updatedAt\n        deletedAt\n      }\n      total\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;