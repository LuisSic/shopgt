export enum AddressTypes {
  CREATE_ADDRESS = 'CREATE_ADDRESS',
  FETCH_ADDRESSES = 'FETCH_ADDRESSES',
  FETCH_ADDRESS = 'FETCH_ADDRESS',
  DELETE_ADDRESS = 'DELETE_ADDRESS',
  EDIT_ADDRESS = 'EDIT_ADDRESS',
  SELECT_ADDRESS = 'SELECT_ADDRESS',
}

export interface Address {
  id: string;
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  status: boolean;
  version: number;
  position: {
    long: string;
    lat: string;
  };
  userId: string;
}

export interface AddressState {
  [id: string]: Address;
}

export interface AddressRequest {
  name: string;
  address: string;
  country: string;
  deparment: string;
  township: string;
  position: {
    long: string;
    lat: string;
  };
}

interface CreateAddress {
  type: AddressTypes.CREATE_ADDRESS;
  payload: Address;
}

interface FetchAddresses {
  type: AddressTypes.FETCH_ADDRESSES;
  payload: Address[];
}

interface FetchAddress {
  type: AddressTypes.FETCH_ADDRESS;
  payload: Address;
}

interface DeleteAddress {
  type: AddressTypes.DELETE_ADDRESS;
  payload: string;
}

interface EditAddress {
  type: AddressTypes.EDIT_ADDRESS;
  payload: Address;
}

export type AddressActionTypes =
  | CreateAddress
  | FetchAddress
  | FetchAddresses
  | DeleteAddress
  | EditAddress;
