import { useLazyQuery } from '@apollo/client';
import { useMemo, useEffect, useCallback } from 'react';

import { paths } from 'src/routes/paths';
import { useRouter } from 'src/routes/hooks';

import { gql } from 'src/__generated__/gql';
import { STORAGE_TOKEN_KEY } from 'src/consts';

import { toast } from 'src/components/SnackBar';

import { setSession } from '../utils';
import { AuthContext } from './AuthContext';
import { setToken, isValidToken, setTokenTimer } from './utils';

import type { AuthContextValue } from '../types';
// ----------------------------------------------------------------------

type Props = {
  children: React.ReactNode;
};

// ----------------------------------------------------------------------
const FETCH_ME_QUERY = gql(/* GraphQL */ `
  query FetchMe {
    me {
      id
      username
      email
      isAdmin
    }
  }
`);

// ----------------------------------------------------------------------

export function AuthProvider({ children }: Props) {
  const token = localStorage.getItem(STORAGE_TOKEN_KEY);

  const router = useRouter();

  const [fetchMe, { loading, error, data }] = useLazyQuery(FETCH_ME_QUERY);

  const signIn = useCallback(
    (newToken: string) => {
      setSession(newToken);
      setToken(newToken);
      toast.success('Successfully logged in');
      router.push(paths.dashboard.user.root);
    },
    [router]
  );

  useEffect(() => {
    let timerId: NodeJS.Timeout | undefined;
    if (token && isValidToken(token)) {
      fetchMe();
      timerId = setTokenTimer(token);
    }
    return () => {
      clearTimeout(timerId);
    };
  }, [token, fetchMe]);

  useEffect(() => {
    if (error) {
      // TODO: Show alert token is invalid
      setToken(null);
    }
  }, [error]);

  // LOGOUT ACTION
  const signOut = useCallback(() => {
    setToken(null);
    router.push(paths.statistics.root);
  }, [router]);

  const user = data?.me;

  const memoizedValue: AuthContextValue = useMemo(
    () => ({ user, token, isAuthenticated: !!token, loading, signIn, signOut }),
    [user, token, loading, signIn, signOut]
  );

  return <AuthContext.Provider value={memoizedValue}>{children}</AuthContext.Provider>;
}
