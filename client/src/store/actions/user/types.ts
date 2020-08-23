export enum Auth {
  SIGN_IN = 'SIGN_IN',
  SIGN_OUT = 'SIGN_OUT',
}

export interface UserState {
  userId: string;
  isSignedIn: boolean;
  photo: string;
  name: string;
}

interface UserSignIn {
  type: Auth.SIGN_IN;
  payload: UserState;
}

interface UserSignOut {
  type: Auth.SIGN_OUT;
}

export type UserActionTypes = UserSignIn | UserSignOut;
