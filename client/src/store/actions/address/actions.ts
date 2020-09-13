import { AddressActionTypes, Address, AddressTypes } from './types';

export const createAddress = (address: Address): AddressActionTypes => {
  return {
    type: AddressTypes.CREATE_ADDRESS,
    payload: address,
  };
};

export const editAddress = (address: Address): AddressActionTypes => {
  return {
    type: AddressTypes.EDIT_ADDRESS,
    payload: address,
  };
};

export const deleteAddress = (id: string): AddressActionTypes => {
  return {
    type: AddressTypes.DELETE_ADDRESS,
    payload: id,
  };
};

export const fetchAddresses = (addresses: Address[]): AddressActionTypes => {
  return {
    type: AddressTypes.FETCH_ADDRESSES,
    payload: addresses,
  };
};

export const fetchAddress = (address: Address): AddressActionTypes => {
  return {
    type: AddressTypes.FETCH_ADDRESS,
    payload: address,
  };
};
