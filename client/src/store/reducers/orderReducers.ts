import _ from 'lodash';
import {
  OrderState,
  OrderTypes,
  OrderActionsTypes,
} from '../actions/orders/types';

const initialState: OrderState = {};

export default (
  state = initialState,
  action: OrderActionsTypes
): OrderState => {
  switch (action.type) {
    case OrderTypes.CREATE_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case OrderTypes.FETCH_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    case OrderTypes.FETCH_ORDERS:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case OrderTypes.CANCEL_ORDER:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
