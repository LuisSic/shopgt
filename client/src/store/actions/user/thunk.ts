import { Action } from 'redux';
import { RootState } from '../..';
import shopgt from '../../../apis/shopgt';
import { ThunkAction } from 'redux-thunk';
import { signIn, signOut } from './actions';
import history from '../../../history';
type AppThunk<ReturnType = void> = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export const ThunkSignIn = (): AppThunk => async (dispatch) => {
  const response = await shopgt.get('/api/users/currentuser', {
    withCredentials: true,
  });
  if (response.data.currentUser !== null) {
    dispatch(
      signIn({
        userId: response.data.currentUser.id,
        isSignedIn: true,
        photo: response.data.currentUser.photo,
        name: response.data.currentUser.name,
      })
    );
  }
};

export const ThunkSignOut = (): AppThunk => async (dispatch) => {
  await shopgt.post('/api/users/signout', {
    withCredentials: true,
  });
  dispatch(signOut());
  history.push('/');
};
