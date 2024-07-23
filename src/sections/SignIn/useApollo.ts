import { useMutation } from '@apollo/client';

import { gql } from 'src/__generated__/gql';
// ----------------------------------------------------------------------

const LOGIN_MUTATION = gql(/* GraphQL */ `
  mutation Login($data: MemberLoginInput!) {
    memberLogin(data: $data) {
      accessToken
    }
  }
`);

// ----------------------------------------------------------------------

export function useApollo() {
  const [submitLogin, { error }] = useMutation(LOGIN_MUTATION);

  return { submitLogin, error };
}
