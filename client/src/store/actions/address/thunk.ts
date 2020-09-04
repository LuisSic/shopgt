import { Action } from 'redux';
import { RootState } from '../../';
import { ThunkAction } from 'redux-thunk';
import shopgt from '../../../apis/shopgt';
import {
  createAddress,
  editAddress,
  deleteAddress,
  fetchAddresses,
  fetchAddress,
} from './actions';
import { setError } from '../error/actions';
import { AddressRequest } from './types';
import history from '../../../history';
import { isEmpty } from 'lodash';
type AppThunk<ReturnType = void> = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export const thunkCreateAddress = (address: AddressRequest): AppThunk => async (
  dispatch
) => {
  try {
    const response = await shopgt.post('/api/address', address);
    dispatch(
      createAddress({
        id: response.data.id,
        address: response.data.address,
        country: response.data.country,
        deparment: response.data.deparment,
        township: response.data.township,
        status: response.data.status,
        version: response.data.version,
        position: response.data.position,
        userId: response.data.userId,
      })
    );
    history.push('/addresses/list');
  } catch (err) {
    if (err && err.response) {
      dispatch(
        setError({
          error: err.response.data.errors,
          isOpen: true,
        })
      );
    }
  }
};

export const thunkEditAddress = (address: AddressRequest): AppThunk => async (
  dispatch
) => {
  const response = await shopgt.put('/api/address', address);
  dispatch(
    editAddress({
      id: response.data.id,
      address: response.data.address,
      country: response.data.country,
      deparment: response.data.deparment,
      township: response.data.township,
      status: response.data.status,
      version: response.data.version,
      position: response.data.position,
      userId: response.data.userId,
    })
  );
};

export const thunkDeleteAddress = (id: string): AppThunk => async (
  dispatch
) => {
  const response = await shopgt.delete(`/api/address/:${id}`);
  console.log(response);
  dispatch(deleteAddress(id));
};

export const thunkFetchAddress = (id: string): AppThunk => async (dispatch) => {
  const response = await shopgt.get(`/api/address/:${id}`);
  dispatch(fetchAddress(response.data));
};

export const thunkFetchAddresses = (): AppThunk => async (
  dispatch,
  getState
) => {
  const address = getState().address;
  if (isEmpty(address)) {
    const response = await shopgt.get(`/api/address`);
    dispatch(fetchAddresses(response.data));
  }
};
