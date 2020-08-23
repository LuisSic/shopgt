import { UserState, Auth, UserActionTypes } from '../actions/user/types';

const initialState: UserState = {
  userId: '',
  isSignedIn: false,
  photo: '',
  name: '',
};

export default (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case Auth.SIGN_IN:
      return { ...state, ...action.payload };
    case Auth.SIGN_OUT:
      return { ...state, userId: '', isSignedIn: false, photo: '', name: '' };
    default:
      return state;
  }
};
