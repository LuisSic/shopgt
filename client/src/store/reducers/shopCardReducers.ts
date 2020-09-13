import _ from 'lodash';
import {
  ShopCartState,
  CartActionsTypes,
  ShopCartTypes,
} from '../actions/shopCart/types';

const initialState: ShopCartState = {
  id: '',
  addressId: '',
  items: {},
};

export default (
  state = initialState,
  action: CartActionsTypes
): ShopCartState => {
  switch (action.type) {
    case ShopCartTypes.ADD_ITEMCARD:
      return {
        ...state,
        id: action.payload.id,
        items: _.mapKeys(action.payload.items, 'product.id'),
      };
    case ShopCartTypes.DELETE_ITEMCARD:
      return { ...state, items: _.omit(state.items, action.payload) };
    case ShopCartTypes.FETCH_CARDSHOP:
      return {
        ...state,
        id: action.payload.id,
        items: _.mapKeys(action.payload.items, 'product.id'),
      };
    case ShopCartTypes.SELECT_ADDRESS:
      return {
        ...state,
        addressId: action.payload,
      };
    default:
      return state;
  }
};
