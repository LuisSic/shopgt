import { AddressActionTypes, AddressState, Address } from './types';

export const createAddress = (address: AddressState): AddressActionTypes => {
  return {
    type: Address.CREATE_ADDRESS,
    payload: address,
  };
};

export const editAddress = (address: AddressState): AddressActionTypes => {
  return {
    type: Address.EDIT_ADDRESS,
    payload: address,
  };
};

export const deleteAddress = (id: string): AddressActionTypes => {
  return {
    type: Address.DELETE_ADDRESS,
    payload: id,
  };
};

export const fetchAddresses = (
  addresses: AddressState[]
): AddressActionTypes => {
  return {
    type: Address.FETCH_ADDRESSES,
    payload: addresses,
  };
};

export const fetchAddress = (address: AddressState): AddressActionTypes => {
  return {
    type: Address.FETCH_ADDRESS,
    payload: address,
  };
};
