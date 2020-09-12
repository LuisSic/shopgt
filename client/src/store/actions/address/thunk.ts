import { Action } from 'redux';
import { isEmpty } from 'lodash';
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
import { AddressRequest, AddressState } from './types';
import history from '../../../history';

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
    const response = await shopgt.post<AddressState>('/api/address', address);
    dispatch(createAddress(response.data));
    history.push('/address/list');
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

export const thunkEditAddress = (
  address: AddressRequest,
  idAddress: string
): AppThunk => async (dispatch) => {
  try {
    const response = await shopgt.put<AddressState>(
      `/api/address/${idAddress}`,
      address
    );
    dispatch(editAddress(response.data));
    history.push('/address/list');
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

export const thunkDeleteAddress = (id: string): AppThunk => async (
  dispatch
) => {
  try {
    await shopgt.delete(`/api/address/${id}`);
    dispatch(deleteAddress(id));
    history.push('/address/list');
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

export const thunkFetchAddress = (id: string): AppThunk => async (
  dispatch,
  getState
) => {
  const address = getState().address;
  if (isEmpty(address)) {
    try {
      const response = await shopgt.get<AddressState>(`/api/address/${id}`);
      dispatch(fetchAddress(response.data));
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
  }
};

export const thunkFetchAddresses = (): AppThunk => async (
  dispatch,
  getState
) => {
  const address = getState().address;
  if (isEmpty(address)) {
    try {
      const response = await shopgt.get(`/api/address`);
      dispatch(fetchAddresses(response.data));
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
  }
};
