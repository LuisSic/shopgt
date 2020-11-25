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
import { AddressRequest, Address } from './types';
import history from '../../../history';
import { showLoader, hideLoader } from '../loader/actios';

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
    dispatch(showLoader());
    const response = await shopgt.post<Address>('/api/address', address);
    dispatch(createAddress(response.data));
    dispatch(hideLoader());
    history.push('/address/list');
  } catch (err) {
    console.log(err);
    dispatch(hideLoader());
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
    dispatch(showLoader());
    const response = await shopgt.put<Address>(
      `/api/address/${idAddress}`,
      address
    );
    dispatch(editAddress(response.data));
    dispatch(hideLoader());
    history.push('/address/list');
  } catch (err) {
    dispatch(hideLoader());
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
    dispatch(showLoader());
    await shopgt.delete(`/api/address/${id}`);
    dispatch(deleteAddress(id));
    dispatch(hideLoader());
    history.push('/address/list');
  } catch (err) {
    dispatch(hideLoader());
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
      dispatch(showLoader());
      const response = await shopgt.get<Address>(`/api/address/${id}`);
      dispatch(fetchAddress(response.data));
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
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
      dispatch(showLoader());
      const response = await shopgt.get<Address[]>(`/api/address`);
      dispatch(fetchAddresses(response.data));
      dispatch(hideLoader());
    } catch (err) {
      dispatch(hideLoader());
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
