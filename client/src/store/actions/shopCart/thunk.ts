import { Action } from 'redux';
import { RootState } from '../../';
import { ThunkAction } from 'redux-thunk';
import shopgt from '../../../apis/shopgt';
import { addCardItem, deleteCardItem, fetchShopCard } from './actions';
import { setError } from '../error/actions';
import { ShopCartRequest, ShopCartResponse } from './types';
import history from '../../../history';
import { showLoader, hideLoader } from '../loader/actios';
type AppThunk<ReturnType = void> = ThunkAction<
  void,
  RootState,
  unknown,
  Action<string>
>;

export const thunkAddItem = (item: ShopCartRequest): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showLoader());
    const response = await shopgt.post<ShopCartResponse>('/api/shopcart', item);
    dispatch(addCardItem(response.data));
    dispatch(hideLoader());
    history.push('/');
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

export const thunkDeleteItem = (productId: string): AppThunk => async (
  dispatch
) => {
  try {
    dispatch(showLoader());
    await shopgt.delete(`/api/shopcart/${productId}`);
    dispatch(deleteCardItem(productId));
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

export const thunkFecthCart = (): AppThunk => async (dispatch, getState) => {
  try {
    const shopCart = getState().shoppingCart;
    if (shopCart.id === '') {
      dispatch(showLoader());
      const response = await shopgt.get<ShopCartResponse>('/api/shopcart');
      dispatch(fetchShopCard(response.data));
      dispatch(hideLoader());
    }
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
