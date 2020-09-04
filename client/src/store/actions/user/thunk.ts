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

export const thunkSignIn = (): AppThunk => async (dispatch) => {
  const response = await shopgt.get('/api/users/currentuser');
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

export const thunkSignOut = (): AppThunk => async (dispatch) => {
  await shopgt.post('/api/users/signout');
  dispatch(signOut());
  history.push('/');
};
