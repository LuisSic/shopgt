import { UserActionTypes, UserState, Auth } from './types';

export const signIn = (user: UserState): UserActionTypes => {
  return {
    type: Auth.SIGN_IN,
    payload: user,
  };
};
export const signOut = (): UserActionTypes => {
  return {
    type: Auth.SIGN_OUT,
  };
};
