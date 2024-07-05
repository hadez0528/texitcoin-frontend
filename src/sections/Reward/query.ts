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
          payoutId
          payout {
            id
            name
            status
            method
            display
          }
          wallet
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

export const CREATE_STATISTICS = gql(/* GraphQL */ `
  mutation CreateStatistics($data: CreateStatisticsInput!) {
    createStatistics(data: $data) {
      id
      newBlocks
    }
  }
`);

export const CREATE_MANY_MEMBER_STATISTICS = gql(/* GraphQL */ `
  mutation CreateManyMemberStatistics($data: CreateManyMemberStatisticsInput!) {
    createManyMemberStatistics(data: $data) {
      createdCount
    }
  }
`);

export const UPDATE_STATISTICS = gql(/* GraphQL */ `
  mutation UpdateStatistics($data: UpdateStatisticsInput!) {
    updateStatistics(data: $data) {
      status
      txcShared
    }
  }
`);
