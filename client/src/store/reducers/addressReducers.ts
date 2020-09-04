import _ from 'lodash';
import {
  AddressState,
  Address,
  AddressActionTypes,
} from '../actions/address/types';

const initialState: { [id: string]: AddressState } = {};

export default (
  state = initialState,
  action: AddressActionTypes
): { [id: string]: AddressState } => {
  switch (action.type) {
    case Address.CREATE_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    case Address.EDIT_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    case Address.DELETE_ADDRESS:
      return _.omit(state, action.payload);
    case Address.FETCH_ADDRESSES:
      return { ...state, ..._.mapKeys(action.payload, 'id') };
    case Address.FETCH_ADDRESS:
      return { ...state, [action.payload.id]: action.payload };
    default:
      return state;
  }
};
