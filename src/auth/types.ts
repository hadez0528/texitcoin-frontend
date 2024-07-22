import type { Member } from 'src/__generated__/graphql';

export type AuthContextValue = {
  member?: Member | null;
  loading: boolean;
  isAuthenticated: boolean;
  signIn: (token: string) => void;
  signOut: () => void;
};
