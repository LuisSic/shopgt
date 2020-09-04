import authReducer from './reducers/authReducers';
import errorReducer from './reducers/errorReducers';
import addressReducer from './reducers/addressReducers';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  auth: authReducer,
  error: errorReducer,
  address: addressReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;
