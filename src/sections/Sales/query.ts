import { gql } from 'src/__generated__/gql';

export const FETCH_SALES_QUERY = gql(/* GraphQL */ `
  query FetchSales($sort: String, $page: String, $filter: JSONObject) {
    sales(sort: $sort, page: $page, filter: $filter) {
      sales {
        id
        invoiceNo
        memberId
        packageId
        member {
          id
          username
          fullName
          email
          mobile
          assetId
          primaryAddress
          secondaryAddress
          payoutId
          payout {
            id
            name
            status
            method
            display
          }
          wallet
        }
        package {
          id
          productName
          amount
          date
          token
          status
        }
        paymentId
        orderedAt
        status
      }
      total
    }
  }
`);

export const FETCH_SALES_STATS_QUERY = gql(/* GraphQL */ `
  query FetchSaleStats($inactiveFilter: JSONObject) {
    all: sales {
      total
    }
    inactive: sales(filter: $inactiveFilter) {
      total
    }
  }
`);

export const CREATE_SALE = gql(/* GraphQL */ `
  mutation CreateSale($data: CreateSaleInput!) {
    createSale(data: $data) {
      invoiceNo
      orderedAt
      memberId
      paymentId
      packageId
      status
    }
  }
`);

export const UPDATE_SALE = gql(/* GraphQL */ `
  mutation UpdateSale($data: UpdateSaleInput!) {
    updateSale(data: $data) {
      id
      status
    }
  }
`);

export const FETCH_PACKAGES_QUERY = gql(/* GraphQL */ `
  query Packages($sort: String, $page: String, $filter: JSONObject) {
    packages(sort: $sort, page: $page, filter: $filter) {
      packages {
        createdAt
        updatedAt
        deletedAt
        id
        productName
        amount
        status
        date
        token
      }
      total
    }
  }
`);
