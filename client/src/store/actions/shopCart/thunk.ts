import { Action } from 'redux';
import { RootState } from '../../';
import { ThunkAction } from 'redux-thunk';
import shopgt from '../../../apis/shopgt';
import { addCardItem, deleteCardItem, fetchShopCard } from './actions';
import { setError } from '../error/actions';
import { ShopCartRequest, ShopCartResponse } from './types';
import history from '../../../history';
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
    const response = await shopgt.post<ShopCartResponse>('/api/shopcart', item);
    dispatch(addCardItem(response.data));
    history.push('/');
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

export const thunkDeleteItem = (productId: string): AppThunk => async (
  dispatch
) => {
  try {
    console.log(productId);
    await shopgt.delete(`/api/shopcart/${productId}`);
    dispatch(deleteCardItem(productId));
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

export const thunkFecthCart = (): AppThunk => async (dispatch, getState) => {
  try {
    const shopCart = getState().shoppingCart;
    if (shopCart.id === '') {
      const response = await shopgt.get<ShopCartResponse>('/api/shopcart');
      dispatch(fetchShopCard(response.data));
    }
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
