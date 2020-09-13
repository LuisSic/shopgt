import _ from 'lodash';
import {
  AddressState,
  AddressTypes,
  AddressActionTypes,
} from '../actions/address/types';

const initialState: AddressState = {};

export default (
  state = initialState,
  action: AddressActionTypes
): AddressState => {
  switch (action.type) {
    case AddressTypes.CREATE_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    case AddressTypes.EDIT_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    case AddressTypes.DELETE_ADDRESS:
      return _.omit(state, action.payload);
    case AddressTypes.FETCH_ADDRESSES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case AddressTypes.FETCH_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
