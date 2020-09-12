import _ from 'lodash';
import {
  ShopCartState,
  ShopCart,
  ShopCartTypes,
} from '../actions/shopCart/types';

const initialState: ShopCartState = {
  id: '',
  addressId: '',
  items: {},
};

export default (state = initialState, action: ShopCartTypes): ShopCartState => {
  switch (action.type) {
    case ShopCart.ADD_ITEMCARD:
      return {
        ...state,
        id: action.payload.id,
        items: _.mapKeys(action.payload.items, 'product.id'),
      };
    case ShopCart.DELETE_ITEMCARD:
      return { ...state, items: _.omit(state.items, action.payload) };
    case ShopCart.FETCH_CARDSHOP:
      return {
        ...state,
        id: action.payload.id,
        items: _.mapKeys(action.payload.items, 'product.id'),
      };
    case ShopCart.SELECT_ADDRESS:
      return {
        ...state,
        addressId: action.payload,
      };
    default:
      return state;
  }
};
