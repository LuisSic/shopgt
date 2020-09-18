import { ThunkAction } from 'redux-thunk';
import { Action } from 'redux';
import { createOrder, cancelOrder, fetchOrder, fetchOrders } from './actions';
import shopgt from '../../../apis/shopgt';
import history from '../../../history';
import { RootState } from '../../';
import { setError } from '../error/actions';
import { OrderRequest, Order } from './types';
import { cleanShopCart } from '../shopCart/actions';
import { showLoader, hideLoader } from '../loader/actios';

type AppThunk<ReturnType = void> = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export const thunkCreateOrder = (order: OrderRequest): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showLoader());
    const response = await shopgt.post<Order>('/api/order', order);
    dispatch(createOrder(response.data));
    dispatch(cleanShopCart());
    dispatch(hideLoader());
    history.push('/order/list');
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

export const thunkCancelOrder = (orderId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showLoader());
    const response = await shopgt.put<Order>(`/api/order/${orderId}`);
    dispatch(cancelOrder(response.data));
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
};

export const thunkFetchOrder = (orderId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showLoader());
    const response = await shopgt.get<Order>(`/api/order/${orderId}`);
    dispatch(fetchOrder(response.data));
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
};

export const thunkFetchOrders = (): AppThunk => async (dispatch) => {
  try {
    dispatch(showLoader());
    const response = await shopgt.get<Order[]>(`/api/order`);
    dispatch(fetchOrders(response.data));
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
};

export const thunkPayOrder = (
  orderId: string,
  token: string,
  email: string
): AppThunk => async (dispatch) => {
  try {
    await shopgt.post(`/api/payments`, {
      orderId,
      token,
      email,
    });
    dispatch(hideLoader());
    history.push('/order/list');
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
