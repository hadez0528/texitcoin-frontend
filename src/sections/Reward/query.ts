import { gql } from 'src/__generated__/gql';

export const FETCH_STATISTICS_QUERY = gql(/* GraphQL */ `
  query Reward($sort: String, $page: String, $filter: JSONObject) {
    statistics(sort: $sort, page: $page, filter: $filter) {
      statistics {
        id
        issuedAt
        newBlocks
        totalBlocks
        totalHashPower
        totalMembers
        txcShared
        from
        to
        status
      }
      total
    }
  }
`);

export const FETCH_MEMBERSTATISTICS_QUERY = gql(/* GraphQL */ `
  query FetchMemberStatistics($sort: String, $page: String, $filter: JSONObject) {
    memberStatistics(sort: $sort, page: $page, filter: $filter) {
      memberStatistics {
        createdAt
        updatedAt
        deletedAt
        id
        memberId
        statisticsId
        txcShared
        hashPower
        percent
        issuedAt
        member {
          createdAt
          updatedAt
          deletedAt
          id
          username
          fullName
          email
          mobile
          assetId
          txcPayout
          txcCold
          address
        }
        statistics {
          createdAt
          updatedAt
          deletedAt
          id
          newBlocks
          totalBlocks
          totalHashPower
          totalMembers
          status
          txcShared
          issuedAt
          from
          to
        }
      }
      total
    }
  }
`);

export const CREATE_MEMBER_STATISTICS_QUERY = gql(/* GraphQL */ `
  mutation CreateMemberStatistics($data: CreateMemberStatisticsInput!) {
    createMemberStatistics(data: $data) {
      hashPower
      issuedAt
      memberId
      percent
      statisticsId
      txcShared
    }
  }
`);
